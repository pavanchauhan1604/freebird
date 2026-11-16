# Footage of the app working: Recordly (and a scripted fallback)

Some films need real footage: the product running, not a drawing of it. Use it for the one or two moments where "this is real" matters (a scan running, a report opening), and keep everything else in the film's own graphics.

## Recordly

[Recordly](https://github.com/webadderallorg/Recordly) is a free, open-source screen recorder and editor for polished demos (Electron; macOS 14+, Windows 10+, Linux). It adds what makes raw recordings look produced: **auto-zoom** from cursor activity (plus manual zoom regions), **cursor smoothing, motion blur and click bounce**, wallpapers/gradients/padding/rounded corners/shadows, a webcam bubble, speed regions, trims, annotations, and **MP4 or GIF export**. Projects are saved as `.recordly` files.

- **License: AGPL-3.0.** Run it as a tool; do not bundle or modify and redistribute it inside this repo. `install_companions.sh` only prints how to get it.
- **Install:** a release from the repo's Releases page, or from source: `git clone https://github.com/webadderallorg/Recordly.git && cd Recordly && npm install && npm run dev` (packaged builds: `npm run build:mac`, which needs a full Xcode 26+; if macOS quarantines a local build: `xattr -rd com.apple.quarantine /Applications/Recordly.app`).
- **Permissions (macOS):** it records through ScreenCaptureKit, so it needs Screen Recording (and Microphone if used). Only the user can grant these; ask, do not work around.
- **No CLI or API.** Its README describes a GUI flow only: launch, pick a screen or window, choose audio options, start, stop, then edit. An agent therefore either asks the user to record (give them a shot list), or drives the GUI with the user's Accessibility permission, or uses the scripted fallback below.

## Scripted capture from the terminal (verified)

Tried on this project's Mac (macOS 26): the terminal can open an app, record the screen, and move the cursor and click, all with no extra software.

```bash
scripts/capture_screen.sh 8 take.mov                       # screencapture -v -V 8 [-R x,y,w,h]: 3840x2160, 60 fps, h264, real cursor included
scripts/record_demo.sh Calculator 8 take.mov '[[0.138,0.515],[0.85,0.783]]'   # open the app, find its window, record, glide the cursor and click
```

`record_demo.sh` reads the window rectangle through System Events, starts the recording, then `tap.js` (JXA, `CGEventPost`) glides the cursor on an eased path and clicks targets given as fractions of the window. Every target must lie inside the window; anything else is dropped. A test with Calculator typed 7 + 8 and the recording showed the app, the moving cursor and the result.

Findings and limits:
- It needs **Screen Recording** and **Accessibility** for the terminal app (the test machine already had both; a new machine will prompt, and only the user can grant them).
- Full-screen capture also records **everything else visible**, including other windows' thumbnails (Stage Manager's side strip showed other apps). Record a region (`-R`), hide Stage Manager, close other apps, or crop in the composition. Check the first frame before using any take.
- Raw captures lack Recordly's auto-zoom and cursor polish; apply scale, crop and a rounded card in the composition, or open the `.mov` in Recordly's editor.
- macOS has no `timeout`; `-V` ends the recording by itself. 4K/60 output is about 2 MB/s.
- Quit anything you opened (`osascript -e 'tell application "X" to quit'`) and delete takes you do not keep.

## Using footage in the film

1. **Shot list first:** the exact steps, the data to type, the length of each take (5–12 s), and the narration line it will sit under.
2. **Clean data only:** a test account, a neutral sample, no real people, borrowers, credentials, tokens, emails, phone numbers or account numbers on screen. Re-record rather than blur when something slipped in. Never record anything that is not the user's own app and test data.
3. **Frame it in the film's style:** the clip sits in a white rounded card (radius 24–30, soft shadow) on the paper ground, scaled so text stays ≥ 28 px-equivalent; the zoom follows the action (Recordly's auto-zoom, or a GSAP scale on the card).
4. **HyperFrames rules:** a `<video>` is its own timed clip (`class="clip"`, `data-start`, `data-duration`, muted unless it carries sound with `data-has-audio="true"`); time the video itself, not its wrapper; grades and blur go through `npx hyperframes media-treatment`, not CSS filters.
5. **Sound:** a real click or tick from Openverse on the visible clicks (see `audio-tools.md`), under the narration.
6. **Check frames:** snapshot the clip's first, middle and last frames; confirm nothing sensitive and no cut-off UI.

## Apps that drive a browser (automation tools)

Record the automation working on a **test site and test data**: show the loop (the page, the action, the result) rather than the dashboard. Slow the cursor, hold each result 1–2 s, and cut the waiting. If the app acts on real accounts, stage a sandbox first.
