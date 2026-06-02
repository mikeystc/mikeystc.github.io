// ── LANG ──
function setLang(lang) {
  document.body.classList.remove('lang-es','lang-en');
  document.body.classList.add('lang-' + lang);
  document.getElementById('btn-es').classList.toggle('active', lang === 'es');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
}

// ── THEME ──
function toggleTheme() {
  const isLight = document.body.classList.toggle('light');
  document.getElementById('theme-icon').textContent = isLight ? '☀' : '◐';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}
(function(){
  if(localStorage.getItem('theme') === 'light'){
    document.body.classList.add('light');
    const ic = document.getElementById('theme-icon');
    if(ic) ic.textContent = '☀';
  }
})();

// ── CV DOWNLOAD ──
function downloadCV() {
  const a = document.createElement('a');
  a.href = 'cv-michael-taborda.pdf';
  a.download = 'CV_Michael_Taborda.pdf';
  a.click();
}

// ── CUSTOM CURSOR ──
const dot   = document.getElementById('cursor-dot');
const ring  = document.getElementById('cursor-ring');
const trail = document.getElementById('cursor-trail');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left  = mx + 'px';
  dot.style.top   = my + 'px';

  // Spawn trail particle
  const p = document.createElement('div');
  p.style.cssText = `
    position:fixed; width:4px; height:4px;
    background:var(--accent); border-radius:50%;
    left:${mx}px; top:${my}px;
    transform:translate(-50%,-50%);
    pointer-events:none;
    opacity:0.5;
    transition: opacity 0.5s, transform 0.5s;
    z-index:99996;
  `;
  trail.appendChild(p);
  requestAnimationFrame(() => {
    p.style.opacity = '0';
    p.style.transform = 'translate(-50%,-50%) scale(2)';
  });
  setTimeout(() => p.remove(), 500);
});

// Smooth ring follow
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

// Expand on interactive elements
document.querySelectorAll('a, button, .skill-card, .how-step, .learning-card, .edu-card, .exp-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-expand'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-expand'));
});

// ── SCROLL ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.animation = 'fadeUp 0.7s ease both';
      // Animate bars
      el.querySelectorAll('.lang-bar-fill, .learning-bar').forEach(bar => {
        bar.classList.add('animated');
      });
      observer.unobserve(el);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.exp-card, .edu-card, .cert-item, .skill-card, .how-step, .learning-card, .lang-bar-item'
).forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});
