/* =====================================================
   PENJELAJAHAN ASEAN - TANYA GURU (JavaScript)
   1) Kirim pertanyaan ke Google Form
   2) Animasi countryball: trampolin -> sembunyi di balik catatan -> lari ke samping
   ===================================================== */
(function () {
  'use strict';

  /* ---------- 1. GOOGLE FORM ---------- */
  var FORM_ID = '1FAIpQLScPjN3pyzPN-ffdAAqCH8sjbMvZWYG4ZJ4psg7MM_Z_wF6K6w';
  var ENTRY_NAME = 'entry.1766181644';
  var ENTRY_QUESTION = 'entry.1121669667';
  var BASE = 'https://docs.google.com/forms/d/e/' + FORM_ID;

  function $(id) { return document.getElementById(id); }
  var note = $('note'), fName = $('fName'), fQ = $('fQ'), qCount = $('qCount');
  var sendBtn = $('sendBtn'), statusEl = $('status'), fallback = $('fallback');
  var gform = $('gform'), gframe = $('gframe');
  var pending = false, pendingTimer = null;

  gform.action = BASE + '/formResponse';

  function setStatus(text, cls) { statusEl.textContent = text; statusEl.className = 'status ' + (cls || ''); }
  function updateFallback() {
    fallback.href = BASE + '/viewform?usp=pp_url&' + ENTRY_NAME + '=' + encodeURIComponent(fName.value) +
      '&' + ENTRY_QUESTION + '=' + encodeURIComponent(fQ.value);
  }
  updateFallback();
  fallback.hidden = true;

  fQ.addEventListener('input', function () { qCount.textContent = fQ.value.length; updateFallback(); });
  fName.addEventListener('input', updateFallback);

  function done() {
    clearTimeout(pendingTimer);
    pending = false;
    fName.value = ''; fQ.value = ''; qCount.textContent = '0';
    fallback.hidden = true; updateFallback();
    setStatus('Terima kasih! Pertanyaanmu sudah dikirim ke guru. ✅', 'ok');
    setTimeout(function () { sendBtn.disabled = false; }, 4000);
  }

  // Halaman balasan Google selesai dimuat di iframe tersembunyi = terkirim
  gframe.addEventListener('load', function () { if (pending) done(); });

  note.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = fName.value.trim(), q = fQ.value.trim();
    if (!name) { setStatus('Tulis namamu dulu ya.', 'err'); fName.focus(); return; }
    if (!q) { setStatus('Tulis pertanyaanmu dulu ya.', 'err'); fQ.focus(); return; }

    gform.elements[ENTRY_NAME].value = name;
    gform.elements[ENTRY_QUESTION].value = q;
    sendBtn.disabled = true;
    setStatus('Mengirim pertanyaan...', '');
    pending = true;
    gform.submit();

    // Jika tidak ada konfirmasi, beri jalan lain lewat formulir langsung
    pendingTimer = setTimeout(function () {
      if (!pending) return;
      pending = false;
      sendBtn.disabled = false;
      fallback.hidden = false;
      setStatus('Belum bisa dipastikan terkirim. Coba lewat tautan di bawah ini ya.', 'err');
    }, 8000);
  });

  /* ---------- 2. ANIMASI COUNTRYBALL ---------- */
  // Jika perangkat meminta gerakan dikurangi, countryball ditampilkan diam (tanpa loncat/lari)
  var REDUCED = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  var BALL_DIR = 'countryball no background/';
  var FILES = ['01_ASEAN.png', '02_Indonesia.png', '03_Timor-Leste.png', '04_Malaysia.png', '05_Singapura.png', '06_Brunei.png',
               '07_Filipina.png', '08_Thailand.png', '09_Laos.png', '10_Vietnam.png', '11_Kamboja.png', '12_Myanmar.png'];
  var stage = $('stage');
  var S = 84, geo = {};
  var TRAMP_SVG = '<svg viewBox="0 0 150 60" aria-hidden="true"><g stroke="#555" stroke-width="5" stroke-linecap="round">' +
    '<path d="M22 20 L14 58"/><path d="M128 20 L136 58"/><path d="M60 22 L56 58"/><path d="M90 22 L94 58"/></g>' +
    '<rect x="4" y="8" width="142" height="14" rx="7" fill="#e24b5c"/><rect x="4" y="8" width="142" height="7" rx="3.5" fill="#ff7a89"/></svg>';

  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function anim(el, frames, opt) { return el.animate(frames, opt).finished.catch(function () {}); }

  // trampolin kiri & kanan + dua pemain
  var tramps = [0, 1].map(function () {
    var t = document.createElement('div');
    t.className = 'trampoline'; t.innerHTML = TRAMP_SVG; stage.appendChild(t); return t;
  });
  var actors = [0, 1].map(function () {
    var el = document.createElement('div');
    el.className = 'actor';
    el.innerHTML = '<div class="inner"><img alt="" draggable="false"><div class="face expression-happy">' +
      '<span class="brow brow-left"></span><span class="brow brow-right"></span>' +
      '<span class="eye eye-left"><span class="pupil"></span></span><span class="eye eye-right"><span class="pupil"></span></span>' +
      '<span class="blush blush-left"></span><span class="blush blush-right"></span><span class="mouth"></span></div></div>';
    stage.appendChild(el);
    return { el: el, img: el.querySelector('img'), face: el.querySelector('.face'), x: 0, y: 0 };
  });

  function place(a, x, y) { a.x = x; a.y = y; a.el.style.left = x + 'px'; a.el.style.top = y + 'px'; }
  function expr(a, name) { a.face.className = 'face expression-' + name; }
  function moveTo(a, x, y, ms, arc) {
    var dx = x - a.x, dy = y - a.y;
    return anim(a.el, [
      { transform: 'translate(0,0)' },
      { transform: 'translate(' + dx / 2 + 'px,' + (dy / 2 - arc) + 'px)' },
      { transform: 'translate(' + dx + 'px,' + dy + 'px)' }
    ], { duration: ms, easing: 'ease-in-out' }).then(function () { place(a, x, y); });
  }

  // Hitung posisi dari ukuran catatan dan layar
  function layout() {
    var w = stage.clientWidth;
    stage.classList.toggle('below', w < 880);
    S = w < 520 ? 68 : 84;
    stage.style.setProperty('--ball', S + 'px');
    var below = stage.classList.contains('below');
    var h = stage.clientHeight, nL = note.offsetLeft, nT = note.offsetTop, nW = note.offsetWidth;
    var nH = note.offsetHeight, tw = S * 1.9, th = tw * 0.4, k = tw / 150;
    var cx = below ? [w * 0.27, w * 0.73] : [nL / 2, w - nL / 2];
    // layar lebar: trampolin di tengah catatan (terlihat tanpa scroll); layar sempit: di bawah catatan
    var surface = below ? h - th + 10 * k : nT + nH * 0.36;
    geo = { w: w, nT: nT, surface: surface, peekX: [nL + nW * 0.28 - S / 2, nL + nW * 0.72 - S / 2], cx: cx };
    tramps.forEach(function (t, i) {
      t.style.width = tw + 'px'; t.style.height = th + 'px';
      t.style.left = (cx[i] - tw / 2) + 'px'; t.style.top = (surface - 10 * k) + 'px';
    });
  }
  var resizeTimer;
  window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(layout, 200); });

  // Satu pemain: loncat di trampolin -> sembunyi di balik catatan -> clingak-clinguk -> lari ke samping
  async function run(a, i, delay) {
    var side = i === 0 ? -1 : 1;           // 0 = lari ke kiri, 1 = lari ke kanan
    var restX = geo.cx[i] - S / 2, restY = geo.surface - S;
    await wait(delay);
    place(a, restX, restY); expr(a, 'happy'); a.el.style.opacity = 1;
    await wait(300);

    // 1. loncat-loncat di trampolin dengan ekspresi takut "waaa!"
    a.el.classList.add('scared'); expr(a, 'scared');
    for (var b = 0; b < 4; b++) {
      var hgt = 70 + b * 28;
      await anim(a.el, [
        { transform: 'translateY(0) scale(1.15,.8)', offset: 0 },
        { transform: 'translateY(' + (-hgt) + 'px) scale(.92,1.08)', offset: 0.5 },
        { transform: 'translateY(0) scale(1.15,.8)', offset: 1 }
      ], { duration: 650, easing: 'ease-in-out' });
      tramps[i].animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(.8)' }, { transform: 'scaleY(1)' }], { duration: 250 });
    }

    // 2. terlontar ke atas, lalu bersembunyi di balik tepi atas catatan
    expr(a, 'surprised');
    await moveTo(a, geo.peekX[i], geo.nT - S * 0.45, 1100, 150);
    a.el.classList.remove('scared');

    // 3. clingak-clinguk
    var looks = ['lookl', 'lookr', 'lookl', 'lookr'];
    for (var j = 0; j < looks.length; j++) { expr(a, looks[j]); await wait(450); }
    expr(a, 'surprised'); await wait(250);

    // 4. naik ke atas catatan, lalu lari ke samping sampai keluar layar
    await moveTo(a, a.x, geo.nT - S, 350, 20);
    expr(a, 'happy');
    var tx = side < 0 ? -S * 1.5 : geo.w + S * 0.5, dx = tx - a.x, frames = [];
    for (var s = 0; s <= 8; s++) {
      frames.push({ transform: 'translate(' + dx * s / 8 + 'px,' + (s % 2 ? -18 : 0) + 'px) rotate(' + side * (s % 2 ? 6 : -4) + 'deg)' });
    }
    await anim(a.el, frames, { duration: 1700, easing: 'linear' });
    a.el.style.opacity = 0;
    place(a, tx, a.y);
  }

  function pickTwo() {
    var i = Math.floor(Math.random() * FILES.length), j;
    do { j = Math.floor(Math.random() * FILES.length); } while (j === i);
    return [FILES[i], FILES[j]];
  }

  async function loop() {
    while (true) {
      layout();
      var pair = pickTwo();
      actors.forEach(function (a, i) { a.img.src = encodeURI(BALL_DIR + pair[i]); a.el.style.opacity = 0; });
      await Promise.all([run(actors[0], 0, 0), run(actors[1], 1, 500)]);
      await wait(900);
    }
  }

  // Tampilan diam untuk pengguna yang mengurangi gerakan: dua countryball mengintip dari balik catatan
  function still() {
    layout();
    var pair = pickTwo();
    actors.forEach(function (a, i) {
      a.img.src = encodeURI(BALL_DIR + pair[i]);
      place(a, geo.peekX[i], geo.nT - S * 0.45);
      expr(a, i ? 'lookr' : 'lookl');
      a.el.style.opacity = 1;
    });
  }

  window.addEventListener('load', REDUCED ? still : loop);
})();