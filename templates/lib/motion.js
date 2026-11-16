/* Shared motion helpers for the film: one place for how titles arrive, how marks are drawn and how numbers roll. Everything is a function of timeline time. */
(function (root) {
  "use strict";
  var LM = { INK: "#1D1D1F", MUTED: "#6E6E73", AMBER: "#FFB020", AMBER_INK: "#B86A00" };

  // a title lands word by word: a small rise and a blur clearing, then it stays dead still
  LM.words = function (tl, sel, t, step) {
    step = step || 0.09;
    document.querySelectorAll(sel + " .w").forEach(function (w, i) { tl.fromTo(w, { opacity: 0, filter: "blur(9px)", y: 8 }, { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.46, ease: "power3.out" }, t + i * step); });
  };
  // a title leaves as one blurred line
  LM.out = function (tl, sel, t, d) { tl.to(sel, { opacity: 0, filter: "blur(10px)", duration: d || 0.32, ease: "power2.in" }, t); };
  // a marker stroke is drawn behind a word (markup: <span class="mk"><i></i>word</span>)
  LM.mark = function (tl, sel, t, d) { tl.fromTo(sel + " i", { scaleX: 0, rotation: -1.2, transformOrigin: "0% 50%" }, { scaleX: 1, duration: d || 0.6, ease: "power2.inOut" }, t); };
  // a hand-drawn rectangle: a path with small, seeded wobbles, so it reads as drawn and never as a CSS border
  LM.wobble = function (x, y, w, h, seed, amp) {
    var s = seed || 1, a = amp || 1.6, r = function () { s = (s * 9301 + 49297) % 233280; return (s / 233280 - 0.5) * 2 * a; };
    var p = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], o = "M" + (x + r()) + " " + (y + r());
    for (var i = 1; i <= 4; i++) { var q = p[i % 4], c = p[i - 1]; o += " Q" + ((c[0] + q[0]) / 2 + r()) + " " + ((c[1] + q[1]) / 2 + r()) + " " + (q[0] + r()) + " " + (q[1] + r()); }
    return o;
  };
  // an odometer: digits that roll; call .set(value) from a paint function (a pure function of time)
  LM.odometer = function (host, digits, size, opts) {
    opts = opts || {}; var H = Math.round(size * 1.04), cols = [], groups = [];
    host.innerHTML = ""; host.style.cssText += ";display:inline-flex;align-items:flex-start;height:" + H + "px;line-height:" + H + "px;font-size:" + size + "px;font-weight:800;letter-spacing:-0.04em;font-variant-numeric:tabular-nums";
    for (var k = digits - 1; k >= 0; k--) {
      var dg = document.createElement("span"); dg.style.cssText = "display:inline-block;height:" + H + "px;width:" + (size * 0.62) + "px;overflow:hidden;text-align:center";
      var col = document.createElement("span"); col.style.cssText = "display:block;will-change:transform"; col.innerHTML = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(function (d) { return '<span style="display:block;height:' + H + 'px">' + d + "</span>"; }).join("");
      dg.appendChild(col); host.appendChild(dg); cols[k] = col; groups[k] = dg;
      if (opts.comma && k % 3 === 0 && k > 0) { var c = document.createElement("span"); c.textContent = ","; c.style.cssText = "display:inline-block;width:" + (size * 0.26) + "px;text-align:center"; host.appendChild(c); groups[k + 0.5] = c; }
    }
    return { set: function (v) {
      v = Math.max(v, 0);
      for (var k = 0; k < digits; k++) {
        // a real odometer: the lowest digit rolls continuously; a higher digit stays put until the digit below it is on its last unit before wrapping, and then it turns with it
        var pos = k === 0 ? v % 10 : Math.floor(v / Math.pow(10, k)) % 10 + Math.min(Math.max((v % Math.pow(10, k)) - (Math.pow(10, k) - 1), 0), 1);   // a higher digit turns only in the last unit before the digits below it wrap, so a settled number is always aligned
        cols[k].style.transform = "translateY(" + (-pos * H) + "px)";
        groups[k].style.opacity = (k > 0 && v < Math.pow(10, k)) ? 0 : 1;                                   // no leading zeros
        if (groups[k + 0.5]) groups[k + 0.5].style.opacity = v < Math.pow(10, k) ? 0 : 1;                  // and no comma in front of a digit that is not there
      }
    } };
  };

  // the accent system: one colour per stage and per tool, amber kept for the lantern, the ember and the light
  LM.C = {
    blue: ["#3E7BFA", "#D8E5FF"], teal: ["#12A3B4", "#CBEEF2"], violet: ["#7B5CF0", "#E5DEFF"], green: ["#2FA463", "#D3EEDD"],
    orange: ["#F2711C", "#FFE1CD"], rose: ["#E64980", "#FFD9E6"], magenta: ["#C93BA6", "#F9D8F0"], ink: ["#1D1D1F", "#E9E9E4"]
  };
  // marks on a word: a highlighter swipe (hl), a clean line drawn under it (ul), both together (hlul), or a rounded outline drawn around it (box)
  // plain elements revealed by a clip or a scale, so nothing shows before it is drawn; circ and scr are the old names of box and ul
  var NS = "http://www.w3.org/2000/svg";
  var ALIAS = { circ: "box", scr: "ul" };
  LM.mark2 = function (tl, sel, kind, col, t, d) {
    kind = ALIAS[kind] || kind; d = d || 0.7;
    var host = document.querySelector(sel); host.style.position = "relative"; host.style.display = "inline-block"; host.style.isolation = "isolate";
    var mk = function (css) { var i = document.createElement("i"); i.setAttribute("aria-hidden", "true"); i.style.cssText = "position:absolute;pointer-events:none;" + css; host.appendChild(i); return i; };
    if (kind === "hl" || kind === "hlul") {
      var h = mk("left:-0.1em;right:-0.1em;top:0.42em;bottom:-0.02em;border-radius:0.16em;background:" + col + ";opacity:0.3;mix-blend-mode:multiply;z-index:-1");
      tl.fromTo(h, { clipPath: "inset(0 100% 0 0)", skewX: -5 }, { clipPath: "inset(0 0% 0 0)", skewX: -5, duration: d, ease: "power3.inOut" }, t);
    }
    if (kind === "ul" || kind === "hlul") {
      var u = mk("left:0;right:0;bottom:-0.1em;height:0.075em;border-radius:0.04em;background:" + col + ";z-index:1");
      tl.fromTo(u, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: d * (kind === "hlul" ? 0.8 : 1), ease: "power3.inOut" }, t + (kind === "hlul" ? d * 0.45 : 0));
    }
    if (kind === "box") {
      var b = mk("left:-0.14em;right:-0.14em;top:0.02em;bottom:-0.04em;border:0.045em solid " + col + ";border-radius:0.2em;z-index:1");
      tl.fromTo(b, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: d, ease: "power3.inOut" }, t);
    }
  };
  // an element travels along a cubic Bezier (P: four [x, y] points, relative to where it sits) while it scales: smooth in both, a pure function of the tween
  LM.follow = function (tl, el, P, t, d, ease, s0, s1) {
    var st = { p: 0 };
    tl.to(st, { p: 1, duration: d, ease: ease || "power3.inOut", onUpdate: function () {
      var q = st.p, m = 1 - q, x = m * m * m * P[0][0] + 3 * m * m * q * P[1][0] + 3 * m * q * q * P[2][0] + q * q * q * P[3][0], y = m * m * m * P[0][1] + 3 * m * m * q * P[1][1] + 3 * m * q * q * P[2][1] + q * q * q * P[3][1];
      gsap.set(el, { x: x, y: y, scale: s0 + (s1 - s0) * q });
    } }, t);
  };
  // a cubic S-curve between two points, left to right: the shape every connection in the film has
  LM.curve = function (x1, y1, x2, y2) { var m = (x1 + x2) / 2; return "M" + x1 + " " + y1 + " C" + m + " " + y1 + " " + m + " " + y2 + " " + x2 + " " + y2; };
  // a pulse of light that runs along a path: a short dash, a pure function of the tween
  LM.pulse = function (tl, path, color, t, d, len) {
    var L = path.getTotalLength(), pl = L * (len || 0.2), pp = document.createElementNS(NS, "path");
    pp.setAttribute("d", path.getAttribute("d")); pp.setAttribute("fill", "none"); pp.setAttribute("stroke", color); pp.setAttribute("stroke-width", 5); pp.setAttribute("stroke-linecap", "butt");
    pp.setAttribute("stroke-dasharray", pl + " " + (L + pl)); pp.setAttribute("stroke-dashoffset", pl); pp.setAttribute("opacity", 0); pp.style.filter = "drop-shadow(0 0 5px " + color + ")";
    path.parentNode.appendChild(pp);
    tl.set(pp, { opacity: 1 }, t); tl.fromTo(pp, { strokeDashoffset: pl }, { strokeDashoffset: -L, duration: d, ease: "power1.inOut" }, t); tl.set(pp, { opacity: 0 }, t + d + 0.02);
    return pp;
  };
  root.LM = LM;
})(window);
