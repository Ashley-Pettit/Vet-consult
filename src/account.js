// Vet accounts: sign in with email and password through the proxy. "Remember me" keeps the session on this device
// (90 days); otherwise it lasts until the tab is closed (and at most half a day on the server).
// The session token is the only thing kept here; the password never is.
import { CONFIG } from './config.js';

const KEY = 'css.account';
const safe = (f) => {
  try {
    return f();
  } catch {
    return null;
  }
};
const base = () => String(CONFIG.proxyUrl || '').replace(/\/+$/, '');
const timeout = (ms) => (typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(ms) : undefined);

let current = null; // { token, user, remember }
// The pretend vet for trying prescriptions while the app is built. Everything it makes says TEST.
export const FAKE_VET = { email: 'ashley.fake@example.com', name: 'Ashley Fake', reg: 'TEST-0000', regState: 'vic', clinic: 'Pretend Vet Clinic (TEST)', address: '1 Test Street, Melbourne VIC', phone: '03 0000 0000', approved: true, fake: true, test: true };

function load() {
  for (const s of [safe(() => localStorage), safe(() => sessionStorage)]) {
    const raw = s && safe(() => s.getItem(KEY));
    const v = raw && safe(() => JSON.parse(raw));
    if (v && typeof v.token === 'string' && v.user) return v;
  }
  return null;
}
function save(v) {
  for (const s of [safe(() => localStorage), safe(() => sessionStorage)]) if (s) safe(() => s.removeItem(KEY));
  if (!v) return;
  const s = v.remember ? safe(() => localStorage) : safe(() => sessionStorage);
  if (s) safe(() => s.setItem(KEY, JSON.stringify(v)));
}
current = load();

/** Error with a code the screens turn into plain words. */
const fail = (code, extra = {}) => Object.assign(new Error(code), { code, ...extra });

async function api(path, { method = 'GET', body, token, admin } = {}) {
  if (!base()) throw fail('offline');
  const headers = {};
  if (body !== undefined) headers['content-type'] = 'application/json';
  if (token) headers.authorization = `Bearer ${token}`;
  if (admin) headers['x-admin-key'] = admin;
  let r;
  try {
    r = await fetch(`${base()}${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body), signal: timeout(20000) });
  } catch {
    throw fail('offline');
  }
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw fail((j.error && j.error.type) || `http_${r.status}`, { status: r.status, minutes: j.error && j.error.minutes });
  return j;
}

export const account = {
  /** The signed-in vet ({ email, name, reg, regState, clinic, address, phone, approved }) or null. */
  get user() {
    return current ? current.user : null;
  },
  get signedIn() {
    return Boolean(current);
  },
  get approved() {
    return Boolean(current && current.user.approved);
  },
  async signUp(details, password, remember) {
    const j = await api('/auth/signup', { method: 'POST', body: { ...details, password, remember } });
    current = { token: j.token, user: j.user, remember: Boolean(remember) };
    save(current);
    return j.user;
  },
  async signIn(email, password, remember) {
    const j = await api('/auth/login', { method: 'POST', body: { email, password, remember } });
    current = { token: j.token, user: j.user, remember: Boolean(remember) };
    save(current);
    return j.user;
  },
  /** While the app is being built: a pretend approved vet that lives only on this device (no server). */
  signInFake() {
    current = { token: 'fake', remember: true, user: { ...FAKE_VET } };
    save(current);
    return current.user;
  },
  get fake() {
    return Boolean(current && current.user && current.user.fake);
  },
  /** Beta testing only: sign in as the shared test vet (approved; everything it makes is marked TEST). */
  async signInTest() {
    const j = await api('/auth/test', { method: 'POST', body: {} });
    current = { token: j.token, user: j.user, remember: false };
    save(current);
    return j.user;
  },
  async signOut() {
    const was = current;
    current = null;
    save(null);
    if (was && was.token !== 'fake') await api('/auth/logout', { method: 'POST', token: was.token }).catch(() => {});
  },
  /** Fetch the latest account details (approval can change). Signs out if the session has ended. */
  async refresh() {
    if (!current || current.token === 'fake') return this.user;
    try {
      const j = await api('/auth/me', { token: current.token });
      current = { ...current, user: j.user };
      save(current);
    } catch (e) {
      if (e.code === 'signed_out') {
        current = null;
        save(null);
      }
    }
    return this.user;
  },
  async update(details) {
    if (current && current.token === 'fake') {
      current = { ...current, user: { ...current.user, ...details } };
      save(current);
      return current.user;
    }
    const j = await api('/auth/me', { method: 'PUT', body: details, token: current && current.token });
    current = { ...current, user: j.user };
    save(current);
    return j.user;
  },
  /** Record an endorsement on the server: { id, by, reg, clinic, at, meds }. */
  endorse(meds, animal) {
    return api('/endorse', { method: 'POST', body: { meds, animal }, token: current && current.token });
  },
  /** A prescription number for an approved vet: { number, at }. */
  prescriptionNumber(animal, items) {
    // The pretend vet numbers its own scripts, marked TEST so they can never pass as real.
    if (current && current.token === 'fake') return Promise.resolve({ number: `TEST-${Date.now().toString(36).toUpperCase()}`, at: Date.now() });
    return api('/rx', { method: 'POST', body: { animal, items }, token: current && current.token });
  },
};

/** Look up an endorsement by id (anyone can): the server's record, or null if there's no such endorsement. */
const checked = new Map();
export async function lookupEndorsement(id) {
  if (checked.has(id)) return checked.get(id);
  try {
    const j = await api(`/endorse/${encodeURIComponent(id)}`);
    checked.set(id, j);
    return j;
  } catch (e) {
    if (e.code === 'not_found') {
      checked.set(id, null);
      return null;
    }
    throw e; // offline: try again later
  }
}

/** Admin: the key is kept on this device only. */
const ADMIN = 'css.adminKey';
export const admin = {
  get key() {
    return safe(() => localStorage.getItem(ADMIN)) || '';
  },
  set key(v) {
    safe(() => (v ? localStorage.setItem(ADMIN, v) : localStorage.removeItem(ADMIN)));
  },
  vets() {
    return api('/admin/vets', { admin: this.key }).then((j) => j.vets);
  },
  approve(email, approved) {
    return api(`/admin/vets/${encodeURIComponent(email)}/approve`, { method: 'POST', body: { approved }, admin: this.key });
  },
  setPassword(email, password) {
    return api(`/admin/vets/${encodeURIComponent(email)}/password`, { method: 'POST', body: { password }, admin: this.key });
  },
};

/** Plain words for an account error. */
export function accountError(e) {
  const c = e && e.code;
  if (c === 'offline') return 'Couldn’t reach the server. Check your internet connection and try again.';
  if (c === 'wrong_login') return 'That email and password don’t match. Check them and try again.';
  if (c === 'locked') return `Too many tries. Wait ${(e && e.minutes) || 15} minutes, or ask the app admin to reset your password.`;
  if (c === 'email_taken') return 'There’s already an account with that email. Sign in instead.';
  if (c === 'bad_email') return 'Check the email address.';
  if (c === 'weak_password') return 'Use a password of at least 10 characters.';
  if (c === 'missing_details') return 'Add your name and vet registration number.';
  if (c === 'not_approved') return 'Your account is waiting for approval. The app admin checks the vet register first.';
  if (c === 'signed_out') return 'You’ve been signed out. Sign in again in Settings.';
  if (c === 'not_admin') return 'That admin key isn’t right.';
  return 'Something went wrong. Try again in a moment.';
}
