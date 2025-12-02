// Green Leaf Garden - Luxury Portfolio Website JavaScript

class EliteLandscapes {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initParticles();
    this.initScrollAnimations();
    this.initPortfolioSliders();
    this.initPortfolioFilter();
    this.initCounters();
    this.initContactForm();
    this.initMobileMenu();
    this.initSmoothScroll();
    this.initNavbarScroll();
    this.initLightbox();
    this.initHoverEffects();
    this.observeElements();
  }

  setupEventListeners() {
    // Window events
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
    window.addEventListener('load', this.handleLoad.bind(this));
  }

  // Particle System for Hero Section
  initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random starting position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      particle.style.animationDelay = Math.random() * 5 + 's';
      
      // Random size and opacity
      const size = Math.random() * 4 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.opacity = Math.random() * 0.6 + 0.2;
      
      particlesContainer.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 15000);
    };

    // Create initial particles
    for (let i = 0; i < 20; i++) {
      setTimeout(() => createParticle(), i * 200);
    }

    // Continue creating particles
    setInterval(() => {
      if (particlesContainer.children.length < 30) {
        createParticle();
      }
    }, 800);
  }

  // Scroll Animations (Custom AOS implementation)
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, observerOptions);

    // Observe all elements with data-aos attributes
    document.querySelectorAll('[data-aos]').forEach(el => {
      observer.observe(el);
    });
  }

  // Portfolio Before/After Sliders
  initPortfolioSliders() {
    const sliders = document.querySelectorAll('.before-after-container');
    
    sliders.forEach(container => {
      const handle = container.querySelector('.slider-handle');
      const afterImage = container.querySelector('.after-image');
      let isDragging = false;

      if (!handle || !afterImage) return;

      const updateSlider = (x) => {
        const rect = container.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
        
        handle.style.left = percentage + '%';
        afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
      };

      // Mouse events
      handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        e.preventDefault();
        document.body.style.cursor = 'ew-resize';
      });

      document.addEventListener('mousemove', (e) => {
        if (isDragging) {
          updateSlider(e.clientX);
        }
      });

      document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = '';
      });

      // Touch events for mobile
      handle.addEventListener('touchstart', (e) => {
        isDragging = true;
        e.preventDefault();
      });

      document.addEventListener('touchmove', (e) => {
        if (isDragging) {
          e.preventDefault();
          const touch = e.touches[0];
          updateSlider(touch.clientX);
        }
      });

      document.addEventListener('touchend', () => {
        isDragging = false;
      });

      // Click to position
      container.addEventListener('click', (e) => {
        if (!isDragging && e.target !== handle) {
          updateSlider(e.clientX);
        }
      });

      // Initial position at 50%
      updateSlider(container.getBoundingClientRect().left + container.getBoundingClientRect().width * 0.5);
    });
  }

  // Portfolio Filter
  initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // Filter portfolio items with animation
        portfolioItems.forEach((item, index) => {
          const category = item.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
              item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }, index * 100);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Animated Counters
  initCounters() {
    const counters = document.querySelectorAll('.achievement-number');
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-count'));
          let current = 0;
          const increment = target / 100;
          const duration = 2000; // 2 seconds
          const stepTime = duration / 100;

          counter.classList.add('counted');

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              setTimeout(updateCounter, stepTime);
            } else {
              counter.textContent = target;
            }
          };

          updateCounter();
        }
      });
    }, observerOptions);

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  // Contact Form with Enhanced Validation
  initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    // Add real-time validation
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });

      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          this.validateField(input);
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Validate all fields
      let isValid = true;
      const requiredFields = ['name', 'email', 'message'];
      
      requiredFields.forEach(field => {
        const input = form.querySelector(`[name="${field}"]`);
        if (!this.validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        this.showNotification('Please correct the errors in the form.', 'error');
        return;
      }

      // Simulate form submission with loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      // Simulate API call
      setTimeout(() => {
        this.showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        form.reset();
        
        // Remove validation states
        inputs.forEach(input => {
          input.classList.remove('error', 'success');
          this.removeFieldError(input);
        });
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }, 2000);
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const name = field.getAttribute('name');
    let isValid = true;
    let errorMessage = '';

    // Remove previous validation states
    field.classList.remove('error', 'success');
    this.removeFieldError(field);

    // Required field validation
    if (['name', 'email', 'message'].includes(name) && !value) {
      isValid = false;
      errorMessage = 'This field is required.';
    }
    
    // Email validation
    else if (name === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address.';
    }
    
    // Phone validation (optional but if filled, should be valid)
    else if (name === 'phone' && value && !this.isValidPhone(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number.';
    }

    // Apply validation styling
    if (!isValid) {
      field.classList.add('error');
      this.showFieldError(field, errorMessage);
    } else if (value) {
      field.classList.add('success');
    }

    return isValid;
  }

  showFieldError(field, message) {
    let errorDiv = field.parentNode.querySelector('.field-error');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 12px;
        margin-top: 4px;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      field.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
    setTimeout(() => errorDiv.style.opacity = '1', 50);
  }

  removeFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
      errorDiv.style.opacity = '0';
      setTimeout(() => errorDiv.remove(), 300);
    }
  }

  // Mobile Menu
  initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!toggle || !navMenu) return;

    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      toggle.classList.toggle('active');
      
      // Animate hamburger
      const spans = toggle.querySelectorAll('span');
      spans.forEach((span, index) => {
        if (toggle.classList.contains('active')) {
          if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
          if (index === 1) span.style.opacity = '0';
          if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
          span.style.transform = '';
          span.style.opacity = '';
        }
      });
    });

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        toggle.classList.remove('active');
        const spans = toggle.querySelectorAll('span');
        spans.forEach(span => {
          span.style.transform = '';
          span.style.opacity = '';
        });
      });
    });
  }

  // Enhanced Smooth Scroll Navigation
  initSmoothScroll() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = target.offsetTop - navbarHeight - 20;
          
          // Add loading indicator to clicked link
          const originalText = anchor.textContent;
          if (anchor.classList.contains('nav-link')) {
            anchor.style.color = '#DAA520';
          }
          
          // Smooth scroll
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Reset link style after scroll
          setTimeout(() => {
            if (anchor.classList.contains('nav-link')) {
              anchor.style.color = '';
            }
          }, 1000);
        }
      });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('section[id]');
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      let currentSection = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 50;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });

      // Update active nav links
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    });
  }

  // Navbar Scroll Effect
  initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(13, 43, 29, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.backdropFilter = 'blur(20px)';
      } else {
        navbar.style.background = 'rgba(13, 43, 29, 0.95)';
        navbar.style.boxShadow = 'none';
        navbar.style.backdropFilter = 'blur(20px)';
      }
    });
  }

  // Enhanced Lightbox
  initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDescription = lightbox.querySelector('.lightbox-description');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Open lightbox on portfolio image click
    document.querySelectorAll('.portfolio-before-after').forEach(container => {
      container.addEventListener('click', (e) => {
        // Don't open lightbox if dragging slider
        if (e.target.classList.contains('slider-handle')) return;
        
        const portfolioItem = container.closest('.portfolio-item');
        const title = portfolioItem.querySelector('h3').textContent;
        const description = portfolioItem.querySelector('.portfolio-info > p').textContent;
        const afterImage = container.querySelector('.after-image');
        
        if (afterImage && lightboxImage && lightboxTitle && lightboxDescription) {
          lightboxImage.src = afterImage.src;
          lightboxTitle.textContent = title;
          lightboxDescription.textContent = description;
          
          lightbox.classList.remove('hidden');
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
          
          // Add entrance animation
          setTimeout(() => {
            lightboxImage.style.transform = 'scale(1)';
            lightboxImage.style.opacity = '1';
          }, 50);
        }
      });
    });

    // Close lightbox function
    const closeLightbox = () => {
      lightbox.classList.remove('active');
      lightboxImage.style.transform = 'scale(0.9)';
      lightboxImage.style.opacity = '0';
      
      setTimeout(() => {
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
      }, 300);
    };

    // Close events
    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // Enhanced Hover Effects
  initHoverEffects() {
    // Service card hover effects
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.service-icon');
        if (icon) {
          icon.style.transform = 'scale(1.1) rotate(5deg)';
          icon.style.transition = 'transform 0.3s ease';
        }
      });

      card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.service-icon');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });

    // Achievement items glow effect
    document.querySelectorAll('.achievement-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.boxShadow = '0 20px 40px rgba(218, 165, 32, 0.2)';
        item.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease';
      });

      item.addEventListener('mouseleave', () => {
        item.style.boxShadow = '';
      });
    });

    // Portfolio item hover effects
    document.querySelectorAll('.portfolio-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        const sliderHandle = item.querySelector('.slider-handle');
        if (sliderHandle) {
          sliderHandle.style.opacity = '1';
          sliderHandle.style.transform = 'translateX(-50%) scale(1.1)';
        }
      });

      item.addEventListener('mouseleave', () => {
        const sliderHandle = item.querySelector('.slider-handle');
        if (sliderHandle) {
          sliderHandle.style.opacity = '0.8';
          sliderHandle.style.transform = 'translateX(-50%) scale(1)';
        }
      });
    });
  }

  // Intersection Observer Animations
  observeElements() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });

    // Observe portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(item);
    });
  }

  // Event Handlers
  handleScroll() {
    this.updateScrollProgress();
    this.parallaxEffect();
  }

  handleResize() {
    // Handle responsive changes
    this.updateParticleCount();
  }

  handleLoad() {
    // Page loaded animations
    document.body.classList.add('loaded');
  }

  // Helper Methods
  updateScrollProgress() {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const scrollPercent = scrollTop / (docHeight - winHeight);
    
    // Update any scroll-based animations here
  }

  parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-image, .about-background, .contact-background');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }

  updateParticleCount() {
    const particles = document.querySelectorAll('.particle');
    const maxParticles = window.innerWidth < 768 ? 15 : 30;
    
    if (particles.length > maxParticles) {
      for (let i = maxParticles; i < particles.length; i++) {
        particles[i].remove();
      }
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  }

  showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;

    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6',
      color: 'white',
      padding: '16px 24px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      zIndex: '9999',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      maxWidth: '400px',
      fontSize: '14px',
      fontWeight: '500'
    });

    document.body.appendChild(notification);

    // Close button event
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    });

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }
}

// CSS for enhanced styling
const enhancedStyles = `
  <style>
    .notification-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .notification-icon {
      font-weight: bold;
      font-size: 16px;
    }

    .notification-close {
      background: none;
      border: none;
      color: white;
      font-size: 18px;
      cursor: pointer;
      margin-left: auto;
      padding: 0;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 2px;
      transition: background-color 0.2s ease;
    }

    .notification-close:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    .form-control.error {
      border-color: #ef4444 !important;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .form-control.success {
      border-color: #22c55e !important;
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1) !important;
    }

    .lightbox-image {
      transform: scale(0.9);
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .nav-link.active {
      color: var(--luxury-gold) !important;
    }

    .nav-link.active::after {
      width: 100% !important;
    }

    .slider-handle {
      opacity: 0.8;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .portfolio-item:hover .slider-handle {
      opacity: 1;
    }

    @media (max-width: 768px) {
      .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(13, 43, 29, 0.98);
        backdrop-filter: blur(20px);
        padding: var(--space-20);
        border-top: 1px solid rgba(218, 165, 32, 0.3);
      }

      .nav-menu {
        display: none;
      }
    }
  </style>
`;

// Inject enhanced styles
document.head.insertAdjacentHTML('beforeend', enhancedStyles);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new EliteLandscapes();
});

// Performance optimization - Lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Export for potential external use
window.EliteLandscapes = EliteLandscapes;