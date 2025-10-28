document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Fade out logo on scroll
  const brand = document.querySelector('.brand');
  if (brand) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const fadeStart = 100;
      const fadeEnd = 400;
      
      if (scrolled <= fadeStart) {
        brand.style.opacity = '1';
      } else if (scrolled >= fadeEnd) {
        brand.style.opacity = '0';
      } else {
        const opacity = 1 - (scrolled - fadeStart) / (fadeEnd - fadeStart);
        brand.style.opacity = opacity.toString();
      }
    });
  }
});
