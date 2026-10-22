// Storage that never throws (private mode, blocked storage, sandboxed frames).
const safe = (getter) => {
  try {
    return getter();
  } catch {
    return null;
  }
};

const local = () => safe(() => window.localStorage);
const session = () => safe(() => window.sessionStorage);

function read(store, key, fallback) {
  const s = store();
  if (!s) return fallback;
  const raw = safe(() => s.getItem(key));
  if (raw === null || raw === undefined) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function write(store, key, value) {
  const s = store();
  if (!s) return false;
  return safe(() => {
    if (value === undefined || value === null) s.removeItem(key);
    else s.setItem(key, JSON.stringify(value));
    return true;
  }) === true;
}

const SETTINGS = 'css.settings';
const DRAFT = 'css.draft';
const LAST = 'css.last';
const SESSION_KEY = 'css.key';

const USAGE = 'css.usage';
const monthKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

export const store = {
  /** This device's AI use: { month: 'YYYY-MM', models: { id: {requests, input, output} }, last: {...previous month} }. */
  loadUsage(now = new Date()) {
    const u = read(local, USAGE, null);
    const month = monthKey(now);
    if (!u || typeof u !== 'object' || !u.models) return { month, models: {}, last: null };
    if (u.month !== month) return { month, models: {}, last: { month: u.month, models: u.models } };
    return u;
  },
  addUsage({ model, requests = 1, input = 0, output = 0 } = {}, now = new Date()) {
    if (!model) return null;
    const u = this.loadUsage(now);
    const m = u.models[model] || { requests: 0, input: 0, output: 0 };
    u.models[model] = { requests: m.requests + requests, input: m.input + input, output: m.output + output };
    write(local, USAGE, u);
    return u;
  },
  clearUsage() {
    write(local, USAGE, null);
  },

  loadSettings() {
    const s = read(local, SETTINGS, {}) || {};
    const sessionKey = read(session, SESSION_KEY, '');
    return {
      clinician: typeof s.clinician === 'string' ? s.clinician : '',
      drugs: typeof s.drugs === 'string' ? s.drugs : '',
      model: typeof s.model === 'string' ? s.model : '',
      noteType: typeof s.noteType === 'string' ? s.noteType : 'consult',
      mode: ['vet', 'carer', 'intake', 'log', 'tovet', 'mop', 'funding'].includes(s.mode) ? s.mode : 'carer',
      role: s.role === 'vet' ? 'vet' : 'carer',
      region: s.region === 'qld' ? 'qld' : 'vic',
      rememberKey: Boolean(s.rememberKey),
      apiKey: (s.rememberKey && typeof s.apiKey === 'string' ? s.apiKey : sessionKey) || '',
    };
  },
  saveSettings(s) {
    write(local, SETTINGS, {
      clinician: s.clinician || '',
      drugs: String(s.drugs || '').slice(0, 3000),
      model: s.model || '',
      noteType: s.noteType || 'consult',
      mode: ['vet', 'carer', 'intake', 'log', 'tovet', 'mop', 'funding'].includes(s.mode) ? s.mode : 'carer',
      role: s.role === 'vet' ? 'vet' : 'carer',
      region: s.region === 'qld' ? 'qld' : 'vic',
      rememberKey: Boolean(s.rememberKey),
      apiKey: s.rememberKey ? s.apiKey || '' : '',
    });
    write(session, SESSION_KEY, s.rememberKey ? null : s.apiKey || null);
  },
  // Kept on the device (not just the tab), so answering a call or closing the app loses nothing.
  loadDraft() {
    return read(local, DRAFT, '') || read(session, DRAFT, '') || '';
  },
  saveDraft(text) {
    write(local, DRAFT, text ? text : null);
  },
  /** The last thing Animal Welfare Companion made, so it can be reopened after the app is closed. */
  loadLast() {
    const v = read(local, LAST, null);
    return v && typeof v === 'object' && v.type && v.data ? v : null;
  },
  saveLast(v) {
    write(local, LAST, v);
  },
  clearAll() {
    write(local, SETTINGS, null);
    write(session, SESSION_KEY, null);
    write(session, DRAFT, null);
    write(local, DRAFT, null);
    write(local, LAST, null);
  },
};
