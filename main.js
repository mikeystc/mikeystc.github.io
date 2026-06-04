
/* ── LANG ── */
function setLang(lang){
  document.body.classList.remove('lang-es','lang-en');
  document.body.classList.add('lang-'+lang);
  document.getElementById('btn-es').classList.toggle('active',lang==='es');
  document.getElementById('btn-en').classList.toggle('active',lang==='en');
}

/* ── THEME ── */
(function(){
  if(localStorage.getItem('theme')==='light') document.body.classList.add('light');
})();

function toggleTheme(){
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
}

/* ── DOWNLOAD ── */
function downloadCV(){
  const a=document.createElement('a');
  a.href='cv-michael-taborda.pdf';
  a.download='CV_Michael_Taborda.pdf';
  a.click();
}

/* ── CUSTOM CURSOR ── */
const curDot  = document.getElementById('cur-dot');
const curRing = document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0,raf;

document.addEventListener('mousemove',e=>{
  mx=e.clientX; my=e.clientY;
  curDot.style.left=mx+'px';
  curDot.style.top=my+'px';
  spawnParticle(mx,my);
});

document.addEventListener('mousedown',()=>document.body.classList.add('cur-click'));
document.addEventListener('mouseup',()=>document.body.classList.remove('cur-click'));

function lerpRing(){
  rx+=(mx-rx)*0.1;
  ry+=(my-ry)*0.1;
  curRing.style.left=rx+'px';
  curRing.style.top=ry+'px';
  requestAnimationFrame(lerpRing);
}
lerpRing();

document.querySelectorAll('a,button,.skill-card,.edu-card,.exp-card,.lcard,.repo-card,.book-arrow,.theme-toggle,.lang-btn').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('cur-hover'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('cur-hover'));
});

function spawnParticle(x,y){
  const p=document.createElement('div');
  Object.assign(p.style,{
    position:'fixed',pointerEvents:'none',zIndex:'99996',
    width:'4px',height:'4px',borderRadius:'50%',
    background:'var(--accent)',
    left:x+'px',top:y+'px',
    transform:'translate(-50%,-50%)',
    opacity:'0.45',
    transition:'opacity .4s ease, transform .4s ease'
  });
  document.body.appendChild(p);
  requestAnimationFrame(()=>{
    p.style.opacity='0';
    p.style.transform='translate(-50%,-50%) scale(2.5)';
  });
  setTimeout(()=>p.remove(),420);
}

/* ── BOOK / HOW I WORK ── */
let currentPage=0;
const pages=document.querySelectorAll('.book-page');
const dots=document.querySelectorAll('.book-dot');
const btnPrev=document.getElementById('book-prev');
const btnNext=document.getElementById('book-next');

function goPage(n){
  pages[currentPage].classList.remove('active');
  pages[currentPage].classList.add('exit-left');
  setTimeout(()=>pages[currentPage].classList.remove('exit-left'),500);
  dots[currentPage].classList.remove('active');
  currentPage=n;
  pages[currentPage].classList.add('active');
  dots[currentPage].classList.add('active');
  btnPrev.disabled=currentPage===0;
  btnNext.disabled=currentPage===pages.length-1;
}
if(pages.length){
  pages[0].classList.add('active');
  dots[0].classList.add('active');
  btnPrev.disabled=true;
  dots.forEach((d,i)=>d.addEventListener('click',()=>{if(i!==currentPage)goPage(i);}));
}

/* ── INTERSECTION OBSERVER ── */
const io=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target;
    el.style.opacity='';
    el.style.animation='fadeUp .65s ease both';
    el.querySelectorAll('.sk-bar,.lb-fill,.lbar').forEach(b=>b.classList.add('on'));
    io.unobserve(el);
  });
},{threshold:0.08});

document.querySelectorAll(
  '.skill-card,.edu-card,.exp-card,.cert-item,.lcard,.lb-item,.repo-card'
).forEach(el=>{
  el.style.opacity='0';
  io.observe(el);
});
