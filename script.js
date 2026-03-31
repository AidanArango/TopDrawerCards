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
// Add your Meta access token and Instagram User ID below
const INSTAGRAM_CONFIG = {
  accessToken: 'YOUR_ACCESS_TOKEN_HERE', // Get from: https://developers.facebook.com/apps/
  instagramUserId: 'YOUR_INSTAGRAM_USER_ID_HERE', // Get from: https://www.instagram.com/graph/ig-user-id/
  username: 'topdrawercards'
};

// ── Load Instagram Posts ──
async function loadInstagramPosts() {
  const igGrid = document.getElementById('ig-grid');
  
  // Show loading state
  igGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--muted);">Loading instagram posts...</p>';
  
  try {
    // If token not configured, show setup message
    if (INSTAGRAM_CONFIG.accessToken === 'YOUR_ACCESS_TOKEN_HERE') {
      igGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: var(--muted); padding: 20px;">
          <p>Instagram feed not yet configured.</p>
          <p style="font-size: 14px; margin-top: 10px;">Add your access token to the script to display posts.</p>
        </div>
      `;
      return;
    }
    
    // Fetch media from Instagram API
    const response = await fetch(
      `https://graph.instagram.com/v18.0/${INSTAGRAM_CONFIG.instagramUserId}/media?fields=id,caption,media_type,media_url,permalink,timestamp&limit=4&access_token=${INSTAGRAM_CONFIG.accessToken}`
    );
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.data || data.data.length === 0) {
      igGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--muted);">No posts found.</p>';
      return;
    }
    
    // Render posts
    igGrid.innerHTML = data.data.slice(0, 4).map((post) => `
      <a href="${post.permalink}" target="_blank" rel="noopener" class="ig-post fade-up" title="${post.caption || 'View on Instagram'}">
        ${post.media_type === 'IMAGE' ? `<img src="${post.media_url}" alt="${post.caption || 'Instagram post'}" style="width: 100%; height: 100%; object-fit: cover;">` : `<video src="${post.media_url}" style="width: 100%; height: 100%; object-fit: cover;"></video>`}
        <div class="ig-overlay">
          <span style="font-size: 14px; text-align: center; word-wrap: break-word; max-width: 90%;">${post.caption ? post.caption.substring(0, 30) + '...' : 'View Post'}</span>
        </div>
      </a>
    `).join('');
    
  } catch (error) {
    console.error('Instagram feed error:', error);
    igGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: var(--muted); padding: 20px;">
        <p>Unable to load Instagram posts.</p>
        <p style="font-size: 12px; margin-top: 10px;"><a href="https://www.instagram.com/${INSTAGRAM_CONFIG.username}/" target="_blank" style="color: var(--primary);">Visit profile →</a></p>
      </div>
    `;
  }
}

// Load posts when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadInstagramPosts);
} else {
  loadInstagramPosts();
}
