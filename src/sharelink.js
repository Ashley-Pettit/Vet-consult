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

/** A full link to the plan on the website (also from inside Claude, so it opens anywhere). */
export async function planLink(obj, here = typeof location !== 'undefined' ? location : null) {
  const base = here && /github\.io$|localhost|127\.0\.0\.1/.test(here.hostname) ? here.origin + here.pathname : SITE_URL;
  return `${base}#p=${await packPlan(obj)}`;
}

/** The packed plan in a URL hash ("#p=..."), or null. */
export const linkCode = (hash = '') => (hash.startsWith('#p=') ? hash.slice(3) : null);
