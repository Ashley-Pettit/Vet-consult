// AI providers. The app picks the first one available:
//   1. Claude runtime (when opened as a Claude artifact)
//   2. Organisation proxy (CONFIG.proxyUrl) - production
//   3. Personal Anthropic API key saved on this device

import { CONFIG } from './config.js';

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

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
export function messageContent(prompt, images = []) {
  if (!images.length) return prompt;
  return [
    ...images.map((i) => ({ type: 'image', source: { type: 'base64', media_type: i.mediaType || 'image/jpeg', data: i.data } })),
    { type: 'text', text: prompt },
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

async function callMessages(url, headers, prompt, model, signal, fetchImpl, { viaProxy = false, images = [] } = {}) {
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
        messages: [{ role: 'user', content: messageContent(prompt, images) }],
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
    // Through the proxy, a blocked cross-origin answer usually means the sign-in page, not a dead connection.
    throw new AiError(viaProxy ? 'signin' : 'network', viaProxy ? AI_MESSAGES.signin : AI_MESSAGES.network);
  }
  if (viaProxy && (res.type === 'opaqueredirect' || (res.status >= 300 && res.status < 400))) {
    t.done();
    throw new AiError('signin', AI_MESSAGES.signin);
  }
  let body = null;
  try {
    body = await res.json();
  } catch {
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
        async generate(prompt, signal, { images = [] } = {}) {
          try {
            const opts = { signal, cache: false };
            if (images.length) opts.images = images.map((i) => i.blob);
            const { text } = await sample(prompt, opts);
            return text;
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
      label: 'Care Scribe connection',
      images: true,
      generate: (prompt, signal, { images = [] } = {}) => callMessages(CONFIG.proxyUrl, {}, prompt, model, signal, fetchImpl, { viaProxy: true, images }),
    };
  }

  if (settings.apiKey) {
    return {
      id: 'key',
      label: 'Your API key',
      images: true,
      generate: (prompt, signal, { images = [] } = {}) =>
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
          { images },
        ),
    };
  }
  return null;
}
