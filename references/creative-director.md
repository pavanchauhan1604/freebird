# The creative director

The creative director is not a checker. A checker agrees that nothing is broken; a creative director owns how the film **looks, reads and feels**, and changes it. A review that ends with "looks good" and no design change is a failed review: the Lantern film went through many such passes and still shipped a loop arrow whose head pointed one way while it turned the other, because every pass looked for defects in the list it already had and agreed with what it saw.

The director holds three things: the author's taste ([taste.md](taste.md)), the Notion benchmark ([notion-grammar.md](notion-grammar.md), measured from Notion's own films and compared on contact sheets, never from memory), and the story the narration tells at that second.

## Stance

1. **Assume there are defects and find them.** A pass that finds nothing has not looked hard enough; look again at a different scale before writing "none".
2. **Every verdict is a decision, with a design change attached.** Per scene write one of: **keep** (and name the single strongest thing and what it was measured against), **refine** (name the change), **redesign** (name the new layout). "Fine" is not a verdict.
3. **Minimum output:** at least one concrete design change per scene, and at least one scene redesigned or substantially refined in the whole film. If the film really needs none, show the side-by-side with the Notion sheets that proves it.
4. **Change things.** Write the change as an instruction someone could execute (move, resize, recolour, replace, remove, retime, add), apply it, then look again. The report says what was changed, not only what was found.
5. **Disagree on purpose.** For each scene ask "what would a stronger designer do here instead?" and write the answer, even if the decision is to keep.
6. **Be fresh.** The author of a scene is the worst reviewer of it. Before the second pass, hand the evidence (not the reasoning) to an independent reviewer (a fresh subagent given only the frames, `taste.md`, `notion-grammar.md` and this file) and treat its findings as input the author must act on or answer in writing.

## What to look at, and how (evidence first, opinions second)

Never judge motion from one still. Build the evidence before writing a word:

| Scale | How | What it shows |
|---|---|---|
| The whole film | a contact sheet every ~5 s (`snapshot --at ...`) | rhythm, density, repeated layouts, dead stretches |
| One scene | 8-12 frames across it, at the beats the narration names | what arrives, what leaves, hand-offs |
| One motion | 3-4 frames 0.3-0.6 s apart for anything that moves, turns or travels | direction, speed, overshoot |
| One frame | full size, nothing downsampled | clipping, gaps, alignment, type |
| A boundary | 8-12 frames 0.2 s apart across 1 s either side of every scene change and every beat change | what is still leaving while the next thing arrives: ghosted text, overlaps, pops |
| An animated figure | crops of the figure, enlarged 3x, 0.07 s apart through its action | mouth shapes, blinks, nods, entrances and exits, any shape that stretches or distorts |
| Next to Notion | the same layout beside a Notion frame doing the same job | whether it is as clear, as large, as calm |

## The audits (each one is a table with a row per finding)

**A. Motion semantics: does every movement mean what it says?** List every thing that moves, turns, travels, fills or counts, with its direction, and what that direction means. Then check, on frames:
- a loop or cycle turns **clockwise** with time, and its arrowhead, its travelling light and its sweep all go the same way as each other;
- arrowheads point where things go; a pulse of light runs from source to destination, never backwards;
- progress fills left to right (or in the language's reading direction); counters count up unless they are counting down on purpose; sweeps follow reading order;
- a shared element leaves one scene where the next scene picks it up, at the same size;
- a rotating glyph turns about its own centre, and its rotation direction matches its drawn arrowhead (draw the glyph, then rotate it, then look);
- nothing eases in the wrong sense: arrivals decelerate, exits accelerate, a loop is steady.
One row per moving object. "Not checked" is not an allowed cell.

**B. Meaning: does the picture say what the narration says, at that second?** For each narrated line, write the word that names the thing and the second it lands, and check the visual that names it is on screen at that second (not early, not late). Remove any visual that illustrates nothing in the line.

**C. Layout: would you redesign it?** For every scene answer, in writing:
- What is the one thing the eye lands on first? If two things compete, which one loses?
- How much of the canvas is empty and why? More than ~25% of dead space for more than ~3 s needs a larger object, a centred start or a second arriving object. Notion shows the real UI at 1.6-2x its size; is ours?
- Is the scale right: is any object small enough to be hard to read on a phone?
- Is there a grid: do edges align, do gaps repeat, do like things have equal size?
- What is the rhythm across the film: dense, sparse, dense, or six similar scenes in a row?
- If you could change only one thing to make it better, what is it? Do that thing.

**D. Cleanliness.** Collisions and near misses (anything within 16 px of something else it should not touch); tangents; title underlines touching the next element; labels over content; the same mark or trick used twice in a row; mixed corner radii or shadows; text clipped, wrapped badly or under 28 px; inconsistent type steps; colours outside the stage's accent.

**E. Notion benchmark.** Score each scene 0-2 against the eight shared rules in `notion-grammar.md` (paper ground, one carrier, short verb titles, real UI large and doing the thing, ground colour changes the idea, type becomes UI, one hand-made mark, the end is a click then the mark) and the newer devices listed there (small animated figures, if the film has room for them). A scene scoring under 60% is redesigned, not polished.

**F. Taste.** Check against `taste.md`: ground, ink, accents, marks, cards, motion. Name every place the film is merely competent where it could be distinctive.

**G. Story.** Does each scene earn its time? Is anything said twice? Does the closing avoid repeating the opening? Is any claim larger than the product? Which scene would you cut or shorten, and by how much?

**I. Vibe-coded tells** ([studio-quality.md](studio-quality.md) section 7): look for each tell in every scene (glows, orbs, gradients for depth, placeholder bars, mixed visual languages, uniform stagger, small type, a stage colour on the wrong thing). Each one found is a defect with a fix, not a note.


**J. Hand-offs and boundaries (the choppiness audit).** For every element that enters and every element that leaves, write a row: what it is, when it starts to arrive, when it has fully arrived, when it starts to leave, when it has fully left. Then check the rows against each other at every beat and scene change: an exit must be **finished** before the thing that replaces it starts to arrive (no ghosted text under an arriving logo, no figure still on screen when the next beat is on screen), and an entrance and its exit must use the same path (a figure that rises in from below the frame leaves below the frame). Verify on a boundary strip, not on a still. Anything leaving while something arrives in the same place is a defect.

**K. Animated figures and micro-motion.** Every animated figure (avatars that talk, blink, nod, look; counters; dots) is checked on enlarged crops 0.07 s apart through its whole action. Mouths use real shapes (closed, open, round, narrow), never a stretched smile; eyes blink and open fully; nothing deforms; the motion rests in a clean state. If it moves, someone watches it move.

**L. The hooks.** The first ten seconds and the last ten seconds are reviewed first and longest, as if they were the whole film. Write the one sentence a viewer will remember. Every stage must visibly become the next (a transformation is physically continuous: each frame resembles the one before; no crossfade between unrelated shapes, no pop, no stray object waiting alone in the frame), the camera has one clear job, the sound lands on the beats, and the hand-off into the rest of the film is smooth. A hook that is merely clean is not finished; it must be worth remembering.

**M. Copy-fit (run again every time any wording changes).** Changing a label is a layout change. List every string that changed (`grep` the compositions and the script), and for each one, in every place it appears and in every state it passes through (idle, active, highlighted, shrunk, in a loop or rail), view one **full-size** frame (never only a contact sheet: overflow, off-centre text and cramped chips disappear when a frame is shrunk) at the moment the label is fully visible. Check: the text sits inside its container with at least 12 px of padding, it is centred as designed, it wraps only where the design wraps, neighbours do not touch or collide, and equal siblings stay equal. A longer word in a fixed-size chip, rail, pill, node or table cell is the usual failure ("Remediate" became "Make accessible" and spilled out of a loop node that fitted the old word). The report lists each changed string with the frame times viewed; a string with no full-size frame is "not checked", which is not allowed. Linters do not catch this (the HyperFrames check passed with the broken node), so it is a procedure, not a tool.

**H. Sound** ([sound.md](sound.md)): Earshot `critique` without `--fast`, `sheet` for sync, voice against bed.

## The report (a table, then a list of changes made)

| Scene | Audit | Finding (with the second it is visible) | Design change | Severity | Done |
|---|---|---|---|---|---|

Then: **verdict per scene** (keep / refine / redesign, one line each), **the three highest-impact changes**, **what was changed**, **what the independent reviewer found that the author had missed**, and **what was not checked** (audio by ear, motion watched live).

## Two passes, minimum

1. **Pass 1** on the first complete build: all audits, all scenes, the independent reviewer. Apply the changes.
2. **Pass 2** on the changed film: re-run the audits on everything that moved, plus a fresh whole-film sheet, with the same independent reviewer if possible. Pass 2 must either find new things or state, with the evidence, why there are none.

## Regression list (defects past reviews missed; check these first, every time)

- A talking mouth made by stretching the smile; use real mouth shapes ([figures.js](../templates/lib/figures.js) `LF.talk`).
- Text still fading out while the logo or lockup blurs in over it; figures still on screen when the next beat arrives.
- A figure that enters from below the frame but leaves by fading, or leaves late in a diagonal trail.
- A reader dot floating alone before the thing it reads exists; a crossfade whose square corners peek out behind a rounded shape.

- Blur-in/blur-out transitions, 3D tilt or sway on text, text rasterised soft under a camera scale, uneven line pitch (check one full-size frame).
- A look-alike drawn in CSS standing in for the product asset in a hand-off, instead of its real unlit/lit states.
- A camera that crops the final assembled object (check the frame where the cap lands).
- A relabelled node, chip, pill or rail stage whose new text is longer than the old (text left-aligned, spilling out of or touching the edge of its container). Found by the user, not by the review: audit M exists because of it.
- A hand-off where one thing is still arriving when it is already leaving (faces rising for 0.7 s but leaving after 0.6 s), or a whole lockup that hard-cuts to the next scene's first word with no empty beat.
- An eye blink made by scaling the eyes (they squash, drift off position and vanish): draw the blink as open / half / closed-curve / half / open steps, per face, never in unison.
- A loop's arrowhead pointing against its rotation and against the light that travels around it (Lantern, "unified workflow" scene).
- A label pill touching a title's underline; a chip covering a page footer.
- Evenly spaced stagger that reads as a metronome.
- A scene that holds a still for seconds with no ambient motion.
- A small figure/diagram so small that it is unreadable at phone size.
