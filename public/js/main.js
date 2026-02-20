// Dark Mode Toggle
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  if (!themeToggle) return;

  // Check saved preference or system preference
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    themeIcon.innerText = '🌙';
  } else {
    document.documentElement.classList.remove('dark');
    themeIcon.innerText = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      themeIcon.innerText = '☀️';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      themeIcon.innerText = '🌙';
    }
  });
}

// Simple Slideshow
function initSlideshow() {
  const slideshow = document.getElementById('slideshow-container');
  if (!slideshow) return;

  const slides = slideshow.querySelectorAll('.slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.remove('hidden', 'opacity-0');
        slide.classList.add('block', 'opacity-100');
      } else {
        slide.classList.remove('block', 'opacity-100');
        slide.classList.add('hidden', 'opacity-0');
      }
    });
  }

  // Initial show
  showSlide(currentSlide);

  // Auto advance
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 4000); // 4 seconds
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSlideshow();
});
