/* ikkeum.com — 공용 스크립트 (테마 토글 · 모바일 메뉴 · reveal) */
(function () {
  'use strict';

  // 테마 토글 — 기존 index.html 과 같은 저장키를 쓴다
  var KEY = 'ikkeum-theme';
  var root = document.documentElement;
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem(KEY, t); } catch (e) { /* 사파리 프라이빗 등 */ }
    document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
      b.setAttribute('aria-label', t === 'dark' ? '밝은 테마로 전환' : '어두운 테마로 전환');
    });
  }
  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  });
  setTheme(root.getAttribute('data-theme') || 'light');

  // 모바일 메뉴
  var hdr = document.querySelector('.hdr');
  var menu = document.querySelector('[data-menu]');
  if (hdr && menu) {
    menu.addEventListener('click', function () {
      var open = hdr.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
    hdr.querySelectorAll('.hdr__nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        hdr.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // reveal — IntersectionObserver 없으면 전부 보이게 두고 끝낸다
  var items = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('on'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
  items.forEach(function (el) { io.observe(el); });

  // 안전장치: 관찰이 어떤 이유로든 안 걸려도 콘텐츠가 영영 안 보이는 일은 없게 한다
  setTimeout(function () {
    document.querySelectorAll('.rv:not(.on)').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 1.2) el.classList.add('on');
    });
  }, 700);
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.querySelectorAll('.rv:not(.on)').forEach(function (el) { el.classList.add('on'); });
    }, 4000);
  });
})();
