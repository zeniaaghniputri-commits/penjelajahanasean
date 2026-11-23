/* =====================================================
   PENJELAJAHAN ASEAN - script.js (Halaman Beranda)
   ===================================================== */
(function () {
  'use strict';

  /* ---------- 1. PENGATURAN ---------- */
  // Ubah "ready" menjadi true ketika halamannya sudah dibuat.
  const PAGES = {
    'petunjuk_penggunaan.html': {
      name: 'Petunjuk',
      emoji: '📖',
      ready: true,
      message: 'Petunjuk penggunaan sedang disiapkan. Sebentar lagi ya!'
    },
    'pembukaan.html': {
      name: 'Pembukaan',
      emoji: '🚪',
      ready: true,
      message: 'Gerbang petualangan sedang dihias. Sebentar lagi kamu bisa masuk!'
    },
    'apa-itu-asean.html': {
      name: 'Apa Itu ASEAN?',
      emoji: '🗺️',
      ready: true,
      message: 'Peta ASEAN sedang digambar oleh para penjelajah. Tunggu sebentar ya!'
    },
    'fun-games.html': {
      name: 'Fun Games',
      emoji: '🎮',
      ready: true,
      message: 'Permainan seru sedang disiapkan. Siap-siap bermain nanti!'
    },
    'rangkuman.html': {
      name: 'Rangkuman',
      emoji: '📒',
      ready: true,
      message: 'Buku catatan petualangan sedang ditulis. Segera hadir!'
    },
    'tanya-guru.html': {
      name: 'Tanya Guru',
      emoji: '💡',
      ready: true,
      message: 'Pikirkan hal yang kamu belum mengerti!'
    }
  };

  const OPENING_PAGE = 'petunjuk.html';
  const TOAST_DURATION = 4500;
  const SPARKLE_ICONS = ['⭐', '✨', '🌴', '🌺', '🦜', '🐠'];

  /* ---------- 2. FUNGSI BANTU ---------- */

  // Apakah pengguna meminta gerakan dikurangi?
  function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  // Mengambil nama file dari href, contoh "pembukaan.html"
  function getPageKey(href) {
    if (!href) return null;
    const clean = href.split('#')[0].split('?')[0];
    if (!clean) return null;
    return clean.split('/').pop().toLowerCase();
  }

  // Titik klik; jika memakai keyboard, pakai titik tengah elemen
  function getClickPoint(event, element) {
    if (event && (event.clientX || event.clientY)) {
      return { x: event.clientX, y: event.clientY };
    }
    const rect = element.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }

  // Klik dengan Ctrl / Cmd / Shift / klik tengah dibiarkan normal
  function isModifiedClick(event) {
    return event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button === 1;
  }

  /* ---------- 3. SCROLL HALUS ---------- */
  function scrollToTarget(target) {
    if (!target) return;

    target.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start'
    });

    // Pindahkan fokus agar nyaman untuk pengguna keyboard / pembaca layar
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
    }
    window.setTimeout(function () {
      try {
        target.focus({ preventScroll: true });
      } catch (error) {
        /* abaikan */
      }
    }, 600);
  }

  function initSmoothAnchors() {
    const anchors = document.querySelectorAll('a[href^="#"]:not(.hero-button)');

    anchors.forEach(function (anchor) {
      const hash = anchor.getAttribute('href');
      if (!hash || hash.length < 2) return;

      anchor.addEventListener('click', function (event) {
        const target = document.getElementById(hash.slice(1));
        if (!target) return; // target tidak ada: biarkan perilaku normal
        event.preventDefault();
        scrollToTarget(target);
      });
    });
  }

  /* ---------- 4. NOTIFIKASI SEMENTARA (TOAST) ---------- */
  let toastEl = null;
  let toastIconEl = null;
  let toastTitleEl = null;
  let toastTextEl = null;
  let toastTimer = null;
  let toastAnimation = null;

  function buildToast() {
    if (toastEl) return;

    toastEl = document.createElement('div');
    toastEl.setAttribute('role', 'status');
    toastEl.setAttribute('aria-live', 'polite');
    Object.assign(toastEl.style, {
      position: 'fixed',
      left: '50%',
      bottom: 'calc(1.2rem + env(safe-area-inset-bottom, 0px))',
      transform: 'translateX(-50%)',
      zIndex: '300',
      display: 'none',
      alignItems: 'center',
      gap: '0.8rem',
      width: 'max-content',
      maxWidth: 'min(92vw, 460px)',
      padding: '0.9rem 1.1rem',
      background: '#14663a',
      color: '#fff8e6',
      border: '4px solid #ffd84a',
      borderRadius: '24px',
      boxShadow: '0 14px 30px rgba(0, 0, 0, 0.3)',
      fontFamily: "'Nunito', 'Segoe UI', system-ui, sans-serif",
      fontSize: '1rem',
      lineHeight: '1.4',
      cursor: 'pointer'
    });

    toastIconEl = document.createElement('span');
    toastIconEl.setAttribute('aria-hidden', 'true');
    toastIconEl.style.fontSize = '2rem';
    toastIconEl.style.lineHeight = '1';

    const textWrap = document.createElement('div');
    textWrap.style.flex = '1';

    toastTitleEl = document.createElement('strong');
    Object.assign(toastTitleEl.style, {
      display: 'block',
      fontFamily: "'Fredoka', 'Trebuchet MS', system-ui, sans-serif",
      fontSize: '1.15rem',
      color: '#ffd84a'
    });

    toastTextEl = document.createElement('span');
    toastTextEl.style.display = 'block';

    textWrap.appendChild(toastTitleEl);
    textWrap.appendChild(toastTextEl);

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Tutup pesan');
    closeButton.textContent = '✕';
    Object.assign(closeButton.style, {
      flexShrink: '0',
      width: '32px',
      height: '32px',
      border: 'none',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.18)',
      color: '#fff8e6',
      fontSize: '1rem',
      cursor: 'pointer'
    });

    toastEl.appendChild(toastIconEl);
    toastEl.appendChild(textWrap);
    toastEl.appendChild(closeButton);

    // Klik di mana saja pada notifikasi = tutup
    toastEl.addEventListener('click', hideToast);

    document.body.appendChild(toastEl);
  }

  function showToast(emoji, title, message) {
    buildToast();

    toastIconEl.textContent = emoji;
    toastTitleEl.textContent = title;
    toastTextEl.textContent = message;

    window.clearTimeout(toastTimer);
    if (toastAnimation) toastAnimation.cancel();

    toastEl.style.display = 'flex';

    if (!prefersReducedMotion() && toastEl.animate) {
      toastAnimation = toastEl.animate(
        [
          { opacity: 0, transform: 'translate(-50%, 24px) scale(0.9)' },
          { opacity: 1, transform: 'translate(-50%, 0) scale(1)' }
        ],
        { duration: 320, easing: 'cubic-bezier(0.2, 0.9, 0.3, 1.2)' }
      );
    }

    toastTimer = window.setTimeout(hideToast, TOAST_DURATION);
  }

  function hideToast() {
    if (!toastEl || toastEl.style.display === 'none') return;

    window.clearTimeout(toastTimer);
    if (toastAnimation) toastAnimation.cancel();

    if (prefersReducedMotion() || !toastEl.animate) {
      toastEl.style.display = 'none';
      return;
    }

    toastAnimation = toastEl.animate(
      [
        { opacity: 1, transform: 'translate(-50%, 0) scale(1)' },
        { opacity: 0, transform: 'translate(-50%, 16px) scale(0.95)' }
      ],
      { duration: 220, easing: 'ease-in' }
    );
    toastAnimation.onfinish = function () {
      toastEl.style.display = 'none';
    };
  }

  /* ---------- 5. UMPAN BALIK KLIK ---------- */

  // Ledakan bintang & ikon tropis kecil di titik klik
  function sparkleBurst(x, y) {
    if (prefersReducedMotion()) return;

    for (let i = 0; i < SPARKLE_ICONS.length; i++) {
      const spark = document.createElement('span');
      spark.textContent = SPARKLE_ICONS[i];
      spark.setAttribute('aria-hidden', 'true');
      Object.assign(spark.style, {
        position: 'fixed',
        left: x - 12 + 'px',
        top: y - 12 + 'px',
        zIndex: '400',
        fontSize: '1.5rem',
        lineHeight: '1',
        pointerEvents: 'none'
      });
      document.body.appendChild(spark);

      const angle = (Math.PI * 2 * i) / SPARKLE_ICONS.length + Math.random() * 0.5;
      const distance = 50 + Math.random() * 40;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - 20;

      if (!spark.animate) {
        spark.remove();
        continue;
      }

      const animation = spark.animate(
        [
          { opacity: 1, transform: 'translate(0, 0) scale(0.4)' },
          { opacity: 0, transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(1.2)' }
        ],
        { duration: 700, easing: 'ease-out' }
      );
      animation.onfinish = (function (el) {
        return function () { el.remove(); };
      })(spark);
    }
  }

  // Kartu "memantul" saat diklik
  function bounceElement(element) {
    if (!element || !element.animate || prefersReducedMotion()) return;
    element.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(0.95)' },
        { transform: 'scale(1.02)' },
        { transform: 'scale(1)' }
      ],
      { duration: 380, easing: 'ease-out' }
    );
  }

  // Kartu bersinar kuning untuk memberi petunjuk
  function highlightCard(card) {
    if (!card || !card.animate || prefersReducedMotion()) return;
    card.animate(
      [
        { boxShadow: '0 0 0 0 rgba(255, 201, 40, 0.9)' },
        { boxShadow: '0 0 0 16px rgba(255, 201, 40, 0)' }
      ],
      { duration: 900, iterations: 2, easing: 'ease-out' }
    );
  }

  /* ---------- 6. TOMBOL MULAI MENJELAJAH ---------- */
  function initStartButton() {
    const button = document.querySelector('.hero-button');
    if (!button) return;

    button.addEventListener('click', function (event) {
      if (isModifiedClick(event)) return;
      event.preventDefault();

      const point = getClickPoint(event, button);
      sparkleBurst(point.x, point.y);

      const opening = PAGES[OPENING_PAGE];

      // Halaman Pembukaan sudah ada: pergi ke sana
      if (opening && opening.ready) {
        window.setTimeout(function () {
          window.location.href = OPENING_PAGE;
        }, 300);
        return;
      }

      // Belum ada: tampilkan pesan, lalu arahkan ke kartu navigasi
      showToast(
        '🚪',
        'Pembukaan segera hadir!',
        'Gerbang petualangan belum terbuka. Lihat dulu pilihan petualangan di bawah ya!'
      );
      scrollToTarget(document.getElementById('navigasi'));
      window.setTimeout(function () {
        highlightCard(document.querySelector('.nav-card-pembukaan'));
      }, 700);
    });
  }

  /* ---------- 7. KARTU NAVIGASI & MENU HEADER ---------- */
  function handlePageLinkClick(event, link) {
    if (isModifiedClick(event)) return;

    const key = getPageKey(link.getAttribute('href'));
    const page = key ? PAGES[key] : null;
    if (!page) return; // bukan halaman proyek: biarkan normal

    const point = getClickPoint(event, link);
    sparkleBurst(point.x, point.y);

    if (link.classList.contains('nav-card-link')) {
      bounceElement(link);
    }

    event.preventDefault();

    if (page.ready) {
      const destination = link.getAttribute('href');
      window.setTimeout(function () {
        window.location.href = destination;
      }, 300);
      return;
    }

    showToast(page.emoji, page.name + ' segera hadir!', page.message);
  }

  function initPageLinks() {
    const links = document.querySelectorAll('.nav-card-link, .site-nav-link');

    links.forEach(function (link) {
      link.addEventListener('click', function (event) {
        handlePageLinkClick(event, link);
      });
    });
  }

  /* ---------- 8. LAIN-LAIN ---------- */

  // Tahun di footer mengikuti tahun sekarang
  function initFooterYear() {
    const yearEl = document.querySelector('.footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // Tombol Esc menutup notifikasi
  function initKeyboardClose() {
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') hideToast();
    });
  }

  // Saat kembali ke halaman lewat tombol "back", pastikan notifikasi bersih
  function initPageShow() {
    window.addEventListener('pageshow', function (event) {
      if (event.persisted) hideToast();
    });
  }

  /* ---------- 8A. MUSIK LATAR ---------- */
  function initMusic() {
    const music = document.getElementById('aseanAudio');
    const musicToggle = document.getElementById('musicToggle');

    if (!music || !musicToggle) return;

    musicToggle.addEventListener('click', async function () {
      if (music.paused) {
        try {
          await music.play();
          musicToggle.textContent = '🔊 Musik ON';
        } catch (error) {
          console.error('Musik gagal diputar:', error);
        }
      } else {
        music.pause();
        musicToggle.textContent = '🔇 Musik OFF';
      }
    });
  }

  /* ---------- 9. MULAI ---------- */
  function init() {
    initSmoothAnchors();
    initStartButton();
    initPageLinks();
    initFooterYear();
    initKeyboardClose();
    initPageShow();
    initMusic();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();