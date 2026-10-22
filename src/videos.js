// One checked video per species group, from reputable wildlife organisations (verified October 2026 with
// YouTube's own data: title, channel and that it can be embedded). Shown in care plans, loaded only when tapped.
export const VIDEOS = {
  macropod: { id: '4JuVVWEAVcQ', title: 'How to check if a dead marsupial has a baby in the pouch', channel: 'Wildlife Victoria', date: '2019' },
  ringtail: { id: 'x0Nk2b3IHK4', title: 'Ruby and Pumpernickel ringtail possums (hand-raising orphans)', channel: 'Currumbin Wildlife Hospital', date: '2017' },
  brushtail: { id: 'jwyh9L0ILZw', title: 'Removing a possum joey from a pouch', channel: 'Wildlife Victoria', date: '2019', warning: 'Contains confronting footage.' },
  glider: { id: 'PH3n78OFg14', title: 'Mabel the sugar glider: rescue, care and release', channel: 'RSPCA Queensland', date: '2022' },
  wombat: { id: '3j2RDNKT_Oo', title: 'Treating sarcoptic mange', channel: 'WIRES', date: '2026' },
  koala: { id: 'K-fjzFdSw7U', title: 'Getting help for sick koalas', channel: 'Queensland Government (Environment)', date: '2024' },
  echidna: { id: 'tD9h_26QWGA', title: 'Hand-raising a rescued baby echidna', channel: 'Taronga Wildlife Hospital', date: '2020' },
  flyingfox: { id: 'ilC1lI7Q4Jk', title: 'Rescue unit saves a bat', channel: 'Australia Zoo Wildlife Hospital', date: '2021' },
  bird: { id: 'K9FETK07HvQ', title: 'How to help a baby bird', channel: 'Wildlife Victoria', date: '2019', young: true },
  raptor: { id: 'DQThwNr91SU', title: 'Birds of prey: vet talk', channel: 'Currumbin Wildlife Hospital', date: '2020' },
  waterbird: { id: 'Hh_P-EeiYM8', title: 'How to help ducklings', channel: 'Wildlife Victoria', date: '2019', young: true },
  dragon: { id: 'POE6PMLML8A', title: 'Dragon returns to its den: treatment and release', channel: 'RSPCA Queensland', date: '2022' },
  python: { id: 'i67vEgT8f7Y', title: 'Carpet python at Taronga Wildlife Hospital', channel: 'Taronga Wildlife Hospital', date: '2021' },
  turtle: { id: 'eT1Ne4vCzXQ', title: 'Broad-shelled turtle shell repair and release', channel: 'RSPCA Queensland', date: '2023' },
  general: { id: 'PVqgAgfDFyk', title: 'How to contain an injured bird or small animal', channel: 'Wildlife Victoria', date: '2019' },
};

// Videos about young animals (baby birds, ducklings) only show when the plan is about a young animal.
const YOUNG = /\b(chick|chicks|nestling|fledgling|hatchling|branchling|baby|babies|duckling|ducklings|cygnet|juvenile|orphan|orphaned|joey|pinky|pinkie)\b/i;
// The general containment video is about birds and small animals, so it never stands in for a large or risky animal.
const SMALL = new Set(['bird', 'ringtail', 'brushtail', 'glider', 'bandicoot', 'dasyurid', 'general']);
export const videoFor = (group, context = '') => {
  const v = VIDEOS[group] || null;
  if (v && v.young && !YOUNG.test(context)) return SMALL.has(group) ? VIDEOS.general : null;
  if (!v && SMALL.has(group)) return VIDEOS.general;
  return v;
};

// Detected species tags (see species-vet.js) to the video groups above.
const TAG_TO_VIDEO = {
  passerine: 'bird', magpie: 'bird', parrot: 'bird', lorikeet: 'bird', pigeon: 'bird', 'frogmouth-owl': 'bird', kookaburra: 'bird', shorebird: 'bird', bird: 'bird',
  seabird: 'waterbird', penguin: 'waterbird', waterbird: 'waterbird',
  'freshwater-turtle': 'turtle', 'sea-turtle': 'turtle',
};
/** The video for the first animal named in a document's text, or none. */
export function videoForTags(tags = [], context = '') {
  for (const t of tags) {
    const g = TAG_TO_VIDEO[t] || t;
    const v = videoFor(g, context);
    if (v) return v;
  }
  return null;
}

export const watchUrl = (v) => `https://www.youtube.com/watch?v=${v.id}`;
export const embedUrl = (v) => `https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1&autoplay=1`;
export const thumbUrl = (v) => `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
