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
  bird: { id: 'K9FETK07HvQ', title: 'How to help a baby bird', channel: 'Wildlife Victoria', date: '2019' },
  raptor: { id: 'DQThwNr91SU', title: 'Birds of prey: vet talk', channel: 'Currumbin Wildlife Hospital', date: '2020' },
  waterbird: { id: 'Hh_P-EeiYM8', title: 'How to help ducklings', channel: 'Wildlife Victoria', date: '2019' },
  dragon: { id: 'POE6PMLML8A', title: 'Dragon returns to its den: treatment and release', channel: 'RSPCA Queensland', date: '2022' },
  python: { id: 'i67vEgT8f7Y', title: 'Carpet python at Taronga Wildlife Hospital', channel: 'Taronga Wildlife Hospital', date: '2021' },
  turtle: { id: 'eT1Ne4vCzXQ', title: 'Broad-shelled turtle shell repair and release', channel: 'RSPCA Queensland', date: '2023' },
  general: { id: 'PVqgAgfDFyk', title: 'How to contain an injured bird or small animal', channel: 'Wildlife Victoria', date: '2019' },
};

export const videoFor = (group) => VIDEOS[group] || null;
export const watchUrl = (v) => `https://www.youtube.com/watch?v=${v.id}`;
export const embedUrl = (v) => `https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1&autoplay=1`;
