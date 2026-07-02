/* ==========================================================================
   NEBULA PREMIUM ECOMMERCE HOMEPAGE - SCRIPTS
   Handles: Slider Initializations, Mobile Drawer, Form Submissions,
   Interactive Cart/Wishlist Badges, Toast Notifications, and Entrance Effects.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Inject Toast Styling Dynamically for self-contained premium feedback
  const toastStyle = document.createElement('style');
  toastStyle.innerHTML = `
    .nebula-toast {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background-color: var(--primary-navy, #082540);
      color: #ffffff;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 15px 35px rgba(8, 37, 64, 0.2);
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 10000;
      transform: translateY(100px) scale(0.85);
      opacity: 0;
      transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s ease;
      font-size: 14px;
      font-weight: 500;
      font-family: 'Inter', sans-serif;
      border: 1px solid rgba(255, 255, 255, 0.1);
      pointer-events: none;
    }
    .nebula-toast.show {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    .nebula-toast-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.15);
    }
    .nebula-toast-success .nebula-toast-icon {
      background-color: rgba(52, 199, 89, 0.2);
      color: #34C759;
    }
    @media (max-width: 576px) {
      .nebula-toast {
        left: 16px;
        right: 16px;
        bottom: 20px;
      }
    }
  `;
  document.head.appendChild(toastStyle);

  // ── Custom Hero Panel Slider (no Swiper dependency) ──────────────────────
  const heroPanels = document.querySelectorAll('.hero-panel');
  const heroDots   = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let heroTimer    = null;

  function goToSlide(index) {
    // Wrap index
    index = (index + heroPanels.length) % heroPanels.length;

    heroPanels.forEach((p, i) => p.classList.toggle('active', i === index));
    heroDots.forEach((d, i)   => d.classList.toggle('active', i === index));

    currentSlide = index;
    // Re-init Lucide for any icons in the newly-active panel
    if (typeof lucide !== 'undefined') { lucide.createIcons(); }
  }

  function startHeroAutoplay() {
    heroTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  function stopHeroAutoplay() {
    if (heroTimer) clearInterval(heroTimer);
  }

  // Dot click handlers
  heroDots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopHeroAutoplay();
      goToSlide(parseInt(dot.dataset.dot, 10));
      startHeroAutoplay();
    });
  });

  // Pause autoplay on hover
  const heroSlider = document.getElementById('heroSlider');
  if (heroSlider) {
    heroSlider.addEventListener('mouseenter', stopHeroAutoplay);
    heroSlider.addEventListener('mouseleave', startHeroAutoplay);
  }

  // Kick off
  goToSlide(0);
  startHeroAutoplay();


  // Initialize Categories Swiper
  let categoriesSwiper;
  if (typeof Swiper !== 'undefined') {
    categoriesSwiper = new Swiper('#categoriesCarousel', {
      slidesPerView: 2,
      spaceBetween: 16,
      grabCursor: true,
      breakpoints: {
        390: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
        576: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 5,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 8,
          spaceBetween: 28,
        }
      }
    });
  }

  /* --- Mobile Navigation Drawer (Hamburger) --- */
  const mobileHamburger = document.getElementById('hamburgerMenuTrigger');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerOverlay = document.getElementById('drawerOverlay');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent main body scrolling
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileHamburger) {
    mobileHamburger.addEventListener('click', openDrawer);
  }
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  // Close drawer on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
    }
  });

  /* --- Dynamic Toast Notification Helper --- */
  window.showToast = function(message, type = 'success') {
    const existingToasts = document.querySelectorAll('.nebula-toast');
    existingToasts.forEach(toast => toast.remove()); // Remove duplicates

    const toast = document.createElement('div');
    toast.className = `nebula-toast nebula-toast-${type}`;
    
    // Choose icon markup based on toast type
    let iconHTML = `<span class="nebula-toast-icon"><i data-lucide="info" width="14" height="14"></i></span>`;
    if (type === 'success') {
      iconHTML = `<span class="nebula-toast-icon"><i data-lucide="check" width="14" height="14"></i></span>`;
    }
    
    toast.innerHTML = `
      ${iconHTML}
      <span>${message}</span>
    `;

    document.body.appendChild(toast);
    
    // Refresh icons inside toast
    if (typeof lucide !== 'undefined') {
      lucide.createIcons({
        attrs: {
          class: 'lucide'
        },
        nameAttr: 'data-lucide',
        node: toast
      });
    }

    // Force reflow and show toast
    setTimeout(() => {
      toast.classList.add('show');
    }, 50);

    // Fade out and remove toast
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 3000);
  }

  /* --- Interactive Add To Cart --- */
  const cartCount = document.getElementById('cartCount');
  let currentCartTotal = parseInt(cartCount ? cartCount.innerText : '3', 10);

  window.addToCart = function(button, productName) {
    currentCartTotal += 1;
    if (cartCount) {
      cartCount.innerText = currentCartTotal;
      // Micro-animation: Badge Bounce scale
      cartCount.style.transform = 'scale(1.4)';
      cartCount.style.backgroundColor = 'var(--btn-hover)';
      cartCount.style.transition = 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.15s ease';
      
      setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
        cartCount.style.backgroundColor = 'var(--primary-navy)';
      }, 250);
    }

    // Micro-animation: Button spin/fade
    const originalContent = button.innerHTML;
    button.innerHTML = `<i data-lucide="check" width="16" height="16"></i>`;
    button.style.backgroundColor = 'var(--success)';
    button.style.color = '#ffffff';
    button.style.borderColor = 'var(--success)';
    if (typeof lucide !== 'undefined') {
      lucide.createIcons({ node: button });
    }

    setTimeout(() => {
      button.innerHTML = originalContent;
      button.style.backgroundColor = '';
      button.style.color = '';
      button.style.borderColor = '';
      if (typeof lucide !== 'undefined') {
        lucide.createIcons({ node: button });
      }
    }, 1500);

    showToast(`Added ${productName} to your cart!`);
  }

  /* --- Interactive Wishlist Toggler --- */
  window.toggleWishlist = function(button) {
    button.classList.toggle('active');
    
    // Choose message based on active status
    const isActive = button.classList.contains('active');
    const heartIcon = button.querySelector('i');
    
    if (isActive) {
      heartIcon.style.fill = '#ff4d4d';
      heartIcon.style.stroke = '#ff4d4d';
      showToast('Item saved to your Wishlist!');
    } else {
      heartIcon.style.fill = 'none';
      heartIcon.style.stroke = 'currentColor';
      showToast('Item removed from your Wishlist.', 'info');
    }
  }

  /* --- Interactive Search submits --- */
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputVal = searchForm.querySelector('.search-input').value;
      if (inputVal.trim() !== '') {
        showToast(`Searching for "${inputVal}"...`, 'info');
        searchForm.reset();
      }
    });
  }

  // Drawer Search
  const drawerSearchForm = document.querySelector('.drawer-search-form');
  if (drawerSearchForm) {
    drawerSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputVal = drawerSearchForm.querySelector('.search-input').value;
      if (inputVal.trim() !== '') {
        showToast(`Searching for "${inputVal}"...`, 'info');
        drawerSearchForm.reset();
        closeDrawer();
      }
    });
  }

  /* --- Newsletter Subscription submits --- */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.newsletter-input').value;
      if (emailInput.trim() !== '') {
        showToast('Thanks for subscribing! Check your inbox soon.', 'success');
        newsletterForm.reset();
      }
    });
  }

  /* --- Scroll-driven Entrance Animations (Intersection Observer) --- */
  const scrollElements = document.querySelectorAll('.animate-on-scroll');

  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        elementObserver.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.12, // Trigger when 12% of the element is visible
    rootMargin: '0px 0px -40px 0px'
  });

  scrollElements.forEach(elem => {
    elementObserver.observe(elem);
  });

  // Sticky Header elevation shadow on scroll
  const headerMain = document.getElementById('headerMain');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      headerMain.style.boxShadow = '0 10px 30px rgba(8, 37, 64, 0.08)';
      headerMain.style.transition = 'box-shadow 0.3s ease';
    } else {
      headerMain.style.boxShadow = 'var(--shadow-sm)';
    }
  });

});
