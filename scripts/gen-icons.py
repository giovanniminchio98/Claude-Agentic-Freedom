#!/usr/bin/env python3
"""Generate ZIBALDONE.AI PWA icons — SDF rendering for smooth, rounded shapes."""
import struct, zlib, math, os

def lerp(a, b, t): return a + (b - a) * t
def cl01(x): return max(0.0, min(1.0, x))
def cl255(v): return max(0, min(255, int(v)))

def smooth(e0, e1, x):
    t = cl01((x - e0) / (e1 - e0 + 1e-9))
    return t * t * (3 - 2 * t)

def sdf_cap(px, py, ax, ay, bx, by, r):
    """Capsule SDF: thick line segment with round caps. Negative = inside."""
    dx, dy = bx - ax, by - ay
    d2 = dx*dx + dy*dy
    t = cl01(((px-ax)*dx + (py-ay)*dy) / d2) if d2 else 0.0
    qx, qy = px - ax - t*dx, py - ay - t*dy
    return math.sqrt(qx*qx + qy*qy) - r

def sdf_rrect(px, py, cx, cy, hw, hh, r):
    """Rounded-rectangle SDF. Negative = inside."""
    dx = max(0.0, abs(px - cx) - max(0.0, hw - r))
    dy = max(0.0, abs(py - cy) - max(0.0, hh - r))
    return math.sqrt(dx*dx + dy*dy) - r

def make_icon(path, S):
    BG  = (3,   3,  16)
    C1  = (0,  212, 255)   # #00D4FF cyber-blue
    C2  = (123, 47, 255)   # #7B2FFF cyber-purple
    GRN = (0,  255, 148)   # #00FF94 neon-green

    f = float(S)

    # ── Z geometry ────────────────────────────────────────────────────────────
    lf, rt = f * 0.10, f * 0.90       # left / right edges
    tp, bt = f * 0.08, f * 0.74       # top / bottom of Z
    bar    = (bt - tp) * 0.195        # bar thickness
    rz     = bar * 0.48               # corner radius ≈ half-bar → stadium ends
    aa     = 1.5                       # anti-alias band (px)
    glow   = bar * 0.40               # outer glow radius

    # ── .AI geometry ──────────────────────────────────────────────────────────
    ai_y, ai_h = bt + f * 0.045, f * 0.13
    ds  = max(2.0, ai_h / 5.0)        # period radius
    lw  = max(4.0, ai_h * 5.0 / 9.0) # letter width
    sp  = max(2.0, ai_h / 8.0)        # gap between glyphs
    lk  = max(1.0, ai_h / 20.0)       # stroke radius

    total_ai = ds*2 + sp + lw + sp + lw
    ax0 = (f - total_ai) / 2.0        # left edge of .AI block

    # Period
    dot_cx = ax0 + ds
    dot_cy = ai_y + ai_h - ds

    # A
    aa_x  = ax0 + ds*2 + sp
    apex  = (aa_x + lw/2, ai_y)
    bl    = (aa_x,        ai_y + ai_h)
    br    = (aa_x + lw,   ai_y + ai_h)
    # crossbar at 50% — spans exactly where the legs are at that height
    cb_y  = ai_y + ai_h * 0.50
    t_cb  = 0.5
    cb_x0 = apex[0] + t_cb * (bl[0] - apex[0])
    cb_x1 = apex[0] + t_cb * (br[0] - apex[0])

    # I
    ii_x   = aa_x + lw + sp
    ii_cx  = ii_x + lw / 2
    sw     = max(lk * 1.5, lw / 3.5)  # serif half-width

    # ── SDF functions ─────────────────────────────────────────────────────────
    def z_sdf(px, py):
        return min(
            sdf_rrect(px, py, (lf+rt)/2, tp+bar/2, (rt-lf)/2, bar/2, rz),  # top bar
            sdf_rrect(px, py, (lf+rt)/2, bt-bar/2, (rt-lf)/2, bar/2, rz),  # bottom bar
            sdf_cap  (px, py, rt, tp+bar, lf, bt-bar, rz),                  # diagonal
        )

    def ai_sdf(px, py):
        return min(
            sdf_cap(px, py, dot_cx, dot_cy, dot_cx, dot_cy, ds),               # .
            sdf_cap(px, py, apex[0],apex[1], bl[0],bl[1], lk),                 # A left leg
            sdf_cap(px, py, apex[0],apex[1], br[0],br[1], lk),                 # A right leg
            sdf_cap(px, py, cb_x0, cb_y, cb_x1, cb_y, lk),                    # A crossbar
            sdf_cap(px, py, ii_cx, ai_y,    ii_cx, ai_y+ai_h, lk),            # I stem
            sdf_cap(px, py, ii_cx-sw, ai_y,    ii_cx+sw, ai_y,    lk),        # I top serif
            sdf_cap(px, py, ii_cx-sw, ai_y+ai_h, ii_cx+sw, ai_y+ai_h, lk),   # I bot serif
        )

    def grad(px, py):
        t = cl01(0.35*(px-lf)/(rt-lf) + 0.65*(py-tp)/(bt-tp))
        return (cl255(lerp(C1[0],C2[0],t)),
                cl255(lerp(C1[1],C2[1],t)),
                cl255(lerp(C1[2],C2[2],t)))

    # ── Pixel buffer ──────────────────────────────────────────────────────────
    img = [[list(BG) for _ in range(S)] for _ in range(S)]

    def paint(x, y, color, a=1.0):
        if 0 <= x < S and 0 <= y < S:
            for i in range(3):
                img[y][x][i] = cl255(img[y][x][i] * (1-a) + color[i] * a)

    ai_band_top = ai_y - aa - 2
    ai_band_bot = ai_y + ai_h + aa + 2

    for y in range(S):
        for x in range(S):
            px, py = x + 0.5, y + 0.5

            # Z with anti-aliased edges + soft outer glow
            dz = z_sdf(px, py)
            if dz < 0:
                paint(x, y, grad(px, py))
            elif dz <= aa:
                paint(x, y, grad(px, py), 1.0 - smooth(0, aa, dz))
            elif dz <= glow:
                g = grad(px, py)
                paint(x, y, (g[0]//6, g[1]//6, g[2]//6), (1-dz/glow)**2 * 0.22)

            # .AI — only check pixels in the relevant band
            if ai_band_top <= py <= ai_band_bot:
                da = ai_sdf(px, py)
                if da < 0:
                    paint(x, y, GRN)
                elif da <= aa:
                    paint(x, y, GRN, 1.0 - smooth(0, aa, da))

    # ── PNG encode ────────────────────────────────────────────────────────────
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
