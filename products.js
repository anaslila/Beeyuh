// ==========================================
// BEEYUH - Products Data v2.0
// Admin Managed - No Google Sheets Required
// ==========================================

/**
 * ADMIN INSTRUCTIONS:
 * - Add/edit products directly in this file
 * - Changes take effect immediately after saving
 * - No database or Google Sheets required
 * - Manage inventory, pricing, and product details here
 */

const products = [
    {
        id: 'PROD001',
        name: 'Classic White T-Shirt',
        description: 'Premium cotton t-shirt with a comfortable fit. Perfect for everyday wear.',
        category: 'T-Shirts',
        price: 999,
        salePrice: 799,
        stock: 50,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White'],
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
        featured: true,
        status: 'Active'
    },
    {
        id: 'PROD002',
        name: 'Black Crew Neck Tee',
        description: 'Essential black t-shirt for everyday wear. Made with soft, breathable fabric.',
        category: 'T-Shirts',
        price: 999,
        salePrice: 749,
        stock: 45,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black'],
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
        featured: true,
        status: 'Active'
    },
    {
        id: 'PROD003',
        name: 'Grey Oversized Hoodie',
        description: 'Cozy oversized hoodie with premium fabric. Perfect for layering.',
        category: 'Hoodies',
        price: 1999,
        salePrice: 1599,
        stock: 30,
        sizes: ['M', 'L', 'XL', 'XXL'],
        colors: ['Grey'],
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
        featured: true,
        status: 'Active'
    },
    {
        id: 'PROD004',
        name: 'Navy Blue Polo',
        description: 'Classic polo shirt with collar and buttons. Smart casual style.',
        category: 'Polos',
        price: 1299,
        salePrice: 999,
        stock: 35,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Navy Blue'],
        image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500',
        featured: false,
        status: 'Active'
    },
    {
        id: 'PROD005',
        name: 'Olive Green Joggers',
        description: 'Comfortable joggers with elastic waistband. Perfect for lounging or gym.',
        category: 'Bottoms',
        price: 1499,
        salePrice: 1199,
        stock: 40,
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Olive Green'],
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500',
        featured: false,
        status: 'Active'
    },
    {
        id: 'PROD006',
        name: 'Denim Jacket',
        description: 'Classic denim jacket with vintage wash. Timeless style piece.',
        category: 'Jackets',
        price: 2999,
        salePrice: 2499,
        stock: 20,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Blue Denim'],
        image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500',
        featured: true,
        status: 'Active'
    },
    {
        id: 'PROD007',
        name: 'Striped Long Sleeve',
        description: 'Casual striped long sleeve t-shirt. Great for transitional weather.',
        category: 'T-Shirts',
        price: 1199,
        salePrice: 899,
        stock: 38,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White/Black'],
        image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500',
        featured: false,
        status: 'Active'
    },
    {
        id: 'PROD008',
        name: 'Beige Cargo Pants',
        description: 'Utility cargo pants with multiple pockets. Functional and stylish.',
        category: 'Bottoms',
        price: 1799,
        salePrice: 1399,
        stock: 28,
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Beige'],
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500',
        featured: false,
        status: 'Active'
    },
    {
        id: 'PROD009',
        name: 'White Zip Hoodie',
        description: 'Full zip hoodie with hood and pockets. Comfortable and versatile.',
        category: 'Hoodies',
        price: 2199,
        salePrice: 1799,
        stock: 25,
        sizes: ['M', 'L', 'XL', 'XXL'],
        colors: ['White'],
        image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=500',
        featured: false,
        status: 'Active'
    },
    {
        id: 'PROD010',
        name: 'Graphic Print Tee',
        description: 'Trendy graphic print t-shirt. Stand out from the crowd.',
        category: 'T-Shirts',
        price: 1099,
        salePrice: 849,
        stock: 42,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black'],
        image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500',
        featured: true,
        status: 'Active'
    },
    {
        id: 'PROD011',
        name: 'Black Bomber Jacket',
        description: 'Stylish bomber jacket with ribbed cuffs. Perfect for cool evenings.',
        category: 'Jackets',
        price: 3499,
        salePrice: 2999,
        stock: 15,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black'],
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
        featured: true,
        status: 'Active'
    },
    {
        id: 'PROD012',
        name: 'Grey Sweatpants',
        description: 'Comfortable sweatpants for lounging. Soft and cozy.',
        category: 'Bottoms',
        price: 1399,
        salePrice: 1099,
        stock: 35,
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Grey'],
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500',
        featured: false,
        status: 'Active'
    },
    {
        id: 'PROD013',
        name: 'Maroon Henley Shirt',
        description: 'Long sleeve henley with button placket. Classic American style.',
        category: 'Shirts',
        price: 1399,
        salePrice: 1099,
        stock: 30,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Maroon'],
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
        featured: false,
        status: 'Active'
    },
    {
        id: 'PROD014',
        name: 'Khaki Shorts',
        description: 'Summer shorts with pockets. Lightweight and comfortable.',
        category: 'Shorts',
        price: 899,
        salePrice: 699,
        stock: 40,
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Khaki'],
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500',
        featured: false,
        status: 'Active'
    },
    {
        id: 'PROD015',
        name: 'Burgundy Crewneck',
        description: 'Classic crewneck sweatshirt. Wardrobe essential.',
        category: 'Sweatshirts',
        price: 1699,
        salePrice: 1399,
        stock: 32,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Burgundy'],
        image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500',
        featured: false,
        status: 'Active'
    }
];

// ==========================================
// PRODUCT CATEGORIES
// ==========================================

const categories = [
    {
        id: 1,
        name: 'T-Shirts',
        slug: 'tshirts',
        description: 'Comfortable and stylish t-shirts for every occasion',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
        productCount: 0
    },
    {
        id: 2,
        name: 'Hoodies',
        slug: 'hoodies',
        description: 'Cozy hoodies for every season',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
        productCount: 0
    },
    {
        id: 3,
        name: 'Bottoms',
        slug: 'bottoms',
        description: 'Joggers, pants, and sweatpants',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500',
        productCount: 0
    },
    {
        id: 4,
        name: 'Jackets',
        slug: 'jackets',
        description: 'Stylish jackets and outerwear',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
        productCount: 0
    },
    {
        id: 5,
        name: 'Shorts',
        slug: 'shorts',
        description: 'Summer ready shorts',
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500',
        productCount: 0
    },
    {
        id: 6,
        name: 'Shirts',
        slug: 'shirts',
        description: 'Casual and formal shirts',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
        productCount: 0
    },
    {
        id: 7,
        name: 'Sweatshirts',
        slug: 'sweatshirts',
        description: 'Comfortable crewneck sweatshirts',
        image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500',
        productCount: 0
    },
    {
        id: 8,
        name: 'Polos',
        slug: 'polos',
        description: 'Classic polo shirts',
        image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500',
        productCount: 0
    }
];

// Update category product counts
categories.forEach(category => {
    category.productCount = products.filter(p => p.category === category.name && p.status === 'Active').length;
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Get all active products
 */
function getActiveProducts() {
    return products.filter(product => product.status === 'Active');
}

/**
 * Get products by category
 */
function getProductsByCategory(categoryName) {
    return products.filter(product => 
        product.category === categoryName && 
        product.status === 'Active'
    );
}

/**
 * Get product by ID
 */
function getProductById(productId) {
    return products.find(product => product.id === productId);
}

/**
 * Get featured products
 */
function getFeaturedProducts(count = 6) {
    return products
        .filter(product => product.featured && product.status === 'Active')
        .slice(0, count);
}

/**
 * Get sale products
 */
function getSaleProducts() {
    return products.filter(product => 
        product.salePrice && 
        product.salePrice < product.price && 
        product.status === 'Active'
    );
}

/**
 * Search products
 */
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.status === 'Active' &&
        (product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.colors.some(color => color.toLowerCase().includes(searchTerm)))
    );
}

/**
 * Get products by price range
 */
function getProductsByPriceRange(minPrice, maxPrice) {
    return products.filter(product => {
        const price = product.salePrice || product.price;
        return price >= minPrice && price <= maxPrice && product.status === 'Active';
    });
}

/**
 * Sort products
 */
function sortProducts(sortBy = 'name') {
    const sortedProducts = [...products].filter(p => p.status === 'Active');
    
    switch(sortBy) {
        case 'price-low':
            return sortedProducts.sort((a, b) => 
                (a.salePrice || a.price) - (b.salePrice || b.price)
            );
        case 'price-high':
            return sortedProducts.sort((a, b) => 
                (b.salePrice || b.price) - (a.salePrice || a.price)
            );
        case 'name':
            return sortedProducts.sort((a, b) => 
                a.name.localeCompare(b.name)
            );
        case 'newest':
            return sortedProducts.reverse();
        case 'popular':
            return sortedProducts.filter(p => p.featured);
        default:
            return sortedProducts;
    }
}

/**
 * Check product availability
 */
function isProductAvailable(productId, size) {
    const product = getProductById(productId);
    if (!product) return false;
    return product.stock > 0 && 
           product.sizes.includes(size) && 
           product.status === 'Active';
}

/**
 * Calculate discount percentage
 */
function getDiscountPercentage(product) {
    if (!product.salePrice || product.salePrice >= product.price) return 0;
    return Math.round(((product.price - product.salePrice) / product.price) * 100);
}

/**
 * Get low stock products (for admin alerts)
 */
function getLowStockProducts(threshold = 10) {
    return products.filter(product => 
        product.stock <= threshold && 
        product.status === 'Active'
    );
}

/**
 * Get out of stock products
 */
function getOutOfStockProducts() {
    return products.filter(product => product.stock === 0);
}

/**
 * Get products by color
 */
function getProductsByColor(colorName) {
    return products.filter(product => 
        product.colors.includes(colorName) && 
        product.status === 'Active'
    );
}

/**
 * Get total inventory value
 */
function getTotalInventoryValue() {
    return products.reduce((total, product) => {
        return total + (product.price * product.stock);
    }, 0);
}

/**
 * Get category with most products
 */
function getMostPopularCategory() {
    const categoryCounts = {};
    products.forEach(product => {
        if (product.status === 'Active') {
            categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
        }
    });
    
    return Object.keys(categoryCounts).reduce((a, b) => 
        categoryCounts[a] > categoryCounts[b] ? a : b
    );
}

// ==========================================
// ADMIN MANAGEMENT FUNCTIONS
// ==========================================

/**
 * Add new product (Admin only)
 * Copy this template to add new products
 */
function addProductTemplate() {
    return {
        id: 'PROD' + String(products.length + 1).padStart(3, '0'),
        name: 'Product Name',
        description: 'Product description here',
        category: 'T-Shirts', // T-Shirts, Hoodies, Bottoms, Jackets, Shorts, Shirts, Sweatshirts, Polos
        price: 999,
        salePrice: 799, // Set to null or remove if no sale
        stock: 50,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Color Name'],
        image: 'https://your-image-url.com/image.jpg',
        featured: false, // Set true to show on homepage
        status: 'Active' // Active or Inactive
    };
}

/**
 * Update product stock (for admin inventory management)
 */
function updateProductStock(productId, newStock) {
    const product = getProductById(productId);
    if (product) {
        product.stock = newStock;
        console.log(`✅ Stock updated for ${product.name}: ${newStock} units`);
        return true;
    }
    return false;
}

/**
 * Update product price
 */
function updateProductPrice(productId, newPrice, newSalePrice = null) {
    const product = getProductById(productId);
    if (product) {
        product.price = newPrice;
        if (newSalePrice) {
            product.salePrice = newSalePrice;
        }
        console.log(`✅ Price updated for ${product.name}`);
        return true;
    }
    return false;
}

/**
 * Toggle product status
 */
function toggleProductStatus(productId) {
    const product = getProductById(productId);
    if (product) {
        product.status = product.status === 'Active' ? 'Inactive' : 'Active';
        console.log(`✅ ${product.name} is now ${product.status}`);
        return true;
    }
    return false;
}

// ==========================================
// VALIDATION & LOGGING
// ==========================================

// Validate product data on load
products.forEach(product => {
    if (!product.id || !product.name || !product.price) {
        console.error('❌ Invalid product data:', product);
    }
});

// Log product statistics
console.log('✅ BEEYUH Products Loaded:', {
    totalProducts: products.length,
    activeProducts: getActiveProducts().length,
    categories: categories.length,
    featuredProducts: getFeaturedProducts().length,
    saleProducts: getSaleProducts().length,
    totalInventoryValue: '₹' + getTotalInventoryValue().toLocaleString('en-IN'),
    lowStockAlerts: getLowStockProducts().length
});

// Check for low stock products
const lowStock = getLowStockProducts();
if (lowStock.length > 0) {
    console.warn('⚠️ Low Stock Alert:', lowStock.map(p => `${p.name} (${p.stock} left)`));
}

// Check for out of stock products
const outOfStock = getOutOfStockProducts();
if (outOfStock.length > 0) {
    console.warn('⚠️ Out of Stock:', outOfStock.map(p => p.name));
}
