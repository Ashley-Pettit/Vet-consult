// AI providers. The app picks the first one available:
//   1. Claude runtime (when opened as a Claude artifact)
//   2. Organisation proxy (CONFIG.proxyUrl) - production
//   3. Personal Anthropic API key saved on this device

import { CONFIG } from './config.js';

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

// Usage reporting: the app sets a listener and keeps a running tally on this device.
let usageListener = null;
export function onUsage(fn) {
  usageListener = typeof fn === 'function' ? fn : null;
}
function reportUsage(u) {
  try {
    if (usageListener) usageListener(u);
  } catch {
    /* never let the tally break a note */
  }
}

export class AiError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

export const AI_MESSAGES = {
  no_provider: 'Connect to Claude first. Open Settings and add an API key.',
  bad_key: 'The API key was rejected. Check it in Settings.',
  signin: 'Your organisation sign-in may have expired. Reload the page to sign in again, then try again. Your dictation is kept.',
  forbidden: 'This connection isn’t allowed to use Claude. Sign in to your organisation again, or check the key in Settings.',
  rate_limited: 'Claude is busy or the usage limit was reached. Wait a minute, then try again.',
  overloaded: 'Claude is overloaded right now. Try again in a minute.',
  offline: 'You’re offline. Your dictation is kept. Reconnect, then try again.',
  timeout: 'Claude took too long to answer. Try again, or switch to the Fast model in Settings.',
  network: 'Couldn’t reach Claude. Check the connection, then try again.',
  server: 'Claude had a problem writing the note. Try again.',
  bad_request: 'The request was rejected. Check the model in Settings, then try again.',
  invalid_json: 'The note came back in an unexpected format. Try again.',
  empty: 'Claude didn’t find a clinical note in that dictation. Add the exam and plan, then try again.',
  refused: 'Claude declined to write this note. Reword the dictation and try again.',
  cancelled: 'Stopped.',
  photos: 'The photos couldn’t be sent. Remove them and try again, or try smaller photos.',
  pdf_connection: 'This connection can’t take PDFs yet. Attach the document as Word (.docx) or text, or add a photo of each page.',
  pdf: 'PDFs can’t be read inside the Claude app version yet. Open the website version, or attach the document as Word (.docx) or text.',
};

export function friendly(err) {
  const code = err && err.code;
  return AI_MESSAGES[code] || AI_MESSAGES.server;
}

function statusToCode(status) {
  if (status === 401) return 'bad_key';
  if (status === 403) return 'forbidden';
  if (status === 429) return 'rate_limited';
  if (status === 529 || status === 503) return 'overloaded';
  if (status === 413) return 'photos';
  if (status === 400 || status === 404) return 'bad_request';
  return 'server';
}

/** Text alone, or photos first then the text, as Messages API content blocks. */
// Prompt caching: the part of a prompt before the marker is the same on every request of that kind, so it's sent
// as its own block marked for caching. Claude then reuses it for a few minutes: quicker to start and cheaper.
export const CACHE_MARK = '\n<<<CACHE_SPLIT>>>\n';
let cachingOff = false; // set if a connection turns caching down, so the next requests go plain
export const plainPrompt = (prompt) => String(prompt).split(CACHE_MARK).join('\n');
// Added to every request as it goes out (so the examples' ready-made replies still match their prompts): today's date,
// and a nudge to think only as much as the job needs. In live tests this halved the hidden thinking time (care plans
// about a third quicker overall) with the same models, settings and plan content.
const SPEED_LINE = 'Work efficiently. The rules and sources above are already checked, so apply them directly. Think only as much as you need to pick the right facts and figures for this animal (and its sex only if it was said); don\'t draft or re-check the whole reply in your head before writing it.';
export function sendTail(d = new Date()) {
  const pad = (x) => String(x).padStart(2, '0');
  return `\n\nToday is ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}.\n${SPEED_LINE}`;
}
export const stripSendTail = (s) => String(s).replace(/\n\nToday is \d{2}\/\d{2}\/\d{4}\.\nWork efficiently\.[\s\S]*$/, '');
function textBlocks(prompt, cache) {
  const p = String(prompt);
  const i = p.indexOf(CACHE_MARK);
  if (i < 0 || !cache) return [{ type: 'text', text: plainPrompt(p) + sendTail() }];
  return [
    { type: 'text', text: p.slice(0, i), cache_control: { type: 'ephemeral' } },
    { type: 'text', text: p.slice(i + CACHE_MARK.length) + sendTail() },
  ];
}
export function messageContent(prompt, images = [], documents = [], cache = !cachingOff) {
  const text = textBlocks(prompt, cache);
  if (!images.length && !documents.length && text.length === 1) return text[0].text;
  return [
    ...documents.map((d) => ({ type: 'document', title: d.name, source: { type: 'base64', media_type: d.mediaType || 'application/pdf', data: d.data } })),
    ...images.map((i) => ({ type: 'image', source: { type: 'base64', media_type: i.mediaType || 'image/jpeg', data: i.data } })),
    ...text,
  ];
}

/** Combine the user's Stop signal with a timeout. */
function withTimeout(signal, ms) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(new AiError('timeout', AI_MESSAGES.timeout)), ms);
  const onAbort = () => ctl.abort(new AiError('cancelled', AI_MESSAGES.cancelled));
  if (signal) {
    if (signal.aborted) onAbort();
    else signal.addEventListener('abort', onAbort, { once: true });
  }
  return {
    signal: ctl.signal,
    done: () => {
      clearTimeout(timer);
      if (signal) signal.removeEventListener('abort', onAbort);
    },
  };
}

export function textFromMessage(body) {
  if (!body || !Array.isArray(body.content)) return '';
  if (body.stop_reason === 'refusal') throw new AiError('refused', AI_MESSAGES.refused);
  return body.content
    .filter((b) => b && b.type === 'text' && typeof b.text === 'string')
    .map((b) => b.text)
    .join('');
}

/** Read a streamed Messages reply (server-sent events) into the same shape as a normal reply. */
export async function readStream(res) {
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let text = '';
  let stopReason = null;
  const usage = { input_tokens: 0, output_tokens: 0 };
  const addUsage = (u) => {
    if (!u) return;
    if (Number(u.input_tokens) || Number(u.cache_creation_input_tokens) || Number(u.cache_read_input_tokens))
      usage.input_tokens = (Number(u.input_tokens) || 0) + (Number(u.cache_creation_input_tokens) || 0) + (Number(u.cache_read_input_tokens) || 0);
    if (Number(u.output_tokens)) usage.output_tokens = Number(u.output_tokens);
  };
  const handle = (block) => {
    const data = block.split('\n').filter((l) => l.startsWith('data:')).map((l) => l.slice(5).trim()).join('');
    if (!data) return;
    let ev;
    try {
      ev = JSON.parse(data);
    } catch {
      return;
    }
    if (ev.type === 'content_block_delta' && ev.delta && ev.delta.type === 'text_delta') text += ev.delta.text;
    else if (ev.type === 'message_start' && ev.message) addUsage(ev.message.usage);
    else if (ev.type === 'message_delta') {
      if (ev.delta && ev.delta.stop_reason) stopReason = ev.delta.stop_reason;
      addUsage(ev.usage);
    }
    else if (ev.type === 'error') {
      const t = ev.error && ev.error.type;
      const code = t === 'overloaded_error' ? 'overloaded' : t === 'rate_limit_error' ? 'rate_limited' : 'server';
      throw new AiError(code, AI_MESSAGES[code]);
    }
  };
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, '\n');
    let i;
    while ((i = buffer.indexOf('\n\n')) !== -1) {
      handle(buffer.slice(0, i));
      buffer = buffer.slice(i + 2);
    }
  }
  if (buffer.trim()) handle(buffer);
  return { content: [{ type: 'text', text }], stop_reason: stopReason, usage };
}

// A dropped connection or a busy moment usually clears in a second or two: try twice more, quietly, before showing an error.
const RETRY_CODES = new Set(['network', 'overloaded', 'server', 'empty']);
async function callMessages(url, headers, prompt, model, signal, fetchImpl, opts = {}) {
  const tries = opts.tries || 3;
  for (let attempt = 1; ; attempt++) {
    try {
      return await callOnce(url, headers, prompt, model, signal, fetchImpl, opts);
    } catch (e) {
      // A connection that doesn't take cached blocks yet: send it plainly from now on.
      if (e instanceof AiError && e.code === 'bad_request' && !cachingOff && String(prompt).includes(CACHE_MARK)) {
        cachingOff = true;
        attempt -= 1;
        continue;
      }
      const retry = e instanceof AiError && RETRY_CODES.has(e.code) && attempt < tries && !(signal && signal.aborted);
      if (!retry) throw e;
      await new Promise((r) => setTimeout(r, opts.retryDelayMs ?? 1500 * attempt));
    }
  }
}

async function callOnce(url, headers, prompt, model, signal, fetchImpl, { viaProxy = false, images = [], documents = [] } = {}) {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) throw new AiError('offline', AI_MESSAGES.offline);
  const t = withTimeout(signal, CONFIG.timeoutMs);
  let res;
  try {
    res = await fetchImpl(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...headers },
      body: JSON.stringify({
        model,
        max_tokens: CONFIG.maxTokens,
        messages: [{ role: 'user', content: messageContent(prompt, images, documents) }],
        // Through the connection the reply streams in, so long care plans never sit silent and get dropped.
        ...(viaProxy ? { stream: true } : {}),
      }),
      signal: t.signal,
      // The proxy sits behind the organisation's sign-in (for example Cloudflare Access), which needs its cookie.
      credentials: viaProxy ? 'include' : 'omit',
      // An expired organisation sign-in answers with a redirect; catch it instead of following it.
      redirect: viaProxy ? 'manual' : 'follow',
    });
  } catch (e) {
    t.done();
    const reason = t.signal.reason;
    if (reason instanceof AiError) throw reason;
    if (typeof navigator !== 'undefined' && navigator.onLine === false) throw new AiError('offline', AI_MESSAGES.offline);
    throw new AiError('network', AI_MESSAGES.network);
  }
  if (viaProxy && (res.type === 'opaqueredirect' || (res.status >= 300 && res.status < 400))) {
    t.done();
    throw new AiError('signin', AI_MESSAGES.signin);
  }
  let body = null;
  const streamed = res.ok && /event-stream/.test((res.headers && res.headers.get && res.headers.get('content-type')) || '');
  try {
    body = streamed ? await readStream(res) : await res.json();
  } catch (e) {
    if (e instanceof AiError) throw e;
    const reason = t.signal.reason;
    if (reason instanceof AiError) throw reason;
    if (streamed) throw new AiError('network', AI_MESSAGES.network);
    body = null;
  } finally {
    t.done();
  }
  if (!res.ok) {
    let code = statusToCode(res.status);
    if (viaProxy && code === 'bad_key') code = 'forbidden'; // staff have no key to fix
    throw new AiError(code, AI_MESSAGES[code]);
  }
  const text = textFromMessage(body);
  const u = (body && body.usage) || {};
  reportUsage({
    model,
    requests: 1,
    input: (Number(u.input_tokens) || 0) + (Number(u.cache_creation_input_tokens) || 0) + (Number(u.cache_read_input_tokens) || 0),
    output: Number(u.output_tokens) || 0,
  });
  if (!text.trim()) throw new AiError('empty', AI_MESSAGES.empty);
  return text;
}

/**
 * Work out which provider to use.
 * @param {{apiKey?:string, model?:string}} settings
 * @param {{claude?:any, fetch?:Function}} env
 */
export async function resolveProvider(settings = {}, env = {}) {
  const fetchImpl = env.fetch || globalThis.fetch.bind(globalThis);
  const model = settings.model || CONFIG.defaultModel;

  const claude = env.claude !== undefined ? env.claude : globalThis.claude;
  if (claude && typeof claude.use === 'function') {
    let sample = null;
    let timer;
    try {
      sample = await Promise.race([claude.use('sample'), new Promise((r) => (timer = setTimeout(() => r(null), 4000)))]);
    } catch {
      sample = null;
    } finally {
      clearTimeout(timer);
    }
    if (sample) {
      let canImages = false;
      try {
        canImages = Boolean((await sample.limits())?.images);
      } catch {
        canImages = false;
      }
      return {
        id: 'claude',
        label: 'Claude (this account)',
        images: canImages,
        async generate(prompt, signal, { images = [], documents = [] } = {}) {
          if (documents.length) throw new AiError('pdf', AI_MESSAGES.pdf);
          try {
            const m = CONFIG.models.find((x) => x.id === model) || CONFIG.models[0];
            const opts = { signal, cache: false, model: m.id, modelTier: m.tier || 'default' };
            if (images.length) opts.images = images.map((i) => i.blob);
            const res = await sample(plainPrompt(prompt) + sendTail(), opts);
            reportUsage({ model: res.modelApplied || `tier:${res.modelTierApplied || m.tier}`, requests: 1, input: 0, output: 0, account: true });
            return res.text;
          } catch (e) {
            const map = { not_granted: 'forbidden', sampling_disabled: 'forbidden', rate_limited: 'rate_limited', cancelled: 'cancelled', refused: 'refused', empty_completion: 'empty', images_unavailable: 'photos', image_rejected: 'photos' };
            const code = map[e && e.code] || 'server';
            throw new AiError(code, AI_MESSAGES[code]);
          }
        },
      };
    }
  }

  if (CONFIG.proxyUrl) {
    return {
      id: 'proxy',
      label: 'Animal Welfare Companion connection',
      images: true,
      generate: (prompt, signal, { images = [], documents = [] } = {}) => callMessages(CONFIG.proxyUrl, {}, prompt, model, signal, fetchImpl, { viaProxy: true, images, documents }),
    };
  }

  if (settings.apiKey) {
    return {
      id: 'key',
      label: 'Your API key',
      images: true,
      generate: (prompt, signal, { images = [], documents = [] } = {}) =>
        callMessages(
          ANTHROPIC_URL,
          {
            'x-api-key': settings.apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
          },
          prompt,
          model,
          signal,
          fetchImpl,
          { images, documents },
        ),
    };
  }
  return null;
}
