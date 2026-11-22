/* =====================================================
   PENJELAJAHAN ASEAN - RANGKUMAN (JavaScript)
   ===================================================== */
(function () {
  'use strict';

  var BALL_DIR = 'countryball no background/';
  var FLAG_DIR = 'countyflag/';

  // Isi kartu mengikuti skrip video
  var DATA = [
    { id: 'indonesia', name: 'Indonesia', ball: '02_Indonesia.png', flag: 'indonesia.jpg', founder: true, year: 1967,
      capital: 'Jakarta', money: 'Rupiah', culture: 'Batik, angklung, Tari Saman, dan Tari Kecak. Banyak pulau, suku, dan bahasa daerah.',
      place: 'Di antara Benua Asia dan Australia, serta Samudra Hindia dan Samudra Pasifik.' },
    { id: 'timor-leste', name: 'Timor-Leste', ball: '03_Timor-Leste.png', flag: 'timor leste.jpg', year: 2025,
      capital: 'Dili', money: 'Dolar Amerika Serikat (ada juga uang pecahan centavo)', culture: 'Tais, kain tradisional yang dibuat dengan cara ditenun.',
      place: 'Di bagian timur Pulau Timor, berbatasan darat dengan Indonesia.' },
    { id: 'malaysia', name: 'Malaysia', ball: '04_Malaysia.png', flag: 'malaysia.jpg', founder: true, year: 1967,
      capital: 'Kuala Lumpur', money: 'Ringgit Malaysia', culture: 'Nasi lemak dan Menara Kembar Petronas. Masyarakatnya berbudaya beragam.',
      place: 'Semenanjung Malaysia dan Malaysia Timur di Pulau Kalimantan.' },
    { id: 'singapura', name: 'Singapura', ball: '05_Singapura.png', flag: 'singapura.jpg', founder: true, year: 1967,
      capital: 'Singapura', money: 'Dolar Singapura', culture: 'Merlion, patung berkepala singa dan berbadan ikan. Budaya Melayu, Tionghoa, dan India.',
      place: 'Dekat ujung selatan Semenanjung Malaya, di sebelah selatan Malaysia.' },
    { id: 'brunei', name: 'Brunei Darussalam', ball: '06_Brunei.png', flag: 'brunei.jpg', year: 1984,
      capital: 'Bandar Seri Begawan', money: 'Dolar Brunei', culture: 'Budaya Melayu yang kuat. Bangunan terkenal: Masjid Sultan Omar Ali Saifuddien.',
      place: 'Di bagian utara Pulau Kalimantan.' },
    { id: 'filipina', name: 'Filipina', ball: '07_Filipina.png', flag: 'filipina.jpg', founder: true, year: 1967,
      capital: 'Manila', money: 'Peso Filipina', culture: 'Tari Tinikling, gerakan kaki di antara batang-batang bambu. Negara kepulauan.',
      place: 'Di bagian barat Samudra Pasifik, di sebelah timur Vietnam.' },
    { id: 'thailand', name: 'Thailand', ball: '08_Thailand.png', flag: 'thailand.jpg', founder: true, year: 1967,
      capital: 'Bangkok', money: 'Baht', culture: 'Kuil-kuil yang indah dan Tom Yum, sup dengan rasa khas.',
      place: 'Di daratan Asia Tenggara, berbatasan dengan Myanmar, Laos, Kamboja, dan Malaysia.' },
    { id: 'laos', name: 'Laos', ball: '09_Laos.png', flag: 'laos.jpg', year: 1997,
      capital: 'Vientiane', money: 'Kip', culture: 'Satu-satunya negara di Asia Tenggara tanpa wilayah laut. Budayanya banyak dipengaruhi agama Buddha.',
      place: 'Di daratan Asia Tenggara, berbatasan dengan Thailand, Vietnam, dan Kamboja.' },
    { id: 'vietnam', name: 'Vietnam', ball: '10_Vietnam.png', flag: 'vietnam.jpg', year: 1995,
      capital: 'Hanoi', money: 'Dong', culture: 'Pakaian Ao Dai, makanan pho, dan Ha Long Bay yang indah.',
      place: 'Di timur daratan Asia Tenggara, wilayahnya memanjang dari utara ke selatan.' },
    { id: 'kamboja', name: 'Kamboja', ball: '11_Kamboja.png', flag: 'kamboja.jpg', year: 1999,
      capital: 'Phnom Penh', money: 'Riel', culture: 'Angkor Wat dan Tari Apsara.',
      place: 'Di daratan Asia Tenggara, pantainya menghadap Teluk Thailand.' },
    { id: 'myanmar', name: 'Myanmar', ball: '12_Myanmar.png', flag: 'myanmar.jpg', year: 1997,
      capital: 'Naypyidaw', money: 'Kyat', culture: 'Bangunan bersejarah dan tempat ibadah, seperti Bagan yang punya banyak pagoda.',
      place: 'Di bagian barat daratan Asia Tenggara.' }
  ];

  function img(dir, file) { return encodeURI(dir + file); }
  function el(id) { return document.getElementById(id); }

  /* ---------- Kartu negara ---------- */
  var grid = el('countryGrid');
  DATA.forEach(function (c) {
    var b = document.createElement('div');
    b.className = 'country-card';
    b.setAttribute('role', 'button');
    b.tabIndex = 0;
    b.setAttribute('aria-pressed', 'false');
    b.setAttribute('aria-label', 'Kartu ' + c.name + '. Tekan untuk membalik.');
    b.innerHTML =
      '<div class="front"><img class="ball-img" src="' + img(BALL_DIR, c.ball) + '" alt="" draggable="false">' +
      '<img class="flag-img" src="' + img(FLAG_DIR, c.flag) + '" alt="Bendera ' + c.name + '">' +
      '<h3>' + c.name + '</h3>' + (c.founder ? '<span class="badge-founder">⭐ Negara pendiri</span>' : '') + '</div>' +
      '<div class="back"><h3>' + c.name + '</h3><dl>' +
      '<dt>Ibu kota</dt><dd>' + c.capital + '</dd><dt>Mata uang</dt><dd>' + c.money + '</dd>' +
      '<dt>Budaya &amp; ciri khas</dt><dd>' + c.culture + '</dd>' +
      '<dt>Bergabung ke ASEAN</dt><dd>' + c.year + '</dd><dt>Letak</dt><dd>' + c.place + '</dd></dl></div>';
    function flip() { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); }
    b.addEventListener('click', function (e) {
      flip();
    });
    b.addEventListener('keydown', function (e) {
      if (e.target === b && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); flip(); }
    });
    grid.appendChild(b);
  });

  el('printBtn').addEventListener('click', function () { window.print(); });

  /* ---------- ASEANball pemandu "Ingat Ya!" ---------- */
  var EXPR = ['happy', 'surprised', 'thinking', 'angry', 'sad'];
  var CLICK_TEXT = {
    happy: 'Hai! Ini hal-hal penting yang wajib kamu ingat. Ketuk poinnya, ya!',
    surprised: 'Wah! Kamu mengagetkanku! Aku jadi melongo, nih!',
    thinking: 'Hmm... poin yang mana ya yang paling kamu ingat?',
    angry: 'Grrr! Aku pura-pura marah saja. Ayo baca lagi poinnya!',
    sad: 'Huhu... jangan lupa baca semua poin sampai selesai ya!'
  };
  var guide = el('guideBall'), speech = el('speech'), exprIndex = 0;
  guide.innerHTML = '<img src="' + img(BALL_DIR, '01_ASEAN.png') + '" alt="ASEANball" draggable="false">' +
    '<div class="face expression-happy" id="face">' +
    '<span class="brow brow-left"></span><span class="brow brow-right"></span>' +
    '<span class="eye eye-left"><span class="pupil"></span></span><span class="eye eye-right"><span class="pupil"></span></span>' +
    '<span class="blush blush-left"></span><span class="blush blush-right"></span><span class="mouth"></span></div>';
  var face = el('face');
  function say(text, expr) {
    if (expr) { face.className = 'face expression-' + expr; exprIndex = EXPR.indexOf(expr); }
    speech.textContent = text;
    speech.classList.remove('pop'); void speech.offsetWidth; speech.classList.add('pop');
  }
  say(CLICK_TEXT.happy, 'happy');

  guide.addEventListener('click', function () {
    exprIndex = (exprIndex + 1) % EXPR.length;
    say(CLICK_TEXT[EXPR[exprIndex]], EXPR[exprIndex]);
  });
  (function blink() {
    guide.classList.add('is-blinking');
    setTimeout(function () { guide.classList.remove('is-blinking'); }, 180);
    setTimeout(blink, 2500 + Math.random() * 2500);
  })();

  // ketuk poin -> ASEANball menyebutkannya
  var points = el('rememberList').querySelectorAll('button');
  points.forEach(function (p) {
    p.addEventListener('click', function () {
      points.forEach(function (n) { n.classList.remove('is-on'); });
      p.classList.add('is-on');
      say('Ingat ya! ' + p.textContent, 'happy');
    });
  });
})();