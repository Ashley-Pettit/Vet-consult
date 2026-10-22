// Photos: shrink on the device before sending, so uploads stay quick on clinic Wi-Fi.
export const MAX_PHOTOS = 5;
const MAX_SIDE = 1280;

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(',')[1] || '');
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}

async function decode(file) {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch {
      /* fall back to <img> */
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** Resize to a JPEG no larger than 1280 px on the long side. */
export async function preparePhoto(file) {
  if (!file || !/^image\//.test(file.type)) throw new Error('not_image');
  const img = await decode(file);
  const w = img.width || img.naturalWidth;
  const h = img.height || img.naturalHeight;
  const scale = Math.min(1, MAX_SIDE / Math.max(w, h));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(w * scale));
  canvas.height = Math.max(1, Math.round(h * scale));
  canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
  if (typeof img.close === 'function') img.close();
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82));
  if (!blob) throw new Error('encode_failed');
  return { blob, mediaType: 'image/jpeg', data: await blobToBase64(blob), url: URL.createObjectURL(blob), name: file.name || 'Photo' };
}

/**
 * Claude reads images, not video, so a video becomes a few still frames spread through the clip
 * (start, middle, end), each prepared like a photo. Returns up to `count` frames.
 */
export async function videoFrames(file, count = 3) {
  if (!file || !/^video\//.test(file.type)) throw new Error('not_video');
  const url = URL.createObjectURL(file);
  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.src = url;
  const once = (ev) => new Promise((resolve, reject) => {
    const ok = () => { cleanup(); resolve(); };
    const bad = () => { cleanup(); reject(new Error('video_unreadable')); };
    const cleanup = () => { video.removeEventListener(ev, ok); video.removeEventListener('error', bad); };
    video.addEventListener(ev, ok, { once: true });
    video.addEventListener('error', bad, { once: true });
  });
  try {
    await once('loadeddata');
    const d = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 1;
    const times = count === 1 ? [d / 2] : Array.from({ length: count }, (_, i) => Math.min(d - 0.05, Math.max(0.05, (d * (i + 0.5)) / count)));
    const out = [];
    for (const [i, t] of times.entries()) {
      video.currentTime = t;
      await once('seeked');
      const w = video.videoWidth;
      const h = video.videoHeight;
      if (!w || !h) throw new Error('video_unreadable');
      const scale = Math.min(1, MAX_SIDE / Math.max(w, h));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82));
      if (!blob) throw new Error('encode_failed');
      out.push({ blob, mediaType: 'image/jpeg', data: await blobToBase64(blob), url: URL.createObjectURL(blob), name: `Video still ${i + 1}`, video: true });
    }
    return out;
  } finally {
    URL.revokeObjectURL(url);
    video.removeAttribute('src');
    video.load();
  }
}
