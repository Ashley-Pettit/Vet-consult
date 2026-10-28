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
// __MEDS__: the prescribing and medicines tools (vet sign in, Ask a vet, Prescribe). Kept off the live site until
// they're ready (Ash, October 2026); beta and local builds have them.
// Code splitting: the Word library becomes its own file, fetched only when someone asks for a Word printout.
await build({ ...common, entryPoints: [root + 'src/app.js'], outdir: out, format: 'esm', splitting: true, entryNames: '[name]', chunkNames: 'chunks/[name]-[hash]', define: { __NO_PDF__: 'false', __BETA__: process.env.CHANNEL === 'beta' ? 'true' : 'false', __MEDS__: process.env.CHANNEL === 'live' ? 'false' : 'true' } });
await build({ ...common, entryPoints: [root + 'src/app.css'], outfile: out + 'app.css' });
cpSync(root + 'public', out, { recursive: true });

const js = readFileSync(out + 'app.js', 'utf8');
const css = readFileSync(out + 'app.css', 'utf8');
const version = createHash('sha256').update(js + css).digest('hex').slice(0, 10);
const { CONFIG } = await import(root + 'src/config.js');
const connect = ['https://api.anthropic.com', CONFIG.proxyUrl ? new URL(CONFIG.proxyUrl).origin : ''].filter(Boolean).join(' ');
let html = readFileSync(root + 'index.html', 'utf8').replace("connect-src 'self' https:", `connect-src 'self' ${connect}`);
// Open the connection to the proxy while the page loads, so the first AI call skips the DNS and TLS set-up.
// use-credentials matches the app's requests (they send the organisation's sign-in cookie).
if (CONFIG.proxyUrl) html = html.replace('</head>', `<link rel="preconnect" href="${new URL(CONFIG.proxyUrl).origin}" crossorigin="use-credentials">\n</head>`);
// The tiny theme script in <head> runs before the page draws (no flash of the wrong theme); allow exactly it by hash.
const headScript = (html.match(/<head>[\s\S]*?<script>([\s\S]*?)<\/script>/) || [])[1];
if (headScript) html = html.replace("script-src 'self'", `script-src 'self' 'sha256-${createHash('sha256').update(headScript).digest('base64')}'`);
// app.js imports its shared chunks straight away: tell the browser up front, so they download together, not one after another.
const preloads = [...js.matchAll(/(?:from|import)\s*"\.\/(chunks\/[^"]+\.js)"/g)].map((m) => m[1]);
const preloadTags = [...new Set(preloads)].map((c) => `<link rel="modulepreload" href="${c}">`).join('\n');
writeFileSync(out + 'index.html', html.replace('app.js"', `app.js?v=${version}"`).replace('app.css"', `app.css?v=${version}"`).replace('</head>', `${preloadTags}\n</head>`));
// The beta copy (CHANNEL=beta, published at /care-beta/) installs under its own name, so it never looks like the live app.
if (process.env.CHANNEL === 'beta') {
  const mf = JSON.parse(readFileSync(out + 'manifest.webmanifest', 'utf8'));
  // Its Home Screen icon carries a BETA label too.
  const icons = mf.icons.map((i) => ({ ...i, src: i.src.replace(/\.png$/, '-beta.png') }));
  writeFileSync(out + 'manifest.webmanifest', JSON.stringify({ ...mf, name: `${mf.name} Beta`, short_name: 'WWC Beta', icons }, null, 2));
  writeFileSync(out + 'index.html', readFileSync(out + 'index.html', 'utf8').replace('icons/apple-touch-icon.png', 'icons/apple-touch-icon-beta.png'));
}
writeFileSync(out + 'sw.js', readFileSync(out + 'sw.js', 'utf8').replace('__VERSION__', version));
writeFileSync(out + '.nojekyll', '');
writeFileSync(out + '404.html', html.replace(/<main[\s\S]*<\/main>/, '<main><p>Page not found. <a href="./">Open Wildlife Welfare Companion</a></p></main>').replace(/<script[\s\S]*?<\/script>/g, ''));

// Raw control characters (the zip library behind Word printouts has some inside its strings) can upset the
// Claude artifact viewer. They only ever sit inside string literals, where a \xNN escape means the same thing.
const safeJs = (code) =>
  code
    .replace(/<\/script/gi, '<\\/script')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, (c) => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0'));

// Single-file artifact build: inline everything, no CSP meta, no manifest/service worker.
const iife = await build({ ...common, entryPoints: [root + 'src/app.js'], format: 'iife', write: false, define: { __NO_PDF__: 'true', __BETA__: 'false', __MEDS__: 'false' } });
const body = html.match(/<body>([\s\S]*)<\/body>/)[1].replace(/<script[\s\S]*?<\/script>/, '');
const artifact =
  `<title>Wildlife Welfare Companion</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n<style>${css}` +
  // Inside Claude the page already sits below the status bar, so the header must not add that space again.
  `.band{padding-top:0}.bar{padding-top:8px;padding-bottom:8px}</style>\n` +
  // Same opening splash as the web app: flag it before the body draws.
  `<script>document.documentElement.classList.add('booting')</script>\n` +
  body +
  `<script>${safeJs(iife.outputFiles[0].text)}</script>\n`;
writeFileSync(art + 'care-scribe.html', artifact);
console.log(`built ${version}: app.js ${js.length} B, app.css ${css.length} B, artifact ${artifact.length} B`);
