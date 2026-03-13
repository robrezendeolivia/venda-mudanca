(function () {
  const presentation = document.querySelector('.presentation');
  const slides = document.querySelectorAll('.slide');
  const navPrev = document.getElementById('nav-prev');
  const navNext = document.getElementById('nav-next');

  // Codificar caminhos de imagens para URLs com espaços (compatibilidade GitHub Pages)
  document.querySelectorAll('.gallery img').forEach((img) => {
    const src = img.getAttribute('src');
    if (src && src.includes(' ')) {
      const parts = src.split('/');
      const filename = parts.pop();
      const encoded = parts.join('/') + '/' + encodeURIComponent(filename);
      img.src = encoded;
    }
  });

  // Carregar status e aplicar classes
  fetch('status.json')
    .then((res) => res.json())
    .then((status) => {
      document.querySelectorAll('.slide-item').forEach((slide) => {
        const itemId = slide.getAttribute('data-item');
        const item = status[itemId];
        const isSold = item && item.sold === true;
        slide.classList.add(isSold ? 'sold' : 'available');
      });

      // Atualizar índice com indicador de vendido
      document.querySelectorAll('.toc-list a').forEach((link) => {
        const href = link.getAttribute('href');
        const match = href && href.match(/#item-(\d+)/);
        if (match) {
          const itemId = match[1];
          const item = status[itemId];
          if (item && item.sold === true) {
            link.classList.add('sold');
          }
        }
      });
    })
    .catch(() => {
      document.querySelectorAll('.slide-item').forEach((slide) => {
        slide.classList.add('available');
      });
    });

  function getSlideWidth() {
    return presentation.offsetWidth || window.innerWidth;
  }

  function getCurrentSlideIndex() {
    const scrollLeft = presentation.scrollLeft;
    const slideWidth = getSlideWidth();
    return Math.round(scrollLeft / slideWidth);
  }

  function scrollToSlide(index) {
    const slideWidth = getSlideWidth();
    const targetScroll = index * slideWidth;
    presentation.scrollTo({ left: targetScroll, behavior: 'smooth' });
  }

  function goToNext() {
    const current = getCurrentSlideIndex();
    const next = Math.min(current + 1, slides.length - 1);
    scrollToSlide(next);
  }

  function goToPrev() {
    const current = getCurrentSlideIndex();
    const prev = Math.max(current - 1, 0);
    scrollToSlide(prev);
  }

  // Navegação por teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrev();
    }
  });

  // Botões de seta
  if (navPrev) {
    navPrev.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      goToPrev();
    });
  }

  if (navNext) {
    navNext.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      goToNext();
    });
  }

  // Links do índice - scroll para o slide correto
  document.querySelectorAll('.toc-list a').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const match = href && href.match(/#item-(\d+)/);
      if (match) {
        const itemId = parseInt(match[1], 10);
        const slideIndex = itemId + 1;
        e.preventDefault();
        scrollToSlide(slideIndex);
      }
    });
  });

  // Clique para próximo slide (exceto em links e botões)
  document.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    if (e.target.closest('button')) return;
    if (e.target.closest('.gallery')) return;
    goToNext();
  });

  // Touch swipe para mobile
  let touchStartX = 0;
  let touchEndX = 0;

  presentation.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  presentation.addEventListener(
    'touchend',
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    const minSwipeDistance = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  }
})();
