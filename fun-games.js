/* =====================================================
   PENJELAJAHAN ASEAN - FUN GAMES (JavaScript)
   Game 1: Pasang Bendera (Game 2 = link kuis Zep di HTML)
   ===================================================== */
(function () {
  'use strict';

  var BALL_SRC = 'countryball no background/01_ASEAN.png';

  // x, y = titik tancap bendera di peta (persen)
  var C = [
    { id: 'indonesia',   name: 'Indonesia',         x: 45.6, y: 75,   hint: 'Negara kepulauan terbesar di Asia Tenggara. Pulaunya ada ribuan!' },
    { id: 'timor-leste', name: 'Timor-Leste',       x: 65.4, y: 94,   hint: 'Negara termuda ASEAN, di bagian timur Pulau Timor.' },
    { id: 'malaysia',    name: 'Malaysia',          x: 23.8, y: 59.8, hint: 'Wilayahnya ada di Semenanjung Malaya dan di Pulau Kalimantan.' },
    { id: 'singapura',   name: 'Singapura',         x: 27.1, y: 69.1, hint: 'Negara kota yang kecil di ujung Semenanjung Malaya.' },
    { id: 'brunei',      name: 'Brunei Darussalam', x: 46.9, y: 59.8, hint: 'Negara kecil kaya minyak di utara Pulau Kalimantan.' },
    { id: 'filipina',    name: 'Filipina',          x: 59.8, y: 34.4, hint: 'Negara kepulauan di sebelah utara Indonesia.' },
    { id: 'thailand',    name: 'Thailand',          x: 20.6, y: 34.5, hint: 'Negeri Gajah Putih di daratan Asia Tenggara.' },
    { id: 'laos',        name: 'Laos',              x: 24.8, y: 25.8, hint: 'Satu-satunya negara ASEAN yang tidak punya laut.' },
    { id: 'vietnam',     name: 'Vietnam',           x: 31.9, y: 32.6, hint: 'Wilayahnya memanjang di pesisir timur daratan Asia Tenggara.' },
    { id: 'kamboja',     name: 'Kamboja',           x: 28.4, y: 41.5, hint: 'Negeri Angkor Wat, bertetangga dengan Thailand dan Vietnam.' },
    { id: 'myanmar',     name: 'Myanmar',           x: 11.6, y: 19.7, hint: 'Negara di bagian paling barat daratan Asia Tenggara.' }
  ];
  var TINY = ['brunei', 'singapura']; // area kecil: diberi toleransi sentuhan

  /* ---------- Bendera: gambar dari folder countyflag + tiang ---------- */
  var FLAG_DIR = 'countyflag/';
  var FLAG_FILE = {
    'indonesia': 'indonesia.jpg', 'timor-leste': 'timor leste.jpg', 'malaysia': 'malaysia.jpg',
    'singapura': 'singapura.jpg', 'brunei': 'brunei.jpg', 'filipina': 'filipina.jpg',
    'thailand': 'thailand.jpg', 'laos': 'laos.jpg', 'vietnam': 'vietnam.jpg',
    'kamboja': 'kamboja.jpg', 'myanmar': 'myanmar.jpg'
  };
  function flagSVG(id) {
    return '<svg viewBox="0 0 56 72" aria-hidden="true"><rect x="4" y="3" width="3" height="68" rx="1.5" fill="#8a5a2b"/>' +
      '<circle cx="5.5" cy="3" r="3" fill="#f5c542"/>' +
      '<image href="' + encodeURI(FLAG_DIR + FLAG_FILE[id]) + '" x="7" y="5" width="48" height="32" preserveAspectRatio="xMidYMid slice"/>' +
      '<rect x="7" y="5" width="48" height="32" fill="none" stroke="rgba(0,0,0,.35)"/></svg>';
  }

  /* ---------- Elemen ---------- */
  var tray = document.getElementById('flagTray');
  var stage = document.getElementById('mapStage');
  var guide = document.getElementById('guideBall');
  var speech = document.getElementById('speech');
  var okEl = document.getElementById('scoreOk');
  var badEl = document.getElementById('scoreBad');
  var finishBox = document.getElementById('finishBox');
  var finishStars = document.getElementById('finishStars');

  var placed, selected, mistakes, correct;

  /* ---------- ASEANball pemandu ---------- */
  var EXPR = ['happy', 'surprised', 'thinking', 'angry', 'sad'];
  var CLICK_TEXT = {
    happy: 'Hai! Aku ASEANball. Ayo tancapkan bendera ke negaranya masing-masing!',
    surprised: 'Wah! Kamu mengagetkanku! Aku jadi melongo, nih!',
    thinking: 'Hmm... bendera yang mana dulu ya yang mau dipasang?',
    angry: 'Grrr! Aku pura-pura marah saja. Ayo lanjut main!',
    sad: 'Huhu... jangan lupa ajak aku main sampai selesai ya!'
  };
  var exprIndex = 0;

  guide.innerHTML = '<img src="' + BALL_SRC + '" alt="ASEANball" draggable="false">' +
    '<div class="face expression-happy" id="face">' +
    '<span class="brow brow-left"></span><span class="brow brow-right"></span>' +
    '<span class="eye eye-left"><span class="pupil"></span></span><span class="eye eye-right"><span class="pupil"></span></span>' +
    '<span class="blush blush-left"></span><span class="blush blush-right"></span><span class="mouth"></span></div>';
  var face = document.getElementById('face');

  function setExpr(name) { face.className = 'face expression-' + name; exprIndex = Math.max(0, EXPR.indexOf(name)); }
  function say(text, expr) {
    if (expr) setExpr(expr);
    speech.textContent = text;
    speech.classList.remove('pop'); void speech.offsetWidth; speech.classList.add('pop');
  }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  // klik ASEANball -> ekspresi berganti
  guide.addEventListener('click', function () {
    exprIndex = (exprIndex + 1) % EXPR.length;
    say(CLICK_TEXT[EXPR[exprIndex]], EXPR[exprIndex]);
  });
  (function blink() {
    guide.classList.add('is-blinking');
    setTimeout(function () { guide.classList.remove('is-blinking'); }, 180);
    setTimeout(blink, 2500 + Math.random() * 2500);
  })();

  /* ---------- Permainan ---------- */
  function byId(id) { return C.filter(function (c) { return c.id === id; })[0]; }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  function start() {
    placed = {}; selected = null; mistakes = 0; correct = 0;
    okEl.textContent = '0'; badEl.textContent = '0';
    finishBox.hidden = true;
    stage.querySelectorAll('.placed-flag').forEach(function (n) { n.remove(); });
    tray.innerHTML = '';
    shuffle(C).forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'flag-btn'; b.dataset.id = c.id;
      b.setAttribute('aria-label', 'Bendera, pilih lalu ketuk negaranya di peta');
      b.innerHTML = flagSVG(c.id);
      tray.appendChild(b);
    });
    say('Hai! Aku ASEANball. Pilih satu bendera, lalu ketuk negaranya di peta. Bisa juga diseret ke peta!', 'happy');
  }

  function select(btn) {
    if (selected) selected.classList.remove('selected');
    if (selected === btn) { selected = null; return; }
    selected = btn; btn.classList.add('selected');
    say(pick(['Bendera ini milik negara mana ya? Ketuk negaranya di peta!', 'Hmm, coba tebak, bendera ini ada di negara mana?']), 'thinking');
  }

  // Negara di titik layar (bentuk negara, atau titik terdekat bila meleset sedikit)
  function countryAt(cx, cy) {
    var r = stage.getBoundingClientRect();
    if (cx < r.left || cx > r.right || cy < r.top || cy > r.bottom) return null;
    var px = (cx - r.left) / r.width * 100, py = (cy - r.top) / r.height * 100;
    function d(c) { return Math.hypot((c.x - px) * r.width / 100, (c.y - py) * r.height / 100); }
    for (var i = 0; i < TINY.length; i++) if (d(byId(TINY[i])) < 24) return TINY[i];
    var el = document.elementFromPoint(cx, cy), g = el && el.closest && el.closest('.country');
    if (g) return g.dataset.id;
    var best = null, bd = 1e9;
    C.forEach(function (c) { var k = d(c); if (k < bd) { bd = k; best = c; } });
    return bd < 40 ? best.id : null;
  }

  function hover(id) {
    stage.querySelectorAll('.country.drop-hover').forEach(function (n) { n.classList.remove('drop-hover'); });
    var g = id && stage.querySelector('.country[data-id="' + id + '"]');
    if (g) g.classList.add('drop-hover');
  }

  function attempt(flagId, countryId) {
    if (placed[flagId]) return;
    var c = byId(flagId);
    if (flagId === countryId) {
      placed[flagId] = true; correct++;
      okEl.textContent = correct;
      var btn = tray.querySelector('.flag-btn[data-id="' + flagId + '"]');
      btn.disabled = true; btn.classList.remove('selected'); selected = null;
      var f = document.createElement('div');
      f.className = 'placed-flag';
      f.style.left = c.x + '%'; f.style.top = c.y + '%';
      f.innerHTML = flagSVG(flagId) + '<span>' + c.name + '</span>';
      stage.appendChild(f);
      if (correct === C.length) return finish();
      say(pick(['Betul sekali! Itu ' + c.name + '!', 'Hore! Bendera ' + c.name + ' sudah berdiri!', 'Pintar! Satu negara lagi ya!']), 'happy');
    } else {
      mistakes++; badEl.textContent = mistakes;
      if (stage.animate) stage.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(0)' }], { duration: 300 });
      say('Ups, belum tepat. Petunjuk: ' + c.hint, 'sad');
    }
  }

  function finish() {
    var stars = mistakes <= 3 ? 3 : mistakes <= 8 ? 2 : 1;
    finishStars.textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
    finishBox.hidden = false;
    say('Luar biasa! Semua bendera sudah di tempatnya! Sekarang ayo lanjut ke Game 2!', 'surprised');
    setTimeout(function () { setExpr('happy'); }, 1500);
    finishBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ---------- Pilih (ketuk) atau seret bendera ---------- */
  tray.addEventListener('pointerdown', function (e) {
    var b = e.target.closest('.flag-btn');
    if (!b || b.disabled) return;
    var sx = e.clientX, sy = e.clientY, ghost = null;
    b.setPointerCapture(e.pointerId);

    function move(ev) {
      if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8) {
        ghost = b.querySelector('svg').cloneNode(true);
        ghost.setAttribute('class', 'flag-ghost');
        document.body.appendChild(ghost);
        if (selected !== b) select(b);
      }
      if (ghost) {
        ghost.style.left = ev.clientX + 'px'; ghost.style.top = ev.clientY + 'px';
        hover(countryAt(ev.clientX, ev.clientY));
      }
    }
    function up(ev) {
      b.removeEventListener('pointermove', move);
      b.removeEventListener('pointerup', up);
      b.removeEventListener('pointercancel', up);
      if (ghost) {
        ghost.remove(); hover(null);
        var t = countryAt(ev.clientX, ev.clientY);
        if (t) attempt(b.dataset.id, t);
      } else {
        select(b);
      }
    }
    b.addEventListener('pointermove', move);
    b.addEventListener('pointerup', up);
    b.addEventListener('pointercancel', up);
  });

  // Ketuk negara di peta setelah memilih bendera
  stage.addEventListener('click', function (e) {
    if (!selected) { say('Pilih benderanya dulu, baru ketuk negaranya ya!', 'thinking'); return; }
    var t = countryAt(e.clientX, e.clientY);
    if (t) attempt(selected.dataset.id, t);
  });

  document.getElementById('resetBtn').addEventListener('click', start);
  start();
})();