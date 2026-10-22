// Species-specific vet points for Australian wildlife (drugs, anaesthesia, handling, disease, release).
// Each point is from a checked source (see species-vet-data.js). Only the groups the dictation mentions are sent,
// so the prompt stays small; if no animal is recognised, nothing is sent.
import { VET_POINTS } from './species-vet-data.js';

// Words in a dictation that point to a group. Order matters only for readability.
export const GROUP_WORDS = {
  macropod: ['kangaroo', 'roo', 'wallaby', 'wallaroo', 'pademelon', 'potoroo', 'bettong', 'macropod', 'joey', 'egk', 'rnw', 'swamp wallaby'],
  koala: ['koala'],
  wombat: ['wombat'],
  ringtail: ['ringtail', 'crp'],
  brushtail: ['brushtail', 'cbp', 'bushtail'],
  glider: ['glider'],
  flyingfox: ['flying fox', 'flying-fox', 'fruit bat', 'ghff', 'bff', 'megabat'],
  microbat: ['microbat', 'micro bat', 'bent-wing', 'bentwing', 'long-eared bat', 'wattled bat', 'free-tailed bat', 'microchiropteran'],
  echidna: ['echidna'],
  platypus: ['platypus'],
  bandicoot: ['bandicoot', 'bilby'],
  dasyurid: ['antechinus', 'quoll', 'dunnart', 'phascogale', 'dasyurid', 'devil'],
  passerine: ['wren', 'robin', 'thornbill', 'pardalote', 'honeyeater', 'wattlebird', 'silvereye', 'fantail', 'willie wagtail', 'swallow', 'finch', 'myna', 'sparrow', 'starling', 'passerine', 'miner', 'noisy miner', 'friarbird'],
  magpie: ['magpie', 'currawong', 'butcherbird', 'raven', 'crow', 'mudlark', 'magpie-lark', 'peewee'],
  parrot: ['parrot', 'cockatoo', 'corella', 'galah', 'rosella', 'cockatiel', 'budgie', 'budgerigar', 'king parrot', 'scc', 'black cockatoo'],
  lorikeet: ['lorikeet', 'lorrikeet'],
  pigeon: ['pigeon', 'dove', 'bronzewing', 'squab', 'fruit-dove', 'fruit dove', 'rock dove'],
  'frogmouth-owl': ['frogmouth', 'owl', 'boobook', 'nightjar', 'tf'],
  raptor: ['hawk', 'eagle', 'falcon', 'kite', 'kestrel', 'goshawk', 'harrier', 'osprey', 'raptor', 'hobby'],
  kookaburra: ['kookaburra', 'kingfisher'],
  waterbird: ['duck', 'duckling', 'swan', 'cygnet', 'coot', 'moorhen', 'swamphen', 'heron', 'egret', 'ibis', 'cormorant', 'darter', 'grebe', 'pelican', 'spoonbill', 'waterbird'],
  seabird: ['shearwater', 'mutton bird', 'muttonbird', 'gull', 'gannet', 'albatross', 'petrel', 'prion', 'tern', 'seabird'],
  penguin: ['penguin'],
  shorebird: ['plover', 'lapwing', 'oystercatcher', 'sandpiper', 'stint', 'godwit', 'curlew', 'shorebird', 'dotterel'],
  skink: ['blue tongue', 'bluetongue', 'blue-tongue', 'blotchy', 'shingleback', 'skink', 'sleepy lizard'],
  dragon: ['dragon', 'bearded', 'water dragon', 'frill'],
  python: ['python', 'carpet snake'],
  'venomous-snake': ['tiger snake', 'brown snake', 'copperhead', 'red-bellied', 'red bellied', 'taipan', 'death adder', 'venomous', 'snake'],
  'freshwater-turtle': ['long-necked turtle', 'long necked turtle', 'short-necked', 'freshwater turtle', 'tortoise', 'saw-shelled', 'murray river turtle'],
  'sea-turtle': ['sea turtle', 'green turtle', 'loggerhead', 'hawksbill', 'flatback', 'leatherback', 'olive ridley'],
  goanna: ['goanna', 'lace monitor', 'monitor lizard', 'varanus'],
  frog: ['frog', 'toad', 'tadpole'],
};

// Groups that also take the class-wide points.
const CLASS_OF = {
  passerine: 'bird', magpie: 'bird', parrot: 'bird', lorikeet: 'bird', pigeon: 'bird', 'frogmouth-owl': 'bird', raptor: 'bird',
  kookaburra: 'bird', waterbird: 'bird', seabird: 'bird', penguin: 'bird', shorebird: 'bird',
  skink: 'reptile', dragon: 'reptile', python: 'reptile', 'venomous-snake': 'reptile', 'freshwater-turtle': 'reptile', 'sea-turtle': 'reptile', goanna: 'reptile',
};

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Groups the text mentions, most specific first. "bird" or "reptile" alone if only the class is named. */
export function groupsIn(text = '') {
  const t = ` ${String(text).toLowerCase()} `;
  const found = Object.entries(GROUP_WORDS)
    .filter(([, words]) => words.some((w) => new RegExp(`[^a-z]${escapeRe(w)}(s|es)?[^a-z]`).test(t)))
    .map(([g]) => g);
  // "snake" alone matches venomous-snake; drop it when a python is named.
  let groups = found.includes('python') ? found.filter((g) => g !== 'venomous-snake') : found;
  // A general word with no specific species: take every group it could be.
  if (/[^a-z]possums?[^a-z]/.test(t) && !groups.some((g) => ['ringtail', 'brushtail', 'glider'].includes(g))) groups = [...groups, 'ringtail', 'brushtail'];
  if (/[^a-z]bats?[^a-z]/.test(t) && !groups.some((g) => ['flyingfox', 'microbat'].includes(g))) groups = [...groups, 'flyingfox', 'microbat'];
  const classes = new Set(groups.map((g) => CLASS_OF[g]).filter(Boolean));
  if (/[^a-z](bird|chick|nestling|fledgling)s?[^a-z]/.test(t)) classes.add('bird');
  if (/[^a-z](reptile|lizard)s?[^a-z]/.test(t)) classes.add('reptile');
  return [...groups, ...classes];
}

const line = (p) => `${p.species} | ${p.topic}${p.scope && p.scope !== 'au' ? ` | ${p.scope.toUpperCase()}` : ''} | ${p.point}${p.why ? ` (${p.why})` : ''} [${p.source_title}]`;

/** Points for the prompt: every point for the groups mentioned; otherwise the drug and anaesthesia cautions for all. */
export function vetCareForPrompt(text = '', { audience } = {}) {
  if (!VET_POINTS.length) return '';
  const groups = groupsIn(text);
  // No animal recognised: send nothing, so an unrelated request costs nothing extra.
  if (!groups.length) return '';
  const pick = VET_POINTS.filter((p) => (!audience || p.audience === audience)).filter((p) => groups.includes(p.species));
  if (!pick.length) return '';
  const head = `Species-specific points for Australian wildlife (${groups.join(', ')}), from checked wildlife veterinary guidelines.`;
  return `${head}
- Use them where they change the plan: drug choice, anaesthesia, handling, housing, diet, monitoring, release.
- Never contradict what the vet said. If the vet's plan conflicts with a point (for example a drug the source says to avoid in this species), keep the vet's plan and add the conflict to "check", naming the source.
- Never add a drug or a dose the vet did not say. Doses in these points are for checking only.
- Do not list them separately or repeat them for the sake of it. Points marked VIC or QLD apply in that state.
${pick.map(line).join('\n')}`;
}
