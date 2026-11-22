/* =====================================================
   PENJELAJAHAN ASEAN - APA ITU ASEAN (JavaScript)
   ===================================================== */
(function () {
  'use strict';

  var BALL_DIR = 'countryball no background/';
  var VIDEO_DIR = 'video/';
  var VIDEO_EXT = '.mp4';            // ubah jika format videonya berbeda
  var NEXT_PAGE = 'fun-games.html';

  // x, y = posisi countryball di peta (persen)
  var DATA = [
    { id: 'asean',       name: 'ASEANball',         file: '01_ASEAN.png',       video: '01-asean',       x: 87.5, y: 13.6 },
    { id: 'indonesia',   name: 'Indonesia',         file: '02_Indonesia.png',   video: '04-indonesia',   x: 45.6, y: 75 },
    { id: 'timor-leste', name: 'Timor-Leste',       file: '03_Timor-Leste.png', video: '10-timor leste', x: 65.4, y: 92 },
    { id: 'malaysia',    name: 'Malaysia',          file: '04_Malaysia.png',    video: '07-malaysia',    x: 23.8, y: 59.8 },
    { id: 'singapura',   name: 'Singapura',         file: '05_Singapura.png',   video: '09-singapura',   x: 28.1, y: 71.2 },
    { id: 'brunei',      name: 'Brunei Darussalam', file: '06_Brunei.png',      video: '02-brunai',      x: 48.8, y: 59.4 },
    { id: 'filipina',    name: 'Filipina',          file: '07_Filipina.png',    video: '03-filipina',    x: 59.8, y: 34.4 },
    { id: 'thailand',    name: 'Thailand',          file: '08_Thailand.png',    video: '12-thailand',    x: 20.6, y: 34.5 },
    { id: 'laos',        name: 'Laos',              file: '09_Laos.png',        video: '06-laos',        x: 24.8, y: 25.8 },
    { id: 'vietnam',     name: 'Vietnam',           file: '10_Vietnam.png',     video: '11-vietnam',     x: 31.9, y: 32.6 },
    { id: 'kamboja',     name: 'Kamboja',           file: '11_Kamboja.png',     video: '05-kamboja',     x: 28.4, y: 41.5 },
    { id: 'myanmar',     name: 'Myanmar',           file: '12_Myanmar.png',     video: '08-myanmar',     x: 11.6, y: 19.7 }
  ];

  var tray = document.getElementById('tray');
  var stage = document.getElementById('mapStage');
  var overlay = document.getElementById('videoOverlay');
  var player = document.getElementById('player');
  var titleEl = document.getElementById('videoTitle');
  var errorEl = document.getElementById('videoError');
  var speechEl = document.getElementById('guideSpeech');
  var guideBall = document.getElementById('guideBall');
  var progressText = document.getElementById('progressText');
  var gamesBox = document.getElementById('gamesBox');

  var placed = false;   // apakah countryball sudah pindah ke peta?
  var busy = false;
  var current = null;
  var visited = {};
  var TOTAL = DATA.length - 1; // 11 negara (tanpa ASEANball)

  function reduced() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  /* ---------- Countryball + wajah ---------- */
  function ballHTML(c, expr) {
    return '<div class="ball">' +
      '<img src="' + BALL_DIR + c.file + '" alt="" draggable="false">' +
      '<div class="ball-face expression-' + expr + '">' +
        '<span class="brow brow-left"></span><span class="brow brow-right"></span>' +
        '<span class="eye eye-left"><span class="pupil"></span></span>' +
        '<span class="eye eye-right"><span class="pupil"></span></span>' +
        '<span class="blush blush-left"></span><span class="blush blush-right"></span>' +
        '<span class="mouth"></span>' +
      '</div></div>';
  }

  /* ---------- Bangun baris countryball & ball di peta ---------- */
  DATA.forEach(function (c) {
    var t = document.createElement('button');
    t.type = 'button';
    t.className = 'tray-item';
    t.setAttribute('aria-label', 'Kirim countryball ' + c.name + ' ke peta');
    t.innerHTML = ballHTML(c, 'happy');
    t.addEventListener('click', flyAll);
    tray.appendChild(t);
    c.trayEl = t;

    var m = document.createElement('button');
    m.type = 'button';
    m.className = 'map-ball';
    m.style.left = c.x + '%';
    m.style.top = c.y + '%';
    m.setAttribute('aria-label', c.id === 'asean' ? 'Putar ulang video ASEAN' : 'Tonton video ' + c.name);
    m.innerHTML = ballHTML(c, 'happy') + '<span class="map-label">' + c.name + '</span>';
    m.addEventListener('click', function () { openVideo(c); });
    stage.appendChild(m);
    c.mapEl = m;

    // klik bentuk negara di peta
    var shape = stage.querySelector('.country[data-id="' + c.id + '"]');
    if (shape) {
      c.shapeEl = shape;
      shape.addEventListener('click', function () { if (placed) openVideo(c); });
    }
  });

  // Kedipan acak
  function blinkAll() {
    document.querySelectorAll('.ball').forEach(function (b) {
      if (Math.random() < 0.5) return;
      b.classList.add('is-blinking');
      setTimeout(function () { b.classList.remove('is-blinking'); }, 180);
    });
    setTimeout(blinkAll, 2500 + Math.random() * 2000);
  }
  blinkAll();

  /* ---------- Countryball terbang ke negaranya ---------- */
  function fly(c, delay) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var from = c.trayEl.getBoundingClientRect();
        var ballEl = c.mapEl.querySelector('.ball').getBoundingClientRect();
        var clone = c.trayEl.cloneNode(true);
        clone.style.cssText = 'position:fixed;margin:0;z-index:600;pointer-events:none;animation:none;' +
          'left:' + from.left + 'px;top:' + from.top + 'px;width:' + from.width + 'px;height:' + from.height + 'px;' +
          'transform-origin:top left;';
        document.body.appendChild(clone);
        c.trayEl.style.visibility = 'hidden';

        var dx = ballEl.left - from.left;
        var dy = ballEl.top - from.top;
        var s = ballEl.width / from.width;

        function done() {
          c.mapEl.style.visibility = 'visible';
          clone.remove();
          resolve();
        }
        if (reduced() || !clone.animate) { done(); return; }

        var a = clone.animate([
          { transform: 'translate(0,0) scale(1)' },
          { transform: 'translate(' + dx * 0.5 + 'px,' + (dy * 0.5 - 70) + 'px) scale(' + (1 + s) / 2 * 1.2 + ')', offset: 0.55 },
          { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')' }
        ], { duration: 900, easing: 'ease-in-out', fill: 'forwards' });
        a.onfinish = done;
      }, delay);
    });
  }

  function flyAll() {
    if (placed || busy) return;
    busy = true;
    stage.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'center' });

    wait(reduced() ? 0 : 700).then(function () {
      return Promise.all(DATA.map(function (c, i) { return fly(c, i * 120); }));
    }).then(function () {
      placed = true;
      busy = false;
      return wait(500);
    }).then(function () {
      openVideo(DATA[0]); // video pengantar ASEAN
    });
  }

  /* ---------- Video ---------- */
  function openVideo(c) {
    if (!placed) return;
    current = c;
    var isIntro = c.id === 'asean';

    titleEl.textContent = isIntro ? 'Apa Itu ASEAN?' : 'Mengenal ' + c.name;
    speechEl.textContent = isIntro
      ? 'Hmm, apa sih ASEAN itu? Ayo simak bersama-sama!'
      : 'Halo! Aku ' + c.name + '. Ayo kenalan dengan negaraku!';
    // ASEANball penasaran; countryball negara tampil senang
    guideBall.innerHTML = ballHTML(c, isIntro ? 'curious' : 'happy');

    errorEl.hidden = true;
    player.src = encodeURI(VIDEO_DIR + c.video + VIDEO_EXT); // encodeURI: nama file boleh memakai spasi
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';

    var p = player.play();
    if (p && p.catch) p.catch(function () { /* menunggu siswa menekan tombol putar */ });
  }

  function closeVideo() {
    player.pause();
    player.removeAttribute('src');
    player.load();
    overlay.hidden = true;
    document.body.style.overflow = '';
    stage.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'center' });
  }

  function markVisited(c) {
    if (!c || c.id === 'asean' || visited[c.id]) return;
    visited[c.id] = true;
    // Simpan progres di browser supaya Paspor di halaman Rangkuman ikut terisi
    try {
      var saved = JSON.parse(localStorage.getItem('asean.visited') || '[]');
      Object.keys(visited).forEach(function (k) { if (saved.indexOf(k) === -1) saved.push(k); });
      localStorage.setItem('asean.visited', JSON.stringify(saved));
    } catch (e) { /* abaikan jika penyimpanan tidak tersedia */ }
    c.mapEl.classList.add('visited');
    if (c.shapeEl) c.shapeEl.classList.add('visited');
    var n = Object.keys(visited).length;
    progressText.textContent = n + ' / ' + TOTAL;
    c.mapEl.setAttribute('aria-label', 'Sudah ditonton: ' + c.name + '. Ketuk untuk menonton lagi.');

    if (n === TOTAL) {
      gamesBox.hidden = false;
    }
  }

  // Centang diberikan begitu video negara mulai diputar
  player.addEventListener('playing', function () { markVisited(current); });
  // Video selesai -> kembali ke peta
  player.addEventListener('ended', function () {
    var allDone = Object.keys(visited).length === TOTAL;
    closeVideo();
    if (allDone) {
      setTimeout(function () {
        gamesBox.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'center' });
      }, 400);
    }
  });
  player.addEventListener('error', function () {
    var src = player.getAttribute('src');
    if (overlay.hidden || !src) return; // abaikan error saat video dikosongkan
    var pesan = 'Video tidak bisa diputar: ' + decodeURI(src) + '. ';
    function tampil(t) { errorEl.textContent = pesan + t; errorEl.hidden = false; }
    var tipCodec = 'Format harus MP4 dengan codec H.264 + AAC.';
    if (location.protocol.indexOf('http') === 0 && window.fetch) {
      fetch(src, { method: 'HEAD' }).then(function (r) {
        tampil(r.ok ? 'File ditemukan, tetapi codec tidak didukung browser. ' + tipCodec
                    : 'File tidak ditemukan (kode ' + r.status + '). Periksa nama file dan huruf besar-kecil.');
      }).catch(function () { tampil('Periksa nama file. ' + tipCodec); });
    } else {
      tampil('Periksa nama file di folder video. ' + tipCodec);
    }
  });

  document.getElementById('closeVideo').addEventListener('click', closeVideo);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !overlay.hidden) closeVideo();
  });

  gamesBox.querySelector('a').setAttribute('href', NEXT_PAGE);
})();