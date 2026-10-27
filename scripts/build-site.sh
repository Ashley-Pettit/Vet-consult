#!/usr/bin/env bash
# Assembles the published site in dist/ after `npm run build` has built Consult Scribe there.
# Used by .github/workflows/ci.yml here, and by the Ashley-Pettit/bunurong-companion mirror
# (companion.bunurongwildlifecare.au), so both addresses always serve the same build.
#
# Animal Welfare Companion (Bunurong Wildlife Care) is published twice:
#   /care/       live, from the care-prod branch
#   /care-beta/  beta, from the bunurong-wildlife branch (where new changes land first)
# The front page opens the live companion; Consult Scribe moves to /scribe/.
#
# Set SKIP_SCRIBE=1 to leave Consult Scribe out (the Bunurong mirror does this).
set -euo pipefail

root="$(pwd)"
work="$(mktemp -d)"
trap 'cd "$root"; for d in care care-beta; do git worktree remove --force "$work/$d" 2>/dev/null || true; done; rm -rf "$work"' EXIT

build_care() {
  git fetch --depth 1 origin "$1"
  git worktree add "$work/$2" FETCH_HEAD
  (cd "$work/$2" && npm ci && npm run test:unit && CHANNEL="$3" npm run build)
  cp -r "$work/$2/dist" "$root/dist/$2"
}
build_care care-prod care live
build_care bunurong-wildlife care-beta beta

mkdir -p "$work/scribe"
find dist -mindepth 1 -maxdepth 1 ! -name care ! -name care-beta -exec mv {} "$work/scribe/" \;
if [ "${SKIP_SCRIBE:-}" = "1" ]; then
  rm -rf "$work/scribe"
else
  mv "$work/scribe" dist/scribe
fi
touch dist/.nojekyll

cat > dist/index.html <<'HTML'
<!doctype html>
<html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Wildlife Welfare Companion</title>
<meta http-equiv="refresh" content="0; url=care/">
<link rel="canonical" href="care/">
<script>location.replace('care/' + location.search + location.hash);</script>
</head><body><p><a href="care/">Open Wildlife Welfare Companion</a></p></body></html>
HTML
cat > dist/404.html <<'HTML'
<!doctype html>
<html lang="en-AU"><head><meta charset="utf-8"><title>Wildlife Welfare Companion</title>
<script>location.replace((location.hostname.endsWith('github.io') ? '/Vet-consult/' : '/') + 'care/');</script>
</head><body><p>Page not found. <a href="/care/">Open Wildlife Welfare Companion</a></p></body></html>
HTML
