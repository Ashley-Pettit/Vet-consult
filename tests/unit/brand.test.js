import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isHex, contrast, readableOnWhiteText, readableOnDark, brandVars, buildBrandPrompt, parseBrandReply } from '../../src/brand.js';
import { setOrg, buildPrompt, buildDocPrompt, buildCarerPlanPrompt, buildRevisionPrompt, orgBlock } from '../../src/note.js';

test('hex checks and contrast maths', () => {
  assert.ok(isHex('#0b5fa5'));
  assert.ok(!isHex('0b5fa5') && !isHex('#fff') && !isHex(null));
  assert.equal(Math.round(contrast('#000000', '#ffffff')), 21);
});

test('pale brand colours are darkened until white text is readable', () => {
  const yellow = '#ffd400';
  assert.ok(contrast(yellow, '#ffffff') < 4.5);
  assert.ok(contrast(readableOnWhiteText(yellow), '#ffffff') >= 4.5);
  assert.ok(contrast(readableOnDark('#0b2a4a'), '#0a1b2e') >= 4.5);
  const v = brandVars({ primary: '#ffd400', secondary: '#ffee88' });
  assert.ok(contrast(v.light['--accent'], '#ffffff') >= 4.5);
  assert.ok(contrast(v.light['--leaf'], '#ffffff') >= 3);
  assert.ok(contrast(v.dark['--accent'], '#0a1b2e') >= 4.5);
  assert.equal(brandVars({ primary: 'blue' }), null);
});

test('colour look-up only accepts confident, valid answers', () => {
  assert.match(buildBrandPrompt('Some Shelter'), /"Some Shelter"/);
  assert.deepEqual(parseBrandReply({ primary: '#112233', secondary: '#445566', known: true }), { primary: '#112233', secondary: '#445566' });
  assert.equal(parseBrandReply({ primary: '#112233', known: false }), null);
  assert.equal(parseBrandReply({ primary: 'red', known: true }), null);
  assert.deepEqual(parseBrandReply({ primary: '#112233', secondary: 'x', known: true }), { primary: '#112233', secondary: '#112233' });
});

test('organisation name and house style reach every prompt, and nothing by default', () => {
  setOrg({});
  for (const p of [buildPrompt('x'), buildDocPrompt('adoption', 'x'), buildCarerPlanPrompt('x')]) {
    assert.doesNotMatch(p, /house_style|RSPCA/);
  }
  setOrg({ name: 'Example Animal Shelter', style: 'Headings in capitals. Never abbreviate twice daily.' });
  assert.match(buildPrompt('x'), /scribe for Example Animal Shelter, an Australian animal shelter clinic/);
  for (const p of [buildPrompt('x'), buildDocPrompt('inspector', 'x'), buildCarerPlanPrompt('x'), buildRevisionPrompt({}, 'a', 'b')]) {
    assert.match(p, /<house_style>\nHeadings in capitals/);
    assert.match(p, /It never adds facts, doses or findings/);
  }
  setOrg({ name: 'Only a name' });
  assert.equal(orgBlock(), '');
  setOrg({});
});
