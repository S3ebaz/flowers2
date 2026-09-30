'use strict';

const NS = 'http://www.w3.org/2000/svg';
const $ = (s) => document.querySelector(s);
const rnd = (a, b) => a + Math.random() * (b - a);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function svgEl(tag, attrs = {}, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}

/* ---------- Flores moradas: una especie distinta por símbolo (<use href="#f-nombre">) ---------- */
// Paleta: de violeta profundo a lila claro, más amarillo para los centros
const V = { d: '#5b2bb8', m: '#7b3fe4', v: '#8a4fe0', l: '#9b5de5', s: '#b388f5', p: '#d4b8ff', y: '#ffd54a' };
const rot = (a) => `rotate(${a})`;

const SPECIES = {
  // Jardín
  aster(g) {
    for (let i = 0; i < 24; i++)
      svgEl('ellipse', { cy: -34, rx: 4.5, ry: 22, fill: i % 2 ? V.l : V.s, transform: rot(i * 15) }, g);
    svgEl('circle', { r: 13, fill: V.y }, g);
    svgEl('circle', { r: 7, fill: '#ffb000' }, g);
  },
  tulip(g) {
    svgEl('ellipse', { cx: -15, cy: -6, rx: 17, ry: 36, fill: V.m, transform: 'rotate(-14 -15 -6)' }, g);
    svgEl('ellipse', { cx: 15, cy: -6, rx: 17, ry: 36, fill: V.m, transform: 'rotate(14 15 -6)' }, g);
    svgEl('ellipse', { cy: -2, rx: 18, ry: 40, fill: V.s }, g);
    svgEl('path', { d: 'M0 -38V22', stroke: V.p, 'stroke-opacity': 0.6, 'stroke-width': 2, fill: 'none' }, g);
  },
  hydrangea(g) {
    const c = [V.v, V.l, V.s, V.p];
    for (let i = 0; i < 36; i++) {
      const a = i * 2.39996, r = 7.2 * Math.sqrt(i);
      const f = svgEl('g', { transform: `translate(${Math.cos(a) * r},${Math.sin(a) * r})` }, g);
      svgEl('circle', { r: 9.5, fill: c[i % 4] }, f);
      svgEl('circle', { r: 2.2, fill: V.y, opacity: 0.8 }, f);
    }
  },
  bell(g) {
    svgEl('path', { d: 'M-22 -34 C-24 -6 -36 10 -44 28 Q-22 40 0 30 Q22 40 44 28 C36 10 24 -6 22 -34 Q0 -48 -22 -34Z', fill: V.v }, g);
    svgEl('path', { d: 'M-10 -34 C-10 -6 -16 12 -20 26 M10 -34 C10 -6 16 12 20 26', stroke: V.s, 'stroke-width': 3, 'stroke-linecap': 'round', fill: 'none', opacity: 0.7 }, g);
    svgEl('ellipse', { cy: 30, rx: 30, ry: 8, fill: V.d, opacity: 0.55 }, g);
    svgEl('ellipse', { cy: 36, rx: 4, ry: 10, fill: V.y }, g);
  },
  anemone(g) {
    for (let i = 0; i < 7; i++)
      svgEl('ellipse', { cy: -28, rx: 18, ry: 26, fill: i % 2 ? V.v : V.m, transform: rot(i * 51.43) }, g);
    svgEl('circle', { r: 15, fill: '#1c0a2e' }, g);
    for (let i = 0; i < 16; i++)
      svgEl('circle', { cx: Math.cos(i * 0.3927) * 20, cy: Math.sin(i * 0.3927) * 20, r: 1.8, fill: V.p }, g);
  },
  iris(g) {
    [-110, 110, 180].forEach((a) => {
      svgEl('ellipse', { cy: -28, rx: 16, ry: 27, fill: V.d, transform: rot(a) }, g);
      svgEl('ellipse', { cy: -16, rx: 2.6, ry: 9, fill: V.y, transform: rot(a) }, g);
    });
    [-35, 35, 0].forEach((a) =>
      svgEl('ellipse', { cy: -28, rx: 13, ry: 27, fill: a ? V.v : V.s, transform: rot(a) }, g));
  },
  lavender(g) {
    for (let i = 0; i < 10; i++) {
      const y = 10 - i * 9, k = 1 - i * 0.06;
      [-1, 1].forEach((d) =>
        svgEl('ellipse', {
          cx: d * 6 * k, cy: y, rx: 4.5 * k, ry: 8 * k, fill: i % 2 ? V.l : V.s,
          transform: `rotate(${d * 28} ${d * 6 * k} ${y})`,
        }, g));
    }
    svgEl('ellipse', { cy: -80, rx: 4, ry: 8, fill: V.l }, g);
  },
  thistle(g) {
    for (let i = 0; i < 21; i++)
      svgEl('ellipse', { cy: -24, rx: 2.8, ry: 26, fill: i % 2 ? '#a566ff' : V.m, transform: `rotate(${-84 + i * 8.4} 0 6)` }, g);
    svgEl('ellipse', { cy: 10, rx: 24, ry: 17, fill: '#3f7a52' }, g);
    svgEl('path', { d: 'M-20 4L20 16M-12 -4L24 10M12 -4L-24 10M20 4L-20 16', stroke: '#2a5a3a', 'stroke-width': 1.4, fill: 'none' }, g);
  },
  // Ramo
  clematis(g) {
    for (let i = 0; i < 6; i++) {
      svgEl('path', { d: 'M0 0C-17 -16 -15 -44 0 -64C15 -44 17 -16 0 0Z', fill: V.m, transform: rot(i * 60) }, g);
      svgEl('path', { d: 'M0 -8V-50', stroke: V.p, 'stroke-width': 2.4, 'stroke-linecap': 'round', opacity: 0.6, transform: rot(i * 60) }, g);
    }
    svgEl('circle', { r: 8, fill: '#f4e6ff' }, g);
    for (let i = 0; i < 10; i++)
      svgEl('circle', { cx: Math.cos(i * 0.628) * 12, cy: Math.sin(i * 0.628) * 12, r: 1.8, fill: V.y }, g);
  },
  pansy(g) {
    [[-16, -22, 20, 24, V.d], [16, -22, 20, 24, V.d], [-27, 4, 20, 19, V.v], [27, 4, 20, 19, V.v], [0, 26, 25, 22, V.s]]
      .forEach(([cx, cy, rx, ry, fill]) => svgEl('ellipse', { cx, cy, rx, ry, fill }, g));
    svgEl('ellipse', { cy: 6, rx: 11, ry: 14, fill: V.y, opacity: 0.85 }, g);
    svgEl('path', { d: 'M0 4V30M-8 8L-16 26M8 8L16 26', stroke: '#2a1450', 'stroke-width': 2, 'stroke-linecap': 'round', fill: 'none' }, g);
  },
  rose(g) {
    svgEl('circle', { r: 38, fill: V.d }, g);
    [[6, 22, 17, 19, V.m], [5, 14, 11, 12, V.v], [4, 8, 7, 8, V.l]].forEach(([n, d, rx, ry, fill]) => {
      for (let i = 0; i < n; i++)
        svgEl('ellipse', { cy: -d, rx, ry, fill, stroke: V.d, 'stroke-width': 1, transform: rot((i * 360) / n + n * 7) }, g);
    });
    svgEl('circle', { r: 6, fill: V.p }, g);
    svgEl('path', { d: 'M-4 1Q0 -5 4 0Q1 5 -2 2', stroke: V.m, fill: 'none', 'stroke-width': 1.5 }, g);
  },
};

function buildFlowerSymbols() {
  const defs = $('#art defs');
  for (const [name, draw] of Object.entries(SPECIES)) draw(svgEl('g', { id: `f-${name}` }, defs));
}

/* ---------- Jardín de flores que brotan (una especie distinta por tallo) ---------- */
function buildGarden() {
  const garden = $('#garden');
  const flowers = [
    { k: 'aster',     x: 30,  h: 200, s: 0.6 },  { k: 'tulip',    x: 90,  h: 300, s: 0.85 },
    { k: 'hydrangea', x: 190, h: 380, s: 1 },    { k: 'bell',     x: 245, h: 250, s: 0.75 },
    { k: 'anemone',   x: 555, h: 260, s: 0.75 }, { k: 'iris',     x: 612, h: 390, s: 1 },
    { k: 'lavender',  x: 715, h: 310, s: 0.9 },  { k: 'thistle',  x: 770, h: 210, s: 0.65 },
  ];
  const base = 592;

  flowers.forEach(({ k: kind, x, h, s }, i) => {
    const d = 0.3 + i * 0.25;
    const g = svgEl('g', { class: 'sway', filter: 'url(#glowS)' }, garden);
    g.style.setProperty('--s', `${-rnd(0, 5).toFixed(2)}s`);

    const stem = svgEl('path', {
      class: 'stem', pathLength: 1, fill: 'none', stroke: '#3be07f', 'stroke-linecap': 'round',
      'stroke-width': Math.max(4, 7 * s),
      d: `M${x} ${base}C${x - 14} ${base - h * 0.35} ${x + 14} ${base - h * 0.7} ${x} ${base - h}`,
    }, g);
    stem.style.setProperty('--d', `${d}s`);

    // Dos hojas curvas (izquierda y derecha)
    [[-1, 0.35], [1, 0.55]].forEach(([dir, at], n) => {
      const holder = svgEl('g', { transform: `translate(${x},${base - h * at}) scale(${s * dir},${s})` }, g);
      const leaf = svgEl('g', { class: 'leaf' }, holder);
      leaf.style.setProperty('--o', '0% 50%');
      leaf.style.setProperty('--d', `${d + 0.9 + n * 0.2}s`);
      svgEl('path', { d: 'M0 0C30-22 62-14 74 10C44 22 16 18 0 0Z', fill: '#2fd873', 'fill-opacity': 0.9 }, leaf);
    });

    // Flor con resplandor
    const top = svgEl('g', { transform: `translate(${x},${base - h})`, filter: 'url(#glow)' }, g);
    const head = svgEl('g', { class: 'head' }, top);
    head.style.setProperty('--d', `${d + 1.6}s`);
    svgEl('use', { href: `#f-${kind}`, transform: `scale(${s})` }, head);
  });
}

/* ---------- Luciérnagas doradas (Canvas) ---------- */
function startFireflies() {
  const c = $('#fireflies'), ctx = c.getContext('2d');
  let W, H, last = performance.now();
  const P = [];

  const spawn = (p, init) => {
    p.x = rnd(0, W); p.y = init ? rnd(0, H) : H + 10;
    p.r = rnd(1.2, 3.2); p.ph = rnd(0, 6.28); p.sp = rnd(0.5, 1.4);
    p.vy = -rnd(6, 22); p.vx = rnd(-6, 6);
    return p;
  };

  const resize = () => {
    const d = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    c.width = W * d; c.height = H * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
    const n = Math.max(28, Math.min(90, Math.round((W * H) / 15000)));
    while (P.length < n) P.push(spawn({}, true));
    P.length = n;
  };
  addEventListener('resize', resize);
  resize();

  const k = reduceMotion ? 0.3 : 1;
  (function loop(now) {
    const dt = Math.min((now - last) / 1000, 0.05) * k;
    last = now;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    for (const p of P) {
      p.ph += dt * p.sp * 1.6;
      p.x += (p.vx + Math.sin(p.ph) * 14) * dt;
      p.y += p.vy * dt;
      if (p.y < -12) spawn(p);
      const a = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(p.ph * 1.7));
      const R = p.r * 7;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, R);
      g.addColorStop(0, `rgba(255,226,120,${a})`);
      g.addColorStop(0.25, `rgba(255,200,70,${a * 0.45})`);
      g.addColorStop(1, 'rgba(255,190,60,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, R, 0, 6.283); ctx.fill();
    }
    requestAnimationFrame(loop);
  })(last);
}

/* ---------- Inicio ---------- */
buildFlowerSymbols();
buildGarden();
startFireflies();
// Doble rAF para que el navegador pinte el estado inicial antes de animar el brote
requestAnimationFrame(() => requestAnimationFrame(() => $('#scene').classList.add('go')));
