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

/* ---------- Girasol reutilizable (<use href="#sf">) ---------- */
function buildSunflowerSymbol() {
  const g = svgEl('g', { id: 'sf' }, $('#art defs'));
  for (let i = 0; i < 16; i++)
    svgEl('ellipse', { cx: 0, cy: -36, rx: 11, ry: 25, fill: 'url(#gPetalOut)', transform: `rotate(${i * 22.5})` }, g);
  for (let i = 0; i < 16; i++)
    svgEl('ellipse', { cx: 0, cy: -31, rx: 9, ry: 20, fill: 'url(#gPetalIn)', transform: `rotate(${i * 22.5 + 11.25})` }, g);
  svgEl('circle', { r: 23, fill: 'url(#gCenter)' }, g);
  for (let i = 0; i < 45; i++) {
    const a = i * 2.39996, r = 2.3 * Math.sqrt(i);
    svgEl('circle', { cx: Math.cos(a) * r, cy: Math.sin(a) * r, r: 1, fill: '#e0a44a', opacity: 0.35 }, g);
  }
}

/* ---------- Jardín de girasoles que brotan ---------- */
function buildGarden() {
  const garden = $('#garden');
  const flowers = [
    { x: 30,  h: 200, s: 0.6 },  { x: 90,  h: 300, s: 0.85 },
    { x: 190, h: 380, s: 1 },    { x: 245, h: 250, s: 0.75 },
    { x: 555, h: 260, s: 0.75 }, { x: 612, h: 390, s: 1 },
    { x: 715, h: 310, s: 0.9 },  { x: 770, h: 210, s: 0.65 },
  ];
  const base = 592;

  flowers.forEach(({ x, h, s }, i) => {
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
    [[-1, 0.35], [1, 0.55]].forEach(([dir, at], k) => {
      const holder = svgEl('g', { transform: `translate(${x},${base - h * at}) scale(${s * dir},${s})` }, g);
      const leaf = svgEl('g', { class: 'leaf' }, holder);
      leaf.style.setProperty('--o', '0% 50%');
      leaf.style.setProperty('--d', `${d + 0.9 + k * 0.2}s`);
      svgEl('path', { d: 'M0 0C30-22 62-14 74 10C44 22 16 18 0 0Z', fill: '#2fd873', 'fill-opacity': 0.9 }, leaf);
    });

    // Cabeza de girasol con resplandor
    const top = svgEl('g', { transform: `translate(${x},${base - h})`, filter: 'url(#glow)' }, g);
    const head = svgEl('g', { class: 'head' }, top);
    head.style.setProperty('--d', `${d + 1.6}s`);
    svgEl('use', { href: '#sf', transform: `scale(${s})` }, head);
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
buildSunflowerSymbol();
buildGarden();
startFireflies();
// Doble rAF para que el navegador pinte el estado inicial antes de animar el brote
requestAnimationFrame(() => requestAnimationFrame(() => $('#scene').classList.add('go')));
