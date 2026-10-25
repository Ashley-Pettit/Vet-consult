# Handoff: Wildlife Welfare Companion (Bunurong Wildlife Care)

Last updated 25 October 2026. For the next Claude Code session.

## What it is

- **Purpose:** a phone web app for wildlife carers and vets at Bunurong Wildlife Care (Inverloch, Victoria). It also covers Queensland.
- **What users do:** a vet or carer types or talks, sometimes leaving details out. The app writes a best-practice guide that other carers can follow, filling the gaps from checked sources. The user reviews it, then shares it.
- **Owner:** Ash (Ashley Pettit). His mum is a Bunurong carer.
- **Live site:** https://ashley-pettit.github.io/Vet-consult/care/
- **Beta site:** https://ashley-pettit.github.io/Vet-consult/care-beta/ (Settings has a Live/Beta switch; beta shows a Beta chip on the logo)
- **Claude artifact (single-file build):** https://claude.ai/artifact/Uusjv2zy1ZUN5KQGs3WyW2
- **Repo:** `Ashley-Pettit/Vet-consult`.
  - `main` is the older RSPCA "Consult Scribe" app, served at the site root.
  - `care-prod` is this app's live version, served at `/care/`.
  - `bunurong-wildlife` is this app's beta, served at `/care-beta/`. **All new changes go here.**

## Branches right now

| Branch | State |
|---|---|
| `care-prod` | **Live** (`/care/`). Only moves when Ash asks to promote beta. |
| `bunurong-wildlife` | **Beta** (`/care-beta/`). Day-to-day work lands here. |

**Promote beta to live (only when Ash asks):** `git push origin bunurong-wildlife:care-prod` (fast-forward), then run the workflow. A hotfix for live only: commit on `care-prod`, then cherry-pick it onto `bunurong-wildlife`.

Both copies share the same site, so settings, sign-in and drafts carry across when switching.

## How to ship (standing workflow after every change)

1. `npm run build`
2. If any prompt text in `src/note.js` (or anything else that feeds a prompt) changed, re-bake the examples. Skipping this doesn't break anything, but example runs go live (slow and costly) instead of instant.
   - `FRESH=1 PAR=8 BAKE_LOG=/tmp/bake-log.json npm run bake` (about 15 to 20 minutes; real AI calls through the proxy)
   - `npm run build && node scripts/qa/replay.mjs`: expect every line to start with `OK`. There are 82 lines, covering Vic and Qld.
   - If replay already shows 82 `OK` lines with `calls=0`, the bake matches the prompts and doesn't need re-running.
3. Commit with the attribution lines. Push `bunurong-wildlife` (beta).
4. Deploy. Pushing the branch doesn't deploy: the workflow on `main` builds `care-prod` into `/care/` and `bunurong-wildlife` into `/care-beta/` (with `CHANNEL=beta`).
   - `gh workflow run "Test and deploy" -R Ashley-Pettit/Vet-consult --ref main`
   - Then `gh run watch <id> -R Ashley-Pettit/Vet-consult --exit-status`
5. Publish the artifact. Use the Artifact tool with `url` = the artifact link above and `file_path` = `dist-artifact/care-scribe.html`.
6. **End the update message with the beta link** (and the live link after a promotion).

### In a Claude Code cloud container

- The network policy blocks the proxy (`care-scribe-proxy.ashley-98e.workers.dev`), so baking and `scripts/qa/run.mjs` only work after Ash adds it under Allowed domains.
- The project's Playwright 1.48.2 looks for `chromium-1140`. Point it at the preinstalled browser before replay or e2e:
  `mkdir -p /opt/pw-browsers/chromium-1140/chrome-linux && ln -sf /opt/pw-browsers/chromium /opt/pw-browsers/chromium-1140/chrome-linux/chrome`

## Ash's standing preferences

- **Videos:** a wide preview (thumbnail and play button) that plays in place, in the app, with one tap. Never YouTube's own player up front (it sends people out to YouTube) and never a small link row on the website.

- **Testing:** run unit tests and the examples replay before shipping; skip the full Playwright end-to-end suite unless Ash asks for it (a quick targeted browser check is fine).

- **Pet birds in Queensland are the only non-wildlife topic,** and only for expert opinions. Their sources live in `src/sources-petbirds-qld.js` and are added to the opinion prompt only when it's about pet, aviary or backyard birds in Queensland. Never add them to the main library, care plans or other documents.
- **Expert opinions: never learn from them.** The documents a vet attaches and what they say are for that one opinion only. Never use real opinion inputs or outputs for baked examples, house-style examples (`template-examples.js`), QA scenarios, the plan library or memory. The app doesn't keep opinions in Recent, doesn't reuse their words for other documents, and clears their attachments when the vet changes tab. The proxy stores nothing.
- **Writing style:** Australian English, no em dashes, short ADHD-friendly bullets, plain and not AI-sounding. Fix first, explain briefly.
- **Updates:** give updates as you go (SendUserMessage) on long jobs.
- **Tests:** don't run the test suites unless he asks; the deploy workflow runs them anyway. When he asks for e2e, run them.
- **Accuracy beats speed.** Anything that speeds up the AI but lowers accuracy is a fail. Never change the models or model settings to get speed.
- **Generate on demand:** Word and PDF are built only when the user taps them, with a loader, never in advance.
- **No streaming UI.** He said no to it.
- **Videos:** each plan shows one "how to care for this animal" video. MOP plans show the same care video too.
  - Australian sources are preferred but not required.
  - Overseas videos carry a **bold** "From X: follow local advice from your vet or wildlife expert."
- **RSPCA material:** internal. It must not be learned from, quoted or shared. The "rspca" access code is not a security measure.
- **Secrets:** the Cloudflare token stays out of the repo. Ask Ash if you need it for `proxy/`.
- **Quiet nights:** if he says he's going to sleep, keep working quietly, with no notifications that beep his phone.

## Architecture in brief

- **Build:** `scripts/build.mjs` (esbuild).
  - `dist/` is the ESM website with code-split chunks.
  - `dist-artifact/care-scribe.html` is one inline IIFE file for Claude.
  - `__NO_PDF__` is true for the artifact, so pdfmake is left out there and Claude falls back to Word.
- **AI:** `src/ai.js` calls the Cloudflare Worker proxy `care-scribe-proxy.ashley-98e.workers.dev`; the code is in `proxy/`.
  - Models: Sonnet 5.5 by default, Haiku for polish, Opus for media.
  - Prompt caching splits at `CACHE_SPLIT`.
  - `sendTail()` adds today's date and a speed line at send time, outside the bake key. It about halved thinking time with no quality loss.
- **Prompts:** all in `src/note.js`.
  - `buildCarePrompt` and the shared carer rules (around line 230 to 270).
  - Per-tab rules in the docs map: `intake`, `log`, `tovet`, `mop`, `funding`, `media`, `witness`.
  - `buildAmendPrompt` is the "Change plan" step.
- **Baked examples:** `src/baked-examples.js`, keyed by `bakeKey(prompt)` (`src/baked.js`).
  - Made by `scripts/bake-examples.mjs`.
  - Never hand-edit it, and never regenerate `src/template-examples.js` (the templates).
- **Checked knowledge:**
  - `src/species-*.js`: species points with sources.
  - `src/feeding-data.js`, `src/feeding.js`: the feed calculator, from Wombaroo charts.
  - `src/species-ranges.js`: normal ranges. `rangesForAnimal(id, state, context)` drops young rows for adults, early-fur rows for furred joeys, and joey-only vitals for adults, and keeps only the named species' row.
  - `src/sources-*.js`: the cited sources.
- **Videos:** `src/videos.js`. `CARE_VIDEOS` (by species group) and `CARE_CONDITIONS` (condition words, then video). Pick with `careVideoFor(group, context, tags)`.
- **Screens:** `src/app.js`.
  - The care plan renders in `renderCare`.
  - `leaveIt(c)` hides ranges and the tick sheet for "leave it in the wild" plans.
  - Fridge print: `printSheet` prints on desktop and gives a PDF on phones.
  - Share sheet: PDF first, then Word.
- **Printouts:** `src/word.js` builds one model, used by `src/word-docx.js` (Word) and `src/pdf.js` (PDF).
  - Word uses zero side margins with content indented, so the brand band runs edge to edge.

## Ready-made plans (plan library)

- **What:** the book button in the header opens 30 standard care plans for 11 common Victorian natives (wombat, koala, Pacific black duck, eastern grey kangaroo, ringtail and brushtail possums, echidna, grey-headed flying-fox, magpie, tawny frogmouth, blue-tongue lizard), 2 to 4 per animal by stage and weight. They open instantly with no AI call.
- **Where:** `src/library-plans.js` (generated, loaded only when the library opens). Screens and logic: "ready-made plans" in `src/app.js`; text editing helpers `planToText` / `textToPlan` in `src/note.js`.
- **How they were made:** each plan's description is a scenario in `scripts/qa/scenarios.library.json`. `scripts/qa/sim.mjs` captures the app's own carer care plan prompt for each (so they're grounded in the same checked sources and Wombaroo charts), Claude (Opus) answers them, and `node scripts/library-build.mjs` writes the library. To add or change a plan: edit the scenario (and `META` in the build script), re-run those steps.
- **Admin:** Settings → "Plan library admin". An admin gets "Edit text" (one box per part) and their Change plan results update the library plan; "Reset to original" undoes it. **Edits are kept on that device only** (no database yet). Anyone else's Change plan makes a personal copy in Recent.
- **Limits:** Victorian guidance only (Queensland users see a note). Week numbers in the day-by-day plans are estimates tied to a stage ("around week 3 (fine fur appearing)"); worth a read by an experienced carer.

## Live QA harness (`scripts/qa/`)

- **`run.mjs`** runs realistic inputs through the built app against the real proxy, then saves on-screen text, screenshots, prompts, outputs and timings to `qa-out/<TAG>/` (gitignored).
  - `npm run build && SCEN=scenarios.example.json TAG=L1 PAR=3 node scripts/qa/run.mjs`
  - Scenario fields: `{id, role: "carer"|"vet", mode, region?: "vic"|"qld", text, change?}`.
    - Modes: `carer`, `intake`, `log`, `tovet`, `mop`, `funding`, `vet`, `polish`, `media`, `witness`.
    - `change` also tests the Change plan step.
  - `ONLY=id1,id2` runs a subset.
- **`replay.mjs`** checks that the baked examples answer without an AI call.
- **`sim.mjs`** is for when the proxy is blocked (cloud containers): it runs the scenarios through the built app and saves each prompt it sends to `qa-out/sim/prompts/`.
  - Answer each prompt with Claude on the model the app asked for (one subagent per prompt, reply saved to `qa-out/sim/replies/<key>.txt`), then run it again. Repeat until nothing is pending (a plan made from a note, or a Change, sends follow-up prompts).
  - `npm run build && SCEN=scenarios.vet.json node scripts/qa/sim.mjs`; results land in `qa-out/sim/out/`.
  - The replies come from Claude but not through the app's own settings, so treat them as close to live, not identical.
- **What to review in each output:**
  - accuracy against best practice;
  - nothing repeated across sections;
  - nothing invented;
  - the right video and ranges for the age;
  - easy to read on a phone.

## Open items

- **Small things seen in loop 10, not fixed:**
  - In the witness statement, the plain-words gloss of "pressure sores" still mentions a hard surface (a generic definition, so it was left).
- **Vet QA, 25 October (fixed in code, no re-bake needed):**
  - Brands the vet never said come out of notes and polish (`dropUnsaidBrands` in `src/drugs.js`). Prompts still carry the name as Claude wrote it (`asWritten` in `src/note.js`), so baked replies keep matching.
  - Adult wildlife vitals are flagged against `species-ranges.js` (`wildlifeRanges` in `src/clinical.js`).
  - "1 mL per 10 kg" doses get a total; the sum shows the rate only; wordy dose parts are split with semicolons in copied text.
  - "Early fur just coming through" keeps the lightly furred pouch rows.
  - The feed calculator says when the chart's milk stage differs from the vet's.
  - Findings that only repeat a vital are dropped; vets on phones don't get the photo banner.
- **Vet QA, 25 October (prompt changes, queued in `BACKLOG.md`):** they change bake keys, so do them where the proxy is reachable and re-bake.
- **AI cost and speed, 25 October:**
  - Follow-on drafts (the care plan after an intake, a vet's clinical notes for the discharge pack) are made only when asked for, with a loader, like Word and PDF (`exampleExtra` in `src/app.js`). Built-in examples still start theirs straight away (free).
  - Change plan / Change returns only the parts that changed; `mergeAmend` in `src/note.js` merges them (sections by heading). About 60% fewer output tokens per change in testing.
  - Sources in care plan and document prompts are trimmed to the general ones plus those for the animal named (`sourcesFor` in `src/app.js`): about 6,000 down to about 3,300 tokens. An animal it can't recognise still gets them all. **The built-in examples keep the full list so their baked replies match: remove that exception at the next re-bake.**
  - The website preconnects to the proxy while it loads.
  - Next re-bake, also move the fixed Australian drug list (about 4,500 tokens) before the cache split in `buildPrompt` and `buildCarerPlanPrompt`, keeping the vet's own drugs after it. It's the biggest fixed block still outside the cache.
  - **To check:** commit e59d1e3 said the proxy that accepts cached prompt blocks was "not yet deployed". If the live worker is older, the first call in every session is refused, retried without caching, and nothing is cached. Deploy `proxy/` with `npx wrangler deploy` (needs Ash's Cloudflare login) to be sure.
  - Looked at and left alone, for accuracy: the feeding rows and source key points (most of a care plan's prompt) are per animal and needed; trimming them by stage risks losing the row that applies.
- **Known and accepted:**
  - Koala MOP shows a koala feeding video (his choice).
  - Roof-possum MOP has no legal removal advice (no checked source).
  - Funding drafts repeat figures (normal for grants).
- **Backlog:** see `BACKLOG.md` (weight tracker, vet dose calculator, database and sign-in, reminders branch, Qld after-hours numbers, more Australian videos, bird feed charts).
