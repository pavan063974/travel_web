/* ===== Prithvi Holidays shared scripts ===== */
document.addEventListener('DOMContentLoaded',()=>{

  /* loader */
  const loader=document.getElementById('loader');
  if(loader)window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('done'),500));

  /* navbar scrolled + mobile toggle */
  const nav=document.querySelector('.navbar');
  const onScroll=()=>nav&&nav.classList.toggle('scrolled',window.scrollY>40);
  onScroll();window.addEventListener('scroll',onScroll);

  const toggle=document.querySelector('.nav-toggle'),menu=document.querySelector('.nav-menu');
  if(toggle){toggle.addEventListener('click',()=>{menu.classList.toggle('open');toggle.classList.toggle('x');});
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');toggle.classList.remove('x');}));}

  /* reveal on scroll */
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  /* skill bars */
  const sb=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.style.width=e.target.dataset.fill+'%';sb.unobserve(e.target);}}),{threshold:.4});
  document.querySelectorAll('.fill').forEach(el=>sb.observe(el));

  /* stat counters */
  const cio=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target,to=+el.dataset.to,suf=el.dataset.suf||'',t=Date.now();
    (function tick(){const p=Math.min((Date.now()-t)/1600,1),v=Math.floor((1-Math.pow(1-p,3))*to);
      el.textContent=(to>=10000?(v/1000).toFixed(p<1?1:0)+'k':v.toLocaleString())+suf;
      if(p<1)requestAnimationFrame(tick);else el.textContent=(to>=10000?(to/1000)+'k':to.toLocaleString())+suf;})();
    cio.unobserve(el);
  }),{threshold:.5});
  document.querySelectorAll('.n[data-to]').forEach(el=>cio.observe(el));

  /* newsletter */
  const nb=document.getElementById('newsBtn');
  if(nb){const ne=document.getElementById('newsEmail'),no=document.getElementById('newsOk');
    const go=()=>{if(/\S+@\S+\.\S+/.test(ne.value)){no.style.display='block';ne.value='';setTimeout(()=>no.style.display='none',4000);}else ne.focus();};
    nb.addEventListener('click',go);ne.addEventListener('keydown',e=>{if(e.key==='Enter')go();});}

  /* contact form */
  const cf=document.getElementById('contactForm');
  if(cf)cf.addEventListener('submit',e=>{e.preventDefault();
    const ok=document.getElementById('formOk');ok.style.display='block';cf.reset();
    ok.scrollIntoView({behavior:'smooth',block:'center'});});

  /* back to top */
  const top=document.querySelector('.to-top');
  if(top){window.addEventListener('scroll',()=>top.classList.toggle('show',window.scrollY>500));
    top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));}

  /* footer year */
  const yr=document.getElementById('year');if(yr)yr.textContent=new Date().getFullYear();
});
