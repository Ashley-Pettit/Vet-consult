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

const SETTINGS = 'vcs.settings';
const DRAFT = 'vcs.draft';
const SESSION_KEY = 'vcs.key';

export const store = {
  loadSettings() {
    const s = read(local, SETTINGS, {}) || {};
    const sessionKey = read(session, SESSION_KEY, '');
    return {
      clinician: typeof s.clinician === 'string' ? s.clinician : '',
      model: typeof s.model === 'string' ? s.model : '',
      noteType: typeof s.noteType === 'string' ? s.noteType : 'consult',
      mode: ['carer', 'inspector', 'adoption'].includes(s.mode) ? s.mode : 'vet',
      org: {
        name: typeof s.org?.name === 'string' ? s.org.name : '',
        style: typeof s.org?.style === 'string' ? s.org.style : '',
        primary: typeof s.org?.primary === 'string' ? s.org.primary : '',
        secondary: typeof s.org?.secondary === 'string' ? s.org.secondary : '',
      },
      rememberKey: Boolean(s.rememberKey),
      apiKey: (s.rememberKey && typeof s.apiKey === 'string' ? s.apiKey : sessionKey) || '',
    };
  },
  saveSettings(s) {
    write(local, SETTINGS, {
      clinician: s.clinician || '',
      model: s.model || '',
      noteType: s.noteType || 'consult',
      mode: ['carer', 'inspector', 'adoption'].includes(s.mode) ? s.mode : 'vet',
      org: s.org || { name: '', style: '', primary: '', secondary: '' },
      rememberKey: Boolean(s.rememberKey),
      apiKey: s.rememberKey ? s.apiKey || '' : '',
    });
    write(session, SESSION_KEY, s.rememberKey ? null : s.apiKey || null);
  },
  loadDraft() {
    return read(session, DRAFT, '') || '';
  },
  saveDraft(text) {
    write(session, DRAFT, text ? text : null);
  },
  clearAll() {
    write(local, SETTINGS, null);
    write(session, SESSION_KEY, null);
    write(session, DRAFT, null);
  },
};
