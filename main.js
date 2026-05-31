function setLang(lang) {
  document.body.className = 'lang-' + lang;
  document.getElementById('btn-es').classList.toggle('active', lang === 'es');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
}

function downloadCV() {
  const a = document.createElement('a');
  a.href = 'cv-michael-taborda.pdf';
  a.download = 'CV_Michael_Taborda.pdf';
  a.click();
}

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeUp 0.7s ease both';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.exp-card, .edu-card, .cert-item, .skill-tag').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});
