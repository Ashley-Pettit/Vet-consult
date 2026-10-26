// Share a plan as a link, with no database: the plan itself is packed (compressed) into the link's #fragment.
// The part after # never leaves the phone when the link is opened, so the plan isn't sent to any server.
export const SITE_URL = 'https://ashley-pettit.github.io/Vet-consult/care/';

const toB64url = (bytes) => {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
const fromB64url = (str) => {
  const s = atob(str.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((str.length + 3) % 4));
  return Uint8Array.from(s, (c) => c.charCodeAt(0));
};
async function pipe(bytes, stream) {
  const out = new Response(new Blob([bytes]).stream().pipeThrough(stream));
  return new Uint8Array(await out.arrayBuffer());
}

/** The plan (any JSON) as a link fragment: "z" + deflated, or "j" + plain where the browser can't compress. */
export async function packPlan(obj) {
  const bytes = new TextEncoder().encode(JSON.stringify(obj));
  if (typeof CompressionStream === 'function') {
    try {
      return 'z' + toB64url(await pipe(bytes, new CompressionStream('deflate-raw')));
    } catch {
      /* fall through */
    }
  }
  return 'j' + toB64url(bytes);
}

export async function unpackPlan(code) {
  const kind = code[0];
  const bytes = fromB64url(code.slice(1));
  const raw = kind === 'z' ? await pipe(bytes, new DecompressionStream('deflate-raw')) : bytes;
  return JSON.parse(new TextDecoder().decode(raw));
}

const linkBase = (here) => (here && /github\.io$|localhost|127\.0\.0\.1/.test(here.hostname) ? here.origin + here.pathname : SITE_URL);

/** A full link to the plan on the website (also from inside Claude, so it opens anywhere). */
export async function planLink(obj, here = typeof location !== 'undefined' ? location : null) {
  return `${linkBase(here)}#p=${await packPlan(obj)}`;
}

const api = (proxyUrl) => `${String(proxyUrl).replace(/\/+$/, '')}/share`;
const timeout = (ms) => (typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(ms) : undefined);
const ID = /^[a-zA-Z0-9]{10,16}$/;

/** Store a plan with the proxy. With edit: true the reply includes a secret key that lets whoever holds it change
 * the stored plan (vet review links). Returns { id, key?, updated } or null if the proxy can't be reached. */
export async function storePlan(obj, proxyUrl, { edit = false } = {}, fetchImpl = typeof fetch === 'function' ? fetch : null) {
  if (!proxyUrl || !fetchImpl) return null;
  try {
    const r = await fetchImpl(`${api(proxyUrl)}${edit ? '?edit=1' : ''}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(obj), signal: timeout(10000) });
    const j = r.ok ? await r.json() : null;
    return j && typeof j.id === 'string' && ID.test(j.id) && (!edit || typeof j.key === 'string') ? j : null;
  } catch {
    return null;
  }
}

/** A short link: the plan is kept by the proxy and the link carries only its id, so messaging apps can't cut it
 * short. Falls back to the long link (the plan packed inside it) when the proxy can't be reached. */
export async function shortPlanLink(obj, proxyUrl, here = typeof location !== 'undefined' ? location : null, fetchImpl) {
  const j = await storePlan(obj, proxyUrl, {}, fetchImpl);
  return j ? `${linkBase(here)}#s=${j.id}` : planLink(obj, here);
}

/** The review link for a stored, editable plan: whoever opens it can change that same plan. */
export const reviewLink = (id, key, here = typeof location !== 'undefined' ? location : null) => `${linkBase(here)}#r=${id}.${key}`;

/** Fetch a stored plan: { plan, updated }. Throws an Error with code 'expired' (not found) or 'offline'. */
export async function fetchSharedPlan(id, proxyUrl, fetchImpl = fetch) {
  let r;
  try {
    r = await fetchImpl(`${api(proxyUrl)}/${encodeURIComponent(id)}`, { signal: timeout(15000) });
  } catch {
    throw Object.assign(new Error('offline'), { code: 'offline' });
  }
  if (r.status === 404) throw Object.assign(new Error('expired'), { code: 'expired' });
  if (!r.ok) throw Object.assign(new Error('offline'), { code: 'offline' });
  const j = await r.json();
  if (!j || !j.plan) throw Object.assign(new Error('expired'), { code: 'expired' });
  return j;
}

/** Save changes to an editable stored plan. Returns the new updated time, or null if it couldn't be saved. */
export async function updateSharedPlan(id, key, obj, proxyUrl, fetchImpl = fetch) {
  try {
    const r = await fetchImpl(`${api(proxyUrl)}/${encodeURIComponent(id)}`, { method: 'PUT', headers: { 'content-type': 'application/json', 'x-edit-key': key }, body: JSON.stringify(obj), signal: timeout(10000) });
    return r.ok ? (await r.json()).updated : null;
  } catch {
    return null;
  }
}

/** A short link in a URL hash: "#s=<id>" (read only) or "#r=<id>.<key>" (vet review, can be changed). */
export function shortLink(hash = '') {
  let m = /^#s=([a-zA-Z0-9]{10,16})$/.exec(hash);
  if (m) return { id: m[1], key: null };
  m = /^#r=([a-zA-Z0-9]{10,16})\.([a-zA-Z0-9]{20,32})$/.exec(hash);
  return m ? { id: m[1], key: m[2] } : null;
}

/** A short id that is the same every time the same link is opened, so a shared plan is saved once. */
export function linkId(code) {
  let h = 0x811c9dc5;
  for (let i = 0; i < code.length; i++) h = Math.imul(h ^ code.charCodeAt(i), 0x01000193);
  return `s${(h >>> 0).toString(36)}`;
}

/** The packed plan in a URL hash ("#p=..."), or null. */
export const linkCode = (hash = '') => (hash.startsWith('#p=') ? hash.slice(3) : null);
