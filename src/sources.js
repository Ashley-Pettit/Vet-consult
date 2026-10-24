// Reference library for carer plans: the chosen state's checked sources first, national where the state has none.
// The app's AI can't browse, so plans are grounded in these checked sources and cite them by id.
import { VIC_SOURCES } from './sources-vic.js';
import { QLD_SOURCES } from './sources-qld.js';
import { AU_SOURCES } from './sources-au.js';
import { region, sourceRank } from './region.js';
import { groupsIn } from './species-vet.js';

/** Sources for the state currently chosen. */
export const currentSources = () => region().sources;
// Kept for older callers and tests: the Victorian library.
export const SOURCES = VIC_SOURCES;

// Look-ups work across both states, so a plan made under one still shows its sources after switching.
const byId = new Map([...VIC_SOURCES, ...QLD_SOURCES, ...AU_SOURCES].map((s) => [s.id, s]));
export const lookupSource = (id) => byId.get(id) || null;
/** Ids a plan may cite: only the chosen state's library. */
export const SOURCE_IDS = () => new Set(currentSources().map((s) => s.id));

// What each species-specific source is about, read from its title. A source with no tag is general (codes of
// practice, permits, first aid, heat, training) and always goes in.
const SOURCE_TAGS = [
  ['wombat', /wombat|mange/i],
  ['koala', /koala/i],
  ['echidna', /echidna/i],
  ['bat', /\bbats?\b|lyssavirus|flying-fox/i],
  ['bird', /\bbirds?\b|chicks?\b|avian|\bH5|waterbird/i],
  ['possum', /possum|glider/i],
  ['macropod', /kangaroo|wallab|macropod/i],
  ['reptile', /reptile|amphibian/i],
  ['domestic', /kitten|\bpets?\b|post-surgery/i],
  ['joey', /milk replacer|pouch check/i],
];
const tagsOf = (s) => SOURCE_TAGS.filter(([, re]) => re.test(s.title)).map(([t]) => t);
const ANIMAL_TAG = {
  wombat: 'wombat', koala: 'koala', echidna: 'echidna', flyingfox: 'bat', microbat: 'bat', ringtail: 'possum', brushtail: 'possum',
  glider: 'possum', 'pygmy-possum': 'possum', macropod: 'macropod', 'tree-kangaroo': 'macropod', bird: 'bird', reptile: 'reptile',
};
const MILK_FED = new Set(['wombat', 'koala', 'possum', 'macropod', 'bat', 'echidna']);
/** The tags for the animals a text names; empty when it names none (then every source goes in). */
export function animalTags(text = '') {
  const t = String(text).toLowerCase();
  const tags = new Set(groupsIn(t).map((g) => ANIMAL_TAG[g]).filter(Boolean));
  if (/\b(dogs?|pupp(y|ies)|cats?|kittens?|rabbits?|guinea pigs?)\b/.test(t)) tags.add('domestic');
  if ([...tags].some((x) => MILK_FED.has(x))) tags.add('joey');
  return tags;
}

/** Compact text block for the prompt, most important first (RSPCA Queensland leads in Queensland).
 *  Given the words, only the general sources and those for the animals named go in: a shorter, quicker prompt. */
export function sourcesForPrompt(text = '') {
  const want = text ? animalTags(text) : new Set();
  const keep = (s) => !want.size || !tagsOf(s).length || tagsOf(s).some((t) => want.has(t));
  return [...currentSources()]
    .filter(keep)
    .sort((a, b) => sourceRank(a) - sourceRank(b))
    .map((s) => `${s.id} | ${s.scope} | ${s.title} (${s.publisher}) | ${s.points.join(' / ')}`)
    .join('\n');
}
