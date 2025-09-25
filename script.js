/* script.js */

// Product Data
const PRODUCTS = [
  {
    id: 1001,
    title: "Premium Streetwear Hoodie",
    price: 2499,
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop"],
    description: "Ultra-comfortable premium hoodie crafted from organic cotton blend. Perfect for street style and casual wear.",
    tags: ["hoodie", "streetwear", "premium", "cotton"]
  },
  {
    id: 1002,
    title: "Classic Crew Neck T-Shirt",
    price: 999,
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"],
    description: "Essential crew neck tee made from 100% organic cotton. Available in multiple colors with the perfect fit.",
    tags: ["t-shirt", "basic", "cotton", "essential"]
  },
  {
    id: 1003,
    title: "Oversized Graphic Tee",
    price: 1299,
    images: ["https://images.unsplash.com/photo-1583743814966-8936f37f5a40?w=400&h=400&fit=crop"],
    description: "Bold graphic design on premium cotton fabric. Statement piece for your wardrobe with unique BEEYUH artwork.",
    tags: ["t-shirt", "graphic", "oversized", "statement"]
  },
  {
    id: 1004,
    title: "Denim Jacket Classic",
    price: 3499,
    images: ["https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop"],
    description: "Timeless denim jacket with modern fit. Made from sustainable denim with vintage-inspired details.",
    tags: ["jacket", "denim", "classic", "sustainable"]
  },
  {
    id: 1005,
    title: "Cargo Joggers",
    price: 1999,
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop"],
    description: "Comfortable cargo joggers with multiple pockets. Perfect blend of style and functionality for everyday wear.",
    tags: ["joggers", "cargo", "comfort", "functional"]
  },
  {
    id: 1006,
    title: "Zip-Up Sweatshirt",
    price: 2199,
    images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"],
    description: "Premium zip-up sweatshirt with fleece lining. Ideal for layering and perfect for casual outings.",
    tags: ["sweatshirt", "zip-up", "fleece", "layering"]
  },
  {
    id: 1007,
    title: "Slim Fit Chinos",
    price: 1799,
    images: ["https://images.unsplash.com/photo-1506629905607-53e103a5c6c2?w=400&h=400&fit=crop"],
    description: "Versatile slim-fit chinos in premium cotton twill. Smart-casual essential that pairs with everything.",
    tags: ["chinos", "slim-fit", "cotton", "versatile"]
  },
  {
    id: 1008,
    title: "Vintage Band Tee",
    price: 1499,
    images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop"],
    description: "Authentic vintage-style band tee with distressed finish. Soft cotton blend with retro graphics.",
    tags: ["t-shirt", "vintage", "band", "retro"]
  }
];

// Global State
let cart = JSON.parse(localStorage.getItem('beeyuh_cart')) || [];
let filteredProducts = [...PRODUCTS];
let currentProduct = null;

// DOM Elements
const elements = {
  // Announcement
  announcementStrip: document.getElementById('announcement-strip'),
  dismissAnnouncement: document.getElementById('dismiss-announcement'),
  
  // Mobile Menu
  mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
  mobileNavOverlay: document.getElementById('mobile-nav-overlay'),
  mobileNavClose: document.getElementById('mobile-nav-close'),
  
  // Search
  searchInput: document.getElementById('search-input'),
  
  // Cart
  cartToggle: document.getElementById('cart-toggle'),
  cartBadge: document.getElementById('cart-badge'),
  cartDrawer: document.getElementById('cart-drawer'),
  closeCart: document.getElementById('close-cart'),
  cartItems: document.getElementById('cart-items'),
  cartSubtotal: document.getElementById('cart-subtotal'),
  emptyCart: document.getElementById('empty-cart'),
  continueShoppingBtn: document.getElementById('continue-shopping'),
  checkoutBtn: document.getElementById('checkout-btn'),
  
  // Product Grid
  productGrid: document.getElementById('product-grid'),
  
  // Quick View Modal
  quickviewModal: document.getElementById('quickview-modal'),
  quickviewClose: document.getElementById('quickview-close'),
  quickviewImg: document.getElementById('quickview-img'),
  quickviewTitle: document.getElementById('quickview-title'),
  quickviewPrice: document.getElementById('quickview-price'),
  quickviewDescription: document.getElementById('quickview-description'),
  sizeSelect: document.getElementById('size-select'),
  quickviewAddToCart: document.getElementById('quickview-add-to-cart'),
  
  // Header
  header: document.querySelector('.header')
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Check if announcement was dismissed
  if (localStorage.getItem('beeyuh_announcement_dismissed')) {
    elements.announcementStrip.style.display = 'none';
  }
  
  // Render products
  renderProducts();
  
  // Update cart UI
  updateCartUI();
  
  // Bind events
  bindEvents();
  
  // Initialize scroll handler
  handleScroll();
}

function bindEvents() {
  // Announcement dismissal
  elements.dismissAnnouncement?.addEventListener('click', dismissAnnouncement);
  
  // Mobile menu
  elements.mobileMenuToggle?.addEventListener('click', toggleMobileMenu);
  elements.mobileNavClose?.addEventListener('click', closeMobileMenu);
  elements.mobileNavOverlay?.addEventListener('click', function(e) {
    if (e.target === elements.mobileNavOverlay) {
      closeMobileMenu();
    }
  });
  
  // Search
  elements.searchInput?.addEventListener('input', handleSearch);
  
  // Cart
  elements.cartToggle?.addEventListener('click', openCart);
  elements.closeCart?.addEventListener('click', closeCart);
  elements.continueShoppingBtn?.addEventListener('click', closeCart);
  elements.checkoutBtn?.addEventListener('click', handleCheckout);
  
  // Cart drawer overlay
  elements.cartDrawer?.addEventListener('click', function(e) {
    if (e.target.classList.contains('drawer-overlay')) {
      closeCart();
    }
  });
  
  // Quick view modal
  elements.quickviewClose?.addEventListener('click', closeQuickview);
  elements.quickviewAddToCart?.addEventListener('click', addToCartFromQuickview);
  
  // Modal overlay
  elements.quickviewModal?.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
      closeQuickview();
    }
  });
  
  // Keyboard events
  document.addEventListener('keydown', handleKeyboardEvents);
  
  // Scroll events
  window.addEventListener('scroll', handleScroll);
  
  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  newsletterForm?.addEventListener('submit', handleNewsletterSubmit);
}

// Announcement Functions
function dismissAnnouncement() {
  elements.announcementStrip.style.display = 'none';
  localStorage.setItem('beeyuh_announcement_dismissed', 'true');
}

// Mobile Menu Functions
function toggleMobileMenu() {
  elements.mobileNavOverlay.classList.toggle('active');
  elements.mobileNavOverlay.setAttribute('aria-hidden', 
    elements.mobileNavOverlay.classList.contains('active') ? 'false' : 'true'
  );
}

function closeMobileMenu() {
  elements.mobileNavOverlay.classList.remove('active');
  elements.mobileNavOverlay.setAttribute('aria-hidden', 'true');
}

// Search Functions
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase().trim();
  
  if (searchTerm === '') {
    filteredProducts = [...PRODUCTS];
  } else {
    filteredProducts = PRODUCTS.filter(product => 
      product.title.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  renderProducts();
}

// Product Rendering
function renderProducts() {
  if (!elements.productGrid) return;
  
  elements.productGrid.innerHTML = '';
  
  if (filteredProducts.length === 0) {
    elements.productGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--muted);">
        <h3>No products found</h3>
        <p>Try adjusting your search terms</p>
      </div>
    `;
    return;
  }
  
  filteredProducts.forEach(product => {
    const productCard = createProductCard(product);
    elements.productGrid.appendChild(productCard);
  });
}

function createProductCard(product) {
  const article = document.createElement('article');
  article.className = 'product-card';
  article.setAttribute('data-id', product.id);
  
  article.innerHTML = `
    <button class="quickview-btn" aria-label="Quick view ${product.title}">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M1 12C1 12 5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
      </svg>
    </button>
    <div class="img-wrap">
      <img src="${product.images[0]}" alt="${product.title}" loading="lazy">
    </div>
    <h3 class="product-title">${product.title}</h3>
    <div class="price-row">
      <span class="price">Rs. ${product.price.toLocaleString()}</span>
      <button class="add-btn" data-id="${product.id}">Add</button>
    </div>
  `;
  
  // Bind events
  const quickviewBtn = article.querySelector('.quickview-btn');
  const addBtn = article.querySelector('.add-btn');
  const imgWrap = article.querySelector('.img-wrap');
  
  quickviewBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openQuickview(product);
  });
  
  imgWrap.addEventListener('click', () => {
    openQuickview(product);
  });
  
  addBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    addToCart(product.id);
  });
  
  return article;
}

// Quick View Functions
function openQuickview(product) {
  currentProduct = product;
  
  elements.quickviewImg.src = product.images[0];
  elements.quickviewImg.alt = product.title;
  elements.quickviewTitle.textContent = product.title;
  elements.quickviewPrice.textContent = `Rs. ${product.price.toLocaleString()}`;
  elements.quickviewDescription.textContent = product.description;
  
  elements.quickviewModal.classList.add('active');
  elements.quickviewModal.setAttribute('aria-hidden', 'false');
  
  // Focus management
  elements.quickviewClose.focus();
}

function closeQuickview() {
  elements.quickviewModal.classList.remove('active');
  elements.quickviewModal.setAttribute('aria-hidden', 'true');
  currentProduct = null;
}

function addToCartFromQuickview() {
  if (!currentProduct) return;
  
  const size = elements.sizeSelect.value;
  addToCart(currentProduct.id, size);
  closeQuickview();
}

// Cart Functions
function addToCart(productId, size = 'M') {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  
  const cartItemKey = `${productId}-${size}`;
  const existingItem = cart.find(item => item.key === cartItemKey);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      key: cartItemKey,
      id: productId,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: size,
      quantity: 1
    });
  }
  
  saveCartToStorage();
  updateCartUI();
  openCart();
  
  // Show brief success feedback
  showAddToCartFeedback();
}

function removeFromCart(cartItemKey) {
  cart = cart.filter(item => item.key !== cartItemKey);
  saveCartToStorage();
  updateCartUI();
}

function updateQuantity(cartItemKey, newQuantity) {
  const item = cart.find(item => item.key === cartItemKey);
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(cartItemKey);
    } else {
      item.quantity = newQuantity;
      saveCartToStorage();
      updateCartUI();
    }
  }
}

function saveCartToStorage() {
  localStorage.setItem('beeyuh_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Update cart badge
  if (elements.cartBadge) {
    elements.cartBadge.textContent = totalItems;
    elements.cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
  }
  
  // Update cart items
  if (elements.cartItems) {
    if (cart.length === 0) {
      elements.cartItems.style.display = 'none';
      elements.emptyCart.style.display = 'block';
    } else {
      elements.cartItems.style.display = 'block';
      elements.emptyCart.style.display = 'none';
      
      elements.cartItems.innerHTML = cart.map(item => `
        <li class="cart-item">
          <img src="${item.image}" alt="${item.title}" class="cart-item-image">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.title}</h4>
            <div class="cart-item-price">Rs. ${item.price.toLocaleString()}</div>
            <div class="quantity-controls">
              <button class="quantity-btn decrease-btn" data-key="${item.key}">-</button>
              <span class="quantity-display">${item.quantity}</span>
              <button class="quantity-btn increase-btn" data-key="${item.key}">+</button>
            </div>
          </div>
          <button class="remove-item" data-key="${item.key}" aria-label="Remove ${item.title}">×</button>
        </li>
      `).join('');
      
      // Bind quantity controls
      bindCartItemEvents();
    }
  }
  
  // Update subtotal
  if (elements.cartSubtotal) {
    elements.cartSubtotal.textContent = `Rs. ${totalPrice.toLocaleString()}`;
  }
}

function bindCartItemEvents() {
  // Quantity controls
  document.querySelectorAll('.decrease-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = e.target.dataset.key;
      const item = cart.find(item => item.key === key);
      if (item) {
        updateQuantity(key, item.quantity - 1);
      }
    });
  });
  
  document.querySelectorAll('.increase-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = e.target.dataset.key;
      const item = cart.find(item => item.key === key);
      if (item) {
        updateQuantity(key, item.quantity + 1);
      }
    });
  });
  
  // Remove items
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = e.target.dataset.key;
      removeFromCart(key);
    });
  });
}

function openCart() {
  elements.cartDrawer.classList.add('active');
  elements.cartDrawer.setAttribute('aria-hidden', 'false');
  elements.closeCart.focus();
}

function closeCart() {
  elements.cartDrawer.classList.remove('active');
  elements.cartDrawer.setAttribute('aria-hidden', 'true');
}

function handleCheckout() {
  if (cart.length === 0) return;
  
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  alert(`Checkout functionality would be implemented here.\nTotal: Rs. ${totalPrice.toLocaleString()}`);
}

function showAddToCartFeedback() {
  // Create temporary feedback element
  const feedback = document.createElement('div');
  feedback.textContent = 'Added to cart!';
  feedback.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--accent);
    color: white;
    padding: 12px 20px;
    border-radius: var(--border-radius);
    font-weight: 500;
    z-index: 1000;
    animation: slideInUp 0.3s ease;
  `;
  
  document.body.appendChild(feedback);
  
  setTimeout(() => {
    feedback.remove();
  }, 2000);
}

// Keyboard Event Handlers
function handleKeyboardEvents(e) {
  // ESC key closes modals
  if (e.key === 'Escape') {
    if (elements.quickviewModal.classList.contains('active')) {
      closeQuickview();
    }
    if (elements.cartDrawer.classList.contains('active')) {
      closeCart();
    }
    if (elements.mobileNavOverlay.classList.contains('active')) {
      closeMobileMenu();
    }
  }
}

// Scroll Handler
function handleScroll() {
  if (window.scrollY > 100) {
    elements.header.classList.add('scrolled');
  } else {
    elements.header.classList.remove('scrolled');
  }
}

// Newsletter
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const emailInput = e.target.querySelector('.newsletter-input');
  const email = emailInput.value.trim();
  
  if (email) {
    // Simulate newsletter signup
    alert(`Thank you for subscribing with ${email}!`);
    emailInput.value = '';
  }
}

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerOffset = elements.header.offsetHeight + 20;
      const elementPosition = targetElement.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
});

// Performance optimization: Debounce search
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to search
if (elements.searchInput) {
  const debouncedSearch = debounce(handleSearch, 300);
  elements.searchInput.removeEventListener('input', handleSearch);
  elements.searchInput.addEventListener('input', debouncedSearch);
}

// Console branding
console.log(`
%c BEEYUH - Own Your Mark %c
%c Built with ❤️ by BEEYUH Team 
`, 
'background: #f07e1f; color: white; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
'',
'color: #6f6f6f; font-size: 12px;'
);
