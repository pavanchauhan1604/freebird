# Scene patterns

Each pattern below exists as working code in [`examples/lantern/compositions/`](../examples/lantern/compositions/). A scene is a sub-composition (`<template>`, styles + markup + one script, timeline registered as `window.__timelines["<id>"]`). All times inside a scene are relative to the scene's start; keep a comment above each beat with the narration line it belongs to.

## The structure

`Intro (name animation) → Bridge (context, then the lifecycle appears as a rail) → one scene per lifecycle stage → [a cycle beat] → a separate act for what sits beside the lifecycle → Closing`. A **persistent rail** (stage labels with an ember that moves) lives from the first stage to the last and is the last host in `scenes.json` so it paints on top. The rail's stages are exactly the lifecycle's; a side act is never on it.

## Intro: the name

The product's mark animates itself, and it does so by **reading**: a page is read by a light and the page becomes the lantern. This idea survived three rebuilds; what failed each time was the execution (a glossy page, grey bars for text, a glowing orb, rings, a plain card with a scan line, a sentence with words flying into a glass). In the Lantern example ([`examples/lantern/ignite/ignite.js`](../examples/lantern/ignite/ignite.js)) the idea is a real physical transformation:
1. **One long sheet of real text** (five lines of a public-domain classic, set in the film's own type at about 32 px on screen) lifts in with a soft contact shadow and sways slowly in 3D, grey and unread. The sheet is as wide as the circumference of the lantern's glass, so it can close around it exactly.
2. **A flat amber dot reads it**, riding the edge of the ink line by line; each line turns from grey to ink behind the dot.
3. **The sheet rolls itself up around the dot.** It is cut into 32 strips, each carrying its slice of the same page, bent into a cylinder by a pure function of time (curvature grows with the roll). Light spreads outward from the middle strips as it closes: paper to amber, bright at the middle and deeper at the edges, the text wrapping round the cylinder. This is the memorable moment: a page physically becoming a glowing paper lantern.
4. The closed, lit cylinder crossfades into the lantern's glass; the cap lowers with a small swing and the base rises; the camera pulls back into the lockup; the name swells to full weight with the lit amber letter; the tagline clears in.
Rules that came out of it: the transformation is the idea (do not replace it with a scan line or a fill); the first half is flat and crisp with real text; the rendered 3D lantern is the reward at the end; no glows, rings or orbs; the reader is the film's one amber dot. Keep one file for the animation if the app plays it too.

## Bridge

A title that changes with the narration ("An accessibility platform for the whole enterprise." → "All of it, in one place. End to end." → "The campus lifecycle."). Dashed slots show where things will go; a card takes each slot **as it is named** (documents, slides, course materials, handwritten, audio, video), each in its own accent with its icon; they converge into one panel ("in one place") and tick green ("end to end"); then the panel steps back and the **lifecycle is drawn** as nodes along a line with the ember running along it; the nodes' labels **fly up into the rail** by transform and the rail fades in under them.

## Discover

A **site graph**: the domain pill types itself, S-curve edges grow to site pills in a wave with a pulse running along each, children dots appear behind them, an odometer counts sites. One pill (the one we will scan) **flies to become the browser toolbar** of the next scene (shared element).

## Scan

One site card with pages (chevron rotates open) and files; **one steady beam** sweeps down it (`ease: none`); a file lifts out at the moment the beam passes and glides to a tray along an S-curve (x and y with different eases, no overshoot); then each file is checked in turn (a line sweeps under it, a result lands: passed / needs fixing). A tally line closes it ("6 files checked · 4 need fixing", the number highlighted).

## Campus inventory

The scanned card **shrinks into one tile** of a grid of every site; a **wave** of colour spreads from it; counters roll; an inventory card builds a **funnel** (files found → unique files → files needing remediation, three odometers and a segmented bar). Add the fingerprint beat when the product de-duplicates: rows show a content fingerprint computed on screen, two rows share one (duplicate, dimmed), one changes (flagged, queued again).

## Report (per site, then master)

A **site report** card: KPI tiles (files hosted, need remediation, broken links, percent accessible) rolling, a **history chart** (bars for share accessible, a line for broken links falling). The card starts centred and larger and **slides aside** when the **file table** arrives: each file with a download link, findings as chips by type (table without header, image without alt text, tags missing, broken link), chips appearing **by type, in step with the phrases that name them**. A **share bar** (sent to the site owner, formats, "19 files to fix"). Then the **master report**: campus KPIs, a ranked table of sites (accessible bar, documents hosted, broken links, change since last scan) with **column bands** that light as each column is named, and the scanned site highlighted. The findings **flow as dots into a "Remediation queue" pill** with a counter: the hand-off to the next stage.

## Remediate

The sample page is read. A soft band sweeps down while **clean rounded outlines** are drawn per role (heading violet, paragraph blue, list green, image orange, footer grey), numbered badges follow reading order, **thin leader lines** connect each box to the row it became in a structure tree, alt text is typed in plain words, tags appear on every row, the page glows green ("Accessible") **while looking exactly the same**.

## Export

The remediated page **lifts off and travels along one smooth arc** into a documents list, replacing the first original; the others flip in turn while a counter reads "n of 4 replaced"; chips say same file name, same address, same look. A **sweep line** shows original and remediated are identical (checks: same layout, same text, same images). An **accessibility layer** settles over the page (scale only, never rising into the rail), tags listed beside it; a screen-reader card reads the structure part by part.

## Cycle

The lifecycle closes into a **ring**; an ember circles it (position and glow a pure function of time); a centre card says "Scheduled runs"; **new uploads** arrive and are carried through every stage (statuses computed from time); the centre card and ember leave before the closing title; "One unified workflow." with the product's mark lit at the centre.

## Side act: the tool tour

Open with the problem in one title ("More than documents on websites.") over a website card with the other formats floating around it (clear space, nothing touching), then the product's name for the act, four tool cards that **become tabs**, a **panel per tool** with its colour flooding the ground, each demo showing input → output (slides: alt text, title, reading order, thumbnails ticked; captions: caption bar typing, a timeline filling; transcripts: waveform, playhead, timestamped lines; documents: handwritten page → typed page and format chips). Add a "how it works" panel when one mechanism serves several tools (sources → model → words with timestamps, timestamps highlighting last). End the act with "it keeps growing": the tools as tiles plus dashed "Next" slots.

## Closing

Night ground, a grid of every file type **dim**; the first line is on screen while they are dim; the second line **lights them in a wave from the middle, each in its own accent**; the lockup arrives in silence with the light sound; the tagline clears in; slow drift. Keep the lockup **clear of the tiles** (exclude the middle columns entirely); do not scale it until it touches anything.
