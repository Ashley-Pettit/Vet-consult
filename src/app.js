import { CONFIG } from './config.js';
import { Dictation, speechErrorMessage } from './speech.js';
import { resolveProvider, friendly, AiError, onUsage } from './ai.js';
import { store } from './storage.js';
import { localChecks } from './clinical.js';
import { preparePhoto, MAX_PHOTOS } from './photos.js';
import { ABOUT_HTML } from './about.js';
import { lookupSource, sourcesForPrompt, SOURCE_IDS } from './sources.js';
import { region, setRegion } from './region.js';
import { rangesFor } from './species-ranges.js';
import { videoFor, videoForTags, watchUrl, embedUrl, thumbUrl } from './videos.js';
import { groupsIn, factsFor, namedAnimal } from './species-vet.js';
import { SPECIES_CARE } from './species-care.js';
import { buildWord, docModel, careModel, noteModel, wordFileName, dischargeModel } from './word.js';
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
  EXAMPLE_INTAKE_DICTATION,
  EXAMPLE_LOG_DICTATION,
  EXAMPLE_TOVET_DICTATION,
  EXAMPLE_MOP_DICTATION,
  EXAMPLE_JOEY_CARER_DICTATION,
  EXAMPLE_WOMBAT_VET_DICTATION,
  EXAMPLE_VET_PLAN_DICTATION,
  EXAMPLE_FUNDING_DICTATION,
  appendSegment,
  buildPrompt,
  buildRevisionPrompt,
  buildCareSheetPrompt,
  extractJson,
  normaliseNote,
  normaliseResult,
  normaliseCareSheet,
  rehydrationTable,
  REHYDRATION_NOTE,
  careSheetText,
  pmsSections,
  toPlainText,
  careAiNote,
  aiNoteFor,
  feedAmounts,
} from './note.js';

const $ = (id) => document.getElementById(id);
const els = {
  mic: $('mic'), micStatus: $('mic-status'), timer: $('timer'), coach: $('kb-coach'), coachText: $('kb-coach-text'),
  banner: $('banner'), transcript: $('transcript'), interim: $('interim'), examples: $('examples'),
  example: $('load-example'),
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
let plainAtRender = ''; // the clinical notes as Claude wrote them, to spot hand edits
// Photos can be switched off in Settings to keep AI costs down.
const sendPhotos = () => (settings.photosOn === false ? [] : photos);
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
  if (name === 'record') renderResume();
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
  if (!action) toastTimer = setTimeout(() => (els.toast.hidden = true), 1750);
}

function banner(text, tone = 'warn') {
  els.banner.textContent = text || '';
  els.banner.dataset.tone = tone;
  els.banner.hidden = !text;
}


function updateCreateState() {
  updateExampleNote();
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
  updateClearButton();
}

// Clear button, bottom right of the text box: only when there is something to clear, and it asks first.
function updateClearButton() {
  $('clear-text').hidden = !els.transcript.value.trim();
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
  if (['intake', 'log', 'tovet', 'mop', 'funding'].includes(document.body.dataset.mode)) return els.transcript.value.trim() ? 'Tap the mic to add more' : 'Tap the mic and talk it through';
  if (document.body.dataset.mode === 'carer') return els.transcript.value.trim() ? 'Tap the mic to add more' : 'Tap the mic and describe the animal’s care';
  if (keyboardVoice) return els.transcript.value.trim() ? 'Tap the mic to add more by voice' : 'Tap the mic, then talk through the consult';
  return els.transcript.value.trim() ? 'Tap the mic to add more' : 'Tap the mic and talk through the consult';
}

// A short soft tone and buzz the moment the mic is really listening, so people know to start talking.
function cueListening() {
  try {
    if (navigator.vibrate) navigator.vibrate(40);
  } catch {
    /* ignore */
  }
  if (!audioCtx) return;
  try {
    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.08, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.14);
  } catch {
    /* ignore */
  }
}
let lastMicState = 'idle';
dictation.onstate = (state) => {
  if (state === 'listening' && lastMicState === 'starting') cueListening();
  lastMicState = state;
  const on = state !== 'idle';
  document.body.dataset.mic = state;
  els.mic.setAttribute('aria-pressed', String(on));
  els.micStatus.textContent = state === 'starting' ? 'One moment…' : state === 'listening' ? 'Listening. Talk now, tap to stop' : idleStatus();
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
  els.micStatus.textContent = `Voice typing. Talk, then tap ${els.create.textContent}`;
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
  ta.scrollTop = ta.scrollHeight; // show the end of what's been said, inside the box
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
// Live mic: start on the press itself, not the release, so the first words aren't missed.
let startedOnPress = false;
els.mic.addEventListener('pointerdown', (e) => {
  kbWasOn = document.body.dataset.mic === 'keyboard';
  if (keyboardVoice || busy || e.button > 0 || dictation.state !== 'idle') return;
  startedOnPress = true;
  banner('');
  els.toast.hidden = true;
  if (isExampleText()) setTranscript('');
  unlockAudio();
  dictation.start();
});
els.mic.addEventListener('keydown', () => (kbWasOn = document.body.dataset.mic === 'keyboard'));
els.mic.addEventListener('click', () => {
  if (busy) return;
  banner('');
  els.toast.hidden = true;
  if (isExampleText()) setTranscript('');
  if (keyboardVoice) {
    const wasOn = kbWasOn || document.body.dataset.mic === 'keyboard';
    kbWasOn = false;
    if (wasOn) {
      els.transcript.blur();
      endKeyboardVoice();
    } else startKeyboardVoice();
    return;
  }
  if (startedOnPress) {
    startedOnPress = false; // already started on the press
    return;
  }
  if (dictation.state !== 'idle') {
    dictation.stop();
    return;
  }
  unlockAudio();
  dictation.start();
});
// Keep "Create" in sight above the on-screen keyboard (iPhones don't shrink the page for the keyboard).
(() => {
  const vv = window.visualViewport;
  if (!vv) return;
  const update = () => {
    const offset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
    const open = offset > 80;
    document.body.dataset.kb = open ? 'open' : '';
    document.documentElement.style.setProperty('--kb-offset', open ? `${Math.round(offset)}px` : '0px');
  };
  vv.addEventListener('resize', update);
  vv.addEventListener('scroll', update);
})();
// Keep the coach mark only while the keyboard is up.
els.transcript.addEventListener('blur', () => setTimeout(() => document.activeElement !== els.transcript && endKeyboardVoice(), 150));

/* ---------------- transcript and examples ---------------- */

els.transcript.addEventListener('input', () => {
  els.toast.hidden = true;
  store.saveDraft(els.transcript.value);
  autoGrow(els.transcript);
  updateCreateState();
  updateClearButton();
});

const confirmClear = $('confirm-clear');
$('clear-text').addEventListener('click', () => {
  if (busy) return;
  // An example isn't their own words: clear it straight away.
  if (isExampleText()) {
    setTranscript('');
    banner('');
    updateExampleNote();
    els.transcript.focus();
    return;
  }
  confirmClear.showModal();
});
confirmClear.addEventListener('close', () => {
  const how = confirmClear.returnValue;
  confirmClear.returnValue = '';
  if (how !== 'clear') return;
  dictation.cancel();
  endKeyboardVoice();
  setTranscript('');
  banner('');
  els.transcript.focus();
});

// Example words are shown as an example, not as the user's own: a note above the box and a tinted box,
// until they edit or replace them.
function isExampleText() {
  return [EXAMPLE_DICTATION, EXAMPLE_BATCH_DICTATION, EXAMPLE_CARER_DICTATION, EXAMPLE_FOSTER_DICTATION, EXAMPLE_INTAKE_DICTATION, EXAMPLE_LOG_DICTATION, EXAMPLE_TOVET_DICTATION, EXAMPLE_MOP_DICTATION, EXAMPLE_JOEY_CARER_DICTATION, EXAMPLE_WOMBAT_VET_DICTATION, EXAMPLE_VET_PLAN_DICTATION, EXAMPLE_FUNDING_DICTATION].some((x) => x.trim() === els.transcript.value.trim());
}
function updateExampleNote() {
  const on = isExampleText();
  $('example-note').hidden = !on;
  els.transcript.classList.toggle('is-example', on);
}

function loadExample(text) {
  dictation.cancel();
  setTranscript(text);
  banner('');
  els.create.focus();
}
els.example.addEventListener('click', () => loadExample(EXAMPLE_WOMBAT_VET_DICTATION));
$('load-intake-example').addEventListener('click', () => loadExample(EXAMPLE_INTAKE_DICTATION));
$('load-log-example').addEventListener('click', () => loadExample(EXAMPLE_LOG_DICTATION));
$('load-joey-example').addEventListener('click', () => loadExample(EXAMPLE_JOEY_CARER_DICTATION));
$('load-vet-plan-example').addEventListener('click', () => loadExample(EXAMPLE_VET_PLAN_DICTATION));
$('load-tovet-example').addEventListener('click', () => loadExample(EXAMPLE_TOVET_DICTATION));
$('load-mop-example').addEventListener('click', () => loadExample(EXAMPLE_MOP_DICTATION));
$('load-funding-example').addEventListener('click', () => loadExample(EXAMPLE_FUNDING_DICTATION));

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

// "New" on any result: asks first, then a clean start. The result stays under "Last made".
const confirmNew = $('confirm-new');
['new-note', 'new-care', 'new-doc'].forEach((id) => $(id).addEventListener('click', () => (busy ? null : confirmNew.showModal())));
confirmNew.addEventListener('close', () => {
  if (confirmNew.returnValue !== 'new') return;
  confirmNew.returnValue = '';
  dictation.cancel();
  endKeyboardVoice();
  setTranscript('');
  photos.forEach((p) => URL.revokeObjectURL(p.url));
  photos = [];
  renderPhotos();
  banner('');
  showView('record');
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
  $('media-row').hidden = photos.length >= MAX_PHOTOS || settings.photosOn === false;
  els.photoList.hidden = settings.photosOn === false;
  updateCreateState();
}

// Take photo opens the camera straight away; Gallery picks existing photos.
async function addPhotos(input) {
  const files = [...input.files].slice(0, MAX_PHOTOS - photos.length);
  input.value = '';
  for (const f of files) {
    try {
      photos.push(await cropPhoto(await preparePhoto(f)));
    } catch {
      toast('That file couldn’t be read as a photo.');
    }
  }
  renderPhotos();
}

// Crop step after each photo: drag the box or its corners. "Use whole photo" keeps it as it is.
function cropPhoto(photo) {
  return new Promise((resolve) => {
    const dlg = $('crop-dlg');
    const img = $('crop-img');
    const box = $('crop-box');
    const stage = $('crop-stage');
    let r = { x: 0, y: 0, w: 0, h: 0 };
    const place = () => Object.assign(box.style, { left: `${r.x}px`, top: `${r.y}px`, width: `${r.w}px`, height: `${r.h}px` });
    img.onload = () => {
      const W = img.clientWidth;
      const H = img.clientHeight;
      r = { x: W * 0.05, y: H * 0.05, w: W * 0.9, h: H * 0.9 };
      place();
    };
    img.src = photo.url;
    let drag = null;
    const down = (e) => {
      const h = e.target.dataset.h || 'move';
      drag = { h, sx: e.clientX, sy: e.clientY, r0: { ...r } };
      box.setPointerCapture(e.pointerId);
      e.preventDefault();
    };
    const move = (e) => {
      if (!drag) return;
      const W = img.clientWidth;
      const H = img.clientHeight;
      const dx = e.clientX - drag.sx;
      const dy = e.clientY - drag.sy;
      const o = drag.r0;
      const MIN = 40;
      let { x, y, w, h } = o;
      if (drag.h === 'move') {
        x = Math.min(Math.max(0, o.x + dx), W - o.w);
        y = Math.min(Math.max(0, o.y + dy), H - o.h);
      } else {
        if (drag.h.includes('w')) { x = Math.min(Math.max(0, o.x + dx), o.x + o.w - MIN); w = o.w + (o.x - x); }
        if (drag.h.includes('e')) w = Math.min(Math.max(MIN, o.w + dx), W - o.x);
        if (drag.h.includes('n')) { y = Math.min(Math.max(0, o.y + dy), o.y + o.h - MIN); h = o.h + (o.y - y); }
        if (drag.h.includes('s')) h = Math.min(Math.max(MIN, o.h + dy), H - o.y);
      }
      r = { x, y, w, h };
      place();
    };
    const up = () => (drag = null);
    box.onpointerdown = down;
    box.onpointermove = move;
    box.onpointerup = up;
    box.onpointercancel = up;
    stage.ontouchmove = (e) => drag && e.preventDefault();
    dlg.onclose = async () => {
      const how = dlg.returnValue;
      dlg.returnValue = '';
      if (how !== 'crop' || !img.clientWidth) return resolve(photo);
      try {
        const sx = img.naturalWidth / img.clientWidth;
        const sy = img.naturalHeight / img.clientHeight;
        const c = document.createElement('canvas');
        c.width = Math.max(1, Math.round(r.w * sx));
        c.height = Math.max(1, Math.round(r.h * sy));
        c.getContext('2d').drawImage(img, r.x * sx, r.y * sy, r.w * sx, r.h * sy, 0, 0, c.width, c.height);
        const blob = await new Promise((res) => c.toBlob(res, 'image/jpeg', 0.85));
        if (!blob) return resolve(photo);
        URL.revokeObjectURL(photo.url);
        resolve(await preparePhoto(new File([blob], photo.name || 'Photo.jpg', { type: 'image/jpeg' })));
      } catch {
        resolve(photo);
      }
    };
    dlg.showModal();
  });
}
els.photoInput.addEventListener('change', () => addPhotos(els.photoInput));
$('add-gallery').addEventListener('change', () => addPhotos($('add-gallery')));
/* ---------------- talking to Claude ---------------- */

// Run one request on a particular model, whatever is chosen in Settings (Haiku for quick updates, Opus for retries).
async function withModel(model, job) {
  const saved = settings;
  settings = { ...settings, model };
  provider = null;
  try {
    return await job();
  } finally {
    settings = saved;
    provider = null;
  }
}
const QUICK_MODEL = 'claude-haiku-5-5';
const BEST_MODEL = 'claude-opus-5-5';
// A short, simple update goes to the fast model; anything long or with drugs and doses keeps the chosen model.
const isQuickUpdate = (t) => t.length <= 180 && t.split(/\s+/).length <= 32 && !/\b(mg|ml|mL|dose|tablet|inject|antibiotic|meloxicam|metacam|\d+\s*(mg|ml|kg))\b/i.test(t);

async function ensureProvider() {
  provider = await resolveProvider(settings);
  return provider;
}

const NO_CLAUDE = inClaude
  ? 'Claude isn’t available right now. Check you are signed in, then try again.'
  : 'This public demo can’t write notes from your own dictation. Open Animal Welfare Companion in the Claude app to use it with your Claude account. The examples work here.';

function waitForIdle(ms = 2500) {
  return new Promise((resolve) => {
    const t0 = Date.now();
    const check = () => (dictation.state === 'idle' || Date.now() - t0 > ms ? resolve() : setTimeout(check, 50));
    check();
  });
}

/** Show the working screen and run one Claude call, with Stop and an elapsed timer. */
// While Claude writes: a line about what it's doing, then checked facts about the animal named.
function startWorkingFeed(title) {
  const text = els.transcript.value;
  const animal = namedAnimal(text);
  const state = region().adj;
  const steps = [
    'Reading what you said…',
    animal ? `Picking out what matters for ${animal}…` : 'Working out what kind of animal this is…',
    `Checking ${state} wildlife guidance and the code of practice…`,
    ...(sendPhotos().length ? ['Looking closely at the photos…'] : []),
    animal ? `Adding species-specific points for ${animal}…` : 'Adding general care points…',
    /notes/i.test(title) ? 'Laying out the SOAP notes…' : 'Writing it in plain English, one step at a time…',
    'Checking nothing is repeated or missed…',
    'Nearly there…',
  ];
  let facts = factsFor(text);
  if (!facts.length) facts = SPECIES_CARE.map((w) => ({ text: `${w.warning} ${w.why}`, source: w.source_title }));
  facts = facts.sort(() => Math.random() - 0.5).slice(0, 12);
  let i = 0;
  const show = () => {
    $('working-step').textContent = steps[Math.min(i, steps.length - 1)];
    const f = facts.length && i >= 1 ? facts[(i - 1) % facts.length] : null;
    $('working-fact').hidden = !f;
    if (f) $('working-fact-text').textContent = f.text;
    i += 1;
  };
  show();
  const t = setInterval(show, 4500);
  return () => {
    clearInterval(t);
    $('working-fact').hidden = true;
    $('working-step').textContent = '';
  };
}

async function runWorking(title, sub, job) {
  // With photos attached, say so first: looking at the photos is the slow part.
  const looking = sendPhotos().length && !/^Hmm/.test(title);
  els.workingTitle.textContent = looking ? 'Analysing the image' : title;
  els.workingSub.textContent = looking ? 'Looking for the species, injuries and anything else that helps the plan.' : sub;
  const swap = looking ? setTimeout(() => { els.workingTitle.textContent = title; els.workingSub.textContent = sub; }, 7000) : null;
  showView('working');
  els.stop.focus();
  const t0 = Date.now();
  const tick = setInterval(() => {
    const s = Math.round((Date.now() - t0) / 1000);
    els.elapsed.textContent = s < 8 ? 'Usually 10 to 40 seconds' : `${s} seconds…`;
  }, 1000);
  els.elapsed.textContent = 'Usually 10 to 40 seconds';
  const feed = startWorkingFeed(title);
  aborter = new AbortController();
  try {
    return await job(aborter.signal);
  } finally {
    feed();
    clearTimeout(swap);
    clearInterval(tick);
    aborter = null;
  }
}

// Ask Claude for JSON. If the reply can't be read (cut off, or stray text), ask once more for a tighter reply
// before showing an error, so a long answer doesn't cost the vet or carer a retry.
const RETRY_NOTE = '\n\nImportant: your last reply could not be read. Reply with ONLY the JSON object, no other text, and keep every list short so the whole reply fits.';
// Extra instruction for a retry after a thumbs down; cleared when the retry ends.
let promptExtra = '';
async function askJson(prompt0, signal, opts = {}) {
  const prompt = promptExtra ? `${prompt0}\n\n${promptExtra}` : prompt0;
  const first = await provider.generate(prompt, signal, opts);
  try {
    return extractJson(first);
  } catch (e) {
    if (!e || e.code !== 'invalid_json' || (signal && signal.aborted)) throw e;
    return extractJson(await provider.generate(prompt + RETRY_NOTE, signal, opts));
  }
}

const mode = () => document.querySelector('input[name="mode"]:checked')?.value || 'vet';
const MODES = ['intake', 'log', 'carer', 'tovet', 'mop', 'funding', 'vet'];
const ROLE_MODES = { carer: ['carer', 'intake', 'log', 'tovet', 'mop', 'funding'], vet: ['carer', 'vet'] };

const MODE_TEXT = {
  vet: { button: 'Create notes', placeholder: 'Your words appear here as you talk. You can also type or fix anything.' },
  carer: { button: 'Create care plan', placeholder: 'Describe the animal, its condition, medications and anything the carer needs to know.' },
  intake: { button: 'Create record', placeholder: 'Wildlife Victoria case number, the animal, exactly where it was found, its condition and what you did.' },
  log: { button: 'Create log', placeholder: 'The animal, weight, feeds, medications given, toileting, behaviour and anything you’re watching.' },
  funding: { button: 'Create draft', placeholder: 'The funder, what you need and why, costs, numbers of animals and volunteers, timeline and how you’ll measure success.' },
  mop: { button: 'Create MOP plan', placeholder: 'The caller, the animal and its condition, any injuries, exactly where it was found, what they have at home, and which vet or shelter it is going to and when.' },
  tovet: { button: 'Create summary', placeholder: 'The animal, its history in care, what you’ve noticed, current meds and your questions.' },
};

// Carer or vet, chosen with the switch at the top and remembered. Carers see their four tools; vets see care plan and notes.
function applyRole() {
  const role = settings.role === 'vet' ? 'vet' : 'carer';
  document.body.dataset.role = role;
  document.querySelector(`input[name="role"][value="${role}"]`).checked = true;
  document.querySelectorAll('#mode label[data-roles]').forEach((l) => (l.hidden = !l.dataset.roles.split(' ').includes(role)));
  if (!ROLE_MODES[role].includes(mode())) document.querySelector(`input[name="mode"][value="${ROLE_MODES[role][0]}"]`).checked = true;
}
document.querySelectorAll('input[name="role"]').forEach((r) =>
  r.addEventListener('change', () => {
    settings.role = r.value;
    if (mode() === 'funding') document.querySelector('input[name="mode"][value="carer"]').checked = true;
    applyRole();
    applyMode();
    settings.mode = mode();
    store.saveSettings(settings);
  }),
);

// Which state's guidance: sources, emergency line and case numbers all follow it.
function applyRegion() {
  const r = setRegion(settings.region);
  document.querySelector(`input[name="region"][value="${r.code}"]`).checked = true;
  document.body.dataset.region = r.code;
  $('sos-sub').textContent = `${r.hotline} ${r.hotlineHours}`;
  $('sos-phone').textContent = r.phone;
  $('sos-phone').href = `tel:${r.tel}`;
  MODE_TEXT.intake.placeholder = `${r.caseLabel}, the animal, exactly where it was found, its condition and what you did.`;
  if (mode() === 'intake') els.transcript.placeholder = MODE_TEXT.intake.placeholder;
}
document.querySelectorAll('input[name="region"]').forEach((r) =>
  r.addEventListener('change', () => {
    settings.region = r.value;
    applyRegion();
    store.saveSettings(settings);
    toast(`Using ${region().adj} guidance.`);
  }),
);

function chooseMode(m) {
  document.querySelector(`input[name="mode"][value="${m}"]`).checked = true;
  applyMode();
  settings.mode = m;
  store.saveSettings(settings);
}
$('open-funding').addEventListener('click', () => {
  if (settings.role === 'vet') {
    settings.role = 'carer';
    applyRole();
  }
  els.settings.close();
  chooseMode('funding');
  showView('record');
  els.mic.focus();
});

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
    if (sendPhotos().length && !provider.images) {
      banner('Photos can’t be sent from this version. Remove them to continue.', 'error');
      return;
    }
    banner('');
    const prompt = buildPrompt(finalText, { clinician: settings.clinician, photoCount: sendPhotos().length, drugs: settings.drugs });
    const result = await runWorking(
      'Writing the clinical notes',
      'Claude is turning your words into SOAP notes.',
      (signal) => askJson(prompt, signal, { images: sendPhotos() }),
    );
    const list = normaliseResult(extractJson(result));
    if (!list.length) throw new AiError('empty', '');
    for (const n of list) if (!n.visit.type) n.visit.type = NOTE_TYPES.consult.title;
    madeFrom.vet = { text: els.transcript.value, notes: list };
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
  resetFeedback();
  if (!example) remember('notes', list, list[0] && (list[0].patient.name || list[0].patient.species));
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
      : 'This is the example note. In the Claude app, Animal Welfare Companion writes notes like this from your own dictation.'
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
    const run = () => runWorking('Hmm, let me think about that…', 'Adding your answer in the right place.', (signal) =>
      askJson(buildRevisionPrompt(notes[idx], item, answer), signal),
    );
    const reply = isQuickUpdate(answer) ? await withModel(QUICK_MODEL, async () => (await ensureProvider(), run())) : await run();
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

// What a full record would ideally have, worked out on the device from the empty fields. Shown collapsed.
function noteGaps(n) {
  const p = n.patient;
  const vt = n.objective.vitals;
  const euth = /euthanasia/i.test(n.visit.type);
  return [
    [!p.name && !p.animal_id, 'Name or animal ID'],
    [!p.species, 'Species'],
    [!p.sex, 'Sex'],
    [!p.age, 'Age or life stage'],
    [!p.weight_kg, 'Weight'],
    [!euth && !vt.temp_c, 'Temperature'],
    [!euth && !vt.hr_bpm, 'Heart rate'],
    [!euth && !vt.rr_bpm, 'Respiratory rate'],
    [!vt.bcs, 'Body condition score'],
    [!euth && !vt.mm_crt, 'Mucous membranes and CRT'],
    [!euth && !vt.hydration, 'Hydration'],
    [!n.subjective, 'History or reason for visit'],
    [!n.assessment.problems.length, 'Assessment'],
    [!(n.plan.procedures.length || n.plan.diagnostics.length || n.plan.treatments.length || n.plan.hospital_plan.length || n.plan.home_care.length || n.plan.follow_up.length), 'Plan'],
    [!euth && !n.plan.follow_up.length, 'Follow-up or recheck'],
    [!n.visit.clinician, 'Vet name (set it once in Settings)'],
  ].filter(([missing]) => missing).map(([, label]) => label);
}
function renderGaps(n) {
  const gaps = noteGaps(n);
  $('gaps').hidden = !gaps.length;
  $('gaps').open = false;
  $('gap-count').textContent = String(gaps.length);
  $('gap-list').replaceChildren(...gaps.map((g) => el('li', { text: g })));
}

function renderNote() {
  const n = currentNote();
  if (!n) return;
  const p = n.patient;
  const vt = n.objective.vitals;
  const local = localChecks(n);
  renderAnimals();
  renderChecks(n, local);
  renderGaps(n);
  // Pigeons get a kind word for the vet (shown on screen only, never in the clinical record).
  let factBox = $('note-fact');
  if (!factBox) {
    factBox = el('div', { id: 'note-fact' });
    $('note').after(factBox);
  }
  factBox.replaceChildren(...[pigeonFact(`${p.species} ${p.name} ${n.subjective}`)].filter(Boolean));
  els.noteTitle.textContent = n.visit.type || 'Clinical note';
  els.care.hidden = /euthanasia/i.test(n.visit.type);

  const patient = el('div', { class: 'patient' }, [
    el('p', { class: 'pname' }, [
      el('strong', { text: p.name || p.species || 'Patient' }),
      el('span', { text: [p.name ? p.species : '', p.breed].filter(Boolean).join(' · ') }),
    ]),
    el('div', { class: 'grid' }, [
      p.sex && kv('Sex', p.sex), p.age && kv('Age', p.age), p.weight_kg && kv('Weight', p.weight_kg, ' kg'), p.animal_id && kv('Animal ID', p.animal_id),
      p.microchip && kv('Microchip', p.microchip), p.intake_type && kv('Intake', p.intake_type), n.visit.clinician && kv('Clinician', n.visit.clinician),
    ].filter(Boolean)),
  ]);

  const vitals = el('div', { class: 'vitals' }, [
    kv('Temp', vt.temp_c, vt.temp_c && !/°/.test(vt.temp_c) ? ' °C' : '', local.flags.temp_c),
    kv('HR', vt.hr_bpm, vt.hr_bpm && /^\d+$/.test(vt.hr_bpm) ? ' bpm' : '', local.flags.hr_bpm),
    kv('RR', vt.rr_bpm, vt.rr_bpm && /^\d+$/.test(vt.rr_bpm) ? ' bpm' : '', local.flags.rr_bpm),
    kv('BCS', vt.bcs), kv('MM / CRT', vt.mm_crt), kv('Hydration', vt.hydration),
  ].filter((x) => !x.querySelector('.nr')));

  // A quick shorthand dictation should read as a finished note: only show what was said.
  const exam = [];
  if (vitals.children.length) exam.push(vitals);
  if (n.objective.findings.length) exam.push(list(n.objective.findings));
  if (n.objective.photo_findings.length || photosForNote().length) {
    exam.push(el('h3', { text: 'From photos' }));
    if (photosForNote().length) exam.push(el('div', { class: 'photo-list small' }, photosForNote().map((ph, i) => el('figure', { class: 'thumb' }, [el('img', { src: ph.url, alt: `Photo ${i + 1}` }), el('figcaption', { text: String(i + 1) })]))));
    if (n.objective.photo_findings.length) exam.push(list(n.objective.photo_findings));
  }

  // P in the order vets write it: given today, to continue, tests planned, home care, follow-up.
  const plan = [];
  const totals = new Map(local.doses.map((d) => [d.index, d]));
  // Said once: a dose already in the drug name ("per protocol") isn't repeated.
  const dose = (t) => (t.dose && t.drug.toLowerCase().includes(t.dose.toLowerCase()) ? '' : t.dose);
  const medItem = (t, i, given) =>
    el('li', {}, [
      el('strong', { text: t.drug || 'Unnamed drug' }),
      el('span', { class: 'regimen', text: (given ? [dose(t), t.route] : [dose(t), t.route, t.frequency, t.duration]).filter(Boolean).join(' · ') }),
      totals.has(i)
        ? el('span', { class: 'calc' }, [el('span', { class: 'tag', text: 'Calculated' }), `${totals.get(i).total} per dose (${totals.get(i).working}). Confirm.`])
        : null,
    ]);
  const meds = (given) => n.plan.treatments.map((t, i) => [t, i]).filter(([t]) => (t.when === 'given') === given);
  const givenMeds = meds(true);
  const contMeds = meds(false);
  // The order vets write P: diagnostics, treatment, take-home meds, carer instructions, follow-up.
  if (n.plan.diagnostics.length) plan.push(el('h3', { text: 'Diagnostics' }), list(n.plan.diagnostics));
  if (n.plan.procedures.length || givenMeds.length) {
    plan.push(el('h3', { text: 'Treatment given' }));
    if (n.plan.procedures.length) plan.push(list(n.plan.procedures));
    if (givenMeds.length) plan.push(el('ul', { class: 'meds' }, givenMeds.map(([t, i]) => medItem(t, i, true))));
  }
  if (contMeds.length) plan.push(el('h3', { text: 'Dispensed' }), el('ul', { class: 'meds' }, contMeds.map(([t, i]) => medItem(t, i, false))));
  if (n.plan.hospital_plan.length) plan.push(el('h3', { text: 'Hospitalisation plan' }), list(n.plan.hospital_plan));
  if (n.plan.follow_up.length) plan.push(el('h3', { text: 'Follow-up' }), list(n.plan.follow_up));

  const assess = n.assessment.problems.length ? [list(n.assessment.problems, true)] : [];
  if (n.assessment.differentials.length) assess.push(el('h3', { text: 'Differentials' }), list(n.assessment.differentials));
  if (n.assessment.prognosis) assess.push(el('h3', { text: 'Prognosis' }), el('p', { text: n.assessment.prognosis }));

  els.note.replaceChildren(
    patient,
    ...(n.subjective ? [soap('S', 'History', el('p', { text: n.subjective }))] : []),
    ...(exam.length ? [soap('O', 'Examination', exam)] : []),
    ...(assess.length ? [soap('A', 'Assessment', assess)] : []),
    ...(plan.length ? [soap('P', 'Plan', plan)] : []),
    ...(n.welfare_notes ? [soap('W', 'Welfare notes', el('p', { text: n.welfare_notes }))] : []),
  );
  // Discharge instructions stay out of the clinical record; they become the carer's plain-English plan.
  $('discharge-note').hidden = !n.plan.home_care.length || els.care.hidden;

  const sec = pmsSections(n);
  els.plain.value = sec.clinical;
  plainAtRender = sec.clinical;
  $('polish').hidden = true;
  requestAnimationFrame(() => fitPlain());
  renderPms(sec);
  els.copy.lastChild.textContent = 'Copy';
}

// The full text is always on show, sized to fit so nothing hides behind a scroll.
function fitPlain() {
  els.plain.style.height = 'auto';
  els.plain.style.height = els.plain.scrollHeight + 4 + 'px';
}
els.plain.addEventListener('input', fitPlain);

// Photos belong to the consult; only show them on single-animal notes to avoid implying which animal they show.
const photosForNote = () => (notes.length === 1 ? photos : []);

// Prescriptions and reminders each get their own box, shown in full, with Copy top right.
function renderPms(sec) {
  const rows = [
    ['Prescriptions', 'prescriptions'],
    ['Reminders', 'reminders'],
  ].filter(([, key]) => sec[key]);
  els.pmsRows.replaceChildren(
    ...rows.map(([label, key]) => {
      const btn = el('button', { type: 'button', class: 'btn small ghost copy-top', 'aria-label': `Copy ${label.toLowerCase()}` }, 'Copy');
      btn.addEventListener('click', async () => {
        const ok = await copyText(sec[key]);
        btn.textContent = ok ? 'Copied ✓' : 'Copy';
        if (ok) toast(`${label} copied. Paste into that field in your system.`);
        setTimeout(() => (btn.textContent = 'Copy'), 2500);
      });
      return el('section', { class: 'plain-sec pms-part' }, [
        el('div', { class: 'sec-head' }, [el('h2', { text: label }), btn]),
        el('pre', { class: 'pms-full', text: sec[key] }),
      ]);
    }),
  );
}

els.copy.addEventListener('click', async () => {
  const ok = await copyText(els.plain.value, els.plain);
  if (ok) {
    els.copy.lastChild.textContent = 'Copied ✓';
    toast('Copied. Paste it into the clinical notes in your PMS.');
    setTimeout(() => (els.copy.lastChild.textContent = 'Copy'), 2500);
  } else toast('Text selected. Press Ctrl+C, or long-press and choose Copy.');
});

// Add more info: back to the dictation with everything kept, ready to add what was missed.
// Add more info: a small sheet over the result. What they add joins the original dictation and the record is
// rewritten in place, so nobody has to go back, find the end of the text and press Create again.
const more = $('more');
const moreText = $('more-text');
const moreMic = $('more-mic');
const moreHelp = $('more-help');
let moreVoice = null;
const MORE_HELP = 'It’s added to what you already said and the record is rewritten.';
function addMoreInfo() {
  moreText.value = '';
  $('more-go').disabled = true;
  moreHelp.textContent = keyboardVoice ? `${keyboardTip()} ${MORE_HELP}` : `Tap the mic and say what you missed. ${MORE_HELP}`;
  more.showModal();
  if (keyboardVoice) moreText.focus(); // inside the tap, so the phone keyboard (and its mic key) opens straight away
  else startMoreVoice();
}
function startMoreVoice() {
  if (moreVoice && moreVoice.state !== 'idle') return moreVoice.stop();
  moreVoice = new Dictation({ lang: CONFIG.speechLang });
  moreVoice.onfinal = (t) => {
    moreText.value = appendSegment(moreText.value, t);
    $('more-interim').textContent = '';
    $('more-go').disabled = !moreText.value.trim();
  };
  // Show the words as they're heard, so it's clear the mic is picking them up.
  moreVoice.oninterim = (t) => {
    $('more-interim').textContent = t;
    if (t) $('more-go').disabled = false;
  };
  moreVoice.onstate = (st) => {
    moreMic.setAttribute('aria-pressed', String(st !== 'idle'));
    more.dataset.mic = st;
    moreHelp.textContent = st === 'starting' ? 'One moment…' : st === 'listening' ? 'Listening. Talk now, then tap Update.' : `Tap the mic to add more, or type. ${MORE_HELP}`;
    if (st === 'listening') cueListening();
  };
  moreVoice.onerror = (c) => (moreHelp.textContent = speechErrorMessage(c));
  unlockAudio();
  moreVoice.start();
}
moreMic.addEventListener('click', () => {
  if (keyboardVoice) {
    moreText.focus();
    moreHelp.textContent = `${keyboardTip()} ${MORE_HELP}`;
    return;
  }
  startMoreVoice();
});
more.addEventListener('close', () => {
  if (moreVoice) moreVoice.cancel();
  $('more-interim').textContent = '';
});
// Update while still listening: stop, wait for the last words to land, then update. Nothing said is lost.
$('more-go').addEventListener('click', async (e) => {
  if (!moreVoice || moreVoice.state === 'idle') return;
  e.preventDefault();
  const pending = $('more-interim').textContent.trim();
  moreVoice.stop();
  const t0 = Date.now();
  while (moreVoice.state !== 'idle' && Date.now() - t0 < 1800) await new Promise((res) => setTimeout(res, 60));
  if (pending && !moreText.value.includes(pending)) moreText.value = appendSegment(moreText.value, pending);
  if (moreText.value.trim()) more.close('go');
});
$('more-cancel').addEventListener('click', () => more.close());
moreText.addEventListener('input', () => ($('more-go').disabled = !moreText.value.trim()));
more.addEventListener('close', async () => {
  const extra = moreText.value.trim();
  if (more.returnValue !== 'go' || !extra) return;
  more.returnValue = '';
  setTranscript(appendSegment(els.transcript.value, extra));
  if (isQuickUpdate(extra) && settings.model !== QUICK_MODEL) await withModel(QUICK_MODEL, () => createNote());
  else await createNote();
});
more.addEventListener('click', (e) => e.target === more && more.close()); // tap outside to cancel
els.back.addEventListener('click', addMoreInfo);
$('note-more').addEventListener('click', addMoreInfo);
// The logo always goes home.
$('home').addEventListener('click', () => {
  if (busy) return;
  if (els.settings.open) els.settings.close();
  showView('record');
  els.mic.focus();
});


/* ---------------- care plan ---------------- */

let careFrom = 'note'; // where Back goes: the vet note, or the dictation screen

// A checked video for the species. Loads only when tapped (quick on mobile data); YouTube link as a fallback.
// One line that reads well in a text message: what the video is, who made it, and the link.
const videoLine = (v) => `Video: ${v.title} (${v.channel}) ${watchUrl(v)}`;

function videoSection(v) {
  if (!v) return null;
  const box = el('div', { class: 'video-box' });
  // The thumbnail with a play button; if the thumbnail can't load here, the button still works on its own.
  const thumb = el('img', { src: thumbUrl(v), alt: '', loading: 'lazy', class: 'video-thumb' });
  thumb.addEventListener('error', () => thumb.remove());
  const play = el('button', { type: 'button', class: 'video-play', 'aria-label': `Play video: ${v.title}` }, [el('span', { class: 'video-play-icon', 'aria-hidden': 'true' })]);
  play.addEventListener('click', () => {
    box.replaceChildren(el('iframe', { src: embedUrl(v), title: v.title, allow: 'autoplay; encrypted-media; picture-in-picture', allowfullscreen: '', loading: 'lazy', referrerpolicy: 'strict-origin-when-cross-origin' }));
  });
  box.append(thumb, play);
  return el('section', { class: 'care-sec video' }, [
    el('h2', { text: 'Watch' }),
    el('p', {}, [el('strong', { text: v.title }), ` (${v.channel}, ${v.date})`]),
    v.warning ? el('p', { class: 'help', text: v.warning }) : null,
    box,
  ]);
}

// Normal ranges and pouch / enclosure temperatures for the species, shown from the checked table (never from Claude).
function rangesSection(id) {
  const g = id ? rangesFor(id, region().code) : null;
  if (!g) return null;
  const rows = (pairs) => pairs.map(([k, v]) => el('div', { class: 'kv' }, [el('span', { class: 'k', text: k }), el('span', { class: 'v', text: v })]));
  return el('section', { class: 'care-sec ranges' }, [
    el('h2', { text: `Normal ranges: ${g.label}` }),
    g.vitals.length ? el('div', { class: 'grid' }, rows(g.vitals)) : null,
    g.warmth.length ? el('h3', { text: g.reptile ? 'Temperatures' : 'Pouch or enclosure temperature' }) : null,
    g.warmth.length ? el('div', { class: 'grid' }, rows(g.warmth)) : null,
    g.notes.length ? el('ul', {}, g.notes.map((x) => el('li', { text: x }))) : null,
    el('p', { class: 'help' }, ['From: ', ...g.sources.flatMap((x, i) => [i ? '; ' : '', el('a', { href: x.url, target: '_blank', rel: 'noopener', text: x.title }), ` (${x.publisher}, ${x.date})`])]),
  ]);
}

// Rehydration: steps from Claude, amounts worked out on the device from Anne Fowler's protocol.
function rehydrationSection(r) {
  if (!r || !r.needed) return null;
  const t = rehydrationTable(r);
  return el('section', { class: 'care-sec rehydrate' }, [
    el('h2', { text: 'Rehydration' }),
    t
      ? el('div', { class: 'tbl', role: 'region', tabindex: '0', 'aria-label': 'Rehydration amounts' }, [
          el('p', { class: 'help', text: `For ${r.weight_g} g, ${t.assumed ? `assuming ${t.deficit}% dehydrated (the protocol’s starting point)` : `${t.deficit}% dehydrated`}.` }),
          el('table', { class: 'rehydrate-table' }, [
            el('thead', {}, [el('tr', {}, ['Day', 'Total', 'Every 4 hours', 'Every 6 hours'].map((h) => el('th', { scope: 'col', text: h })))]),
            el('tbody', {}, t.days.map((d) => el('tr', {}, [el('th', { scope: 'row', text: String(d.day) }), el('td', { text: `${d.total} mL` }), el('td', { text: `${d.every4h} mL` }), el('td', { text: `${d.every6h} mL` })]))),
          ]),
        ])
      : el('p', { class: 'help', text: 'Add the animal’s weight to work out the amounts.' }),
    r.steps.length ? el('ul', {}, r.steps.map((x) => el('li', { text: x }))) : null,
    el('p', { class: 'rehydrate-note', text: REHYDRATION_NOTE }),
  ]);
}

// Print just the tick sheet, large, for the fridge. Where printing isn't possible (inside Claude), the Word printout has it on its own page.
function printTickSheet() {
  document.body.dataset.print = 'ticks';
  const done = () => {
    delete document.body.dataset.print;
    window.removeEventListener('afterprint', done);
  };
  window.addEventListener('afterprint', done);
  try {
    window.print();
  } catch {
    /* not allowed here */
  }
  setTimeout(() => {
    if (document.body.dataset.print === 'ticks' && inClaude) {
      done();
      toast('Printing isn’t available here. The Word printout has the tick sheet on its own page.');
    }
  }, 600);
}

// Feed calculator: Claude gives the species' daily % of body weight and feeds a day; the sums are done here, and
// redone as the carer types today's weight.
function feedSection(c) {
  const f = c.feed_calc;
  if (!f || !f.applies) return null;
  const id = 'feed-weight';
  const out = el('div', { class: 'feed-out', 'aria-live': 'polite' });
  const input = el('input', { id, type: 'number', inputmode: 'decimal', min: '1', step: '1', placeholder: 'grams', value: f.weight_g ? String(f.weight_g) : '' });
  const draw = () => {
    const a = feedAmounts(f, input.value);
    out.replaceChildren(
      ...(a
        ? [
            el('div', { class: 'kv' }, [el('span', { class: 'k', text: 'Each day' }), el('span', { class: 'v', text: `about ${a.perDay} mL` })]),
            el('div', { class: 'kv' }, [el('span', { class: 'k', text: 'Each feed' }), el('span', { class: 'v', text: `about ${a.perFeed} mL, ${a.feeds} times a day` })]),
          ]
        : [el('p', { class: 'help', text: 'Enter today’s weight to work out the amounts.' })]),
    );
  };
  input.addEventListener('input', draw);
  draw();
  return el('section', { class: 'care-sec feedcalc' }, [
    el('h2', { text: 'Feed calculator' }),
    el('p', {}, [el('strong', { text: f.what || 'Milk' }), f.stage ? ` · ${f.stage}` : '']),
    el('div', { class: 'feed-in' }, [el('label', { for: id, text: 'Weight today (g)' }), input]),
    out,
    el('p', { class: 'help', text: `${f.pct}% of body weight a day, in ${f.feeds} feeds. Weigh daily and re-work it as the weight changes.${f.basis ? ` Based on: ${f.basis}.` : ''}` }),
    !f.sure ? el('p', { class: 'unsure', text: 'Claude isn’t certain of this figure for this species and stage. Check it with your vet or the feeding guide before using it.' }) : null,
    el('p', { class: 'ai-check', text: careAiNote(c) }),
  ]);
}

// A kind word about pigeons, for vets only, as Bunurong Wildlife Care asked.
const PIGEON_FACT = 'Pigeons are sweet, kind and accepting of each other, and they cope really well in care (if you leave them alone). They often thrive once released, with a good chance of a happy life in the wild.';
function pigeonFact(text) {
  if (settings.role !== 'vet' || !groupsIn(String(text)).includes('pigeon')) return null;
  return el('p', { class: 'working-fact pigeon-fact' }, [el('span', { class: 'fact-label', text: 'Did you know?' }), PIGEON_FACT]);
}

function renderCare(c) {
  const sec = (title, items, cls) => (items.length ? el('section', { class: 'care-sec ' + (cls || '') }, [el('h2', { text: title }), list(items)]) : null);
  const name = c.animal || currentNote()?.patient.name || '';
  els.careTitle.textContent = c.kind === 'wildlife' ? `Care plan: ${name || 'wildlife in care'}` : `Caring for ${name || 'your animal'} at home`;
  $('care-back-label').textContent = careFrom === 'note' ? 'Back to note' : 'Back';
  $('care-back-2').textContent = careFrom === 'note' ? 'Back' : 'Add more info';
  // Tick sheet: one row per daily job, one column per day, big boxes. Printable on its own for the fridge.
  const days = Math.min(c.log_days || 7, 14);
  const log = c.daily_checks.length
    ? el('section', { class: 'care-sec ticks' }, [
        el('div', { class: 'sec-head' }, [
          el('h2', { text: `Daily tick sheet (${days} days)` }),
          el('button', { type: 'button', class: 'btn small ghost', onclick: () => printTickSheet() }, 'Print for the fridge'),
        ]),
        el('div', { class: 'tbl', tabindex: '0', role: 'region', 'aria-label': 'Daily tick sheet' }, [
          el('table', { class: 'ticksheet' }, [
            el('thead', {}, [el('tr', {}, [
              el('th', { scope: 'col', text: 'Each day' }),
              ...Array.from({ length: days }, (_, d) => el('th', { scope: 'col', text: `Day ${d + 1}` })),
            ])]),
            el('tbody', {}, c.daily_checks.map((x) =>
              el('tr', {}, [el('th', { scope: 'row', text: x }), ...Array.from({ length: days }, () => el('td', { 'aria-label': 'not ticked' }, el('span', { class: 'box' })))]),
            )),
          ]),
        ]),
      ])
    : null;
  const r = c.release;
  const release = r.ready_when.length || r.how.length || r.where
    ? el('section', { class: 'care-sec release' }, [
        el('h2', { text: 'Release' }),
        r.target_weight ? el('p', { class: 'target-weight' }, [el('strong', { text: 'Target weight: ' }), r.target_weight]) : null,
        r.ready_when.length
          ? el('div', {}, [el('h3', { text: 'Release checklist' }), el('ul', { class: 'checklist' }, r.ready_when.map((x, i) => el('li', {}, [el('input', { type: 'checkbox', id: `rel-${i}` }), el('label', { for: `rel-${i}`, text: x })])))])
          : null,
        r.how.length ? el('div', {}, [el('h3', { text: 'How to release' }), list(r.how)]) : null,
        r.where ? el('div', {}, [el('h3', { text: 'Where' }), el('p', { text: r.where })]) : null,
      ])
    : null;
  const refs = c.sources.map(lookupSource).filter(Boolean);
  els.careSheet.replaceChildren(
    ...[
      el('p', { class: 'ai-check top', text: careAiNote(c) }),
      c.summary ? el('p', { class: 'care-summary', text: c.summary }) : null,
      pigeonFact(`${c.animal} ${c.species} ${c.summary}`),
      c.medications.length
        ? el('section', { class: 'care-sec' }, [
            el('h2', { text: 'Medications' }),
            el('ul', { class: 'meds' }, c.medications.map((m) =>
              el('li', {}, [
                el('strong', { text: m.name }),
                el('span', { class: 'care-how', text: [...new Set([m.how, m.how_often, m.how_long].filter(Boolean))].join(' · ') }),
                m.tip ? el('span', { class: 'care-tip', text: `Tip: ${m.tip}` }) : null,
              ]),
            )),
          ])
        : null,
      videoSection(carePlanVideo(c)),
      rangesSection(c.species_group),
      rehydrationSection(c.rehydration),
      c.plan.length
        ? el('section', { class: 'care-sec' }, [
            el('h2', { text: 'Day-by-day plan' }),
            el('ol', { class: 'timeline' }, c.plan.map((p) => el('li', {}, [el('strong', { text: p.when }), list(p.tasks)]))),
          ])
        : null,
      sec('Housing', c.housing),
      sec('Feeding', c.feeding),
      feedSection(c),
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
                el('span', { class: 'src-meta' }, [el('span', { class: 'scope', text: String(s.scope || 'au').toUpperCase() }), s.publisher]),
              ]),
            )),
          ])
        : null,
    ].filter(Boolean),
  );
}

function showCare(sheet, from, info = '') {
  resetFeedback();
  // Vets get a discharge pack; its clinical summary starts quietly in the background once the plan is on screen.
  $('discharge-pack').hidden = settings.role !== 'vet';
  if (settings.role === 'vet') setTimeout(startVetNotes, 400);
  remember('care', { sheet, from }, sheet.animal);
  careSheet = sheet;
  careFrom = from;
  renderMakeNext($('make-next-care'), from === 'record' ? 'carer' : null);
  if (from === 'record') madeFrom.carer = { text: els.transcript.value, sheet, info };
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
  // Already made from these same words (a vet often makes the plan first): show it, no second call.
  if (madeFrom.carer && madeFrom.carer.text === els.transcript.value) return showCare(madeFrom.carer.sheet, 'record', madeFrom.carer.info);
  if (!(await ensureProvider())) {
    if (isExample && n.patient.name === 'Rusty') showCare(normaliseCareSheet(EXAMPLE_CARE_SHEET, SOURCE_IDS()), 'note', 'This is the example care plan.');
    else toast(inClaude ? 'Claude isn’t available right now.' : 'Care plans for your own notes need the Claude app version.');
    return;
  }
  try {
    const reply = await runWorking('Writing the care plan', `Everything the carer needs, from ${region().adj} guidance.`, (signal) =>
      askJson(buildCareSheetPrompt(n, sourcesForPrompt()), signal),
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
  const reply = await runWorking('Writing the care plan', `Everything the carer needs, from ${region().adj} guidance.`, (signal) =>
    askJson(buildCarerPlanPrompt(text, sourcesForPrompt(), { fromVet: settings.role === 'vet', drugs: settings.drugs, photoCount: sendPhotos().length }), signal, { images: sendPhotos() }),
  );
  notes = [];
  showCare(normaliseCareSheet(extractJson(reply), SOURCE_IDS()), 'record');
}

els.care.addEventListener('click', openCare);
$('discharge-btn').addEventListener('click', openCare);
// Copy sits top right too, so a busy vet never has to scroll for it.
$('copy-top').addEventListener('click', () => els.copy.click());
$('care-back').addEventListener('click', () => showView(careFrom === 'note' ? 'note' : 'record'));
// A plan made straight from the carer's words can take more info in place; one made from a vet note goes back to it.
$('care-back-2').addEventListener('click', () => (careFrom === 'note' ? showView('note') : addMoreInfo()));
// Copy offers Share (the phone's share sheet) or Copy as text. Without sharing (some computers), it just copies.
const canShare = () => typeof navigator.share === 'function';
let pendingSend = null;
// wordModel (optional): the same content as a Word document, offered first so it can be forwarded as a file.
function shareOrCopy(text, title, copiedMsg, wordModel = null) {
  pendingSend = { text, title, copiedMsg, wordModel };
  if (!canShare() && !wordModel) return finishSend('copy');
  $('share-word').hidden = !wordModel;
  $('share-go').hidden = !canShare();
  $('share-sheet').showModal();
}

// Share a Word file through the phone's share sheet; where files can't be shared (most computers, inside Claude), save it instead.
async function shareWord(model, title) {
  try {
    const blob = await buildWord(model, { preparedBy: settings.clinician, template: settings.template });
    const filename = wordFileName(model.title);
    const file = typeof File === 'function' ? new File([blob], filename, { type: blob.type || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }) : null;
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title });
        return;
      } catch (e) {
        if (e && e.name === 'AbortError') return;
      }
    }
    await deliverWord(blob, filename);
  } catch {
    toast('Couldn’t make the Word document. Try again.');
  }
}
async function finishSend(how) {
  const job = pendingSend;
  pendingSend = null;
  if (!job) return;
  if (how === 'word' && job.wordModel) return shareWord(job.wordModel, job.title);
  if (how === 'share') {
    try {
      await navigator.share({ title: job.title, text: job.text });
      return;
    } catch (e) {
      if (e && e.name === 'AbortError') return; // they closed the share sheet
      // Sharing not allowed here (for example inside some apps): copy instead.
    }
  }
  if (how === 'share' || how === 'copy') {
    const ok = await copyText(job.text);
    toast(ok ? job.copiedMsg : 'Couldn’t copy. Select the text and copy it instead.');
  }
}
$('share-sheet').addEventListener('close', () => {
  const how = $('share-sheet').returnValue;
  $('share-sheet').returnValue = '';
  finishSend(how);
});
els.careCopy.addEventListener('click', () =>
  shareOrCopy(careSheetText(careSheet, lookupSource), $('care-title').textContent, 'Care plan copied. Paste it into an email, SMS or the discharge sheet.', careModel(careSheet, lookupSource)),
);

/* ---------------- intake record / care log / for the vet ---------------- */

let currentDoc = null;

// Documents that open with a ready-to-send text message, and the heading Claude gives it.
const TEXT_HEADING = { tovet: /^text to your vet$/i, mop: /^text to send$/i };

// A care plan's video: the species group Claude picked, refined by the animal named (a lorikeet, not just a bird).
function carePlanVideo(c) {
  const context = [c.title, c.summary, c.animal].filter(Boolean).join(' ');
  // The species group Claude picked comes first; the animal's name only refines a general group like "bird".
  const tags = groupsIn(context);
  return ['bird', 'waterbird', ''].includes(c.species_group) ? videoFor(c.species_group, context, tags) : videoFor(c.species_group, context) || videoFor('', context, tags);
}

// The MOP plan's video is for the animal named in the plan; nothing if no animal with a good video is named.
function mopVideo(d) {
  const text = [d.title, d.subtitle, ...d.sections.map((x) => [x.heading, x.text, ...(x.items || [])].join(' '))].join(' ');
  return videoForTags(groupsIn(text), text);
}

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
    ...(kind === 'mop' ? [el('p', { class: 'ai-disclaimer', text: aiNoteFor(d.title) })] : []),
    ...d.sections.filter((s) => !(TEXT_HEADING[kind] && TEXT_HEADING[kind].test(s.heading))).map((s) =>
      el('section', { class: 'doc-sec' }, [el('h2', { text: s.heading }), s.text ? el('p', { text: s.text }) : list(s.items)]),
    ),
    ...(kind === 'mop' ? [videoSection(mopVideo(d))] : []),
    ...(d.due.length
      ? [
          el('section', { class: 'doc-sec due' }, [
            el('h2', { text: 'What’s due next' }),
            el('ul', {}, d.due.map((x) => el('li', {}, [el('span', { text: x.what }), x.when ? el('span', { class: 'when', text: dueLabel(x.when) }) : null]))),
          ]),
        ]
      : []),
  );
  $('doc-copy').textContent = DOC_KINDS[kind].copy;
}

function showDoc(d, kind, info = '') {
  resetFeedback();
  remember('doc', { d, kind }, d.title);
  currentDoc = { d, kind };
  renderMakeNext($('make-next-doc'), kind);
  // "For the vet" and the MOP plan lead with a ready-to-send text message.
  const textSec = TEXT_HEADING[kind] ? d.sections.find((x) => TEXT_HEADING[kind].test(x.heading)) : null;
  $('text-vet').hidden = !textSec;
  $('text-vet-title').textContent = kind === 'mop' ? 'Text to send the caller' : 'Text to your vet';
  $('text-vet-body').textContent = textSec ? textSec.text || textSec.items.join(' ') : '';
  $('advice-cta').hidden = kind !== 'intake';
  madeFrom[kind] = { text: els.transcript.value, d, info };
  renderDoc(d, kind);
  $('doc-banner').textContent = info;
  $('doc-banner').hidden = !info;
  showView('doc');
  $('doc-title').focus();
}

async function createDoc(kind, text) {
  if (!(await ensureProvider())) {
    banner(NO_CLAUDE, 'info');
    return;
  }
  if (sendPhotos().length && !provider.images) {
    banner('Photos can’t be sent from this version. Remove them to continue.', 'error');
    return;
  }
  banner('');
  const opts = { clinician: settings.clinician, photoCount: sendPhotos().length, sourceList: sourcesForPrompt() };
  // An intake starts its care plan at the same moment, in a second call, so "Need advice right now?" is ready
  // (or nearly) by the time the record is read. Two shorter replies, so neither gets cut off.
  if (kind === 'intake') startIntakeCare();
  const reply = await runWorking(`Writing the ${DOC_KINDS[kind].label.replace(/^[A-Z](?=[a-z])/, (x) => x.toLowerCase())}`, DOC_KINDS[kind].working, (signal) =>
    askJson(buildDocPrompt(kind, text, opts), signal, { images: sendPhotos() }),
  );
  const d = normaliseDoc(reply);
  if (!d.sections.length) throw new AiError('empty', '');
  showDoc(d, kind);
}

$('doc-back').addEventListener('click', () => showView('record'));
$('doc-copy').addEventListener('click', () => {
  if (!currentDoc) return;
  shareOrCopy(docText(currentDoc.d) + (currentDoc.kind === 'mop' ? `${mopVideo(currentDoc.d) ? `\n\n${videoLine(mopVideo(currentDoc.d))}` : ''}\n\n${aiNoteFor(currentDoc.d.title)}` : ''), $('doc-title').textContent, 'Copied. Paste it wherever it needs to go.', docModel(currentDoc.d, DOC_KINDS[currentDoc.kind].label, currentDoc.kind === 'mop' ? aiNoteFor(currentDoc.d.title) : ''));
});
$('doc-new').addEventListener('click', addMoreInfo);

/* ---------------- make another from the same words ---------------- */

// After an intake record (say) the carer often wants the care plan or the vet summary too. These buttons reuse
// what was already said, so there's no going back and starting again.
// What each tool last made, and from which words, so flicking between them doesn't rewrite (or re-bill) anything.
const madeFrom = {};
const MAKE_NEXT = [
  ['carer', 'Care plan'],
  ['intake', 'Intake record'],
  ['log', 'Care log'],
  ['tovet', 'Summary for the vet'],
];
const MAKE_ICONS = {
  carer: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  intake: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v8M8 12h8"/>',
  log: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/>',
  tovet: '<path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 13v3a4 4 0 0 0 8 0v-2"/><circle cx="18" cy="12" r="2"/>',
  vet: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
};
const svgIcon = (inner) => {
  const t = document.createElement('template');
  t.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  return t.content.firstChild;
};
function renderMakeNext(box, current) {
  // A vet flicks between the carer plan and clinical notes from the same words, to copy either into their system.
  const pool = settings.role === 'vet' ? [['carer', 'Carer plan'], ['vet', 'Clinical notes']] : MAKE_NEXT;
  const options = current && current !== 'funding' ? pool.filter(([m]) => m !== current) : [];
  box.hidden = !options.length;
  if (!options.length) return box.replaceChildren();
  box.replaceChildren(
    el('h2', { text: 'Use the same notes for' }),
    el('p', { class: 'help', text: 'No need to say it again. One tap writes it from what you already said.' }),
    el('div', { class: 'make-next-row' }, options.map(([m, label]) => {
      const b = el('button', { type: 'button', class: 'make-btn' }, [svgIcon(MAKE_ICONS[m] || MAKE_ICONS.vet), el('span', { text: label }), el('span', { class: 'arrow', 'aria-hidden': 'true', text: '→' })]);
      b.addEventListener('click', () => makeNext(m));
      return b;
    })),
  );
}
// "Need advice right now?" on an intake record opens the care plan, already written in the same call.
$('advice-btn').addEventListener('click', () => makeNext('carer'));

// The care plan an intake starts in the background: { text, promise } resolving to a sheet, or null if it failed.
let pendingCare = null;
function startIntakeCare() {
  const text = els.transcript.value;
  const promise = askJson(buildCarerPlanPrompt(text.trim(), sourcesForPrompt(), { justIn: true, drugs: settings.drugs, photoCount: sendPhotos().length }), undefined, { images: sendPhotos() })
    .then((r) => {
      const sheet = normaliseCareSheet(r, SOURCE_IDS());
      if (!(sheet.summary || sheet.plan.length || sheet.housing.length)) return null;
      if (els.transcript.value === text) madeFrom.carer = { text, sheet, info: '' };
      return sheet;
    })
    .catch(() => null);
  pendingCare = { text, promise };
}
// Wait for that background plan (Stop still works). Null means make one the normal way.
async function waitForIntakeCare() {
  if (!pendingCare || pendingCare.text !== els.transcript.value) return null;
  const { promise } = pendingCare;
  busy = true;
  try {
    return await runWorking('Finishing the care plan', 'It started when you made the intake record, so it’s nearly done.', (signal) =>
      Promise.race([promise, new Promise((_, reject) => signal.addEventListener('abort', () => reject(new AiError('cancelled', '')), { once: true }))]),
    );
  } catch {
    showView('doc');
    return false;
  } finally {
    busy = false;
  }
}
$('text-vet-send').addEventListener('click', async () => {
  const mopVid = currentDoc && currentDoc.kind === 'mop' ? mopVideo(currentDoc.d) : null;
  const text = $('text-vet-body').textContent + (mopVid ? `\n\n${videoLine(mopVid)}` : '');
  if (!$('text-vet-body').textContent) return;
  try {
    if (navigator.share) {
      await navigator.share({ text });
      return;
    }
  } catch (e) {
    if (e && e.name === 'AbortError') return;
  }
  const ok = await copyText(text);
  const forVet = !currentDoc || currentDoc.kind === 'tovet';
  toast(ok ? (forVet ? 'Copied. Paste it into a text to your vet, and add a photo.' : 'Copied. Paste it into a text to the caller.') : 'Couldn’t copy. Select the text and copy it instead.');
});

// The vet's clinical notes, written in the background after the care plan appears, for the discharge pack and
// so "Clinical notes" opens straight away. One quiet call; nothing waits for it.
let pendingVetNotes = null; // { text, promise }
function startVetNotes() {
  const text = els.transcript.value;
  if (settings.role !== 'vet' || !text.trim() || !provider) return;
  if (madeFrom.vet && madeFrom.vet.text === text) return;
  if (pendingVetNotes && pendingVetNotes.text === text) return;
  const prompt = buildPrompt(text.trim(), { clinician: settings.clinician, photoCount: sendPhotos().length, drugs: settings.drugs });
  const promise = askJson(prompt, undefined, { images: sendPhotos() })
    .then((r) => {
      const list = normaliseResult(r);
      for (const n of list) if (!n.visit.type) n.visit.type = NOTE_TYPES.consult.title;
      if (list.length && els.transcript.value === text) madeFrom.vet = { text, notes: list };
      return list.length ? list : null;
    })
    .catch(() => null);
  pendingVetNotes = { text, promise };
}

$('discharge-pack').addEventListener('click', async (e) => {
  if (!careSheet) return;
  const btn = e.currentTarget;
  const text = els.transcript.value;
  let list = madeFrom.vet && madeFrom.vet.text === text ? madeFrom.vet.notes : null;
  if (!list && pendingVetNotes && pendingVetNotes.text === text) {
    btn.disabled = true;
    btn.lastChild.textContent = 'Finishing the clinical summary…';
    list = await pendingVetNotes.promise;
    btn.disabled = false;
    btn.lastChild.textContent = 'Discharge pack';
  }
  saveWord(dischargeModel(careSheet, list ? list[0] : null, lookupSource, settings.clinician), btn);
});

async function makeNext(m) {
  if (busy || !els.transcript.value.trim()) return;
  document.querySelector(`input[name="mode"][value="${m}"]`).checked = true;
  applyMode();
  settings.mode = m;
  store.saveSettings(settings);
  if (m === 'vet' && !(madeFrom.vet && madeFrom.vet.text === els.transcript.value) && pendingVetNotes && pendingVetNotes.text === els.transcript.value) {
    const list = await runWorking('Writing the clinical notes', 'Nearly done: it started while you read the care plan.', () => pendingVetNotes.promise);
    if (list) return showNotes(list, false);
  }
  const prev = madeFrom[m];
  if (prev && prev.text === els.transcript.value) {
    if (m === 'vet') return showNotes(prev.notes, false);
    return m === 'carer' ? showCare(prev.sheet, 'record', prev.info) : showDoc(prev.d, m, prev.info);
  }
  if (m === 'carer') {
    const sheet = await waitForIntakeCare();
    if (sheet === false) return; // stopped
    if (sheet) return showCare(sheet, 'record');
  }
  await createNote();
}

/* ---------------- Word printouts ---------------- */

// Save a Word file: through Claude's downloads inside Claude, otherwise a normal download.
async function deliverWord(blob, filename) {
  const downloads = inClaude && globalThis.claude.use ? await globalThis.claude.use('downloads') : null;
  if (downloads) {
    try {
      await downloads.save({ filename, data: blob });
      toast('Saved. Open it in Word to print, email or forward.');
    } catch (e) {
      if (e && e.code !== 'declined') toast('Couldn’t save the document here. Try again in a moment.');
    }
    return;
  }
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  toast('Downloaded. Open it in Word to print, email or forward.');
}

async function saveWord(model, btn) {
  if (!model) return;
  const label = btn.lastChild.textContent;
  btn.disabled = true;
  btn.lastChild.textContent = 'Making printout…';
  try {
    const blob = await buildWord(model, { preparedBy: settings.clinician, template: settings.template });
    await deliverWord(blob, wordFileName(model.title));
  } catch {
    toast('Couldn’t make the printout. Try again.');
  } finally {
    btn.disabled = false;
    btn.lastChild.textContent = label;
  }
}
$('word-doc').addEventListener('click', (e) => currentDoc && saveWord(docModel(currentDoc.d, DOC_KINDS[currentDoc.kind].label, currentDoc.kind === 'mop' ? aiNoteFor(currentDoc.d.title) : ''), e.currentTarget));
$('word-care').addEventListener('click', (e) => careSheet && saveWord(careModel(careSheet, lookupSource), e.currentTarget));
$('word-note').addEventListener('click', (e) => currentNote() && saveWord(noteModel(currentNote()), e.currentTarget));

/* ---------------- how it works ---------------- */

els.about.innerHTML = ABOUT_HTML; // static, trusted content
// A Back button at the top of How it works.
els.about.prepend(el('div', { class: 'head-row about-back' }, [el('button', { type: 'button', class: 'link back', onclick: () => closeAbout() }, [
  (() => { const t = document.createElement('template'); t.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>'; return t.content.firstChild; })(),
  'Back',
])]));
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
    if (settings.role !== 'vet') document.querySelector('input[name="mode"][value="intake"]').checked = true;
    applyMode();
    loadExample(settings.role !== 'vet' ? EXAMPLE_INTAKE_DICTATION : mode() === 'vet' ? EXAMPLE_WOMBAT_VET_DICTATION : EXAMPLE_VET_PLAN_DICTATION);
  }
});

/* ---------------- settings ---------------- */

for (const m of CONFIG.models) els.model.append(el('option', { value: m.id, text: m.label }));

/* ---------------- AI usage ---------------- */

onUsage((u) => store.addUsage(u));

const fmtInt = (n) => Math.round(n).toLocaleString('en-AU');
const MODEL_NAMES = { 'tier:quick': 'Fast tier', 'tier:default': 'Standard tier', 'tier:complex': 'Most capable tier' };
const modelName = (id) => (CONFIG.models.find((m) => m.id === id)?.label.split(',')[0]) || MODEL_NAMES[id] || id;
function usageCost(id, u) {
  const m = CONFIG.models.find((x) => x.id === id);
  return m && m.price ? (u.input * m.price[0] + u.output * m.price[1]) / 1e6 : null;
}

function renderUsage(p) {
  const u = store.loadUsage();
  const body = $('usage-body');
  body.replaceChildren();
  const rows = Object.entries(u.models);
  const viaAccount = p && p.id === 'claude';
  const monthName = new Date(`${u.month}-01T00:00:00`).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
  if (!rows.length) {
    body.append(el('p', { class: 'help', text: `No AI requests from this device in ${monthName} yet.` }));
  } else {
    const table = el('table', { class: 'usage-table' });
    const head = el('tr');
    for (const h of viaAccount ? ['Model', 'Requests'] : ['Model', 'Requests', 'Tokens in', 'Tokens out', 'Cost (USD)']) head.append(el('th', { scope: 'col', text: h }));
    table.append(el('thead'), el('tbody'));
    table.tHead.append(head);
    let total = 0;
    let costKnown = true;
    for (const [id, m] of rows) {
      const tr = el('tr');
      const cost = usageCost(id, m);
      if (cost === null) costKnown = false;
      else total += cost;
      const cells = viaAccount ? [modelName(id), fmtInt(m.requests)] : [modelName(id), fmtInt(m.requests), fmtInt(m.input), fmtInt(m.output), cost === null ? '' : `$${cost.toFixed(2)}`];
      for (const c of cells) tr.append(el('td', { text: c }));
      table.tBodies[0].append(tr);
    }
    body.append(el('p', { class: 'help', text: `This device, ${monthName}:` }), table);
    if (!viaAccount && costKnown) body.append(el('p', { class: 'usage-total', text: `About $${total.toFixed(2)} USD this month (estimate from published prices).` }));
  }
  if (u.last) {
    const lastTotal = Object.entries(u.last.models).reduce((t, [id, m]) => t + (usageCost(id, m) || 0), 0);
    const lastReq = Object.values(u.last.models).reduce((t, m) => t + m.requests, 0);
    const lastName = new Date(`${u.last.month}-01T00:00:00`).toLocaleDateString('en-AU', { month: 'long' });
    body.append(el('p', { class: 'help', text: `${lastName}: ${fmtInt(lastReq)} requests${viaAccount ? '' : `, about $${lastTotal.toFixed(2)} USD`}.` }));
  }
  const bal = $('usage-balance');
  bal.replaceChildren();
  if (viaAccount) {
    bal.textContent = 'You’re using your own Claude account, so this counts toward your Claude plan’s usage limits. Claude doesn’t share token counts with apps.';
  } else {
    bal.append(
      'Credit balance isn’t available to apps. The account owner can see it in the ',
      el('a', { href: 'https://console.anthropic.com/settings/billing', target: '_blank', rel: 'noopener', text: 'Claude Console, Billing' }),
      '. These figures only count this device.',
    );
  }
}

$('usage-reset').addEventListener('click', () => {
  store.clearUsage();
  renderUsage(provider);
  toast('Usage count reset on this device.');
});

async function refreshConnection() {
  const p = await resolveProvider(settings);
  const keyless = Boolean(CONFIG.proxyUrl) || (p && p.id === 'claude');
  els.keyField.hidden = keyless;
  els.conn.dataset.ok = String(Boolean(p));
  els.conn.textContent = p
    ? `Connected: ${p.label}`
    : inClaude
      ? 'Claude isn’t available right now.'
      : 'Public demo. The examples work here. Open Animal Welfare Companion in the Claude app to write notes with your Claude account.';
  return p;
}

async function openSettings(message) {
  els.clinician.value = settings.clinician;
  $('drugs').value = settings.drugs || '';
  els.model.value = settings.model || CONFIG.defaultModel;
  els.apiKey.value = settings.apiKey;
  els.rememberKey.checked = settings.rememberKey;
  $('photos-on').checked = settings.photosOn !== false;
  $('template').querySelector('option[value="rspca"]').hidden = !store.rspcaUnlocked();
  $('template').value = settings.template === 'rspca' && !store.rspcaUnlocked() ? 'bunurong' : settings.template || 'bunurong';
  $('unlock').value = '';
  $('unlock-msg').textContent = store.rspcaUnlocked() ? 'RSPCA handouts are unlocked on this device.' : '';
  renderUsage(await refreshConnection());
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
  settings = { ...settings, photosOn: $('photos-on').checked, template: $('template').value, drugs: $('drugs').value.slice(0, 3000), clinician: els.clinician.value.trim().slice(0, 80), model: els.model.value, apiKey: key, rememberKey: els.rememberKey.checked };
  store.saveSettings(settings);
  provider = null;
  renderPhotos();
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

/* ---------------- pick up where you left off ---------------- */

const LAST_LABEL = { notes: 'Clinical notes', care: 'Care plan', doc: 'Record' };
function remember(type, data, title) {
  store.saveLast({ type, data, title: String(title || '').slice(0, 80), text: els.transcript.value, at: Date.now() });
}
function ago(ms) {
  const m = Math.round(ms / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  return h < 24 ? `${h} h ago` : `${Math.round(h / 24)} d ago`;
}
// The last thing made stays one tap away, even after the app was closed (for example to answer the phone).
function renderResume() {
  const last = store.loadLast();
  const fresh = last && Date.now() - last.at < 7 * 864e5;
  $('resume').hidden = !fresh;
  if (!fresh) return;
  const label = last.type === 'doc' && DOC_KINDS[last.data.kind] ? DOC_KINDS[last.data.kind].label : LAST_LABEL[last.type];
  // The animal leads, so it's easy to tell which one this was.
  const title = String(last.title || '').trim();
  const name = title ? title[0].toUpperCase() + title.slice(1) : label;
  $('resume-title').textContent = name;
  $('resume-text').textContent = `${title ? `${label} · ` : ''}${ago(Date.now() - last.at)}`;
  $('resume-open').setAttribute('aria-label', `Open ${name}`);
}
$('resume-open').addEventListener('click', () => {
  const last = store.loadLast();
  if (!last) return;
  if (last.text && !els.transcript.value.trim()) setTranscript(last.text);
  if (last.type === 'care') showCare(normaliseCareSheet(last.data.sheet, null), last.data.from === 'note' ? 'record' : last.data.from);
  else if (last.type === 'doc') showDoc(normaliseDoc(last.data.d), last.data.kind);
  else if (last.type === 'notes') showNotes(last.data.map(normaliseNote), false);
});

/* ---------------- start up ---------------- */

const startMode = MODES.includes(settings.mode) ? settings.mode : 'carer';
document.querySelector(`input[name="mode"][value="${startMode}"]`).checked = true;
applyRegion();
applyRole();
applyMode();
setTranscript(store.loadDraft());
// An example left in the box from last time isn't their work: start clean on reload.
if (isExampleText()) setTranscript('');
renderResume();
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


/* ---------------- access code: RSPCA handouts ---------------- */

// Typing the code unlocks RSPCA-styled handouts on this device. Not a security measure, just a switch.
$('unlock').addEventListener('input', (e) => {
  if (e.target.value.trim().toLowerCase() !== 'rspca') return;
  store.unlockRspca();
  const opt = $('template').querySelector('option[value="rspca"]');
  opt.hidden = false;
  $('template').value = 'rspca';
  e.target.value = '';
  $('unlock-msg').textContent = 'RSPCA handouts unlocked on this device. Save to use them.';
});

/* ---------------- "Add more info" from inside the review lists ---------------- */

document.querySelectorAll('.add-more-inline').forEach((b) => b.addEventListener('click', () => addMoreInfo()));

/* ---------------- feedback: thumbs up or down ---------------- */

function resetFeedback() {
  document.querySelectorAll('.feedback').forEach((f) => {
    f.dataset.voted = '';
    f.querySelectorAll('.fb-btn').forEach((b) => b.setAttribute('aria-pressed', 'false'));
  });
}
document.querySelectorAll('.feedback').forEach((f) =>
  f.addEventListener('click', (e) => {
    const b = e.target.closest('.fb-btn');
    if (!b || busy) return;
    f.querySelectorAll('.fb-btn').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    f.dataset.voted = b.dataset.vote;
    store.addFeedback && store.addFeedback(b.dataset.vote, f.dataset.for);
    if (b.dataset.vote === 'up') toast('Thanks, glad it helped.');
    else {
      $('retry-note').value = '';
      $('retry-dlg').showModal();
    }
  }),
);
$('retry-dlg').addEventListener('close', async () => {
  const how = $('retry-dlg').returnValue;
  $('retry-dlg').returnValue = '';
  if (how !== 'retry') return;
  const why = $('retry-note').value.trim();
  promptExtra = `This is a second attempt. The person was not happy with the first version${why ? `. Their feedback: "${why.slice(0, 600)}"` : ''}. Take extra care: follow every rule, include everything they said, keep it accurate, clear and complete, and fix what they mentioned.`;
  const view = document.body.dataset.view;
  const text = els.transcript.value.trim();
  try {
    await withModel(BEST_MODEL, async () => {
      if (view === 'doc' && currentDoc) await createDoc(currentDoc.kind, text);
      else if (view === 'care') await createCarePlan(madeFrom.carer?.text?.trim() || text);
      else await createNote();
    });
  } catch (e) {
    showView(view);
    toast(friendly(e));
  } finally {
    promptExtra = '';
    resetFeedback();
  }
});

/* ---------------- AI polish for edited clinical notes ---------------- */

const polishBtn = $('polish');
els.plain.addEventListener('input', () => (polishBtn.hidden = els.plain.value === plainAtRender));
polishBtn.addEventListener('click', async () => {
  const before = els.plain.value;
  if (!before.trim() || busy) return;
  polishBtn.disabled = true;
  polishBtn.lastChild.textContent = 'Polishing…';
  try {
    const out = await withModel(QUICK_MODEL, async () => {
      if (!(await ensureProvider())) throw new AiError('forbidden', NO_CLAUDE);
      return provider.generate(`Tidy these veterinary clinical notes, which a vet has just edited by hand. Fix spelling, grammar, punctuation and layout so they read as finished notes ready to paste into a practice management system. Keep every fact, number, drug, dose, route and date exactly as written, and keep the existing headings and order. Do not add, remove or guess any clinical content. Australian English. Reply with the notes text only, nothing before or after.

<notes>
${before.slice(0, 20000)}
</notes>`);
    });
    const text = String(out || '').replace(/^```[a-z]*\n?|```$/g, '').trim();
    if (!text) throw new AiError('empty', '');
    els.plain.value = text;
    plainAtRender = text;
    fitPlain();
    polishBtn.hidden = true;
    toast('Polished.', { label: 'Undo', run: () => { els.plain.value = before; fitPlain(); polishBtn.hidden = false; } });
  } catch (e) {
    toast(friendly(e));
  } finally {
    polishBtn.disabled = false;
    polishBtn.lastChild.textContent = 'AI polish';
  }
});

/* ---------------- printing: offer the Word printout ---------------- */

document.addEventListener('keydown', (e) => {
  if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== 'p') return;
  const view = document.body.dataset.view;
  if (!['note', 'care', 'doc'].includes(view)) return;
  e.preventDefault();
  $('print-dlg').showModal();
});
$('print-dlg').addEventListener('close', () => {
  const how = $('print-dlg').returnValue;
  $('print-dlg').returnValue = '';
  const view = document.body.dataset.view;
  if (how === 'word') ({ note: $('word-note'), care: $('word-care'), doc: $('word-doc') })[view]?.click();
  if (how === 'page') {
    try {
      window.print();
    } catch {
      toast('Printing isn’t available here. Use the Word printout instead.');
    }
  }
});


/* ---------------- home screen hint (website only, rarely) ---------------- */

// Once someone has made a few things, now and then suggest adding the app to their home screen.
// Never inside Claude, never once it's installed, at most every three weeks, and never again after "Don't show again".
let installEvent = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  installEvent = e;
});
function homeScreenTip() {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'Tap the Share button (the square with an arrow), then Add to Home Screen.';
  if (/Android/i.test(ua)) return installEvent ? 'Tap Add below, or open the ⋮ menu and choose Add to Home screen.' : 'Open the ⋮ menu (top right), then choose Add to Home screen or Install app.';
  if (/Edg\//.test(ua)) return 'Open the … menu, then Apps, then Install this site as an app.';
  if (/Chrome\//.test(ua)) return 'Click the install icon at the right of the address bar, or open the ⋮ menu and choose Install.';
  return '';
}
function maybeShowHomeTip() {
  const installed = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  if (inClaude || installed) return;
  let st = {};
  try {
    st = JSON.parse(localStorage.getItem('css.hometip') || '{}');
  } catch {
    st = {};
  }
  const made = Number(localStorage.getItem('css.made') || 0);
  if (st.never || made < 3 || (st.last && Date.now() - st.last < 21 * 864e5)) return;
  const tip = homeScreenTip();
  if (!tip) return;
  const save = (x) => {
    try {
      localStorage.setItem('css.hometip', JSON.stringify({ ...st, ...x }));
    } catch {
      /* ignore */
    }
  };
  save({ last: Date.now() });
  const box = el('div', { class: 'home-tip', role: 'note' }, [
    el('p', {}, [el('strong', { text: 'Keep it handy. ' }), `Add Animal Welfare Companion to your home screen. ${tip}`]),
    el('div', { class: 'home-tip-actions' }, [
      installEvent && /Android|Chrome|Edg/.test(navigator.userAgent)
        ? el('button', { type: 'button', class: 'btn small primary', onclick: async () => { box.remove(); installEvent.prompt(); installEvent = null; } }, 'Add')
        : null,
      el('button', { type: 'button', class: 'link', onclick: () => box.remove() }, 'Not now'),
      el('button', { type: 'button', class: 'link', onclick: () => { save({ never: true }); box.remove(); } }, 'Don’t show again'),
    ]),
  ]);
  $('view-record').append(box);
}
// Count things made, then check on the home screen.
const countMade = () => {
  try {
    localStorage.setItem('css.made', String(Number(localStorage.getItem('css.made') || 0) + 1));
  } catch {
    /* ignore */
  }
};
['view-care', 'view-doc', 'view-note'].forEach((id) => new MutationObserver(() => { if (!$(id).hidden) countMade(); }).observe($(id), { attributes: true, attributeFilter: ['hidden'] }));
setTimeout(maybeShowHomeTip, 2500);
