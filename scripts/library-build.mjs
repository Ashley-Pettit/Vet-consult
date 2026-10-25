// Builds src/library-plans.js, the ready-made care plans, from Claude's replies to the app's own care plan prompts.
// 1. npm run build && SCEN=scenarios.library.json node scripts/qa/sim.mjs   (saves each plan's prompt to qa-out/sim/prompts)
// 2. Answer each prompt with Claude (Opus, like the house-style examples) into qa-out/sim/replies/<key>.txt
// 3. node scripts/library-build.mjs   (PARTIAL=1 skips plans with no reply yet)
import fs from 'fs';
import { fileURLToPath } from 'url';
const APP = fileURLToPath(new URL('../', import.meta.url));
const SIM = APP + 'qa-out/sim/';

// Each plan: [animal id, animal name, stage, the weight it was written for]. Order here is the order shown.
const META = {
  'lib-wombat-unfurred': ['wombat', 'Common wombat', 'Unfurred joey', 'about 600 g'],
  'lib-wombat-furred': ['wombat', 'Common wombat', 'Furred joey', 'about 2.5 kg'],
  'lib-wombat-weaning': ['wombat', 'Common wombat', 'Weaning young', 'about 8 kg'],
  'lib-wombat-adult': ['wombat', 'Common wombat', 'Adult', 'about 25 kg'],
  'lib-koala-pouch': ['koala', 'Koala', 'Furred pouch joey', 'about 400 g'],
  'lib-koala-back': ['koala', 'Koala', 'Back joey', 'about 1.5 kg'],
  'lib-koala-adult': ['koala', 'Koala', 'Adult', 'about 7 kg'],
  'lib-duck-duckling': ['duck', 'Pacific black duck', 'Downy duckling', 'about 40 g'],
  'lib-duck-older': ['duck', 'Pacific black duck', 'Feathering duckling', 'about 300 g'],
  'lib-duck-adult': ['duck', 'Pacific black duck', 'Adult', 'about 1 kg'],
  'lib-roo-unfurred': ['roo', 'Eastern grey kangaroo', 'Unfurred joey', 'about 800 g'],
  'lib-roo-furred': ['roo', 'Eastern grey kangaroo', 'Furred pouch joey', 'about 3 kg'],
  'lib-roo-atfoot': ['roo', 'Eastern grey kangaroo', 'Young at foot', 'about 10 kg'],
  'lib-ringtail-pinkie': ['ringtail', 'Common ringtail possum', 'Unfurred joey', 'about 30 g'],
  'lib-ringtail-furred': ['ringtail', 'Common ringtail possum', 'Furred joey', 'about 120 g'],
  'lib-ringtail-juvenile': ['ringtail', 'Common ringtail possum', 'Young, nearly weaned', 'about 400 g'],
  'lib-brushtail-furred': ['brushtail', 'Common brushtail possum', 'Furred joey', 'about 300 g'],
  'lib-brushtail-juvenile': ['brushtail', 'Common brushtail possum', 'Weaning young', 'about 1 kg'],
  'lib-brushtail-adult': ['brushtail', 'Common brushtail possum', 'Adult', 'about 2.5 kg'],
  'lib-echidna-puggle': ['echidna', 'Short-beaked echidna', 'Puggle', 'about 400 g'],
  'lib-echidna-adult': ['echidna', 'Short-beaked echidna', 'Adult', 'about 4 kg'],
  'lib-flyingfox-pup': ['flyingfox', 'Grey-headed flying-fox', 'Pup (vaccinated carers only)', 'about 100 g'],
  'lib-flyingfox-adult': ['flyingfox', 'Grey-headed flying-fox', 'Adult (vaccinated carers only)', 'about 700 g'],
  'lib-magpie-nestling': ['magpie', 'Australian magpie', 'Nestling', 'about 100 g'],
  'lib-magpie-fledgling': ['magpie', 'Australian magpie', 'Fledgling (reunite with its parents first)', 'about 250 g'],
  'lib-magpie-adult': ['magpie', 'Australian magpie', 'Adult', 'about 300 g'],
  'lib-frogmouth-chick': ['frogmouth', 'Tawny frogmouth', 'Downy chick', 'about 150 g'],
  'lib-frogmouth-adult': ['frogmouth', 'Tawny frogmouth', 'Adult', 'about 400 g'],
  'lib-bluetongue-juvenile': ['bluetongue', 'Eastern blue-tongue lizard', 'Juvenile', 'about 30 g'],
  'lib-bluetongue-adult': ['bluetongue', 'Eastern blue-tongue lizard', 'Adult', 'about 400 g'],
};

const scen = JSON.parse(fs.readFileSync(APP + 'scripts/qa/scenarios.library.json', 'utf8'));
const keyFor = {};
for (const f of fs.readdirSync(SIM + 'prompts').filter((x) => x.endsWith('.json'))) {
  const d = JSON.parse(fs.readFileSync(SIM + 'prompts/' + f, 'utf8'));
  if (d.scenario && d.scenario.startsWith('lib-')) keyFor[d.scenario] = f.slice(0, -5);
}
const json = (t) => JSON.parse(t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1));
const animals = [];
const missing = [];
for (const [id, [aid, name, stage, weight]] of Object.entries(META)) {
  const s = scen.find((x) => x.id === id);
  const key = keyFor[id];
  const file = key && SIM + 'replies/' + key + '.txt';
  if (!s || !file || !fs.existsSync(file)) {
    missing.push(id);
    continue;
  }
  let a = animals.find((x) => x.id === aid);
  if (!a) animals.push((a = { id: aid, name, plans: [] }));
  a.plans.push({ id, stage, weight, text: s.text, sheet: json(fs.readFileSync(file, 'utf8')) });
}
if (missing.length && !process.env.PARTIAL) {
  console.error('No reply yet for:', missing.join(', '));
  process.exit(1);
}
const out = `// Ready-made care plans, made by scripts/library-build.mjs from Claude's replies to the app's own care plan prompts
// (Victorian guidance; see scripts/qa/scenarios.library.json). Don't edit by hand: change the scenario and rebuild.
export default ${JSON.stringify({ animals }, null, 1)};
`;
fs.writeFileSync(APP + 'src/library-plans.js', out);
console.log(`${animals.reduce((n, a) => n + a.plans.length, 0)} plans for ${animals.length} animals${missing.length ? `; missing ${missing.join(', ')}` : ''}`);
