#!/usr/bin/env python3
"""Generate Android launcher icons from master PNG (read-only source)."""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MASTER = ROOT / "icon_pony_3.png"
RES = ROOT / "android/app/src/main/res"

# Adaptive foreground: 108dp canvas per density
FOREGROUND_SIZES = {
    "mipmap-mdpi": 108,
    "mipmap-hdpi": 162,
    "mipmap-xhdpi": 216,
    "mipmap-xxhdpi": 324,
    "mipmap-xxxhdpi": 432,
}

# Legacy launcher icons
LAUNCHER_SIZES = {
    "mipmap-mdpi": 48,
    "mipmap-hdpi": 72,
    "mipmap-xhdpi": 96,
    "mipmap-xxhdpi": 144,
    "mipmap-xxxhdpi": 192,
}

# Android adaptive icon safe zone: center 66% diameter circle
SAFE_ZONE_RATIO = 0.66


def sample_background_color(img: Image.Image) -> str:
    """Average color from corners for adaptive icon background."""
    w, h = img.size
    points = [
        (4, 4),
        (w - 5, 4),
        (4, h - 5),
        (w - 5, h - 5),
        (w // 2, 4),
        (w // 2, h - 5),
    ]
    rs = gs = bs = 0
    for x, y in points:
        r, g, b = img.convert("RGB").getpixel((x, y))
        rs += r
        gs += g
        bs += b
    n = len(points)
    return f"#{rs // n:02X}{gs // n:02X}{bs // n:02X}"


def fit_in_safe_zone(src: Image.Image, canvas_size: int) -> Image.Image:
    """Scale source into adaptive-icon safe zone, centered on transparent canvas."""
    safe = int(round(canvas_size * SAFE_ZONE_RATIO))
    scale = min(safe / src.width, safe / src.height)
    new_w = int(round(src.width * scale))
    new_h = int(round(src.height * scale))
    resized = src.resize((new_w, new_h), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    x = (canvas_size - new_w) // 2
    y = (canvas_size - new_h) // 2
    canvas.paste(resized, (x, y), resized if resized.mode == "RGBA" else None)
    return canvas


def scale_square(src: Image.Image, size: int) -> Image.Image:
    return src.resize((size, size), Image.Resampling.LANCZOS)


def main() -> None:
    if not MASTER.is_file():
        raise SystemExit(f"Master icon not found: {MASTER}")

    src = Image.open(MASTER).convert("RGBA")
    bg_color = sample_background_color(src)
    print(f"Background color: {bg_color}")

    for folder, size in FOREGROUND_SIZES.items():
        out_dir = RES / folder
        out_dir.mkdir(parents=True, exist_ok=True)
        fg = fit_in_safe_zone(src, size)
        fg.save(out_dir / "ic_launcher_foreground.png", optimize=True)
        print(f"Wrote {folder}/ic_launcher_foreground.png ({size}x{size})")

    for folder, size in LAUNCHER_SIZES.items():
        out_dir = RES / folder
        out_dir.mkdir(parents=True, exist_ok=True)
        icon = scale_square(src, size)
        icon.save(out_dir / "ic_launcher.png", optimize=True)
        icon.save(out_dir / "ic_launcher_round.png", optimize=True)
        print(f"Wrote {folder}/ic_launcher.png + ic_launcher_round.png ({size}x{size})")

    values_path = RES / "values/ic_launcher_background.xml"
    values_path.write_text(
        '<?xml version="1.0" encoding="utf-8"?>\n'
        "<resources>\n"
        f'    <color name="ic_launcher_background">{bg_color}</color>\n'
        "</resources>\n",
        encoding="utf-8",
    )
    print(f"Updated {values_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
