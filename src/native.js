// Android app support (Capacitor). The web and Claude versions never take these paths.
import { Capacitor, registerPlugin } from '@capacitor/core';

export const isNative = Capacitor.isNativePlatform();

const Speech = registerPlugin('SpeechRecognition');

/**
 * One-tap dictation using Android's own speech recogniser, with the same shape as the browser Dictation class:
 * start/stop/cancel, state ('idle' | 'starting' | 'listening'), and onstate/oninterim/onfinal/onerror.
 * Android stops listening after a pause, so while the carer still wants to talk it quietly starts again,
 * committing each stretch of speech as it goes.
 */
export class NativeDictation {
  constructor({ lang = 'en-AU' } = {}) {
    this.lang = lang;
    this.state = 'idle';
    this.wanted = false;
    this.partial = '';
    this.quickFails = 0;
    this.handles = [];
    this.onstate = () => {};
    this.oninterim = () => {};
    this.onfinal = () => {};
    this.onerror = () => {};
  }
  get supported() {
    return isNative;
  }
  _set(s) {
    if (this.state !== s) {
      this.state = s;
      this.onstate(s);
    }
  }
  async _listen() {
    if (!this.handles.length) {
      this.handles.push(
        await Speech.addListener('partialResults', ({ matches }) => {
          this.partial = (matches && matches[0]) || '';
          this.oninterim(this.partial);
        }),
        await Speech.addListener('listeningState', ({ status }) => {
          if (status === 'started') {
            this.startedAt = Date.now();
            this._set('listening');
          } else this._ended();
        }),
      );
    }
  }
  _commit() {
    const t = this.partial.trim();
    this.partial = '';
    this.oninterim('');
    if (t) {
      this.quickFails = 0;
      this.onfinal(t);
    }
  }
  _ended() {
    const hadSpeech = Boolean(this.partial.trim());
    this._commit();
    if (!this.wanted) return this._set('idle');
    const quick = !hadSpeech && Date.now() - (this.startedAt || 0) < 1500;
    this.quickFails = quick ? this.quickFails + 1 : 0;
    if (this.quickFails >= 5) {
      this.wanted = false;
      this._set('idle');
      return this.onerror('interrupted');
    }
    setTimeout(() => this.wanted && this._open(), 200);
  }
  async _open() {
    try {
      await Speech.start({ language: this.lang, partialResults: true, popup: false, maxResults: 1 });
    } catch {
      // Starting can fail if the recogniser is still winding down; the listeningState event tries again.
      setTimeout(() => this.wanted && this._open(), 400);
    }
  }
  start() {
    if (this.wanted) return true;
    this.wanted = true;
    this.quickFails = 0;
    this._set('starting');
    (async () => {
      try {
        const { available } = await Speech.available();
        if (!available) throw Object.assign(new Error(), { code: 'unsupported' });
        let perm = await Speech.checkPermissions();
        if (perm.speechRecognition !== 'granted') perm = await Speech.requestPermissions();
        if (perm.speechRecognition !== 'granted') throw Object.assign(new Error(), { code: 'not-allowed' });
        await this._listen();
        if (this.wanted) await this._open();
      } catch (e) {
        this.wanted = false;
        this._set('idle');
        this.onerror((e && e.code) || 'start-failed');
      }
    })();
    return true;
  }
  stop() {
    this.wanted = false;
    Speech.stop().catch(() => {});
    // If Android never reports that it stopped, settle anyway so the button doesn't stay red.
    setTimeout(() => {
      if (this.state !== 'idle') {
        this._commit();
        this._set('idle');
      }
    }, 1500);
  }
  cancel() {
    this.wanted = false;
    this.partial = '';
    this.oninterim('');
    Speech.stop().catch(() => {});
    this._set('idle');
  }
}

/** Hand a generated file to Android's share sheet: save to Drive or Files, email it, or open it in Word. */
export async function shareFile(blob, filename, title) {
  const { Filesystem, Directory } = await import('@capacitor/filesystem');
  const { Share } = await import('@capacitor/share');
  const data = await new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(',')[1]);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
  const { uri } = await Filesystem.writeFile({ path: filename, data, directory: Directory.Cache });
  await Share.share({ title, url: uri, dialogTitle: 'Save or send the printout' });
}
