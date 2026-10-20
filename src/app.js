import { CONFIG } from './config.js';
import { Dictation, speechErrorMessage } from './speech.js';
import { resolveProvider, friendly, AiError } from './ai.js';
import { store } from './storage.js';
import {
  NOTE_TYPES,
  NOT_RECORDED,
  EXAMPLE_DICTATION,
  appendSegment,
  buildPrompt,
  extractJson,
  normaliseNote,
  isEmptyNote,
  toPlainText,
} from './note.js';

const $ = (id) => document.getElementById(id);
const els = {
  mic: $('mic'), micLabel: $('mic-label'), micStatus: $('mic-status'), timer: $('timer'),
  banner: $('banner'), transcript: $('transcript'), interim: $('interim'), example: $('load-example'),
  clear: $('clear'), create: $('create'), stop: $('stop'), elapsed: $('working-elapsed'),
  back: $('back'), noteTitle: $('note-title'), checks: $('checks'), checkList: $('check-list'),
  note: $('note'), plain: $('plain'), copy: $('copy'), newBtn: $('new'),
  settings: $('settings'), openSettings: $('open-settings'), clinician: $('clinician'), model: $('model'),
  apiKey: $('api-key'), rememberKey: $('remember-key'), keyField: $('key-field'), conn: $('conn-status'),
  forget: $('forget'), toast: $('toast'), toastText: $('toast-text'), toastAction: $('toast-action'),
  views: { record: $('view-record'), working: $('view-working'), note: $('view-note') },
};

let settings = store.loadSettings();
let provider = null;
let currentNote = null;
let aborter = null;
let busy = false;
let wakeLock = null;
let timerId = null;
let startedAt = 0;

/* ---------------- helpers ---------------- */

function el(tag, props = {}, children = []) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class') n.className = v;
    else if (k === 'text') n.textContent = v;
    else n.setAttribute(k, v);
  }
  for (const c of [].concat(children)) if (c !== null && c !== undefined && c !== false) n.append(c);
  return n;
}

function showView(name) {
  for (const [k, v] of Object.entries(els.views)) v.hidden = k !== name;
  els.toast.hidden = true;
  document.body.dataset.view = name;
  window.scrollTo({ top: 0 });
}

let toastTimer = null;
function toast(text, action) {
  els.toastText.textContent = text;
  els.toastAction.hidden = !action;
  if (action) {
    els.toastAction.textContent = action.label;
    els.toastAction.onclick = () => {
      action.run();
      els.toast.hidden = true;
    };
  }
  els.toast.hidden = false;
  clearTimeout(toastTimer);
  // Toasts with an Undo stay until the next action, so nobody is rushed (WCAG 2.2.1).
  if (!action) toastTimer = setTimeout(() => (els.toast.hidden = true), 3500);
}

function banner(text, tone = 'warn') {
  els.banner.textContent = text || '';
  els.banner.dataset.tone = tone;
  els.banner.hidden = !text;
}

const noteType = () => document.querySelector('input[name="type"]:checked')?.value || 'consult';

function updateCreateState() {
  const has = els.transcript.value.trim().length > 0;
  els.create.disabled = !has || dictation.state !== 'idle' || busy;
  els.clear.disabled = !has;
  els.example.hidden = has;
}

function autoGrow(ta) {
  ta.style.height = 'auto';
  ta.style.height = Math.min(ta.scrollHeight + 2, window.innerHeight * 0.6) + 'px';
}

function setTranscript(text) {
  els.transcript.value = text;
  store.saveDraft(text);
  autoGrow(els.transcript);
  updateCreateState();
}

/* ---------------- dictation ---------------- */

const dictation = new Dictation({ lang: CONFIG.speechLang });

const fmt = (ms) => {
  const s = Math.floor(ms / 1000);
  return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
};

let wantAwake = false;
let wakePending = null;
async function keepAwake(on) {
  wantAwake = on;
  if (!('wakeLock' in navigator)) return;
  if (wakePending) await wakePending.catch(() => {}); // one request at a time
  try {
    if (wantAwake && !wakeLock) {
      wakePending = navigator.wakeLock.request('screen');
      const lock = await wakePending;
      lock.addEventListener('release', () => {
        if (wakeLock === lock) wakeLock = null;
      });
      wakeLock = lock;
    }
  } catch {
    /* not granted or page hidden; the screen may sleep */
  } finally {
    wakePending = null;
  }
  if (!wantAwake && wakeLock) {
    const lock = wakeLock;
    wakeLock = null;
    lock.release().catch(() => {});
  }
}

// A short double beep and a buzz when dictation stops without being asked, so a vet who isn't looking knows.
let audioCtx = null;
function unlockAudio() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC && !audioCtx) audioCtx = new AC();
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  } catch {
    audioCtx = null;
  }
}
function alertStopped() {
  try {
    if (navigator.vibrate) navigator.vibrate([120, 80, 120]);
  } catch {
    /* ignore */
  }
  if (!audioCtx) return;
  try {
    const t = audioCtx.currentTime;
    for (const at of [0, 0.22]) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.frequency.value = 660;
      gain.gain.setValueAtTime(0.0001, t + at);
      gain.gain.exponentialRampToValueAtTime(0.15, t + at + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + at + 0.16);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(t + at);
      osc.stop(t + at + 0.18);
    }
  } catch {
    /* ignore */
  }
}

dictation.onstate = (state) => {
  const on = state !== 'idle';
  document.body.dataset.mic = state;
  els.mic.setAttribute('aria-pressed', String(on));
  els.micStatus.textContent =
    state === 'starting'
      ? 'Starting the microphone…'
      : state === 'listening'
        ? 'Listening. Tap to stop'
        : !dictation.supported
          ? 'Tap the box below, then use your keyboard’s mic key to dictate'
          : els.transcript.value.trim()
            ? 'Tap the mic to add more'
            : 'Tap the mic and talk through the consult';
  els.transcript.readOnly = on;
  clearInterval(timerId);
  if (on) {
    if (!startedAt) startedAt = Date.now();
    els.timer.hidden = false;
    timerId = setInterval(() => (els.timer.textContent = fmt(Date.now() - startedAt)), 500);
  } else {
    startedAt = 0;
    els.timer.hidden = true;
    els.timer.textContent = '00:00';
    els.interim.textContent = '';
  }
  keepAwake(on);
  updateCreateState();
};
dictation.oninterim = (t) => {
  els.interim.textContent = t;
};
dictation.onfinal = (t) => {
  setTranscript(appendSegment(els.transcript.value, t));
  els.transcript.scrollTop = els.transcript.scrollHeight;
};
dictation.onerror = (code) => {
  if (code === 'interrupted' || code === 'network' || code === 'audio-capture') alertStopped();
  const blockedInClaude = globalThis.claude && (code === 'not-allowed' || code === 'service-not-allowed');
  banner(
    blockedInClaude
      ? 'The live mic is blocked inside Claude. Tap the box below and use your keyboard’s mic key (Windows + H on a PC), or open the web app version.'
      : speechErrorMessage(code),
  );
  if (code === 'unsupported' || code === 'not-allowed' || code === 'service-not-allowed') els.transcript.focus();
};

els.mic.addEventListener('click', () => {
  if (busy) return;
  if (dictation.state !== 'idle') {
    dictation.stop();
    return;
  }
  banner('');
  els.toast.hidden = true;
  unlockAudio();
  if (els.transcript.value === EXAMPLE_DICTATION) setTranscript('');
  dictation.start();
});

if (!dictation.supported) document.body.dataset.speech = 'none';

/* ---------------- transcript ---------------- */

els.transcript.addEventListener('input', () => {
  els.toast.hidden = true; // an old Undo would overwrite what was just typed
  store.saveDraft(els.transcript.value);
  autoGrow(els.transcript);
  updateCreateState();
});

els.example.addEventListener('click', () => {
  dictation.cancel();
  setTranscript(EXAMPLE_DICTATION);
  banner('');
  els.create.focus();
  toast('Example loaded. Tap Create note to see the result.');
});

els.clear.addEventListener('click', () => {
  const previous = els.transcript.value;
  if (!previous) return;
  dictation.cancel();
  setTranscript('');
  banner('');
  toast('Dictation cleared.', { label: 'Undo', run: () => setTranscript(previous) });
  els.mic.focus();
});

document.querySelectorAll('input[name="type"]').forEach((r) =>
  r.addEventListener('change', () => {
    settings.noteType = noteType();
    store.saveSettings(settings);
  }),
);

/* ---------------- create note ---------------- */

async function ensureProvider() {
  provider = await resolveProvider(settings);
  return provider;
}

async function createNote() {
  if (busy) return;
  const text = els.transcript.value.trim();
  if (!text) return;
  if (text.split(/\s+/).length < 8) {
    banner('That’s quite short. Add the exam findings and plan, then create the note.');
    return;
  }
  busy = true;
  els.create.disabled = true;
  dictation.stop();
  if (!(await ensureProvider())) {
    busy = false;
    updateCreateState();
    els.create.focus();
    openSettings('Add an API key to start writing notes.');
    return;
  }
  banner('');
  showView('working');
  els.stop.focus();
  const t0 = Date.now();
  const tick = setInterval(() => {
    const s = Math.round((Date.now() - t0) / 1000);
    els.elapsed.textContent = s < 8 ? 'Usually 10 to 40 seconds' : `${s} seconds…`;
  }, 1000);
  aborter = new AbortController();
  try {
    const reply = await provider.generate(buildPrompt(text, noteType(), { clinician: settings.clinician }), aborter.signal);
    const note = normaliseNote(extractJson(reply));
    if (isEmptyNote(note)) throw new AiError('empty', '');
    if (settings.clinician && !note.visit.clinician) note.visit.clinician = settings.clinician;
    if (!note.visit.type) note.visit.type = NOTE_TYPES[noteType()].title;
    currentNote = note;
    renderNote(note);
    showView('note');
    els.noteTitle.focus();
  } catch (e) {
    showView('record');
    busy = false;
    updateCreateState();
    els.create.focus();
    if (e && e.code === 'cancelled') toast('Stopped. Your dictation is still here.');
    else {
      banner(friendly(e), 'error');
      if (e && (e.code === 'bad_key' || e.code === 'forbidden') && provider && provider.id === 'key') openSettings(friendly(e));
    }
  } finally {
    clearInterval(tick);
    aborter = null;
    busy = false;
    updateCreateState();
  }
}

els.create.addEventListener('click', createNote);
els.stop.addEventListener('click', () => aborter && aborter.abort());
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !els.views.record.hidden && !els.create.disabled) {
    e.preventDefault();
    createNote();
  }
  if (e.key === 'Escape' && !els.views.working.hidden && aborter) aborter.abort();
});

/* ---------------- render note ---------------- */

const value = (v, suffix = '') => (v ? el('span', { class: 'v', text: v + suffix }) : el('span', { class: 'v nr', text: NOT_RECORDED }));
const kv = (k, v, suffix) => el('div', { class: 'kv' }, [el('span', { class: 'k', text: k }), value(v, suffix)]);
const list = (items, ordered = false) =>
  items.length ? el(ordered ? 'ol' : 'ul', {}, items.map((x) => el('li', { text: x }))) : el('p', { class: 'nr', text: NOT_RECORDED });

function soap(letter, title, body) {
  return el('section', { class: 'soap' }, [
    el('div', { class: 'letter', 'aria-hidden': 'true', text: letter }),
    el('div', { class: 'soap-body' }, [el('h2', { text: title }), ...[].concat(body)]),
  ]);
}

function renderNote(n) {
  const p = n.patient;
  const vt = n.objective.vitals;
  els.checkList.replaceChildren(...n.check.map((c) => el('li', { text: c })));
  els.checks.hidden = n.check.length === 0;
  els.noteTitle.textContent = n.visit.type || 'Clinical note';

  const patient = el('div', { class: 'patient' }, [
    el('p', { class: 'pname' }, [
      el('strong', { text: p.name || 'Unnamed patient' }),
      el('span', { text: [p.species, p.breed].filter(Boolean).join(' · ') }),
    ]),
    el('div', { class: 'grid' }, [
      kv('Sex', p.sex), kv('Age', p.age), kv('Weight', p.weight_kg, ' kg'), kv('Animal ID', p.animal_id),
      kv('Microchip', p.microchip), kv('Intake', p.intake_type), kv('Clinician', n.visit.clinician),
    ]),
  ]);

  const vitals = el('div', { class: 'vitals' }, [
    kv('Temp', vt.temp_c, vt.temp_c && !/°/.test(vt.temp_c) ? ' °C' : ''),
    kv('HR', vt.hr_bpm, vt.hr_bpm && /^\d+$/.test(vt.hr_bpm) ? ' bpm' : ''),
    kv('RR', vt.rr_bpm, vt.rr_bpm && /^\d+$/.test(vt.rr_bpm) ? ' bpm' : ''),
    kv('BCS', vt.bcs), kv('MM / CRT', vt.mm_crt), kv('Hydration', vt.hydration),
  ]);

  const plan = [];
  if (n.plan.procedures.length) plan.push(el('h3', { text: 'Procedures' }), list(n.plan.procedures));
  if (n.plan.diagnostics.length) plan.push(el('h3', { text: 'Diagnostics' }), list(n.plan.diagnostics));
  if (n.plan.treatments.length) {
    plan.push(
      el('h3', { text: 'Medications' }),
      el('ul', { class: 'meds' }, n.plan.treatments.map((t) =>
        el('li', {}, [
          el('strong', { text: t.drug || 'Unnamed drug' }),
          el('span', { class: 'regimen', text: [t.dose, t.route, t.frequency, t.duration].filter(Boolean).join(' · ') || NOT_RECORDED }),
        ]),
      )),
    );
  }
  if (n.plan.follow_up.length) plan.push(el('h3', { text: 'Follow-up' }), list(n.plan.follow_up));
  if (!plan.length) plan.push(el('p', { class: 'nr', text: NOT_RECORDED }));

  const assess = [list(n.assessment.problems, true)];
  if (n.assessment.differentials.length) assess.push(el('h3', { text: 'Differentials' }), list(n.assessment.differentials));

  els.note.replaceChildren(
    patient,
    soap('S', 'History', el('p', { class: n.subjective ? '' : 'nr', text: n.subjective || NOT_RECORDED })),
    soap('O', 'Examination', [vitals, list(n.objective.findings)]),
    soap('A', 'Assessment', assess),
    soap('P', 'Plan', plan),
    ...(n.welfare_notes ? [soap('W', 'Welfare notes', el('p', { text: n.welfare_notes }))] : []),
  );
  els.plain.value = toPlainText(n);
  els.copy.textContent = 'Copy note';
}

/* ---------------- note actions ---------------- */

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const d = document.querySelector('details.edit');
    d.open = true;
    els.plain.focus();
    els.plain.select();
    try {
      return document.execCommand('copy');
    } catch {
      return false;
    }
  }
}

els.copy.addEventListener('click', async () => {
  const ok = await copyText(els.plain.value);
  if (ok) {
    els.copy.textContent = 'Copied ✓';
    toast('Copied. Paste it into the patient record.');
    setTimeout(() => (els.copy.textContent = 'Copy note'), 2500);
  } else toast('Text selected. Press Ctrl+C, or long-press and choose Copy.');
});

els.back.addEventListener('click', () => {
  showView('record');
  els.transcript.focus();
});

els.newBtn.addEventListener('click', () => {
  const previous = els.transcript.value;
  const prevNote = currentNote;
  const prevPlain = els.plain.value;
  setTranscript('');
  currentNote = null;
  showView('record');
  els.mic.focus();
  toast('Ready for the next consult.', {
    label: 'Undo',
    run: () => {
      setTranscript(previous);
      if (prevNote) {
        currentNote = prevNote;
        renderNote(prevNote);
        els.plain.value = prevPlain;
        showView('note');
      }
    },
  });
});

/* ---------------- settings ---------------- */

for (const m of CONFIG.models) els.model.append(el('option', { value: m.id, text: m.label }));

async function refreshConnection() {
  const p = await resolveProvider(settings);
  const keyless = Boolean(CONFIG.proxyUrl) || (p && p.id === 'claude');
  els.keyField.hidden = keyless;
  els.conn.dataset.ok = String(Boolean(p));
  els.conn.textContent = p ? `Connected: ${p.label}` : 'Not connected yet. Add an API key to write notes.';
  return p;
}

async function openSettings(message) {
  els.clinician.value = settings.clinician;
  els.model.value = settings.model || CONFIG.defaultModel;
  els.apiKey.value = settings.apiKey;
  els.rememberKey.checked = settings.rememberKey;
  await refreshConnection();
  if (message) {
    els.conn.textContent = message;
    els.conn.dataset.ok = 'false';
  }
  els.settings.returnValue = '';
  if (!els.settings.open) els.settings.showModal();
  (els.keyField.hidden || settings.apiKey ? els.clinician : els.apiKey).focus();
}

els.openSettings.addEventListener('click', () => openSettings());
$('close-settings').addEventListener('click', () => els.settings.close('close'));

els.settings.addEventListener('close', async () => {
  if (els.settings.returnValue !== 'save') return;
  const key = els.apiKey.value.trim();
  settings = {
    ...settings,
    clinician: els.clinician.value.trim().slice(0, 80),
    model: els.model.value,
    apiKey: key,
    rememberKey: els.rememberKey.checked,
  };
  store.saveSettings(settings);
  provider = null;
  if (key && !/^sk-ant-/.test(key)) toast('Saved, but that doesn’t look like an Anthropic key. Keys start with sk-ant-.');
  else toast('Settings saved.');
});

els.forget.addEventListener('click', () => {
  store.clearAll();
  settings = store.loadSettings();
  els.clinician.value = '';
  els.apiKey.value = '';
  els.rememberKey.checked = false;
  els.model.value = CONFIG.defaultModel;
  refreshConnection();
  toast('Saved settings and key removed from this device.');
});

/* ---------------- start up ---------------- */

const startType = settings.noteType in NOTE_TYPES ? settings.noteType : 'consult';
document.querySelector(`input[name="type"][value="${startType}"]`).checked = true;
setTranscript(store.loadDraft());
showView('record');
dictation.onstate('idle');

window.addEventListener('beforeunload', (e) => {
  if (dictation.state !== 'idle' || aborter) {
    e.preventDefault();
    e.returnValue = '';
  }
});
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && dictation.state !== 'idle') keepAwake(true);
});

const inClaude = Boolean(globalThis.claude);
if ('serviceWorker' in navigator && location.protocol === 'https:' && !inClaude) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

// Exposed for end-to-end tests only.
window.__scribe = { get note() { return currentNote; }, get provider() { return provider && provider.id; } };
