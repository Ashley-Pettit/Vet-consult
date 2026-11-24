import assert from 'node:assert/strict';
import test from 'node:test';
import { careLogUrl } from '../../src/care-log.js';

const form = 'https://docs.google.com/forms/d/e/example/viewform';

test('prefills only the admission ID and preserves it as one text value', () => {
  const template = form + '?usp=pp_url&entry.42=CASE_ID&entry.99=example#section';
  const saved = careLogUrl(template, 'CASE_ID');
  assert.equal(saved, form + '?entry.42=CASE_ID');
  const url = new URL(careLogUrl(saved, '  001 / A&B  '));
  assert.deepEqual([...url.searchParams], [['entry.42', '001 / A&B']]);
});

test('requires an explicit ID and one marked question on a Google responder URL', () => {
  assert.equal(careLogUrl(form + '?entry.42=CASE_ID', ' '), '');
  for (const invalid of [
    form, form + '?entry.42=CASE_ID&entry.99=CASE_ID', form.replace('viewform', 'edit') + '?entry.42=CASE_ID',
    'https://example.org/forms/d/e/example/viewform?entry.42=CASE_ID', 'invalid',
  ]) assert.equal(careLogUrl(invalid, '001'), '');
});
