/* Ignite (v4): the Lantern name animation, one file for the film and for the app's launch screen.
   mount(container, opts) builds the horizontal lockup (lantern on the left, name on the right) inside `container` (a 1200 x 600 stage, positioned by the caller)
   and returns a PAUSED GSAP timeline of DURATION seconds. The film seeks it (HyperFrames); the app plays it.
   Everything visible is a function of timeline time: no clocks, no random, no repeat, nothing measured while it runs.

   The idea: the lantern is built around a page that gets read. The product, in nine seconds, drawn flat and precise (nothing glossy, nothing that glows until the end).
     0.20 s  a sheet (the sample page the film remediates later), large, settles in; its lines are set in type one after another
     2.70 s  one thin amber scan line crosses the sheet once; behind it each line turns to ink and then to warm brown, and the glass is lit
     4.84 s  the sheet is read, the words melt into the light, one soft glow settles
     5.34 s  the lantern assembles around the light: the cap lowers and settles with a small swing, the base rises into place, the glass takes their weight
     6.14 s  the camera pulls back, the lantern takes its place in the lockup
     6.54 s  the name appears as hairline letters and swells to full weight from left to right as the light reaches each; the t is lit amber
     7.9 s   the tagline clears in

   opts: theme "paper" | "night"; name (letter positions are measured for "lantern" in Manrope 800; another name uses an average advance);
         tagline (default: TAGLINE); assets (folder of the lantern pieces and the font, default "assets"). */
(function (root) {
  "use strict";
  var FPS = 30, DURATION = 8.4, STAGE_W = 1200, STAGE_H = 600;
  var TAGLINE = "Accessibility, end to end.";                                // the app's tagline, in one place: the launch screen, Home and the film all read it from here

  // The wordmark: Manrope (variable, 200 to 800), lowercase, tracking -5%, the t lit amber. Advance widths at weight 800, in em, from the font file; kerning ignored.
  // Each letter sits in a fixed slot of this width, so a letter changing weight never moves its neighbours.
  var NAME = "lantern", ADV_EM = [0.296, 0.583, 0.636, 0.444, 0.608, 0.412, 0.636], LIT = 3;
  var W_GHOST = 200, W_INK = 800, WASH = 0.75, FACE = "Manrope Lantern", FONT_FILE = "fonts/Manrope-var-latin.woff2";
  var TRACK = -0.05, NAME_PX = 150, BASE_OFF = 0.883, XH = 0.54;              // the baseline sits 0.883 em below the top of a line box of line-height 1
  var LANTERN = { h: 340, ratio: 464 / 872, top: 130 };                       // the lantern's box in the lockup
  var G = { x0: 0.065, x1: 0.935, y0: 0.329, y1: 0.893 };                      // the glass, as fractions of the lantern's box
  var GAP = 56, TAG_PX = 30, S0 = 2.0, VX = 843, VY = 300;       // S0: the camera's scale while the words are read; VX, VY: where the vessel sits on the stage
  var THEMES = {
    paper: { ink: "#1D1D1F", ghost: "#8A8A8F", tag: "#6E6E73", glow: 0, shadow: 0.14, line: "#CFCFCA", lit: "#F0A000" },
    night: { ink: "#F5F5F7", ghost: "#7A7A82", tag: "#98989D", glow: 0.55, shadow: 0, line: "#B9B9B4", lit: "#FFB020" }
  };

  function el(tag, cls, css) { var n = document.createElement(tag); if (cls) n.className = cls; if (css) n.style.cssText = css; return n; }
  function img(src, css) { var i = el("img", null, "position:absolute;inset:0;width:100%;height:100%;" + (css || "")); i.src = src; i.alt = ""; return i; }

  function mount(container, opts) {
    opts = opts || {};
    var th = THEMES[opts.theme] || THEMES.paper, name = opts.name || NAME, tagline = opts.tagline == null ? TAGLINE : opts.tagline;
    var dir = (opts.assets || "assets") + "/", i, n = name.length;

    // geometry: the lockup is centred as a whole
    var lw = LANTERN.h * LANTERN.ratio, lh = LANTERN.h, adv = [], left = [], x = 0;
    for (i = 0; i < n; i++) { adv[i] = (name === NAME ? ADV_EM[i] : 0.56) * NAME_PX; left[i] = x; x += adv[i] + TRACK * NAME_PX; }
    var nameW = x - TRACK * NAME_PX, total = lw + GAP + nameW, lx = (STAGE_W - total) / 2, nx = lx + lw + GAP;
    var gcx = lw / 2, gcy = ((G.y0 + G.y1) / 2) * lh;                                  // the glass's centre, in the lantern's box
    var glassY = LANTERN.top + gcy, baseline = glassY + 0.32 * NAME_PX, nameTop = baseline - BASE_OFF * NAME_PX;
    var gl = G.x0 * lw, gw = (G.x1 - G.x0) * lw, gt = G.y0 * lh, gh = (G.y1 - G.y0) * lh;

    container.innerHTML = "";
    container.style.cssText += ";position:absolute;width:" + STAGE_W + "px;height:" + STAGE_H + "px;font-family:'" + FACE + "',Manrope,Arial,sans-serif";
    var face = el("style"); face.textContent = "@font-face{font-family:'" + FACE + "';font-style:normal;font-weight:200 800;font-display:block;src:url('" + dir + FONT_FILE + "') format('woff2')}";
    container.appendChild(face);

    // the lantern: everything that scales with the camera lives in this box
    var lan = el("div", "ig-lantern", "position:absolute;left:" + lx + "px;top:" + LANTERN.top + "px;width:" + lw + "px;height:" + lh + "px");
    var glow = el("div", "ig-glow", "position:absolute;left:" + (gcx - 400) + "px;top:" + (gcy - 400) + "px;width:800px;height:800px;border-radius:50%;opacity:0;background:radial-gradient(closest-side,rgba(255,176,32,.62),rgba(255,176,32,.2) 55%,rgba(255,176,32,0))");
    var shadow = el("div", "ig-shadow", "position:absolute;left:" + (gcx - 80) + "px;top:" + (lh - 8) + "px;width:160px;height:18px;border-radius:50%;opacity:0;background:rgba(0,0,0,1);filter:blur(9px)");
    var base = img(dir + "lantern-base.png", "opacity:0"), backing = img(dir + "lantern-glass-backing.png", "opacity:0"), paper = img(dir + "lantern-glass-paper.png", "opacity:0"), lit = img(dir + "lantern-glass-lit.png"), cap = img(dir + "lantern-cap.png", "opacity:0");
    // the reader: a sentence in large real type that begins blurred and illegible, a vessel (an empty glass, a hairline), and the reading eye.
    // Everything here lives in the lantern's own units, so the camera moves it all together.
    var RF = 92 / S0, RP = 112 / S0, MF = 12.5, WAIT = 36;                                   // word size and line pitch (the camera shows 64 and 78 px), the size the words keep inside the glass, the gap to the vessel
    var AWID = { " ": 0.2, ".": 0.32, N: 0.729, a: 0.583, e: 0.608, g: 0.624, h: 0.636, i: 0.296, m: 0.916, n: 0.636, o: 0.627, p: 0.624, r: 0.412, s: 0.547, t: 0.444, v: 0.568, w: 0.814, y: 0.57 }, RTRK = -0.02, WG = 0.34;   // Manrope 800 advances, in em (from the font file)
    var RLINES = [["Not", "everyone"], ["sees", "a", "page"], ["the", "same", "way."]];
    function emW(w) { var x = 0; for (var q = 0; q < w.length; q++) x += (AWID[w.charAt(q)] || 0.58) + RTRK; return x; }
    var lineEm = RLINES.map(function (ln) { return ln.reduce(function (acc, w) { return acc + emW(w); }, 0) + WG * (ln.length - 1); }), maxEm = Math.max.apply(null, lineEm);
    var rx0 = gl - WAIT - maxEm * RF, words = [], T = 1.1, DUR = [0.234, 0.45, 0.27, 0.162, 0.27, 0.234, 0.27, 0.27], GAPW = 0.07, GAPL = 0.28, FLY = 0.62, wi = 0;
    var mx = gl + gw * 0.13;
    RLINES.forEach(function (ln, k) {
      var ytop = gcy - 1.5 * RP + k * RP + (RP - RF * 1.15) / 2, x = rx0, sx = mx, sy = gt + gh * (0.26 + 0.21 * k);
      ln.forEach(function (w, j) {
        var ww = emW(w) * RF, hh = RF * 1.15, mw = emW(w) * MF;
        var wd = el("div", "ig-w", "position:absolute;left:0;top:0;width:" + ww + "px;height:" + hh + "px;transform-origin:0 0");
        var tx = el("span", null, "position:absolute;left:0;top:0;white-space:nowrap;font-weight:800;font-size:" + RF + "px;line-height:" + hh + "px;letter-spacing:" + (RTRK) + "em;opacity:0"); tx.textContent = w;
        var ul = el("div", null, "position:absolute;left:0;top:" + (hh + RF * 0.02) + "px;width:" + ww + "px;height:" + Math.max(1.6, RF * 0.07) + "px;background:#F2A31B;border-radius:1px;transform-origin:0 50%;transform:scaleX(0)");
        wd.appendChild(tx); wd.appendChild(ul);
        var rec = { wd: wd, tx: tx, ul: ul, x0: x, y0: ytop, w: ww, h: hh, sx: sx, sy: sy, f: MF / RF, tr: T, d: DUR[wi], line: k, ymid: ytop + hh * 0.52, yU: ytop + hh + RF * 0.02 + Math.max(1.6, RF * 0.07) / 2 };
        rec.tf = rec.tr + rec.d + 0.04; words.push(rec); T += DUR[wi] + (j === ln.length - 1 ? GAPL : GAPW); wi++;
        x += ww + WG * RF; sx += mw + WG * MF;
      });
    });
    var tReadEnd = words[words.length - 1].tr + words[words.length - 1].d;
    // the vessel: the glass as a hairline (with the page's folded corner, as in the mark), waiting to be filled
    var VF = gw * 0.2, VR = gw * 0.09, vx = gl, vy = gt, vessel = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    vessel.setAttribute("viewBox", "0 0 " + lw + " " + lh); vessel.style.cssText = "position:absolute;left:0;top:0;width:" + lw + "px;height:" + lh + "px;overflow:visible;opacity:0";
    var vp = document.createElementNS("http://www.w3.org/2000/svg", "path");
    vp.setAttribute("d", "M" + (vx + VR) + " " + vy + "H" + (vx + gw - VF) + "L" + (vx + gw) + " " + (vy + VF) + "V" + (vy + gh - VR) + "Q" + (vx + gw) + " " + (vy + gh) + " " + (vx + gw - VR) + " " + (vy + gh) + "H" + (vx + VR) + "Q" + vx + " " + (vy + gh) + " " + vx + " " + (vy + gh - VR) + "V" + (vy + VR) + "Q" + vx + " " + vy + " " + (vx + VR) + " " + vy + "Z");
    vp.setAttribute("fill", "none"); vp.setAttribute("stroke", "#1D1D1F"); vp.setAttribute("stroke-opacity", ".3"); vp.setAttribute("stroke-width", "1.1"); vp.setAttribute("stroke-linejoin", "round"); vp.setAttribute("pathLength", "1"); vp.setAttribute("stroke-dasharray", "1"); vp.setAttribute("stroke-dashoffset", "1"); vessel.appendChild(vp);
    var level = el("div", "ig-level", "position:absolute;left:" + gl + "px;top:0;width:" + gw + "px;height:1.3px;background:#F2A31B;opacity:0");
    // the reading eye: a ring and a dot, flat, in the amber of the mark
    var EY = 12, eye = el("div", "ig-eye", "position:absolute;left:0;top:0;width:" + EY + "px;height:" + EY + "px;margin:" + (-EY / 2) + "px 0 0 " + (-EY / 2) + "px;border-radius:50%;background:#F2A31B;opacity:0");   // the reader: the film's amber dot, flat, riding the tip of the underline
    [glow, shadow, base, backing, vessel, lit, level].forEach(function (c) { lan.appendChild(c); });
    words.forEach(function (w) { lan.appendChild(w.wd); });
    [eye, cap].forEach(function (c) { lan.appendChild(c); });
    container.appendChild(lan);

    var nameBox = el("div", "ig-name", "position:absolute;left:0;top:" + nameTop + "px;width:" + STAGE_W + "px;height:" + NAME_PX + "px;font-weight:800;font-size:" + NAME_PX + "px;line-height:" + NAME_PX + "px;white-space:nowrap"), letters = [];
    for (i = 0; i < n; i++) {
      var s = el("span", "ig-ltr", "position:absolute;top:0;text-align:center;left:" + (nx + left[i]) + "px;width:" + adv[i] + "px;color:" + th.ghost + ";opacity:0;font-variation-settings:'wght' " + W_GHOST);
      s.textContent = name.charAt(i); nameBox.appendChild(s); letters.push(s);
    }
    var tag = el("div", "ig-tag", "position:absolute;left:" + nx + "px;top:" + (baseline + 62) + "px;font-weight:600;font-size:" + TAG_PX + "px;letter-spacing:-.005em;white-space:nowrap;color:" + th.tag);
    tagline.split(" ").forEach(function (w) { var sp = el("span", "ig-tw", "display:inline-block;opacity:0;margin-right:0.28em"); sp.textContent = w; tag.appendChild(sp); });
    tag.style.opacity = 1;
    container.appendChild(nameBox); container.appendChild(tag);

    var tl = gsap.timeline({ paused: true });
    // the camera: the page starts large in the middle of the stage; the pull-back puts the lantern in its place
    var dx = VX - (lx + gcx), dy = VY - (LANTERN.top + gcy);
    tl.set(lan, { x: dx, y: dy, scale: S0, transformOrigin: gcx + "px " + gcy + "px" }, 0);

    // 1. the vessel is drawn as a hairline and the words are set in type, blurred and illegible: a page nobody can read
    var tLit = 4.84, tRise = 4.24, tRest = tReadEnd, reads = words.map(function (w) { return { t: +w.tr.toFixed(3), d: +w.d.toFixed(3), line: w.line }; });
    tl.set(vessel, { opacity: 1 }, 0.2); tl.to(vp, { strokeDashoffset: 0, duration: 1.0, ease: "power2.inOut" }, 0.2);
    words.forEach(function (w, k) { tl.fromTo(w.tx, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.45 + (w.line * 0.17) + (k % 3) * 0.05); });
    tl.to(lan, { scale: S0 * 1.03, duration: 4.6, ease: "none" }, 0.2);                       // the camera drifts in a little, so nothing is ever perfectly still
    tl.fromTo(eye, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.out" }, words[0].tr - 0.45);

    // 2. the eye reads (paint() draws it from the time): it clears each word as it passes, underlines it, and the word is taken into the glass, which opens with light
    // 3. the eye follows the last word into the glass and becomes its light; the words stay in the glass a moment, then melt into it
    tl.to(words.map(function (w) { return w.wd; }), { opacity: 0, duration: 0.8, ease: "power1.inOut" }, tLit + 0.9);
    tl.to(vessel, { opacity: 0, duration: 0.4, ease: "power1.in" }, tLit);
    tl.fromTo(glow, { opacity: 0, scale: 0.7, transformOrigin: "50% 50%" }, { opacity: th.glow, scale: 1, duration: 1.1, ease: "power2.out" }, tLit);

    // 5. the lantern assembles around the light: the cap lowers and settles with a small swing, the base rises into place, the glass takes their weight
    var tCap = tLit + 0.5;
    tl.fromTo(backing, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power1.out" }, tCap);
    tl.fromTo(cap, { opacity: 0, y: -lh * 0.42, rotation: -4, transformOrigin: "50% 100%" }, { opacity: 1, y: 0, rotation: 0, duration: 0.9, ease: "back.out(0.9)" }, tCap);
    tl.fromTo(base, { opacity: 0, y: lh * 0.3 }, { opacity: 1, y: 0, duration: 0.9, ease: "back.out(0.8)" }, tCap + 0.12);
    [lit].forEach(function (g) {
      tl.fromTo(g, { scaleY: 1, transformOrigin: "50% 100%" }, { scaleY: 0.987, duration: 0.12, ease: "power2.out", immediateRender: false }, tCap + 0.55);
      tl.to(g, { scaleY: 1, duration: 0.4, ease: "power3.out" }, tCap + 0.67);
    });
    tl.fromTo(shadow, { opacity: 0 }, { opacity: th.shadow, duration: 0.8, ease: "power2.out" }, tCap + 0.5);

    // 6. the camera pulls back and the lantern takes its place in the lockup
    var tPull = tCap + 0.8;
    tl.to(lan, { x: 0, y: 0, scale: 1, duration: 1.3, ease: "power3.inOut" }, tPull);

    // 7. the name: hairline letters appear, then the light reaches each, swelling it to full weight and ink, left to right; the t is lit amber
    var tName = tPull + 0.4, ARRIVE = tName + 0.3;
    letters.forEach(function (s, k) { tl.fromTo(s, { opacity: 0, filter: "blur(6px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }, tName + k * 0.085); });
    var state = { p: 0 }, g = [], c = [], a = [];
    function rgb(h) { return [parseInt(h.substr(1, 2), 16), parseInt(h.substr(3, 2), 16), parseInt(h.substr(5, 2), 16)]; }
    g = rgb(th.ghost); c = rgb(th.ink); a = rgb(th.lit);
    var EASE = function (q) { return q < 0.5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2; }, CL = function (v) { return Math.min(Math.max(v, 0), 1); };
    var GREY = [166, 166, 171], INK = [29, 29, 31], WARM = [139, 80, 0], RMAX = 0;
    var mix = function (a, b, e) { return "rgb(" + Math.round(a[0] + (b[0] - a[0]) * e) + "," + Math.round(a[1] + (b[1] - a[1]) * e) + "," + Math.round(a[2] + (b[2] - a[2]) * e) + ")"; };
    function paint() {
      var t = state.p * DURATION, fill = 0;
      words.forEach(function (w) {
        var ps = CL((t - (w.tr - 0.12)) / 0.3), q = CL((t - w.tr) / w.d), e = EASE(CL((t - w.tf) / FLY));
        w.tx.style.filter = ps < 1 ? "blur(" + (1.7 * (1 - ps)).toFixed(2) + "px)" : "none";                    // illegible until it is read
        w.tx.style.color = e > 0 ? mix(INK, WARM, e) : mix(GREY, INK, ps);
        w.ul.style.transform = "scaleX(" + q.toFixed(3) + ")";
        var P0 = [w.x0, w.y0], P1 = [w.x0 + 70, w.y0 - 46], P2 = [w.sx - 70, w.sy - 52], P3 = [w.sx, w.sy], m = 1 - e;
        var X = m * m * m * P0[0] + 3 * m * m * e * P1[0] + 3 * m * e * e * P2[0] + e * e * e * P3[0], Y = m * m * m * P0[1] + 3 * m * m * e * P1[1] + 3 * m * e * e * P2[1] + e * e * e * P3[1], sc = 1 + (w.f - 1) * e;
        w.wd.style.transform = "translate(" + X.toFixed(2) + "px," + Y.toFixed(2) + "px) scale(" + sc.toFixed(4) + ")";
        fill += e;
      });
      fill /= words.length;
      var full = fill > 0.995, fy = gt + gh * (1 - CL(fill)) - 1;                                              // the light rises in the glass as the words arrive
      var cm = full ? "none" : (fill <= 0 ? "inset(100% 0 0 0)" : "inset(" + fy.toFixed(2) + "px 0 0 0)");
      lit.style.clipPath = cm; lit.style.webkitClipPath = cm;
      level.style.top = fy.toFixed(2) + "px"; level.style.opacity = (fill > 0.01 && !full) ? 0.95 : 0;
      // the eye: rides just ahead of the underline, hops to the next word, blinks on a new line, then follows the last word into the glass and becomes its light
      var ex = 0, ey = 0, sy = 1, so = 1;
      if (t < tReadEnd + 0.001) {
        var cur = words.length - 1, i;
        for (i = 0; i < words.length; i++) if (t < words[i].tr + words[i].d + 0.0001) { cur = i; break; }
        var w0 = words[cur], prev = cur > 0 ? words[cur - 1] : null;
        if (t >= w0.tr || !prev) { var qq = CL((t - w0.tr) / w0.d); ex = w0.x0 + w0.w * qq; ey = w0.yU; if (!prev && t < w0.tr) ex = w0.x0 - 18; ey = w0.yU; }
        else { var hgap = w0.tr - (prev.tr + prev.d), hq = CL((t - (prev.tr + prev.d)) / hgap), ge = EASE(hq); ex = (prev.x0 + prev.w) + (w0.x0 - (prev.x0 + prev.w)) * ge; ey = prev.yU + (w0.yU - prev.yU) * ge - 5 * Math.sin(Math.PI * hq); }
      } else {
        var lastw = words[words.length - 1], g2 = EASE(CL((t - tReadEnd) / 0.55)), x1 = lastw.x0 + lastw.w, y1 = lastw.yU;
        ex = x1 + (gcx - x1) * g2; ey = y1 + (gcy - y1) * g2 - 18 * Math.sin(Math.PI * g2);
        so = 1 - EASE(CL((t - (tLit - 0.15)) / 0.45));
      }
      eye.style.transform = "translate(" + ex.toFixed(2) + "px," + ey.toFixed(2) + "px) scale(" + so.toFixed(3) + "," + (so * sy).toFixed(3) + ")";
      if (t > tLit + 0.4) eye.style.opacity = 0;
      for (var k = 0; k < n; k++) {
        var q = Math.min(Math.max((t - (ARRIVE + k * 0.08)) / WASH, 0), 1), e = 1 - Math.pow(1 - q, 3), to = (k === LIT && name === NAME) ? a : c;
        letters[k].style.fontVariationSettings = "'wght' " + Math.round(W_GHOST + (W_INK - W_GHOST) * e);
        letters[k].style.color = "rgb(" + Math.round(g[0] + (to[0] - g[0]) * e) + "," + Math.round(g[1] + (to[1] - g[1]) * e) + "," + Math.round(g[2] + (to[2] - g[2]) * e) + ")";
      }
    }
    tl.to(state, { p: 1, duration: DURATION, ease: "none", onUpdate: paint }, 0);
    paint();

    // 8. the tagline clears in
    tag.querySelectorAll(".ig-tw").forEach(function (w, k) { tl.fromTo(w, { opacity: 0, filter: "blur(7px)", y: 6 }, { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.55, ease: "power3.out" }, ARRIVE + 0.55 + k * 0.1); });
    tl.__events = { reads: reads, rise: tRise, lit: tLit, cap: tCap, pull: tPull, name: tName, arrive: ARRIVE, letters: n };   // read by the film's sound design; no effect on the picture
    tl.set({}, {}, DURATION);
    root.__ignite_end = Math.max(root.__ignite_end || 0, tl.duration());                    // for the build check: the timeline's real length
    return tl;
  }

  root.LanternIgnite = { mount: mount, TAGLINE: TAGLINE, DURATION: DURATION, FPS: FPS, STAGE: { w: STAGE_W, h: STAGE_H } };
})(typeof window !== "undefined" ? window : this);
