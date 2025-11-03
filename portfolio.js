document.addEventListener('DOMContentLoaded', () => {
  // Portfolio filtering
  const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
  const items = Array.from(document.querySelectorAll('.portfolio-item'));

  if (filterBtns.length && items.length) {
    const setActive = (btn) => {
      filterBtns.forEach(b => b.classList.toggle('active', b === btn));
      filterBtns.forEach(b => b.setAttribute('aria-selected', b === btn ? 'true' : 'false'));
    };

    const applyFilter = (value) => {
      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        const show = value === 'all' || value === cat;
        if (show) {
          item.removeAttribute('hidden');
        } else {
          item.setAttribute('hidden', '');
        }
      });
    };

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        setActive(btn);
        applyFilter(btn.dataset.filter);
      });
    });
  }

  // Lightbox
  const cardButtons = Array.from(document.querySelectorAll('.portfolio-card'));
  const lightbox = document.getElementById('lightbox');
  const lightboxMedia = document.getElementById('lightboxMedia');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  const openLightbox = ({ title, type, video, image, desc }) => {
    if (!lightbox || !lightboxMedia) return;
    // Clear previous
    lightboxMedia.innerHTML = '';

    if (type === 'video' && video) {
      const iframe = document.createElement('iframe');
      iframe.src = video + (video.includes('?') ? '&' : '?') + 'autoplay=1&rel=0&playsinline=1';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.frameBorder = '0';
      lightboxMedia.appendChild(iframe);
    } else if (type === 'image' && image) {
      const img = document.createElement('img');
      img.src = image;
      img.alt = title || '';
      lightboxMedia.appendChild(img);
    } else {
      const fallback = document.createElement('div');
      fallback.style.padding = '40px';
      fallback.innerHTML = '<p class="muted">No media available.</p>';
      lightboxMedia.appendChild(fallback);
    }

    if (lightboxTitle) lightboxTitle.textContent = title || '';
    if (lightboxDesc) lightboxDesc.textContent = desc || '';

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    if (lightboxMedia) lightboxMedia.innerHTML = '';
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox(); });
  }

  cardButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      openLightbox({
        title: btn.getAttribute('data-title'),
        type: btn.getAttribute('data-type'),
        video: btn.getAttribute('data-video'),
        image: btn.getAttribute('data-image'),
        desc: btn.querySelector('p')?.textContent || ''
      });
    });
  });
});
