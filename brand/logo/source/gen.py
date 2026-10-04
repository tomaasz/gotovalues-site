#!/usr/bin/env python3
"""Generate gotovalues logo concepts as clean geometric SVG (no live text)."""
import math
import pathlib

OUT = pathlib.Path(__file__).parent
INK = "#000000"

W = 22.0          # stroke weight of the wordmark
XH = 110.0        # x-height
B = 170.0         # baseline
T = B - XH        # x-height top
CY = T + XH / 2   # bowl centre
RO = XH / 2       # bowl outer radius
RI = RO - W       # bowl inner radius
ASC = 22.0        # ascender top (l)
GAP = 16.0        # default letter gap
STROKE = "STROKE:"  # marker for centreline paths that picosvg outlines later


def f(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


def pt(cx, cy, r, a):
    t = math.radians(a)
    return cx + r * math.cos(t), cy + r * math.sin(t)


def arc(cx, cy, ro, ri, a0, a1):
    """Annulus segment from angle a0 to a1 (degrees, SVG y-down, a1 > a0)."""
    large = 1 if (a1 - a0) > 180 else 0
    x0, y0 = pt(cx, cy, ro, a0)
    x1, y1 = pt(cx, cy, ro, a1)
    x2, y2 = pt(cx, cy, ri, a1)
    x3, y3 = pt(cx, cy, ri, a0)
    return (f"M{f(x0)} {f(y0)}A{f(ro)} {f(ro)} 0 {large} 1 {f(x1)} {f(y1)}"
            f"L{f(x2)} {f(y2)}A{f(ri)} {f(ri)} 0 {large} 0 {f(x3)} {f(y3)}Z")


def earc(cx, cy, rxo, ryo, rxi, ryi, a0, a1):
    """Elliptical annulus segment (separate outer/inner radii keep stroke weights controllable)."""
    large = 1 if (a1 - a0) > 180 else 0
    def ep(rx, ry, a):
        t = math.radians(a)
        return cx + rx * math.cos(t), cy + ry * math.sin(t)
    x0, y0 = ep(rxo, ryo, a0); x1, y1 = ep(rxo, ryo, a1)
    x2, y2 = ep(rxi, ryi, a1); x3, y3 = ep(rxi, ryi, a0)
    return (f"M{f(x0)} {f(y0)}A{f(rxo)} {f(ryo)} 0 {large} 1 {f(x1)} {f(y1)}"
            f"L{f(x2)} {f(y2)}A{f(rxi)} {f(ryi)} 0 {large} 0 {f(x3)} {f(y3)}Z")


def ring(cx, cy, ro, ri):
    return (f"M{f(cx - ro)} {f(cy)}a{f(ro)} {f(ro)} 0 1 0 {f(2 * ro)} 0a{f(ro)} {f(ro)} 0 1 0 {f(-2 * ro)} 0Z"
            f"M{f(cx - ri)} {f(cy)}a{f(ri)} {f(ri)} 0 1 1 {f(2 * ri)} 0a{f(ri)} {f(ri)} 0 1 1 {f(-2 * ri)} 0Z")


def disc(cx, cy, r):
    return f"M{f(cx - r)} {f(cy)}a{f(r)} {f(r)} 0 1 0 {f(2 * r)} 0a{f(r)} {f(r)} 0 1 0 {f(-2 * r)} 0Z"


def rect(x, y, w, h):
    return f"M{f(x)} {f(y)}h{f(w)}v{f(h)}h{f(-w)}Z"


def poly(*pts):
    return "M" + "L".join(f"{f(x)} {f(y)}" for x, y in pts) + "Z"


# ---- letters: each returns (list of (path, evenodd)), advance width ----

def letter_o(x, filled=False):
    if filled:
        return [(disc(x + RO, CY, RO), False)], 2 * RO
    return [(ring(x + RO, CY, RO, RI), True)], 2 * RO


def letter_a(x):
    return [(ring(x + RO, CY, RO, RI), True), (rect(x + 2 * RO - W, T, W, XH), False)], 2 * RO


def letter_g_route(x):
    """g whose descender is a route ending in a station dot (concept B)."""
    cx = x + RO
    stem_x = x + 2 * RO - W
    stem_bottom = B + 6
    turn_r = 40.0
    tcx = stem_x + W - turn_r
    tail_y = stem_bottom + turn_r - W
    dot_r = 19.0
    dot_cx = x + 12
    return [(ring(cx, CY, RO, RI), True),
            (rect(stem_x, T, W, stem_bottom - T + 1), False),
            (arc(tcx, stem_bottom, turn_r, turn_r - W, 0, 90), False),
            (rect(dot_cx, tail_y, tcx - dot_cx + 1, W), False),
            (disc(dot_cx, tail_y + W / 2, dot_r), False)], 2 * RO


def letter_g(x):
    cx = x + RO
    stem_bottom = B + 8
    hook_r = RO - 4
    parts = [(ring(cx, CY, RO, RI), True),
             (rect(x + 2 * RO - W, T, W, stem_bottom - T + 1), False),
             (arc(cx - 4 + 0, stem_bottom, hook_r, hook_r - W, 0, 150), False)]
    # shift hook so its right edge aligns with the stem
    parts[2] = (arc(x + 2 * RO - hook_r, stem_bottom, hook_r, hook_r - W, 0, 150), False)
    return parts, 2 * RO


def letter_t(x):
    w = 62.0
    sx = x + 16
    return [(rect(sx, T - 34, W, B - (T - 34)), False), (rect(x, T, w, W), False)], w


def letter_v(x):
    w = 2 * RO
    hw = W / math.cos(math.atan((w / 2) / XH))
    slope = XH / (w / 2)
    apex_in = T + slope * (w / 2 - hw)
    return [(poly((x, T), (x + hw, T), (x + w / 2, apex_in), (x + w - hw, T), (x + w, T), (x + w / 2, B + 3)), False)], w


def letter_l(x):
    return [(rect(x, ASC, W, B - ASC), False)], W


def letter_u(x):
    cy = B - RO
    return [(rect(x, T, W, cy - T + 1), False), (arc(x + RO, cy, RO, RI, 0, 180), False),
            (rect(x + 2 * RO - W, T, W, XH), False)], 2 * RO


def letter_e(x):
    cx = x + RO
    ext = math.degrees(math.asin((W / 2) / RO))
    return [(arc(cx, CY, RO, RI, 40, 360 + ext), False), (rect(x + W / 2, CY - W / 2, 2 * RO - W / 2 - 1, W), False)], 2 * RO


def letter_s(x):
    """Geometric s drawn as a smooth centreline; outlined later by picosvg (stroke -> fill)."""
    t = T
    pts = (f"M{f(x+60)} {f(t+25)}"
           f"C{f(x+55)} {f(t+15)} {f(x+46)} {f(t+11)} {f(x+35)} {f(t+11)}"
           f"C{f(x+21)} {f(t+11)} {f(x+12)} {f(t+20)} {f(x+12)} {f(t+31)}"
           f"C{f(x+12)} {f(t+46)} {f(x+28)} {f(t+51)} {f(x+38)} {f(t+54.5)}"
           f"C{f(x+49)} {f(t+58)} {f(x+59)} {f(t+65)} {f(x+59)} {f(t+79)}"
           f"C{f(x+59)} {f(t+91)} {f(x+49)} {f(t+99)} {f(x+35)} {f(t+99)}"
           f"C{f(x+21)} {f(t+99)} {f(x+11)} {f(t+92)} {f(x+6)} {f(t+82)}")
    return [(STROKE + pts, False)], 70.0


LETTERS = {"g": letter_g, "o": letter_o, "t": letter_t, "v": letter_v, "a": letter_a, "l": letter_l, "u": letter_u, "e": letter_e, "s": letter_s}
TIGHT = {("t", "o"): -6, ("o", "t"): -4, ("o", "v"): -6, ("v", "a"): -6, ("a", "l"): 2, ("l", "u"): 2}


def _glyph(ch, i, x, filled_index, route_g):
    """Return (parts, advance) for one letter of the wordmark."""
    if ch == "o":
        return letter_o(x, filled=(i == filled_index))
    if ch == "g" and route_g:
        return letter_g_route(x)
    return LETTERS[ch](x)


def wordmark(x0=0.0, filled_index=None, accent=None, route_g=False, dot_color=None):
    word = "gotovalues"
    x = x0
    out = []
    for i, ch in enumerate(word):
        parts, adv = _glyph(ch, i, x, filled_index, route_g)
        color = accent if (i == filled_index and accent) else None
        out.extend((p, eo, color) for p, eo in parts)
        if ch == "g" and route_g and dot_color:
            # the station dot (last part of the route g) carries the brand accent
            out[-1] = (out[-1][0], out[-1][1], dot_color)
        nxt = word[i + 1] if i + 1 < len(word) else None
        x += adv + (GAP + TIGHT.get((ch, nxt), 0) if nxt else 0)
    return out, x - x0


def svg(elems, vb_w, vb_h, title, fill=INK):
    body = []
    for p, eo, color in elems:
        if p.startswith(STROKE):
            sc = color or fill
            body.append(f'  <path fill="none" stroke="{sc}" stroke-width="{f(W - 1)}" d="{p[len(STROKE):]}"/>')
            continue
        attr = ' fill-rule="evenodd"' if eo else ""
        c = f' fill="{color}"' if color else ""
        body.append(f'  <path{attr}{c} d="{p}"/>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(vb_w)} {f(vb_h)}" role="img" aria-label="{title}">\n'
            f'  <title>{title}</title>\n  <g fill="{fill}">\n' + "\n".join("  " + b for b in body) + "\n  </g>\n</svg>\n")


def _paths(elems):
    out = []
    for p, eo, c in elems:
        if p.startswith(STROKE):
            out.append(f'<path fill="none" stroke="{c or INK}" stroke-width="{f(W - 1)}" d="{p[len(STROKE):]}"/>')
            continue
        attr = ' fill-rule="evenodd"' if eo else ""
        col = f' fill="{c}"' if c else ""
        out.append(f'<path{attr}{col} d="{p}"/>')
    return "".join(out)


def lockup(symbol_elems, word_elems, word_w, title, s_scale=0.72, gap=40.0):
    """Horizontal lockup, height 256: symbol (256 box) scaled down beside the full-size wordmark."""
    sym_w = 256 * s_scale
    sy = (256 - sym_w) / 2 - 4
    pad = 24.0
    total_w = pad + sym_w + gap + word_w + pad
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(total_w)} 256" role="img" aria-label="{title}">\n'
            f'  <title>{title}</title>\n  <g fill="{INK}">'
            f'<g transform="translate({f(pad)} {f(sy)}) scale({s_scale})">{_paths(symbol_elems)}</g>'
            f'<g transform="translate({f(pad + sym_w + gap)} 0)">{_paths(word_elems)}</g>'
            "</g>\n</svg>\n")


# ---------------- Concept A: wordmark "goto●values" ----------------

def concept_a():
    elems, w = wordmark(x0=24, filled_index=3)
    vb_w = w + 48
    (OUT / "a-lockup.svg").write_text(svg(elems, vb_w, 256, "gotovalues"))
    # symbol: "o●" pair, the journey compressed
    sym = [(ring(72, 128, 54, 32), True, None), (disc(184, 128, 54), False, None)]
    (OUT / "a-symbol.svg").write_text(svg(sym, 256, 256, "gotovalues"))


# ---------------- Concept B: g as a route ending at a station ----------------

def concept_b_elems():
    w = 26.0
    cx, cy, ro = 131.5, 84.0, 62.0
    ri = ro - w
    stem_x = cx + ro - w
    stem_bottom = 168.0
    turn_r = 50.0
    tcx = stem_x + w - turn_r
    tail_y = stem_bottom + turn_r - w
    dot_r = 25.0
    dot_cx = 87.5
    return [
        (ring(cx, cy, ro, ri), True, None),
        (rect(stem_x, cy, w, stem_bottom - cy + 1), False, None),
        (arc(tcx, stem_bottom, turn_r, turn_r - w, 0, 90), False, None),
        (rect(dot_cx, tail_y, tcx - dot_cx + 1, w), False, None),
        (disc(dot_cx, tail_y + w / 2, dot_r), False, None),
    ]


def concept_b():
    sym = concept_b_elems()
    (OUT / "b-symbol.svg").write_text(svg(sym, 256, 256, "gotovalues"))
    # the lockup IS the wordmark: its own g carries the route, no duplicate symbol
    word, ww = wordmark(x0=34, route_g=True)
    (OUT / "b-lockup.svg").write_text(svg(word, ww + 34 + 24, 256, "gotovalues"))


# ---------------- Concept C: v-pointer onto a value point ----------------

def concept_c_elems():
    t = 32.0                                  # perpendicular stroke
    a = math.radians(60)                      # exact 60-degree arms
    hw = t / math.sin(a)                      # horizontal stroke width
    top, apex = 34.0, 144.0
    half = (apex - top) / math.tan(a)
    inner = apex - t / math.cos(a)
    cx = 128.0
    chevron = poly((cx - half, top), (cx - half + hw, top), (cx, inner), (cx + half - hw, top),
                   (cx + half, top), (cx, apex))
    return [(chevron, False, None), (disc(cx, 196, 30), False, None)]


def concept_c():
    sym = concept_c_elems()
    (OUT / "c-symbol.svg").write_text(svg(sym, 256, 256, "gotovalues"))
    word, ww = wordmark(x0=0)
    (OUT / "c-lockup.svg").write_text(lockup(sym, word, ww, "gotovalues"))


if __name__ == "__main__":
    concept_a()
    concept_b()
    concept_c()
    print("ok")
