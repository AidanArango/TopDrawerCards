/* =========================================
   TOP DRAWER CARDS — NEW script.js
   ========================================= */

// ── Nav: hamburger toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ── Nav: scroll shadow ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 4px 30px rgba(0,0,0,.5)'
      : 'none';
  }, { passive: true });
}

// ── Scroll fade-in ──
const fadeEls = document.querySelectorAll(
  '.section-head, .collection-card, .ig-post, .supply-card, .footer-inner'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ═══════════════════════════════════════════
// CATEGORY FILTERING
// ═══════════════════════════════════════════

const categoryBtns = document.querySelectorAll('.category-btn');

function getCollectionCards() {
  return document.querySelectorAll('.collection-card');
}

categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const selectedCategory = btn.getAttribute('data-category');
    const cards = getCollectionCards();

    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (selectedCategory === 'all' || cardCategory === selectedCategory) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.classList.add('visible');
        }, 10);
      } else {
        card.style.display = 'none';
        card.classList.remove('visible');
      }
    });
  });
});

// ═══════════════════════════════════════════
// HORIZONTAL SCROLL NAVIGATION
// ═══════════════════════════════════════════

const scrollTrack = document.getElementById('scrollTrack');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

if (scrollTrack && scrollLeftBtn && scrollRightBtn) {
  const scrollAmount = 240; // Card width + gap
  
  scrollLeftBtn.addEventListener('click', () => {
    scrollTrack.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });
  
  scrollRightBtn.addEventListener('click', () => {
    scrollTrack.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
  
  // Update button states based on scroll position
  const updateScrollButtons = () => {
    scrollLeftBtn.style.opacity = scrollTrack.scrollLeft > 0 ? '1' : '0.5';
    scrollLeftBtn.style.pointerEvents = scrollTrack.scrollLeft > 0 ? 'auto' : 'none';
    
    const isAtEnd = scrollTrack.scrollLeft >= (scrollTrack.scrollWidth - scrollTrack.clientWidth - 10);
    scrollRightBtn.style.opacity = isAtEnd ? '0.5' : '1';
    scrollRightBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
  };
  
  scrollTrack.addEventListener('scroll', updateScrollButtons, { passive: true });
  updateScrollButtons(); // Initial state
}

// ═══════════════════════════════════════════
// INSTAGRAM CONFIGURATION & LOADING
// ═══════════════════════════════════════════

const INSTAGRAM_POSTS = [
  {
    image: 'https://scontent-lax3-1.cdninstagram.com/v/t51.82787-15/521656680_18035267732678558_6476080717789847994_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MzY4MjQ2OTk0NDk4MDk0NDExMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM0Ni5zZHIuQzMifQ%3D%3D&_nc_ohc=ZsT8GuMm61oQ7kNvwG_EDuM&_nc_oc=Adps9jJkRPSXUd9aTDgrKZQcYmjZZYv5U0ORmdvAOO5Rm8qYpsr7MS62GH3XwXfDH4c&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_gid=OqdaNsosfUcCjKZDtxInPQ&_nc_ss=7a32e&oh=00_Af2kRluzysEGpix90QcfuBuQPGrkAzqHRhrSQcxA5E-EjQ&oe=69D32C93',
    caption: 'Post 1'
  },
  {
    image: 'https://scontent-lax3-2.cdninstagram.com/v/t51.82787-15/580866020_18048872111678558_4082195663215850759_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ig_cache_key=Mzc2NDM4MTYyNzkwOTY0MjYxMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEzNDd4MTY3OS5zZHIuQzMifQ%3D%3D&_nc_ohc=9LGZ2f8vmWcQ7kNvwHTv85g&_nc_oc=AdpHldHAAfysYDksoE-OhkZ-K7HIN2ayEIDfp7nU3gRpiqDjdQxLz-5rQdF2hsUEitc&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_gid=-WqYnwb-Z2tYxsQNBTcZsg&_nc_ss=7a32e&oh=00_Af3a5SRH4GHkfrBNue_MILgzHWCBeYfrSz2dHhTYImtUaQ&oe=69D3200A',
    caption: 'Post 2'
  },
  {
    image: 'https://scontent-lax3-1.cdninstagram.com/v/t51.82787-15/609715464_18054625976678558_122937020952692263_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=MzgwMjk3MDMxMDIyOTIzNTkyNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEzNDd4MTY3OS5zZHIuQzMifQ%3D%3D&_nc_ohc=rKxY7BFGOygQ7kNvwHQG_M4&_nc_oc=AdpdghKu9QU16Pq4Mne8TMnEbFCKlgWtUEIDddAL5S3pzU5IuAwyeaf8eR69A6shHjA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_gid=-WqYnwb-Z2tYxsQNBTcZsg&_nc_ss=7a32e&oh=00_Af3Q4ZNInhIPRF0AM3mI2khPnEkrBFpo17VZZOdOKHyCMA&oe=69D330D7',
    caption: 'Post 3'
  },
  {
    image: 'https://scontent-lax3-2.cdninstagram.com/v/t51.82787-15/616415149_18055640357678558_9074992417643838274_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzgxMDA0ODc1Nzk5OTk4NDI1MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjExNzh4MTI4Ni5zZHIuQzMifQ%3D%3D&_nc_ohc=brrdARBrAtwQ7kNvwE0ur5o&_nc_oc=AdoKx2b38CL5HihwUDrv5yi_sJX2IzLwbORUPHb_kyunslccLOk9zv8BFgdewGm4YZA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_gid=m4nPP2l_1ftUKIJ_XMuXgg&_nc_ss=7a32e&oh=00_Af2u2kb8LkluRC2c7u0B5ffE2M5OHY0lUenQysvZrfcnbQ&oe=69D33EEA',
    caption: 'Post 4'
  }
];

// Load Instagram Posts
function loadInstagramPosts() {
  const igGrid = document.getElementById('ig-grid');
  if (!igGrid) return;
  
  igGrid.innerHTML = ''; // Clear loading state
  
  INSTAGRAM_POSTS.forEach(post => {
    const postEl = document.createElement('a');
    postEl.href = 'https://www.instagram.com/topdrawercards/';
    postEl.target = '_blank';
    postEl.className = 'ig-post fade-up';
    postEl.style.backgroundImage = `url('${post.image}')`;
    postEl.style.backgroundSize = 'cover';
    postEl.style.backgroundPosition = 'center';
    
    const overlay = document.createElement('div');
    overlay.className = 'ig-overlay';
    overlay.textContent = post.caption;
    
    postEl.appendChild(overlay);
    igGrid.appendChild(postEl);
    
    // Add fade-up animation
    setTimeout(() => {
      postEl.classList.add('visible');
    }, 100);
  });
}

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1KWbjhpV1tIlLFHY3hpT5g07sq6FsIrkgUmsLcPCOhT8/edit?gid=2110697240#gid=2110697240';

function getGoogleSheetCsvUrl(sheetUrl) {
  const idMatch = sheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (!idMatch) return null;

  let gid = '0';
  const gidMatch = sheetUrl.match(/[?&]gid=(\d+)|#gid=(\d+)/);
  if (gidMatch) {
    gid = gidMatch[1] || gidMatch[2] || gid;
  }

  return `https://docs.google.com/spreadsheets/d/${idMatch[1]}/export?format=csv&gid=${gid}`;
}

function parseCSV(text) {
  const rows = text.trim().split(/\r?\n/).filter(line => line.trim().length);
  if (!rows.length) return [];

  const headers = rows.shift().split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/).map(h => h.trim().replace(/^\"|\"$/g, ''));
  return rows.map(row => {
    const values = row.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/).map(v => v.trim().replace(/^\"|\"$/g, ''));
    const record = {};
    headers.forEach((header, index) => {
      record[header.trim().toLowerCase().replace(/[^a-z0-9]/g, '')] = values[index] || '';
    });
    return record;
  });
}

function normalizeSheetRow(row) {
  return {
    id: row.id ? Number(row.id) : Date.now(),
    category: row.category || row.type || row.sport || 'other-sports',
    number: row.number || row.cardnumber || row.id || '',
    playerName: row.playername || row.player || row.subject || row.name || row.title || 'Untitled',
    team: row.team || row.set || '',
    year: row.year || '',
    badge: row.badge || row.grade || 'RAW',
    cardTitle: row.cardtitle || row.title || row.printrun || row.category || '',
    image: row.imageurl || row.image || row.img || ''
  };
}

function renderLandingCards(cards) {
  const scrollTrack = document.getElementById('scrollTrack');
  if (!scrollTrack) return;

  scrollTrack.innerHTML = cards.length
    ? cards.map(card => `
      <div class="collection-card" data-category="${card.category}">
        <div class="card-slab">
          <div class="slab-inner slab-variant-1">
            <div class="card-number">${card.number}</div>
            <div class="card-image">
              ${card.image ? `<img src="${card.image}" alt="${card.playerName}" class="collection-card-image">` : '<div class="card-placeholder"></div>'}
            </div>
            <div class="card-info">
              <div class="card-name">${card.playerName}</div>
              <div class="card-meta">${card.team ? `${card.team} · ${card.year}` : card.year}</div>
            </div>
          </div>
        </div>
        <div class="card-label">
          <span class="grade-badge">${card.badge}</span>
          <span class="card-title">${card.cardTitle}</span>
        </div>
      </div>
    `).join('')
    : '<div class="collection-loading">Loading latest cards…</div>';

  scrollTrack.querySelectorAll('.collection-card').forEach(card => {
    const slab = card.querySelector('.slab-inner');
    if (!slab) return;

    card.addEventListener('mouseenter', () => {
      slab.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
      slab.style.transform = 'translateY(0) scale(1)';
    });
  });
}

async function loadLandingSheetCards() {
  const scrollTrack = document.getElementById('scrollTrack');
  if (!scrollTrack) return;

  scrollTrack.innerHTML = '<div class="collection-loading">Loading latest cards…</div>';

  const csvUrl = getGoogleSheetCsvUrl(SHEET_URL);
  if (!csvUrl) return;

  try {
    const response = await fetch(csvUrl);
    if (!response.ok) return;

    const text = await response.text();
    const parsed = parseCSV(text);
    if (!parsed.length) return;

    const importedCards = parsed.map(normalizeSheetRow);
    const recentCards = importedCards.slice(-6);
    renderLandingCards(recentCards);
  } catch (error) {
    console.error('Unable to load landing page cards:', error);
  }
}

// Load posts when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadInstagramPosts();
    loadLandingSheetCards();
  });
} else {
  loadInstagramPosts();
  loadLandingSheetCards();
}

// ═══════════════════════════════════════════
// CARD HOVER EFFECTS
// ═══════════════════════════════════════════

const collectionCardElems = document.querySelectorAll('.collection-card');

collectionCardElems.forEach(card => {
  const slab = card.querySelector('.slab-inner');
  
  if (slab) {
    card.addEventListener('mouseenter', () => {
      slab.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      slab.style.transform = 'translateY(0) scale(1)';
    });
  }
});
