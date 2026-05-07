/* En-gawa LP — main.js
   - Nav の scroll 検知
   - Section のフェードイン
   - footer の年号
*/

(() => {
  // ---- Year ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Nav scroll state ----
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Reveal on scroll ----
  const targets = document.querySelectorAll(
    '.section__title, .section__lead, .why__lead, .why__card, .why__figure, .step, .pair, .price__card, .member, .contact__form, .hero__title, .hero__sub, .hero__actions, .hero__meta'
  );
  targets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => el.classList.add('is-visible'));
  }

  // ---- Hero の reveal はロード直後に発火 ----
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('is-visible'), 80 * i);
    });
  });
})();
