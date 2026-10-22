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
  // Some phones give HEIC photos no type, so the file name counts too.
  if (!file || !(/^image\//.test(file.type) || /\.(jpe?g|png|heic|heif|webp|gif)$/i.test(file.name || ''))) throw new Error('not_image');
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

