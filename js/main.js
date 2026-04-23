/* FGM RENOV — interactions mobile-first */
(function () {
  'use strict';

  /* ── Année footer ── */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ── Mobile menu ── */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Close mobile menu on resize desktop ── */
  var mq = window.matchMedia('(min-width: 900px)');
  var onMq = function () {
    if (mq.matches && menu) {
      menu.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };
  if (mq.addEventListener) mq.addEventListener('change', onMq);
  else if (mq.addListener) mq.addListener(onMq);

  /* ── Avant / Après comparator ── */
  function setupCompare(root) {
    var before = root.querySelector('.compare-before');
    var handle = root.querySelector('.compare-handle');
    var range = root.querySelector('.compare-range');
    if (!before || !handle || !range) return;

    function setPos(pct) {
      pct = Math.min(100, Math.max(0, pct));
      var clipRight = (100 - pct) + '%';
      before.style.clipPath = 'inset(0 ' + clipRight + ' 0 0)';
      before.style.webkitClipPath = 'inset(0 ' + clipRight + ' 0 0)';
      handle.style.left = pct + '%';
      range.value = pct;
    }

    range.addEventListener('input', function () {
      setPos(parseFloat(range.value));
    });

    /* Pointer drag */
    var dragging = false;
    function pct(e) {
      var rect = root.getBoundingClientRect();
      var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      return (x / rect.width) * 100;
    }
    function down(e) { dragging = true; setPos(pct(e)); }
    function move(e) { if (dragging) setPos(pct(e)); }
    function up() { dragging = false; }

    root.addEventListener('mousedown', down);
    root.addEventListener('touchstart', down, { passive: true });
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);

    setPos(50);
  }

  document.querySelectorAll('[data-compare]').forEach(setupCompare);

  /* ── Nav shadow on scroll ── */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 8) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Smooth scroll offset compensation ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id && id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          var offset = (window.innerWidth >= 900 ? 80 : 72);
          var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

})();
