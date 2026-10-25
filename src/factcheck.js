// A safety net for the AI rewrites of a vet's own words (Rapid polish, AI polish, answers folded into edited notes):
// they're told to keep every number exactly, and this checks it, so a dropped or changed dose is pointed out.
const numbersIn = (t) =>
  (String(t || '').match(/\d+(?:\.\d+)?/g) || [])
    .map((n) => String(Number(n))) // "0.20" and "0.2" are the same number
    .filter((n) => n !== 'NaN');

/** Numbers in `before` that aren't anywhere in `after` (each listed once, in order), up to `max`. */
export function lostNumbers(before, after, max = 4) {
  const kept = new Set(numbersIn(after));
  return [...new Set(numbersIn(before))].filter((n) => !kept.has(n)).slice(0, max);
}

/** A short line for a toast, or '' when nothing went missing. */
export function lostNote(before, after) {
  const lost = lostNumbers(before, after);
  return lost.length ? ` Check ${lost.length === 1 ? 'this number' : 'these numbers'}: ${lost.join(', ')} (in what you wrote, not in the new version).` : '';
}
