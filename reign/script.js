// ============================================
// Reign & Teji's Cosmetics - Main JavaScript
// ============================================

// Initialize Lucide Icons
lucide.createIcons();

// ---- Product Data ----
const products = [
  {
    id: 1,
    name: "Velvet Matte Lipstick",
    shade: "Reign Red",
    price: 24.00,
    originalPrice: 32.00,
    category: "lips",
    rating: 4.9,
    reviews: 1247,
    badge: "Bestseller",
    image: "http://static.photos/cosmetic/320x240/70"
  },
  {
    id: 2,
    name: "Luminous Glow Foundation",
    shade: "50 Shades",
    price: 38.00,
    originalPrice: null,
    category: "face",
    rating: 4.8,
    reviews: 892,
    badge: "New",
    image: "http://static.photos/cosmetic/320x240/80"
  },
  {
    id: 3,
    name: "Rose Gold Eyeshadow Palette",
    shade: "12 Shades",
    price: 45.00,
    originalPrice: 56.00,
    category: "eyes",
    rating: 4.9,
    reviews: 2103,
    badge: "Popular",
    image: "http://static.photos/cosmetic/320x240/90"
  },
  {
    id: 4,
    name: "Hydra Glow Serum",
    shade: "30ml",
    price: 52.00,
    originalPrice: null,
    category: "skin",
    rating: 4.7,
    reviews: 634,
    badge: null,
    image: "http://static.photos/cosmetic/320x240/100"
  },
  {
    id: 5,
    name: "Liquid Lip Gloss",
    shade: "Pink Champagne",
    price: 18.00,
    originalPrice: 22.00,
    category: "lips",
    rating: 4.8,
    reviews: 1589,
    badge: "Sale",
    image: "http://static.photos/cosmetic/320x240/110"
  },
  {
    id: 6,
    name: "Silk Primer",
    shade: "Universal",
    price: 34.00,
    originalPrice: null,
    category: "face",
    rating: 4.6,
    reviews: 478,
    badge: null,
    image: "http://static.photos/cosmetic/320x240/120"
  },
  {
    id: 7,
    name: "Smudge-Proof Eyeliner",
    shade: "Midnight Black",
    price: 16.00,
    originalPrice: null,
    category: "eyes",
    rating: 4.9,
    reviews: 3201,
    badge: "Bestseller",
    image: "http://static.photos/cosmetic/320x240/130"
  },
  {
    id: 8,
    name: "Rose Petal Moisturizer",
    shade: "50ml",
    price: 42.00,
    originalPrice: 55.00,
    category: "skin",
    rating: 4.8,
    reviews: 967,
    badge: "Sale",
    image: "http://static.photos/cosmetic/320x240/140"
  }
];

// ---- Testimonials Data ----
const testimonials = [
  {
    name: "Aaliyah Johnson",
    role: "Beauty Influencer",
    text: "Reign & Teji's lipsticks are LIFE! The pigmentation is unreal and they last all day. I've never found a brand that matches my skin tone so perfectly.",
    avatar: "http://static.photos/people/200x200/1",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "Makeup Artist",
    text: "As a professional MUA, I'm picky about my products. The foundation range is incredible — finally, a brand that truly understands diverse skin tones!",
    avatar: "http://static.photos/people/200x200/2",
    rating: 5
  },
  {
    name: "Sophia Martinez",
    role: "Skincare Enthusiast",
    text: "The Hydra Glow Serum transformed my skin in just two weeks. Clean ingredients, beautiful packaging, and amazing results. What more could you ask for?",
    avatar: "http://static.photos/people/200x200/3",
    rating: 5
  }
];

// ---- Render Products ----
function renderProducts(filter = 'all') {
  const grid = document.getElementById('products-grid');
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  
  grid.innerHTML = filtered.map((product, index) => `
    <div class="product-card bg-white rounded-2xl overflow-hidden shadow-md animate-fade-in-up" style="animation-delay: ${index * 0.08}s" data-category="${product.category}">
      <div class="relative overflow-hidden aspect-[4/5]">
        <img src="${product.image}" alt="${product.name}" class="product-img w-full h-full object-cover" />
        ${product.badge ? `
          <span class="absolute top-3 left-3 bg-rose-gold text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase">
            ${product.badge}
          </span>
        ` : ''}
        <button class="heart-btn absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-all" onclick="toggleWishlist(this)">
          <i data-lucide="heart" class="w-4 h-4 text-gray-400"></i>
        </button>
        <div class="quick-add absolute bottom-3 left-3 right-3">
          <button class="w-full bg-rose-deep/90 backdrop-blur-sm text-white py-2.5 rounded-xl text-xs font-semibold hover:bg-rose-deep transition-all flex items-center justify-center gap-2" onclick="addToCart('${product.name}')">
            <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
            Add to Bag
          </button>
        </div>
      </div>
      <div class="p-4">
        <div class="flex items-center gap-1 mb-1.5">
          ${generateStars(product.rating)}
          <span class="text-[10px] text-gray-400 ml-1">(${product.reviews})</span>
        </div>
        <h4 class="font-medium text-sm text-gray-800 mb-0.5 line-clamp-1">${product.name}</h4>
        <p class="text-xs text-gray-400 mb-2">${product.shade}</p>
        <div class="flex items-center gap-2">
          <span class="font-semibold text-rose-gold">$${product.price.toFixed(2)}</span>
          ${product.originalPrice ? `<span class="text-xs text-gray-400 line-through">$${product.originalPrice.toFixed(2)}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');
  
  lucide.createIcons();
}

function generateStars(rating) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let stars = '';
  for (let i = 0; i < full; i++) {
    stars += '<i data-lucide="star" class="w-3 h-3 fill-amber-400 text-amber-400"></i>';
  }
  if (hasHalf) {
    stars += '<i data-lucide="star-half" class="w-3 h-3 fill-amber-400 text-amber-400"></i>';
  }
  return stars;
}

// ---- Render Testimonials ----
function renderTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  grid.innerHTML = testimonials.map((t, i) => `
    <div class="testimonial-card rounded-2xl p-6 md:p-8" style="animation: fade-in-up 0.6s ease-out ${i * 0.15}s both">
      <div class="flex items-center gap-1 mb-4">
        ${Array(t.rating).fill('<i data-lucide="star" class="w-4 h-4 fill-amber-400 text-amber-400"></i>').join('')}
      </div>
      <p class="text-white/90 text-sm font-light leading-relaxed mb-6">"${t.text}"</p>
      <div class="flex items-center gap-3">
        <img src="${t.avatar}" alt="${t.name}" class="w-10 h-10 rounded-full object-cover border-2 border-white/30" />
        <div>
          <p class="text-white font-semibold text-sm">${t.name}</p>
          <p class="text-white/50 text-xs">${t.role}</p>
        </div>
      </div>
    </div>
  `).join('');
  
  lucide.createIcons();
}

// ---- Filter Buttons ----
document.getElementById('filter-buttons').addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-btn')) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    renderProducts(e.target.dataset.filter);
  }
});

// ---- Toggle Functions ----
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
}

function toggleSearch() {
  const searchBar = document.getElementById('search-bar');
  searchBar.classList.toggle('hidden');
  if (!searchBar.classList.contains('hidden')) {
    searchBar.querySelector('input').focus();
  }
}

function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  const isOpen = !sidebar.classList.contains('translate-x-full');
  
  if (isOpen) {
    sidebar.classList.add('translate-x-full');
    overlay.classList.add('opacity-0');
    setTimeout(() => overlay.classList.add('hidden'), 300);
    document.body.style.overflow = '';
  } else {
    overlay.classList.remove('hidden');
    setTimeout(() => overlay.classList.remove('opacity-0'), 10);
    sidebar.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
  }
  lucide.createIcons();
}

// ---- Wishlist Toggle ----
function toggleWishlist(btn) {
  btn.classList.toggle('active');
  const icon = btn.querySelector('svg');
  if (btn.classList.contains('active')) {
    icon.style.fill = '#B76E79';
    icon.style.color = '#B76E79';
  } else {
    icon.style.fill = 'none';
    icon.style.color = '#9CA3AF';
  }
}

// ---- Add to Cart ----
function addToCart(productName) {
  const countEl = document.getElementById('cart-count');
  let count = parseInt(countEl.textContent);
  countEl.textContent = count + 1;
  
  // Visual feedback
  countEl.classList.add('scale-125');
  setTimeout(() => countEl.classList.remove('scale-125'), 200);
  
  // Show a toast
  showToast(`${productName} added to bag! 💕`);
}

// ---- Toast Notification ----
function showToast(message) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast-notification fixed bottom-20 left-1/2 -translate-x-1/2 bg-rose-deep text-white px-6 py-3 rounded-full shadow-xl z-50 text-sm font-medium animate-fade-in-up';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, 10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ---- Newsletter Form ----
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('newsletter-success').classList.remove('hidden');
  e.target.querySelector('input').value = '';
  showToast('Welcome to the Reign Family! 👑');
});

// ---- Back to Top ----
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.remove('opacity-0', 'translate-y-4');
    backToTop.classList.add('opacity-100', 'translate-y-0');
  } else {
    backToTop.classList.add('opacity-0', 'translate-y-4');
    backToTop.classList.remove('opacity-100', 'translate-y-0');
  }
});

// ---- Navbar Scroll Effect ----
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const currentScroll = window.scrollY;
  
  if (currentScroll > 100) {
    navbar.classList.add('shadow-md');
  } else {
    navbar.classList.remove('shadow-md');
  }
  
  lastScroll = currentScroll;
});

// ---- Smooth Scroll for Navigation ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// ---- Intersection Observer for Animations ----
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

// Observe sections
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'all 0.6s ease-out';
  observer.observe(section);
});

// Make hero visible immediately
document.getElementById('home').style.opacity = '1';
document.getElementById('home').style.transform = 'translateY(0)';

// ---- Initialize ----
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderTestimonials();
  lucide.createIcons();
});