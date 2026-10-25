// Ready-made replies for the built-in examples, so trying an example never waits on (or pays for) a real AI call.
// Each reply was made once by Claude from the exact prompt the app builds; the prompt's hash finds it again.
// Anything that changes the prompt (your name or drugs in Settings, photos, an edited example) gets a real call.
import BAKED from './baked-examples.js';

export const BAKED_DELAY_MS = 1500; // long enough to feel like it's working, short enough not to wait

// cyrb53: a small, fast string hash. Plenty for telling a few dozen prompts apart.
export function bakeKey(prompt) {
  const str = String(prompt);
  let h1 = 0xdeadbeef ^ 0, h2 = 0x41c6ce57 ^ 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

export function bakedReply(prompt, images = [], documents = []) {
  if ((images && images.length) || (documents && documents.length)) return null;
  return (BAKED.replies || {})[bakeKey(prompt)] ?? null;
}

/** Wait like a real call would, but stop straight away if Stop is pressed. */
function pause(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal && signal.aborted) return reject(signal.reason);
    const t = setTimeout(resolve, ms);
    if (signal) signal.addEventListener('abort', () => { clearTimeout(t); reject(signal.reason); }, { once: true });
  });
}

/**
 * Wrap a provider so example prompts are answered from the ready-made replies after a short, realistic wait.
 * With no provider at all (the public demo without a connection), the examples still work.
 */
export function withBaked(p, makeCancelled, prepare = (x) => x) {
  const generate = async (prompt, signal, opts = {}) => {
    const baked = bakedReply(prompt, opts.images, opts.documents);
    if (baked != null) {
      try {
        await pause(BAKED_DELAY_MS, signal);
      } catch (e) {
        throw makeCancelled ? makeCancelled(e) : e;
      }
      return baked;
    }
    if (!p) throw Object.assign(new Error('No Claude connection'), { code: 'forbidden' });
    return p.generate(prepare(prompt), signal, opts);
  };
  if (p) return { ...p, generate };
  return { id: 'examples', label: 'Examples only', images: false, examplesOnly: true, generate };
}
