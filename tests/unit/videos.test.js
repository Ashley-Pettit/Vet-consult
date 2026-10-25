import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CARE_VIDEOS, CARE_CONDITIONS, careVideoFor } from '../../src/videos.js';

// Carers want how-to videos, not showcases or rescue stories.
const SHOWCASE = /^(?!how |heat |caring |providing |feeding )(\S+ ){1,4}in care$|^meet |^join us|^a (young|tiny|baby|wild|vet nurse)\b|^an injured tawny|rescue of|^saving |marine response unit|new tool/i;

test('care and condition videos are instructional, not showcases', () => {
  const titles = [...Object.values(CARE_VIDEOS), ...CARE_CONDITIONS.map((c) => c.video)].map((v) => v.title);
  for (const t of titles) assert.doesNotMatch(t, SHOWCASE, t);
});

test('an animal without its own how-to video falls back to a general one', () => {
  assert.equal(careVideoFor('ringtail', 'ringtail possum joey').title, CARE_VIDEOS.ringtail.title);
  assert.equal(careVideoFor('shorebird', 'adult hooded plover').title, CARE_VIDEOS.bird.title);
  assert.equal(careVideoFor('platypus', 'adult platypus').title, CARE_VIDEOS.general.title);
  assert.equal(careVideoFor('flyingfox', 'grey-headed flying-fox, cat attack').title, 'Why every animal caught by a cat needs antibiotics');
});
