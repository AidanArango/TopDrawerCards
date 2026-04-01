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
    image: 'https://scontent-lax3-1.cdninstagram.com/v/t51.82787-15/521656680_18035267732678558_6476080717789847994_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MzY4MjQ2OTk0NDk4MDk0NDExMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM0Ni5zZHIuQzMifQ%3D%3D&_nc_ohc=ZsT8GuMm61oQ7kNvwG_EDuM&_nc_oc=Adps9jJkRPSXUd9aTDgrKZQcYmjZZYv5U0ORmdvAOO5Rm8qYpsr7MS62GH3XwXfDH4c&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_gid=OqdaNsosfUcCjKZDtxInPQ&_nc_ss=7a32e&oh=00_Af2kRluzysEGpix90QcfuBuQPGrkAzqHRhrSQcxA5E-EjQ&oe=69D32C93', // ← PASTE IMAGE URL HERE
    caption: 'Post 1'
  },
  {
    image: 'https://scontent-lax3-1.cdninstagram.com/v/t51.82787-15/521656680_18035267732678558_6476080717789847994_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MzY4MjQ2OTk0NDk4MDk0NDExMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM0Ni5zZHIuQzMifQ%3D%3D&_nc_ohc=ZsT8GuMm61oQ7kNvwG_EDuM&_nc_oc=Adps9jJkRPSXUd9aTDgrKZQcYmjZZYv5U0ORmdvAOO5Rm8qYpsr7MS62GH3XwXfDH4c&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_gid=OqdaNsosfUcCjKZDtxInPQ&_nc_ss=7a32e&oh=00_Af2kRluzysEGpix90QcfuBuQPGrkAzqHRhrSQcxA5E-EjQ&oe=69D32C93', // ← PASTE IMAGE URL HERE
    caption: 'Post 2'
  },
  {
    image: 'https://scontent-lax3-1.cdninstagram.com/v/t51.82787-15/521656680_18035267732678558_6476080717789847994_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MzY4MjQ2OTk0NDk4MDk0NDExMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM0Ni5zZHIuQzMifQ%3D%3D&_nc_ohc=ZsT8GuMm61oQ7kNvwG_EDuM&_nc_oc=Adps9jJkRPSXUd9aTDgrKZQcYmjZZYv5U0ORmdvAOO5Rm8qYpsr7MS62GH3XwXfDH4c&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_gid=OqdaNsosfUcCjKZDtxInPQ&_nc_ss=7a32e&oh=00_Af2kRluzysEGpix90QcfuBuQPGrkAzqHRhrSQcxA5E-EjQ&oe=69D32C93', // ← PASTE IMAGE URL HERE
    caption: 'Post 3'
  },
  {
    image: 'https://scontent-lax3-1.cdninstagram.com/v/t51.82787-15/521656680_18035267732678558_6476080717789847994_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MzY4MjQ2OTk0NDk4MDk0NDExMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM0Ni5zZHIuQzMifQ%3D%3D&_nc_ohc=ZsT8GuMm61oQ7kNvwG_EDuM&_nc_oc=Adps9jJkRPSXUd9aTDgrKZQcYmjZZYv5U0ORmdvAOO5Rm8qYpsr7MS62GH3XwXfDH4c&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_gid=OqdaNsosfUcCjKZDtxInPQ&_nc_ss=7a32e&oh=00_Af2kRluzysEGpix90QcfuBuQPGrkAzqHRhrSQcxA5E-EjQ&oe=69D32C93', // ← PASTE IMAGE URL HERE
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
