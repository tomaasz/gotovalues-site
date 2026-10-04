#!/usr/bin/env python3
"""Union all shapes of each picosvg file into one compound path per colour; re-add <title>.

Run: uv run --with picosvg python3 finalize.py out/*.svg
"""
import sys
from collections import defaultdict

from picosvg.svg import SVG
from picosvg.svg_pathops import union
from picosvg.svg_types import SVGPath


def finalize(path):
    svg = SVG.parse(path).topicosvg()
    vb = svg.view_box()
    groups = defaultdict(list)
    for shape in svg.shapes():
        groups[shape.fill].append(shape)
    body, boxes = [], []
    for fill, shapes in groups.items():
        paths = [s.as_path().absolute().arcs_to_cubics() for s in shapes]
        merged = SVGPath.from_commands(union([p.as_cmd_seq() for p in paths], [s.fill_rule for s in shapes])).round_floats(2)
        boxes.append(merged.bounding_box())
        body.append(f'  <path fill="{fill}" d="{merged.d}"/>')
    if "-tight" in path:
        pad = 8
        x0 = min(b.x for b in boxes) - pad
        y0 = min(b.y for b in boxes) - pad
        x1 = max(b.x + b.w for b in boxes) + pad
        y1 = max(b.y + b.h for b in boxes) + pad
        vb = type(vb)(round(x0, 2), round(y0, 2), round(x1 - x0, 2), round(y1 - y0, 2))
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb.x:g} {vb.y:g} {vb.w:g} {vb.h:g}" role="img" aria-label="gotovalues">',
           "  <title>gotovalues</title>"] + body
    out.append("</svg>")
    open(path, "w").write("\n".join(out) + "\n")


if __name__ == "__main__":
    for p in sys.argv[1:]:
        finalize(p)
        print("finalized", p)
