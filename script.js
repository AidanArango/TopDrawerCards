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

// ── Instagram Configuration ──
// Simply paste your 4 most recent Instagram post image URLs below
// To get image URLs:
// 1. Go to https://www.instagram.com/topdrawercards/
// 2. Right-click each post image → "Copy image link"
// 3. Paste the URL in the array below
const INSTAGRAM_POSTS = [
  {
    image: 'https://www.instagram.com/p/DMawungJWGF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', // ← PASTE IMAGE URL HERE
    caption: 'Post 1'
  },
  {
    image: 'https://www.instagram.com/p/DQ9xSVij5lz/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', // ← PASTE IMAGE URL HERE
    caption: 'Post 2'
  },
  {
    image: 'https://www.instagram.com/p/DTG3VkgkhjW/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', // ← PASTE IMAGE URL HERE
    caption: 'Post 3'
  },
  {
    image: 'https://www.instagram.com/p/DTgAyitgd56/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', // ← PASTE IMAGE URL HERE
    caption: 'Post 4'
  }
];

// ── Load Instagram Posts ──
function loadInstagramPosts() {
  const igGrid = document.getElementById('ig-grid');
  igGrid.innerHTML = ''; // Clear loading state
  
  INSTAGRAM_POSTS.forEach(post => {
    const postEl = document.createElement('a');
    postEl.href = 'https://www.instagram.com/topdrawercards/';
    postEl.target = '_blank';
    postEl.className = 'ig-post';
    postEl.style.backgroundImage = `url('${post.image}')`;
    postEl.style.backgroundSize = 'cover';
    postEl.style.backgroundPosition = 'center';
    
    const overlay = document.createElement('div');
    overlay.className = 'ig-overlay';
    overlay.textContent = post.caption;
    
    postEl.appendChild(overlay);
    igGrid.appendChild(postEl);
  });
}

// Load posts when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadInstagramPosts);
} else {
  loadInstagramPosts();
}
