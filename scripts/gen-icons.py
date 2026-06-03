#!/usr/bin/env python3
"""Generate ZIBALDONE.AI PWA icons using only Python stdlib."""
import struct, zlib, math, os

def lerp(a, b, t):
    return a + (b - a) * t

def clamp(v):
    return max(0, min(255, int(v)))

def make_icon(path, S):
    BG  = (3,   3,  16)   # #030310 deep-space
    C1  = (0,  212, 255)  # #00D4FF cyber-blue
    C2  = (123, 47, 255)  # #7B2FFF cyber-purple
    GRN = (0,  255, 148)  # #00FF94 neon-green

    # Z bounding box
    pad  = max(1, int(S * 0.10))
    lf   = pad
    rt   = S - pad
    tp   = int(S * 0.08)
    bt   = int(S * 0.74)
    zw   = rt - lf
    zh   = bt - tp
    bar  = max(4, int(zh * 0.19))

    # .AI text row below Z
    ai_y = bt + int(S * 0.045)
    ai_h = int(S * 0.13)

    img = [[list(BG) for _ in range(S)] for _ in range(S)]

    def paint(x, y, color, a=1.0):
        if 0 <= x < S and 0 <= y < S:
            for i in range(3):
                img[y][x][i] = clamp(img[y][x][i] * (1 - a) + color[i] * a)

    def grad(x, y):
        t = 0.35 * (x - lf) / zw + 0.65 * (y - tp) / zh
        t = max(0.0, min(1.0, t))
        return (clamp(lerp(C1[0], C2[0], t)),
                clamp(lerp(C1[1], C2[1], t)),
                clamp(lerp(C1[2], C2[2], t)))

    # — Top bar —
    for y in range(tp, tp + bar + 1):
        for x in range(lf, rt + 1):
            paint(x, y, grad(x, y))

    # — Bottom bar —
    for y in range(bt - bar, bt + 1):
        for x in range(lf, rt + 1):
            paint(x, y, grad(x, y))

    # — Diagonal (top-right → bottom-left) —
    dy1, dx1 = tp + bar, rt
    dy2, dx2 = bt - bar, lf
    dh = dy2 - dy1
    half = bar * 0.55
    if dh > 0:
        for y in range(dy1, dy2 + 1):
            cx = dx1 + (y - dy1) / dh * (dx2 - dx1)
            for x in range(int(cx - half - 1), int(cx + half + 2)):
                dist = abs(x - cx)
                if dist <= half:
                    paint(x, y, grad(x, y))
                elif dist <= half + 1.5:
                    paint(x, y, grad(x, y), a=0.35)

    # — .AI text —
    if ai_h >= 8:
        ds  = max(2, ai_h // 5)          # dot/period size
        lw  = max(4, ai_h * 5 // 9)      # letter width
        sp  = max(2, ai_h // 8)          # gap between elements
        lk  = max(1, ai_h // 16)         # stroke half-width

        total = ds + sp + lw + sp + lw
        ax = (S - total) // 2

        # "." — filled square dot at baseline
        dot_y = ai_y + ai_h - ds
        for y in range(dot_y, dot_y + ds):
            for x in range(ax, ax + ds):
                paint(x, y, GRN)

        # "A" — two diagonals that meet at apex + crossbar
        aa = ax + ds + sp
        for i in range(ai_h + 1):
            t  = i / ai_h
            yl = ai_y + ai_h - i          # y from bottom to top
            # left leg: bottom-left → apex-center
            xl = aa + int(t * (lw // 2))
            for dx in range(-lk, lk + 1):
                paint(xl + dx, yl, GRN)
            # right leg: bottom-right → apex-center
            xr = aa + lw - int(t * (lw // 2))
            for dx in range(-lk, lk + 1):
                paint(xr + dx, yl, GRN)
        # crossbar at 50% height
        cb_y0 = ai_y + int(ai_h * 0.46)
        cb_y1 = ai_y + int(ai_h * 0.54)
        cb_x0 = aa + lw // 4
        cb_x1 = aa + lw - lw // 4
        # figure out where legs are at crossbar height
        t_cb = 1 - (cb_y0 - ai_y) / ai_h
        cb_xl = aa + int(t_cb * (lw // 2))
        cb_xr = aa + lw - int(t_cb * (lw // 2))
        for y in range(cb_y0, cb_y1 + 1):
            for x in range(cb_xl, cb_xr + 1):
                paint(x, y, GRN)

        # "I" — vertical bar with horizontal serifs
        ia      = aa + lw + sp
        center  = ia + lw // 2
        sw      = max(1, lw // 3)  # serif half-width
        for y in range(ai_y, ai_y + ai_h + 1):
            for dx in range(-lk, lk + 1):
                paint(center + dx, y, GRN)
        for y in range(ai_y, ai_y + lk * 2 + 2):
            for x in range(center - sw, center + sw + 1):
                paint(x, y, GRN)
        for y in range(ai_y + ai_h - lk * 2 - 1, ai_y + ai_h + 1):
            for x in range(center - sw, center + sw + 1):
                paint(x, y, GRN)

    # — PNG encode —
    def chunk(ct, data):
        raw = ct + data
        return struct.pack('>I', len(data)) + raw + struct.pack('>I', zlib.crc32(raw) & 0xffffffff)

    ihdr = chunk(b'IHDR', struct.pack('>II', S, S) + bytes([8, 2, 0, 0, 0]))

    raw = bytearray()
    for row in img:
        raw.append(0)          # filter-none
        for px in row:
            raw.extend(px)

    idat = chunk(b'IDAT', zlib.compress(bytes(raw), 6))
    iend = chunk(b'IEND', b'')

    with open(path, 'wb') as f:
        f.write(b'\x89PNG\r\n\x1a\n' + ihdr + idat + iend)
    print(f'  {path}  ({S}x{S})')


os.makedirs('public', exist_ok=True)
make_icon('public/apple-touch-icon.png', 180)
make_icon('public/icon-192.png',         192)
make_icon('public/icon-512.png',         512)
print('Done.')
