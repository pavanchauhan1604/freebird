# Taste: the visual system

This is the author's taste, written as rules you can apply and check. It was arrived at by reviewing real frames over many passes; when a rule seems arbitrary, it usually fixed a specific defect (noted in brackets).

## Ground, ink, type

| | |
|---|---|
| Paper ground | `#f6f6f3` (night ground for the closing: `#0b0b0f`) |
| Ink / muted | `#1d1d1f` / `#6e6e73`; quiet labels `#86868B` (passes 3:1 on paper) |
| Titles | Manrope 800, 84 px, line-height 1.08, tracking −0.04em, words land one by one |
| Body in cards | Manrope 700–800, **never below 28 px** (the type floor; smaller is flagged and unreadable on a phone) |
| Numbers | Manrope 800, tabular, rolled by an odometer |
| Wordmark | lowercase, Manrope, the one accent letter lit amber |

Manrope ships under the SIL OFL (`templates/fonts/`). Load fonts as local files with `@font-face` (`font-display: block`); only bundled fonts resolve by name.

## Colour: one accent per stage, amber for the light

Define pairs (strong, pastel) in `LM.C` (`templates/lib/motion.js`): blue `#3E7BFA / #D8E5FF`, teal `#12A3B4 / #CBEEF2`, violet `#7B5CF0 / #E5DEFF`, green `#2FA463 / #D3EEDD`, orange `#F2711C / #FFE1CD`, rose `#E64980 / #FFD9E6`, magenta `#C93BA6 / #F9D8F0`.

- Each lifecycle stage owns a colour and keeps it everywhere (rail label, title mark, chips, charts). Each tool in a side act owns one and **floods the ground** with its own tint (`#FFF1E8` orange, `#FFEDF3` rose, `#E6F6F8` teal, `#F0ECFF` violet) while it is shown.
- **Amber (`#FFB020`) belongs to the product's light only:** the ember, the glow, the lit letter, the lantern. [One yellow highlight on every title went bland after a minute.]
- Status colours are stable: green accessible/passed, orange needs fixing, rose broken, violet structure.
- Use a darker green (`#238A50`) for text on paper; `#2FA463` fails contrast as small text.

## Marks on words (`LM.mark2`)

`hl` (highlighter swipe, 30% accent, skewed −5°, multiply), `ul` (a clean straight line, 0.075 em, drawn left to right), `hlul` (both: swipe then line), `box` (a rounded outline drawn around it). Vary them within a scene and across scenes, always in the stage's accent. They are HTML elements revealed by a clip or a scale, so nothing shows before it is drawn. [Hand-drawn wobbly circles, scribbles and rectangles read as a trick used "here and there"; the clean highlight-plus-line combination is the one that was liked and then refined.] Hand-drawn strokes are allowed only as **content** (a handwritten page being read).

## Cards and layout

White cards, radius 24–30, shadow `0 24px 48px rgba(0,0,0,.10)` plus a 1 px ring, pastel inner tiles, chips with a pastel fill and a strong text colour. Keep content inside the 90 % action-safe box; a persistent top rail occupies y < 75, so no card, pill or label may enter it (the accessibility layer once rose into the rail and was fixed). Give every scene one clear focal object and let it breathe; fill dead space by making the focal object larger or by centring it and letting it slide aside when a second object arrives, not by adding decoration.

## Motion

- Words: blur 9 px → 0, rise 8 px, 0.46 s, stagger 0.09–0.12 s; leave as one blurred line (0.32–0.4 s).
- Cards: opacity, 14–24 px rise, blur 6–8 px → 0, `power3.out`, 0.6–0.9 s. Leave with blur 8–10 px, `power2.in`.
- Scenes overlap by 0.4 s; nothing hard-cuts. A shared element hands off between scenes (a page leaves one scene at the same place and size another begins with it).
- Connections are cubic S-curves (`LM.curve`) with a short pulse of light (`LM.pulse`); an object that travels follows a Bézier (`LM.follow`) with smooth ease in both position and scale. **No hopping with trace lines** [it looked weird]; a single steady sweep (`ease: none`) reads as scanning.
- Numbers roll on a true odometer (`LM.odometer`: a higher digit turns only in the last unit before the digits below wrap, so a settled number is always aligned) and are set from a `paint()` of timeline time.
- Text and state that change over time are computed from time in `paint()`; never in callbacks.
- A slow drift on large objects (scale 1 → 1.03 over seconds) keeps stills alive. A thin ring of light, a trail behind an ember, a word lit amber as it is read, then settling to ink are the "premium" touches.

## Small figures (from the Notion benchmark)

A film has room for **small ink figures** that make it feel made by people: faces and avatars at 56-120 px, drawn in one style (white face, bold ink outline, solid hair, dot eyes, a stipple shade on one side), from `templates/lib/figures.js`. Use them where a person is part of the story: the owner who receives a report, the reviewer a file goes to, the uploader of a new file, the teacher with a handwritten page. They sit **beside type or inside a card** (grey avatar disc, name in bold), arrive with `LF.pop`, blink or nod once, and leave with the scene. Never a big mascot, never the same face for two different people, never more than three in a frame, never over the accent colour of a stage. The film's one carrier stays the ember.

## Content in frames

- A neutral sample document (a generic orientation page), generic file names (`handbook.pdf`), generic site names. No phone numbers, emails, people.
- Placeholder numbers must look measured, not round: 57,420 / 23,986 / 11,341, 47 files, 60 %. Say they are placeholders in `SPEC.md`.
- Keep file names short enough that chips never touch them (`handbook.pdf`, `events.pdf`); give the name column a fixed width and keep chips to the longest label it must hold ("No table header", "Tags missing").
- Show the product's **result and mechanism** (a page being read, structure found, a file replaced, a score ranked), not its settings screens.
