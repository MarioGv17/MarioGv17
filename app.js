// ============================================
//  PATITAS FELICES — App JavaScript
// ============================================

// ---- Navbar: scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');
hamburger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// ---- Animated counter for hero stats ----
function animateCounter(el, target, suffix = '') {
  const duration = 1800;
  const start = performance.now();
  const initial = 0;
  el.textContent = initial + suffix;

  requestAnimationFrame(function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(initial + (target - initial) * eased);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  });
}

// ---- Intersection Observer for card animations ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.card-anim').forEach(card => observer.observe(card));

// ---- Animate hero stats on load ----
window.addEventListener('load', () => {
  setTimeout(() => {
    const statNums = document.querySelectorAll('.stat-num');
    const targets = [5000, 98, 3500, 8];
    const suffixes = ['+', '%', ' m²', ''];
    statNums.forEach((el, i) => animateCounter(el, targets[i], suffixes[i]));
  }, 600);
});

// ---- Spots countdown (urgency) ----
const spotsEl = document.getElementById('spots');
if (spotsEl) {
  // Decrement slowly to simulate real-time demand
  let spots = parseInt(spotsEl.textContent);
  const interval = setInterval(() => {
    if (spots > 3) {
      spots -= 1;
      spotsEl.textContent = spots;
    } else {
      clearInterval(interval);
    }
  }, 45000); // every 45 seconds
}

// ---- Contact form submission ----
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      contactForm.style.display = 'none';
      formSuccess.classList.add('show');
    }, 1200);
  });
}

// ---- Smooth scroll for all anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Parallax subtle effect on hero ----
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      hero.style.backgroundPositionY = `calc(center + ${scrollY * 0.3}px)`;
    }
  }, { passive: true });
}

// ---- Testi cards stagger animation ----
const testiObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 120);
      testiObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.testi-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = 'opacity .5s ease, transform .5s ease';
  testiObserver.observe(card);
});

// ---- Precio cards entrance ----
const precioObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = entry.target.classList.contains('popular')
          ? 'scale(1.05) translateY(0)'
          : 'translateY(0)';
      }, i * 150);
      precioObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.precio-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = card.classList.contains('popular')
    ? 'scale(1.05) translateY(24px)'
    : 'translateY(24px)';
  card.style.transition = 'opacity .6s ease, transform .6s ease, box-shadow .3s ease';
  precioObserver.observe(card);
});
