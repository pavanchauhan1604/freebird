#!/usr/bin/env python3
"""Real sound effects from Openverse (CC0 / public domain / CC BY only), with a credits manifest.

  sfx_search.py search "soft click" [--max-seconds 2] [--licenses cc0,pdm,by] [--limit 12]
  sfx_search.py get <id> --name soft-click [--out assets/sfx]          # downloads the file and records its licence in assets/sfx/manifest.json
  sfx_search.py credits [--manifest assets/sfx/manifest.json] [--out CREDITS.md]      # attribution lines for CC BY items (put them in the video description)

Verified against the live API (anonymous): GET https://api.openverse.org/v1/audio/?q=...&page_size=20 with `Accept: application/json`.
Result fields used: id, title, creator, license, license_version, license_url, url (a direct preview file), foreign_landing_url, duration (MILLISECONDS), source, tags.
Anonymous clients get at most 240 results per query; register at https://api.openverse.org/v1/ for a higher limit. Use short, concrete queries; the `category=sound_effect` filter returns
nothing for Freesound-sourced items (their category is empty), so filter by duration instead.
Allowed: cc0, pdm, by. Never: any NC, ND or SA licence, or anything whose licence cannot be read. Read the licence on the item's own page (foreign_landing_url) before relying on it.
"""
import argparse, hashlib, json, os, re, sys, time, urllib.parse, urllib.request

API = "https://api.openverse.org/v1"
UA = {"Accept": "application/json", "User-Agent": "freebird-skill/1.0"}


def get(path, **q):
    r = urllib.request.Request(API + path + ("?" + urllib.parse.urlencode(q) if q else ""), headers=UA)
    return json.load(urllib.request.urlopen(r, timeout=30))


def search(a):
    allowed = {x.strip() for x in a.licenses.split(",")}; out = []; page = 1
    while len(out) < a.limit and page <= 8:
        d = get("/audio/", q=a.query, page_size=20, page=page, license_type="commercial")
        if not d.get("results"): break
        for r in d["results"]:
            if r.get("license") not in allowed: continue
            if a.max_seconds and (r.get("duration") or 0) > a.max_seconds * 1000: continue
            out.append(r)
        page += 1
    out = out[: a.limit]; os.makedirs("assets/sfx/candidates", exist_ok=True)
    slug = re.sub(r"[^a-z0-9]+", "-", a.query.lower()).strip("-"); json.dump(out, open(f"assets/sfx/candidates/{slug}.json", "w"), indent=1)
    for r in out: print(f"{r['id']}  {r['license']}-{r.get('license_version','')}  {(r.get('duration') or 0) / 1000:5.1f}s  {r['title'][:44]:44}  by {r.get('creator') or '?'}  [{r.get('source')}]")
    print(f"{len(out)} candidates saved to assets/sfx/candidates/{slug}.json (listen with see_audio.py after `get`)")


def fetch(a):
    r = get(f"/audio/{a.id}/"); lic = r.get("license")
    if lic not in {"cc0", "pdm", "by"}: sys.exit(f"licence {lic!r} is not allowed (only cc0, pdm, by)")
    ext = r.get("filetype") or "mp3"; os.makedirs(a.out, exist_ok=True); dest = os.path.join(a.out, f"{a.name}.{ext}")
    req = urllib.request.Request(r["url"], headers={"User-Agent": UA["User-Agent"]}); data = urllib.request.urlopen(req, timeout=60).read(); open(dest, "wb").write(data)
    mf = os.path.join(a.out, "manifest.json"); m = json.load(open(mf)) if os.path.exists(mf) else {}
    m[a.name] = {"file": dest, "id": r["id"], "title": r.get("title"), "creator": r.get("creator"), "creator_url": r.get("creator_url"), "license": lic, "license_version": r.get("license_version"),
                 "license_url": r.get("license_url"), "landing": r.get("foreign_landing_url"), "source_url": r["url"], "attribution": r.get("attribution"), "sha256": hashlib.sha256(data).hexdigest(), "fetched": time.strftime("%Y-%m-%d")}
    json.dump(m, open(mf, "w"), indent=1); print(f"{dest}  ({lic}-{r.get('license_version')})  by {r.get('creator')}  {r.get('foreign_landing_url')}")


def credits(a):
    m = json.load(open(a.manifest)); lines = []
    for n, x in sorted(m.items()):
        if x["license"] == "by": lines.append(f"\"{x['title']}\" by {x['creator'] or 'unknown'} ({x['landing']}), licensed CC BY {x['license_version']} ({x['license_url']})")
    open(a.out, "w").write("Sound effects\n\n" + "\n".join(lines) + ("\n" if lines else "No attribution required (CC0 / public domain only).\n")); print(len(lines), "CC BY credits ->", a.out)


if __name__ == "__main__":
    p = argparse.ArgumentParser(); sp = p.add_subparsers(dest="cmd", required=True)
    s = sp.add_parser("search"); s.add_argument("query"); s.add_argument("--max-seconds", type=float, default=3); s.add_argument("--licenses", default="cc0,pdm,by"); s.add_argument("--limit", type=int, default=12)
    g = sp.add_parser("get"); g.add_argument("id"); g.add_argument("--name", required=True); g.add_argument("--out", default="assets/sfx")
    c = sp.add_parser("credits"); c.add_argument("--manifest", default="assets/sfx/manifest.json"); c.add_argument("--out", default="CREDITS.md")
    a = p.parse_args(); {"search": search, "get": fetch, "credits": credits}[a.cmd](a)
