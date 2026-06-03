#!/usr/bin/env python3
"""
Generate ZIBALDONE.AI PWA icons.

Z = 3 capsules sharing endpoints — mathematically guaranteed smooth joins.
When two capsules share a point with equal radius, their round caps are
identical, so min(sdf1, sdf2) == dist_to_shared_point - r at the corner.
No seams, no T-junctions, looks like a single continuous stroke.
"""
import struct, zlib, math, os

def lerp(a, b, t): return a + (b - a) * t
def cl01(x): return max(0.0, min(1.0, x))
def cl255(v): return max(0, min(255, int(v)))

def smooth(e0, e1, x):
    t = cl01((x - e0) / (e1 - e0 + 1e-9))
    return t * t * (3 - 2 * t)

def sdf_cap(px, py, ax, ay, bx, by, r):
    """Capsule SDF (fat line with round ends). Negative = inside."""
    dx, dy = bx - ax, by - ay
    d2 = dx*dx + dy*dy
    t = cl01(((px-ax)*dx + (py-ay)*dy) / d2) if d2 else 0.0
    qx, qy = px - ax - t*dx, py - ay - t*dy
    return math.sqrt(qx*qx + qy*qy) - r

def make_icon(path, S):
    BG  = (3,   3,  16)
    C1  = (0,  212, 255)   # #00D4FF  cyber-blue
    C2  = (123, 47, 255)   # #7B2FFF  cyber-purple
    GRN = (0,  255, 148)   # #00FF94  neon-green

    f = float(S)

    # ─── Z as a single stroke ────────────────────────────────────────────────
    #
    # Path:  P0──────P1
    #                  ╲
    #                   ╲   (diagonal)
    #                    ╲
    #               P2──────P3
    #
    # P0 = (lf, top_y)   P1 = (rt, top_y)   ← shared with diagonal
    # P2 = (lf, bot_y)   ← shared with diagonal   P3 = (rt, bot_y)
    #
    # All three capsules use the same radius r.
    # At P1 and P2 the caps are identical circles → perfectly smooth join.

    lf, rt = f * 0.11, f * 0.89
    tp, bt = f * 0.10, f * 0.74
    r      = (bt - tp) * 0.105     # stroke half-width (thickness = 21% of Z height)
    aa     = 1.5                    # anti-alias band in pixels
    glow   = r * 0.9               # soft outer glow radius

    top_y  = tp + r                # centerline of top bar
    bot_y  = bt - r                # centerline of bottom bar

    # ─── .AI glyphs ──────────────────────────────────────────────────────────
    ai_y  = bt + f * 0.045
    ai_h  = f * 0.125
    ds    = max(1.5, ai_h / 5.5)        # period circle radius
    lw    = max(4.0, ai_h * 5.0 / 9.0) # letter width
    sp    = max(2.0, ai_h / 8.0)        # gap between glyphs
    lk    = max(0.8, ai_h / 22.0)       # stroke radius for A and I

    total_ai = ds*2 + sp + lw + sp + lw
    ax0   = (f - total_ai) / 2.0

    # "."
    dot_cx = ax0 + ds
    dot_cy = ai_y + ai_h - ds

    # "A"
    A_lf  = ax0 + ds*2 + sp
    apex  = (A_lf + lw/2, ai_y)
    A_bl  = (A_lf,        ai_y + ai_h)
    A_br  = (A_lf + lw,   ai_y + ai_h)
    cb_y  = ai_y + ai_h * 0.50
    cb_x0 = apex[0] + 0.5 * (A_bl[0] - apex[0])  # left leg x at 50%
    cb_x1 = apex[0] + 0.5 * (A_br[0] - apex[0])  # right leg x at 50%

    # "I"
    I_lf  = A_lf + lw + sp
    I_cx  = I_lf + lw / 2
    sw    = max(lk * 1.5, lw / 3.5)   # serif half-width

    # ─── SDFs ────────────────────────────────────────────────────────────────
    def z_sdf(px, py):
        return min(
            sdf_cap(px, py, lf,  top_y, rt,  top_y, r),   # top bar
            sdf_cap(px, py, rt,  top_y, lf,  bot_y, r),   # diagonal  (shares P1 with top bar, P2 with bot bar)
            sdf_cap(px, py, lf,  bot_y, rt,  bot_y, r),   # bottom bar
        )

    def ai_sdf(px, py):
        return min(
            sdf_cap(px, py, dot_cx,   dot_cy,   dot_cx,   dot_cy,   ds),  # .  (circle)
            sdf_cap(px, py, apex[0],  apex[1],  A_bl[0],  A_bl[1],  lk),  # A left leg
            sdf_cap(px, py, apex[0],  apex[1],  A_br[0],  A_br[1],  lk),  # A right leg
            sdf_cap(px, py, cb_x0,    cb_y,     cb_x1,    cb_y,     lk),  # A crossbar
            sdf_cap(px, py, I_cx,     ai_y,     I_cx,     ai_y+ai_h, lk), # I stem
            sdf_cap(px, py, I_cx-sw,  ai_y,     I_cx+sw,  ai_y,     lk),  # I top serif
            sdf_cap(px, py, I_cx-sw,  ai_y+ai_h, I_cx+sw, ai_y+ai_h, lk),# I bot serif
        )

    def grad(px, py):
        t = cl01(0.35*(px-lf)/(rt-lf) + 0.65*(py-tp)/(bt-tp))
        return (cl255(lerp(C1[0], C2[0], t)),
                cl255(lerp(C1[1], C2[1], t)),
                cl255(lerp(C1[2], C2[2], t)))

    # ─── Render ──────────────────────────────────────────────────────────────
    img = [[list(BG) for _ in range(S)] for _ in range(S)]

    def paint(x, y, color, a=1.0):
        if 0 <= x < S and 0 <= y < S:
            for i in range(3):
                img[y][x][i] = cl255(img[y][x][i]*(1-a) + color[i]*a)

    ai_band_top = ai_y - aa - 2
    ai_band_bot = ai_y + ai_h + aa + 2

    for y in range(S):
        for x in range(S):
            px, py = x + 0.5, y + 0.5

            dz = z_sdf(px, py)
            if dz < 0:
                paint(x, y, grad(px, py))
            elif dz <= aa:
                paint(x, y, grad(px, py), 1.0 - smooth(0, aa, dz))
            elif dz <= glow:
                g = grad(px, py)
                paint(x, y, (g[0]//7, g[1]//7, g[2]//7), (1 - dz/glow)**2 * 0.25)

            if ai_band_top <= py <= ai_band_bot:
                da = ai_sdf(px, py)
                if da < 0:
                    paint(x, y, GRN)
                elif da <= aa:
                    paint(x, y, GRN, 1.0 - smooth(0, aa, da))

    # ─── PNG encode ──────────────────────────────────────────────────────────
    def chunk(ct, data):
        raw = ct + data
        return struct.pack('>I', len(data)) + raw + struct.pack('>I', zlib.crc32(raw) & 0xffffffff)

    ihdr = chunk(b'IHDR', struct.pack('>II', S, S) + bytes([8, 2, 0, 0, 0]))
    raw  = bytearray()
    for row in img:
        raw.append(0)
        for px in row:
            raw.extend(px)
    idat = chunk(b'IDAT', zlib.compress(bytes(raw), 6))
    iend = chunk(b'IEND', b'')

    with open(path, 'wb') as f:
        f.write(b'\x89PNG\r\n\x1a\n' + ihdr + idat + iend)
    print(f'  {path}  ({S}×{S})')


os.makedirs('public', exist_ok=True)
make_icon('public/apple-touch-icon.png', 180)
make_icon('public/icon-192.png',         192)
make_icon('public/icon-512.png',         512)
print('Done.')
