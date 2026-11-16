// Move the real cursor smoothly and click, from the terminal (needs Accessibility for the terminal app).
//   osascript -l JavaScript tap.js '[x,y,w,h]' '[[fx,fy],...]'      window rectangle in points, then click targets as fractions of the window
// Safe by construction: every target lies inside the window rectangle; nothing else is clicked.
ObjC.import("CoreGraphics"); ObjC.import("Foundation"); ObjC.import("AppKit");
function sleep(s) { $.NSThread.sleepForTimeInterval(s); }
function post(type, x, y) { var e = $.CGEventCreateMouseEvent(null, type, $.CGPointMake(x, y), $.kCGMouseButtonLeft); $.CGEventPost($.kCGHIDEventTap, e); }
function loc() { var p = $.CGEventGetLocation($.CGEventCreate(null)); return [p.x, p.y]; }
function glide(x1, y1, steps) { var p = loc(), x0 = p[0], y0 = p[1]; for (var i = 1; i <= steps; i++) { var q = i / steps, e = q * q * (3 - 2 * q); post($.kCGEventMouseMoved, x0 + (x1 - x0) * e, y0 + (y1 - y0) * e); sleep(0.012); } }
function tap(x, y) { glide(x, y, 28); sleep(0.12); post($.kCGEventLeftMouseDown, x, y); sleep(0.07); post($.kCGEventLeftMouseUp, x, y); sleep(0.45); }
function run(argv) {
  var win = JSON.parse(argv[0]), wx = win[0], wy = win[1], ww = win[2], wh = win[3];
  var keys = JSON.parse(argv[1]).filter(function (k) { return k[0] >= 0 && k[0] <= 1 && k[1] >= 0 && k[1] <= 1; });
  keys.forEach(function (k) { tap(wx + k[0] * ww, wy + k[1] * wh); });
  glide(wx + ww + 140, wy + wh * 0.5, 30);                                                           // leave the window
  return "tapped " + keys.length + " keys";
}
