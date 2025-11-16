// ==========================================
// BEEYUH - Main JavaScript v3.0 Order Management
// ==========================================

const API_URL = 'https://script.google.com/macros/s/AKfycbxOjPXr7ieT9HgyVmv3MdDBt_ouOkY3rQbtZafP2cSFH5qY-7nVngQEVhgp3OiGgafR/exec';
const MAX_CART_ITEMS = 100;
const SUPPORT_WHATSAPP = '+918082422478';

const loadingMessages = [
    'Finding your vibe',
    'Ironing out the T-Shirt',
    'Stitching the perfect look',
    'Warming up the wardrobe',
    'Tightening the last button',
    'Curating fresh styles',
    'Pairing outfits in the background',
    'Pressing play on fashion',
    'Zipping things up',
    'Your style is loading'
];

const indianCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur',
    'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna',
    'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali',
    'Vasai-Virar', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad',
    'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur',
    'Kota', 'Chandigarh', 'Guwahati', 'Solapur', 'Hubli-Dharwad', 'Bareilly', 'Moradabad', 'Mysore', 'Gurgaon',
    'Aligarh', 'Jalandhar', 'Tiruchirappalli', 'Bhubaneswar', 'Salem', 'Mira-Bhayandar', 'Thiruvananthapuram',
    'Bhiwandi', 'Saharanpur', 'Gorakhpur', 'Guntur', 'Bikaner', 'Amravati', 'Noida', 'Jamshedpur', 'Bhilai',
    'Cuttack', 'Firozabad', 'Kochi', 'Nellore', 'Bhavnagar', 'Dehradun', 'Durgapur', 'Asansol', 'Rourkela',
    'Nanded', 'Kolhapur', 'Ajmer', 'Akola', 'Gulbarga', 'Jamnagar', 'Ujjain', 'Loni', 'Siliguri', 'Jhansi'
];

const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

let currentUser = null;
let currentAdmin = null;
let allOrders = [];
let allCustomers = [];
let customerOrders = [];
let cart = [];
let collateralInterval = null;
let currentOrderForInvoice = null;
let currentOrderForDetails = null;
let isAdminMode = false;

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    showLoadingScreen();
    loadCart();
    checkSavedSessions();
    await loadProducts();
    initializeCollateral();
    setupNavigation();
    setupAuthTabs();
    initializeDropdowns();
    setTimeout(() => {
        hideLoadingScreen();
    }, 3000);
}

// ==========================================
// ADMIN MODE TOGGLE
// ==========================================

function enableAdminMode() {
    isAdminMode = true;
    document.body.classList.add('admin-mode');
    document.getElementById('mainHeader').style.display = 'none';
    document.getElementById('adminHeader').style.display = 'block';
    document.getElementById('cartSidebar').style.display = 'none';
    document.getElementById('mainFooter').style.display = 'none';
}

function disableAdminMode() {
    isAdminMode = false;
    document.body.classList.remove('admin-mode');
    document.getElementById('mainHeader').style.display = 'block';
    document.getElementById('adminHeader').style.display = 'none';
    document.getElementById('cartSidebar').style.display = 'flex';
    document.getElementById('mainFooter').style.display = 'block';
}

function exitAdminMode() {
    disableAdminMode();
    navigateTo('home');
    showNotification('Switched to customer view', 'success', true);
}

// ==========================================
// LOADING SCREEN
// ==========================================

function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingText = document.getElementById('loadingText');
    let messageIndex = 0;
    
    loadingScreen.classList.remove('hidden');
    
    const messageInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        loadingText.style.animation = 'none';
        setTimeout(() => {
            loadingText.textContent = loadingMessages[messageIndex];
            loadingText.style.animation = 'textFade 0.5s ease';
        }, 50);
    }, 800);
    
    loadingScreen.dataset.intervalId = messageInterval;
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const intervalId = loadingScreen.dataset.intervalId;
    
    if (intervalId) {
        clearInterval(parseInt(intervalId));
    }
    
    loadingScreen.classList.add('hidden');
}

// ==========================================
// PASSWORD TOGGLE
// ==========================================

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('.material-symbols-outlined');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.textContent = 'visibility_off';
    } else {
        input.type = 'password';
        icon.textContent = 'visibility';
    }
}

// ==========================================
// DROPDOWNS
// ==========================================

function initializeDropdowns() {
    populateDropdown('cityDropdown', indianCities);
    populateDropdown('checkoutCityDropdown', indianCities);
    populateDropdown('stateDropdown', indianStates);
    populateDropdown('checkoutStateDropdown', indianStates);
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.searchable-dropdown')) {
            document.querySelectorAll('.dropdown-options').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

function populateDropdown(dropdownId, items) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;
    
    dropdown.innerHTML = '';
    items.forEach(item => {
        const option = document.createElement('div');
        option.className = 'dropdown-option';
        option.textContent = item;
        option.onclick = function(e) {
            e.stopPropagation();
            selectDropdownOption(dropdownId, item);
        };
        dropdown.appendChild(option);
    });
}

function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;
    
    document.querySelectorAll('.dropdown-options').forEach(d => {
        if (d.id !== dropdownId) {
            d.classList.remove('active');
        }
    });
    
    dropdown.classList.add('active');
}

function filterDropdown(dropdownId, searchTerm) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;
    
    const options = dropdown.querySelectorAll('.dropdown-option');
    dropdown.classList.add('active');
    
    options.forEach(option => {
        const text = option.textContent.toLowerCase();
        if (text.includes(searchTerm.toLowerCase())) {
            option.classList.remove('hidden');
        } else {
            option.classList.add('hidden');
        }
    });
}

function selectDropdownOption(dropdownId, value) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;
    
    const input = dropdown.previousElementSibling;
    input.value = value;
    dropdown.classList.remove('active');
}

// ==========================================
// COLLATERAL CAROUSEL
// ==========================================

function initializeCollateral() {
    if (typeof collateralImages === 'undefined' || collateralImages.length === 0) {
        return;
    }
    
    const slider = document.getElementById('collateralSlider');
    
    collateralImages.forEach(image => {
        const slide = document.createElement('div');
        slide.className = 'collateral-slide';
        slide.innerHTML = `<img src="${image}" alt="BEEYUH">`;
        slider.appendChild(slide);
    });
    
    let currentSlide = 0;
    const totalSlides = collateralImages.length;
    
    collateralInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 5000);
}

// ==========================================
// SESSION MANAGEMENT
// ==========================================

function checkSavedSessions() {
    const savedCustomer = localStorage.getItem('beeyuh_customer');
    if (savedCustomer) {
        try {
            currentUser = JSON.parse(savedCustomer);
            showCustomerDashboard();
        } catch (e) {
            localStorage.removeItem('beeyuh_customer');
        }
    }
    
    const savedAdmin = localStorage.getItem('beeyuh_admin');
    if (savedAdmin) {
        try {
            currentAdmin = JSON.parse(savedAdmin);
            showAdminDashboard();
        } catch (e) {
            localStorage.removeItem('beeyuh_admin');
        }
    }
}

function saveCustomerSession(userData) {
    localStorage.setItem('beeyuh_customer', JSON.stringify(userData));
    currentUser = userData;
}

function saveAdminSession(adminData) {
    localStorage.setItem('beeyuh_admin', JSON.stringify(adminData));
    currentAdmin = adminData;
}

function logout() {
    localStorage.removeItem('beeyuh_customer');
    currentUser = null;
    customerOrders = [];
    hideCustomerDashboard();
    showNotification('Logged out successfully', 'success', true);
}

function adminLogout() {
    localStorage.removeItem('beeyuh_admin');
    currentAdmin = null;
    hideAdminDashboard();
    disableAdminMode();
    navigateTo('home');
    showNotification('Admin logged out successfully', 'success', true);
}

// ==========================================
// NAVIGATION
// ==========================================

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            navigateTo(page);
        });
    });
}

function navigateTo(page) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });
    
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    
    const targetPage = document.getElementById(page + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

function setupAuthTabs() {
    const authTabs = document.querySelectorAll('.auth-tab');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            authTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            
            document.getElementById(tabName + 'Form').classList.add('active');
        });
    });
}

// ==========================================
// API CALLS
// ==========================================

async function apiCall(action, data = {}, method = 'GET') {
    try {
        let url = API_URL;
        let options = {
            method: method
        };
        
        if (method === 'POST') {
            const formData = new URLSearchParams();
            formData.append('action', action);
            
            Object.keys(data).forEach(key => {
                if (typeof data[key] === 'object' && data[key] !== null) {
                    formData.append(key, JSON.stringify(data[key]));
                } else {
                    formData.append(key, data[key]);
                }
            });
            
            options.body = formData.toString();
            options.headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };
        } else {
            const params = new URLSearchParams();
            params.append('action', action);
            Object.keys(data).forEach(key => {
                params.append(key, data[key]);
            });
            url = `${API_URL}?${params.toString()}`;
        }
        
        console.log('API Call:', action, method);
        
        const response = await fetch(url, options);
        const text = await response.text();
        const result = JSON.parse(text);
        return result;
        
    } catch (error) {
        console.error('API Error:', error);
        return { 
            status: 'error', 
            message: 'Connection error: ' + error.message 
        };
    }
}

// ==========================================
// CUSTOMER AUTH
// ==========================================

async function customerLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    if (!email || !password) {
        showNotification('Please enter both email and password', 'error', true);
        return;
    }
    
    showLoadingScreen();
    const result = await apiCall('customerLogin', { email, password }, 'POST');
    hideLoadingScreen();
    
    if (result.status === 'success') {
        saveCustomerSession(result.data);
        await showCustomerDashboard();
        showNotification('Login successful!', 'success', true);
    } else {
        showNotification(result.message || 'Login failed', 'error', true);
    }
}

async function registerCustomer() {
    const fullName = document.getElementById('regFullName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const address = document.getElementById('regAddress').value.trim();
    const city = document.getElementById('regCity').value.trim();
    const state = document.getElementById('regState').value.trim();
    const pincode = document.getElementById('regPincode').value.trim();
    
    if (!fullName || !email || !phone || !password) {
        showNotification('Please fill all required fields', 'error', true);
        return;
    }
    
    showLoadingScreen();
    
    const result = await apiCall('registerCustomer', {
        fullName, email, phone, password, address, city, state, pincode
    }, 'POST');
    
    hideLoadingScreen();
    
    if (result.status === 'success') {
        showNotification('Registration successful! Please login.', 'success', true);
        document.querySelector('.auth-tab[data-tab="login"]').click();
        document.getElementById('registerForm').querySelectorAll('.input').forEach(input => {
            input.value = '';
        });
    } else {
        showNotification(result.message || 'Registration failed', 'error', true);
    }
}

async function showCustomerDashboard() {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('registerForm').classList.remove('active');
    
    const dashboard = document.getElementById('customerDashboard');
    const customerInfo = document.getElementById('customerInfo');
    
    if (currentUser) {
        customerInfo.innerHTML = `
            <p><strong>Customer ID:</strong> ${currentUser['Customer ID']}</p>
            <p><strong>Name:</strong> ${currentUser['Full Name']}</p>
            <p><strong>Email:</strong> ${currentUser.Email}</p>
            <p><strong>Phone:</strong> ${currentUser.Phone}</p>
        `;
        dashboard.classList.add('active');
        
        // Load customer orders
        await loadCustomerOrders();
    }
}

function hideCustomerDashboard() {
    document.getElementById('customerDashboard').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
}

// ==========================================
// CUSTOMER ORDER MANAGEMENT
// ==========================================

async function loadCustomerOrders() {
    if (!currentUser) return;
    
    showLoadingScreen();
    const result = await apiCall('getCustomerOrders', { customerId: currentUser['Customer ID'] });
    hideLoadingScreen();
    
    if (result.status === 'success') {
        customerOrders = result.data;
        displayCustomerOrders();
    } else {
        showNotification('Failed to load orders', 'error', false);
    }
}

function displayCustomerOrders() {
    const container = document.getElementById('customerOrdersContainer');
    
    if (customerOrders.length === 0) {
        container.innerHTML = `
            <div class="empty-orders-state">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/girl-holding-empty-shopping-cart-illustration-svg-download-png-10018095.png" 
                     alt="No Orders" class="empty-orders-icon">
                <p class="empty-orders-text">No orders found</p>
                <button class="btn btn-primary" onclick="navigateTo('products')">Start Shopping</button>
            </div>
        `;
        return;
    }
    
    let html = '<div class="customer-orders-list">';
    
    customerOrders.forEach(order => {
        const statusClass = getStatusClass(order['Order Status']);
        const canCancel = (order['Order Status'] === 'Order Placed' || order['Order Status'] === 'Processing');
        const isDelivered = (order['Order Status'] === 'Delivered');
        
        html += `
            <div class="customer-order-card" onclick="openOrderDetailsModal('${order['Order ID']}', false)">
                <div class="order-card-header">
                    <span class="order-card-id">${order['Order ID']}</span>
                    <span class="status-badge ${statusClass}">${order['Order Status']}</span>
                </div>
                <div class="order-card-info">
                    <p><strong>Date:</strong> ${formatDate(order['Order Date'])}</p>
                    <p><strong>Amount:</strong> ₹${order['Total Amount']}</p>
                    <p><strong>Payment:</strong> ${order['Payment Mode'] || 'COD'}</p>
                    ${order['Tracking Number'] ? `<p><strong>Tracking:</strong> ${order['Tracking Number']}</p>` : ''}
                </div>
                <div class="order-card-actions" onclick="event.stopPropagation()">
                    <button class="btn-order-action btn-view-details" onclick="openOrderDetailsModal('${order['Order ID']}', false)">
                        <span class="material-symbols-outlined">visibility</span>
                        View Details
                    </button>
                    ${canCancel ? `
                        <button class="btn-order-action btn-cancel-order" onclick="cancelCustomerOrder('${order['Order ID']}')">
                            <span class="material-symbols-outlined">cancel</span>
                            Cancel Order
                        </button>
                    ` : ''}
                    ${isDelivered ? `
                        <button class="btn-order-action btn-contact-agent" onclick="contactSupportAgent('${order['Order ID']}')">
                            <span class="material-symbols-outlined">support_agent</span>
                            Contact Agent
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

async function cancelCustomerOrder(orderId) {
    if (!confirm('Are you sure you want to cancel this order?')) {
        return;
    }
    
    showLoadingScreen();
    const result = await apiCall('cancelOrder', { 
        orderId: orderId, 
        customerId: currentUser['Customer ID'] 
    }, 'POST');
    hideLoadingScreen();
    
    if (result.status === 'success') {
        showNotification('Order cancelled successfully!', 'success', true);
        await loadCustomerOrders();
    } else {
        showNotification(result.message || 'Failed to cancel order', 'error', true);
    }
}

function contactSupportAgent(orderId) {
    const message = `Hello! I need assistance regarding my order.\n\n*Order ID:* ${orderId}\n\nPlease help me with this order.`;
    const phone = SUPPORT_WHATSAPP.replace(/[^0-9]/g, '');
    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// Continue in Part 2...
// ==========================================
// ORDER DETAILS MODAL (FOR BOTH CUSTOMER & ADMIN)
// ==========================================

async function openOrderDetailsModal(orderId, isAdmin = false) {
    showLoadingScreen();
    const result = await apiCall('getOrderDetails', { orderId: orderId });
    hideLoadingScreen();
    
    if (result.status === 'success') {
        currentOrderForDetails = result.data;
        displayOrderDetailsModal(result.data, isAdmin);
        document.getElementById('orderDetailsModal').classList.add('active');
    } else {
        showNotification('Failed to load order details', 'error', true);
    }
}

function displayOrderDetailsModal(order, isAdmin) {
    const container = document.getElementById('orderDetailsContent');
    
    let items = [];
    try {
        items = JSON.parse(order['Items']);
    } catch(e) {
        items = [];
    }
    
    const statusClass = getStatusClass(order['Order Status']);
    
    let html = `
        <div class="order-detail-section">
            <h3>Order Information</h3>
            <div class="order-detail-grid">
                <div class="order-detail-item">
                    <div class="order-detail-label">Order ID</div>
                    <div class="order-detail-value">${order['Order ID']}</div>
                </div>
                <div class="order-detail-item">
                    <div class="order-detail-label">Order Date</div>
                    <div class="order-detail-value">${formatDate(order['Order Date'])}</div>
                </div>
                <div class="order-detail-item">
                    <div class="order-detail-label">Status</div>
                    <div class="order-detail-value">
                        <span class="status-badge ${statusClass}">${order['Order Status']}</span>
                    </div>
                </div>
                <div class="order-detail-item">
                    <div class="order-detail-label">Payment Mode</div>
                    <div class="order-detail-value">${order['Payment Mode'] || 'COD'}</div>
                </div>
            </div>
        </div>
        
        <div class="order-detail-section">
            <h3>Customer Details</h3>
            <div class="order-detail-grid">
                <div class="order-detail-item">
                    <div class="order-detail-label">Name</div>
                    <div class="order-detail-value">${order['Customer Name']}</div>
                </div>
                <div class="order-detail-item">
                    <div class="order-detail-label">Email</div>
                    <div class="order-detail-value">${order['Customer Email']}</div>
                </div>
                <div class="order-detail-item">
                    <div class="order-detail-label">Phone</div>
                    <div class="order-detail-value">${order['Customer Phone']}</div>
                </div>
                <div class="order-detail-item">
                    <div class="order-detail-label">Customer ID</div>
                    <div class="order-detail-value">${order['Customer ID']}</div>
                </div>
            </div>
        </div>
        
        <div class="order-detail-section">
            <h3>Shipping Address</h3>
            <div class="order-detail-item">
                <div class="order-detail-value">
                    ${order['Shipping Address']}, ${order.City}, ${order.State} - ${order.Pincode}
                </div>
            </div>
        </div>
        
        <div class="order-detail-section">
            <h3>Order Items</h3>
            <div class="order-items-list">
    `;
    
    items.forEach(item => {
        html += `
            <div class="order-item-row">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-details">Size: ${item.size} | Qty: ${item.quantity}</div>
                <div class="order-item-price">₹${item.price * item.quantity}</div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
        
        <div class="order-detail-section">
            <h3>Shipping & Tracking</h3>
            <div class="order-detail-grid">
                ${order['Tracking Number'] ? `
                    <div class="order-detail-item">
                        <div class="order-detail-label">Tracking Number</div>
                        <div class="order-detail-value">${order['Tracking Number']}</div>
                    </div>
                ` : ''}
                ${order['Courier Name'] ? `
                    <div class="order-detail-item">
                        <div class="order-detail-label">Courier</div>
                        <div class="order-detail-value">${order['Courier Name']}</div>
                    </div>
                ` : ''}
                ${order['Dispatched Date'] ? `
                    <div class="order-detail-item">
                        <div class="order-detail-label">Dispatched Date</div>
                        <div class="order-detail-value">${formatDate(order['Dispatched Date'])}</div>
                    </div>
                ` : ''}
                ${order['Expected Delivery'] ? `
                    <div class="order-detail-item">
                        <div class="order-detail-label">Expected Delivery</div>
                        <div class="order-detail-value">${formatDate(order['Expected Delivery'])}</div>
                    </div>
                ` : ''}
            </div>
        </div>
        
        <div class="order-detail-section">
            <h3>Payment Summary</h3>
            <div class="order-detail-grid">
                <div class="order-detail-item">
                    <div class="order-detail-label">Total Amount</div>
                    <div class="order-detail-value">₹${order['Total Amount']}</div>
                </div>
                <div class="order-detail-item">
                    <div class="order-detail-label">Payment Status</div>
                    <div class="order-detail-value">${order['Payment Status'] || 'Pending'}</div>
                </div>
            </div>
        </div>
        
        ${order['Notes'] ? `
            <div class="order-detail-section">
                <h3>Notes</h3>
                <div class="order-detail-item">
                    <div class="order-detail-value">${order['Notes']}</div>
                </div>
            </div>
        ` : ''}
    `;
    
    container.innerHTML = html;
}

function closeOrderDetailsModal() {
    document.getElementById('orderDetailsModal').classList.remove('active');
    currentOrderForDetails = null;
}

// ==========================================
// ADMIN AUTH & CRM
// ==========================================

async function adminLogin() {
    const email = document.getElementById('adminEmail').value.trim();
    const password = document.getElementById('adminPassword').value.trim();
    
    if (!email || !password) {
        showNotification('Please enter both email and password', 'error', true);
        return;
    }
    
    showLoadingScreen();
    const result = await apiCall('adminLogin', { email, password }, 'POST');
    hideLoadingScreen();
    
    if (result.status === 'success') {
        saveAdminSession(result.data);
        await showAdminDashboard();
        enableAdminMode();
        showNotification('Admin login successful!', 'success', true);
    } else {
        showNotification(result.message || 'Admin login failed', 'error', true);
    }
}

async function showAdminDashboard() {
    document.getElementById('adminLogin').classList.remove('active');
    const dashboard = document.getElementById('adminDashboard');
    dashboard.classList.add('active');
    
    await loadAllOrders();
    await loadAllCustomers();
    switchCRMTab('dashboard');
}

function hideAdminDashboard() {
    document.getElementById('adminDashboard').classList.remove('active');
    document.getElementById('adminLogin').classList.add('active');
}

function switchCRMTab(tabName) {
    document.querySelectorAll('.crm-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    document.querySelectorAll('.crm-content').forEach(content => {
        content.classList.remove('active');
    });
    
    if (tabName === 'dashboard') {
        document.getElementById('crmDashboard').classList.add('active');
        displayRecentOrders();
    } else if (tabName === 'orders') {
        document.getElementById('crmOrders').classList.add('active');
        displayOrdersTable();
    } else if (tabName === 'customers') {
        document.getElementById('crmCustomers').classList.add('active');
        displayCustomersTable();
    } else if (tabName === 'analytics') {
        document.getElementById('crmAnalytics').classList.add('active');
    }
}

// ==========================================
// ORDERS MANAGEMENT
// ==========================================

async function loadAllOrders() {
    showLoadingScreen();
    const result = await apiCall('getOrders', { adminId: currentAdmin['Admin ID'] });
    hideLoadingScreen();
    
    if (result.status === 'success') {
        allOrders = result.data;
        updateOrderStats();
    } else {
        showNotification('Failed to load orders', 'error', false);
    }
}

async function loadAllCustomers() {
    const result = await apiCall('getAllCustomers', {});
    
    if (result.status === 'success') {
        allCustomers = result.data;
    }
}

function updateOrderStats() {
    const total = allOrders.length;
    const pending = allOrders.filter(o => o['Order Status'] !== 'Delivered' && o['Order Status'] !== 'Cancelled').length;
    const completed = allOrders.filter(o => o['Order Status'] === 'Delivered').length;
    const revenue = allOrders.reduce((sum, o) => sum + (parseFloat(o['Total Amount']) || 0), 0);
    
    document.getElementById('totalOrders').textContent = total;
    document.getElementById('pendingOrders').textContent = pending;
    document.getElementById('completedOrders').textContent = completed;
    document.getElementById('totalRevenue').textContent = `₹${revenue.toLocaleString('en-IN')}`;
}

function displayRecentOrders() {
    const recentOrders = allOrders.slice(0, 5);
    displayOrdersInTable('recentOrdersTable', recentOrders);
}

function displayOrdersTable() {
    displayOrdersInTable('ordersTableCRM', allOrders);
}

function displayOrdersInTable(containerId, orders) {
    const container = document.getElementById(containerId);
    
    if (orders.length === 0) {
        container.innerHTML = '<p>No orders found</p>';
        return;
    }
    
    let html = `
        <table class="crm-table">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    orders.forEach(order => {
        const statusClass = getStatusClass(order['Order Status']);
        
        html += `
            <tr onclick="openOrderDetailsModal('${order['Order ID']}', true)">
                <td>
                    <strong>${order['Order ID']}</strong>
                    <button class="btn-crm-action btn-copy" onclick="event.stopPropagation(); copyOrderId('${order['Order ID']}')" title="Copy Order ID">
                        <span class="material-symbols-outlined">content_copy</span>
                    </button>
                </td>
                <td>${order['Customer Name']}</td>
                <td>₹${order['Total Amount']}</td>
                <td><span class="status-badge ${statusClass}">${order['Order Status']}</span></td>
                <td>${formatDate(order['Order Date'])}</td>
                <td onclick="event.stopPropagation()">
                    <div class="order-actions-crm">
                        <button class="btn-crm-action btn-view" onclick="openUpdateModal('${order['Order ID']}')" title="Update Order">
                            <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button class="btn-crm-action btn-whatsapp" onclick="sendWhatsAppUpdate('${order['Order ID']}')" title="WhatsApp">
                            <span class="material-symbols-outlined">chat</span>
                        </button>
                        <button class="btn-crm-action btn-invoice" onclick="openInvoiceModal('${order['Order ID']}')" title="Invoice">
                            <span class="material-symbols-outlined">receipt</span>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    html += `</tbody></table>`;
    container.innerHTML = html;
}

function displayCustomersTable() {
    const container = document.getElementById('customersTableCRM');
    
    if (allCustomers.length === 0) {
        container.innerHTML = '<p>No customers found</p>';
        return;
    }
    
    let html = `
        <table class="crm-table">
            <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    allCustomers.forEach(customer => {
        html += `
            <tr>
                <td><strong>${customer['Customer ID']}</strong></td>
                <td>${customer['Full Name']}</td>
                <td>${customer.Email}</td>
                <td>${customer.Phone}</td>
                <td>${customer.City || 'N/A'}</td>
                <td><span class="status-badge status-delivered">${customer.Status}</span></td>
            </tr>
        `;
    });
    
    html += `</tbody></table>`;
    container.innerHTML = html;
}

// ==========================================
// COPY ORDER ID
// ==========================================

function copyOrderId(orderId) {
    navigator.clipboard.writeText(orderId).then(() => {
        showNotification('Order ID copied to clipboard!', 'success', true);
    }).catch(err => {
        showNotification('Failed to copy Order ID', 'error', true);
    });
}

// ==========================================
// WHATSAPP INTEGRATION
// ==========================================

function sendWhatsAppUpdate(orderId) {
    const order = allOrders.find(o => o['Order ID'] === orderId);
    if (!order) return;
    
    const phone = order['Customer Phone'].replace(/[^0-9]/g, '');
    const message = `Hello ${order['Customer Name']}! 👋\n\n` +
                   `Your BEEYUH order has been updated:\n\n` +
                   `📦 *Order ID:* ${order['Order ID']}\n` +
                   `📍 *Status:* ${order['Order Status']}\n` +
                   `💰 *Amount:* ₹${order['Total Amount']}\n` +
                   `${order['Tracking Number'] ? `🚚 *Tracking:* ${order['Tracking Number']}\n` : ''}` +
                   `${order['Courier Name'] ? `📮 *Courier:* ${order['Courier Name']}\n` : ''}` +
                   `${order['Expected Delivery'] ? `📅 *Expected Delivery:* ${formatDate(order['Expected Delivery'])}\n` : ''}` +
                   `\nThank you for shopping with BEEYUH! 🛍️`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/91${phone}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}

// ==========================================
// INVOICE GENERATION
// ==========================================

function openInvoiceModal(orderId) {
    const order = allOrders.find(o => o['Order ID'] === orderId);
    if (!order) return;
    
    currentOrderForInvoice = order;
    document.getElementById('invoiceModal').classList.add('active');
    
    generateInvoicePreview(order);
}

function closeInvoiceModal() {
    document.getElementById('invoiceModal').classList.remove('active');
    currentOrderForInvoice = null;
}

function generateInvoicePreview(order) {
    const preview = document.getElementById('invoicePreview');
    
    let items = [];
    try {
        items = JSON.parse(order['Items']);
    } catch(e) {
        items = [];
    }
    
    let html = `
        <div style="padding: 20px; font-family: 'Open Sans', sans-serif;">
            <h2 style="text-align: center; margin-bottom: 30px;">BEEYUH INVOICE</h2>
            <div style="margin-bottom: 20px;">
                <p><strong>Order ID:</strong> ${order['Order ID']}</p>
                <p><strong>Date:</strong> ${formatDate(order['Order Date'])}</p>
                <p><strong>Customer:</strong> ${order['Customer Name']}</p>
                <p><strong>Phone:</strong> ${order['Customer Phone']}</p>
                <p><strong>Address:</strong> ${order['Shipping Address']}, ${order.City}, ${order.State} - ${order.Pincode}</p>
            </div>
            <hr>
            <h3>Order Items:</h3>
            <ul>
    `;
    
    items.forEach(item => {
        html += `<li>${item.name} (${item.size}) x ${item.quantity} = ₹${item.price * item.quantity}</li>`;
    });
    
    html += `
            </ul>
            <hr>
            <h3 style="text-align: right;">Total: ₹${order['Total Amount']}</h3>
        </div>
    `;
    
    preview.innerHTML = html;
}

function generatePDFInvoice() {
    if (!currentOrderForInvoice) return;
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const order = currentOrderForInvoice;
    
    doc.setFontSize(20);
    doc.text('BEEYUH INVOICE', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Order ID: ${order['Order ID']}`, 20, 40);
    doc.text(`Date: ${formatDate(order['Order Date'])}`, 20, 50);
    doc.text(`Customer: ${order['Customer Name']}`, 20, 60);
    doc.text(`Phone: ${order['Customer Phone']}`, 20, 70);
    doc.text(`Address: ${order['Shipping Address']}`, 20, 80);
    doc.text(`${order.City}, ${order.State} - ${order.Pincode}`, 20, 90);
    
    doc.line(20, 100, 190, 100);
    
    doc.text('Order Items:', 20, 110);
    
    let items = [];
    try {
        items = JSON.parse(order['Items']);
    } catch(e) {}
    
    let yPos = 120;
    items.forEach(item => {
        doc.text(`${item.name} (${item.size}) x ${item.quantity} = Rs.${item.price * item.quantity}`, 20, yPos);
        yPos += 10;
    });
    
    doc.line(20, yPos, 190, yPos);
    yPos += 10;
    doc.setFontSize(14);
    doc.text(`Total: Rs.${order['Total Amount']}`, 150, yPos);
    
    doc.save(`BEEYUH_Invoice_${order['Order ID']}.pdf`);
    showNotification('Invoice PDF downloaded!', 'success', true);
}

function printInvoice() {
    const preview = document.getElementById('invoicePreview');
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Invoice</title>');
    printWindow.document.write('<style>body{font-family: "Open Sans", sans-serif; padding: 20px;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(preview.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

function emailInvoice() {
    if (!currentOrderForInvoice) return;
    
    const order = currentOrderForInvoice;
    const subject = `BEEYUH Invoice - ${order['Order ID']}`;
    const body = `Dear ${order['Customer Name']},\n\nPlease find your invoice details below:\n\nOrder ID: ${order['Order ID']}\nTotal Amount: ₹${order['Total Amount']}\n\nThank you for shopping with BEEYUH!`;
    
    window.location.href = `mailto:${order['Customer Email']}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function whatsappInvoice() {
    if (!currentOrderForInvoice) return;
    
    const order = currentOrderForInvoice;
    const phone = order['Customer Phone'].replace(/[^0-9]/g, '');
    const message = `🧾 *BEEYUH INVOICE*\n\n` +
                   `Order ID: ${order['Order ID']}\n` +
                   `Date: ${formatDate(order['Order Date'])}\n` +
                   `Customer: ${order['Customer Name']}\n` +
                   `Total Amount: ₹${order['Total Amount']}\n\n` +
                   `Thank you for shopping with BEEYUH! 🛍️`;
    
    const whatsappURL = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// ==========================================
// SEARCH FUNCTIONS
// ==========================================

function searchOrders(searchTerm) {
    if (!searchTerm) {
        displayOrdersTable();
        return;
    }
    
    const filtered = allOrders.filter(order => {
        return order['Order ID'].toLowerCase().includes(searchTerm.toLowerCase()) ||
               order['Customer Name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
               order['Customer Email'].toLowerCase().includes(searchTerm.toLowerCase()) ||
               order['Order Status'].toLowerCase().includes(searchTerm.toLowerCase());
    });
    
    displayOrdersInTable('ordersTableCRM', filtered);
}

function searchCustomers(searchTerm) {
    if (!searchTerm) {
        displayCustomersTable();
        return;
    }
    
    const filtered = allCustomers.filter(customer => {
        return customer['Customer ID'].toLowerCase().includes(searchTerm.toLowerCase()) ||
               customer['Full Name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
               customer.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
               customer.Phone.includes(searchTerm);
    });
    
    const container = document.getElementById('customersTableCRM');
    
    let html = `
        <table class="crm-table">
            <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    filtered.forEach(customer => {
        html += `
            <tr>
                <td><strong>${customer['Customer ID']}</strong></td>
                <td>${customer['Full Name']}</td>
                <td>${customer.Email}</td>
                <td>${customer.Phone}</td>
                <td>${customer.City || 'N/A'}</td>
                <td><span class="status-badge status-delivered">${customer.Status}</span></td>
            </tr>
        `;
    });
    
    html += `</tbody></table>`;
    container.innerHTML = html;
}

// ==========================================
// ORDER UPDATE MODAL
// ==========================================

function openUpdateModal(orderId) {
    const order = allOrders.find(o => o['Order ID'] === orderId);
    
    if (!order) return;
    
    document.getElementById('updateOrderId').value = order['Order ID'];
    document.getElementById('updateStatus').value = order['Order Status'];
    document.getElementById('updateTracking').value = order['Tracking Number'] || '';
    document.getElementById('updateCourier').value = order['Courier Name'] || '';
    document.getElementById('updateDispatched').value = order['Dispatched Date'] || '';
    document.getElementById('updateDelivery').value = order['Expected Delivery'] || '';
    document.getElementById('updateNotes').value = order['Notes'] || '';
    document.getElementById('updatePayment').value = order['Payment Status'] || 'Pending';
    
    document.getElementById('updateModal').classList.add('active');
}

function closeUpdateModal() {
    document.getElementById('updateModal').classList.remove('active');
}

async function submitOrderUpdate() {
    const orderId = document.getElementById('updateOrderId').value;
    const orderStatus = document.getElementById('updateStatus').value;
    const trackingNumber = document.getElementById('updateTracking').value;
    const courierName = document.getElementById('updateCourier').value;
    const dispatchedDate = document.getElementById('updateDispatched').value;
    const expectedDelivery = document.getElementById('updateDelivery').value;
    const notes = document.getElementById('updateNotes').value;
    const paymentStatus = document.getElementById('updatePayment').value;
    
    showLoadingScreen();
    
    const result = await apiCall('updateOrder', {
        orderId,
        orderStatus,
        trackingNumber,
        courierName,
        dispatchedDate,
        expectedDelivery,
        notes,
        paymentStatus
    }, 'POST');
    
    hideLoadingScreen();
    
    if (result.status === 'success') {
        showNotification('Order updated successfully!', 'success', true);
        closeUpdateModal();
        await loadAllOrders();
        displayOrdersTable();
    } else {
        showNotification(result.message || 'Update failed', 'error', true);
    }
}

// Continue in Part 3 (Cart, Checkout, Products, Utilities)...
// ==========================================
// ORDER TRACKING
// ==========================================

async function trackOrder() {
    const orderId = document.getElementById('trackOrderId').value.trim();
    
    if (!orderId) {
        showNotification('Please enter an Order ID', 'error', true);
        return;
    }
    
    showLoadingScreen();
    
    const result = await apiCall('trackOrder', { orderId });
    
    hideLoadingScreen();
    
    const trackResult = document.getElementById('trackResult');
    
    if (result.status === 'success') {
        const order = result.data;
        const statusClass = getStatusClass(order['Order Status']);
        
        trackResult.innerHTML = `
            <div class="track-info">
                <h3>Order Found!</h3>
                <p><strong>Order ID:</strong> ${order['Order ID']}</p>
                <p><strong>Status:</strong> <span class="status-badge ${statusClass}">${order['Order Status']}</span></p>
                <p><strong>Order Date:</strong> ${formatDate(order['Order Date'])}</p>
                <p><strong>Customer Name:</strong> ${order['Customer Name']}</p>
                <p><strong>Total Amount:</strong> ₹${order['Total Amount']}</p>
                <p><strong>Payment Mode:</strong> ${order['Payment Mode'] || 'COD'}</p>
                ${order['Tracking Number'] ? `<p><strong>Tracking Number:</strong> ${order['Tracking Number']}</p>` : ''}
                ${order['Courier Name'] ? `<p><strong>Courier:</strong> ${order['Courier Name']}</p>` : ''}
                ${order['Expected Delivery'] ? `<p><strong>Expected Delivery:</strong> ${formatDate(order['Expected Delivery'])}</p>` : ''}
                ${order['Notes'] ? `<p><strong>Notes:</strong> ${order['Notes']}</p>` : ''}
            </div>
        `;
    } else {
        trackResult.innerHTML = `
            <div class="track-info">
                <p style="color: #d32f2f;">Order not found. Please check your Order ID.</p>
            </div>
        `;
    }
}

// ==========================================
// SHOPPING CART
// ==========================================

function loadCart() {
    const savedCart = localStorage.getItem('beeyuh_cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartUI();
        } catch (e) {
            cart = [];
        }
    }
}

function saveCart() {
    localStorage.setItem('beeyuh_cart', JSON.stringify(cart));
    updateCartUI();
}

function addToCart(productId, size) {
    if (cart.length >= MAX_CART_ITEMS) {
        showNotification(`Cart limit reached! Maximum ${MAX_CART_ITEMS} items allowed.`, 'error', true);
        return;
    }
    
    const product = getProductById(productId);
    if (!product) {
        showNotification('Product not found', 'error', true);
        return;
    }
    
    if (!size) {
        showNotification('Please select a size', 'error', true);
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId && item.size === size);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.salePrice || product.price,
            image: product.image,
            size: size,
            quantity: 1,
            type: 'regular'
        });
    }
    
    saveCart();
    showNotification('Added to cart!', 'success', true);
}

function updateCartQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            removeFromCart(index);
        } else {
            saveCart();
        }
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    showNotification('Item removed from cart', 'success', false);
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 40px;">Your cart is empty</p>';
        cartTotal.textContent = '₹0';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-size">Size: ${item.size}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateCartQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateCartQuantity(${index}, 1)">+</button>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = html;
    cartTotal.textContent = `₹${total}`;
}

function openCart() {
    document.getElementById('cartSidebar').classList.add('active');
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('active');
}

// ==========================================
// CHECKOUT
// ==========================================

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error', true);
        return;
    }
    
    if (!currentUser) {
        showNotification('Please login to continue', 'error', true);
        navigateTo('account');
        closeCart();
        return;
    }
    
    document.getElementById('checkoutName').value = currentUser['Full Name'] || '';
    document.getElementById('checkoutEmail').value = currentUser.Email || '';
    document.getElementById('checkoutPhone').value = currentUser.Phone || '';
    document.getElementById('checkoutAddress').value = currentUser.Address || '';
    document.getElementById('checkoutCity').value = currentUser.City || '';
    document.getElementById('checkoutState').value = currentUser.State || '';
    document.getElementById('checkoutPincode').value = currentUser.Pincode || '';
    
    let summaryHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        summaryHTML += `
            <p>${item.name} (${item.size}) x ${item.quantity} = ₹${itemTotal}</p>
        `;
    });
    
    document.getElementById('checkoutSummary').innerHTML = summaryHTML;
    document.getElementById('checkoutTotal').textContent = `₹${total}`;
    
    closeCart();
    document.getElementById('checkoutModal').classList.add('active');
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('active');
}

async function placeOrder() {
    const name = document.getElementById('checkoutName').value.trim();
    const email = document.getElementById('checkoutEmail').value.trim();
    const phone = document.getElementById('checkoutPhone').value.trim();
    const address = document.getElementById('checkoutAddress').value.trim();
    const city = document.getElementById('checkoutCity').value.trim();
    const state = document.getElementById('checkoutState').value.trim();
    const pincode = document.getElementById('checkoutPincode').value.trim();
    const paymentMode = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    if (!name || !email || !phone || !address || !city || !state || !pincode) {
        showNotification('Please fill all shipping information', 'error', true);
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    showLoadingScreen();
    
    const result = await apiCall('placeOrder', {
        customerId: currentUser['Customer ID'],
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        shippingAddress: address,
        city: city,
        state: state,
        pincode: pincode,
        items: cart,
        totalAmount: total,
        paymentMode: paymentMode
    }, 'POST');
    
    hideLoadingScreen();
    closeCheckoutModal();
    
    if (result.status === 'success') {
        const successDetails = document.getElementById('successOrderDetails');
        successDetails.innerHTML = `
            <p><strong>Order ID:</strong> ${result.data.orderId}</p>
            <p><strong>Order Date:</strong> ${formatDate(result.data.orderDate)}</p>
            <p><strong>Total Amount:</strong> ₹${total}</p>
            <p><strong>Payment Mode:</strong> ${paymentMode}</p>
            <p><strong>Delivery Address:</strong> ${address}, ${city}, ${state} - ${pincode}</p>
        `;
        
        cart = [];
        saveCart();
        
        navigateTo('orderSuccess');
    } else {
        navigateTo('orderFailed');
    }
}

// ==========================================
// PRODUCTS
// ==========================================

async function loadProducts() {
    if (typeof products !== 'undefined') {
        displayProducts(products);
        displayFeaturedProducts(products.slice(0, 6));
    }
}

function displayProducts(productsList) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsList || productsList.length === 0) {
        productsGrid.innerHTML = '<p>No products available</p>';
        return;
    }
    
    let html = '';
    
    productsList.forEach(product => {
        html += createProductCard(product);
    });
    
    productsGrid.innerHTML = html;
}

function displayFeaturedProducts(productsList) {
    const featuredProducts = document.getElementById('featuredProducts');
    
    if (!productsList || productsList.length === 0) {
        return;
    }
    
    let html = '';
    
    productsList.forEach(product => {
        html += createProductCard(product);
    });
    
    featuredProducts.innerHTML = html;
}

function createProductCard(product) {
    const hasDiscount = product.salePrice && product.salePrice < product.price;
    
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    ${hasDiscount ? 
                        `<span class="product-sale-price">₹${product.salePrice}</span>
                         <span class="product-original-price">₹${product.price}</span>` :
                        `₹${product.price}`
                    }
                </div>
                <div class="product-actions">
                    <select class="size-select" id="size-${product.id}">
                        ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                    </select>
                    <button class="add-to-cart-btn" onclick="addToCart('${product.id}', document.getElementById('size-${product.id}').value)">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getProductById(productId) {
    if (typeof products === 'undefined') return null;
    return products.find(p => p.id === productId);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function getStatusClass(status) {
    const statusMap = {
        'Order Placed': 'status-placed',
        'Processing': 'status-processing',
        'Dispatched': 'status-dispatched',
        'Out for Delivery': 'status-dispatched',
        'Delivered': 'status-delivered',
        'Cancelled': 'status-cancelled'
    };
    
    return statusMap[status] || 'status-placed';
}

function showNotification(message, type = 'info', showIcon = false) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    let iconHTML = '';
    if (showIcon) {
        if (type === 'success') {
            iconHTML = '<img src="https://i.postimg.cc/DmkGMhRx/image.png" style="width: 24px; height: 24px; margin-right: 10px; vertical-align: middle;">';
        } else if (type === 'error') {
            iconHTML = '<img src="https://i.postimg.cc/wMdJWHCk/image.png" style="width: 24px; height: 24px; margin-right: 10px; vertical-align: middle;">';
        }
    }
    
    notification.innerHTML = iconHTML + message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 28px;
        background: ${type === 'success' ? '#21be79' : type === 'error' ? '#d32f2f' : '#2196f3'};
        color: white;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-size: 16px;
        font-weight: 500;
        display: flex;
        align-items: center;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
