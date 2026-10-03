"""Export a reusable GIF preview of the homepage's code-driven logo entrance.

The original SPN mark stays intact. Pillow draws the cartoon limbs around it.
Usage: python scripts/render-running-logo.py /absolute/path/spn-news-logo-correndo.gif
"""
import base64
import math
import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = Path(sys.argv[1])
WIDTH, HEIGHT, SCALE = 1000, 310, 2
INK, PAPER, ORANGE, YELLOW = '#191919', '#faf9f6', '#ff681e', '#ffda40'
FONT = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 17 * SCALE)
SMALL = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 12 * SCALE)
source = (ROOT / 'src/lib/brand-logo.ts').read_text()
logo_bytes = base64.b64decode(re.search(r'base64,([^"\s]+)', source).group(1))
from io import BytesIO
logo = Image.open(BytesIO(logo_bytes)).convert('RGBA').resize((128 * SCALE, 128 * SCALE), Image.Resampling.LANCZOS)
mask = Image.new('L', logo.size)
ImageDraw.Draw(mask).rounded_rectangle((0, 0, 128 * SCALE - 1, 128 * SCALE - 1), 22 * SCALE, fill=255)
logo.putalpha(mask)


def interpolate(fraction, points):
    for (start, a), (end, b) in zip(points, points[1:]):
        if fraction <= end:
            return a + (b - a) * max(0, (fraction - start) / (end - start))
    return points[-1][1]


def frame_at(fraction):
    image = Image.new('RGB', (WIDTH * SCALE, HEIGHT * SCALE), PAPER)
    draw = ImageDraw.Draw(image)
    draw.text((25 * SCALE, 18 * SCALE), 'SPN NEWS', fill=INK, font=FONT)
    draw.text((25 * SCALE, 46 * SCALE), 'O mundo pop levado a sério. Mais ou menos.', fill='#77736e', font=SMALL)
    draw.line((0, 294 * SCALE, WIDTH * SCALE, 294 * SCALE), fill='#e6e2d7', width=2)
    x = interpolate(fraction, [(0, -280), (.44, WIDTH / 2 - 140), (.52, WIDTH / 2 - 113), (.61, WIDTH / 2 - 140), (.70, WIDTH / 2 - 140), (1, WIDTH + 280)])
    y = 49

    def point(px, py):
        return (int((px + x) * SCALE), int((py + y) * SCALE))

    def ellipse(box, fill, outline=None, width=1):
        draw.ellipse((*point(box[0], box[1]), *point(box[2], box[3])), fill=fill, outline=outline, width=width * SCALE)

    def line(points, fill=INK, width=7):
        draw.line([point(*p) for p in points], fill=fill, width=width * SCALE, joint='curve')

    def turn(points, origin, degrees):
        angle = math.radians(degrees)
        return [(origin[0] + (px - origin[0]) * math.cos(angle) - (py - origin[1]) * math.sin(angle),
                 origin[1] + (px - origin[0]) * math.sin(angle) + (py - origin[1]) * math.cos(angle)) for px, py in points]

    ellipse((76, 234, 212, 244), '#e0dbd1')
    if .45 < fraction < .65:
        for cx, cy, radius in [(47, 222, 14), (64, 212, 18), (85, 225, 13)]:
            ellipse((cx-radius, cy-radius, cx+radius, cy+radius), '#fffdf6', INK, 2)
    swing = math.sin(fraction * 3.4 / .24 * 2 * math.pi) * 28
    if .48 < fraction < .61:
        back, front = 35, -48
    elif .61 <= fraction <= .70:
        back, front = 0, 0
    else:
        back, front = swing, -swing
    for origin, points, angle, color in [((156, 170), [(156, 170), (159, 196), (177, 218)], back, ORANGE),
                                         ((125, 170), [(125, 170), (113, 197), (126, 218)], front, YELLOW)]:
        moved = turn(points, origin, angle)
        line(moved, width=8)
        px, py = moved[-1]
        ellipse((px - 9, py - 7, px + 26, py + 15), color, INK, 3)
        line([(px - 4, py + 10), (px + 20, py + 11)], 'white', 3)
    line([(83, 116), (57, 139 + swing / 3), (43, 120)])
    ellipse((30, 106, 52, 126), 'white', INK, 3)
    bob = 0 if .50 < fraction < .70 else -abs(math.sin(fraction * 3.4 / .24 * 2 * math.pi)) * 7
    badge = Image.new('RGBA', (150 * SCALE, 150 * SCALE))
    bd = ImageDraw.Draw(badge)
    bd.rounded_rectangle((6 * SCALE, 6 * SCALE, 143 * SCALE, 143 * SCALE), radius=25 * SCALE, fill='white')
    badge.alpha_composite(logo, (11 * SCALE, 11 * SCALE))
    bd.rounded_rectangle((11 * SCALE, 11 * SCALE, 138 * SCALE, 138 * SCALE), radius=22 * SCALE, outline=INK, width=3 * SCALE)
    tilt = -14 if .50 < fraction < .58 else 0 if .61 < fraction < .70 else 5
    badge = badge.rotate(-tilt, resample=Image.Resampling.BICUBIC, expand=False)
    image.paste(badge, point(65, 37 + bob), badge)
    line([(201, 118), (223, 140 - swing / 3), (239, 115)])
    ellipse((231, 99, 253, 119), 'white', INK, 3)
    if fraction < .44 or fraction > .78:
        for xa, xb, yy in [(23, 53, 71), (9, 43, 87), (27, 53, 103)]:
            line([(xa, yy), (xb, yy)], YELLOW, 5)
    label = 'ATRASADO PRO PLAY!' if fraction < .47 else 'CHEGUEI!' if .53 < fraction < .77 else None
    if label:
        text_width = draw.textlength(label, font=FONT) / SCALE
        left = x + 140 - text_width / 2 - 12
        top = y - 6
        box = (left * SCALE, top * SCALE, (left + text_width + 24) * SCALE, (top + 35) * SCALE)
        draw.rounded_rectangle(tuple(v + (4 * SCALE if i % 2 == 0 else 5 * SCALE) for i, v in enumerate(box)), radius=12 * SCALE, fill=ORANGE)
        draw.rounded_rectangle(box, radius=12 * SCALE, fill='#fffdf6', outline=INK, width=3 * SCALE)
        draw.text(((left + 12) * SCALE, (top + 7) * SCALE), label, font=FONT, fill=INK)
    return image.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)


frames = [frame_at(index / 68) for index in range(69)]
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
frames[0].save(OUTPUT, save_all=True, append_images=frames[1:], duration=50, loop=0, optimize=True, disposal=2)
poster = OUTPUT.with_suffix('.png')
frame_at(.64).save(poster)
print(f'GIF: {OUTPUT} ({OUTPUT.stat().st_size} bytes), 3.45 s, {len(frames)} frames')
print(f'Poster: {poster}')
