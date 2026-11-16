# Footage of the app working: Recordly (and a scripted fallback)

Some films need real footage: the product running, not a drawing of it. Use it for the one or two moments where "this is real" matters (a scan running, a report opening), and keep everything else in the film's own graphics.

## Recordly

[Recordly](https://github.com/webadderallorg/Recordly) is a free, open-source screen recorder and editor for polished demos (Electron; macOS 14+, Windows 10+, Linux). It adds what makes raw recordings look produced: **auto-zoom** from cursor activity (plus manual zoom regions), **cursor smoothing, motion blur and click bounce**, wallpapers/gradients/padding/rounded corners/shadows, a webcam bubble, speed regions, trims, annotations, and **MP4 or GIF export**. Projects are saved as `.recordly` files.

- **License: AGPL-3.0.** Run it as a tool; do not bundle or modify and redistribute it inside this repo. `install_companions.sh` only prints how to get it.
- **Install:** a release from the repo's Releases page, or from source: `git clone https://github.com/webadderallorg/Recordly.git && cd Recordly && npm install && npm run dev` (packaged builds: `npm run build:mac`, which needs a full Xcode 26+; if macOS quarantines a local build: `xattr -rd com.apple.quarantine /Applications/Recordly.app`).
- **Permissions (macOS):** it records through ScreenCaptureKit, so it needs Screen Recording (and Microphone if used). Only the user can grant these; ask, do not work around.
- **No CLI or API.** Its README describes a GUI flow only: launch, pick a screen or window, choose audio options, start, stop, then edit. An agent therefore either asks the user to record (give them a shot list), or drives the GUI with the user's Accessibility permission, or uses the scripted fallback below.

## Scripted fallback (`scripts/capture_screen.sh`)

`capture_screen.sh <seconds> <out.mov> [x,y,w,h]` wraps macOS `screencapture -v -V <seconds> [-R region]`. Raw footage lacks Recordly's zoom and cursor polish; apply scale, crop and rounded-card framing in the composition. (Untested here: the first run raises the Screen Recording prompt.)

## Using footage in the film

1. **Shot list first:** the exact steps, the data to type, the length of each take (5–12 s), and the narration line it will sit under.
2. **Clean data only:** a test account, a neutral sample, no real people, borrowers, credentials, tokens, emails, phone numbers or account numbers on screen. Re-record rather than blur when something slipped in. Never record anything that is not the user's own app and test data.
3. **Frame it in the film's style:** the clip sits in a white rounded card (radius 24–30, soft shadow) on the paper ground, scaled so text stays ≥ 28 px-equivalent; the zoom follows the action (Recordly's auto-zoom, or a GSAP scale on the card).
4. **HyperFrames rules:** a `<video>` is its own timed clip (`class="clip"`, `data-start`, `data-duration`, muted unless it carries sound with `data-has-audio="true"`); time the video itself, not its wrapper; grades and blur go through `npx hyperframes media-treatment`, not CSS filters.
5. **Sound:** a real click or tick from Openverse on the visible clicks (see `audio-tools.md`), under the narration.
6. **Check frames:** snapshot the clip's first, middle and last frames; confirm nothing sensitive and no cut-off UI.

## Apps that drive a browser (automation tools)

Record the automation working on a **test site and test data**: show the loop (the page, the action, the result) rather than the dashboard. Slow the cursor, hold each result 1–2 s, and cut the waiting. If the app acts on real accounts, stage a sandbox first.
