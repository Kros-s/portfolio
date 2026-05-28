// ── Nav scroll effect ──────────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Scroll reveal ──────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Logo staggered reveal ──────────────────────────────────────────────────
const logoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const logos = entry.target.querySelectorAll('.logo-item');
      logos.forEach((logo, i) => {
        setTimeout(() => {
          logo.style.opacity = '0';
          logo.style.transform = 'translateY(16px)';
          logo.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          requestAnimationFrame(() => {
            setTimeout(() => {
              logo.style.opacity = '0.45';
              logo.style.transform = 'translateY(0)';
            }, 20);
          });
        }, i * 80);
      });
      logoObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const logosTrack = document.querySelector('.logos-track');
if (logosTrack) logoObserver.observe(logosTrack);

// ── Hero trigger on load ──────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('#hero .reveal').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);
});

// ── Smooth active nav highlight ────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--white)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
