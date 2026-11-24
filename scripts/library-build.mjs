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
  'lib-erosella-nestling': ['erosella', 'Eastern rosella', 'Nestling', 'about 40 g'],
  'lib-erosella-fledgling': ['erosella', 'Eastern rosella', 'Fledgling', 'about 95 g'],
  'lib-erosella-adult': ['erosella', 'Eastern rosella', 'Adult', 'about 105 g'],
  'lib-lorikeet-nestling': ['lorikeet', 'Rainbow lorikeet', 'Nestling', 'about 70 g'],
  'lib-lorikeet-adult': ['lorikeet', 'Rainbow lorikeet', 'Adult', 'about 130 g'],
  'lib-woodduck-duckling': ['woodduck', 'Australian wood duck', 'Downy duckling', 'about 40 g'],
  'lib-woodduck-older': ['woodduck', 'Australian wood duck', 'Feathering duckling', 'about 350 g'],
  'lib-woodduck-adult': ['woodduck', 'Australian wood duck', 'Adult', 'about 800 g'],
  'lib-shearwater-fledgling': ['shearwater', 'Short-tailed shearwater', 'Grounded fledgling', 'about 550 g'],
  'lib-shearwater-adult': ['shearwater', 'Short-tailed shearwater', 'Adult (beach-washed)', 'about 550 g'],
  'lib-crosella-nestling': ['crosella', 'Crimson rosella', 'Nestling', 'about 60 g'],
  'lib-crosella-adult': ['crosella', 'Crimson rosella', 'Adult', 'about 130 g'],
  'lib-heron-nestling': ['heron', 'White-faced heron', 'Nestling', 'about 300 g'],
  'lib-heron-adult': ['heron', 'White-faced heron', 'Adult', 'about 550 g'],
  'lib-swallow-nestling': ['swallow', 'Welcome swallow', 'Nestling', 'about 10 g'],
  'lib-swallow-adult': ['swallow', 'Welcome swallow', 'Adult', 'about 15 g'],
  'lib-forestbat-adult': ['microbat', 'Microbats (vaccinated carers only)', 'Little forest bat, adult', 'about 4 g'],
  'lib-largeforestbat-adult': ['microbat', 'Microbats (vaccinated carers only)', 'Large forest bat, adult', 'about 7 g'],
  'lib-microbat-unknown': ['microbat', 'Microbats (vaccinated carers only)', 'Unidentified microbat, adult', 'about 5 to 10 g'],
  'lib-lbcormorant-adult': ['cormorant', 'Cormorants', 'Little black cormorant, adult', 'about 800 g'],
  'lib-turtle-hatchling': ['turtle', 'Common long-necked turtle', 'Hatchling', 'about 8 g'],
  'lib-turtle-adult': ['turtle', 'Common long-necked turtle', 'Adult', 'about 1 kg'],
  'lib-boobook-owlet': ['boobook', 'Southern boobook', 'Owlet', 'about 180 g'],
  'lib-boobook-adult': ['boobook', 'Southern boobook', 'Adult', 'about 250 g'],
  'lib-blackwallaby-unfurred': ['blackwallaby', 'Black wallaby', 'Unfurred joey', 'about 250 g'],
  'lib-blackwallaby-furred': ['blackwallaby', 'Black wallaby', 'Furred pouch joey', 'about 1.5 kg'],
  'lib-blackwallaby-atfoot': ['blackwallaby', 'Black wallaby', 'Young at foot', 'about 6 kg'],
  'lib-galah-nestling': ['galah', 'Galah', 'Nestling', 'about 150 g'],
  'lib-galah-adult': ['galah', 'Galah', 'Adult', 'about 330 g'],
  'lib-wattlebird-nestling': ['wattlebird', 'Wattlebirds', 'Red wattlebird, nestling', 'about 60 g'],
  'lib-wattlebird-adult': ['wattlebird', 'Wattlebirds', 'Red wattlebird, adult', 'about 110 g'],
  'lib-littlewattlebird-adult': ['wattlebird', 'Wattlebirds', 'Little wattlebird, adult', 'about 70 g'],
  'lib-bfcormorant-adult': ['cormorant', 'Cormorants', 'Black-faced cormorant, adult', 'about 1.6 kg'],
  'lib-penguin-juvenile': ['penguin', "Little penguin", 'Underweight juvenile', 'about 700 g'],
  'lib-penguin-adult': ['penguin', "Little penguin", 'Adult', 'about 1.1 kg'],
  'lib-kookaburra-nestling': ['kookaburra', "Laughing kookaburra", 'Nestling', 'about 200 g'],
  'lib-kookaburra-adult': ['kookaburra', "Laughing kookaburra", 'Adult', 'about 350 g'],
  'lib-silvergull-chick': ['silvergull', "Silver gull", 'Downy chick', 'about 100 g'],
  'lib-silvergull-adult': ['silvergull', "Silver gull", 'Adult', 'about 280 g'],
  'lib-kingparrot-nestling': ['kingparrot', "Australian king-parrot", 'Nestling', 'about 120 g'],
  'lib-kingparrot-adult': ['kingparrot', "Australian king-parrot", 'Adult', 'about 220 g'],
  'lib-swan-cygnet': ['swan', "Black swan", 'Downy cygnet', 'about 300 g'],
  'lib-swan-adult': ['swan', "Black swan", 'Adult', 'about 5.5 kg'],
  'lib-corella-nestling': ['corella', "Little corella", 'Nestling', 'about 200 g'],
  'lib-corella-adult': ['corella', "Little corella", 'Adult', 'about 400 g'],
  'lib-raven-nestling': ['raven', 'Ravens', 'Australian raven, nestling', 'about 300 g'],
  'lib-raven-adult': ['raven', 'Ravens', 'Australian raven, adult', 'about 650 g'],
  'lib-littleraven-adult': ['raven', 'Ravens', 'Little raven, adult', 'about 550 g'],
  'lib-tern-chick': ['tern', "Crested tern", 'Downy chick', 'about 100 g'],
  'lib-tern-adult': ['tern', "Crested tern", 'Adult', 'about 350 g'],
  'lib-sugarglider-joey': ['sugarglider', "Sugar glider", 'Furred joey', 'about 40 g'],
  'lib-sugarglider-adult': ['sugarglider', "Sugar glider", 'Adult', 'about 120 g'],
  'lib-kingfisher-nestling': ['kingfisher', "Sacred kingfisher", 'Nestling', 'about 25 g'],
  'lib-kingfisher-adult': ['kingfisher', "Sacred kingfisher", 'Adult', 'about 45 g'],
  'lib-mtbrushtail-joey': ['mtbrushtail', "Mountain brushtail possum", 'Furred joey', 'about 500 g'],
  'lib-mtbrushtail-adult': ['mtbrushtail', "Mountain brushtail possum", 'Adult', 'about 3.5 kg'],
  'lib-rnwallaby-unfurred': ['rnwallaby', "Red-necked wallaby", 'Unfurred joey', 'about 350 g'],
  'lib-rnwallaby-furred': ['rnwallaby', "Red-necked wallaby", 'Furred pouch joey', 'about 2 kg'],
  'lib-rnwallaby-atfoot': ['rnwallaby', "Red-necked wallaby", 'Young at foot', 'about 8 kg'],
  'lib-blotched-juvenile': ['blotched', "Blotched blue-tongue lizard", 'Juvenile', 'about 30 g'],
  'lib-blotched-adult': ['blotched', "Blotched blue-tongue lizard", 'Adult', 'about 500 g'],
  'lib-sccockatoo-nestling': ['sccockatoo', "Sulphur-crested cockatoo", 'Nestling', 'about 350 g'],
  'lib-sccockatoo-adult': ['sccockatoo', "Sulphur-crested cockatoo", 'Adult', 'about 850 g'],
  'lib-ytbc-nestling': ['ytbc', "Yellow-tailed black-cockatoo", 'Nestling', 'about 400 g'],
  'lib-ytbc-adult': ['ytbc', "Yellow-tailed black-cockatoo", 'Adult', 'about 750 g'],
  'lib-ibis-nestling': ['ibis', 'Glossy ibis', 'Nestling', 'about 250 g'],
  'lib-ibis-adult': ['ibis', 'Glossy ibis', 'Adult', 'about 550 g'],
  'lib-pacgull-chick': ['pacgull', 'Pacific gull', 'Chick', 'about 300 g'],
  'lib-pacgull-adult': ['pacgull', 'Pacific gull', 'Adult', 'about 1.2 kg'],
  'lib-musklori-nestling': ['musklori', 'Musk lorikeet', 'Nestling', 'about 40 g'],
  'lib-musklori-adult': ['musklori', 'Musk lorikeet', 'Adult', 'about 60 g'],
  'lib-gannet-juvenile': ['gannet', 'Australasian gannet', 'Juvenile, beach-washed', 'about 2 kg'],
  'lib-gannet-adult': ['gannet', 'Australasian gannet', 'Adult', 'about 2.5 kg'],
  'lib-shelduck-duckling': ['shelduck', 'Australian shelduck', 'Downy duckling', 'about 60 g'],
  'lib-shelduck-adult': ['shelduck', 'Australian shelduck', 'Adult', 'about 1.3 kg'],
  'lib-currawong-nestling': ['currawong', 'Pied currawong', 'Nestling', 'about 150 g'],
  'lib-currawong-adult': ['currawong', 'Pied currawong', 'Adult', 'about 300 g'],
  'lib-pardalote-nestling': ['pardalote', 'Spotted pardalote', 'Nestling', 'about 6 g'],
  'lib-pardalote-adult': ['pardalote', 'Spotted pardalote', 'Adult', 'about 9 g'],
  'lib-sparrowhawk-nestling': ['sparrowhawk', 'Collared sparrowhawk', 'Nestling', 'about 120 g'],
  'lib-sparrowhawk-adult': ['sparrowhawk', 'Collared sparrowhawk', 'Adult', 'about 150 g'],
  'lib-crestedpigeon-squab': ['crestedpigeon', 'Crested pigeon', 'Squab', 'about 100 g'],
  'lib-crestedpigeon-adult': ['crestedpigeon', 'Crested pigeon', 'Adult', 'about 200 g'],
  'lib-barnowl-owlet': ['barnowl', 'Eastern barn owl', 'Owlet', 'about 250 g'],
  'lib-barnowl-adult': ['barnowl', 'Eastern barn owl', 'Adult', 'about 330 g'],
};

const scen = JSON.parse(fs.readFileSync(APP + 'scripts/qa/scenarios.library.json', 'utf8'));
const keyFor = {};
for (const f of fs.readdirSync(SIM + 'prompts').filter((x) => x.endsWith('.json'))) {
  const d = JSON.parse(fs.readFileSync(SIM + 'prompts/' + f, 'utf8'));
  if (d.scenario && d.scenario.startsWith('lib-')) keyFor[d.scenario] = f.slice(0, -5);
}
const json = (t) => JSON.parse(t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1));
// Plans already built keep their sheet when their reply isn't on this machine (replies live in qa-out/, not in git).
const built = {};
try {
  const prev = (await import(APP + 'src/library-plans.js?' + Date.now())).default;
  for (const a of prev.animals) for (const pl of a.plans) built[pl.id] = pl.sheet;
} catch {}
const animals = [];
const missing = [];
for (const [id, [aid, name, stage, weight]] of Object.entries(META)) {
  const s = scen.find((x) => x.id === id);
  const key = keyFor[id];
  const file = key && SIM + 'replies/' + key + '.txt';
  if (!s || !file || !fs.existsSync(file)) {
    if (s && built[id]) {
      let a = animals.find((x) => x.id === aid);
      if (!a) animals.push((a = { id: aid, name, plans: [] }));
      a.plans.push({ id, stage, weight, text: s.text, sheet: built[id] });
      continue;
    }
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
