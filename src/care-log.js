// Use the one field explicitly marked by the form owner. Discard all other prefilled data.
export function careLogUrl(template, caseId) {
  let url;
  try {
    url = new URL(template);
  } catch {
    return '';
  }
  if (url.origin !== 'https://docs.google.com' || url.username || url.password ||
      !/^\/forms\/(?:u\/\d+\/)?d\/(?:e\/)?[\w-]+\/viewform\/?$/.test(url.pathname)) return '';
  const fields = [...url.searchParams].filter(([key, value]) => /^entry\.\d+$/.test(key) && value === 'CASE_ID');
  if (fields.length !== 1 || !caseId.trim()) return '';
  url.search = '';
  url.hash = '';
  url.searchParams.set(fields[0][0], caseId.trim());
  return url.href;
}
