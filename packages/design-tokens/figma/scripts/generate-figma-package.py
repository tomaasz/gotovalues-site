#!/usr/bin/env python3
"""
Generate complete Figma Design System setup package.
Creates:
  - figma-variables-import.json (for plugin import)
  - figma-color-styles.json (color styles in Figma format)
  - figma-text-styles.json (typography styles)
  - figma-components-spec.json (component specifications)
  - README-import.md (step-by-step guide)
"""

import json
import os

OUT_DIR = os.path.dirname(os.path.abspath(__file__))

# ── Color variables (Figma-compatible format) ────────────────────────────

color_variables = []
color_styles = []

semantic_colors_light = {
    "background": ("hsl(42, 26%, 96%)", "#FAF8F5", "Page background"),
    "foreground": ("hsl(30, 10%, 15%)", "#2A2623", "Primary text"),
    "card": ("hsl(0, 0%, 100%)", "#FFFFFF", "Card surfaces"),
    "card-foreground": ("hsl(30, 10%, 15%)", "#2A2623", "Card text"),
    "primary": ("hsl(162, 28%, 38%)", "#4E8B76", "Brand accent"),
    "primary-foreground": ("hsl(0, 0%, 100%)", "#FFFFFF", "On-accent text"),
    "secondary": ("hsl(42, 14%, 89%)", "#E8E4DC", "Secondary surfaces"),
    "secondary-foreground": ("hsl(30, 10%, 20%)", "#38322D", "Secondary text"),
    "muted": ("hsl(38, 12%, 91%)", "#ECE9E4", "Muted backgrounds"),
    "muted-foreground": ("hsl(30, 8%, 38%)", "#5E5A54", "Muted text (4.5:1)"),
    "accent": ("hsl(162, 28%, 38%)", "#4E8B76", "Accent color"),
    "accent-foreground": ("hsl(0, 0%, 100%)", "#FFFFFF", "On-accent text"),
    "destructive": ("hsl(0, 72%, 51%)", "#DC2626", "Error/destructive"),
    "destructive-foreground": ("hsl(0, 0%, 100%)", "#FFFFFF", "On-destructive text"),
    "border": ("hsl(35, 15%, 82%)", "#D4CFC7", "Borders"),
    "input": ("hsl(35, 15%, 82%)", "#D4CFC7", "Input borders"),
    "ring": ("hsl(162, 28%, 38%)", "#4E8B76", "Focus rings"),
}

primitive_scales = {
    "green": [
        ("50",  "hsl(162, 40%, 96%)", "#f0f8f5"),
        ("100", "hsl(162, 38%, 90%)", "#d8f0e6"),
        ("200", "hsl(162, 35%, 80%)", "#b3e0cd"),
        ("300", "hsl(162, 32%, 65%)", "#7acca6"),
        ("400", "hsl(162, 30%, 50%)", "#59b38c"),
        ("500", "hsl(162, 30%, 42%)", "#4a9975"),
        ("600", "hsl(162, 32%, 35%)", "#3c7d60"),
        ("700", "hsl(162, 34%, 28%)", "#2e614a"),
        ("800", "hsl(162, 35%, 20%)", "#1f4535"),
        ("900", "hsl(162, 38%, 14%)", "#152e24"),
    ],
    "warm": [
        ("50",  "hsl(42, 26%, 97%)", "#faf9f5"),
        ("100", "hsl(42, 26%, 94%)", "#f5f3eb"),
        ("200", "hsl(40, 20%, 88%)", "#e6e2d8"),
        ("300", "hsl(38, 16%, 82%)", "#d6d1c4"),
        ("400", "hsl(36, 14%, 72%)", "#beb8a8"),
        ("500", "hsl(34, 12%, 60%)", "#a09a8a"),
        ("600", "hsl(32, 10%, 45%)", "#7a7467"),
        ("700", "hsl(30, 10%, 32%)", "#57524a"),
        ("800", "hsl(30, 10%, 20%)", "#38322d"),
        ("900", "hsl(30, 10%, 12%)", "#22201c"),
    ],
    "gray": [
        ("50",  "hsl(210, 20%, 98%)", "#f8fafb"),
        ("100", "hsl(210, 16%, 93%)", "#ecf0f3"),
        ("200", "hsl(210, 14%, 86%)", "#d9dfe4"),
        ("300", "hsl(210, 12%, 76%)", "#bcc4cc"),
        ("400", "hsl(210, 10%, 62%)", "#94a0ab"),
        ("500", "hsl(210, 8%, 50%)", "#76828c"),
        ("600", "hsl(210, 10%, 38%)", "#58636e"),
        ("700", "hsl(210, 12%, 26%)", "#3d454f"),
        ("800", "hsl(210, 14%, 16%)", "#262b31"),
        ("900", "hsl(210, 16%, 8%)", "#14171a"),
    ],
}

# Build variables
for name, (hsl_val, hex_val, desc) in semantic_colors_light.items():
    color_variables.append({
        "collection": "semantic/light",
        "name": name,
        "type": "COLOR",
        "value": hsl_val,
        "hex": hex_val,
        "description": desc,
    })
    color_styles.append({
        "name": f"semantic/{name}",
        "type": "FILL",
        "value": hex_val,
        "description": desc,
    })

for family, steps in primitive_scales.items():
    for step, hsl_val, hex_val in steps:
        color_variables.append({
            "collection": f"primitive/{family}",
            "name": step,
            "type": "COLOR",
            "value": hsl_val,
            "hex": hex_val,
            "description": f"{family.capitalize()} {step}",
        })

# ── Typography styles ────────────────────────────────────────────────────

text_styles = [
    {"name": "display/hero",    "family": "Fraunces", "weight": 600, "size": 80, "lineHeight": "92%",  "letterSpacing": "-4.5%"},
    {"name": "heading/h1",      "family": "Fraunces", "weight": 600, "size": 48, "lineHeight": "98%",  "letterSpacing": "-4.5%"},
    {"name": "heading/h2",      "family": "Fraunces", "weight": 600, "size": 36, "lineHeight": "98%",  "letterSpacing": "-4.5%"},
    {"name": "heading/h3",      "family": "Fraunces", "weight": 600, "size": 24, "lineHeight": "98%",  "letterSpacing": "-4.5%"},
    {"name": "body/large",      "family": "Manrope",  "weight": 400, "size": 18, "lineHeight": "150%", "letterSpacing": "0%"},
    {"name": "body/default",    "family": "Manrope",  "weight": 400, "size": 16, "lineHeight": "150%", "letterSpacing": "0%"},
    {"name": "body/small",      "family": "Manrope",  "weight": 400, "size": 14, "lineHeight": "150%", "letterSpacing": "0%"},
    {"name": "ui/label",        "family": "Manrope",  "weight": 700, "size": 13, "lineHeight": "130%", "letterSpacing": "0%"},
    {"name": "ui/eyebrow",      "family": "Manrope",  "weight": 700, "size": 13, "lineHeight": "130%", "letterSpacing": "14%"},
    {"name": "ui/caption",      "family": "Manrope",  "weight": 400, "size": 12, "lineHeight": "150%", "letterSpacing": "0%"},
]

# ── Component specs (for manual Figma construction) ──────────────────────

component_specs = {
    "button": {
        "description": "Primary action button with 6 variants and 4 sizes",
        "variants": {
            "variant": ["default", "secondary", "outline", "destructive", "ghost", "link"],
            "size": ["sm (36px)", "default (40px)", "lg (44px)", "icon (36px)"],
            "state": ["default", "hover", "focus", "disabled", "loading"],
        },
        "properties": {
            "radius": "9999px (pill)",
            "padding": "0 16px (default), 0 12px (sm), 0 32px (lg)",
            "gap": "8px",
            "fontSize": "14px",
            "fontWeight": "500",
        },
    },
    "input": {
        "description": "Text input field",
        "variants": {
            "state": ["default", "focus", "disabled", "error"],
            "type": ["text", "email", "password", "number"],
        },
        "properties": {
            "height": "40px",
            "padding": "8px 12px",
            "radius": "8px",
            "borderColor": "border",
            "fontSize": "14px",
        },
    },
    "card": {
        "description": "Container with header, content, and footer slots",
        "slots": ["header", "title", "description", "content", "footer"],
        "properties": {
            "padding": "24px",
            "radius": "16px",
            "border": "1px solid border",
            "background": "card",
        },
    },
    "badge": {
        "description": "Small label/chip",
        "variants": {
            "variant": ["default", "secondary", "destructive", "outline"],
        },
        "properties": {
            "padding": "2px 10px",
            "radius": "9999px",
            "fontSize": "12px",
            "fontWeight": "600",
        },
    },
    "dialog": {
        "description": "Modal overlay dialog",
        "slots": ["header", "title", "description", "body", "footer"],
        "properties": {
            "maxWidth": "512px",
            "padding": "24px",
            "radius": "16px",
            "background": "card",
            "backdrop": "rgba(0,0,0,0.5)",
        },
    },
    "select": {
        "description": "Dropdown select with trigger and content",
        "properties": {
            "height": "40px",
            "padding": "8px 12px",
            "radius": "8px",
        },
    },
    "checkbox": {
        "description": "Checkbox with label",
        "variants": {
            "state": ["unchecked", "checked", "indeterminate", "disabled"],
        },
        "properties": {
            "size": "16px",
            "radius": "4px",
        },
    },
}

# ── Spacing scale ────────────────────────────────────────────────────────

spacing_variables = [
    {"collection": "spacing", "name": "0",    "value": 0},
    {"collection": "spacing", "name": "px",   "value": 1},
    {"collection": "spacing", "name": "0.5",  "value": 2},
    {"collection": "spacing", "name": "1",    "value": 4},
    {"collection": "spacing", "name": "1.5",  "value": 6},
    {"collection": "spacing", "name": "2",    "value": 8},
    {"collection": "spacing", "name": "2.5",  "value": 10},
    {"collection": "spacing", "name": "3",    "value": 12},
    {"collection": "spacing", "name": "3.5",  "value": 14},
    {"collection": "spacing", "name": "4",    "value": 16},
    {"collection": "spacing", "name": "5",    "value": 20},
    {"collection": "spacing", "name": "6",    "value": 24},
    {"collection": "spacing", "name": "7",    "value": 28},
    {"collection": "spacing", "name": "8",    "value": 32},
    {"collection": "spacing", "name": "9",    "value": 36},
    {"collection": "spacing", "name": "10",   "value": 40},
    {"collection": "spacing", "name": "11",   "value": 44},
    {"collection": "spacing", "name": "12",   "value": 48},
    {"collection": "spacing", "name": "14",   "value": 56},
    {"collection": "spacing", "name": "16",   "value": 64},
    {"collection": "spacing", "name": "20",   "value": 80},
    {"collection": "spacing", "name": "24",   "value": 96},
]

radius_variables = [
    {"collection": "radius", "name": "sm",    "value": 4},
    {"collection": "radius", "name": "md",    "value": 8},
    {"collection": "radius", "name": "lg",    "value": 12},
    {"collection": "radius", "name": "xl",    "value": 16},
    {"collection": "radius", "name": "2xl",   "value": 24},
    {"collection": "radius", "name": "3xl",   "value": 32},
    {"collection": "radius", "name": "full",  "value": 999},
]

# ── Write output files ───────────────────────────────────────────────────

outputs = [
    ("figma-variables-import.json", {
        "version": "1.0",
        "description": "Design System variables for cavi + gotovalues",
        "variables": color_variables + spacing_variables + radius_variables,
    }),
    ("figma-color-styles.json", {
        "version": "1.0",
        "description": "Paint styles for Figma",
        "styles": color_styles,
    }),
    ("figma-text-styles.json", {
        "version": "1.0",
        "description": "Text styles for Figma",
        "styles": text_styles,
    }),
    ("figma-components-spec.json", {
        "version": "1.0",
        "description": "Component specifications for Figma construction",
        "components": component_specs,
    }),
]

for filename, data in outputs:
    path = os.path.join(OUT_DIR, "..", filename)
    with open(path, "w") as f:
        json.dump(data, f, indent=2)
    print(f"[OK] {filename}")

print(f"\n[DONE] All Figma import files generated in packages/design-system/figma/")
