/* script.js - BEEYUH Men's T-Shirt Store - UPDATED WITH SEARCH RESULTS BUTTON FIX */

// Global Variables
let cart = JSON.parse(localStorage.getItem('beeyuh_cart')) || [];
let currentProduct = null;
let customization = {
    color: 'black',
    size: 'M',
    initials: '',
    font: 'Arial',
    placement: 'left-chest'
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 BEEYUH Store Loading...');
    initializeApp();
});

function initializeApp() {
    // Load alerts
    loadAlerts();
    
    // Load products
    loadProducts();
    
    // Update cart UI
    updateCartUI();
    
    // Bind events
    bindEvents();
    
    console.log('✅ BEEYUH Store Loaded Successfully!');
}

// Event Bindings
function bindEvents() {
    // Top bar close
    const topBarClose = document.getElementById('top-bar-close');
    if (topBarClose) {
        topBarClose.addEventListener('click', hideTopBar);
    }

    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) closeMobileMenu();
        });
    }

    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('focus', function() {
            if (searchInput.value.trim().length >= 2) {
                showSearchResults();
            }
        });
        searchInput.addEventListener('blur', function() {
            // Delay hiding to allow button clicks
            setTimeout(hideSearchResults, 300);
        });
    }

    // Notifications
    const notificationsBtn = document.getElementById('notifications-btn');
    const notificationsClose = document.getElementById('notifications-close');
    const notificationsPanel = document.getElementById('notifications-panel');
    
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', toggleNotifications);
    }
    if (notificationsClose) {
        notificationsClose.addEventListener('click', closeNotifications);
    }
    if (notificationsPanel) {
        notificationsPanel.addEventListener('click', function(e) {
            if (e.target === notificationsPanel) closeNotifications();
        });
    }

    // Cart
    const cartBtn = document.getElementById('cart-btn');
    const cartClose = document.getElementById('cart-close');
    const cartSidebar = document.getElementById('cart-sidebar');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (cartBtn) {
        cartBtn.addEventListener('click', openCart);
    }
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }
    if (cartSidebar) {
        cartSidebar.addEventListener('click', function(e) {
            if (e.target.classList.contains('cart-overlay')) closeCart();
        });
    }
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }

    // Product filters
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

    // Product modal
    const modalClose = document.getElementById('modal-close');
    const productModal = document.getElementById('product-modal');
    const modalAddToCart = document.getElementById('modal-add-to-cart');
    const modalCustomize = document.getElementById('modal-customize');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeProductModal);
    }
    if (productModal) {
        productModal.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal-overlay')) closeProductModal();
        });
    }
    if (modalAddToCart) {
        modalAddToCart.addEventListener('click', addToCartFromModal);
    }
    if (modalCustomize) {
        modalCustomize.addEventListener('click', openCustomModal);
    }

    // Custom modal
    const customModalClose = document.getElementById('custom-modal-close');
    const customModal = document.getElementById('custom-modal');
    const addCustomToCart = document.getElementById('add-custom-to-cart');
    
    if (customModalClose) {
        customModalClose.addEventListener('click', closeCustomModal);
    }
    if (customModal) {
        customModal.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal-overlay')) closeCustomModal();
        });
    }
    if (addCustomToCart) {
        addCustomToCart.addEventListener('click', addCustomToCart);
    }

    // Customization options
    bindCustomizationEvents();

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            scrollToSection(target);
            closeMobileMenu();
        });
    });

    // Alert popup close
    const alertPopupClose = document.getElementById('alert-popup-close');
    if (alertPopupClose) {
        alertPopupClose.addEventListener('click', closeAlertPopup);
    }

    // Keyboard events
    document.addEventListener('keydown', handleKeyboardEvents);
}

// Alert System
function loadAlerts() {
    if (typeof ALERTS !== 'undefined' && ALERTS) {
        // Load popup alert
        if (ALERTS.popup && ALERTS.popup.message && ALERTS.popup.message.trim()) {
            showAlertPopup(ALERTS.popup.title || 'Alert', ALERTS.popup.message);
        }

        // Load notifications
        if (ALERTS.notifications && ALERTS.notifications.length > 0) {
            loadNotifications(ALERTS.notifications);
        }
    }
}

function showAlertPopup(title, message) {
    const popup = document.getElementById('alert-popup');
    const popupTitle = document.getElementById('alert-popup-title');
    const popupMessage = document.getElementById('alert-popup-message');
    
    if (popup && popupTitle && popupMessage) {
        popupTitle.textContent = title;
        popupMessage.textContent = message;
        popup.classList.remove('hidden');
    }
}

function closeAlertPopup() {
    const popup = document.getElementById('alert-popup');
    if (popup) {
        popup.classList.add('hidden');
    }
}

function loadNotifications(notifications) {
    const notificationsList = document.getElementById('notifications-list');
    const badge = document.getElementById('notifications-badge');
    
    if (notificationsList) {
        if (notifications.length === 0) {
            notificationsList.innerHTML = '<div class="no-notifications">No new notifications</div>';
        } else {
            notificationsList.innerHTML = notifications.map((notif, index) => `
                <div class="notification-item" data-id="${index}">
                    <div class="notification-content">
                        <h4>${notif.title || 'Notification'}</h4>
                        <p>${notif.message}</p>
                        ${notif.time ? `<span class="notification-time">${notif.time}</span>` : ''}
                    </div>
                </div>
            `).join('');
        }
        
        // Update badge
        if (badge) {
            badge.textContent = notifications.length;
            badge.classList.toggle('hidden', notifications.length === 0);
        }
    }
}

// Product Functions
function loadProducts() {
    if (typeof PRODUCTS === 'undefined' || !PRODUCTS) {
        console.error('❌ Products not loaded!');
        return;
    }
    
    renderProducts(PRODUCTS);
}

function renderProducts(products) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    if (products.length === 0) {
        grid.innerHTML = '<div class="no-products">No products found</div>';
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}" onclick="openProductModal(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                ${product.isCustomizable ? '<div class="custom-badge">Custom Available</div>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-category">${product.category}</p>
                <div class="product-price">Rs. ${product.price.toLocaleString()}</div>
                <div class="product-actions">
                    <button class="btn btn-primary btn-small" onclick="event.stopPropagation(); quickAddToCart(${product.id})">
                        Add to Cart
                    </button>
                    ${product.isCustomizable ? 
                        `<button class="btn btn-secondary btn-small" onclick="event.stopPropagation(); openCustomModalWithProduct(${product.id})">
                            Customize
                        </button>` : ''
                    }
                </div>
            </div>
        </div>
    `).join('');
}

function filterProducts(filter) {
    if (typeof PRODUCTS === 'undefined') return;
    
    let filtered;
    if (filter === 'all') {
        filtered = PRODUCTS;
    } else {
        filtered = PRODUCTS.filter(product => 
            product.category.toLowerCase().includes(filter.toLowerCase()) ||
            product.type.toLowerCase() === filter.toLowerCase()
        );
    }
    
    renderProducts(filtered);
}

// ===== SEARCH FUNCTIONS - UPDATED WITH VISIBLE BUTTONS =====
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 2) {
        hideSearchResults();
        return;
    }
    
    if (typeof PRODUCTS === 'undefined') return;
    
    const results = PRODUCTS.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    ).slice(0, 5);
    
    displaySearchResults(results);
}

// *** UPDATED: Search Results with Visible Action Buttons ***
function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-item">No results found</div>';
    } else {
        searchResults.innerHTML = results.map(product => `
            <div class="search-item" onclick="openProductModal(${product.id}); hideSearchResults();">
                <img src="${product.image}" alt="${product.title}">
                <div class="search-item-info">
                    <h4>${product.title}</h4>
                    <p>Rs. ${product.price.toLocaleString()}</p>
                    <div class="search-item-category">${product.category}</div>
                </div>
                <div class="search-item-actions">
                    <button class="search-add-cart" onclick="event.stopPropagation(); quickAddToCart(${product.id}); hideSearchResults(); showNotification('Added to cart: ${product.title}', 'success');">
                        Add to Cart
                    </button>
                    ${product.isCustomizable ? 
                        `<button class="search-customize" onclick="event.stopPropagation(); openCustomModalWithProduct(${product.id}); hideSearchResults();">
                            Customize
                        </button>` : ''
                    }
                </div>
            </div>
        `).join('');
    }
    
    showSearchResults();
    console.log('🔍 Search results displayed with action buttons');
}

function showSearchResults() {
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        searchResults.classList.remove('hidden');
    }
}

function hideSearchResults() {
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        searchResults.classList.add('hidden');
    }
}

// Product Modal Functions
function openProductModal(productId) {
    if (typeof PRODUCTS === 'undefined') return;
    
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    
    // Update modal content
    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-product-title').textContent = product.title;
    document.getElementById('modal-product-price').textContent = `Rs. ${product.price.toLocaleString()}`;
    document.getElementById('modal-product-description').textContent = product.description;
    
    // Show/hide customize button
    const customizeBtn = document.getElementById('modal-customize');
    if (customizeBtn) {
        customizeBtn.style.display = product.isCustomizable ? 'inline-block' : 'none';
    }
    
    // Show modal
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
    currentProduct = null;
}

function addToCartFromModal() {
    if (!currentProduct) return;
    
    const size = document.getElementById('modal-size-select').value;
    const quantity = parseInt(document.getElementById('modal-quantity').value);
    
    addToCart(currentProduct, size, quantity);
    closeProductModal();
}

// Quick add to cart - Enhanced with notification
function quickAddToCart(productId) {
    if (typeof PRODUCTS === 'undefined') return;
    
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    addToCart(product, 'M', 1);
    console.log('🛒 Quick add to cart:', product.title);
}

// ===== UPDATED CUSTOMIZATION FUNCTIONS WITH DYNAMIC T-SHIRT PREVIEW =====

function openCustomModal() {
    closeProductModal();
    openCustomModalWithProduct(currentProduct ? currentProduct.id : null);
}

function openCustomModalWithProduct(productId) {
    if (typeof PRODUCTS === 'undefined') return;
    
    if (productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (product) {
            currentProduct = product;
        }
    }
    
    // Reset customization
    customization = {
        color: 'black',
        size: 'M',
        initials: '',
        font: 'Arial',
        placement: 'left-chest'
    };
    
    updateCustomizationUI();
    
    // *** KEY UPDATE: Update t-shirt preview image to show selected product ***
    updateTshirtPreviewImage();
    
    updatePreview();
    
    const modal = document.getElementById('custom-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

// *** NEW FUNCTION: Updates t-shirt preview to show selected product ***
function updateTshirtPreviewImage() {
    const tshirtTemplate = document.getElementById('tshirt-template');
    if (tshirtTemplate && currentProduct) {
        // Show the actual product image in customization preview
        tshirtTemplate.src = currentProduct.image;
        tshirtTemplate.alt = `${currentProduct.title} Preview`;
        console.log(`🎯 Updated preview image to: ${currentProduct.title}`);
    }
}

function closeCustomModal() {
    const modal = document.getElementById('custom-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function bindCustomizationEvents() {
    // Color options
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            customization.color = this.dataset.color;
            updatePreview();
        });
    });
    
    // Size options
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            customization.size = this.dataset.size;
            updatePreview();
        });
    });
    
    // Font options
    const fontOptions = document.querySelectorAll('.font-option');
    fontOptions.forEach(option => {
        option.addEventListener('click', function() {
            fontOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            customization.font = this.dataset.font;
            updatePreview();
        });
    });
    
    // Placement options
    const placementOptions = document.querySelectorAll('.placement-option');
    placementOptions.forEach(option => {
        option.addEventListener('click', function() {
            placementOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            customization.placement = this.dataset.placement;
            updatePreview();
        });
    });
    
    // Initials input
    const initialsInput = document.getElementById('initials-input');
    if (initialsInput) {
        initialsInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 3);
            customization.initials = this.value;
            updatePreview();
        });
    }
}

function updateCustomizationUI() {
    // Reset all options to default
    document.querySelectorAll('.color-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.color === customization.color);
    });
    
    document.querySelectorAll('.size-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.size === customization.size);
    });
    
    document.querySelectorAll('.font-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.font === customization.font);
    });
    
    document.querySelectorAll('.placement-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.placement === customization.placement);
    });
    
    const initialsInput = document.getElementById('initials-input');
    if (initialsInput) {
        initialsInput.value = customization.initials;
    }
}

// *** UPDATED PREVIEW FUNCTION WITH DYNAMIC T-SHIRT IMAGE ***
function updatePreview() {
    // *** FIRST: Ensure we're showing the correct product image ***
    updateTshirtPreviewImage();
    
    // Update preview text
    document.getElementById('preview-color').textContent = customization.color;
    document.getElementById('preview-size').textContent = customization.size;
    document.getElementById('preview-initials').textContent = customization.initials || 'AB';
    document.getElementById('preview-font').textContent = getFontDisplayName(customization.font);
    document.getElementById('preview-placement').textContent = customization.placement.replace('-', ' ');
    
    // Update initials preview on t-shirt
    const initialsPreview = document.getElementById('initials-preview');
    if (initialsPreview) {
        initialsPreview.textContent = customization.initials || 'AB';
        initialsPreview.style.fontFamily = customization.font;
        
        // Position based on placement with enhanced positioning
        const positions = {
            'left-chest': { top: '35%', left: '25%', fontSize: '16px' },
            'right-chest': { top: '35%', left: '75%', fontSize: '16px' },
            'center-chest': { top: '45%', left: '50%', fontSize: '20px' },
            'left-sleeve': { top: '25%', left: '10%', fontSize: '14px' },
            'right-sleeve': { top: '25%', left: '90%', fontSize: '14px' },
            'back': { top: '30%', left: '50%', fontSize: '24px' }
        };
        
        const pos = positions[customization.placement];
        if (pos) {
            initialsPreview.style.top = pos.top;
            initialsPreview.style.left = pos.left;
            initialsPreview.style.fontSize = pos.fontSize;
        }
        
        // Enhanced visibility
        initialsPreview.style.fontWeight = '900';
        initialsPreview.style.textShadow = '1px 1px 2px rgba(0,0,0,0.5)';
        initialsPreview.style.backgroundColor = 'rgba(255,255,255,0.9)';
        initialsPreview.style.padding = '2px 6px';
        initialsPreview.style.borderRadius = '2px';
        initialsPreview.style.border = '1px solid rgba(0,0,0,0.2)';
    }
    
    // Update price
    const basePrice = currentProduct ? currentProduct.price : 1299;
    const customPrice = basePrice + 200; // Rs. 200 extra for customization
    const priceElement = document.getElementById('custom-price');
    if (priceElement) {
        priceElement.textContent = customPrice;
    }
}

function getFontDisplayName(font) {
    const fontNames = {
        'Arial': 'Clean',
        'serif': 'Classic',
        'Impact': 'Bold',
        'cursive': 'Script'
    };
    return fontNames[font] || font;
}

function addCustomToCart() {
    if (!currentProduct) return;
    
    if (!customization.initials || customization.initials.trim() === '') {
        showNotification('Please enter initials for customization', 'error');
        return;
    }
    
    const customProduct = {
        ...currentProduct,
        title: `${currentProduct.title} (Custom: ${customization.initials})`,
        price: currentProduct.price + 200,
        customization: { ...customization },
        isCustom: true
    };
    
    addToCart(customProduct, customization.size, 1);
    closeCustomModal();
}

// Cart Functions
function addToCart(product, size = 'M', quantity = 1) {
    const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: size,
        quantity: quantity,
        isCustom: product.isCustom || false,
        customization: product.customization || null
    };
    
    // Check if item already exists
    const existingItem = cart.find(item => 
        item.id === product.id && 
        item.size === size && 
        JSON.stringify(item.customization) === JSON.stringify(cartItem.customization)
    );
    
    if (existingItem) {
        existingItem.quantity += quantity;
        showNotification(`Updated quantity: ${product.title}`, 'success');
    } else {
        cart.push(cartItem);
        showNotification(`Added to cart: ${product.title}`, 'success');
    }
    
    saveCart();
    updateCartUI();
    
    console.log('🛒 Cart updated:', cart.length, 'items');
}

function removeFromCart(index) {
    const item = cart[index];
    if (item) {
        cart.splice(index, 1);
        saveCart();
        updateCartUI();
        showNotification(`Removed: ${item.title}`, 'info');
    }
}

function updateCartQuantity(index, quantity) {
    if (quantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = quantity;
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('beeyuh_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total-amount');
    const cartBadge = document.getElementById('cart-badge');
    
    // Update badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.classList.toggle('hidden', totalItems === 0);
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) {
        cartTotal.textContent = total.toLocaleString();
    }
    
    // Update items
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        } else {
            cartItems.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <p class="cart-item-details">Size: ${item.size}</p>
                        ${item.isCustom ? `
                            <div class="custom-details">
                                <p>Color: ${item.customization.color}</p>
                                <p>Initials: "${item.customization.initials}"</p>
                                <p>Font: ${getFontDisplayName(item.customization.font)}</p>
                                <p>Placement: ${item.customization.placement.replace('-', ' ')}</p>
                            </div>
                        ` : ''}
                        <p class="cart-item-price">Rs. ${item.price.toLocaleString()}</p>
                    </div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button onclick="updateCartQuantity(${index}, ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateCartQuantity(${index}, ${item.quantity + 1})">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${index})">&times;</button>
                    </div>
                </div>
            `).join('');
        }
    }
}

function openCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar) {
        sidebar.classList.remove('hidden');
    }
}

function closeCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar) {
        sidebar.classList.add('hidden');
    }
}

function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Create WhatsApp message
    let message = `🛍️ *BEEYUH ORDER*\n\n`;
    
    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.title}*\n`;
        message += `   Size: ${item.size}\n`;
        message += `   Quantity: ${item.quantity}\n`;
        message += `   Price: Rs. ${item.price.toLocaleString()}\n`;
        
        if (item.isCustom) {
            message += `   🎨 Custom Details:\n`;
            message += `   - Color: ${item.customization.color}\n`;
            message += `   - Initials: "${item.customization.initials}"\n`;
            message += `   - Font: ${getFontDisplayName(item.customization.font)}\n`;
            message += `   - Placement: ${item.customization.placement.replace('-', ' ')}\n`;
        }
        
        message += `\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `💰 *Total: Rs. ${total.toLocaleString()}*\n\n`;
    message += `📝 Please confirm and provide delivery address.\n`;
    message += `🙏 Thank you for choosing BEEYUH!`;
    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/918879706046?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    showNotification('Redirecting to WhatsApp...', 'success');
}

// UI Helper Functions
function hideTopBar() {
    const topBar = document.getElementById('top-bar');
    if (topBar) {
        topBar.style.display = 'none';
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.add('hidden');
    }
}

function toggleNotifications() {
    const panel = document.getElementById('notifications-panel');
    if (panel) {
        panel.classList.toggle('hidden');
    }
}

function closeNotifications() {
    const panel = document.getElementById('notifications-panel');
    if (panel) {
        panel.classList.add('hidden');
    }
}

function scrollToSection(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToShop() {
    scrollToSection('#shop');
}

function openCustomizer() {
    openCustomModalWithProduct(null);
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Add icon based on type
    const icons = {
        'success': '✅',
        'error': '❌',
        'info': 'ℹ️',
        'warning': '⚠️'
    };
    
    notification.innerHTML = `${icons[type] || 'ℹ️'} ${message}`;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#2196f3'};
        color: white;
        border-radius: 0;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 350px;
        word-wrap: break-word;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Contact Form
function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    
    // Create WhatsApp message
    const whatsappMessage = `🔔 *Contact Form Submission*\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
    const whatsappUrl = `https://wa.me/918879706046?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    e.target.reset();
    showNotification('Message sent via WhatsApp!', 'success');
}

// Keyboard Events
function handleKeyboardEvents(e) {
    if (e.key === 'Escape') {
        // Close any open modals/panels
        closeProductModal();
        closeCustomModal();
        closeCart();
        closeNotifications();
        closeMobileMenu();
        hideSearchResults();
        closeAlertPopup();
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Console branding
console.log(`
%c BEEYUH - Men's Premium T-Shirts %c
%c ✅ Search Results Buttons Fixed! 
%c ✅ Dynamic T-Shirt Preview Enabled! 
%c 🎯 Store loaded successfully! 
`, 
'background: #000; color: #fff; font-weight: bold; padding: 8px 16px;',
'',
'color: #4caf50; font-weight: bold;',
'color: #4caf50; font-weight: bold;',
'color: #666; font-size: 12px;'
);

// Global functions for HTML onclick events
window.openProductModal = openProductModal;
window.quickAddToCart = quickAddToCart;
window.openCustomModalWithProduct = openCustomModalWithProduct;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.scrollToShop = scrollToShop;
window.openCustomizer = openCustomizer;
