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
await build({ ...common, entryPoints: [root + 'src/app.js'], outfile: out + 'app.js', format: 'esm' });
await build({ ...common, entryPoints: [root + 'src/app.css'], outfile: out + 'app.css' });
cpSync(root + 'public', out, { recursive: true });

const js = readFileSync(out + 'app.js', 'utf8');
const css = readFileSync(out + 'app.css', 'utf8');
const version = createHash('sha256').update(js + css).digest('hex').slice(0, 10);
const { CONFIG } = await import(root + 'src/config.js');
const connect = ['https://api.anthropic.com', CONFIG.proxyUrl ? new URL(CONFIG.proxyUrl).origin : ''].filter(Boolean).join(' ');
const html = readFileSync(root + 'index.html', 'utf8').replace("connect-src 'self' https:", `connect-src 'self' ${connect}`);
writeFileSync(out + 'index.html', html.replace('app.js"', `app.js?v=${version}"`).replace('app.css"', `app.css?v=${version}"`));
writeFileSync(out + 'sw.js', readFileSync(out + 'sw.js', 'utf8').replace('__VERSION__', version));
writeFileSync(out + '.nojekyll', '');
writeFileSync(out + '404.html', html.replace(/<main[\s\S]*<\/main>/, '<main><p>Page not found. <a href="./">Open Consult Scribe</a></p></main>').replace(/<script[\s\S]*?<\/script>/g, ''));

// Single-file artifact build: inline everything, no CSP meta, no manifest/service worker.
const iife = await build({ ...common, entryPoints: [root + 'src/app.js'], format: 'iife', write: false });
const body = html.match(/<body>([\s\S]*)<\/body>/)[1].replace(/<script[\s\S]*?<\/script>/, '');
const artifact =
  `<title>Consult Scribe</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n<style>${css}</style>\n` +
  body +
  `<script>${iife.outputFiles[0].text.replace(/<\/script/gi, '<\\/script')}</script>\n`;
writeFileSync(art + 'consult-scribe.html', artifact);
console.log(`built ${version}: app.js ${js.length} B, app.css ${css.length} B, artifact ${artifact.length} B`);
