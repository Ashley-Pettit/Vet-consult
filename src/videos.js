// One checked video per species group, from reputable wildlife organisations (verified October 2026 with
// YouTube's own data: title, channel and that it can be embedded). Shown in care plans, loaded only when tapped.
// Care videos per animal, picked and checked October 2026 (YouTube oEmbed confirms each title and channel).
// young: only shown when the plan is about a young animal. Animals with no good care video have none.
export const VIDEOS = {
  'koala': {"id": "TmjpW9FywGg", "title": "Feeding Koalas at RSPCA", "channel": "RSPCA QLD", "date": "2025"},
  'macropod': {"id": "inYW6jisj_4", "title": "Raising a kangaroo joey", "channel": "Australia Zoo", "date": "2022", "young": true},
  'wombat': {"id": "_k6mRUXrmCg", "title": "WIRES Community Mange Treatment Program for wombats", "channel": "WIRES", "date": "2022"},
  'ringtail': {"id": "3AAfzvOvAmM", "title": "How to build a ringtail possum drey", "channel": "WIRES", "date": "2021"},
  'glider': {"id": "VjnpKXEWfMA", "title": "Yellow-bellied Glider Treated at Taronga Wildlife Hospital", "channel": "Taronga Zoo Sydney", "date": "2021", "warning": "Shows wounds being treated."},
  'flyingfox': {"id": "FkllnQyrDeI", "title": "Flying-fox recovery after a netting injury", "channel": "Bat Conservation & Rescue Qld Inc", "date": "2016", "warning": "Netting injuries visible. Only rabies/ABLV-vaccinated, trained carers should ever handle bats."},
  'microbat': {"id": "oU5vjpfMfpY", "title": "Gould's wattled bat feeding", "channel": "Wildlife Victoria", "date": "2011", "warning": "Bats must only be handled by vaccinated, trained carers."},
  'echidna': {"id": "tHv9lKwu0G4", "title": "Injured Echidna Examination at the Taronga Wildlife Hospital", "channel": "Taronga Zoo Sydney", "date": "2020"},
  'platypus': {"id": "SZsbZmyXvU4", "title": "Platypus Rescue Update: Health Checks and Sample Collections", "channel": "Taronga Zoo Sydney", "date": "2020"},
  'bandicoot': {"id": "o2w_7SOf99c", "title": "Quenda receives life saving treatment.", "channel": "WA Wildlife", "date": "2022", "warning": "Badly injured animal and veterinary treatment shown."},
  'babybird': {"id": "K9FETK07HvQ", "title": "How to help a baby bird", "channel": "Wildlife Victoria", "date": "2019", "young": true},
  'bird': {"id": "PVqgAgfDFyk", "title": "How to contain an injured bird or small animal", "channel": "Wildlife Victoria", "date": "2019"},
  'lorikeet': {"id": "bg0F486rjWU", "title": "Lorikeet paralysis syndrome", "channel": "RSPCA QLD", "date": "2023"},
  'magpie': {"id": "ZR3FIE1J2FU", "title": "Magpies - should you feed them?", "channel": "WA Wildlife", "date": "2021"},
  'pigeon': {"id": "hbyTI8JVSlU", "title": "Rescuing an injured pigeon: avian vet exam and treatment", "channel": "Bird Vet Melbourne", "date": "2023"},
  'parrot': {"id": "Xu7rohWsSAA", "title": "Saving wild cockatoos: meet Vet Nurse Supervisor Peta!", "channel": "Perth Zoo", "date": "2024"},
  'frogmouth-owl': {"id": "k87V8EHCOMM", "title": "Tawny frogmouths in care", "channel": "WIRES", "date": "2018"},
  'raptor': {"id": "DQThwNr91SU", "title": "Birds of prey: Currumbin Wildlife Hospital vet talk", "channel": "Currumbin Wildlife Hospital", "date": "2021"},
  'waterbird': {"id": "Hh_P-EeiYM8", "title": "How to help ducklings", "channel": "Wildlife Victoria", "date": "2019", "young": true},
  'seabird': {"id": "XrVFmjszL9s", "title": "Little Penguin Rehabilitation in the Wildlife Clinic", "channel": "Phillip Island Nature Parks", "date": "2021"},
  'skink': {"id": "M3UwR_x18ZQ", "title": "Baby blue-tongue lizards at Australia Zoo Wildlife Hospital", "channel": "Australia Zoo", "date": "2026", "young": true},
  'python': {"id": "i67vEgT8f7Y", "title": "Carpet Python visits Taronga's Wildlife Hospital in Dubbo", "channel": "Taronga Zoo Sydney", "date": "2021", "warning": "Shows a penetrating wound and its treatment."},
  'venomous-snake': {"id": "ipO6DrnsmpE", "title": "What to do if you come across a snake in the wild?", "channel": "Zoos Victoria", "date": "2023"},
  'freshwater-turtle': {"id": "eT1Ne4vCzXQ", "title": "Broadshell Turtle Mama's Shell Repair and Release", "channel": "RSPCA QLD", "date": "2023", "warning": "Shell injury and repair shown."},
  'sea-turtle': {"id": "8bSR0xS06Ik", "title": "Rehabilitating a stranded loggerhead turtle", "channel": "Australia Zoo", "date": "2023"},
  'frog': {"id": "KEqO-oVCvY8", "title": "Australia's only frog hospital", "channel": "ABC Australia", "date": "2023"},
  'general': {"id": "PVqgAgfDFyk", "title": "How to contain an injured bird or small animal", "channel": "Wildlife Victoria", "date": "2019"},
};

const YOUNG = /\b(chick|chicks|nestling|nestlings|fledgling|fledglings|hatchling|branchling|baby|babies|duckling|ducklings|cygnet|juvenile|orphan|orphaned|joey|joeys|pinky|pinkie|puggle|pup)\b/i;
// Species groups used elsewhere in the app (species-ranges.js and species-vet.js) to video keys.
const ALIAS = { bluetongue: 'skink', turtle: 'freshwater-turtle', penguin: 'seabird', shorebird: 'bird', passerine: 'bird', kookaburra: 'bird', goanna: null, dragon: null, 'black-cockatoo': 'parrot', lapwing: 'bird', curlew: 'bird', cuckoo: 'bird', pelican: null, ibis: null, 'brush-turkey': null, cassowary: null };
// The containment video is about birds and small animals, so it only stands in for those.
const SMALL = new Set(['bird', 'ringtail', 'brushtail', 'glider', 'bandicoot', 'dasyurid', 'general', 'passerine', 'magpie', 'pigeon', 'lorikeet', 'parrot', 'frogmouth-owl', 'kookaburra', 'shorebird', 'black-cockatoo', 'lapwing', 'curlew', 'cuckoo']);

const BIRDS = new Set(['bird', 'passerine', 'magpie', 'pigeon', 'lorikeet', 'parrot', 'frogmouth-owl', 'kookaburra', 'shorebird', 'black-cockatoo', 'lapwing', 'curlew', 'cuckoo']);

function pick(key, context) {
  const k = key in ALIAS ? ALIAS[key] : key;
  if (!k) return null;
  if (BIRDS.has(key) && YOUNG.test(context)) return VIDEOS.babybird;
  if (k === 'bird') return null; // the containment video is only a fallback, below
  const v = VIDEOS[k];
  if (!v || (v.young && !YOUNG.test(context))) return null;
  return v;
}

/** The care video for a species group, refined by the plan's own words (a lorikeet gets the lorikeet video). */
export const videoFor = (group, context = '', tags = []) => {
  for (const key of [...tags, group].filter(Boolean)) {
    const v = pick(key, context);
    if (v) return v;
  }
  // Fall back to the containment video only when every animal named is a bird or small animal.
  const named = [...tags, group].filter((g) => g && g !== 'reptile');
  return named.length && named.every((g) => SMALL.has(g)) ? VIDEOS.general : null;
};

/** The video for the animals detected in a document's text, or none. */
export function videoForTags(tags = [], context = '') {
  return tags.length ? videoFor('', context, tags) : null;
}

export const watchUrl = (v) => `https://www.youtube.com/watch?v=${v.id}`;
export const embedUrl = (v) => `https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1&autoplay=1`;
export const thumbUrl = (v) => `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
