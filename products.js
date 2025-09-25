/* products.js */

export const PRODUCTS = [
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
  {
    id: 1004,
    title: "Premium Pocket T-Shirt",
    price: 1199,
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=500&fit=crop",
    description: "Classic pocket tee in premium combed cotton. Perfect for subtle initial placement on pocket or chest area.",
    category: "tshirts",
    tags: ["t-shirt", "pocket", "premium", "combed-cotton", "customizable", "classic"]
  },
  {
    id: 1005,
    title: "Longline Curved Hem Tee",
    price: 1599,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop&sat=-50",
    description: "Modern longline tee with curved hem design. Premium modal blend with custom initial options for contemporary style.",
    category: "tshirts",
    tags: ["t-shirt", "longline", "curved-hem", "modal", "customizable", "modern"]
  },
  {
    id: 1006,
    title: "Performance Athletic Tee",
    price: 1699,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&hue=180",
    description: "Moisture-wicking performance tee for active lifestyle. Customize with initials for personalized athletic wear.",
    category: "tshirts",
    tags: ["t-shirt", "athletic", "performance", "moisture-wicking", "customizable", "active"]
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
  {
    id: 2003,
    title: "Minimalist Hoodie",
    price: 2799,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop&sat=-30",
    description: "Clean, minimalist design hoodie in premium cotton blend. Perfect for everyday wear with subtle BEEYUH branding.",
    category: "hoodies",
    tags: ["hoodie", "minimalist", "clean", "cotton", "everyday", "subtle"]
  },
  {
    id: 2004,
    title: "Tech Fleece Hoodie",
    price: 3299,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
    description: "Modern tech fleece hoodie with innovative fabric technology. Lightweight yet warm with contemporary fit and finish.",
    category: "hoodies",
    tags: ["hoodie", "tech-fleece", "innovative", "lightweight", "warm", "contemporary"]
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
  {
    id: 3002,
    title: "Bomber Flight Jacket",
    price: 4299,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
    description: "Classic bomber jacket with military-inspired details. Features MA-1 styling, ribbed cuffs, and premium nylon construction with satin lining.",
    category: "jackets",
    tags: ["jacket", "bomber", "military", "ma-1", "nylon", "satin", "classic"]
  },
  {
    id: 3003,
    title: "Utility Work Jacket",
    price: 3799,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=500&fit=crop&hue=60",
    description: "Functional utility jacket with multiple pockets and durable construction. Perfect for urban exploration and everyday adventures.",
    category: "jackets",
    tags: ["jacket", "utility", "work", "functional", "pockets", "durable", "urban"]
  },
  {
    id: 3004,
    title: "Track Jacket Retro",
    price: 3599,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop&hue=240",
    description: "Retro-inspired track jacket with modern technical features. Water-resistant shell with mesh lining and reflective details.",
    category: "jackets",
    tags: ["jacket", "track", "retro", "technical", "water-resistant", "reflective", "mesh"]
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
  },
  {
    id: 4002,
    title: "Slim Fit Chinos",
    price: 2199,
    image: "https://images.unsplash.com/photo-1506629905607-53e103a5c6c2?w=400&h=500&fit=crop",
    description: "Versatile chino pants in premium cotton twill. Tailored slim fit with clean lines, perfect for smart-casual styling and everyday wear.",
    category: "bottoms",
    tags: ["pants", "chino", "slim-fit", "cotton-twill", "smart-casual", "versatile", "tailored"]
  },
  {
    id: 4003,
    title: "Relaxed Joggers",
    price: 1999,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop&sat=-50",
    description: "Comfortable joggers in premium French terry fabric. Features tapered fit, elastic waistband, and side pockets for maximum comfort.",
    category: "bottoms",
    tags: ["joggers", "relaxed", "french-terry", "tapered", "elastic", "comfort", "pockets"]
  },
  {
    id: 4004,
    title: "Wide Leg Trousers",
    price: 2699,
    image: "https://images.unsplash.com/photo-1506629905607-53e103a5c6c2?w=400&h=500&fit=crop&hue=120",
    description: "Contemporary wide leg trousers in premium wool blend. Modern silhouette with sophisticated drape and professional finish.",
    category: "bottoms",
    tags: ["trousers", "wide-leg", "wool-blend", "contemporary", "sophisticated", "professional"]
  },
  {
    id: 4005,
    title: "Distressed Jeans",
    price: 2899,
    image: "https://images.unsplash.com/photo-1542272454315-7ad85f8b0f8a?w=400&h=500&fit=crop",
    description: "Premium distressed jeans with authentic wear patterns. Crafted from high-quality denim with comfortable stretch and modern fit.",
    category: "bottoms",
    tags: ["jeans", "distressed", "premium", "authentic", "stretch", "modern", "denim"]
  },
  {
    id: 4006,
    title: "Tech Sweatpants",
    price: 2299,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop&hue=300",
    description: "Modern sweatpants with technical fabric blend. Features moisture-wicking properties, zippered pockets, and athletic-inspired design.",
    category: "bottoms",
    tags: ["sweatpants", "tech", "moisture-wicking", "zippered", "athletic", "modern", "technical"]
  }
];

// Product Categories
export const CATEGORIES = {
  ALL: 'all',
  TSHIRTS: 'tshirts',
  HOODIES: 'hoodies',
  JACKETS: 'jackets',
  BOTTOMS: 'bottoms'
};

// Available sizes for products
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// T-shirt customization options
export const CUSTOMIZATION_OPTIONS = {
  COLORS: [
    { name: 'Black', code: 'black', hex: '#000000' },
    { name: 'White', code: 'white', hex: '#ffffff' },
    { name: 'Navy', code: 'navy', hex: '#1e3a8a' },
    { name: 'Grey', code: 'grey', hex: '#6b7280' },
    { name: 'Red', code: 'red', hex: '#dc2626' },
    { name: 'Green', code: 'green', hex: '#16a34a' }
  ],
  
  FONTS: [
    { name: 'Modern', family: 'Poppins' },
    { name: 'Elegant', family: 'Playfair Display' },
    { name: 'Script', family: 'Dancing Script' },
    { name: 'Bold', family: 'Oswald' }
  ],
  
  PLACEMENTS: [
    { name: 'Right Chest', code: 'right-chest' },
    { name: 'Left Chest', code: 'left-chest' },
    { name: 'Collar Inner', code: 'collar-inner' },
    { name: 'Collar Outer', code: 'collar-outer' },
    { name: 'Right Sleeve', code: 'right-sleeve' },
    { name: 'Left Sleeve', code: 'left-sleeve' }
  ]
};

// Price ranges for potential filtering
export const PRICE_RANGES = [
  { label: 'Under Rs. 1,500', min: 0, max: 1500 },
  { label: 'Rs. 1,500 - Rs. 2,500', min: 1500, max: 2500 },
  { label: 'Rs. 2,500 - Rs. 3,500', min: 2500, max: 3500 },
  { label: 'Above Rs. 3,500', min: 3500, max: Infinity }
];

// Featured product IDs (for homepage display)
export const FEATURED_PRODUCTS = [1001, 1002, 2001, 3001, 4001, 1003, 2002, 3002];

// New arrivals (latest products)
export const NEW_ARRIVALS = [1006, 2004, 3004, 4006];

// Utility functions for product operations
export const ProductUtils = {
  // Get products by category
  getProductsByCategory: (category) => {
    if (category === 'all') return PRODUCTS;
    return PRODUCTS.filter(product => product.category === category);
  },
  
  // Get products by price range
  getProductsByPriceRange: (minPrice, maxPrice) => {
    return PRODUCTS.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );
  },
  
  // Search products
  searchProducts: (query) => {
    const searchTerm = query.toLowerCase();
    return PRODUCTS.filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  },
  
  // Get product by ID
  getProductById: (id) => {
    return PRODUCTS.find(product => product.id === id);
  },
  
  // Get featured products
  getFeaturedProducts: () => {
    return PRODUCTS.filter(product => FEATURED_PRODUCTS.includes(product.id));
  },
  
  // Get new arrivals
  getNewArrivals: () => {
    return PRODUCTS.filter(product => NEW_ARRIVALS.includes(product.id));
  },
  
  // Get customizable products (T-shirts only)
  getCustomizableProducts: () => {
    return PRODUCTS.filter(product => product.category === 'tshirts');
  },
  
  // Get products by tag
  getProductsByTag: (tag) => {
    return PRODUCTS.filter(product => 
      product.tags.includes(tag.toLowerCase())
    );
  },
  
  // Sort products
  sortProducts: (products, sortBy) => {
    switch (sortBy) {
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price);
      case 'name-asc':
        return [...products].sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc':
        return [...products].sort((a, b) => b.title.localeCompare(a.title));
      case 'newest':
        return [...products].sort((a, b) => b.id - a.id);
      case 'oldest':
        return [...products].sort((a, b) => a.id - b.id);
      default:
        return products;
    }
  },
  
  // Get random products
  getRandomProducts: (count = 4, excludeId = null) => {
    let availableProducts = excludeId ? 
      PRODUCTS.filter(p => p.id !== excludeId) : 
      PRODUCTS;
    
    const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },
  
  // Get related products (by category and tags)
  getRelatedProducts: (productId, count = 4) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return [];
    
    // First try to get products from same category
    let related = PRODUCTS
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, count);
    
    // If not enough, add products with similar tags
    if (related.length < count) {
      const additional = PRODUCTS
        .filter(p => p.id !== productId && !related.includes(p))
        .filter(p => p.tags.some(tag => product.tags.includes(tag)))
        .slice(0, count - related.length);
      
      related = [...related, ...additional];
    }
    
    // If still not enough, fill with random products
    if (related.length < count) {
      const remaining = PRODUCTS
        .filter(p => p.id !== productId && !related.includes(p))
        .slice(0, count - related.length);
      
      related = [...related, ...remaining];
    }
    
    return related.slice(0, count);
  },
  
  // Get bestsellers (simulate based on lower IDs being older/more popular)
  getBestsellers: (count = 8) => {
    return PRODUCTS
      .sort((a, b) => a.id - b.id)
      .slice(0, count);
  },
  
  // Filter products by multiple criteria
  filterProducts: (filters) => {
    let filtered = [...PRODUCTS];
    
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= filters.minPrice);
    }
    
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }
    
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(p => 
        filters.tags.some(tag => p.tags.includes(tag))
      );
    }
    
    if (filters.customizable) {
      filtered = filtered.filter(p => p.category === 'tshirts');
    }
    
    return filtered;
  },
  
  // Get price statistics
  getPriceStats: () => {
    const prices = PRODUCTS.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
      median: prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)]
    };
  },
  
  // Get category statistics
  getCategoryStats: () => {
    const stats = {};
    PRODUCTS.forEach(product => {
      stats[product.category] = (stats[product.category] || 0) + 1;
    });
    return stats;
  }
};

// Validation functions
export const ValidationUtils = {
  // Validate customization data
  validateCustomization: (customData) => {
    const errors = [];
    
    if (!customData.color || !CUSTOMIZATION_OPTIONS.COLORS.find(c => c.code === customData.color)) {
      errors.push('Invalid color selection');
    }
    
    if (!customData.size || !SIZES.includes(customData.size)) {
      errors.push('Invalid size selection');
    }
    
    if (!customData.initials || customData.initials.length === 0 || customData.initials.length > 3) {
      errors.push('Initials must be 1-3 characters');
    }
    
    if (!customData.font || !CUSTOMIZATION_OPTIONS.FONTS.find(f => f.family === customData.font)) {
      errors.push('Invalid font selection');
    }
    
    if (!customData.placement || !CUSTOMIZATION_OPTIONS.PLACEMENTS.find(p => p.code === customData.placement)) {
      errors.push('Invalid placement selection');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  },
  
  // Validate product ID
  validateProductId: (id) => {
    return PRODUCTS.some(p => p.id === parseInt(id));
  },
  
  // Validate size
  validateSize: (size) => {
    return SIZES.includes(size);
  }
};

// Export default as PRODUCTS for backward compatibility
export default PRODUCTS;

// Console log for debugging
console.log(`📦 BEEYUH Products loaded: ${PRODUCTS.length} items`);
console.log(`🎨 Customizable T-shirts: ${PRODUCTS.filter(p => p.category === 'tshirts').length} items`);
console.log(`💰 Price range: Rs. ${Math.min(...PRODUCTS.map(p => p.price)).toLocaleString()} - Rs. ${Math.max(...PRODUCTS.map(p => p.price)).toLocaleString()}`);
