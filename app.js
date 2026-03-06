// ================================================
// PARAM COMPUTER CENTRE — app.js
// Reads Google Sheets via CSV. No timeout errors.
// ================================================

// ── CSV Parser ──────────────────────────────────
function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = splitCSVLine(lines[0]).map(h => h.trim().toLowerCase().replace(/\s+/g,'_'));
  return lines.slice(1).map(line => {
    const vals = splitCSVLine(line);
    const obj = {};
    headers.forEach((h, i) => { obj[h] = (vals[i] || '').trim(); });
    return obj;
  }).filter(r => Object.values(r).some(v => v));
}

function splitCSVLine(line) {
  const out = []; let cur = '', q = false;
  for (const ch of line) {
    if (ch === '"') q = !q;
    else if (ch === ',' && !q) { out.push(cur); cur = ''; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}

// ── Fetch with 5-min cache ──────────────────────
const _cache = {};
async function getSheet(name) {
  const now = Date.now();
  if (_cache[name] && now - _cache[name].t < 300000) return _cache[name].d;
  const res = await fetch(PCC.csv(name));
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const data = parseCSV(await res.text());
  _cache[name] = { d: data, t: now };
  return data;
}

// ── Helpers ─────────────────────────────────────
const starStr  = n => '★'.repeat(Math.min(+n||5,5)) + '☆'.repeat(Math.max(0,5-(+n||5)));
const AVC = ['#0d2137','#e91e63','#4caf50','#1565c0','#7b1fa2','#ff6f00','#004d40'];
const avCol = s => { let h=0; for(const c of s) h=(h*31+c.charCodeAt(0))%AVC.length; return AVC[h]; };

// ================================================
// HERO CAROUSEL  (sheet: carousel)
// ================================================
async function initCarousel() {
  const wrap = document.getElementById('carousel-wrap');
  if (!wrap) return;

  let slides;
  try { slides = await getSheet('carousel'); }
  catch(e) {
    // fallback static slide if sheet not connected yet
    slides = [{
      title:'Param Computer Centre', subtitle:'Giaspura, Ludhiana',
      description:'Quality computer courses & digital services since 2018. Add your Google Sheet ID in config.js to load live data.',
      badge:'🏆 6 Years of Excellence', btn_text:'View Courses', btn_link:'courses.html'
    }];
  }

  const track = document.getElementById('carousel-track');
  const dots  = document.getElementById('carousel-dots');
  track.innerHTML = ''; dots.innerHTML = '';

  slides.forEach((s, i) => {
    const el = document.createElement('div');
    el.className = 'carousel-slide';
    el.innerHTML = `
      <div class="slide-blob1"></div><div class="slide-blob2"></div>
      <div class="slide-content">
        ${s.badge ? `<div class="slide-badge">${s.badge}</div>` : ''}
        <h1 class="slide-title">${s.title||''}</h1>
        ${s.subtitle ? `<p class="slide-sub">${s.subtitle}</p>` : ''}
        <p class="slide-desc">${s.description||''}</p>
        <div class="slide-btns">
          ${s.btn_text ? `<a href="${s.btn_link||'#'}" class="btn-p">${s.btn_text}</a>` : ''}
          <a href="contact.html" class="btn-o">Enquire Now</a>
        </div>
      </div>`;
    track.appendChild(el);

    const d = document.createElement('button');
    d.className = 'c-dot' + (i===0?' on':'');
    d.onclick = () => goTo(i);
    dots.appendChild(d);
  });

  let cur = 0, timer;
  function goTo(n) {
    cur = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${cur*100}%)`;
    dots.querySelectorAll('.c-dot').forEach((d,i) => d.classList.toggle('on', i===cur));
    clearInterval(timer);
    timer = setInterval(() => goTo(cur+1), PCC.speed||5000);
  }
  document.getElementById('c-prev')?.addEventListener('click', () => goTo(cur-1));
  document.getElementById('c-next')?.addEventListener('click', () => goTo(cur+1));

  // swipe
  let tx = 0;
  track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, {passive:true});
  track.addEventListener('touchend',   e => { const d=e.changedTouches[0].clientX-tx; if(Math.abs(d)>50) goTo(cur+(d<0?1:-1)); });

  timer = setInterval(() => goTo(1), PCC.speed||5000);
}

// ================================================
// MINI COURSE CAROUSEL  (sheet: courses)
// ================================================
async function initMiniCarousel() {
  const track = document.getElementById('mini-track');
  if (!track) return;

  let courses;
  try { courses = await getSheet('courses'); }
  catch(e) { track.innerHTML='<p style="color:#888;padding:20px">Connect Google Sheets in config.js to show courses.</p>'; return; }

  track.innerHTML = '';
  courses.forEach(c => {
    const topics = (c.topics||'').split('|').slice(0,4);
    const card = document.createElement('div');
    card.className = 'mc-card';
    card.innerHTML = `
      <div class="mc-head" style="background:linear-gradient(135deg,${c.color_from||'#0d2137'},${c.color_to||'#334'})">
        <span class="mc-icon">${c.icon||'💻'}</span>
        <div><h3>${c.name||c.short_name}</h3><span class="mc-short">${c.short_name||''}</span></div>
      </div>
      <div class="mc-body">
        ${c.duration?`<span class="mc-dur">⏱ ${c.duration}</span>`:''}
        <div class="mc-tags">${topics.map(t=>`<span>${t.trim()}</span>`).join('')}</div>
        <a href="courses.html" class="mc-link">Full Syllabus →</a>
      </div>`;
    track.appendChild(card);
  });

  const vis  = () => window.innerWidth < 640 ? 1 : window.innerWidth < 960 ? 2 : 3;
  const cw   = () => { const c = track.querySelector('.mc-card'); return c ? c.offsetWidth+20 : 280; };
  let cur = 0;

  function go(n) {
    cur = Math.max(0, Math.min(n, courses.length - vis()));
    track.style.transform = `translateX(-${cur * cw()}px)`;
    buildDots();
  }
  function buildDots() {
    const dw = document.getElementById('mini-dots');
    if (!dw) return;
    const pages = Math.ceil(courses.length / vis());
    dw.innerHTML = '';
    for (let i=0; i<pages; i++) {
      const d = document.createElement('button');
      d.className = 'mc-dot' + (i === Math.floor(cur/vis()) ? ' on' : '');
      d.onclick = () => go(i * vis());
      dw.appendChild(d);
    }
  }
  document.getElementById('mini-prev')?.addEventListener('click', () => go(cur - vis()));
  document.getElementById('mini-next')?.addEventListener('click', () => go(cur + vis()));
  window.addEventListener('resize', () => go(0));
  buildDots();
}

// ================================================
// REVIEWS  (sheet: reviews)
// ================================================
async function initReviews() {
  const el = document.getElementById('reviews-wrap');
  if (!el) return;

  let rows;
  try { rows = await getSheet('reviews'); }
  catch(e) { el.innerHTML='<p style="text-align:center;color:#888">Reviews will appear here once Google Sheets is connected.</p>'; return; }

  el.innerHTML = `<div class="rv-grid">
    ${rows.map(r=>`
    <div class="rv-card" data-anim>
      <div class="rv-stars">${starStr(r.rating)}</div>
      <p class="rv-text">"${r.review||''}"</p>
      <div class="rv-author">
        <div class="rv-av" style="background:${avCol(r.name||'?')}">${(r.initials||r.name||'?')[0].toUpperCase()}</div>
        <div><strong>${r.name||'Student'}</strong><span>${r.course||''}</span></div>
      </div>
    </div>`).join('')}
  </div>`;
  animate();
}

// ================================================
// COURSES PAGE  (sheet: courses)
// ================================================
async function initCoursesPage() {
  const el = document.getElementById('courses-wrap');
  if (!el) return;

  let rows;
  try { rows = await getSheet('courses'); }
  catch(e) { el.innerHTML=errCard('courses'); return; }

  el.innerHTML = rows.map(c => {
    const topics = (c.topics||'').split('|');
    const half = Math.ceil(topics.length/2);
    return `<div class="cd-card" data-anim>
      <div class="cd-head" style="background:linear-gradient(135deg,${c.color_from||'#0d2137'},${c.color_to||'#334'})">
        <span style="font-size:2.4rem">${c.icon||'💻'}</span>
        <div><h2>${c.name||c.short_name}</h2><p>${c.tagline||''}</p></div>
        ${c.duration?`<div class="cd-badge">⏱ ${c.duration}</div>`:''}
      </div>
      <div class="cd-body">
        <div>
          <h4 class="cd-label">About</h4>
          <p style="color:var(--muted);font-size:.9rem">${c.tagline||''} — offered at Param Computer Centre, Giaspura Ludhiana.</p>
          <p style="margin-top:10px;font-size:.88rem"><strong>Short Name:</strong> ${c.short_name||''} &nbsp;|&nbsp; <strong>Duration:</strong> ${c.duration||'Flexible'}</p>
        </div>
        <div>
          <h4 class="cd-label">What You'll Learn</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 10px">
            <ul class="cd-ul">${topics.slice(0,half).map(t=>`<li>✅ ${t.trim()}</li>`).join('')}</ul>
            <ul class="cd-ul">${topics.slice(half).map(t=>`<li>✅ ${t.trim()}</li>`).join('')}</ul>
          </div>
        </div>
      </div>
      <div style="padding:0 28px 24px">
        <a href="contact.html" class="btn-p">Enquire About ${c.short_name||c.name}</a>
      </div>
    </div>`;
  }).join('');
  animate();
}

// ================================================
// SERVICES PAGE  (sheet: services)
// ================================================
async function initServicesPage() {
  const el = document.getElementById('services-wrap');
  if (!el) return;

  let rows;
  try { rows = await getSheet('services'); }
  catch(e) { el.innerHTML=errCard('services'); return; }

  el.innerHTML = `<div class="sv-grid">
    ${rows.map(s=>{
      const items = (s.items||'').split('|');
      return `<div class="sv-card" data-anim>
        <div class="sv-head" style="background:linear-gradient(135deg,${s.color_from||'#0d2137'},${s.color_to||'#334'})">
          <span style="font-size:2.8rem">${s.icon||'🔧'}</span>
        </div>
        <div class="sv-body">
          <h3>${s.name||''}</h3>
          <p>${s.description||''}</p>
          <div class="sv-items">${items.map(i=>`<div class="sv-item">${i.trim()}</div>`).join('')}</div>
        </div>
      </div>`;
    }).join('')}
  </div>`;
  animate();
}

// ── Error card ──────────────────────────────────
function errCard(name) {
  return `<div style="background:#fff3f3;border:1.5px solid #ffcccc;border-radius:12px;padding:32px;text-align:center;color:#c62828">
    <strong>⚠️ Cannot load ${name}</strong>
    <p style="margin-top:8px;font-size:.9rem">Open config.js and paste your Google Sheet ID. Make sure the sheet is shared publicly as Viewer.</p>
  </div>`;
}

// ── Scroll animations ───────────────────────────
function animate() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const siblings = [...(e.target.parentElement?.querySelectorAll('[data-anim]')||[])];
      const i = siblings.indexOf(e.target);
      setTimeout(() => e.target.classList.add('show'), i * 80);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('[data-anim]').forEach(el => obs.observe(el));
}

// ── Navbar ──────────────────────────────────────
function initNav() {
  const nb = document.getElementById('navbar');
  const hb = document.getElementById('hb');
  const nl = document.getElementById('nav-links');
  window.addEventListener('scroll', () => {
    nb.style.background = window.scrollY > 50 ? 'rgba(13,33,55,.97)' : '#0d2137';
  });
  hb?.addEventListener('click', () => {
    const open = nl.classList.toggle('open');
    const sp = hb.querySelectorAll('span');
    sp[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
    sp[1].style.opacity   = open ? '0' : '1';
    sp[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
  nl?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nl.classList.remove('open');
    hb?.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
  }));
}

// ── Page loader ─────────────────────────────────
function hideLoader() {
  setTimeout(() => document.getElementById('loader')?.classList.add('done'), 1200);
}

// ── Contact form ─────────────────────────────────
window.sendForm = function(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  btn.textContent = "✅ Sent! We'll call you soon.";
  btn.style.background = '#0097a7';
  setTimeout(() => { btn.textContent = 'Send Enquiry →'; btn.style.background = ''; e.target.reset(); }, 4000);
};

// ── Init ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  hideLoader();
  animate();
  const p = document.body.dataset.page;
  if (p === 'home')     { initCarousel(); initMiniCarousel(); initReviews(); }
  if (p === 'courses')  { initCoursesPage(); }
  if (p === 'services') { initServicesPage(); }
});
