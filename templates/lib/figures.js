/* Small ink figures for a film: portraits and avatars drawn in one calm style, plus the motion that brings them to life.
   v2. The drawing is pure vector with no patterns and no tiny dots, so it stays crisp at any size and in any render (the first version used a halftone pattern that turned to pixel noise at avatar size).
   The look: a smooth egg-shaped head in a bold ink outline, ears, neck and shoulders in a flat colour, sculpted hair as a solid ink mass with a few white highlight strokes, small oval eyes, brows, a short nose line,
   a quiet smile, and one flat tone of shade down one side of the face (plus a few deliberate dots on large sizes only). Monochrome faces, so nothing depends on a skin tone.
   A figure is small (56-140 px), sits beside type or inside a card, and is never a big mascot.
   Usage:  html:  LF.avatar("bob", 64)    LF.face("curly", { size: 140, glasses: true, freckles: true })    LF.group(["bob", "short", "bun"], 84)
           motion: LF.pop(tl, "#fig", 1.2);  LF.blink(tl, "#fig", [3, 5.5]);  LF.nod(tl, "#fig", 4);  LF.look(tl, "#fig", 2, -2);  LF.bob(tl, "#fig", 0, 9);  LF.out(tl, "#fig", 8);   */
(function (root) {
  "use strict";
  var INK = "#1D1D1F", DISC = "#E6E3DD", TONE = "#E9E5DE", uid = 0, LF = {};
  var HEAD = "M60 19C80 19 92 35 92 56C92 79 78 100 60 100C42 100 28 79 28 56C28 35 40 19 60 19Z";
  // hair: back (behind the head), front (over it), and white highlight strokes that follow the flow of the hair. Drawn in a 120 x 120 box, head centred at x = 60.
  var HAIR = {
    short: { back: "", front: "M27 53C22 29 38 13 61 13C84 13 98 29 93 53C90 42 83 34 72 31C61 38 44 38 34 44C30 46 28 49 27 53Z", hi: ["M42 22C50 17 62 16 72 19", "M36 33C38 30 40 28 43 26"] },
    bob: { back: "M23 66C16 34 33 11 60 11C87 11 104 34 97 66C97 84 92 96 85 98C86 82 84 64 80 54L40 54C36 64 34 82 35 98C28 96 23 84 23 66Z", front: "M23 62C15 30 34 11 60 11C86 11 105 30 97 62C93 46 84 36 68 31C54 36 40 41 31 52C27 56 25 59 23 62Z", hi: ["M38 22C47 16 62 14 76 18", "M28 62C27 72 28 80 31 88"] },
    curly: { back: "", front: "M29 52C26 30 41 16 60 16C79 16 94 30 91 52C84 38 74 31 60 31C46 31 36 38 29 52Z", hi: [], circles: [[27, 50, 12], [24, 66, 10], [33, 34, 13], [46, 24, 14], [62, 19, 14], [77, 24, 14], [89, 34, 13], [96, 50, 12], [97, 66, 10], [40, 42, 11], [58, 36, 11], [76, 38, 11], [86, 46, 9]] },
    bun: { back: "", front: "M29 52C27 30 41 17 60 17C79 17 93 30 91 52C85 40 75 34 60 34C45 34 35 40 29 52Z", hi: ["M40 24C48 20 58 19 68 21"], circles: [[60, 11, 12]] },
    long: { back: "M22 70C14 34 33 11 60 11C87 11 106 34 98 70C100 90 98 104 106 114L84 114C85 94 84 76 80 58L40 58C36 76 35 94 36 114L14 114C22 104 20 90 22 70Z", front: "M22 66C14 30 34 11 60 11C86 11 106 30 98 66C94 48 84 36 68 31C54 36 40 41 30 54C26 58 24 62 22 66Z", hi: ["M36 24C46 17 62 15 78 19", "M26 78C25 90 26 100 28 108"] },
    cap: { back: "", front: "M25 52C22 28 39 13 60 13C81 13 98 28 95 52C80 46 40 46 25 52ZM20 54C46 46 80 46 106 56L104 63C80 55 46 55 22 62Z", hi: ["M38 22C46 18 58 17 68 19"] }
  };
  LF.styles = Object.keys(HAIR);
  function circlesSvg(cs, ink) { return cs.map(function (c) { return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '" fill="' + ink + '"/>'; }).join(""); }
  // a portrait, head and shoulders. o: size, glasses, freckles, headset, dots (shade dots, default on from 88 px), cloth (the shoulders' colour), brows, mouth ("smile" | "open")
  LF.face = function (style, o) {
    o = o || {}; var s = o.size || 96, h = HAIR[style] || HAIR.short, ink = o.ink || INK, cloth = o.cloth || "#CFCBC3", id = "lf" + (++uid);
    var dots = (o.dots == null ? (s >= 88 && !o.freckles) : o.dots) ? '<g fill="' + ink + '" opacity=".5"><circle cx="84" cy="72" r="1.5"/><circle cx="81" cy="78" r="1.5"/><circle cx="85" cy="82" r="1.5"/><circle cx="78" cy="86" r="1.5"/><circle cx="82" cy="88" r="1.5"/><circle cx="73" cy="91" r="1.5"/></g>' : "";
    var freckles = o.freckles ? '<g fill="' + ink + '" opacity=".6"><circle cx="40" cy="72" r="1.2"/><circle cx="46" cy="75" r="1.2"/><circle cx="42" cy="77.5" r="1.2"/><circle cx="74" cy="75" r="1.2"/><circle cx="80" cy="72" r="1.2"/><circle cx="78" cy="77.5" r="1.2"/></g>' : "";
    var glasses = o.glasses ? '<g fill="none" stroke="' + ink + '" stroke-width="2.3" stroke-linejoin="round"><rect x="35" y="53" width="21" height="15" rx="6.5"/><rect x="64" y="53" width="21" height="15" rx="6.5"/><path d="M56 59.5h8"/><path d="M35 58L28 56M85 58L92 56"/></g>' : "";
    var headset = o.headset ? '<path d="M26 56C24 24 42 10 60 10S96 24 94 56" fill="none" stroke="' + ink + '" stroke-width="3.4" stroke-linecap="round"/><rect x="18" y="50" width="13" height="24" rx="6.5" fill="' + ink + '"/><rect x="89" y="50" width="13" height="24" rx="6.5" fill="' + ink + '"/>' : "";
    var mouth = o.mouth === "open" ? '<path d="M52 80C55 88 65 88 68 80Z" fill="' + ink + '" stroke="' + ink + '" stroke-width="2" stroke-linejoin="round"/>' : '<path d="M52 82C56 86.5 64 86.5 68 82" fill="none" stroke="' + ink + '" stroke-width="2.4" stroke-linecap="round"/>';
    var brows = o.brows === false ? "" : '<g fill="none" stroke="' + ink + '" stroke-width="2.3" stroke-linecap="round"><path d="M40 50C43.5 47.5 49 47.5 53 49.5"/><path d="M67 49.5C71 47.5 76.5 47.5 80 50"/></g>';
    return '<svg class="lf-face" viewBox="0 0 120 120" width="' + s + '" height="' + s + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" shape-rendering="geometricPrecision" style="overflow:visible;display:block">' +
      '<defs><clipPath id="' + id + 'c"><path d="' + HEAD + '"/></clipPath></defs>' +
      (h.back ? '<path d="' + h.back + '" fill="' + ink + '"/>' : "") + (h.circles && style === "curly" ? circlesSvg(h.circles, ink) : "") +
      // shoulders and neck
      '<path d="M12 121C12 106 28 99 47 97L73 97C92 99 108 106 108 121Z" fill="' + cloth + '" stroke="' + ink + '" stroke-width="2.8" stroke-linejoin="round"/>' +
      '<path d="M48 90L48 100C52 104 68 104 72 100L72 90Z" fill="#fff" stroke="' + ink + '" stroke-width="2.8" stroke-linejoin="round"/>' +
      // ears, head, shade
      '<path d="M29.5 55C23 52.5 22 65 30 68" fill="#fff" stroke="' + ink + '" stroke-width="2.8" stroke-linecap="round"/><path d="M90.5 55C97 52.5 98 65 90 68" fill="#fff" stroke="' + ink + '" stroke-width="2.8" stroke-linecap="round"/>' +
      '<path d="' + HEAD + '" fill="#fff"/>' +
      '<g clip-path="url(#' + id + 'c)"><path d="M92 40C93 64 82 94 60 104C72 90 78 70 76 44Z" fill="' + TONE + '"/></g>' + dots +
      '<path d="' + HEAD + '" fill="none" stroke="' + ink + '" stroke-width="2.8" stroke-linejoin="round"/>' +
      // hair over the head
      (h.front ? '<path d="' + h.front + '" fill="' + ink + '" fill-rule="evenodd"/>' : "") + (h.circles && style === "bun" ? circlesSvg(h.circles, ink) : "") +
      (style === "curly" ? '<path d="M31 46C36 34 48 29 60 29C73 29 85 34 90 46C80 40 70 38 60 38C50 38 40 40 31 46Z" fill="' + ink + '"/>' : "") +
      '<g fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".9">' + (h.hi || []).map(function (d) { return '<path d="' + d + '"/>'; }).join("") + "</g>" +
      brows + glasses +
      '<g class="lf-eyes" style="transform-origin:60px 58px"><g class="lf-look"><ellipse cx="47" cy="59" rx="2.5" ry="3.2" fill="' + ink + '"/><ellipse cx="73" cy="59" rx="2.5" ry="3.2" fill="' + ink + '"/></g></g>' +
      freckles + '<path d="M60 60C58.5 66 56 69.5 60.5 70.5" fill="none" stroke="' + ink + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<g class="lf-mouth" style="transform-origin:60px 82px">' + mouth + "</g>" + headset + "</svg>";
  };
  // a portrait in a flat disc (head and shoulders, cropped by the disc), as it sits beside a name in a card
  LF.avatar = function (style, size, o) {
    size = size || 64; o = o || {};
    return '<span class="lf-avatar" style="display:inline-block;position:relative;width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:' + (o.disc || DISC) + ';overflow:hidden;flex:none;transform:translateZ(0)">' +
      '<span style="position:absolute;left:' + (-size * 0.06) + 'px;top:' + (size * 0.06) + 'px">' + LF.face(style, { size: size * 1.12, glasses: o.glasses, freckles: o.freckles, brows: o.brows, headset: o.headset, cloth: o.cloth, dots: o.dots == null ? (size >= 80 && !o.freckles) : o.dots, mouth: o.mouth }) + "</span></span>";
  };
  LF.group = function (styles, size, overlap) {
    var cl = ["#E6E3DD", "#DDE7F5", "#F5E4DA", "#DFF0E6"];
    return '<span class="lf-group" style="display:inline-flex">' + styles.map(function (s, i) { return '<span style="margin-left:' + (i ? -size * (overlap == null ? 0.16 : overlap) : 0) + 'px;border-radius:50%;box-shadow:0 0 0 ' + Math.max(2, size * 0.04) + 'px #fff">' + LF.avatar(s, size, { disc: cl[i % 4] }) + "</span>"; }).join("") + "</span>";
  };

  // ---- motion: every move is a tween on the timeline, nothing runs by itself
  LF.pop = function (tl, sel, t, d) { tl.fromTo(sel, { opacity: 0, scale: 0.85, y: 8, transformOrigin: "50% 80%" }, { opacity: 1, scale: 1, y: 0, duration: d || 0.5, ease: "back.out(1.15)" }, t); };     // arrives: rises a little, grows from 0.85 (never from nothing)
  LF.blink = function (tl, sel, times) { [].concat(times).forEach(function (t) { tl.to(sel + " .lf-eyes", { scaleY: 0.08, duration: 0.07, ease: "power1.in" }, t); tl.to(sel + " .lf-eyes", { scaleY: 1, duration: 0.11, ease: "power1.out" }, t + 0.09); }); };
  LF.nod = function (tl, sel, t, deg) { deg = deg == null ? 5 : deg; tl.to(sel, { rotation: deg, duration: 0.28, ease: "sine.inOut", transformOrigin: "50% 90%" }, t); tl.to(sel, { rotation: 0, duration: 0.4, ease: "sine.inOut" }, t + 0.3); };
  LF.look = function (tl, sel, t, dx, dy) { tl.to(sel + " .lf-look", { x: dx || 0, y: dy || 0, duration: 0.3, ease: "power2.inOut" }, t); };                                                          // the eyes glance (in the face's own units, a few at most)
  LF.talk = function (tl, sel, t, n) { for (var i = 0; i < (n || 4); i++) { tl.to(sel + " .lf-mouth", { scaleY: 1.5, duration: 0.09, ease: "sine.out" }, t + i * 0.22); tl.to(sel + " .lf-mouth", { scaleY: 1, duration: 0.12, ease: "sine.in" }, t + i * 0.22 + 0.1); } };
  LF.bob = function (tl, sel, t, dur) { var n = Math.max(1, Math.round(dur / 2.4)); tl.to(sel, { y: "-=3", duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: n * 2 - 1 }, t); };
  LF.out = function (tl, sel, t) { tl.to(sel, { opacity: 0, scale: 0.92, y: -6, duration: 0.35, ease: "power2.in" }, t); };
  root.LF = LF;
})(window);
