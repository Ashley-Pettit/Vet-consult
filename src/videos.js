// One checked video per species group, from reputable wildlife organisations (verified October 2026 with
// YouTube's own data: title, channel and that it can be embedded). Shown in care plans, loaded only when tapped.
// Care videos per animal, picked and checked October 2026 (YouTube oEmbed confirms each title and channel).
// young: only shown when the plan is about a young animal. Animals with no good care video have none.
export const VIDEOS = {
  'freshwater-turtle': {"id": "8e07wMZh-xY", "title": "How to safely pick up a turtle off the road", "channel": "1 Million Turtles (Western Sydney University)", "date": "2022"},
  'python': {"id": "ipO6DrnsmpE", "title": "What to do if you come across a snake", "channel": "Zoos Victoria", "date": "2023"},
  'goanna': {"id": "Fe2Ey0iveKk", "title": "Learn about the lace monitor", "channel": "Cooberrie Park Wildlife Sanctuary", "date": "2024"},
  'dragon': {"id": "POE6PMLML8A", "title": "Dragon returns to its den: treatment and release", "channel": "RSPCA Queensland", "date": "2022"},
  'platypus': {"id": "z8-WuGeG85g", "title": "How you can help keep the platypus healthy and safe", "channel": "Nillumbik Shire Council", "date": "2026"},
  'brushtail': {"id": "8wc59T3zYMg", "title": "Common brushtail possum pouch rescue", "channel": "Save Our Wildlife Foundation", "date": "2024", "warning": "Shows a mother possum that has died. Removing a joey from the teat is for trained, licensed carers only.", "young": true},
  'koala': {"id": "K-fjzFdSw7U", "title": "Getting help for sick koalas", "channel": "Queensland Government", "date": "2024"},
  'macropod': {"id": "O4cc4_gQW28", "title": "Wallaby joey rescue: how to check a marsupial's pouch", "channel": "Wannon Creek Wildlife", "date": "2023", "warning": "Shows a mother wallaby that has died."},
  'wombat': {"id": "NuebDLqwhaY", "title": "Please stop and check the pouch", "channel": "Badgerys Creek Wildlife Sanctuary", "date": "2022", "warning": "Shows a mother wombat that has died."},
  'ringtail': {"id": "lQGTbcpLhv8", "title": "How to build a ringtail possum drey", "channel": "Warriors 4 Wildlife", "date": "2023"},
  'glider': {"id": "bk8npJVsnVs", "title": "Rescue of a greater glider", "channel": "Toowoomba Koala & Wildlife Rescue", "date": "2024"},
  'flyingfox': {"id": "zpDsh-3YXIY", "title": "International Bat Appreciation Day", "channel": "Wildlife Victoria", "date": "2026", "warning": "Never touch a bat. Only trained, vaccinated people handle bats."},
  'microbat': {"id": "TYkpQIpHBjs", "title": "Building a bat box for microbats", "channel": "Conservation Volunteers Australia", "date": "2024", "warning": "Never touch a bat. Only trained, vaccinated people handle bats."},
  'echidna': {"id": "FuEWBCiMRXY", "title": "Echidna handling", "channel": "Bonorong Wildlife Sanctuary", "date": "", "warning": "The second half shows anaesthesia and an X-ray."},
  'bandicoot': {"id": "myh2-pBSmKs", "title": "How to make a bandicoot-friendly backyard", "channel": "Royal Botanic Gardens Victoria", "date": "2024"},
  'babybird': {"id": "1LhekQU1zOU", "title": "DIY baby bird makeshift nest", "channel": "Western Australian Seabird Rescue", "date": "2023", "young": true},
  'bird': {"id": "z_lhjr3sb-0", "title": "How to rescue an orphaned or injured bird", "channel": "Wildlife Rescue Association of BC (Canada)", "date": "2024", "warning": "A Canadian video: in Australia, call the number in this plan."},
  'lorikeet': {"id": "bg0F486rjWU", "title": "Lorikeet paralysis syndrome", "channel": "RSPCA QLD", "date": "2023"},
  'magpie': {"id": "ZR3FIE1J2FU", "title": "Magpies - should you feed them?", "channel": "WA Wildlife", "date": "2021"},
  'pigeon': {"id": "hbyTI8JVSlU", "title": "Rescuing an injured pigeon: avian vet exam and treatment", "channel": "Bird Vet Melbourne", "date": "2023"},
  'frogmouth-owl': {"id": "k87V8EHCOMM", "title": "Tawny frogmouths in care", "channel": "WIRES", "date": "2018"},
  'raptor': {"id": "J913FAea7C8", "title": "How to catch an injured raptor", "channel": "Carolina Raptor Center (USA)", "date": "2018", "warning": "An American video: in Australia, call the number in this plan, not the US numbers. Wear thick gloves: talons cause the injuries."},
  'waterbird': {"id": "Hh_P-EeiYM8", "title": "How to help ducklings", "channel": "Wildlife Victoria", "date": "2019", "young": true},
  'seabird': {"id": "HrYvOSmYEPM", "title": "How to rescue a grounded seabird", "channel": "Save Our Shearwaters (Hawaii)", "date": "2025", "warning": "A Hawaiian video: in Australia, call the number in this plan."},
  'skink': {"id": "M3UwR_x18ZQ", "title": "Baby blue-tongue lizards at Australia Zoo Wildlife Hospital", "channel": "Australia Zoo", "date": "2026", "young": true},
  'venomous-snake': {"id": "ipO6DrnsmpE", "title": "What to do if you come across a snake", "channel": "Zoos Victoria", "date": "2023"},
  'sea-turtle': {"id": "njdXxSdP_Us", "title": "I found a sea turtle stranded on the beach. What do I do?", "channel": "Sea Turtle Preservation Society (USA)", "date": "2024", "warning": "An American video: in Australia, call the number in this plan, not the US numbers."},
  'frog': {"id": "M0HY-X6n688", "title": "How to build your own frog hotel", "channel": "Currumbin Wildlife Sanctuary", "date": "2024"},
  'pigeon-young': {"id": "nuVsaqD17sY", "title": "How to safely feed a squeaker (baby pigeon)", "channel": "Palomacy Pigeon & Dove Adoptions (USA)", "date": "2022", "young": true, "warning": "An American rescue group. Ask your vet or carer before hand-feeding."},
  'parrot': {"id": "8bZLTfbFrb4", "title": "Sulphur-crested cockatoo entangled in a tree", "channel": "Wildlife Victoria", "date": "2026"},
  'black-cockatoo': {"id": "szjwVRQ9XJQ", "title": "Join us on a cockatoo care round", "channel": "Perth Zoo", "date": "2024"},
  'pelican': {"id": "YRZ3_ZefoeY", "title": "What to do if you hook a pelican", "channel": "Skyway Team Bird Rescue (USA)", "date": "2025", "warning": "An American video: in Australia, call the number in this plan, not the US numbers."},
  'penguin': {"id": "XrVFmjszL9s", "title": "Little penguin rehabilitation in the wildlife clinic", "channel": "Phillip Island Nature Parks", "date": "2021"},
  'shorebird': {"id": "HDpdRtnFjSg", "title": "Protecting our local hooded plovers", "channel": "City of Greater Geelong", "date": "2025"},
  'curlew': {"id": "Bqx7LeIMlAg", "title": "Living with bush stone-curlews", "channel": "Tweed Shire Council", "date": "2021"},
  'cassowary': {"id": "eb6vhKctFZ4", "title": "Be cass-o-wary: staying safe around cassowaries", "channel": "Cassowary Coast Regional Council", "date": "2022"},
  'general': {"id": "PVqgAgfDFyk", "title": "How to contain an injured bird or small animal", "channel": "Wildlife Victoria", "date": "2019"},
};

const YOUNG = /\b(chick|chicks|nestling|nestlings|fledgling|fledglings|hatchling|branchling|baby|babies|duckling|ducklings|cygnet|juvenile|orphan|orphaned|joey|joeys|pinky|pinkie|puggle|pup)\b/i;
// Species groups used elsewhere in the app (species-ranges.js and species-vet.js) to video keys.
const ALIAS = { bluetongue: 'skink', turtle: 'freshwater-turtle', passerine: 'bird', kookaburra: 'bird', lapwing: 'shorebird', cuckoo: 'bird', ibis: 'bird', 'brush-turkey': null };
// The containment video is about birds and small animals, so it only stands in for those.
const SMALL = new Set(['bird', 'ringtail', 'brushtail', 'glider', 'bandicoot', 'dasyurid', 'general', 'passerine', 'magpie', 'pigeon', 'lorikeet', 'parrot', 'frogmouth-owl', 'kookaburra', 'shorebird', 'black-cockatoo', 'lapwing', 'curlew', 'cuckoo']);

const BIRDS = new Set(['bird', 'passerine', 'magpie', 'pigeon', 'lorikeet', 'parrot', 'frogmouth-owl', 'kookaburra', 'black-cockatoo', 'cuckoo', 'ibis']);

function pick(key, context) {
  const k = key in ALIAS ? ALIAS[key] : key;
  if (!k) return null;
  const young = YOUNG.test(context);
  // A species' own baby video first, then the general baby-bird one.
  if (young && VIDEOS[k + '-young']) return VIDEOS[k + '-young'];
  if (young && VIDEOS[k] && VIDEOS[k].young) return VIDEOS[k];
  if (young && BIRDS.has(key)) return VIDEOS.babybird;
  const v = VIDEOS[k];
  if (!v || (v.young && !YOUNG.test(context))) return null;
  return v;
}

/** The care video for a species group, refined by the plan's own words (a lorikeet gets the lorikeet video). */
export const videoFor = (group, context = '', tags = []) => {
  let keys = [...tags, group].filter(Boolean);
  // A named species beats its class: a brush-turkey chick never gets the general baby-bird (renesting) video.
  if (keys.some((k) => k !== 'bird' && k !== 'reptile')) keys = keys.filter((k) => k !== 'bird' && k !== 'reptile');
  for (const key of keys) {
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
