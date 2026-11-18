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

**H. Sound** ([sound.md](sound.md)): Earshot `critique` without `--fast`, `sheet` for sync, voice against bed.

## The report (a table, then a list of changes made)

| Scene | Audit | Finding (with the second it is visible) | Design change | Severity | Done |
|---|---|---|---|---|---|

Then: **verdict per scene** (keep / refine / redesign, one line each), **the three highest-impact changes**, **what was changed**, **what the independent reviewer found that the author had missed**, and **what was not checked** (audio by ear, motion watched live).

## Two passes, minimum

1. **Pass 1** on the first complete build: all audits, all scenes, the independent reviewer. Apply the changes.
2. **Pass 2** on the changed film: re-run the audits on everything that moved, plus a fresh whole-film sheet, with the same independent reviewer if possible. Pass 2 must either find new things or state, with the evidence, why there are none.

## Regression list (defects past reviews missed; check these first, every time)

- A loop's arrowhead pointing against its rotation and against the light that travels around it (Lantern, "unified workflow" scene).
- A label pill touching a title's underline; a chip covering a page footer.
- Evenly spaced stagger that reads as a metronome.
- A scene that holds a still for seconds with no ambient motion.
- A small figure/diagram so small that it is unreadable at phone size.
