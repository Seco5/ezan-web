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

/* ── Live clock in hero phone ── */
function updateClock() {
  const countdown = document.querySelector('.vakit-countdown');
  if (!countdown) return;

  const now = new Date();
  const targetHour = 20, targetMin = 25;
  let diff = (targetHour * 60 + targetMin) - (now.getHours() * 60 + now.getMinutes());
  if (diff < 0) diff += 1440;

  const h = Math.floor(diff / 60);
  const m = diff % 60;
  const s = 59 - now.getSeconds();
  countdown.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
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
