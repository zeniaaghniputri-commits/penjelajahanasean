/* =====================================================
   PENJELAJAHAN ASEAN - PETUNJUK & TUJUAN (JavaScript)
   ===================================================== */
(function () {
  'use strict';

  var BALL_DIR = 'countryball no background/';
  // true  = tombol "Lanjut ke Pembukaan" baru aktif setelah semua poin petunjuk diketuk
  // false = tombol langsung aktif
  var REQUIRE_ALL = true;

  // Setiap poin petunjuk disampaikan oleh countryball yang berbeda
  var SPEAKERS = {
    asean:     { name: 'ASEANball',  file: '01_ASEAN.png' },
    indonesia: { name: 'Indonesia',  file: '02_Indonesia.png' },
    malaysia:  { name: 'Malaysia',   file: '04_Malaysia.png' },
    singapura: { name: 'Singapura',  file: '05_Singapura.png' },
    filipina:  { name: 'Filipina',   file: '07_Filipina.png' },
    thailand:  { name: 'Thailand',   file: '08_Thailand.png' },
    vietnam:   { name: 'Vietnam',    file: '10_Vietnam.png' }
  };

  var RULES = [
    { who: 'asean', expr: 'happy', title: 'Selamat datang!',
      text: 'Halo, Penjelajah! Aku ASEANball. Media ini punya 6 bagian: Petunjuk, Pembukaan, Apa Itu ASEAN?, Fun Games, Rangkuman, dan Tanya Guru.' },
    { who: 'asean', expr: 'surprised', important: true, title: 'Tidak boleh dilewati!',
      text: 'Website ini tidak bisa di-skip, ya! Kamu harus belajar runtut dari awal sampai akhir: Petunjuk, Pembukaan, Apa Itu ASEAN?, Fun Games, Rangkuman, lalu Tanya Guru. Jangan loncat-loncat supaya tidak ada materi yang terlewat.' },
    { who: 'indonesia', expr: 'happy', title: 'Pembukaan',
      text: 'Di Pembukaan, kamu berkenalan dengan teman-teman petualanganmu. Bacalah materinya, lalu pencet tanda 🔊 untuk mendengarkan lagu nasional di masing-masing negara. Countryball juga bisa kamu pencet untuk mengubah ekspresinya!' },
    { who: 'malaysia', expr: 'thinking', title: 'Apa Itu ASEAN?',
      text: 'Ketuk countryball dan lihat mereka pulang ke negaranya di peta. Tonton video ASEAN sampai selesai, lalu tonton video setiap negara. Negara yang sudah ditonton diberi tanda centang.' },
    { who: 'thailand', expr: 'happy', title: 'Fun Games',
      text: 'Ada 2 permainan. Game 1: pasang bendera ke negaranya di peta. Game 2: kuis ASEAN. Kerjakan dengan teliti dan jujur, ya!' },
    { who: 'vietnam', expr: 'happy', title: 'Rangkuman',
      text: 'Di Rangkuman, ketuk kartu negara untuk membalik dan membaca catatan pentingnya. Bacalah dengan tenang supaya ingat.' },
    { who: 'filipina', expr: 'thinking', title: 'Tanya Guru',
      text: 'Kalau ada yang belum kamu pahami, tulis namamu dan pertanyaanmu di catatan, lalu kirim. Guru akan membacanya.' },
    { who: 'singapura', expr: 'happy', title: 'Tips belajar',
      text: 'Nyalakan suara perangkatmu karena ada video dan musik. Perhatikan videonya baik-baik, ya. Kalau ada yang masih bingung, catat dulu lalu tanyakan di Tanya Guru.' }
  ];

  function $(id) { return document.getElementById(id); }
  var guide = $('guideBall'), speech = $('speech'), list = $('ruleList');
  var progress = $('readProgress'), nextBtn = $('nextBtn');

  function img(file) { return encodeURI(BALL_DIR + file); }

  /* ---------- ASEANball / countryball pemandu ---------- */
  guide.innerHTML = '<img src="' + img(SPEAKERS.asean.file) + '" alt="" draggable="false">' +
    '<div class="face expression-happy" id="face">' +
    '<span class="brow brow-left"></span><span class="brow brow-right"></span>' +
    '<span class="eye eye-left"><span class="pupil"></span></span><span class="eye eye-right"><span class="pupil"></span></span>' +
    '<span class="blush blush-left"></span><span class="blush blush-right"></span><span class="mouth"></span></div>';
  var face = $('face'), guideImg = guide.querySelector('img');
  var EXPR = ['happy', 'surprised', 'thinking', 'angry', 'sad'], exprIndex = 0;

  function setExpr(name) { face.className = 'face expression-' + name; exprIndex = Math.max(0, EXPR.indexOf(name)); }
  function say(speaker, text, expr) {
    if (guideImg.getAttribute('src') !== img(speaker.file)) {
      guideImg.src = img(speaker.file);
      if (guide.animate) guide.animate([{ transform: 'scale(.8)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }], { duration: 350 });
    }
    guide.setAttribute('aria-label', speaker.name + '. Ketuk untuk mengubah ekspresi.');
    speech.innerHTML = '';
    var b = document.createElement('strong'); b.textContent = speaker.name + ': ';
    speech.appendChild(b); speech.appendChild(document.createTextNode(text));
    speech.classList.remove('pop'); void speech.offsetWidth; speech.classList.add('pop');
    if (expr) setExpr(expr);
  }

  var current = SPEAKERS.asean;
  say(current, 'Halo, Penjelajah! Ketuk poin-poin di bawah ini satu per satu untuk membaca petunjuk penggunaan media ini, ya!', 'happy');

  var CLICK_TEXT = {
    happy: 'Hore! Aku senang kamu mau membaca petunjuknya!',
    surprised: 'Wah! Kamu mengagetkanku!',
    thinking: 'Hmm... petunjuk yang mana ya yang belum kamu baca?',
    angry: 'Grrr! Aku pura-pura marah. Ayo baca semua petunjuknya!',
    sad: 'Huhu... jangan lewatkan satu petunjuk pun ya!'
  };
  guide.addEventListener('click', function () {
    exprIndex = (exprIndex + 1) % EXPR.length;
    say(current, CLICK_TEXT[EXPR[exprIndex]], EXPR[exprIndex]);
  });
  (function blink() {
    guide.classList.add('is-blinking');
    setTimeout(function () { guide.classList.remove('is-blinking'); }, 180);
    setTimeout(blink, 2500 + Math.random() * 2500);
  })();

  /* ---------- Daftar petunjuk ---------- */
  var readCount = 0;
  function updateProgress() {
    var left = RULES.length - readCount;
    if (!REQUIRE_ALL) { progress.textContent = ''; return; }
    if (left > 0) {
      progress.textContent = 'Petunjuk yang sudah dibaca: ' + readCount + ' / ' + RULES.length + '. Ketuk semua poin untuk lanjut ya!';
      nextBtn.classList.add('is-locked'); nextBtn.setAttribute('aria-disabled', 'true'); nextBtn.tabIndex = -1;
    } else {
      progress.textContent = '✅ Hebat! Semua petunjuk sudah kamu baca. Yuk, lanjut ke Pembukaan!';
      nextBtn.classList.remove('is-locked'); nextBtn.removeAttribute('aria-disabled'); nextBtn.tabIndex = 0;
    }
  }

  RULES.forEach(function (r) {
    var li = document.createElement('li');
    if (r.important) li.className = 'important';
    var b = document.createElement('button');
    b.type = 'button';
    if (r.important) {
      var badge = document.createElement('span'); badge.className = 'badge-important'; badge.textContent = 'PENTING!';
      b.appendChild(badge);
    }
    var t = document.createElement('strong'); t.textContent = r.title;
    b.appendChild(t);
    li.appendChild(b); list.appendChild(li);

    b.addEventListener('click', function () {
      list.querySelectorAll('button').forEach(function (n) { n.classList.remove('is-on'); });
      b.classList.add('is-on');
      if (!b.classList.contains('is-read')) { b.classList.add('is-read'); readCount++; updateProgress(); }
      current = SPEAKERS[r.who];
      say(current, r.text, r.expr);
    });
  });

  nextBtn.addEventListener('click', function (e) {
    if (REQUIRE_ALL && readCount < RULES.length) {
      e.preventDefault();
      say(SPEAKERS.asean, 'Eits, tunggu dulu! Ketuk semua poin petunjuk dulu ya, supaya tidak ada yang terlewat.', 'surprised');
      document.getElementById('petunjuk').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  updateProgress();
})();