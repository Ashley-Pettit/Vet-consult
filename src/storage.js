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
const RECENT = 'css.recent';
const RECENT_MAX = 12;
const SESSION_KEY = 'css.key';

const USAGE = 'css.usage';
const LIBRARY = 'css.library';
const SAVED = 'css.saved';
const SAVED_MAX = 60;
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

  // RSPCA handouts, unlocked with a code and remembered on this device (not a security measure).
  rspcaUnlocked() {
    return read(local, 'css.rspca', false) === true;
  },
  unlockRspca() {
    write(local, 'css.rspca', true);
  },

  /** Thumbs up and down, counted on this device by kind of document. */
  addFeedback(vote, kind) {
    const f = read(local, 'css.feedback', {}) || {};
    const k = `${kind || 'other'}.${vote === 'up' ? 'up' : 'down'}`;
    f[k] = (f[k] || 0) + 1;
    write(local, 'css.feedback', f);
  },

  loadSettings() {
    const s = read(local, SETTINGS, {}) || {};
    const sessionKey = read(session, SESSION_KEY, '');
    return {
      clinician: typeof s.clinician === 'string' ? s.clinician : '',
      vetReg: typeof s.vetReg === 'string' ? s.vetReg : '',
      drugs: typeof s.drugs === 'string' ? s.drugs : '',
      photosOn: s.photosOn !== false,
      libraryAdmin: s.libraryAdmin === true,
      vetExtras: s.vetExtras === true,
      template: ['bunurong', 'plain', 'rspca'].includes(s.template) ? s.template : 'bunurong',
      model: typeof s.model === 'string' ? s.model : '',
      noteType: typeof s.noteType === 'string' ? s.noteType : 'consult',
      mode: ['vet', 'carer', 'intake', 'log', 'tovet', 'mop', 'funding', 'polish', 'media', 'witness', 'opinion'].includes(s.mode) ? s.mode : 'carer',
      advMode: ['witness', 'opinion'].includes(s.advMode) ? s.advMode : 'media',
      role: s.role === 'vet' ? 'vet' : 'carer',
      region: s.region === 'qld' ? 'qld' : 'vic',
      rememberKey: Boolean(s.rememberKey),
      apiKey: (s.rememberKey && typeof s.apiKey === 'string' ? s.apiKey : sessionKey) || '',
    };
  },
  saveSettings(s) {
    write(local, SETTINGS, {
      clinician: s.clinician || '',
      vetReg: String(s.vetReg || '').slice(0, 40),
      drugs: String(s.drugs || '').slice(0, 3000),
      photosOn: s.photosOn !== false,
      libraryAdmin: s.libraryAdmin === true,
      vetExtras: s.vetExtras === true,
      template: s.template || 'bunurong',
      model: s.model || '',
      noteType: s.noteType || 'consult',
      mode: ['vet', 'carer', 'intake', 'log', 'tovet', 'mop', 'funding', 'polish', 'media', 'witness', 'opinion'].includes(s.mode) ? s.mode : 'carer',
      advMode: ['witness', 'opinion'].includes(s.advMode) ? s.advMode : 'media',
      role: s.role === 'vet' ? 'vet' : 'carer',
      region: s.region === 'qld' ? 'qld' : 'vic',
      rememberKey: Boolean(s.rememberKey),
      apiKey: s.rememberKey ? s.apiKey || '' : '',
    });
    write(session, SESSION_KEY, s.rememberKey ? null : s.apiKey || null);
  },
  /** What's on screen in this tab (a plan, notes or document, with any hand edits), so a refresh puts it back. Tab only. */
  loadOpen() {
    const v = read(session, 'css.open', null);
    return v && typeof v === 'object' && v.view ? v : null;
  },
  saveOpen(v) {
    write(session, 'css.open', v || null);
  },
  // Kept on the device (not just the tab), so answering a call or closing the app loses nothing.
  loadDraft() {
    return read(local, DRAFT, '') || read(session, DRAFT, '') || '';
  },
  saveDraft(text) {
    write(local, DRAFT, text ? text : null);
  },
  /** The last thing Wildlife Welfare Companion made, so it can be reopened after the app is closed. */
  loadLast() {
    const v = read(local, LAST, null);
    return v && typeof v === 'object' && v.type && v.data ? v : null;
  },
  saveLast(v) {
    write(local, LAST, v);
    // Recent plans: newest first, one entry per title, and older ones dropped if the phone runs short of space.
    let list = [v, ...this.loadRecent().filter((x) => !(x.type === v.type && x.title && x.title === v.title))].slice(0, RECENT_MAX);
    while (list.length && !write(local, RECENT, list)) list = list.slice(0, -1);
  },
  loadRecent() {
    const v = read(local, RECENT, []);
    const list = Array.isArray(v) ? v.filter((x) => x && typeof x === 'object' && x.type && x.data) : [];
    // Saved before Recent existed: the last thing made still shows.
    const last = this.loadLast();
    return list.length || !last ? list : [last];
  },
  clearRecent() {
    write(local, RECENT, null);
    write(local, LAST, null);
  },
  /** A library admin's edited ready-made plans on this device: { planId: plan }. */
  loadLibraryEdits() {
    const v = read(local, LIBRARY, {});
    return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
  },
  saveLibraryEdit(id, plan) {
    return write(local, LIBRARY, { ...this.loadLibraryEdits(), [id]: plan });
  },
  clearLibraryEdit(id) {
    const all = this.loadLibraryEdits();
    delete all[id];
    write(local, LIBRARY, all);
  },
  /** Favourite plans the person saved, newest first: [{ id, name, sheet, savedAt }], or { doc: { kind, d } } for a
   * shared document such as a MOP plan; shared: true when it came from someone else's link. Kept until they remove them. */
  loadSaved() {
    const v = read(local, SAVED, []);
    return Array.isArray(v) ? v.filter((x) => x && typeof x === 'object' && x.id && (x.sheet || (x.doc && x.doc.d))) : [];
  },
  /** Add or update a saved plan. False if the phone is out of space. */
  savePlan(entry) {
    const list = [entry, ...this.loadSaved().filter((x) => x.id !== entry.id)].slice(0, SAVED_MAX);
    return write(local, SAVED, list);
  },
  updateSaved(id, changes) {
    const list = this.loadSaved().map((x) => (x.id === id ? { ...x, ...changes } : x));
    return write(local, SAVED, list);
  },
  removeSaved(id) {
    write(local, SAVED, this.loadSaved().filter((x) => x.id !== id));
  },
  clearAll() {
    write(local, SAVED, null);
    write(local, SETTINGS, null);
    write(session, SESSION_KEY, null);
    write(session, DRAFT, null);
    write(local, DRAFT, null);
    write(local, LAST, null);
    write(local, RECENT, null);
  },
};
