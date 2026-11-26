/**
 * ============================================================================
 * SEA SHARK IMPORT AND EXPORT PRIVATE LIMITED
 * Main Application Script (main.js)
 * Clean, modular Vanilla JavaScript for navigation, sticky header, WhatsApp
 * & Centralised Configuration
 * ============================================================================
 */

(function () {
  'use strict';

  // 1. Centralised Business Configuration (Easy to update for client)
  window.SEA_SHARK_CONFIG = {
    companyName: 'SEA SHARK IMPORT AND EXPORT PRIVATE LIMITED',
    tagline: 'International Trade & Air Cargo Transportation',
    phoneDisplay: '+91 63004 29465',
    phoneRaw: '+916300429465', // Dialable international digits
    whatsappNumber: '916300429465', // International format e.g. 916300429465
    whatsappDefaultMessage: 'Hello SEA SHARK Team, I am interested in your import/export services and product sourcing. Please share more details.',
    email: 'info@seashark.example.com',
    address: 'H NO 57-314/1, Dattathreya Nagar, Quthbullapur, Telangana - 500054, India',
    workingHours: 'Monday - Saturday: 9:00 AM - 6:00 PM IST',
    socials: {
      linkedin: '#',
      twitter: '#'
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    initHeaderScroll();
    initMobileNav();
    initActiveNavLinks();
    initFloatingWhatsApp();
    initScrollReveal();
  });

  /**
   * Sticky Header Elevation on Scroll
   */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /**
   * Mobile Hamburger Menu
   */
  function initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const navDrawer = document.querySelector('.nav-menu-wrapper');
    if (!toggleBtn || !navDrawer) return;

    function toggleNav() {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      toggleBtn.classList.toggle('is-active');
      navDrawer.classList.toggle('is-open');

      if (!isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    toggleBtn.addEventListener('click', toggleNav);

    // Close when clicking a nav link
    const navLinks = navDrawer.querySelectorAll('.nav-link, .nav-actions .btn');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navDrawer.classList.contains('is-open')) {
          toggleNav();
        }
      });
    });

    // Close on window resize if resizing to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992 && navDrawer.classList.contains('is-open')) {
        toggleNav();
      }
    });
  }

  /**
   * Set Active Navigation Link based on current page
   */
  function initActiveNavLinks() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';

    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Floating WhatsApp Action Button
   */
  function initFloatingWhatsApp() {
    const whatsappBtn = document.querySelector('.floating-whatsapp');
    if (!whatsappBtn) return;

    whatsappBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const cfg = window.SEA_SHARK_CONFIG;
      const encodedMsg = encodeURIComponent(cfg.whatsappDefaultMessage);
      const url = `https://wa.me/${cfg.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMsg}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  /**
   * Scroll Reveal Animation using IntersectionObserver
   */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
      });

      reveals.forEach(el => observer.observe(el));
    } else {
      // Fallback for older browsers
      reveals.forEach(el => el.classList.add('is-revealed'));
    }
  }

})();
