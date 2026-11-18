/* Ignite (v4): the Lantern name animation, one file for the film and for the app's launch screen.
   mount(container, opts) builds the horizontal lockup (lantern on the left, name on the right) inside `container` (a 1200 x 600 stage, positioned by the caller)
   and returns a PAUSED GSAP timeline of DURATION seconds. The film seeks it (HyperFrames); the app plays it.
   Everything visible is a function of timeline time: no clocks, no random, no repeat, nothing measured while it runs.

   The idea: the lantern is built around a page that gets read. The product, in nine seconds, drawn flat and precise (nothing glossy, nothing that glows until the end).
     0.05 s  one long sheet of real text (Dickens, public domain) lifts in with a soft contact shadow and sways slowly in 3D
     0.60 s  a flat amber dot reads it line by line; each line turns from grey to ink behind the dot
     3.45 s  the dot rests in the middle of the page and the sheet rolls itself up around it, lit from the middle outward, the text wrapping round the cylinder
     4.84 s  the closed cylinder becomes the lantern's glass
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
  var GAP = 56, TAG_PX = 30, S0 = 2.0, S1 = 2.2, VX = 600, VY = 300;       // S0: the camera's scale when the lantern is built; S1: its scale while the sheet is read; VX, VY: where the sheet and the lantern sit on the stage
  var THEMES = {
    paper: { ink: "#1D1D1F", ghost: "#8A8A8F", tag: "#6E6E73", glow: 0, shadow: 0.14, line: "#CFCFCA", lit: "#F0A000" },
    night: { ink: "#F5F5F7", ghost: "#7A7A82", tag: "#98989D", glow: 0.2, shadow: 0, line: "#B9B9B4", lit: "#FFB020" }
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
    var base = img(dir + "lantern-base.png", "opacity:0"), backing = img(dir + "lantern-glass-backing.png", "opacity:0"), paper = img(dir + "lantern-glass-paper.png", "opacity:0"), lit = img(dir + "lantern-glass-lit.png", "opacity:0"), cap = img(dir + "lantern-cap.png", "opacity:0");
    // the sheet: one long sheet of real text, in the film's type, that a light reads line by line and that then rolls itself up around that light into the lantern's glass.
    // The sheet is cut into strips; each strip carries its own slice of the same page and is bent into a cylinder by paint() (a pure function of the time).
    var PW = Math.PI * gw, PH = gh, NS = 32, SW = PW / NS, LW = PW - 68, TX0 = 34;              // the sheet's size: its width is the circumference of the glass, so it closes exactly around it
    var DICK = ["It was the best of times, it was the worst of times,", "it was the age of wisdom, it was the age of foolishness,", "it was the epoch of belief, it was the epoch of incredulity,", "it was the season of Light, it was the season of Darkness,", "it was the spring of hope, it was the winter of despair."];
    var DEM = [22.966, 25.411, 26.431, 26.413, 24.707], FS = LW / Math.max.apply(null, DEM), LP = FS * 1.62, TY0 = (PH - LP * 5) / 2 + (LP - FS) / 2;       // Manrope 600 line widths in em (from the font file); the longest line fills the sheet
    var TW = DEM.map(function (e) { return e * FS; });
    var T0 = 0.6, LD = [0.42, 0.46, 0.48, 0.46, 0.42], LG = 0.12, lines = [], tt = T0;
    DICK.forEach(function (txt, k) { lines.push({ tr: tt, d: LD[k], w: TW[k], y: TY0 + k * LP }); tt += LD[k] + LG; });
    var tReadEnd = lines[4].tr + lines[4].d;
    var sheet = el("div", "ig-sheet", "position:absolute;left:" + (gcx - PW / 2) + "px;top:" + gt + "px;width:" + PW + "px;height:" + PH + "px;transform-style:preserve-3d;opacity:0");
    sheet.setAttribute("data-layout-allow-overlap", "");
    var strips = [];
    for (var si = 0; si < NS; si++) {
      var st = el("div", "ig-strip", "position:absolute;left:" + (si * SW) + "px;top:0;width:" + (SW + 0.7) + "px;height:" + PH + "px;overflow:hidden;background:#FFFFFF;backface-visibility:hidden;-webkit-backface-visibility:hidden;" + (si === 0 ? "border-left:1px solid rgba(0,0,0,.09);" : "") + (si === NS - 1 ? "border-right:1px solid rgba(0,0,0,.09);" : "") + "border-top:1px solid rgba(0,0,0,.09);border-bottom:1px solid rgba(0,0,0,.09);box-sizing:border-box");
      st.setAttribute("data-layout-allow-overlap", "");
      var pg = el("div", null, "position:absolute;left:" + (-si * SW) + "px;top:0;width:" + PW + "px;height:" + PH + "px");
      var grey = el("div", null, "position:absolute;inset:0"), inkw = el("div", null, "position:absolute;inset:0"), warmw = el("div", null, "position:absolute;inset:0;opacity:0"), inks = [], warms = [];
      DICK.forEach(function (txt, k) {
        var mk = function (parent, col, clip) { var d = el("div", null, "position:absolute;left:" + TX0 + "px;top:" + lines[k].y + "px;white-space:nowrap;font-weight:600;font-size:" + FS + "px;line-height:" + (FS * 1.2) + "px;letter-spacing:-.01em;color:" + col + (clip ? ";clip-path:inset(0 100% 0 0)" : "")); d.textContent = txt; parent.appendChild(d); return d; };
        [grey, inkw, warmw].forEach(function (q) { q.setAttribute("data-layout-allow-overlap", ""); });
        mk(grey, "#B3B3B8", false); inks.push(mk(inkw, "#1D1D1F", true)); warms.push(mk(warmw, "rgba(120,66,0,.72)", true));
      });
      var shade = el("div", null, "position:absolute;inset:0;background:#000;opacity:0");
      pg.appendChild(grey); pg.appendChild(inkw); pg.appendChild(warmw); st.appendChild(pg); st.appendChild(shade); sheet.appendChild(st);
      strips.push({ el: st, inkw: inkw, warmw: warmw, inks: inks, warms: warms, shade: shade, s: (si + 0.5) * SW - PW / 2 });
    }
    var csh = el("div", "ig-csh", "position:absolute;left:" + (gcx - PW / 2) + "px;top:" + (gt + PH - 2) + "px;width:" + PW + "px;height:26px;border-radius:50%;background:#000;filter:blur(15px);opacity:0");
    // the reader: a flat amber dot that rides the edge of the ink along each line
    var DOT = 15, dot = el("div", "ig-dot", "position:absolute;left:0;top:0;width:" + DOT + "px;height:" + DOT + "px;margin:" + (-DOT / 2) + "px 0 0 " + (-DOT / 2) + "px;border-radius:50%;background:#F2A31B;opacity:0");
    lan.style.perspective = "900px"; lan.style.perspectiveOrigin = gcx + "px " + gcy + "px";
    [glow, shadow, base, backing, csh, sheet, lit, dot, cap].forEach(function (c) { lan.appendChild(c); });
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
    tl.set(lan, { x: dx, y: dy, scale: S1, transformOrigin: gcx + "px " + gcy + "px" }, 0);

    // 1. the sheet settles in, tilted a little, and lies flat: a long page of real text, still grey and unread
    var tLit = 4.84, tRise = 4.24, tRest = tReadEnd, reads = lines.map(function (l, k) { return { t: +l.tr.toFixed(3), d: +l.d.toFixed(3), line: k }; });
    tl.fromTo(sheet, { opacity: 0, rotationX: 14, y: 26 }, { opacity: 1, rotationX: 0, y: 0, duration: 1.0, ease: "power3.out" }, 0.05);
    tl.fromTo(sheet, { rotationY: -7 }, { rotationY: 6, duration: 3.1, ease: "sine.inOut", immediateRender: false }, 0.2); tl.to(sheet, { rotationY: 0, duration: 0.45, ease: "sine.inOut" }, 3.3);   // a slow sway gives the sheet depth
    tl.to(lan, { scale: S0, duration: 4.5, ease: "power1.inOut" }, 0.4);                         // the camera comes slowly in while the sheet is read and rolled
    tl.fromTo(dot, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power1.out" }, lines[0].tr - 0.3);

    // 2. the light reads each line (paint() draws it from the time); then it goes to the middle of the page and the sheet rolls up around it, lighting as it closes
    // 3. the closed, lit cylinder becomes the lantern's glass
    tl.to(sheet, { opacity: 0, duration: 0.3, ease: "power1.in" }, tLit + 0.05);
    tl.to(lit, { opacity: 1, duration: 0.35, ease: "power1.out" }, tLit - 0.05);
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
    var EASE = function (q) { return q < 0.5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2; }, SINE = function (q) { return 0.5 - 0.5 * Math.cos(Math.PI * q); }, CL = function (v) { return Math.min(Math.max(v, 0), 1); };
    var T_ROLL0 = 3.45, T_ROLL1 = tLit, PAPER = [255, 255, 255], AMB_EDGE = [240, 140, 18], AMB_CORE = [255, 214, 120];
    var mixc = function (a, b, e) { return "rgb(" + Math.round(a[0] + (b[0] - a[0]) * e) + "," + Math.round(a[1] + (b[1] - a[1]) * e) + "," + Math.round(a[2] + (b[2] - a[2]) * e) + ")"; };
    var rgbOf = function (c) { var m = c.match(/\d+/g); return [+m[0], +m[1], +m[2]]; };
    function paint() {
      var t = state.p * DURATION, i, k;
      // the edge of the reading on each line
      var edge = lines.map(function (l) { return l.w * SINE(CL((t - l.tr) / l.d)); });
      // the dot: on the edge of the line being read, a hop down to the next line, then to the middle of the sheet, where it rests as the sheet rolls up around it
      var dx0 = gcx - PW / 2 + TX0, dpx, dpy, dopa = 1, dsc = 1, cur = lines.length - 1;
      for (k = 0; k < lines.length; k++) if (t < lines[k].tr + lines[k].d + LG * 0.5) { cur = k; break; }
      var L = lines[cur], prv = cur > 0 ? lines[cur - 1] : null, ylin = function (l) { return gt + l.y + FS * 1.2; };
      if (t < tReadEnd + 0.0001) {
        if (t >= L.tr || !prv) { dpx = dx0 + edge[cur]; dpy = ylin(L) + 1; if (t < L.tr) { dpx = dx0 - 6; } }
        else { var hq = CL((t - (prv.tr + prv.d)) / (L.tr - (prv.tr + prv.d))), he = EASE(hq); dpx = dx0 + prv.w + (-prv.w) * he; dpy = ylin(prv) + (ylin(L) - ylin(prv)) * he - 6 * Math.sin(Math.PI * hq); }
      } else {
        var lastl = lines[4], mq = EASE(CL((t - tReadEnd) / 0.3)); dpx = dx0 + lastl.w + (gcx - (dx0 + lastl.w)) * mq; dpy = ylin(lastl) + (gcy - ylin(lastl)) * mq - 14 * Math.sin(Math.PI * mq);
        dsc = 1 + 0.5 * SINE(CL((t - T_ROLL0) / (tLit - T_ROLL0))); dopa = 1 - SINE(CL((t - (tLit - 0.5)) / 0.4));
      }
      dot.style.transform = "translate(" + dpx.toFixed(2) + "px," + dpy.toFixed(2) + "px) scale(" + dsc.toFixed(3) + ")"; dot.style.opacity = (t < T0 - 0.3 ? 0 : dopa).toFixed(3);
      // the roll: the sheet is bent into a cylinder of the glass's size (curvature grows with the time); light spreads outward from the middle strips as it closes
      var rp = EASE(CL((t - T_ROLL0) / (T_ROLL1 - T_ROLL0))), kap = (2 * Math.PI / PW) * rp, fl = CL((t - (T_ROLL0 + 0.3)) / (T_ROLL1 - T_ROLL0 - 0.2));
      csh.style.width = (PW - (PW - gw * 1.08) * rp).toFixed(1) + "px"; csh.style.left = (gcx - (PW - (PW - gw * 1.08) * rp) / 2).toFixed(1) + "px"; csh.style.opacity = (CL((t - 0.3) / 0.8) * (1 - CL((t - tLit) / 0.4)) * 0.14).toFixed(3);
      for (i = 0; i < strips.length; i++) {
        var S = strips[i], al = kap * S.s, xo, zo, dd = Math.abs(S.s) / (PW / 2);
        if (kap < 1e-5) { xo = S.s; zo = 0; } else { xo = Math.sin(al) / kap; zo = (Math.cos(al) - 1) / kap; }
        S.el.style.transform = "translate3d(" + (xo - S.s).toFixed(3) + "px,0," + zo.toFixed(3) + "px) rotateY(" + (al * 180 / Math.PI).toFixed(3) + "deg)";
        var amb = CL((fl * 1.5 - dd * 0.95) / 0.45), sh = rp > 0 ? Math.max(0, 1 - Math.cos(Math.min(Math.abs(al), Math.PI / 2))) * 0.22 : 0;
        var core = mixc(AMB_EDGE, AMB_CORE, Math.max(0, Math.cos(Math.min(Math.abs(al), Math.PI / 2))) * (1 - dd * 0.35)); S.el.style.background = amb <= 0 ? "rgb(255,255,255)" : (amb >= 1 ? core : mixc(PAPER, rgbOf(core), amb)); S.shade.style.opacity = sh.toFixed(3); S.warmw.style.opacity = amb.toFixed(3); S.inkw.style.opacity = (1 - amb).toFixed(3);
        for (k = 0; k < lines.length; k++) { var cp = "inset(0 " + Math.max(lines[k].w - edge[k], 0).toFixed(1) + "px 0 0)"; S.inks[k].style.clipPath = cp; S.warms[k].style.clipPath = cp; }
      }
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
