// Builds dist/ (the web app for GitHub Pages) and dist-artifact/ (a single-file page for Claude).
import { build } from 'esbuild';
import { createHash } from 'node:crypto';
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const out = root + 'dist/';
const art = root + 'dist-artifact/';
rmSync(out, { recursive: true, force: true });
rmSync(art, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
mkdirSync(art, { recursive: true });

const common = { bundle: true, minify: true, target: ['es2020', 'safari14'], legalComments: 'none', logLevel: 'warning' };
// Code splitting: the Word library becomes its own file, fetched only when someone asks for a Word printout.
await build({ ...common, entryPoints: [root + 'src/app.js'], outdir: out, format: 'esm', splitting: true, entryNames: '[name]', chunkNames: 'chunks/[name]-[hash]', define: { __NO_PDF__: 'false' } });
await build({ ...common, entryPoints: [root + 'src/app.css'], outfile: out + 'app.css' });
cpSync(root + 'public', out, { recursive: true });

const js = readFileSync(out + 'app.js', 'utf8');
const css = readFileSync(out + 'app.css', 'utf8');
const version = createHash('sha256').update(js + css).digest('hex').slice(0, 10);
const { CONFIG } = await import(root + 'src/config.js');
const connect = ['https://api.anthropic.com', CONFIG.proxyUrl ? new URL(CONFIG.proxyUrl).origin : ''].filter(Boolean).join(' ');
let html = readFileSync(root + 'index.html', 'utf8').replace("connect-src 'self' https:", `connect-src 'self' ${connect}`);
// The tiny theme script in <head> runs before the page draws (no flash of the wrong theme); allow exactly it by hash.
const headScript = (html.match(/<head>[\s\S]*?<script>([\s\S]*?)<\/script>/) || [])[1];
if (headScript) html = html.replace("script-src 'self'", `script-src 'self' 'sha256-${createHash('sha256').update(headScript).digest('base64')}'`);
writeFileSync(out + 'index.html', html.replace('app.js"', `app.js?v=${version}"`).replace('app.css"', `app.css?v=${version}"`));
writeFileSync(out + 'sw.js', readFileSync(out + 'sw.js', 'utf8').replace('__VERSION__', version));
writeFileSync(out + '.nojekyll', '');
writeFileSync(out + '404.html', html.replace(/<main[\s\S]*<\/main>/, '<main><p>Page not found. <a href="./">Open Animal Welfare Companion</a></p></main>').replace(/<script[\s\S]*?<\/script>/g, ''));

// Raw control characters (the zip library behind Word printouts has some inside its strings) can upset the
// Claude artifact viewer. They only ever sit inside string literals, where a \xNN escape means the same thing.
const safeJs = (code) =>
  code
    .replace(/<\/script/gi, '<\\/script')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, (c) => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0'));

// Single-file artifact build: inline everything, no CSP meta, no manifest/service worker.
const iife = await build({ ...common, entryPoints: [root + 'src/app.js'], format: 'iife', write: false, define: { __NO_PDF__: 'true' } });
const body = html.match(/<body>([\s\S]*)<\/body>/)[1].replace(/<script[\s\S]*?<\/script>/, '');
const artifact =
  `<title>Animal Welfare Companion</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n<style>${css}` +
  // Inside Claude the page already sits below the status bar, so the header must not add that space again.
  `.band{padding-top:0}.bar{padding-top:8px;padding-bottom:8px}</style>\n` +
  body +
  `<script>${safeJs(iife.outputFiles[0].text)}</script>\n`;
writeFileSync(art + 'care-scribe.html', artifact);
console.log(`built ${version}: app.js ${js.length} B, app.css ${css.length} B, artifact ${artifact.length} B`);
