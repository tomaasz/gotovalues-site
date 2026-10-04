#!/usr/bin/env python3
"""Final logo kit for gotovalues — direction A "Trasa do wartości" (route g ending in a station dot).

Writes raw SVGs (may contain strokes) to kit/src/; build-kit.sh outlines + unions them into kit/masters/.
"""
import pathlib

import gen

OUT = pathlib.Path(__file__).parent / "build" / "src"
OUT.mkdir(parents=True, exist_ok=True)

INK = "#2A2623"     # brand ink (design tokens --ds-foreground)
SAGE = "#4E8B76"    # brand sage (design tokens --ds-primary) — the "value point"
PAPER = "#FAF8F5"   # brand paper (design tokens --ds-background)


def set_weight(w):
    """Stroke weight for the wordmark; reversed artwork is thinned to counter irradiation."""
    gen.W = w
    gen.RI = gen.RO - w


def symbol(w=26.0, ro=62.0, turn_r=50.0, dot_r=25.0, tail=44.0, centre=(128.0, 124.0), ink=None, dot=SAGE):
    """Route-g symbol on a 256 canvas, bbox-centred on `centre` (slightly above middle = optical centre)."""
    ri = ro - w
    # build at origin: ring centre (0, 0)
    stem_x = ro - w
    stem_bottom = ro * 1.35
    tcx = stem_x + w - turn_r
    tail_y = stem_bottom + turn_r - w
    dot_cx = tcx - tail
    x0, x1 = dot_cx - dot_r, ro
    y0, y1 = -ro, tail_y + w / 2 + dot_r
    dx = centre[0] - (x0 + x1) / 2
    dy = centre[1] - (y0 + y1) / 2
    return [
        (gen.ring(dx, dy, ro, ri), True, ink),
        (gen.rect(dx + stem_x, dy, w, stem_bottom + 1), False, ink),
        (gen.arc(dx + tcx, dy + stem_bottom, turn_r, turn_r - w, 0, 90), False, ink),
        (gen.rect(dx + dot_cx, dy + tail_y, tcx - dot_cx + 1, w), False, ink),
        (gen.disc(dx + dot_cx, dy + tail_y + w / 2, dot_r), False, dot),
    ]


def write(name, elems, vb_w, vb_h, fill):
    (OUT / name).write_text(gen.svg(elems, vb_w, vb_h, "gotovalues", fill=fill))


def main():
    # --- primary wordmark (logo) ---
    set_weight(22.0)
    word, ww = gen.wordmark(x0=34, route_g=True, dot_color=SAGE)
    write("gotovalues-logo.svg", word, ww + 58, 256, INK)
    write("gotovalues-logo-tight.svg", word, ww + 58, 256, INK)
    # --- reversed wordmark: paper letters, thinner by 1.5 units ---
    set_weight(20.5)
    word_r, wwr = gen.wordmark(x0=34, route_g=True, dot_color=SAGE)
    write("gotovalues-logo-reversed.svg", word_r, wwr + 58, 256, PAPER)
    write("gotovalues-logo-reversed-tight.svg", word_r, wwr + 58, 256, PAPER)
    set_weight(22.0)
    # --- symbol ---
    write("gotovalues-symbol.svg", symbol(), 256, 256, INK)
    write("gotovalues-symbol-reversed.svg", symbol(w=24.5), 256, 256, PAPER)
    # --- small-size cut (<= 32 px): heavier strokes, bigger counter and dot, shorter tail ---
    write("gotovalues-symbol-small.svg",
          symbol(w=34.0, ro=68.0, turn_r=52.0, dot_r=30.0, tail=58.0, centre=(128.0, 127.0)), 256, 256, INK)
    write("gotovalues-symbol-small-reversed.svg",
          symbol(w=32.5, ro=68.0, turn_r=52.0, dot_r=30.0, tail=58.0, centre=(128.0, 127.0)), 256, 256, PAPER)
    print("kit src ok")


if __name__ == "__main__":
    main()
