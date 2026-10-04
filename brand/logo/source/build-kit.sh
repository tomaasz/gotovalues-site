#!/usr/bin/env bash
# Regenerate the final kit masters: raw SVG -> outline strokes (picosvg) -> union per colour (+ tight crops)
set -euo pipefail
cd "$(dirname "$0")"
python3 kit.py
mkdir -p build/masters
for f in build/src/*.svg; do uvx --quiet --no-build picosvg "$f" > "build/masters/$(basename "$f")"; done
uv run --quiet --no-build --no-project --with picosvg python3 finalize.py build/masters/*.svg
