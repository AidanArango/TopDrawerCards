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
// GOOGLE SHEET COLLECTION LOADER
// ═══════════════════════════════════════════

function parseCSV(text) {
  const rows = text.trim().split(/\r?\n/).filter(line => line.trim().length);
  if (!rows.length) return [];

  const headers = rows.shift().split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/).map(h => h.trim().replace(/^\"|\"$/g, ''));
  return rows.map(row => {
    const values = row.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/).map(v => v.trim().replace(/^\"|\"$/g, ''));
    const record = {};
    headers.forEach((header, index) => {
      record[header] = values[index] || '';
    });
    return record;
  });
}

function normalizeCategoryValue(value) {
  if (!value) return 'other-sports';
  return value.toString().trim().toLowerCase().replace(/[-_]+/g, ' ').replace(/\s+/g, ' ');
}

function normalizeCSVRow(row) {
  const normalized = {};
  Object.entries(row).forEach(([key, value]) => {
    const normalizedKey = key.trim().toLowerCase().replace(/[\s_-]+/g, '');
    normalized[normalizedKey] = value.trim();
  });

  return {
    id: normalized.id ? Number(normalized.id) : Date.now(),
    category: normalizeCategoryValue(normalized.category) || 'other-sports',
    number: normalized.number || '',
    playerName: normalized.playername || normalized.player || normalized.subject || normalized.name || normalized.title || '',
    team: normalized.team || normalized.set || '',
    year: normalized.year || '',
    variant: normalized.variant || 'variant-holo',
    badge: normalized.badge || '',
    badgeClass: normalized.badgeclass || '',
    condition: normalized.condition || '',
    grade: normalized.grade || '',
    printRun: normalized.printrun || '',
    image: normalized.image || normalized.img || normalized.imageurl || ''
  };
}

function showCSVMessage(message, isError = false) {
  const messageEl = document.getElementById('sheetStatus');
  if (!messageEl) return;
  if (!message) {
    messageEl.style.display = 'none';
    messageEl.textContent = '';
    return;
  }
  messageEl.textContent = message;
  messageEl.style.color = isError ? '#d9534f' : 'var(--muted)';
  messageEl.style.display = 'block';
}

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

async function loadGoogleSheet(sheetUrl) {
  if (!sheetUrl || window.COLLECTION_DATA_LOADER_STARTED) return;
  window.COLLECTION_DATA_LOADER_STARTED = true;

  const csvUrl = getGoogleSheetCsvUrl(sheetUrl);
  if (!csvUrl) {
    showCSVMessage('Could not determine sheet CSV URL.', true);
    return;
  }

  showCSVMessage('');
  try {
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const text = await response.text();
    const parsed = parseCSV(text);
    if (!parsed.length) {
      showCSVMessage('Google Sheet is empty or not formatted correctly.', true);
      return;
    }

    const importedCards = parsed.map(normalizeCSVRow);
    if (!Array.isArray(window.COLLECTION_DATA)) {
      window.COLLECTION_DATA = [];
    }
    window.COLLECTION_DATA.length = 0;
    window.COLLECTION_DATA.push(...importedCards);

    if (typeof window.onCollectionDataLoaded === 'function') {
      window.onCollectionDataLoaded();
    }
  } catch (error) {
    showCSVMessage('Could not load the Google Sheet. Check sharing settings and URL.', true);
    console.error(error);
  }
}

window.onCollectionDataLoaded = () => {
  if (typeof renderLandingCollectionCards === 'function') {
    renderLandingCollectionCards();
  }
  if (typeof renderCards === 'function') {
    renderCards(document.querySelector('.filter-btn.active')?.dataset.category || 'all');
  }
};

if (window.COLLECTION_SHEET_URL) {
  loadGoogleSheet(window.COLLECTION_SHEET_URL);
}

// ═══════════════════════════════════════════
// CATEGORY FILTERING
// ═══════════════════════════════════════════

const categoryBtns = document.querySelectorAll('.category-btn');

function getCollectionCards() {
  return document.querySelectorAll('.collection-card');
}

function mapLandingCardCategory(card) {
  const category = (card.category || '').toLowerCase();
  if (category.includes('soccer')) return 'soccer';
  if (category.includes('basketball')) return 'basketball';
  if (category.includes('football')) return 'football';
  if (category.includes('baseball')) return 'baseball';
  if (category.includes('hockey')) return 'hockey';

  const team = (card.team || '').toLowerCase();
  if (team.includes('lakers') || team.includes('heat') || team.includes('warriors') || team.includes('celtics') || team.includes('boston') || team.includes('miami')) return 'basketball';
  if (team.includes('chiefs') || team.includes('bills') || team.includes('dolphins') || team.includes('jets') || team.includes('raiders')) return 'football';
  if (team.includes('dodgers') || team.includes('yankees') || team.includes('mets') || team.includes('cardinals')) return 'baseball';
  if (team.includes('man city') || team.includes('bayern') || team.includes('psg') || team.includes('real madrid') || team.includes('inter miami') || team.includes('chelsea') || team.includes('uswnt') || team.includes('al nassr')) return 'soccer';

  const name = (card.playerName || '').toLowerCase();
  if (name.includes('lebron') || name.includes('kobe') || name.includes('jordan')) return 'basketball';
  if (name.includes('mahomes') || name.includes('brady') || name.includes('manning')) return 'football';
  if (name.includes('ohtani') || name.includes('robinson') || name.includes('jeter')) return 'baseball';
  if (name.includes('ronaldo') || name.includes('messi') || name.includes('mbappé') || name.includes('davies') || name.includes('haaland')) return 'soccer';

  return 'all';
}

function buildLandingCardHTML(card, index) {
  const variantIndex = (index % 5) + 1;
  const cardCategory = mapLandingCardCategory(card);
  const badgeText = card.grade || card.badge || '';
  const labelText = card.printRun || card.condition || '';
  const metaText = [card.team, card.year].filter(Boolean).join(' · ');
  // helper to normalize common Google Drive share links to a direct image URL
  function normalizeImageUrl(url) {
    if (!url) return '';
    try {
      const trimmed = url.trim();
      // drive file link: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
      const m = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (m && m[1]) return `https://drive.google.com/uc?export=view&id=${m[1]}`;
      // open?id=FILE_ID
      const m2 = trimmed.match(/open\?id=([a-zA-Z0-9_-]+)/);
      if (m2 && m2[1]) return `https://drive.google.com/uc?export=view&id=${m2[1]}`;
      // direct img URLs or hosting already OK
      return trimmed;
    } catch (e) {
      return url;
    }
  }

  const imgUrl = normalizeImageUrl(card.image || card.imageurl || card.img || '');

  const imageHTML = imgUrl
    ? `<img src="${imgUrl}" alt="${(card.playerName||'card')}" class="landing-card-image" onerror="this.style.display='none'">`
    : `<div class="card-placeholder"></div>`;

  return `
    <div class="collection-card" data-category="${cardCategory}">
      <div class="card-slab">
        <div class="slab-inner slab-variant-${variantIndex}">
          <div class="card-number">${card.number || ''}</div>
          <div class="card-image">${imageHTML}</div>
          <div class="card-info">
            <div class="card-name">${card.playerName || 'Unknown'}</div>
            <div class="card-meta">${metaText}</div>
          </div>
        </div>
      </div>
      <div class="card-label">
        <span class="grade-badge">${badgeText}</span>
        <span class="card-title">${labelText}</span>
      </div>
    </div>
  `;
}

function renderLandingCollectionCards(limit = 8) {
  const track = document.getElementById('scrollTrack');
  const all = window.COLLECTION_DATA || [];
  // show the most recent sheet rows first — assume later rows are newer
  const cards = all.length <= limit ? all.slice().reverse() : all.slice(-limit).reverse();
  if (!track || !cards.length) return;

  track.innerHTML = cards.map((card, index) => buildLandingCardHTML(card, index)).join('');
  const insertedCards = track.querySelectorAll('.collection-card');
  insertedCards.forEach(card => {
    card.style.display = 'flex';
    setTimeout(() => card.classList.add('visible'), 10);
  });
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

// Do not render landing cards until the Google Sheet data has loaded.
// Initial shared data starts empty to avoid placeholder content.

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

// Load posts when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadInstagramPosts();
  });
} else {
  loadInstagramPosts();
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
