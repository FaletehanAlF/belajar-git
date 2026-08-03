// ============================================================
// STÜSSY — Landing Page Interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar: shrink / solidify on scroll ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile burger menu ---------- */
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  burger.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('menu-open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });

  // close mobile menu after tapping a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('menu-open');
      burger.classList.remove('open');
    });
  });

  /* ---------- Active link highlight based on section in view ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('active-link', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // slight stagger for elements revealed in the same batch
        entry.target.style.transitionDelay = `${(i % 4) * 70}ms`;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Product "Add to Bag" micro-feedback ---------- */
  document.querySelectorAll('.prod-card .btn').forEach(btn => {
    const original = btn.textContent;
    btn.addEventListener('click', () => {
      if (btn.dataset.locked) return;
      btn.dataset.locked = 'true';
      btn.textContent = 'Added ✓';
      btn.classList.add('btn-solid');
      btn.classList.remove('btn-outline');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('btn-solid');
        btn.classList.add('btn-outline');
        delete btn.dataset.locked;
      }, 1600);
    });
  });

  /* ---------- Contact form (front-end only demo) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      formNote.textContent = "Message sent — we'll get back to you soon.";
      submitBtn.textContent = originalLabel;
      submitBtn.disabled = false;
      contactForm.reset();
    }, 900);
  });

  /* ---------- Newsletter form (front-end only demo) ---------- */
  const newsForm = document.querySelector('.news-form');
  if (newsForm) {
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsForm.querySelector('input');
      const btn = newsForm.querySelector('button');
      const original = btn.textContent;
      btn.textContent = '✓';
      input.value = '';
      setTimeout(() => { btn.textContent = original; }, 1500);
    });
  }

});