/* ============================================
   INDEX.JS — Phase 3: Portfolio Interactivity
   Vanilla JS only — no external libraries
   ============================================ */

'use strict';

/* --- Constants & shared state --- */
const STORAGE_KEYS = {
  theme: 'portfolio-theme',
};

const TYPING_PHRASES = [
  'Full Stack Developer',
  'ASP.NET Core Developer',
  'MERN Stack Developer (Learning)',
];

const SCROLL = {
  navbarThreshold: 50,
  backToTopThreshold: 400,
};

const FILTER_TRANSITION_MS = 300;

/** Tracks whether stat counters have already run (animate once). */
let statsAnimated = false;

/** Typing animation timer handle for cleanup if needed. */
let typingTimer = null;


/* ============================================
   1. Theme Toggle
   ============================================ */

/**
 * Returns the current theme from the document root.
 * @returns {'dark' | 'light'}
 */
function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

/**
 * Applies a theme to the document and persists it.
 * @param {'dark' | 'light'} theme
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  } catch (e) {
    /* localStorage unavailable — theme still applied for session */
  }

  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    updateThemeToggleLabel(toggleBtn);
  }
}

/**
 * Keeps the theme toggle aria-label in sync with the active theme.
 * @param {HTMLButtonElement} btn
 */
function updateThemeToggleLabel(btn) {
  const label =
    getCurrentTheme() === 'dark'
      ? 'Switch to light theme'
      : 'Switch to dark theme';
  btn.setAttribute('aria-label', label);
}

/**
 * Toggles between dark and light themes on button click.
 */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  updateThemeToggleLabel(toggleBtn);

  toggleBtn.addEventListener('click', () => {
    const next = getCurrentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });
}


/* ============================================
   2. Scroll Progress Bar
   ============================================ */

/**
 * Updates the fixed scroll-progress bar using transform (no layout reflow).
 */
function updateScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

  bar.style.transform = `scaleX(${Math.min(progress, 1)})`;
}


/* ============================================
   3. Back to Top Button
   ============================================ */

/**
 * Shows/hides the back-to-top button based on scroll depth.
 * Removes hidden controls from the tab order when not visible.
 */
function updateBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  const isVisible = window.scrollY > SCROLL.backToTopThreshold;
  btn.classList.toggle('visible', isVisible);
  btn.tabIndex = isVisible ? 0 : -1;
}

/**
 * Smooth-scrolls to the top of the page on click.
 */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ============================================
   4. Scroll Reveal Animations
   ============================================ */

/**
 * Observes elements with the "reveal" class and adds "visible"
 * once when they enter the viewport. Each element animates only once.
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}


/* ============================================
   5. Navbar Behavior
   ============================================ */

/**
 * Toggles the "scrolled" class on the navbar after threshold scroll.
 */
function updateNavbarScrollState() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  navbar.classList.toggle('scrolled', window.scrollY > SCROLL.navbarThreshold);
}

/** Section IDs used for scroll-spy nav highlighting. */
let spySections = [];

/**
 * Highlights the active nav link based on the section nearest the viewport center.
 */
function updateScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  if (!spySections.length || !navLinks.length) return;

  const scrollPos = window.scrollY + window.innerHeight * 0.35;
  let activeId = spySections[0].id;

  spySections.forEach((section) => {
    if (section.offsetTop <= scrollPos) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.section === activeId);
  });
}

/**
 * Collects sections for scroll-spy (called once on init).
 */
function initScrollSpy() {
  spySections = [...document.querySelectorAll('main section[id]')];
  updateScrollSpy();
}

/**
 * Opens/closes the mobile fullscreen nav overlay.
 * Hamburger → X morph is handled by CSS via aria-expanded.
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!menuToggle) return;

  const closeMenu = () => {
    document.body.classList.remove('nav-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  };

  const openMenu = () => {
    document.body.classList.add('nav-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close navigation menu');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  /* Close menu when a nav link is clicked */
  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /* Close on Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
      closeMenu();
    }
  });
}


/* ============================================
   6. Hero Typing Animation
   ============================================ */

/**
 * Continuously types and deletes phrases in #typing-text.
 */
function initTypingAnimation() {
  const typingEl = document.getElementById('typing-text');
  if (!typingEl) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const tick = () => {
    const currentPhrase = TYPING_PHRASES[phraseIndex];

    if (isDeleting) {
      charIndex -= 1;
      typingEl.textContent = currentPhrase.substring(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % TYPING_PHRASES.length;
        typingTimer = setTimeout(tick, 500);
        return;
      }

      typingTimer = setTimeout(tick, 40);
      return;
    }

    charIndex += 1;
    typingEl.textContent = currentPhrase.substring(0, charIndex);

    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      typingTimer = setTimeout(tick, 2000);
      return;
    }

    typingTimer = setTimeout(tick, 75);
  };

  tick();
}


/* ============================================
   7. About Stats Counter
   ============================================ */

/**
 * Animates a number element from 0 to its data-target value.
 * @param {HTMLElement} el
 * @param {number} target
 * @param {number} duration
 */
function animateCounter(el, target, duration = 1800) {
  const startTime = performance.now();

  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    /* Ease-out cubic */
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = String(Math.floor(eased * target));

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = String(target);
    }
  };

  requestAnimationFrame(step);
}

/**
 * Triggers stat counters once when the About section enters the viewport.
 * Skips cards without a data-target attribute (e.g. "4 Months Field Training").
 */
function initStatsCounter() {
  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;

  const counters = aboutSection.querySelectorAll('.stat-card__number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || statsAnimated) return;

        statsAnimated = true;
        counters.forEach((counter) => {
          const target = parseInt(counter.dataset.target, 10);
          if (!Number.isNaN(target)) {
            animateCounter(counter, target);
          }
        });

        obs.disconnect();
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(aboutSection);
}


/* ============================================
   8. Projects Filter
   ============================================ */

/**
 * Filters project cards with fade + scale transition.
 * @param {string} filter - "all" | "dotnet" | "javascript"
 */
function filterProjects(filter) {
  const cards = document.querySelectorAll('.project-card[data-category]');

  cards.forEach((card) => {
    const category = card.dataset.category;
    const shouldShow = filter === 'all' || category === filter;

    if (shouldShow) {
      card.classList.remove('filter-hidden');
      /* Force reflow so transition runs when removing filter-hide */
      void card.offsetWidth;
      card.classList.remove('filter-hide');
    } else if (!card.classList.contains('filter-hidden')) {
      card.classList.add('filter-hide');
      setTimeout(() => {
        if (card.classList.contains('filter-hide')) {
          card.classList.add('filter-hidden');
        }
      }, FILTER_TRANSITION_MS);
    }
  });
}

/**
 * Wires filter buttons to show/hide project cards.
 */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-pressed', String(isActive));
      });

      filterProjects(filter);
    });
  });
}


/* ============================================
   9. Project Detail Modal (Optional)
   ============================================ */

/** Element focused before the modal opened (for focus restoration). */
let modalTriggerElement = null;

/**
 * Opens the project modal populated with the clicked card's content.
 * @param {HTMLElement} card
 */
function openProjectModal(card) {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  if (!modal || !modalContent) return;

  const image = card.querySelector('.project-card__image');
  const body = card.querySelector('.project-card__body');
  if (!body) return;

  modalTriggerElement = card;

  modalContent.innerHTML = '';

  if (image) {
    modalContent.appendChild(image.cloneNode(true));
  }

  const bodyClone = body.cloneNode(true);
  modalContent.appendChild(bodyClone);

  const title = bodyClone.querySelector('.project-card__title');
  if (title) {
    title.id = 'modal-title';
    modal.setAttribute('aria-labelledby', 'modal-title');
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  const closeBtn = modal.querySelector('.modal__close');
  if (closeBtn) closeBtn.focus();
}

/**
 * Closes the project modal.
 */
function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal || !modal.classList.contains('open')) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-labelledby');
  document.body.classList.remove('modal-open');

  if (modalTriggerElement && typeof modalTriggerElement.focus === 'function') {
    modalTriggerElement.focus();
  }
  modalTriggerElement = null;
}

/**
 * Opens modal on project card click or keyboard activation.
 */
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const cards = document.querySelectorAll('.project-card[data-category]');
  if (!modal || !cards.length) return;

  const openFromCard = (card, event) => {
    if (event.target.closest('a, button')) return;
    openProjectModal(card);
  };

  cards.forEach((card) => {
    card.addEventListener('click', (e) => openFromCard(card, e));

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFromCard(card, e);
      }
    });
  });

  modal.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', closeProjectModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });
}


/* ============================================
   10. Contact Form Validation
   ============================================ */

/**
 * Validates a single form field and shows inline error text.
 * @param {HTMLInputElement | HTMLTextAreaElement} field
 * @param {HTMLElement} errorEl
 * @returns {boolean}
 */
function validateField(field, errorEl) {
  const value = field.value.trim();
  let message = '';

  if (field.id === 'form-name') {
    if (!value) message = 'Name is required.';
    else if (value.length < 2) message = 'Name must be at least 2 characters.';
  }

  if (field.id === 'form-email') {
    if (!value) {
      message = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = 'Please enter a valid email address.';
    }
  }

  if (field.id === 'form-message') {
    if (!value) message = 'Message is required.';
    else if (value.length < 10) message = 'Message must be at least 10 characters.';
  }

  errorEl.textContent = message;
  field.classList.toggle('error', Boolean(message));

  return !message;
}

/**
 * Validates the entire contact form on submit.
 * @param {HTMLFormElement} form
 * @returns {boolean}
 */
function validateForm(form) {
  const fields = [
    { field: form.querySelector('#form-name'), error: form.querySelector('#error-name') },
    { field: form.querySelector('#form-email'), error: form.querySelector('#error-email') },
    { field: form.querySelector('#form-message'), error: form.querySelector('#error-message') },
  ];

  return fields.every(({ field, error }) => {
    if (!field || !error) return true;
    return validateField(field, error);
  });
}

/**
 * Clears all validation errors and success state.
 * @param {HTMLFormElement} form
 */
function clearFormFeedback(form) {
  form.querySelectorAll('.form-error').forEach((el) => {
    el.textContent = '';
  });
  form.querySelectorAll('input, textarea').forEach((el) => {
    el.classList.remove('error');
  });

  const success = form.querySelector('#form-success');
  if (success) {
    success.textContent = '';
    success.classList.remove('visible', 'error');
  }
}

/**
 * Handles client-side validation and real submission via Formspree.
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const successEl = form.querySelector('#form-success');
  const submitBtn = form.querySelector('button[type="submit"]');
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwvderlj';

  /* Live validation on blur */
  form.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('blur', () => {
      const errorId = `error-${field.name}`;
      const errorEl = document.getElementById(errorId);
      if (errorEl) validateField(field, errorEl);
    });

    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        const errorEl = document.getElementById(`error-${field.name}`);
        if (errorEl) validateField(field, errorEl);
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearFormFeedback(form);

    if (!validateForm(form)) return;

    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (!response.ok) throw new Error('Form submission failed');

      if (successEl) {
        successEl.textContent = 'Message sent successfully!';
        successEl.classList.add('visible');
      }
      form.reset();
    } catch (err) {
      if (successEl) {
        successEl.textContent = 'Something went wrong — please email me directly at ahmadalsmadi2004@gmail.com.';
        successEl.classList.add('visible', 'error');
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}


/* ============================================
   11. Experience Timeline Animation
   ============================================ */

/**
 * Triggers timeline line draw and marker/content reveal on scroll into view.
 * Reuses IntersectionObserver pattern from scroll reveal (#4).
 */
function initTimelineAnimation() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        timeline.classList.add('timeline--visible');
        timeline.style.setProperty('--line-progress', '1');
        obs.unobserve(timeline);
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(timeline);
}


/* ============================================
   Shared Scroll Handler
   ============================================ */

/** Throttles scroll updates with requestAnimationFrame. */
let scrollTicking = false;

function onScroll() {
  if (scrollTicking) return;

  scrollTicking = true;
  requestAnimationFrame(() => {
    updateScrollProgress();
    updateNavbarScrollState();
    updateBackToTop();
    updateScrollSpy();
    scrollTicking = false;
  });
}


/* ============================================
   Initialization
   ============================================ */

/**
 * Boots all interactive features once the DOM is ready.
 */
function init() {
  initThemeToggle();
  initBackToTop();
  initScrollReveal();
  initScrollSpy();
  initMobileMenu();
  initTypingAnimation();
  initStatsCounter();
  initProjectsFilter();
  initProjectModal();
  initContactForm();
  initTimelineAnimation();

  /* Run scroll-dependent updates once on load */
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
