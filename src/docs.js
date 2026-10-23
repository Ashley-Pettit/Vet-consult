// Documents attached to an expert witness statement (inspector's notes, earlier records, lab reports).
// Word and text files are read here in the browser and go to Claude as text. PDFs go to Claude as the file
// itself, so it can read scanned pages too (the website and personal-key versions; the Claude app reads Word or text).

export const MAX_DOCS = 5;
export const MAX_DOC_BYTES = 10 * 1024 * 1024;
export const MAX_DOC_TEXT = 60000; // characters per document, so a long file can't crowd out the dictation
export const DOC_ACCEPT = '.pdf,.docx,.txt,.md,.csv,.rtf,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain';

export class DocError extends Error {}

const ext = (name) => (String(name).toLowerCase().match(/\.([a-z0-9]+)$/) || [])[1] || '';

function bytesToBase64(bytes) {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(s);
}

const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
const decode = (s) => s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) => (e[0] === '#' ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : entities[e] ?? m));

/** Find one file inside a zip (a .docx is a zip) and return its bytes. */
async function unzipEntry(buf, wanted) {
  const v = new DataView(buf);
  let eocd = -1;
  for (let i = buf.byteLength - 22; i >= Math.max(0, buf.byteLength - 66000); i--) {
    if (v.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new DocError('not a zip');
  const count = v.getUint16(eocd + 10, true);
  let p = v.getUint32(eocd + 16, true);
  const td = new TextDecoder();
  for (let n = 0; n < count; n++) {
    if (v.getUint32(p, true) !== 0x02014b50) break;
    const method = v.getUint16(p + 10, true);
    const size = v.getUint32(p + 20, true);
    const nameLen = v.getUint16(p + 28, true);
    const extraLen = v.getUint16(p + 30, true);
    const commentLen = v.getUint16(p + 32, true);
    const local = v.getUint32(p + 42, true);
    const name = td.decode(new Uint8Array(buf, p + 46, nameLen));
    if (name === wanted) {
      const start = local + 30 + v.getUint16(local + 26, true) + v.getUint16(local + 28, true);
      const raw = new Uint8Array(buf, start, size);
      if (method === 0) return raw;
      if (method !== 8 || typeof DecompressionStream === 'undefined') throw new DocError('unsupported zip');
      const stream = new Blob([raw]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
      return new Uint8Array(await new Response(stream).arrayBuffer());
    }
    p += 46 + nameLen + extraLen + commentLen;
  }
  throw new DocError('no document.xml');
}

/** Plain text from a Word .docx: paragraphs on their own lines, table cells separated by tabs. */
export async function docxText(buf) {
  const xml = new TextDecoder().decode(await unzipEntry(buf, 'word/document.xml'));
  return decode(
    xml
      .replace(/<w:tab\/>/g, '\t')
      .replace(/<w:br[^>]*\/>/g, '\n')
      .replace(/<\/w:tc>/g, '\t')
      .replace(/<\/w:p>/g, '\n')
      .replace(/<[^>]+>/g, ''),
  )
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Rough text from an .rtf file: good enough for notes saved from WordPad or TextEdit. */
function rtfText(s) {
  return s
    .replace(/\\par[d]?/g, '\n')
    .replace(/\\'([0-9a-f]{2})/gi, (m, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/\\[a-z]+-?\d* ?/gi, '')
    .replace(/[{}]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Read one attached file: { name, kind: 'text', text } or { name, kind: 'pdf', data, mediaType }. */
export async function readDocument(file) {
  const name = file.name || 'Document';
  if (file.size > MAX_DOC_BYTES) throw new DocError(`${name} is over 10 MB. Try a smaller copy.`);
  const e = ext(name);
  const buf = await file.arrayBuffer();
  if (e === 'pdf' || file.type === 'application/pdf') {
    return { name, kind: 'pdf', mediaType: 'application/pdf', data: bytesToBase64(new Uint8Array(buf)), size: file.size };
  }
  let text = '';
  if (e === 'docx') {
    try {
      text = await docxText(buf);
    } catch {
      throw new DocError(`${name} couldn’t be opened. Save it again as a Word (.docx) or PDF file and try again.`);
    }
  } else if (e === 'doc') {
    throw new DocError(`${name} is an old Word file. Save it as .docx or PDF and try again.`);
  } else if (e === 'rtf') {
    text = rtfText(new TextDecoder().decode(buf));
  } else if (['txt', 'md', 'csv'].includes(e) || /^text\//.test(file.type)) {
    text = new TextDecoder().decode(buf);
  } else {
    throw new DocError(`${name} isn’t a file type that can be read. Use PDF, Word (.docx) or text.`);
  }
  text = text.trim();
  if (!text) throw new DocError(`${name} has no text to read. If it’s a scan, upload it as a PDF or a photo.`);
  return { name, kind: 'text', text: text.slice(0, MAX_DOC_TEXT), cut: text.length > MAX_DOC_TEXT, size: file.size };
}
