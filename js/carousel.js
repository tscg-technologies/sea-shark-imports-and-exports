/**
 * ============================================================================
 * SEA SHARK IMPORT AND EXPORT PRIVATE LIMITED
 * Hero Carousel Script (carousel.js)
 * Full-featured: Auto-play, pause on hover, touch/swipe support, keyboard
 * navigation, accessible ARIA attributes
 * ============================================================================
 */

(function () {
  'use strict';

  function initCarousel() {
    const carouselEl = document.querySelector('.hero-carousel-section');
    if (!carouselEl) return;

    const slides = carouselEl.querySelectorAll('.carousel-slide');
    const dots = carouselEl.querySelectorAll('.carousel-dot');
    const prevBtn = carouselEl.querySelector('.carousel-prev');
    const nextBtn = carouselEl.querySelector('.carousel-next');

    if (!slides.length) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    const intervalTime = 6000;
    let slideTimer = null;
    let isPaused = false;

    function goToSlide(index) {
      if (index < 0) {
        currentIndex = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      // Update slides
      slides.forEach((slide, idx) => {
        if (idx === currentIndex) {
          slide.classList.add('active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('active');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      // Update dots
      if (dots.length) {
        dots.forEach((dot, idx) => {
          if (idx === currentIndex) {
            dot.classList.add('active');
            dot.setAttribute('aria-current', 'true');
          } else {
            dot.classList.remove('active');
            dot.removeAttribute('aria-current');
          }
        });
      }
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startTimer() {
      stopTimer();
      slideTimer = setInterval(() => {
        if (!isPaused) {
          nextSlide();
        }
      }, intervalTime);
    }

    function stopTimer() {
      if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
      }
    }

    // Event Listeners for Nav Controls
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startTimer();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        startTimer();
      });
    });

    // Pause on Hover
    carouselEl.addEventListener('mouseenter', () => {
      isPaused = true;
    });

    carouselEl.addEventListener('mouseleave', () => {
      isPaused = false;
    });

    // Keyboard navigation
    carouselEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        startTimer();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        startTimer();
      }
    });

    // Touch / Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carouselEl.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselEl.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const threshold = 40;
      if (touchEndX < touchStartX - threshold) {
        nextSlide();
        startTimer();
      } else if (touchEndX > touchStartX + threshold) {
        prevSlide();
        startTimer();
      }
    }

    // Initialise first slide and start timer
    goToSlide(0);
    startTimer();
  }

  document.addEventListener('DOMContentLoaded', initCarousel);
})();
