/* script.js */

// Product Data (embedded directly)
const PRODUCTS = [
  // T-SHIRTS (Customizable with initials)
  {
    id: 1001,
    title: "Classic Crew Neck T-Shirt",
    price: 1299,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    description: "Premium 100% organic cotton crew neck tee. Perfect canvas for your custom initials. Soft, breathable, and built to last.",
    category: "tshirts",
    tags: ["t-shirt", "classic", "organic", "cotton", "customizable", "crew-neck"]
  },
  {
    id: 1002,
    title: "Oversized Streetwear Tee",
    price: 1499,
    image: "https://images.unsplash.com/photo-1583743814966-8936f37f5a40?w=400&h=500&fit=crop",
    description: "Relaxed fit oversized tee with premium heavyweight cotton. Add your personal touch with custom initials in your choice of placement.",
    category: "tshirts",
    tags: ["t-shirt", "oversized", "streetwear", "heavyweight", "customizable", "relaxed"]
  },
  {
    id: 1003,
    title: "Vintage Wash T-Shirt",
    price: 1399,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=500&fit=crop",
    description: "Soft vintage-washed cotton tee with authentic worn-in feel. Customize with initials to make it uniquely yours.",
    category: "tshirts",
    tags: ["t-shirt", "vintage", "washed", "soft", "customizable", "authentic"]
  },
  // HOODIES
  {
    id: 2001,
    title: "Premium Streetwear Hoodie",
    price: 2999,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
    description: "Ultra-comfortable premium hoodie crafted from organic cotton blend. Perfect for street style with kangaroo pocket and adjustable drawstrings.",
    category: "hoodies",
    tags: ["hoodie", "streetwear", "premium", "organic", "cotton", "kangaroo-pocket"]
  },
  {
    id: 2002,
    title: "Sherpa Lined Hoodie",
    price: 3499,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop&hue=30",
    description: "Cozy hoodie with plush sherpa lining. Features heavy-duty zipper and brushed fleece exterior for maximum warmth and comfort.",
    category: "hoodies",
    tags: ["hoodie", "sherpa", "lined", "cozy", "fleece", "zipper", "warm"]
  },
  // JACKETS
  {
    id: 3001,
    title: "Vintage Denim Jacket",
    price: 3999,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=500&fit=crop",
    description: "Timeless denim jacket with vintage wash finish. Features classic western styling with modern fit and premium Japanese denim construction.",
    category: "jackets",
    tags: ["jacket", "denim", "vintage", "japanese", "western", "premium", "timeless"]
  },
  // BOTTOMS
  {
    id: 4001,
    title: "Cargo Utility Pants",
    price: 2499,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
    description: "Multi-pocket cargo pants designed for urban exploration. Crafted from durable ripstop fabric with adjustable cuffs and utility details.",
    category: "bottoms",
    tags: ["pants", "cargo", "utility", "ripstop", "urban", "multi-pocket", "adjustable"]
  }
];

// Global State
let cart = JSON.parse(localStorage.getItem('beeyuh_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('beeyuh_wishlist')) || [];
let currentProduct = null;
let customizationData = {
  color: 'black',
  size: 'M',
  initials: 'AL',
  font: 'Poppins',
  placement: 'right-chest'
};

// WhatsApp Number
const WHATSAPP_NUMBER = '+918879706046';

// T-shirt Colors Map
const TSHIRT_COLORS = {
  'black': '#000000',
  'white': '#ffffff',
  'navy': '#1e3a8a',
  'grey': '#6b7280',
  'red': '#dc2626',
  'green': '#16a34a'
};

// Placement Coordinates
const PLACEMENT_COORDS = {
  'right-chest': { x: 180, y: 125 },
  'left-chest': { x: 120, y: 125 },
  'collar-inner': { x: 150, y: 70 },
  'collar-outer': { x: 150, y: 50 },
  'right-sleeve': { x: 250, y: 145 },
  'left-sleeve': { x: 50, y: 145 }
};

// Font Names Map
const FONT_NAMES = {
  'Poppins': 'Modern',
  'Playfair Display': 'Elegant',
  'Dancing Script': 'Script',
  'Oswald': 'Bold'
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  initializeApp();
});

function initializeApp() {
  console.log('App initializing...');
  
  // Check if announcement was dismissed
  if (localStorage.getItem('beeyuh_announcement_dismissed')) {
    const announcementStrip = document.getElementById('announcement-strip');
    if (announcementStrip) {
      announcementStrip.style.display = 'none';
    }
  }
  
  // Render products
  renderProducts();
  
  // Update UI
  updateCartUI();
  updateWishlistUI();
  
  // Bind all events
  bindEvents();
  
  // Initialize customization preview
  updateCustomizationPreview();
  
  console.log('App initialized successfully!');
}

function bindEvents() {
  console.log('Binding events...');
  
  // Announcement dismiss
  const dismissBtn = document.getElementById('dismiss-announcement');
  if (dismissBtn) {
    dismissBtn.addEventListener('click', dismissAnnouncement);
  }
  
  // Mobile menu
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNavClose = document.getElementById('mobile-nav-close');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }
  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileMenu);
  }
  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', function(e) {
      if (e.target === mobileNavOverlay) {
        closeMobileMenu();
      }
    });
  }
  
  // Search
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }
  
  // Cart
  const cartToggle = document.getElementById('cart-toggle');
  const closeCart = document.getElementById('close-cart');
  const continueShopping = document.getElementById('continue-shopping');
  const checkoutBtn = document.getElementById('checkout-btn');
  
  if (cartToggle) {
    cartToggle.addEventListener('click', openCart);
  }
  if (closeCart) {
    closeCart.addEventListener('click', closeCartDrawer);
  }
  if (continueShopping) {
    continueShopping.addEventListener('click', closeCartDrawer);
  }
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', handleWhatsAppCheckout);
  }
  
  // Filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;
      filterProducts(filter);
      
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Category cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
      const category = this.dataset.category;
      filterProducts(category);
      document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Custom Initials Modal
  const initialsClose = document.getElementById('initials-close');
  const addToCartCustom = document.getElementById('add-to-cart-custom');
  const initialsModal = document.getElementById('initials-modal');
  
  if (initialsClose) {
    initialsClose.addEventListener('click', closeCustomization);
  }
  if (addToCartCustom) {
    addToCartCustom.addEventListener('click', addCustomizedToCart);
  }
  if (initialsModal) {
    initialsModal.addEventListener('click', function(e) {
      if (e.target.classList.contains('modal-overlay')) {
        closeCustomization();
      }
    });
  }
  
  // Customization options
  bindCustomizationEvents();
  
  // Quick view modal
  const quickviewClose = document.getElementById('quickview-close');
  const quickviewAddCart = document.getElementById('quickview-add-cart');
  const customizeBtn = document.getElementById('customize-btn');
  const quickviewModal = document.getElementById('quickview-modal');
  
  if (quickviewClose) {
    quickviewClose.addEventListener('click', closeQuickview);
  }
  if (quickviewAddCart) {
    quickviewAddCart.addEventListener('click', addToCartFromQuickview);
  }
  if (customizeBtn) {
    customizeBtn.addEventListener('click', openCustomization);
  }
  if (quickviewModal) {
    quickviewModal.addEventListener('click', function(e) {
      if (e.target.classList.contains('modal-overlay')) {
        closeQuickview();
      }
    });
  }
  
  // Keyboard events
  document.addEventListener('keydown', handleKeyboardEvents);
  
  // Scroll events
  window.addEventListener('scroll', handleScroll);
  
  console.log('Events bound successfully!');
}

// Customization Events
function bindCustomizationEvents() {
  // Color options
  const colorOptions = document.querySelectorAll('.color-option');
  colorOptions.forEach(option => {
    option.addEventListener('click', function() {
      colorOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      customizationData.color = this.dataset.color;
      updateCustomizationPreview();
    });
  });
  
  // Size options
  const sizeOptions = document.querySelectorAll('.size-option');
  sizeOptions.forEach(option => {
    option.addEventListener('click', function() {
      sizeOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      customizationData.size = this.dataset.size;
      updateCustomizationPreview();
    });
  });
  
  // Initials input
  const initialsInput = document.getElementById('initials-input');
  if (initialsInput) {
    initialsInput.addEventListener('input', function() {
      customizationData.initials = this.value.toUpperCase();
      updateCustomizationPreview();
    });
  }
  
  // Font options
  const fontOptions = document.querySelectorAll('.font-option');
  fontOptions.forEach(option => {
    option.addEventListener('click', function() {
      fontOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      customizationData.font = this.dataset.font;
      updateCustomizationPreview();
    });
  });
  
  // Placement options
  const placementOptions = document.querySelectorAll('.placement-option');
  placementOptions.forEach(option => {
    option.addEventListener('click', function() {
      placementOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      customizationData.placement = this.dataset.placement;
      updateCustomizationPreview();
    });
  });
}

// Update Customization Preview
function updateCustomizationPreview() {
  // Update t-shirt color
  const tshirtPath = document.querySelector('.tshirt-svg path');
  if (tshirtPath) {
    tshirtPath.style.fill = TSHIRT_COLORS[customizationData.color];
  }
  
  // Update placement markers
  const markers = document.querySelectorAll('.placement-marker');
  markers.forEach(marker => {
    marker.classList.remove('active');
    if (marker.dataset.placement === customizationData.placement) {
      marker.classList.add('active');
    }
  });
  
  // Update initial text
  const initialText = document.getElementById('initial-text');
  if (initialText) {
    const coords = PLACEMENT_COORDS[customizationData.placement];
    initialText.setAttribute('x', coords.x);
    initialText.setAttribute('y', coords.y);
    initialText.setAttribute('font-family', `${customizationData.font}, sans-serif`);
    initialText.textContent = customizationData.initials;
    initialText.classList.add('show');
    
    // Set text color based on t-shirt color
    const textColor = customizationData.color === 'white' ? '#000000' : '#ffffff';
    initialText.setAttribute('fill', textColor);
  }
  
  // Update preview details
  const previewColor = document.getElementById('preview-color');
  const previewSize = document.getElementById('preview-size');
  const previewInitials = document.getElementById('preview-initials');
  const previewFont = document.getElementById('preview-font');
  const previewPlacement = document.getElementById('preview-placement');
  
  if (previewColor) previewColor.textContent = customizationData.color.charAt(0).toUpperCase() + customizationData.color.slice(1);
  if (previewSize) previewSize.textContent = customizationData.size;
  if (previewInitials) previewInitials.textContent = customizationData.initials;
  if (previewFont) previewFont.textContent = FONT_NAMES[customizationData.font];
  if (previewPlacement) previewPlacement.textContent = customizationData.placement.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Product Functions
function renderProducts(productsToRender = PRODUCTS) {
  console.log('Rendering products...', productsToRender.length);
  const productGrid = document.getElementById('product-grid');
  if (!productGrid) {
    console.error('Product grid not found!');
    return;
  }
  
  productGrid.innerHTML = productsToRender.map(product => `
    <div class="product-card" data-id="${product.id}" data-category="${product.category}">
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <div class="product-price">Rs. ${product.price.toLocaleString()}</div>
        <div class="product-actions">
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
          ${product.category === 'tshirts' ? `<button class="customize-product" data-id="${product.id}">Customize</button>` : ''}
        </div>
      </div>
    </div>
  `).join('');
  
  // Bind product events
  bindProductEvents();
  console.log('Products rendered successfully!');
}

function bindProductEvents() {
  // Product card clicks (for quick view)
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.classList.contains('add-to-cart') || 
          e.target.classList.contains('customize-product')) return;
      
      const productId = parseInt(this.dataset.id);
      const product = PRODUCTS.find(p => p.id === productId);
      if (product) {
        openQuickview(product);
      }
    });
  });
  
  // Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const productId = parseInt(this.dataset.id);
      addToCart(productId);
    });
  });
  
  // Customize buttons
  document.querySelectorAll('.customize-product').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const productId = parseInt(this.dataset.id);
      const product = PRODUCTS.find(p => p.id === productId);
      if (product) {
        currentProduct = product;
        openCustomization();
      }
    });
  });
}

function filterProducts(filter) {
  let filteredProducts;
  
  if (filter === 'all') {
    filteredProducts = PRODUCTS;
  } else {
    filteredProducts = PRODUCTS.filter(product => 
      product.category === filter
    );
  }
  
  renderProducts(filteredProducts);
}

// Search Functions
function handleSearch(e) {
  const query = e.target.value.toLowerCase().trim();
  
  if (query.length === 0) {
    hideSearchDropdown();
    return;
  }
  
  const filteredProducts = PRODUCTS.filter(product => 
    product.title.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    product.tags.some(tag => tag.toLowerCase().includes(query))
  );
  
  displaySearchResults(filteredProducts);
}

function displaySearchResults(products) {
  const searchDropdown = document.getElementById('search-dropdown');
  if (!searchDropdown) return;
  
  if (products.length === 0) {
    searchDropdown.innerHTML = `
      <div class="search-result">
        <span class="search-result-title">No products found</span>
      </div>
    `;
  } else {
    searchDropdown.innerHTML = products.slice(0, 5).map(product => `
      <div class="search-result" data-id="${product.id}">
        <img src="${product.image}" alt="${product.title}" class="search-result-image">
        <span class="search-result-title">${product.title}</span>
        <span class="search-result-price">Rs. ${product.price.toLocaleString()}</span>
      </div>
    `).join('');
    
    // Bind click events to search results
    searchDropdown.querySelectorAll('.search-result').forEach(result => {
      result.addEventListener('click', function() {
        const productId = parseInt(this.dataset.id);
        if (productId) {
          const product = PRODUCTS.find(p => p.id === productId);
          if (product) {
            openQuickview(product);
            hideSearchDropdown();
            document.getElementById('search-input').blur();
          }
        }
      });
    });
  }
  
  showSearchDropdown();
}

function showSearchDropdown() {
  const searchDropdown = document.getElementById('search-dropdown');
  if (searchDropdown) {
    searchDropdown.style.display = 'block';
  }
}

function hideSearchDropdown() {
  const searchDropdown = document.getElementById('search-dropdown');
  if (searchDropdown) {
    searchDropdown.style.display = 'none';
  }
}

// Quick View Functions
function openQuickview(product) {
  currentProduct = product;
  
  const quickviewImg = document.getElementById('quickview-img');
  const quickviewTitle = document.getElementById('quickview-title');
  const quickviewPrice = document.getElementById('quickview-price');
  const quickviewDescription = document.getElementById('quickview-description');
  const customizeBtn = document.getElementById('customize-btn');
  
  if (quickviewImg) {
    quickviewImg.src = product.image;
    quickviewImg.alt = product.title;
  }
  if (quickviewTitle) quickviewTitle.textContent = product.title;
  if (quickviewPrice) quickviewPrice.textContent = `Rs. ${product.price.toLocaleString()}`;
  if (quickviewDescription) quickviewDescription.textContent = product.description;
  
  // Show/hide customize button based on product category
  if (customizeBtn) {
    customizeBtn.style.display = product.category === 'tshirts' ? 'block' : 'none';
  }
  
  const quickviewModal = document.getElementById('quickview-modal');
  if (quickviewModal) {
    quickviewModal.classList.add('active');
  }
}

function closeQuickview() {
  const quickviewModal = document.getElementById('quickview-modal');
  if (quickviewModal) {
    quickviewModal.classList.remove('active');
  }
  currentProduct = null;
}

function addToCartFromQuickview() {
  if (!currentProduct) return;
  
  const quickviewSize = document.getElementById('quickview-size');
  const size = quickviewSize ? quickviewSize.value : 'M';
  addToCart(currentProduct.id, size);
  closeQuickview();
}

// Customization Functions
function openCustomization() {
  if (!currentProduct || currentProduct.category !== 'tshirts') return;
  
  // Reset customization data
  customizationData = {
    color: 'black',
    size: 'M',
    initials: 'AL',
    font: 'Poppins',
    placement: 'right-chest'
  };
  
  // Reset form
  resetCustomizationForm();
  
  // Update preview
  updateCustomizationPreview();
  
  const initialsModal = document.getElementById('initials-modal');
  if (initialsModal) {
    initialsModal.classList.add('active');
  }
  
  const initialsInput = document.getElementById('initials-input');
  if (initialsInput) {
    initialsInput.focus();
  }
}

function closeCustomization() {
  const initialsModal = document.getElementById('initials-modal');
  if (initialsModal) {
    initialsModal.classList.remove('active');
  }
}

function resetCustomizationForm() {
  // Reset color options
  const colorOptions = document.querySelectorAll('.color-option');
  colorOptions.forEach(opt => {
    opt.classList.remove('active');
    if (opt.dataset.color === 'black') {
      opt.classList.add('active');
    }
  });
  
  // Reset size options
  const sizeOptions = document.querySelectorAll('.size-option');
  sizeOptions.forEach(opt => {
    opt.classList.remove('active');
    if (opt.dataset.size === 'M') {
      opt.classList.add('active');
    }
  });
  
  // Reset initials input
  const initialsInput = document.getElementById('initials-input');
  if (initialsInput) {
    initialsInput.value = 'AL';
  }
  
  // Reset font options
  const fontOptions = document.querySelectorAll('.font-option');
  fontOptions.forEach(opt => {
    opt.classList.remove('active');
    if (opt.dataset.font === 'Poppins') {
      opt.classList.add('active');
    }
  });
  
  // Reset placement options
  const placementOptions = document.querySelectorAll('.placement-option');
  placementOptions.forEach(opt => {
    opt.classList.remove('active');
    if (opt.dataset.placement === 'right-chest') {
      opt.classList.add('active');
    }
  });
}

function addCustomizedToCart() {
  if (!currentProduct) return;
  
  const customItem = {
    ...currentProduct,
    isCustom: true,
    customization: { ...customizationData },
    title: `${currentProduct.title} (Custom: ${customizationData.initials})`
  };
  
  addToCart(customItem.id, customizationData.size, customItem);
  closeCustomization();
}

// Cart Functions
function addToCart(productId, size = 'M', customProduct = null) {
  console.log('Adding to cart:', productId, size, customProduct);
  
  const product = customProduct || PRODUCTS.find(p => p.id === productId);
  if (!product) {
    console.error('Product not found:', productId);
    return;
  }
  
  const cartItemKey = customProduct ? 
    `${productId}-${size}-${customizationData.initials}-${customizationData.color}` : 
    `${productId}-${size}`;
  
  const existingItem = cart.find(item => item.key === cartItemKey);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const cartItem = {
      key: cartItemKey,
      id: productId,
      title: customProduct ? customProduct.title : product.title,
      price: product.price,
      image: product.image,
      size: size,
      quantity: 1
    };
    
    if (customProduct) {
      cartItem.isCustom = true;
      cartItem.customization = { ...customizationData };
    }
    
    cart.push(cartItem);
  }
  
  saveCartToStorage();
  updateCartUI();
  showAddToCartFeedback(product.title);
  
  console.log('Cart updated:', cart);
  
  // Auto-open cart
  setTimeout(() => {
    openCart();
  }, 500);
}

function saveCartToStorage() {
  localStorage.setItem('beeyuh_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Update cart badge
  const cartBadge = document.getElementById('cart-badge');
  if (cartBadge) {
    cartBadge.textContent = totalItems;
    cartBadge.classList.toggle('show', totalItems > 0);
  }
  
  // Update cart total
  const cartTotal = document.getElementById('cart-total');
  if (cartTotal) {
    cartTotal.textContent = `Rs. ${totalPrice.toLocaleString()}`;
  }
  
  // Update cart items display
  const cartItems = document.getElementById('cart-items');
  const emptyCart = document.getElementById('empty-cart');
  
  if (cartItems && emptyCart) {
    if (cart.length === 0) {
      cartItems.style.display = 'none';
      emptyCart.style.display = 'block';
    } else {
      cartItems.style.display = 'block';
      emptyCart.style.display = 'none';
      
      cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}" class="cart-item-image">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.title}</h4>
            <div class="cart-item-price">Rs. ${item.price.toLocaleString()}</div>
            <div class="cart-item-meta">
              Size: ${item.size}
              ${item.isCustom ? `<br>Color: ${item.customization.color}<br>Initials: "${item.customization.initials}"<br>Font: ${FONT_NAMES[item.customization.font]}<br>Placement: ${item.customization.placement.replace('-', ' ')}` : ''}
            </div>
            <div class="quantity-controls">
              <button class="quantity-btn decrease" data-key="${item.key}">−</button>
              <span class="quantity">${item.quantity}</span>
              <button class="quantity-btn increase" data-key="${item.key}">+</button>
            </div>
          </div>
          <button class="remove-item" data-key="${item.key}" aria-label="Remove ${item.title}">×</button>
        </div>
      `).join('');
      
      // Bind cart item events
      bindCartItemEvents();
    }
  }
}

function bindCartItemEvents() {
  // Quantity controls
  document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
    btn.addEventListener('click', function() {
      const key = this.dataset.key;
      const item = cart.find(item => item.key === key);
      if (item) {
        updateQuantity(key, item.quantity - 1);
      }
    });
  });
  
  document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
    btn.addEventListener('click', function() {
      const key = this.dataset.key;
      const item = cart.find(item => item.key === key);
      if (item) {
        updateQuantity(key, item.quantity + 1);
      }
    });
  });
  
  // Remove items
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', function() {
      const key = this.dataset.key;
      removeFromCart(key);
    });
  });
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

function removeFromCart(cartItemKey) {
  cart = cart.filter(item => item.key !== cartItemKey);
  saveCartToStorage();
  updateCartUI();
}

function openCart() {
  const cartDrawer = document.getElementById('cart-drawer');
  if (cartDrawer) {
    cartDrawer.classList.add('active');
  }
}

function closeCartDrawer() {
  const cartDrawer = document.getElementById('cart-drawer');
  if (cartDrawer) {
    cartDrawer.classList.remove('active');
  }
}

// WhatsApp Checkout
function handleWhatsAppCheckout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  let message = `🛍️ *BEEYUH Order Details*\n\n`;
  message += `📦 *Items (${totalItems}):*\n`;
  
  cart.forEach((item, index) => {
    message += `\n${index + 1}. *${item.title}*\n`;
    message += `   💰 Price: Rs. ${item.price.toLocaleString()}\n`;
    message += `   📏 Size: ${item.size}\n`;
    message += `   📊 Qty: ${item.quantity}\n`;
    
    if (item.isCustom) {
      message += `   🎨 *Custom Details:*\n`;
      message += `   • Color: ${item.customization.color}\n`;
      message += `   • Initials: "${item.customization.initials}"\n`;
      message += `   • Font: ${FONT_NAMES[item.customization.font]}\n`;
      message += `   • Placement: ${item.customization.placement.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}\n`;
    }
    
    message += `   💵 Subtotal: Rs. ${(item.price * item.quantity).toLocaleString()}\n`;
  });
  
  message += `\n💳 *Total Amount: Rs. ${totalPrice.toLocaleString()}*\n\n`;
  message += `📝 Please confirm this order and provide:\n`;
  message += `• Delivery Address\n`;
  message += `• Phone Number\n`;
  message += `• Any special instructions\n\n`;
  message += `✨ Thank you for choosing BEEYUH!`;
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
}

// Utility Functions
function dismissAnnouncement() {
  const announcementStrip = document.getElementById('announcement-strip');
  if (announcementStrip) {
    announcementStrip.style.display = 'none';
    localStorage.setItem('beeyuh_announcement_dismissed', 'true');
  }
}

function toggleMobileMenu() {
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  if (mobileNavOverlay) {
    mobileNavOverlay.classList.toggle('active');
  }
}

function closeMobileMenu() {
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  if (mobileNavOverlay) {
    mobileNavOverlay.classList.remove('active');
  }
}

function updateWishlistUI() {
  const wishlistBadge = document.getElementById('wishlist-badge');
  if (wishlistBadge) {
    wishlistBadge.textContent = wishlist.length;
    wishlistBadge.classList.toggle('show', wishlist.length > 0);
  }
}

function showAddToCartFeedback(productName) {
  const feedback = document.createElement('div');
  feedback.innerHTML = `✅ <strong>${productName}</strong> added to cart!`;
  feedback.style.cssText = `
    position: fixed;
    top: 120px;
    right: 20px;
    background: var(--accent);
    color: white;
    padding: 16px 24px;
    border-radius: var(--border-radius);
    font-weight: 500;
    z-index: 1000;
    animation: slideUp 0.3s ease;
    box-shadow: 0 8px 32px rgba(240,126,31,0.3);
    max-width: 300px;
  `;
  
  document.body.appendChild(feedback);
  
  setTimeout(() => {
    feedback.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.parentNode.removeChild(feedback);
      }
    }, 300);
  }, 3000);
}

function handleKeyboardEvents(e) {
  if (e.key === 'Escape') {
    const quickviewModal = document.getElementById('quickview-modal');
    const initialsModal = document.getElementById('initials-modal');
    const cartDrawer = document.getElementById('cart-drawer');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const searchDropdown = document.getElementById('search-dropdown');
    
    if (quickviewModal && quickviewModal.classList.contains('active')) {
      closeQuickview();
    } else if (initialsModal && initialsModal.classList.contains('active')) {
      closeCustomization();
    } else if (cartDrawer && cartDrawer.classList.contains('active')) {
      closeCartDrawer();
    } else if (mobileNavOverlay && mobileNavOverlay.classList.contains('active')) {
      closeMobileMenu();
    } else if (searchDropdown && searchDropdown.style.display === 'block') {
      hideSearchDropdown();
    }
  }
}

function handleScroll() {
  const header = document.getElementById('header');
  if (header) {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
}

// Console branding
console.log(`
%c BEEYUH - Own Your Mark %c
%c Complete e-commerce with custom initials 
`, 
'background: #f07e1f; color: white; font-weight: bold; padding: 8px 16px; border-radius: 4px;',
'',
'color: #6f6f6f; font-size: 12px;'
);

console.log('✅ BEEYUH Store loaded successfully!');
console.log('📦 Products loaded:', PRODUCTS.length);
console.log('🎨 Customizable T-shirts:', PRODUCTS.filter(p => p.category === 'tshirts').length);
