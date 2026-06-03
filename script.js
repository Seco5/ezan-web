'use strict';

/* ── NAV scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Star field ── */
(function createStars() {
  const field = document.getElementById('starField');
  if (!field) return;
  for (let i = 0; i < 120; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      width:${size}px;
      height:${size}px;
      opacity:${Math.random()*.6+.1};
      --dur:${(Math.random()*4+2).toFixed(1)}s;
      animation-delay:${(Math.random()*4).toFixed(1)}s;
    `;
    field.appendChild(star);
  }
})();

/* ── Prayer times & live clock ── */
const VAKITLER = [
  { name: 'İMSAK',  h: 4,  m: 12 },
  { name: 'ÖĞLE',   h: 13, m: 12 },
  { name: 'İKİNDİ', h: 17, m: 4  },
  { name: 'AKŞAM',  h: 20, m: 25 },
  { name: 'YATSI',  h: 21, m: 51 },
];

function getNextVakit(nowMinutes) {
  // Find the first vakit that hasn't passed yet
  for (const v of VAKITLER) {
    const vMinutes = v.h * 60 + v.m;
    if (nowMinutes < vMinutes) return v;
  }
  // All passed → next is tomorrow's İmsak
  return VAKITLER[0];
}

function getActiveVakit(nowMinutes) {
  // The vakit whose time has most recently passed
  let active = VAKITLER[VAKITLER.length - 1]; // default: Yatsı (last of day)
  for (const v of VAKITLER) {
    if (nowMinutes >= v.h * 60 + v.m) active = v;
  }
  return active;
}

function updateClock() {
  const countdown  = document.querySelector('.vakit-countdown');
  const vakitName  = document.querySelector('.vakit-name');
  if (!countdown || !vakitName) return;

  const now        = new Date();
  const nowMins    = now.getHours() * 60 + now.getMinutes();
  const nowSecs    = now.getSeconds();

  const next       = getNextVakit(nowMins);
  const nextMins   = next.h * 60 + next.m;

  let diffMins = nextMins - nowMins;
  if (diffMins < 0) diffMins += 1440; // wraps to tomorrow

  const diffSecs = diffMins * 60 - nowSecs;
  const h = Math.floor(diffSecs / 3600);
  const m = Math.floor((diffSecs % 3600) / 60);
  const s = diffSecs % 60;

  vakitName.textContent  = next.name;
  countdown.textContent  = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;

  // Highlight active row
  const active = getActiveVakit(nowMins);
  document.querySelectorAll('.vakit-row').forEach(row => {
    row.classList.remove('active', 'next');
    const label = row.querySelector('span')?.textContent?.trim().toUpperCase();
    if (label === active.name)  row.classList.add('active');
    if (label === next.name)    row.classList.add('next');
  });
}

updateClock();
setInterval(updateClock, 1000);

/* ── Intersection Observer: fade-in on scroll ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.feature-card, .showcase-text, .download-inner').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(el);
});

/* ── Staggered feature cards ── */
document.querySelectorAll('.feature-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 60}ms`;
});
