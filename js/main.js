/* ==========================================================================
   main.js — small progressive enhancements, no dependencies
     1. Theme (dark / light) with localStorage
     2. Sticky header state on scroll
     3. Mobile navigation toggle
     4. Back-to-top button
     5. Scroll reveal (IntersectionObserver)
   Everything degrades gracefully: with JS disabled the page is still readable.
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------ *
   * 1. Theme
   * ------------------------------------------------------------------ */

  var THEME_KEY = 'theme';
  var themeToggle = document.getElementById('theme-toggle');

  function readStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (err) {
      return null; // private mode / storage blocked
    }
  }

  function storeTheme(value) {
    try {
      localStorage.setItem(THEME_KEY, value);
    } catch (err) {
      /* nothing we can do — the toggle still works for this page view */
    }
  }

  function currentTheme() {
    var attr = root.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') return attr;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);

    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#0b1220' : '#2563eb');
    }
  }

  // restore a previously chosen theme as early as possible
  var storedTheme = readStoredTheme();
  if (storedTheme === 'dark' || storedTheme === 'light') {
    applyTheme(storedTheme);
  }

  if (themeToggle) {
    // reflect the theme that is in effect right now, without pinning data-theme
    themeToggle.setAttribute('aria-pressed', String(currentTheme() === 'dark'));

    themeToggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
    });
  }

  /* ------------------------------------------------------------------ *
   * 2. Header state on scroll
   * ------------------------------------------------------------------ */

  var header = document.getElementById('site-header');
  var backToTop = document.getElementById('back-to-top');
  var ticking = false;

  function onScrollFrame() {
    var y = window.scrollY || window.pageYOffset;

    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (backToTop) backToTop.classList.toggle('is-visible', y > 420);

    ticking = false;
  }

  function requestScrollUpdate() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScrollFrame);
    }
  }

  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  onScrollFrame();

  /* ------------------------------------------------------------------ *
   * 3. Mobile navigation
   * ------------------------------------------------------------------ */

  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', '打开导航菜单');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? '关闭导航菜单' : '打开导航菜单');
    });

    // close after choosing a destination
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeNav();
    });

    document.addEventListener('click', function (event) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(event.target) || navToggle.contains(event.target)) return;
      closeNav();
    });

    // returning to the desktop layout should not leave the panel stuck open
    window.addEventListener('resize', function () {
      if (window.innerWidth > 820) closeNav();
    });
  }

  /* ------------------------------------------------------------------ *
   * 4. Back to top
   * ------------------------------------------------------------------ */

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * 5. Scroll reveal
   * ------------------------------------------------------------------ */

  var revealItems = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    // no observer support, or the user prefers less motion: show everything
    for (var i = 0; i < revealItems.length; i++) {
      revealItems[i].classList.add('is-visible');
    }
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }
})();
