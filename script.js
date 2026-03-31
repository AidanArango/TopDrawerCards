/* =========================================
   TOP DRAWER CARDS — script.js
   ========================================= */

// ── Nav: hamburger toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Nav: scroll shadow ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10
    ? '0 4px 30px rgba(0,0,0,.5)'
    : 'none';
}, { passive: true });

// ── Scroll fade-in ──
const fadeEls = document.querySelectorAll(
  '.section-head, .card-item, .shop-text, .shop-visual, .ig-post, .supply-card, .footer-inner'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ── Card tilt effect ──
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.04)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── Load Instagram Posts ──
async function loadInstagramPosts() {
  const igGrid = document.getElementById('ig-grid');
  
  // Create styled Instagram post placeholders
  const postsData = [
    { 
      label: 'Latest Post', 
      icon: '📸',
      url: 'https://www.instagram.com/topdrawercards/' 
    },
    { 
      label: 'Pack Break', 
      icon: '🎁',
      url: 'https://www.instagram.com/topdrawercards/' 
    },
    { 
      label: 'Rare Pull', 
      icon: '⭐',
      url: 'https://www.instagram.com/topdrawercards/' 
    },
    { 
      label: 'Graded Gem', 
      icon: '💎',
      url: 'https://www.instagram.com/topdrawercards/' 
    }
  ];
  
  igGrid.innerHTML = postsData.map((post, i) => `
    <a href="${post.url}" target="_blank" rel="noopener" class="ig-post fade-up" title="Go to ${post.label} on Instagram">
      <div class="ig-content">
        <span class="ig-icon">${post.icon}</span>
      </div>
      <div class="ig-overlay">
        <div class="ig-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
          </svg>
        </div>
        <span>${post.label}</span>
      </div>
    </a>
  `).join('');
}

// Load posts when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadInstagramPosts);
} else {
  loadInstagramPosts();
}
