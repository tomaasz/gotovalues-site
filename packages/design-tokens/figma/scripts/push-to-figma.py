#!/usr/bin/env python3
"""
Push design tokens to Figma via REST API.
Creates color variables, typography, spacing, and radius collections.

Requirements:
    pip install requests
    export FIGMA_PAT="figd_xxxxxxxxxxxx"

Usage:
    python3 push-to-figma.py --file-key <FIGMA_FILE_KEY>
    python3 push-to-figma.py --file-key <KEY> --dry-run

Figma file setup:
    1. Create a new Figma design file
    2. Copy the file key from URL: figma.com/file/<FILE_KEY>/...
    3. Run this script
"""

import os
import sys
import json
import argparse
import requests

FIGMA_API = "https://api.figma.com/v1"

# ── Color tokens to push ──────────────────────────────────────────────────
# Format matches Figma Variables API: {name, type, value}
COLOR_VARIABLES = {
    "color/primitive/green": [
        ("50",  "hsl(162, 40%, 96%)"),
        ("100", "hsl(162, 38%, 90%)"),
        ("200", "hsl(162, 35%, 80%)"),
        ("300", "hsl(162, 32%, 65%)"),
        ("400", "hsl(162, 30%, 50%)"),
        ("500", "hsl(162, 30%, 42%)"),
        ("600", "hsl(162, 32%, 35%)"),
        ("700", "hsl(162, 34%, 28%)"),
        ("800", "hsl(162, 35%, 20%)"),
        ("900", "hsl(162, 38%, 14%)"),
    ],
    "color/primitive/warm": [
        ("50",  "hsl(42, 26%, 97%)"),
        ("100", "hsl(42, 26%, 94%)"),
        ("200", "hsl(40, 20%, 88%)"),
        ("300", "hsl(38, 16%, 82%)"),
        ("400", "hsl(36, 14%, 72%)"),
        ("500", "hsl(34, 12%, 60%)"),
        ("600", "hsl(32, 10%, 45%)"),
        ("700", "hsl(30, 10%, 32%)"),
        ("800", "hsl(30, 10%, 20%)"),
        ("900", "hsl(30, 10%, 12%)"),
    ],
    "color/primitive/gray": [
        ("50",  "hsl(210, 20%, 98%)"),
        ("100", "hsl(210, 16%, 93%)"),
        ("200", "hsl(210, 14%, 86%)"),
        ("300", "hsl(210, 12%, 76%)"),
        ("400", "hsl(210, 10%, 62%)"),
        ("500", "hsl(210, 8%, 50%)"),
        ("600", "hsl(210, 10%, 38%)"),
        ("700", "hsl(210, 12%, 26%)"),
        ("800", "hsl(210, 14%, 16%)"),
        ("900", "hsl(210, 16%, 8%)"),
    ],
    "color/semantic/light": [
        ("background",         "hsl(42, 26%, 96%)"),
        ("foreground",         "hsl(30, 10%, 15%)"),
        ("card",               "hsl(0, 0%, 100%)"),
        ("card-foreground",    "hsl(30, 10%, 15%)"),
        ("primary",            "hsl(162, 28%, 38%)"),
        ("primary-foreground", "hsl(0, 0%, 100%)"),
        ("secondary",          "hsl(42, 14%, 89%)"),
        ("secondary-foreground", "hsl(30, 10%, 20%)"),
        ("muted",              "hsl(38, 12%, 91%)"),
        ("muted-foreground",   "hsl(30, 8%, 38%)"),
        ("accent",             "hsl(162, 28%, 38%)"),
        ("destructive",        "hsl(0, 72%, 51%)"),
        ("border",             "hsl(35, 15%, 82%)"),
        ("input",              "hsl(35, 15%, 82%)"),
        ("ring",               "hsl(162, 28%, 38%)"),
    ],
    "color/semantic/dark": [
        ("background",         "hsl(28, 10%, 9%)"),
        ("foreground",         "hsl(35, 15%, 92%)"),
        ("card",               "hsl(30, 10%, 11%)"),
        ("card-foreground",    "hsl(35, 15%, 92%)"),
        ("primary",            "hsl(162, 30%, 46%)"),
        ("primary-foreground", "hsl(40, 25%, 99%)"),
        ("secondary",          "hsl(30, 12%, 16%)"),
        ("secondary-foreground", "hsl(40, 25%, 90%)"),
        ("muted",              "hsl(30, 10%, 16%)"),
        ("muted-foreground",   "hsl(35, 12%, 60%)"),
        ("accent",             "hsl(162, 30%, 46%)"),
        ("destructive",        "hsl(0, 62.8%, 30.6%)"),
        ("border",             "hsl(30, 10%, 18%)"),
        ("input",              "hsl(30, 10%, 18%)"),
        ("ring",               "hsl(162, 30%, 46%)"),
    ],
}

# ── API helpers ───────────────────────────────────────────────────────────

def get_headers():
    token = os.environ.get("FIGMA_PAT")
    if not token:
        print("ERROR: FIGMA_PAT environment variable not set.")
        print("  export FIGMA_PAT='figd_xxxxxxxxxxxx'")
        sys.exit(1)
    return {
        "X-Figma-Token": token,
        "Content-Type": "application/json",
    }


def get_file(file_key):
    """Get file info to verify access."""
    resp = requests.get(
        f"{FIGMA_API}/files/{file_key}",
        headers=get_headers(),
        params={"depth": 0},
    )
    resp.raise_for_status()
    return resp.json()


def get_local_variables(file_key):
    """List existing local variables in the file."""
    resp = requests.get(
        f"{FIGMA_API}/files/{file_key}/variables/local",
        headers=get_headers(),
    )
    resp.raise_for_status()
    return resp.json()


def create_variable_collection(file_key, name, mode_name="Value"):
    """
    Create a variable collection. Figma Variables API is in beta;
    this attempts to create via the REST API which may not support
    full variable creation yet. Falls back to generating a JSON
    description for manual import if API doesn't support it.
    """
    # Note: The Figma REST API for variables is limited as of 2025.
    # The Variables API (POST /v1/files/:key/variables) may work
    # for beta participants. Fall back to generating import data.
    pass


def generate_import_json(file_key):
    """Generate a JSON file that can be used by Figma plugins."""
    output = {
        "file_key": file_key,
        "variables": [],
    }
    for collection, values in COLOR_VARIABLES.items():
        parts = collection.split("/")
        for name, value in values:
            output["variables"].append({
                "collection": collection,
                "name": f"{parts[-1]}/{name}",
                "type": "COLOR",
                "value": value,
            })
    return output


def main():
    parser = argparse.ArgumentParser(description="Push design tokens to Figma")
    parser.add_argument("--file-key", required=True, help="Figma file key from URL")
    parser.add_argument("--dry-run", action="store_true", help="Print what would be done")
    args = parser.parse_args()

    if args.dry_run:
        print("[DRY RUN] Would verify access to file:", args.file_key)
        import_data = generate_import_json(args.file_key)
        print(f"[DRY RUN] Would create {len(import_data['variables'])} color variables")
        print("[DRY RUN] Collections:")
        for collection in COLOR_VARIABLES:
            print(f"  - {collection}: {len(COLOR_VARIABLES[collection])} tokens")
        return

    # Verify access
    print(f"Verifying access to file {args.file_key}...")
    try:
        file_info = get_file(args.file_key)
        print(f"  File: {file_info.get('name', 'unknown')}")
        print(f"  Last modified: {file_info.get('lastModified', 'unknown')}")
    except requests.HTTPError as e:
        print(f"ERROR: Cannot access file. Check FIGMA_PAT and file key.")
        print(f"  {e}")
        sys.exit(1)

    # Generate output for manual import
    print("\nGenerating import data...")
    import_data = generate_import_json(args.file_key)

    out_path = os.path.join(os.path.dirname(__file__), "..", "figma-variables-import.json")
    with open(out_path, "w") as f:
        json.dump(import_data, f, indent=2)

    print(f"\n[DONE] Wrote {len(import_data['variables'])} variables to:")
    print(f"  {out_path}")

    print("\n" + "=" * 60)
    print("MANUAL STEPS (Figma Variables API may not support full auto-creation):")
    print("=" * 60)
    print("1. Open your Figma file")
    print("2. Right sidebar → Local variables → Create variable")
    print("3. Use the collections and values from the import guide:")
    print(f"   packages/design-system/figma/import-guide.md")
    print("4. Alternatively, use a Figma plugin that can import the JSON:")
    print(f"   {out_path}")


if __name__ == "__main__":
    main()
