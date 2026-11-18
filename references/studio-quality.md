# Studio quality: so nothing feels vibe-coded

"Vibe-coded" is what a film looks like when it was made by accepting the first thing that worked: it moves, it glows, it has the right pieces, and nothing in it was decided. Studio work looks decided. These rules are read **before the idea, before the layout and before every scene**, so the same mistakes are not found by the user one at a time. They were each learned from a real defect in a real film.

## 1. The idea comes first, and it is specific

- Before any code, write the scene as **one sentence a person could draw**: what is seen, what acts on it, what it becomes. "A reading eye takes in words and they fill a glass with light" is an idea. "A glowing page lights up" is an effect.
- Write **three different ideas** and choose one for a reason. The first idea is usually the generic one. Reject anything a template or a stock "reveal" would give.
- The metaphor must be **specific to the product** (what Lantern does is read), carried by **one object the eye follows**, and must end in the film's mark.
- If the user has already rejected a direction, do not offer it again in a new coat of paint. If they say the idea was right and the execution was wrong, keep the idea and rebuild the execution.

## 2. One visual language

- Every element in a film belongs to one family. **Flat, crisp, ink on paper, one accent per section.** A glossy 3D object, a soft glowing orb and a flat editorial card in the same film are three languages, and the mix is what reads as generated.
- A rendered or 3D asset (a lantern, an app icon) may be the **reward at the end** of a flat film, never the style of the first half.
- Light is shown with **contrast, fill and a hairline**, never with blur: no radial glows, no halos, no concentric rings, no bloom, no glossy highlights, no "sparkle". If something must feel lit, fill it with the accent and let the paper stay paper.
- Shadows are small and physical: one soft shadow and a 1 px ring, never a stack of them.

## 3. No placeholders, no filler

- **Real content, set in the film's own type.** No grey dash bars standing for text, no lorem, no blank cards, no icon that means nothing. If text is being "read", it is real words.
- If something is meant to be illegible (an inaccessible document), show it **blurred or low-contrast real text**, not bars.
- An accent colour is used for one meaning. If the same colour appears on six unrelated things, four of them are decoration; remove them.

## 4. Layout is designed, not arranged

For every scene, before building, write: the **one focal object** and where it sits; the **grid** (what aligns to what); the **scale** (the product's real UI at about 1.6-2x its size, type at 28 px or more on screen); the **empty space** and why it is there (never more than ~25% dead space for more than ~3 s); and the **rhythm** against the scenes either side (a dense scene, then a sparse one; never six of the same composition in a row).
- Alternate full-frame type, product UI, a person or badge, and a colour change about every 3-6 s (the Notion rhythm).
- Change the ground colour to change the idea, while the card stays put.
- A small ink figure sits beside type or a card; never decorative, never more than three in frame.
- When a layout is repeated for a long stretch, redesign it; do not keep polishing it.

## 5. Motion is directed

- Every move has a **reason**, a **direction that matches its meaning** (cycles clockwise, progress in reading order, arrowheads point where things go, a glyph's drawn arrowhead matches its rotation), and a **single easing family** per film.
- One camera move per scene at most, slow and eased. Stagger is uneven and shrinks along the group. No hopping, no overshoot on anything large, entrances longer than exits.
- A held frame carries a slow ambient drift (scale 1 to 1.03) so it never freezes.
- Motion is judged on **several frames across the move**, never on one still.

## 6. Details a director would check

Hairlines (1-1.5 px) not borders; corner radii from one set; optical alignment of type to shapes; a type scale of a few fixed steps; text never touching a shape within 16 px; counters and numbers tabular and aligned; the safe areas; contrast 3:1 or better.

## 7. The tells of generated work (any one of these in a frame is a defect)

A glowing orb or comet trail. A soft amber haze behind anything. A gradient on a card or icon "for depth". Over-rounded glossy cards. Placeholder bars. Evenly spaced staggers. The same entrance on everything. A title that blur-fades over a still image. Icons from a stock set in six colours. Emoji. A big mascot. A stage colour used for something that is not that stage. Text in a card smaller than 28 px.

## 7b. No blur, no distortion (hard rule)

Never fade anything in or out through a blur filter, and never tilt, skew or sway text or pages in 3D. A blur-in makes the first frames of a film look low resolution, and a 3D-transformed layer is rasterised once and then scaled, so text turns soft or pixelated under a camera move. Enter and leave with opacity and a short translate; keep text layers in 2D; put text on whole-pixel positions (integer line pitch) so lines keep an even rhythm when a camera scales them; check one full-size frame of every scene that has small text. (Soft *shadows* are fine: they are shadows, not transitions.)

## 7c. Reuse the real asset's states

When one thing becomes another (a page becomes a lantern's glass), use the product asset's own states (the unlit and lit renders share one silhouette, bevel and fold) and reveal one through the other. Do not redraw a look-alike in CSS: its edges, fold and shading will never match the real asset, and the mismatch is the crude hand-off.

## 8. Process, every time

1. Write the idea sentences (three), choose one, and **draw the layout in words** (section 4) before opening an editor.
2. Build it flat and crisp, from real content.
3. Look at the frames **next to a Notion frame doing the same job** ([notion-grammar.md](notion-grammar.md)).
4. Run the creative-director protocol ([creative-director.md](creative-director.md)) twice, with the independent reviewer, and let it change the film.
5. Report what was changed and what the reviewer found that the author had missed.
