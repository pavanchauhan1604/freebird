# SPEC: Lantern launch film (v3: brand first, then the campus)

Picked storyline: **A, The silent page** (`STORYLINES.md`), widened to the app launch: the whole campus lifecycle, then the Workbench.
Reference grammar: `REFERENCES.md` (five Notion films and the Clueso logo move). Nothing below is rendered yet; the name animation (Ignite) is the first thing built.

```text
GOAL:    The viewer watches Lantern take a CSU campus from "where are the PDFs" to "every one readable
         by a screen reader", then sees the Workbench handle slides, captions and course material, and
         leaves remembering the lantern and the tagline (`TAGLINE`).
OUTPUT:  HyperFrames, 1920 x 1080, 30 fps. Plus Ignite alone (3.6 s) for the app's launch screen.
TIME:    84 s x 30 fps = 2520 frames (range 80 to 90 s). Music bed from frame 270 (the ignition); none before it.
```

## What changed in v3, and why

| Change | Reason |
|---|---|
| **The film opens on the Lantern name animation** (Ignite), not on a PDF | opening on a document makes Lantern look like a document tool; it is a campus-wide platform. The brand and the promise ("Nothing left in the dark.") come first, then the campus, then the proof |
| **The order is the lifecycle**: Intro, Discover, Scan, Remediate (the heart), Review and Export, Workbench, claim, end card | it is how the app is organised and how a campus person thinks: find it, check it, fix it, hand it over, then everything else |
| **A lifecycle rail** sits over every act (Discover, Scan, Remediate, Export; the ember moves along it) | one unifying device the viewer reads without effort; it explains where we are at every moment |
| **The sample page is neutral**: a page made for the film (heading, subheading, paragraph, 3-item list, an image, a footer; no names, no phone numbers), read by the **real engine** | no personal or contact details on screen, and every structure on screen (the boxes, the tags, the alt text) is the engine's actual output for that page |
| **Remediate shows the mechanism**: the page is boxed part by part, the image is boxed first and its alt text is written, the tag tree builds beside it, then the page is read aloud | your brief: heading, list, image with alt text, understood at a glance |
| **The voice is macOS speech (`say`, Samantha)** reading the engine's structure | your pick; labelled as a stand-in for a screen reader in the delivery notes |
| The Silent-page opening with the real agenda is removed | superseded by the neutral page and the new order |

## Facts the film may state

| On-screen claim | Source | Note |
|---|---|---|
| The tagline | **"Nothing left in the dark."** (your pick), one source: `TAGLINE` in `ignite.js`, read by the launch screen, Home and the film | it is a line of intent, not a claim about numbers; the descriptive line "Makes PDFs readable by screen readers" is no longer shown anywhere |
| Discover finds the sites under a campus domain; Scan finds the PDFs on them and checks each against PDF/UA | `docs/app.md` (Discover, Scan) | |
| Remediate downloads the PDFs that need it, tags them, and sends anything a person should look at to review | `docs/app.md` (Tag PDFs, Review) | |
| Review shows the page, the model's reading and the tags written, side by side | `docs/app.md` | capture from the real panel |
| Export copies the finished files, one folder per domain | `docs/app.md` | |
| Workbench: **Tagged PDFs**, **Word and HTML** (scanned PDFs rebuilt as editable documents, reading order, formulas as real equations), **Accessible slides** (a `.pptx` made accessible: alt text, decorative marks, titles, reading order), **Captions** (a PowerPoint gets caption tracks from its slide audio) | `docs/app.md` | the scenes use these words |
| Campus-wide numbers | variables `DISCOVERED`, `NEEDS_WORK`, `PUBLISHED`, `HELD` | see below |

**Not stated, because the app does not do it:** transcribing general audio or video files (captions are for PowerPoint decks' slide audio), and handwriting (a handwritten form is a recorded hard case in `solved.md`, not a feature). Not stated either: the ADA date (passed), "most PDFs", speed claims, any percentage the app does not print.

**The numbers.** The campus counts are variables (`DISCOVERED` default 11,000, `NEEDS_WORK`, `PUBLISHED`, `HELD`), shown as a whole-campus result, as you asked. Until the full campus run finishes they are placeholders, not results, so the film is not exported with them; the last export takes the real counts from that finished run, and the claim in the last act reads exactly what the Home panel then shows.

## LOOK

- **Worlds (each entered through an object on screen):**
  1. **Paper** `#F6F6F3` (Notion's measured ground, flat, no grain): the hook, the app acts, the payoff, the claim.
  2. **Night** `#0B0B0F` (solid): the reveal and the end card only. The lantern's light is the only glow in the film (the brand's own material): one radial, radius 520 px, amber `#FFB020` from 55% at the centre to 0%.
  3. **The real Lantern window** on paper at 1.8× its size, cropped to the control the beat uses.
- **Ink** `#1D1D1F`; muted `#6E6E73`; on night: ink `#F5F5F7`, muted `#98989D`.
- **Accent (rationed):** amber `#FFB020` (lit edge `#FFD76A`). Only on the ember, the lit lantern, at most one word per title, the claim numbers' underline.
- **Real UI colours** are the product's (blue `#0071E3`, green `#1E8E3E`, orange `#E8890C`), not the film's accents.
- **Metal** `#4A4A52` to `#6B6B74`, satin.
- **Type:** Inter (bundled), 700 and 900. Title 700, 96 px (8.9% of the height), tracking -3%, line 1.08, two lines of six words at most, inside the 80% title-safe box. Numeral 900, 280 px, tabular, tracking -4%; caption 700, 40 px. Tagline 700, 40 px, tracking -1%, muted. Name 700, 150 px in the end card, tracking -3%. UI text never under 28 px after scaling.
- **One hand-made mark:** an amber ring around the heading tag in the Review beat (registry `hw-callout-circle`, 6 px, drawn on in 14 frames).
- **Shadow:** one, for UI cards: 0 24 px 48 px at 12% black. None on type.
- **Banned-default exceptions, named:** off-white ground (the reference uses it), sans type only, no serif, italics, mono labels or numbered labels; glow (only the lantern, only once lit); a dark ground (two scenes, the lantern at 48% of the height, never a void with small things in it).

## OBJECTS

- **The lantern** (bare, transparent): two states with identical geometry. *Unlit*: smoky glass `#2A2A30` to `#3A3A40`, metal at 70%. *Lit*: glass amber `#FFB020` to `#FFD76A`, centre `#FFF1A8`. Cut out of the dark icon; the unlit state derived from it by one mask (built; see `film/assets/`).
- **The ember:** a circle, 5% of the lantern's height, amber `#FFB020`, a small highlight at upper left `#FFF1A8`, no tail, no trail. It squashes on landing (1.25 wide, 0.75 tall, 4 frames, spring damping 0.5).
- **The page:** a real campus PDF page rendered at 288 dpi (the page the engine read) with a VoiceOver-style cursor (4 px black rounded rectangle, white inner stroke) stepping block to block.
- **The VoiceOver caption panel:** black 85%, 40 px white text, radius 20 px, at the bottom; it carries the spoken words. Drawn to match macOS, and labelled as drawn in the build notes.
- **The app window:** real captures of the Lantern window (Home, Discover, Scan, Remediate, Review, Export, Workbench). Not rebuilt.
- **The counter:** the app's own count-up (`motion.js`: cubic ease-out, 320 ms plus 8 ms per unit, capped at 1100 ms) for the small numbers in the real window; the hero numerals (T2) use a longer ramp (see S4).

## MOTION

| Role | Numbers |
|---|---|
| Title in | per word, blur 6 px to 0 and opacity 0 to 1 in 4 frames, words 2 frames apart; no translate |
| Title out | the line, blur 0 to 8 px and opacity 1 to 0 in 5 frames |
| Landed | titles and numerals are dead still until they leave |
| Arrival | `expo.out`, 0.5 s |
| Camera, ground change | `power2.inOut`, 0.4 to 0.6 s |
| Exit, zoom through | `power3.in` |
| Ember, lantern | springs at damping 0.5 (position, scale); never on opacity or colour |
| Motion blur | on the ember and the glass-to-window growth, horizontal-only on horizontal moves |

## Intro v3: the page that lights itself (built; supersedes the ember-period version below)

The earlier intro (an ember flying into a lantern) was plain. This one tells the product in seven seconds, and the mark is built from the story: **a page is read, the page becomes light, the lantern is built around the light.**

| Time | What happens |
|---|---|
| 0.15 s | a plain page (the lantern's own glass, in paper) settles in, large, with a soft shadow; grey lines that say nothing yet |
| 1.0 s | the ember **reads** it: it runs along each line and the line turns to ink behind it, as an eye would; a short arc hops it to the start of the next line |
| 2.9 s | at the last line the ember rises, crosses the page and sinks into its middle |
| 3.3 s | the page **lights** from the ember outward (a soft-edged circle), the ink dissolves into the light, the glow rises past its resting level and settles |
| 3.7 s | the lantern **assembles around the light**: the cap drops on from above and settles with a small swing, the base rises into place, the glass takes their weight |
| 4.3 s | the camera pulls back and the lantern takes its place in the lockup |
| 4.8 s | the name appears as hairline letters and swells to full weight from left to right as the light reaches each |
| 5.7 s | the tagline clears in. Total 7 s; in the film it holds 1 s more. |

The pieces are cut from the real icon (`static/ignite/lantern-cap.png`, `-base`, `-glass-lit`, `-glass-paper`, all on one canvas). The wordmark's type style is one of six directions awaiting your pick (`name-typography-variants.png`).
**Narration over it:** the line "Introducing Lantern." is timed to land as the page lights (about 3.3 s); the tagline as the name finishes; the closing phrase after it (options below).
**Opening phrase** (replacing "Let's get started"): **"Let's turn the lights on!"** (your pick), in the same Kokoro Heart voice with an excited read; four takes rendered to choose from.

## Refinement pass for every act (planned; registry pieces named)

Principles: no hard cuts (shared-element morphs), one hero move per shot, long-tailed arrivals and short exits, overlap and stagger, one hand-made mark per act, every number rolls (never fades), every state change has a cause on screen.

| Act | What changes | Registry pieces |
|---|---|---|
| All | **Titles become designed**: per-word blur-in as now, plus one emphasised word per title with a hand-drawn marker stroke (underline or highlight) in amber; titles leave as one blurred line | `marker-highlight`, `hw-underline`, `inline-highlight`, `text-state-swap` |
| Transitions | Intro to Discover: the lit glass grows into the address bar's field; Discover to Scan: the address bar's path "its" holds and the bar becomes the site card's top bar (a shared element); Scan to Remediate: a file in the list lifts and becomes the page; Remediate: the tag tree card hands off to the next act | `modal-morph`, `morph-swap`, `iris-reveal` |
| Lifecycle rail | A four-step rail (Discover, Scan, Remediate, Export) drawn hand-wobbled and joined by connectors in sequence; the ember travels along it as the acts change | `hw-pipeline`, `tracing-beam` |
| Discover | The address bar types the path with a caret; the list scrolls with the camera following the newest; the count rolls digit by digit; a hand-drawn ring around the final number | `number-wheel`, `count-up`, `scroll-camera-story`, `hw-callout-circle` |
| Scan | The crawler travels a drawn path through the page's links (a beam lifting each link it reaches); files are picked up by a cursor and dropped into the tray; results land with a check that draws itself (`Passed`) or a chip that pops (`Needs fixing`); the tally rolls | `tracing-beam`, `cursor-drag-drop`, `success-check`, `spring-pop`, `badge-pop`, `number-wheel` |
| Remediate | Boxes are drawn wobbled by hand with a label, not straight; role names become Notion-style **coloured property chips** (Heading purple, List green, Image orange, Paragraph grey) that pop in; the alt text types with a caret and a small "describing…" beat; the tree rows slide in as the box is drawn | `hw-box-label`, `hw-arrow`, `spring-pop`, `badge-pop`, `typewriter` |
| Review, Export | A held file is picked up and dropped into a "for a person" tray; export is a folder that fills | `cursor-drag-drop`, `cursor-context-menu` |
| Workbench | Four tools as four tabs that switch with a tab transition; a slide, a captioned slide and a scanned handout each use the same boxing grammar | `micro-transitions`, `modal-morph` |
| Claim and end | Numerals roll in one after another; the last full stop is the ember and falls into the lantern, which re-assembles in miniature | `number-wheel`, `count-up` |

Type system: **direction D chosen** (Manrope lowercase, the t lit amber), with C's amber full stop kept as the film's carrier in titles. Titles in the film use Manrope too; the real UI keeps its own face.
Style templates (Collage Explainer and the others) are HyperFrames Pro and none matches Notion's look, so they are not used; `reverse-any-video` (Pro) could rebuild a Notion film frame by frame as a reference if you sign in.

## The name animation (Ignite, v2): the signature move, built (`film/`, shared with the app)

**Mindset (Notion's, from the five films and the Clueso logo move):** paper ground, one slow carrier, long-tailed eases, nothing bounces, one thing moves at a time, and the brand name is a *designed wordmark* that is brought to life, not set text that fades in.

- **Layout:** horizontal lockup, the lantern on the left (340 px tall), the name on the right (140 px), the tagline under the name; the name's centre line sits on the lantern's glass. (Stacked is no longer used.)
- **Wordmark style:** Inter (variable, weight 100 to 900), tracking -3%. Each letter is its own slot (fixed width at weight 680, so nothing moves when a weight changes). Letters type in as **hairlines** (weight 170, ghost grey `#8A8A8F`, a blur clearing on each) and then **swell to weight 680 and ink** as the light reaches them, left to right. The technique is the registry's `weight-wave` (a closed-form per-letter variable-font axis, a pure function of time) driven by Lantern's own choreography; the registry block itself is not mounted because it ships a different face and has no ember.
- **The ember is the full stop:** a "." after "Lantern" (22 px, amber, the size of Inter's own full stop at this size). It is the carrier of the whole film: the first title's full stop in S1, this one, and the claim's last full stop in S9.

| Time (30 fps) | What happens | Numbers |
|---|---|---|
| 0.20 s | the unlit lantern settles in | fade, 14 px rise, 3% scale, 6 px blur clearing, 0.9 s `power3.out`; a soft contact shadow under it |
| 0.75 s | the name types in, hairline and ghost grey | a letter every 2 frames, 0.36 s `power2.out` each, blur 6 px to 0 |
| 1.45 s | the full stop appears after the "n" | scale 0.4 to 1, 0.3 s `power3.out` |
| 1.85 s | the ember lifts and **glides over the word to the lantern in one continuous arc** | 1.15 s; x `sine.inOut`; y rises on `sine.out` and falls on `sine.in` (no kink at the top); apex 84 px above the capitals; shrinks to 35% over the last 35%; each letter lifts 3 px as it passes |
| 3.00 s | the ember sinks into the glass; the glass lights and the light spreads | glass cross-fade 0.55 s `power2.inOut`; warm radial 800 px, opacity 40% (paper) or 55% (night), 0.9 s `power2.out` |
| 3.00 s | the name is lit left to right | each letter 0.55 s ease-out from weight 170 to 680 and ghost to ink, 0.07 s apart |
| 3.60 s | the tagline clears in | 30 px, muted `#6E6E73`, blur 6 px to 0, 0.6 s |
| 4.2 s to 4.6 s | hold | in the film the lockup then holds at least 2 s (first-frame and closing-line checks) |

**Film use:** the lit glass then grows past the frame (20 frames, `power3.in`, its radius shrinking) and becomes the first page of the next scene; the glass flood is a butter field `#FCE5B0` (Notion's pastel fields, in Lantern's amber) behind the first real UI crop.
**Sound:** a single soft landing tick where the ember touches the glass, one low warm note on ignition (once, then once more at the end card); nothing on the typing.
**App use:** the same file is the launch screen (`remediation/app/static/ignite/ignite.js`; the film's `assets/ignite` is a link to it); light or night by the system appearance; the light glow moves slowly after the intro for as long as the app is starting; reduced motion shows the last frame.
**Not yet verified:** the night theme in the film, motion blur on the ember, sound, the paper theme in the app window.

## Templates (sub-compositions with variables, editable in Studio)

| Id | Template | Variables | Used in |
|---|---|---|---|
| T1 | **Verb title** | text, accent word index, theme | everywhere |
| T2 | **Number lander** | value, caption, ramp length | Discover, Scan, claim |
| T3 | **Type becomes UI** (giant typed words shrink into the real control) | typed text, target crop | "Press run." |
| T4 | **Ignite lockup** | name, tagline, theme, layout | S3, end card, the app's launch screen |
| T5 | **Window crop** (a real capture at 1.8×, cropped, with the oversized cursor) | image, crop rect, cursor path, click frame | every app scene |
| T6 | **VoiceOver strip** (cursor box and caption panel bound to blocks and words) | blocks with rects, words, audio start | S1, S7 |
| T7 | **Lifecycle rail** (Discover, Scan, Remediate, Export as four labels on a line; the active one dark, the others muted, as Notion's chapter list does) | active step | the three lifecycle acts |

Registry pieces (searched before hand-building): `typewriter` (name and T3), `modal-morph` and `morph-swap` (container to panel), `oversized-cursor` (clicks), `hw-callout-circle` (the one hand-made mark), `text-state-swap` (title changes), `logo-outro` (end-card timing), `typing-indicator` (the running dots become the ember), `halftone-dissolve` (optional bridge). Hand-built (nothing in the registry): the ember hop, the ignition, the glass growing into the page. Rejected: `lens-flare`, `light-leak`, `aurora`, `neon`, `logo-sting`.

## SHOTS (seconds; about 88 s)

The lifecycle rail (T7) is on screen from Act 1 to Act 4 and the ember moves along it as the acts change. Every act is entered through an object from the one before it.

| Act | Seconds | What it shows | Hero move | Built |
|---|---|---|---|---|
| **0 Intro** | 0–5.6 | the lantern, the name, the tagline "Nothing left in the dark." | the ember falls through the cap into the glass and the light opens from it (Ignite) | **yes** (`film/compositions/ignite.html`) |
| **1 Discover** | 5.8–17 | what Discover *does*, not its panel: an address bar starts at `calstatela.edu/` and the path after it keeps changing (admissions, its, library, …) faster and faster, each landing as a row in a growing list of sites (real site names from the campus list), while a numeral counts up to the number of sites (283 in the current list) | the address bar visiting the campus; the list filling and scrolling; the counter's ease-out | planned |
| **2 Scan** | 17–31 | what Scan *does* on one example site, `calstatela.edu/its`: a page with its links; the ember crawls link to link and each page it opens lights up; the PDFs on those pages are collected into a tray (downloaded); each is checked, one row at a time, with a result (no issues, or the issues found); then it zooms out to the campus: a numeral climbs to `DISCOVERED` files and `NEEDS_WORK` of them need fixing | the ember crawling; files flying into the tray; the check rows resolving | planned |
| **3 Remediate** (the heart) | 24–54 | "Looks fine. Says nothing." (the neutral page, a text cursor that selects nothing); "Lantern reads it like a person." (each part boxed: heading, heading, paragraph, list; the **image boxed first**, its **alt text written**; the tag tree builds beside it); "Same page. Now it's accessible." (a reading-order cursor steps through the parts in silence, the tree complete; the narrator explains it, the tags are not read aloud) | boxes drawn on the page, the tree building, the voice | **yes** (`film/compositions/s-remediate.html`, 29.6 s) |
| **4 Review and Export** | 54–62 | the held-for-review list (a person checks what the engine could not prove) and Export (one folder per domain) | the cursor opens a held file; the folder fills | planned |
| **5 Workbench** | 62–76 | "Anything else, too." The four tools: Tagged PDFs, Word and HTML (scanned course material), Accessible slides, Captions | the same boxing grammar on a slide and on a scanned handout | planned |
| **6 Claim** | 76–81 | whole-campus numbers (variables `PUBLISHED`, `HELD`), the last full stop amber | numerals land one after the other | planned |
| **7 End card** | 81–88 | the full stop falls into the lantern (the 40-frame Ignite), the lockup, the tagline, the call to action | held 2.5 s | planned |

Transitions: ground flood (butter field `#FCE5B0`, Notion's pastel fields in Lantern's amber) behind real UI; object becomes world (the lit glass grows into the Discover window); morph (a panel becomes the next); blur swap (titles); the ember carries the eye. At most one hard cut.

A 40 s cut (S1, S3, S6b, S7, S9, S10) can be made from the same compositions if a shorter film is wanted.

## The launch screen (what reusing Ignite as the loading screen means in code)

The Ignite timeline lives in one file, `ignite.js`, imported by the film's T4 composition and by the app's `splash.html` / `index.html`. The app plays it; HyperFrames seeks it. GSAP is vendored into `remediation/app/static/` (as Chart.js was for the reports). The stacked lockup replaces the icon-glides-left beat; light or night theme follows `prefers-color-scheme`, as the icons do; after frame 108 the lit lantern holds still with the same slow glow breathing the splash has now (functional: it shows the app is alive while it loads; never used in the film); reduced motion shows the final lit frame. Enforced by (to be written with the change): `test_app_page.py` (the splash imports `ignite.js`; only transform and opacity animate; the reduced-motion path) and a render of the same timeline at frames 0, 52, 66 and 108, compared between film and app.

## NARRATION AND SOUND

**A narrator carries the film** (a warm, inviting, natural female voice, conversational, everyday words, no jargon): she says what each act does; the tags are shown, never read aloud. No `say` voice in the film any more.

| Act | Narration (draft; plain words, short sentences) |
|---|---|
| Intro | "Introducing Lantern." … "Nothing left in the dark." … then one of: "Let's turn the lights on." / "Here's how it works." / "Come on in." / "Let me show you." (your pick) |
| Discover | "Every campus is a maze of websites. Lantern starts at the front door, and follows every path, until it has found them all." |
| Scan | "Then it opens each site, follows every link, and collects the files it finds. Every one is checked for accessibility problems, so you know exactly what needs attention." |
| Remediate | "Now for the fixing. Lantern reads each page the way a person would, and finds everything a document needs to be accessible: the headings, the lists, the tables, the reading order. And for every image, it writes a clear description, in plain, human words, so nothing is left out. Then it tags it all, so a screen reader can follow along. The page looks just the same. But now, everyone can use it." |
| Review and Export | "Anything it isn't sure about goes to a person for a quick look. Then everything is exported, neatly organized, and ready to share." |
| Workbench | "And it's not just PDFs. The Workbench makes slide decks accessible, adds captions to presentations, and turns scanned course materials into documents you can edit." |
| Claim | "A whole campus, brought into the light." |
| End card | "Lantern. Nothing left in the dark." |

**The voice** is generated with an open-weight model chosen by ear: Kokoro (Apache 2.0) and Chatterbox (MIT, with an emotion control for a warmer read) are rendered on the same two lines and compared; HeyGen's Voice Turbo is the non-open alternative. Words are timed to the picture (the film is cut to the voice; the intro line "Introducing Lantern" lands as the name lights).
**Music:** none before the ignition, then a sparse warm bed under the voice (about 0.14 volume); the human voice leads.
**Effects:** a landing tick where the ember touches the glass, one low note on ignition (and again at the end card), soft ticks while sites and files appear, a click on each cursor click. No whoosh on every cut.
**Mix:** voice first; bed 3 to 6 dB under; true peak -1 dBTP; about -16 LUFS.

## BANNED (this film)

The defaults in `spec.md`, plus: a glow anywhere but the lantern's light; the lantern docked small in a corner; sparks, particles, rings, trails or a bloom flash on the ember (one soft radial only); Notion's characters, hats, blue, copy or footage; any invented dashboard, file name, person or on-screen number that is not a variable; a title that drifts after it lands; the same entrance for every title; click rings; a second hand-drawn mark; claims about general audio or video transcription or handwriting.

## QA

| Frame | Must show |
|---|---|
| 0 | the real page on paper, cursor present, not black |
| 60, 90 | title landed, dead still, inside the 80% box |
| 282 | unlit lantern, centred, scale settled |
| 310 | the name typed in, muted |
| 330, 345, 355 | the ember on a letter (squash), a later letter, the arc into the glass |
| 345 to 360 | letters pressed by the landing, one at a time |
| 352 | ignition: glass half lit, glow growing, ground unchanged |
| 366, 372, 390 | name full ink from the centre outwards; tagline; the lit glass starting to grow |
| 520, 700, 800 | Discover list; the counter mid-climb; Scan rows pass or fail |
| 960, 1140, 1280, 1400 | the plan table, the three Review views, the held list, the Export folder; UI text at least 28 px |
| 1600 | the S1 page with the caption panel carrying real words |
| 1780, 1900, 2020 | accessible-slides receipt; captions on a slide; scanned page next to its Word result |
| 2150, 2200 | both numerals legible, "held for review" intact |
| 2400, 2519 | end card: lockup 15 to 30% of the width, call to action, held; last frame a clean poster |

Run `npx hyperframes check --json`, `snapshot --review`, and write `REVIEW.md` before any render. Stop at the Studio preview and wait for approval before the delivery render.

## Assets and dependencies

| # | Need | Source | Status |
|---|---|---|---|
| 1 | Bare lantern, lit and unlit | cut out of the light icon in code (the cut-out script and its check sheet are scratch work, rerun to change them) | **built**: `film/assets/lantern-lit.png`, `lantern-unlit.png` |
| 2 | The sample page | **made**: a neutral page (`demo/orientation/orientation-week.pdf`, image-only, no names or contact details), read by the real engine (`remediate pdf`); the page the model read, its blocks with rectangles, and the tag tree (H1, H2, P, list, figure with alt text, footer) are in `film/assets/demo/` | done |
| 3 | Real captures of the Lantern window: Discover, Scan, Remediate, Review, Export, Workbench | the live app on this Mac | I can capture them; the Discover and Scan states with the climbing counts need a rehearsed take or the app run on a small set |
| 4 | A real deck (`.pptx`) with narration and a real scanned handout | the Workbench's own inputs | needs your choice (public, with permission) |
| 5 | The screen-reader voice | **made**: macOS speech (`say`, Samantha) reading the engine's structure, `film/assets/demo/voice.wav` with its timings | done; labelled as a stand-in |
| 6 | Music | `/media-use` or your track | decide |
| 7 | The call to action and where Lantern is distributed | you | needs you |
| 8 | Permission to name Cal State LA | you | needs you |

## Build order

1. Scaffold the project (`film/`), variables, Inter, the tokens above.
2. Lantern assets (done), the ember, a still of every state.
3. **Ignite (T4) alone** (built: `film/assets/ignite.js`, `film/compositions/ignite.html`, `film/index.html`): preview, tune. Then wire the same file into the app's launch screen.
4. T1, T2, T6, then S1 and S7 (they share the page).
5. Captures, T3, T5, T7, then the lifecycle acts S4 to S6.
6. Workbench act S8, claim S9, end card S10, S2 and the S3 hand-off.
7. Sound.
8. `check`, `snapshot --review`, `REVIEW.md`, Studio preview, your approval, then the render.


## v4 structure (built; 108 s with the narrator)

Order: **Intro** (0 to 11 s) · **Bridge** (10.6 to 31.6: Lantern is an accessibility platform for the whole enterprise; documents, slides, course materials, handwritten pages, audio and video, brought into one place, then the lifecycle rail) · **Discover and Scan** as one scene (30.6 to 51: the address bar types `calstatela.edu/` and the path keeps changing; the count rolls on an odometer to the site count; the bar shrinks into the site's toolbar by transform; the crawler, the files, the checks; then the campus-wide count) · **Remediate** (50.6 to 85.2: a vision model, fine-tuned to read like a person, reads the page; hand-drawn boxes appear as a band passes; structure with coloured chips and reading-order badges; the image is boxed first, described, and its alt text written; tags named; the same page lit; a person's review; export) · **Workbench** (84.8 to 99.2: slides, captions, transcripts for audio and video, scanned and handwritten course material into Word and HTML) · **Ending hook** (98.8 to 108.2: the ground goes to night, the file types of the bridge sit dim, the lantern lights them in a wave, "Nothing left in the dark."). A lifecycle rail (Discover, Scan, Remediate, Workbench) with the ember sits over the acts.
Built from: `film/timing.json` (every scene's start and every narration line's start), `film/assets/voice/` (one clip per line, Kokoro Heart), `film/assets/lib/motion.js` (title words, marker strokes, hand-drawn boxes, odometer), `film/scenes/` (the Remediate template) and `film/build_index.py` (writes `index.html`).

---

## v6: lifecycle of four, the Workbench as its own act (current)

**Structure (seconds into the film).** Intro 0–11 · Bridge 10.6–32.0 · Discover, Scan and the campus inventory (one composition, `s-procure`) 31.6–62.4 · Remediate 62.0–91.4 · Export 91.0–103.4 · Workbench 103.0–131.0 · Close 130.6–141.6. Total 141.6 s. The lifecycle rail (Discover, Scan, Remediate, Export) lives from 31.6 to 103.0; the Workbench is not on it.

**Narration (voice: Kokoro Heart, plain take).** Each line is generated clause by clause by `scratchpad/voice/clauses.py`: speed 0.82–1.0, a pause after each clause of 0.14–0.5 s, a small pitch step per clause (+0.5 to −0.5 semitone) and a gain step on the last words of a thought. Lists are spoken as separate beats; the last clause of a sentence is slower and lower; openers and the close are slowest. Clause timings are in `film/assets/voice/voice.json`.

| id | line |
|---|---|
| i1–i3 | Introducing Lantern. / Nothing left in the dark. / Let's turn the lights on! |
| b1–b4 | Lantern is an accessibility platform, built for the whole enterprise. / Documents. Slides. Course materials, even handwritten ones. Audio, and video that needs a transcript. / Lantern brings all of it together, in one place, and makes it accessible, end to end. / So, let's start with the campus lifecycle. |
| d1–d2 | First, discovery. / Lantern starts at the front door of your domain, and follows every path, until it's found every site. |
| s1–s3 | Then, scanning. / It opens each site, follows every link, and gathers the files it finds. / Every one is checked for accessibility problems, so you know exactly what needs attention. |
| c1–c2 | Do that for every site on campus, and something new appears: / a complete inventory, of every file that needs remediation, across your whole domain. |
| r1–r6 | Now comes the fixing. / Lantern uses a vision model, fine-tuned for exactly this, to read each page the way a person would. / It finds everything a document needs to be accessible: the headings, the lists, the tables, the reading order. / And for every image, it writes a clear description, in plain, human words. / Then it tags it all, so a screen reader can follow along. / The page looks just the same. But now, everyone can use it. |
| x1–x2 | And once a file is remediated, you simply replace the original. / The new version looks exactly the same, but carries a complete accessibility layer on top, so it's readable by everyone. |
| w1–w5 | But your campus is more than documents on websites. That's where the Workbench comes in. / Slide decks, made accessible: alt text for pictures, proper titles, and a clear reading order. / Presentations get captions, built from the audio in the slides. / Audio and video get full transcripts, with timestamps, and speakers. / And scanned, or handwritten, course materials, become clean documents, that you can edit, in Word or HTML. |
| e1–e3 | Every document has something to say. / Lantern makes sure, it reaches everyone. / Lantern. |

The closing no longer repeats the opener; the tagline "Nothing left in the dark." is on screen at the end and is not spoken twice.

**Accent system.** Amber is for the lantern, the ember and the light only. Discover blue `#3E7BFA`, Scan teal `#12A3B4`, Remediate violet `#7B5CF0` (structure) and orange `#F2711C` (images), Export green `#2FA463`. Workbench: slides orange, captions rose `#E64980`, transcripts teal, course materials violet; each tool floods the ground with its own tint. Title marks vary (highlighter swipe, wavy underline, hand circle, scribble) and are drawn with `LM.mark2` in `assets/lib/motion.js`: SVG paths revealed by a dash the length of the path.

**Motion rules added.** Connections are cubic S-curves (`LM.curve`) with a pulse of light running along them (`LM.pulse`); one steady sweep (no hopping) for the scan; a shared-element hand-off from the single site to its tile in the campus grid; the lifecycle labels rise from the Bridge into the top rail by transform.

**Open claims to verify before launch.** The app does not yet do handwriting, audio or video transcription, presentation captions or scanned-document conversion as shipped features; the Workbench act shows them as the platform's direction. The campus numbers (283 sites, 11,000 files, 4,900 needing remediation) and the inventory table are placeholders.

---

## v8: final deep polish

**Structure (seconds).** Intro 0–11 · Bridge 10.6–32.0 · Discover, Scan, campus inventory and fingerprints (`s-procure`) 31.6–67.6 · Remediate 67.4–96.8 · Export 96.4–108.8 · Workbench, ending on "keeps growing", 108.4–140.2 · Close 139.8–150.8. Total 150.8 s. Delivery render: 1080p, 60 fps, `--quality delivery`.

**Audio.** The voice is dry and close: no reverb, a little warmth and presence, a gentle compressor, -16 LUFS. One continuous narration track (`assets/voice/narration.wav`). The bed (`bed.wav`) is soft glass notes over a held chord that changes with each scene, ducked by the voice, with no noise. Intro and close sound design (`sfx.wav`) is made by `scratchpad/voice/sfx.py` from the Ignite timeline's own event times (`tl.__events`): a light tick per word the ember reads, a rising tone, a warm swell when the glass lights, a knock and a metal tick as the cap lands, a glass note per letter.

**Numbers (placeholders).** 57,420 files found · 23,986 unique files (by content fingerprint) · 11,341 unique files needing remediation. Fingerprints are shown as the way duplicates are found among everything hosted and the way a changed or updated file is noticed and queued again.

**New narration.** c3 "Every file is fingerprinted too, to find the unique ones, and to catch any that change." · w6 "And the Workbench keeps growing, with more tools, and more features, on the way."

**Intro.** The ember enters on a curve with a short trail, each word is lit amber as it passes and settles to ink, the ink warms as the light gathers, and the camera drifts in while the page is read. All event times are unchanged, so the app's launch timing is too.

---

## v9: the Report phase and the cycle

**Lifecycle of five:** Discover, Scan, **Report**, Remediate, Export (rail colours: blue, teal, magenta, violet, green). After Scan, Lantern writes a **report per site** (files hosted, which need remediation, broken links, a history of the share accessible and of broken links, every file with a download link and what was found in it: tables with no header, images with no alt text, missing tags) that can be shared with the site's owner, and a **master report** that ranks the whole campus (accessibility, documents hosted, broken links, change since the last scan); remediation works from that information. After Export, a **cycle** beat: Lantern runs again on a schedule, so every new upload is found, checked, reported and remediated, one unified workflow.

**New narration:** p1–p6 (Report), cy1–cy3 (cycle). Scenes `s-report` (67.2–109.7) and `s-cycle` (150.3–163.8); everything after the Report moved later by `retime` arithmetic recorded in `timing.json`. Total 205.8 s.

**Numbers (placeholders):** site report 47 files hosted, 19 needing remediation, 6 broken links, 60% accessible, history 31 to 60%; master report 283 sites, 57,420 files, 53% accessible, 1,284 broken links, 11,341 files queued for remediation.

---

## v10: the tagline, the intro line, scheduling, speech-to-text

- **Tagline: "Accessibility, end to end."** It replaces "Nothing left in the dark." everywhere: the film's lockup (`TAGLINE` in the film's `assets/ignite/ignite.js`), the intro (spoken once, as the tagline appears) and the app (`static/brand.js`, read by the launch screen and Home). The intro line "Let's turn the lights on!" is gone.
- **Scheduling** is described generally ("Scheduled runs · run automatically"), never as weekly.
- **Workbench, speech-to-text:** captions and transcripts (audio and video) are made by a speech-to-text model that writes the words from the file's own audio, with their timestamps. The Workbench has a beat for it (w4b): the three sources, the model, and the timestamped words. Speaker labels were removed because nothing says the model separates speakers.
- Report table file names are shortened so a finding never sits on a name.
