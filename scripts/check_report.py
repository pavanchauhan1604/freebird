#!/usr/bin/env python3
"""Summarize the newest saved `hyperframes check` report (the --json stdout can be truncated; the saved file is complete).
  check_report.py <film-project-dir>"""
import glob, json, os, sys
d = sys.argv[1] if len(sys.argv) > 1 else "."
fs = sorted(glob.glob(os.path.join(d, ".hyperframes/artifacts/checks/*.json")), key=os.path.getmtime)
if not fs: sys.exit("no saved check report: run `npx hyperframes check --json` first")
r = json.load(open(fs[-1])); print({k: (r[k].get("errorCount"), r[k].get("warningCount")) for k in ("lint", "runtime", "layout", "motion", "contrast", "craft", "audio") if k in r})
for k in ("runtime", "layout", "lint", "contrast", "craft"):
    for x in r.get(k, {}).get("findings", []):
        if x.get("severity") == "error" or (k in ("lint", "contrast") and x.get("severity") == "warning") or (k == "craft" and x.get("code") not in ("line_unread", "text_below_floor")):
            print(f"  {k}: {x.get('severity')} {x.get('code')} @ {x.get('time', '')}s: {str(x.get('message'))[:160]} | {str(x.get('selector'))[:60]}")
