import { CONFIG } from './config.js';
import { Dictation, speechErrorMessage } from './speech.js';
import { resolveProvider, friendly, AiError } from './ai.js';
import { store } from './storage.js';
import { localChecks } from './clinical.js';
import { preparePhoto, MAX_PHOTOS } from './photos.js';
import { ABOUT_HTML } from './about.js';
import { lookupSource, sourcesForPrompt, SOURCE_IDS } from './sources.js';
import {
  NOTE_TYPES,
  NOTE_TYPE_ORDER,
  NOT_RECORDED,
  EXAMPLE_DICTATION,
  EXAMPLE_NOTE,
  EXAMPLE_BATCH_DICTATION,
  EXAMPLE_BATCH_NOTES,
  EXAMPLE_CARE_SHEET,
  EXAMPLE_CARER_DICTATION,
  EXAMPLE_CARER_PLAN,
  EXAMPLE_FOSTER_DICTATION,
  EXAMPLE_FOSTER_PLAN,
  buildCarerPlanPrompt,
  DOC_KINDS,
  buildDocPrompt,
  normaliseDoc,
  docText,
  dueLabel,
  EXAMPLE_INSPECTOR_DICTATION,
  EXAMPLE_INSPECTOR_DOC,
  EXAMPLE_ADOPTION_DICTATION,
  EXAMPLE_ADOPTION_DOC,
  appendSegment,
  buildPrompt,
  buildRevisionPrompt,
  buildCareSheetPrompt,
  extractJson,
  normaliseNote,
  normaliseResult,
  normaliseCareSheet,
  careSheetText,
  pmsSections,
  toPlainText,
} from './note.js';

const $ = (id) => document.getElementById(id);
const els = {
  mic: $('mic'), micStatus: $('mic-status'), timer: $('timer'), coach: $('kb-coach'), coachText: $('kb-coach-text'),
  banner: $('banner'), transcript: $('transcript'), interim: $('interim'), examples: $('examples'),
  example: $('load-example'), batchExample: $('load-batch-example'),
  photoInput: $('add-photo'), photoList: $('photo-list'), photoLabel: $('add-photo-label'),
  clear: $('clear'), create: $('create'), stop: $('stop'), elapsed: $('working-elapsed'),
  workingTitle: $('working-title'), workingSub: $('working-sub'),
  back: $('back'), noteTitle: $('note-title'), animals: $('animals'), noteBanner: $('note-banner'),
  checks: $('checks'), checkList: $('check-list'), note: $('note'), pmsRows: $('pms-rows'),
  plain: $('plain'), copy: $('copy'), care: $('care'),
  careSheet: $('care-sheet'), careBanner: $('care-banner'), careTitle: $('care-title'), careCopy: $('care-copy'),
  about: $('view-about'), openAbout: $('open-about'),
  settings: $('settings'), openSettings: $('open-settings'), clinician: $('clinician'), model: $('model'),
  apiKey: $('api-key'), rememberKey: $('remember-key'), keyField: $('key-field'), conn: $('conn-status'),
  forget: $('forget'), toast: $('toast'), toastText: $('toast-text'), toastAction: $('toast-action'),
  views: { record: $('view-record'), working: $('view-working'), note: $('view-note'), care: $('view-care'), doc: $('view-doc'), about: $('view-about') },
};

const inClaude = Boolean(globalThis.claude);
let settings = store.loadSettings();
let provider = null;
let notes = [];
let current = 0;
let isExample = false;
let careSheet = null;
let photos = [];
let aborter = null;
let busy = false;
let wakeLock = null;
let timerId = null;
let startedAt = 0;
let lastView = 'record';

const currentNote = () => notes[current] || null;

/* ---------------- helpers ---------------- */

function el(tag, props = {}, children = []) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class') n.className = v;
    else if (k === 'text') n.textContent = v;
    else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2), v);
    else if (v !== false && v !== null && v !== undefined) n.setAttribute(k, v);
  }
  for (const c of [].concat(children)) if (c !== null && c !== undefined && c !== false) n.append(c);
  return n;
}

function showView(name) {
  for (const [k, v] of Object.entries(els.views)) v.hidden = k !== name;
  if (name !== 'about') lastView = name;
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


function updateCreateState() {
  const has = els.transcript.value.trim().length > 0;
  els.create.disabled = !has || busy; // allowed while listening: it stops the mic first
  els.clear.disabled = !has && photos.length === 0;
  els.examples.hidden = has;
  if (dictation.state === 'idle' && document.body.dataset.mic !== 'keyboard') els.micStatus.textContent = idleStatus();
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

async function copyText(text, fallbackEl) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    if (fallbackEl) {
      const d = fallbackEl.closest('details');
      if (d) d.open = true;
      fallbackEl.focus();
      if (fallbackEl.select) fallbackEl.select();
    }
    try {
      return document.execCommand('copy');
    } catch {
      return false;
    }
  }
}

/* ---------------- voice: live mic or the keyboard's own voice typing ---------------- */

const dictation = new Dictation({ lang: CONFIG.speechLang });
// Inside Claude the page can't use the mic directly, so it hands over to the keyboard's voice typing.
const keyboardVoice = inClaude || !dictation.supported;
document.body.dataset.voice = keyboardVoice ? 'keyboard' : 'live';

// Android: one short line, with the Samsung tip tucked behind a link, so the help never pushes the text box
// down behind the keyboard. Keyboards put their mic on different sides, so the hint names the row, not a side.
const ANDROID_TIP = 'Tap the 🎤 in the row just above the letters, then talk.';
const ANDROID_NO_MIC = 'On a Samsung keyboard, tap ⋯ on the bar above the keys, then Voice input. On others, look for a 🎤 left or right of that bar.';
function showCoach() {
  const box = els.coachText;
  box.replaceChildren();
  if (/Android/i.test(navigator.userAgent)) {
    const more = el('details', { class: 'coach-more' }, [el('summary', { text: 'No 🎤?' }), el('p', { text: ANDROID_NO_MIC })]);
    // Opening the tip mustn't close the keyboard: keep the text box focused.
    more.addEventListener('pointerdown', (e) => e.preventDefault());
    more.addEventListener('toggle', () => els.transcript.focus({ preventScroll: true }));
    box.append(el('span', { text: ANDROID_TIP }), ' ', more);
  } else box.textContent = keyboardTip();
}
// Keep the help and the text box in view above the on-screen keyboard as it opens.
function keepTypingInView() {
  const show = () => document.body.dataset.mic === 'keyboard' && els.coach.scrollIntoView({ block: 'start', behavior: 'smooth' });
  show();
  const vv = window.visualViewport;
  if (vv) vv.addEventListener('resize', show, { once: true });
}
function keyboardTip() {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return 'Tap the microphone on your keyboard (bottom right) and start talking.';
  if (/Android/i.test(ua)) return 'Tap the 🎤 on your keyboard (top right) and start talking.';
  if (/Mac/i.test(ua)) return 'Press the dictation key (or Fn twice) and start talking.';
  if (/Windows/i.test(ua)) return 'Press Windows + H and start talking.';
  return 'Use your keyboard’s voice typing and start talking.';
}

const fmt = (ms) => {
  const s = Math.floor(ms / 1000);
  return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
};

let wantAwake = false;
let wakePending = null;
async function keepAwake(on) {
  wantAwake = on;
  if (!('wakeLock' in navigator)) return;
  if (wakePending) await wakePending.catch(() => {});
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
    /* not granted; the screen may sleep */
  } finally {
    wakePending = null;
  }
  if (!wantAwake && wakeLock) {
    const lock = wakeLock;
    wakeLock = null;
    lock.release().catch(() => {});
  }
}

// A short double beep and a buzz when dictation stops without being asked.
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

function idleStatus() {
  if (['inspector', 'adoption'].includes(document.body.dataset.mode)) return els.transcript.value.trim() ? 'Tap the mic to add more' : 'Tap the mic and talk it through';
  if (document.body.dataset.mode === 'carer') return els.transcript.value.trim() ? 'Tap the mic to add more' : 'Tap the mic and describe the animal’s care';
  if (keyboardVoice) return els.transcript.value.trim() ? 'Tap the mic to add more by voice' : 'Tap the mic, then talk through the consult';
  return els.transcript.value.trim() ? 'Tap the mic to add more' : 'Tap the mic and talk through the consult';
}

dictation.onstate = (state) => {
  const on = state !== 'idle';
  document.body.dataset.mic = state;
  els.mic.setAttribute('aria-pressed', String(on));
  els.micStatus.textContent = state === 'starting' ? 'Starting the microphone…' : state === 'listening' ? 'Listening. Tap to stop' : idleStatus();
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
dictation.oninterim = (t) => (els.interim.textContent = t);
dictation.onfinal = (t) => {
  setTranscript(appendSegment(els.transcript.value, t));
  els.transcript.scrollTop = els.transcript.scrollHeight;
};
dictation.onerror = (code) => {
  if (code === 'interrupted' || code === 'network' || code === 'audio-capture') alertStopped();
  banner(speechErrorMessage(code));
  if (code === 'unsupported' || code === 'not-allowed' || code === 'service-not-allowed') startKeyboardVoice();
};

function startKeyboardVoice() {
  showCoach();
  requestAnimationFrame(keepTypingInView);
  els.coach.hidden = false;
  document.body.dataset.mic = 'keyboard';
  els.mic.setAttribute('aria-pressed', 'true');
  els.micStatus.textContent = 'Voice typing. Talk, then tap Create note';
  const ta = els.transcript;
  ta.focus();
  const end = ta.value.length;
  try {
    ta.setSelectionRange(end, end);
  } catch {
    /* ignore */
  }
  if (end && !/\s$/.test(ta.value)) {
    ta.value += ta.value.endsWith('.') ? ' ' : '. ';
    ta.setSelectionRange(ta.value.length, ta.value.length);
  }
}
function endKeyboardVoice() {
  els.coach.hidden = true;
  if (document.body.dataset.mic === 'keyboard') {
    document.body.dataset.mic = 'idle';
    els.mic.setAttribute('aria-pressed', 'false');
    els.micStatus.textContent = idleStatus();
  }
}

// Remember whether voice typing was on before the tap blurs the text box and switches it off.
let kbWasOn = false;
els.mic.addEventListener('pointerdown', () => (kbWasOn = document.body.dataset.mic === 'keyboard'));
els.mic.addEventListener('keydown', () => (kbWasOn = document.body.dataset.mic === 'keyboard'));
els.mic.addEventListener('click', () => {
  if (busy) return;
  banner('');
  els.toast.hidden = true;
  if ([EXAMPLE_DICTATION, EXAMPLE_BATCH_DICTATION, EXAMPLE_CARER_DICTATION, EXAMPLE_FOSTER_DICTATION, EXAMPLE_INSPECTOR_DICTATION, EXAMPLE_ADOPTION_DICTATION].includes(els.transcript.value)) setTranscript('');
  if (keyboardVoice) {
    const wasOn = kbWasOn || document.body.dataset.mic === 'keyboard';
    kbWasOn = false;
    if (wasOn) {
      els.transcript.blur();
      endKeyboardVoice();
    } else startKeyboardVoice();
    return;
  }
  if (dictation.state !== 'idle') {
    dictation.stop();
    return;
  }
  unlockAudio();
  dictation.start();
});
// Keep the coach mark only while the keyboard is up.
els.transcript.addEventListener('blur', () => setTimeout(() => document.activeElement !== els.transcript && endKeyboardVoice(), 150));

/* ---------------- transcript and examples ---------------- */

els.transcript.addEventListener('input', () => {
  els.toast.hidden = true;
  store.saveDraft(els.transcript.value);
  autoGrow(els.transcript);
  updateCreateState();
});

function loadExample(text) {
  dictation.cancel();
  setTranscript(text);
  banner('');
  els.create.focus();
  toast('Example loaded. Tap Create note to see the result.');
}
els.example.addEventListener('click', () => loadExample(EXAMPLE_DICTATION));
$('load-carer-example').addEventListener('click', () => loadExample(EXAMPLE_CARER_DICTATION));
$('load-foster-example').addEventListener('click', () => loadExample(EXAMPLE_FOSTER_DICTATION));
$('load-inspector-example').addEventListener('click', () => loadExample(EXAMPLE_INSPECTOR_DICTATION));
$('load-adoption-example').addEventListener('click', () => loadExample(EXAMPLE_ADOPTION_DICTATION));
els.batchExample.addEventListener('click', () => loadExample(EXAMPLE_BATCH_DICTATION));

els.clear.addEventListener('click', () => {
  const previous = els.transcript.value;
  const prevPhotos = photos;
  dictation.cancel();
  endKeyboardVoice();
  setTranscript('');
  photos = [];
  renderPhotos();
  banner('');
  toast('Dictation cleared.', {
    label: 'Undo',
    run: () => {
      setTranscript(previous);
      photos = prevPhotos;
      renderPhotos();
    },
  });
  els.mic.focus();
});

/* ---------------- photos ---------------- */

function renderPhotos() {
  els.photoList.replaceChildren(
    ...photos.map((p, i) =>
      el('figure', { class: 'thumb' }, [
        el('img', { src: p.url, alt: `Photo ${i + 1}` }),
        el('figcaption', { text: String(i + 1) }),
        el('button', {
          type: 'button', class: 'thumb-x', 'aria-label': `Remove photo ${i + 1}`,
          onclick: () => {
            URL.revokeObjectURL(p.url);
            photos.splice(i, 1);
            renderPhotos();
          },
        }, '×'),
      ]),
    ),
  );
  els.photoLabel.hidden = photos.length >= MAX_PHOTOS;
  updateCreateState();
}

els.photoInput.addEventListener('change', async () => {
  const files = [...els.photoInput.files].slice(0, MAX_PHOTOS - photos.length);
  els.photoInput.value = '';
  for (const f of files) {
    try {
      photos.push(await preparePhoto(f));
    } catch {
      toast('That file couldn’t be read as a photo.');
    }
  }
  renderPhotos();
});

/* ---------------- talking to Claude ---------------- */

async function ensureProvider() {
  provider = await resolveProvider(settings);
  return provider;
}

const NO_CLAUDE = inClaude
  ? 'Claude isn’t available right now. Check you are signed in, then try again.'
  : 'This public demo can’t write notes from your own dictation. Open Consult Scribe in the Claude app to use it with your Claude account. The examples work here.';

function waitForIdle(ms = 2500) {
  return new Promise((resolve) => {
    const t0 = Date.now();
    const check = () => (dictation.state === 'idle' || Date.now() - t0 > ms ? resolve() : setTimeout(check, 50));
    check();
  });
}

/** Show the working screen and run one Claude call, with Stop and an elapsed timer. */
async function runWorking(title, sub, job) {
  els.workingTitle.textContent = title;
  els.workingSub.textContent = sub;
  showView('working');
  els.stop.focus();
  const t0 = Date.now();
  const tick = setInterval(() => {
    const s = Math.round((Date.now() - t0) / 1000);
    els.elapsed.textContent = s < 8 ? 'Usually 10 to 40 seconds' : `${s} seconds…`;
  }, 1000);
  els.elapsed.textContent = 'Usually 10 to 40 seconds';
  aborter = new AbortController();
  try {
    return await job(aborter.signal);
  } finally {
    clearInterval(tick);
    aborter = null;
  }
}

const mode = () => document.querySelector('input[name="mode"]:checked')?.value || 'vet';
const MODES = ['vet', 'carer', 'inspector', 'adoption'];

const MODE_TEXT = {
  vet: { button: 'Create notes', placeholder: 'Your words appear here as you talk. You can also type or fix anything.' },
  carer: { button: 'Create care plan', placeholder: 'Describe the animal, its condition, medications and anything the carer needs to know.' },
  inspector: { button: 'Create report', placeholder: 'Case number, the animal, your findings with measurements, your opinion and treatment given.' },
  adoption: { button: 'Create summary', placeholder: 'The animal, desexing, microchip, vaccinations, parasite treatment, health notes and diet.' },
};

function applyMode() {
  const m = mode();
  document.body.dataset.mode = m;
  els.create.textContent = MODE_TEXT[m].button;
  els.transcript.placeholder = MODE_TEXT[m].placeholder;
  document.querySelectorAll('[data-modes]').forEach((n) => (n.hidden = !n.dataset.modes.split(' ').includes(m)));
  if (dictation.state === 'idle' && document.body.dataset.mic !== 'keyboard') els.micStatus.textContent = idleStatus();
}
document.querySelectorAll('input[name="mode"]').forEach((r) =>
  r.addEventListener('change', () => {
    applyMode();
    settings.mode = mode();
    store.saveSettings(settings);
  }),
);

async function createNote() {
  if (busy) return;
  const text = els.transcript.value.trim();
  if (!text) return;
  busy = true;
  els.create.disabled = true;
  endKeyboardVoice();
  if (dictation.state !== 'idle') {
    dictation.stop();
    await waitForIdle();
  }
  const finalText = els.transcript.value.trim() || text;
  try {
    if (mode() === 'carer') return await createCarePlan(finalText);
    if (DOC_KINDS[mode()]) return await createDoc(mode(), finalText);
    if (!(await ensureProvider())) {
      if (finalText === EXAMPLE_DICTATION.trim()) return showNotes([normaliseNote(EXAMPLE_NOTE)], true);
      if (finalText === EXAMPLE_BATCH_DICTATION.trim()) return showNotes(EXAMPLE_BATCH_NOTES.map(normaliseNote), true);
      banner(NO_CLAUDE, 'info');
      return;
    }
    if (photos.length && !provider.images) {
      banner('Photos can’t be sent from this version. Remove them to continue.', 'error');
      return;
    }
    banner('');
    const prompt = buildPrompt(finalText, { clinician: settings.clinician, photoCount: photos.length });
    const result = await runWorking(
      'Writing the clinical notes',
      'Claude is turning your words into SOAP notes.',
      (signal) => provider.generate(prompt, signal, { images: photos }),
    );
    const list = normaliseResult(extractJson(result));
    if (!list.length) throw new AiError('empty', '');
    for (const n of list) if (!n.visit.type) n.visit.type = NOTE_TYPES.consult.title;
    showNotes(list, false);
  } catch (e) {
    showView('record');
    els.create.focus();
    if (e && e.code === 'cancelled') toast('Stopped. Your dictation is still here.');
    else {
      banner(friendly(e), 'error');
      if (e && (e.code === 'bad_key' || e.code === 'forbidden') && provider && provider.id === 'key') openSettings(friendly(e));
    }
  } finally {
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

/* ---------------- note view ---------------- */

function showNotes(list, example) {
  for (const n of list) if (settings.clinician && !n.visit.clinician) n.visit.clinician = settings.clinician;
  notes = list;
  current = 0;
  isExample = example;
  careSheet = null;
  els.checks.open = false; // closed by default: open it to review
  renderNote();
  els.noteBanner.textContent = example
    ? inClaude
      ? 'This is the example note. Dictate your own consult to see Claude write one.'
      : 'This is the example note. In the Claude app, Consult Scribe writes notes like this from your own dictation.'
    : '';
  els.noteBanner.hidden = !example;
  showView('note');
  els.noteTitle.focus();
}

const value = (v, suffix = '') => (v ? el('span', { class: 'v', text: v + suffix }) : el('span', { class: 'v nr', text: NOT_RECORDED }));
const kv = (k, v, suffix, flag) =>
  el('div', { class: 'kv' + (flag ? ' flag' : '') }, [
    el('span', { class: 'k' }, [k, flag ? el('span', { class: 'pill', text: flag === 'high' ? 'High' : 'Low' }) : null]),
    value(v, suffix),
  ]);
const list = (items, ordered = false) =>
  items.length ? el(ordered ? 'ol' : 'ul', {}, items.map((x) => el('li', { text: x }))) : el('p', { class: 'nr', text: NOT_RECORDED });

function soap(letter, title, body) {
  return el('section', { class: 'soap' }, [
    el('div', { class: 'letter', 'aria-hidden': 'true', text: letter }),
    el('div', { class: 'soap-body' }, [el('h2', { text: title }), ...[].concat(body)]),
  ]);
}

function renderAnimals() {
  els.animals.hidden = notes.length < 2;
  els.animals.replaceChildren(
    ...notes.map((n, i) =>
      el('button', {
        type: 'button',
        class: 'animal' + (i === current ? ' on' : ''),
        'aria-current': i === current ? 'true' : null,
        onclick: () => {
          current = i;
          careSheet = null;
          renderNote();
          els.noteTitle.focus();
        },
      }, [el('span', { class: 'n', text: String(i + 1) }), el('span', { text: n.patient.name || `Animal ${i + 1}` })]),
    ),
  );
}

function renderChecks(n, local) {
  const items = [...n.check.map((t) => ({ t, auto: false })), ...local.checks.map((t) => ({ t, auto: true }))];
  els.checks.hidden = items.length === 0;
  $('check-count').textContent = items.length ? String(items.length) : '';
  els.checkList.replaceChildren(
    ...items.map(({ t, auto }) => {
      const li = el('li', { class: 'check-item' });
      li.append(
        el('button', { type: 'button', class: 'check-row', 'aria-label': `${t} Answer`, onclick: () => openAnswer(li, t) }, [
          el('span', { class: 'check-text' }, [auto ? el('span', { class: 'tag', title: 'Worked out on this device', text: 'Auto' }) : null, t]),
          el('span', { class: 'check-go', 'aria-hidden': 'true', text: 'Answer' }),
        ]),
      );
      return li;
    }),
  );
}

const ICON_MIC = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="2.5" width="6" height="12" rx="3"/><path d="M5 10.5a7 7 0 0 0 14 0M12 17.5v4"/></svg>';
const ICON_SEND = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>';

function openAnswer(li, item) {
  const open = li.querySelector('.answer');
  if (open) return open.querySelector('input').focus();
  els.checkList.querySelectorAll('.answer').forEach((a) => a.remove()); // one at a time keeps it short
  const id = 'ans-' + Math.random().toString(36).slice(2, 8);
  const input = el('input', { id, type: 'text', autocomplete: 'off', enterkeyhint: 'send', placeholder: 'Type or speak your answer' });
  let voice = null;
  const micBtn = el('button', { type: 'button', class: 'ans-btn', 'aria-label': 'Answer by voice', 'aria-pressed': 'false' });
  micBtn.innerHTML = ICON_MIC;
  micBtn.addEventListener('click', () => {
    if (keyboardVoice) {
      input.focus();
      toast(keyboardTip());
      return;
    }
    if (voice && voice.state !== 'idle') return voice.stop();
    voice = new Dictation({ lang: CONFIG.speechLang });
    voice.onfinal = (t) => (input.value = appendSegment(input.value, t));
    voice.onstate = (st) => micBtn.setAttribute('aria-pressed', String(st !== 'idle'));
    voice.onerror = (c) => toast(speechErrorMessage(c));
    unlockAudio();
    voice.start();
  });
  const send = el('button', { type: 'button', class: 'ans-btn primary', 'aria-label': 'Update note' });
  send.innerHTML = ICON_SEND;
  const submit = async () => {
    voice && voice.stop();
    const answer = input.value.trim();
    if (!answer) return input.focus();
    await applyAnswer(item, answer);
  };
  send.addEventListener('click', submit);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    }
    if (e.key === 'Escape') {
      voice && voice.cancel();
      panel.remove();
    }
  });
  const panel = el('div', { class: 'answer' }, [el('label', { for: id, class: 'sr-only', text: `Answer: ${item}` }), input, micBtn, send]);
  li.append(panel);
  input.focus();
}

async function applyAnswer(item, answer) {
  if (!(await ensureProvider())) {
    toast(inClaude ? 'Claude isn’t available right now.' : 'Answering by voice needs the Claude app version.');
    return;
  }
  const idx = current;
  try {
    const reply = await runWorking('Updating the note', 'Adding your answer in the right place.', (signal) =>
      provider.generate(buildRevisionPrompt(notes[idx], item, answer), signal),
    );
    const [updated] = normaliseResult(extractJson(reply));
    if (!updated) throw new AiError('empty', '');
    notes[idx] = updated;
    careSheet = null;
    current = idx;
    renderNote();
    showView('note');
    toast('Note updated.');
  } catch (e) {
    showView('note');
    toast(e && e.code === 'cancelled' ? 'Stopped. The note hasn’t changed.' : friendly(e));
  }
}

function renderNote() {
  const n = currentNote();
  if (!n) return;
  const p = n.patient;
  const vt = n.objective.vitals;
  const local = localChecks(n);
  renderAnimals();
  renderChecks(n, local);
  els.noteTitle.textContent = n.visit.type || 'Clinical note';
  els.care.hidden = /euthanasia/i.test(n.visit.type);

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
    kv('Temp', vt.temp_c, vt.temp_c && !/°/.test(vt.temp_c) ? ' °C' : '', local.flags.temp_c),
    kv('HR', vt.hr_bpm, vt.hr_bpm && /^\d+$/.test(vt.hr_bpm) ? ' bpm' : '', local.flags.hr_bpm),
    kv('RR', vt.rr_bpm, vt.rr_bpm && /^\d+$/.test(vt.rr_bpm) ? ' bpm' : '', local.flags.rr_bpm),
    kv('BCS', vt.bcs), kv('MM / CRT', vt.mm_crt), kv('Hydration', vt.hydration),
  ]);

  const exam = [vitals, list(n.objective.findings)];
  if (n.objective.photo_findings.length || photosForNote().length) {
    exam.push(el('h3', { text: 'From photos' }));
    if (photosForNote().length) exam.push(el('div', { class: 'photo-list small' }, photosForNote().map((ph, i) => el('figure', { class: 'thumb' }, [el('img', { src: ph.url, alt: `Photo ${i + 1}` }), el('figcaption', { text: String(i + 1) })]))));
    if (n.objective.photo_findings.length) exam.push(list(n.objective.photo_findings));
  }

  const plan = [];
  if (n.plan.procedures.length) plan.push(el('h3', { text: 'Procedures' }), list(n.plan.procedures));
  if (n.plan.diagnostics.length) plan.push(el('h3', { text: 'Diagnostics' }), list(n.plan.diagnostics));
  if (n.plan.treatments.length) {
    const totals = new Map(local.doses.map((d) => [d.index, d]));
    plan.push(
      el('h3', { text: 'Medications' }),
      el('ul', { class: 'meds' }, n.plan.treatments.map((t, i) =>
        el('li', {}, [
          el('strong', { text: t.drug || 'Unnamed drug' }),
          el('span', { class: 'regimen', text: [t.dose, t.route, t.frequency, t.duration].filter(Boolean).join(' · ') || NOT_RECORDED }),
          totals.has(i)
            ? el('span', { class: 'calc' }, [el('span', { class: 'tag', text: 'Calculated' }), `${totals.get(i).total} per dose (${totals.get(i).working}). Confirm.`])
            : null,
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
    soap('O', 'Examination', exam),
    soap('A', 'Assessment', assess),
    soap('P', 'Plan', plan),
    ...(n.welfare_notes ? [soap('W', 'Welfare notes', el('p', { text: n.welfare_notes }))] : []),
  );

  const sec = pmsSections(n);
  els.plain.value = sec.clinical;
  requestAnimationFrame(() => fitPlain());
  renderPms(sec);
  els.copy.textContent = 'Copy note';
}

// The full text is always on show, sized to fit so nothing hides behind a scroll.
function fitPlain() {
  els.plain.style.height = 'auto';
  els.plain.style.height = els.plain.scrollHeight + 4 + 'px';
}
els.plain.addEventListener('input', fitPlain);

// Photos belong to the consult; only show them on single-animal notes to avoid implying which animal they show.
const photosForNote = () => (notes.length === 1 ? photos : []);

function renderPms(sec) {
  const rows = [
    ['Clinical notes', 'clinical', () => els.plain.value],
    ['Prescriptions', 'prescriptions', () => sec.prescriptions],
    ['Reminders', 'reminders', () => sec.reminders],
  ].filter(([, key]) => sec[key]);
  els.pmsRows.replaceChildren(
    ...rows.map(([label, key, get]) => {
      const btn = el('button', { type: 'button', class: 'btn ghost small', 'aria-label': `Copy ${label.toLowerCase()}` }, 'Copy');
      btn.addEventListener('click', async () => {
        const ok = await copyText(get(), key === 'clinical' ? els.plain : null);
        btn.textContent = ok ? 'Copied ✓' : 'Copy';
        if (ok) toast(`${label} copied. Paste into that field in your PMS.`);
        setTimeout(() => (btn.textContent = 'Copy'), 2500);
      });
      const preview = get().split('\n').filter(Boolean);
      return el('div', { class: 'pms-row' }, [
        el('div', { class: 'pms-text' }, [
          el('strong', { text: label }),
          el('span', { class: 'pms-preview', text: preview.slice(0, 2).join(' · ') + (preview.length > 2 ? ' …' : '') }),
        ]),
        btn,
      ]);
    }),
  );
}

els.copy.addEventListener('click', async () => {
  const ok = await copyText(els.plain.value, els.plain);
  if (ok) {
    els.copy.textContent = 'Copied ✓';
    toast('Copied. Paste it into the clinical notes in your PMS.');
    setTimeout(() => (els.copy.textContent = 'Copy note'), 2500);
  } else toast('Text selected. Press Ctrl+C, or long-press and choose Copy.');
});

// Add more info: back to the dictation with everything kept, ready to add what was missed.
function addMoreInfo() {
  showView('record');
  els.mic.focus();
  toast('Add what you missed, then create it again. Start over clears everything.');
}
els.back.addEventListener('click', addMoreInfo);


/* ---------------- care plan ---------------- */

let careFrom = 'note'; // where Back goes: the vet note, or the dictation screen

function renderCare(c) {
  const sec = (title, items, cls) => (items.length ? el('section', { class: 'care-sec ' + (cls || '') }, [el('h2', { text: title }), list(items)]) : null);
  const name = c.animal || currentNote()?.patient.name || '';
  els.careTitle.textContent = c.kind === 'wildlife' ? `Care plan: ${name || 'wildlife in care'}` : `Caring for ${name || 'your animal'} at home`;
  $('care-back-label').textContent = careFrom === 'note' ? 'Back to note' : 'Back';
  const log = c.daily_checks.length
    ? el('section', { class: 'care-sec' }, [
        el('h2', { text: `Daily tick sheet (${c.log_days} days)` }),
        el('div', { class: 'tbl', tabindex: '0', role: 'region', 'aria-label': 'Daily tick sheet' }, [
          el('table', { class: 'ticksheet' }, [
            el('thead', {}, [el('tr', {}, [el('th', { scope: 'col', text: 'Day' }), ...c.daily_checks.map((x) => el('th', { scope: 'col', text: x }))])]),
            el('tbody', {}, Array.from({ length: c.log_days }, (_, d) =>
              el('tr', {}, [el('th', { scope: 'row', text: String(d + 1) }), ...c.daily_checks.map(() => el('td', { 'aria-label': 'not ticked' }, el('span', { class: 'box' })))]),
            )),
          ]),
        ]),
      ])
    : null;
  const r = c.release;
  const release = r.ready_when.length || r.how.length || r.where
    ? el('section', { class: 'care-sec release' }, [
        el('h2', { text: 'Release' }),
        r.ready_when.length ? el('div', {}, [el('h3', { text: 'Ready when' }), list(r.ready_when)]) : null,
        r.how.length ? el('div', {}, [el('h3', { text: 'How to release' }), list(r.how)]) : null,
        r.where ? el('div', {}, [el('h3', { text: 'Where' }), el('p', { text: r.where })]) : null,
      ])
    : null;
  const refs = c.sources.map(lookupSource).filter(Boolean);
  els.careSheet.replaceChildren(
    ...[
      c.summary ? el('p', { class: 'care-summary', text: c.summary }) : null,
      c.medications.length
        ? el('section', { class: 'care-sec' }, [
            el('h2', { text: 'Medications' }),
            el('ul', { class: 'meds' }, c.medications.map((m) =>
              el('li', {}, [
                el('strong', { text: m.name }),
                el('span', { class: 'care-how', text: [m.how, m.how_often, m.how_long].filter(Boolean).join(' · ') }),
                m.tip ? el('span', { class: 'care-tip', text: `Tip: ${m.tip}` }) : null,
              ]),
            )),
          ])
        : null,
      c.plan.length
        ? el('section', { class: 'care-sec' }, [
            el('h2', { text: 'Day-by-day plan' }),
            el('ol', { class: 'timeline' }, c.plan.map((p) => el('li', {}, [el('strong', { text: p.when }), list(p.tasks)]))),
          ])
        : null,
      sec('Housing', c.housing),
      sec('Feeding', c.feeding),
      sec('Activity and handling', c.activity),
      sec('Other care', c.care),
      log,
      release,
      sec('Contact the vet within a day if', c.escalate.vet, 'watch'),
      sec('Get vet help straight away (or an after-hours emergency vet) if', c.escalate.urgent, 'urgent'),
      c.next_visit ? el('section', { class: 'care-sec next' }, [el('h2', { text: 'Next visit' }), el('p', { text: c.next_visit })]) : null,
      refs.length
        ? el('section', { class: 'care-sec' }, [
            el('h2', { text: 'Based on' }),
            el('ol', { class: 'sources' }, refs.map((s) =>
              el('li', {}, [
                el('a', { href: s.url, target: '_blank', rel: 'noopener', text: s.title }),
                ` (${s.publisher})`,
                el('span', { class: 'scope', text: s.scope === 'qld' ? 'QLD' : 'AU' }),
              ]),
            )),
          ])
        : null,
    ].filter(Boolean),
  );
}

function showCare(sheet, from, info = '') {
  careSheet = sheet;
  careFrom = from;
  renderCare(sheet);
  els.careBanner.textContent = info;
  els.careBanner.hidden = !info;
  showView('care');
  els.careTitle.focus();
}

async function openCare() {
  const n = currentNote();
  if (!n) return;
  if (careSheet && careFrom === 'note') return showCare(careSheet, 'note', els.careBanner.hidden ? '' : els.careBanner.textContent);
  if (!(await ensureProvider())) {
    if (isExample && n.patient.name === 'Rusty') showCare(normaliseCareSheet(EXAMPLE_CARE_SHEET, SOURCE_IDS()), 'note', 'This is the example care plan.');
    else toast(inClaude ? 'Claude isn’t available right now.' : 'Care plans for your own notes need the Claude app version.');
    return;
  }
  try {
    const reply = await runWorking('Writing the care plan', 'Everything the carer needs, from Queensland guidance.', (signal) =>
      provider.generate(buildCareSheetPrompt(n, sourcesForPrompt()), signal),
    );
    showCare(normaliseCareSheet(extractJson(reply), SOURCE_IDS()), 'note');
  } catch (e) {
    showView('note');
    toast(e && e.code === 'cancelled' ? 'Stopped.' : friendly(e));
  }
}

/** Carer plan mode: spoken comments go straight to a plan, no vet note in between. */
async function createCarePlan(text) {
  if (!(await ensureProvider())) {
    if (text === EXAMPLE_CARER_DICTATION.trim()) return showCare(normaliseCareSheet(EXAMPLE_CARER_PLAN, SOURCE_IDS()), 'record', 'This is the example care plan.');
    if (text === EXAMPLE_FOSTER_DICTATION.trim()) return showCare(normaliseCareSheet(EXAMPLE_FOSTER_PLAN, SOURCE_IDS()), 'record', 'This is the example care plan.');
    banner(NO_CLAUDE, 'info');
    return;
  }
  banner('');
  const reply = await runWorking('Writing the care plan', 'Everything the carer needs, from Queensland guidance.', (signal) =>
    provider.generate(buildCarerPlanPrompt(text, sourcesForPrompt()), signal, { images: photos }),
  );
  notes = [];
  showCare(normaliseCareSheet(extractJson(reply), SOURCE_IDS()), 'record');
}

els.care.addEventListener('click', openCare);
for (const b of [$('care-back'), $('care-back-2')]) b.addEventListener('click', () => showView(careFrom === 'note' ? 'note' : 'record'));
els.careCopy.addEventListener('click', async () => {
  const ok = await copyText(careSheetText(careSheet, lookupSource));
  toast(ok ? 'Care plan copied. Paste it into an email, SMS or the discharge sheet.' : 'Couldn’t copy. Select the text and copy it instead.');
});

/* ---------------- inspector report / adoption summary ---------------- */

let currentDoc = null;

function renderDoc(d, kind) {
  $('doc-title').textContent = d.title || DOC_KINDS[kind].label;
  $('doc-subtitle').textContent = d.subtitle;
  $('doc-subtitle').hidden = !d.subtitle;
  const checks = $('doc-checks');
  checks.hidden = d.check.length === 0;
  checks.open = false;
  $('doc-check-count').textContent = d.check.length ? String(d.check.length) : '';
  $('doc-check-list').replaceChildren(...d.check.map((c) => el('li', { text: c })));
  $('doc').replaceChildren(
    ...d.sections.map((s) =>
      el('section', { class: 'doc-sec' }, [el('h2', { text: s.heading }), s.text ? el('p', { text: s.text }) : list(s.items)]),
    ),
    ...(d.due.length
      ? [
          el('section', { class: 'doc-sec due' }, [
            el('h2', { text: 'What’s due next' }),
            el('ul', {}, d.due.map((x) => el('li', {}, [el('span', { text: x.what }), x.when ? el('span', { class: 'when', text: dueLabel(x.when) }) : null]))),
          ]),
        ]
      : []),
  );
  $('doc-copy').textContent = kind === 'inspector' ? 'Copy report' : 'Copy summary';
}

function showDoc(d, kind, info = '') {
  currentDoc = { d, kind };
  renderDoc(d, kind);
  $('doc-banner').textContent = info;
  $('doc-banner').hidden = !info;
  showView('doc');
  $('doc-title').focus();
}

async function createDoc(kind, text) {
  if (!(await ensureProvider())) {
    const ex = { inspector: [EXAMPLE_INSPECTOR_DICTATION, EXAMPLE_INSPECTOR_DOC], adoption: [EXAMPLE_ADOPTION_DICTATION, EXAMPLE_ADOPTION_DOC] }[kind];
    if (ex && text === ex[0].trim()) return showDoc(normaliseDoc(ex[1]), kind, `This is the example ${DOC_KINDS[kind].label.toLowerCase()}.`);
    banner(NO_CLAUDE, 'info');
    return;
  }
  if (photos.length && !provider.images) {
    banner('Photos can’t be sent from this version. Remove them to continue.', 'error');
    return;
  }
  banner('');
  const reply = await runWorking(`Writing the ${DOC_KINDS[kind].label.toLowerCase()}`, kind === 'inspector' ? 'Objective findings, kept separate from opinion.' : 'Plain English for the new owner.', (signal) =>
    provider.generate(buildDocPrompt(kind, text, { clinician: settings.clinician, photoCount: photos.length }), signal, { images: photos }),
  );
  const d = normaliseDoc(extractJson(reply));
  if (!d.sections.length) throw new AiError('empty', '');
  showDoc(d, kind);
}

$('doc-back').addEventListener('click', () => showView('record'));
$('doc-copy').addEventListener('click', async () => {
  if (!currentDoc) return;
  const ok = await copyText(docText(currentDoc.d));
  toast(ok ? 'Copied. Paste it wherever it needs to go.' : 'Couldn’t copy. Select the text and copy it instead.');
});
$('doc-new').addEventListener('click', addMoreInfo);

/* ---------------- how it works ---------------- */

els.about.innerHTML = ABOUT_HTML; // static, trusted content
function openAbout() {
  showView('about');
  els.about.querySelector('h1')?.focus();
}
function closeAbout() {
  showView(lastView === 'working' ? 'record' : lastView);
}
els.openAbout.addEventListener('click', () => (els.views.about.hidden ? openAbout() : closeAbout()));
els.about.addEventListener('click', (e) => {
  const t = e.target.closest('[data-action]');
  if (!t) return;
  if (t.dataset.action === 'start') {
    showView('record');
    els.mic.focus();
  }
  if (t.dataset.action === 'example') {
    showView('record');
    loadExample(EXAMPLE_DICTATION, false, 'intake');
  }
});

/* ---------------- settings ---------------- */

for (const m of CONFIG.models) els.model.append(el('option', { value: m.id, text: m.label }));

async function refreshConnection() {
  const p = await resolveProvider(settings);
  const keyless = Boolean(CONFIG.proxyUrl) || (p && p.id === 'claude');
  els.keyField.hidden = keyless;
  els.conn.dataset.ok = String(Boolean(p));
  els.conn.textContent = p
    ? `Connected: ${p.label}`
    : inClaude
      ? 'Claude isn’t available right now.'
      : 'Public demo. The examples work here. Open Consult Scribe in the Claude app to write notes with your Claude account.';
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
    els.keyField.open = true;
  }
  els.settings.returnValue = '';
  if (!els.settings.open) els.settings.showModal();
  els.clinician.focus();
}

els.openSettings.addEventListener('click', () => openSettings());
$('close-settings').addEventListener('click', () => els.settings.close('close'));

els.settings.addEventListener('close', async () => {
  if (els.settings.returnValue !== 'save') return;
  const key = els.apiKey.value.trim();
  settings = { ...settings, clinician: els.clinician.value.trim().slice(0, 80), model: els.model.value, apiKey: key, rememberKey: els.rememberKey.checked };
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
  toast('Saved settings removed from this device.');
});

/* ---------------- start up ---------------- */

const startMode = MODES.includes(settings.mode) ? settings.mode : 'vet';
document.querySelector(`input[name="mode"][value="${startMode}"]`).checked = true;
applyMode();
setTranscript(store.loadDraft());
renderPhotos();
showView(location.hash === '#how-it-works' ? 'about' : 'record');
window.addEventListener('hashchange', () => location.hash === '#how-it-works' && openAbout());
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

if ('serviceWorker' in navigator && location.protocol === 'https:' && !inClaude) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

// Exposed for end-to-end tests only.
window.__scribe = {
  get note() { return currentNote(); },
  get notes() { return notes; },
  get provider() { return provider && provider.id; },
  get voice() { return keyboardVoice ? 'keyboard' : 'live'; },
};
