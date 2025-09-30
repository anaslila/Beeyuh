/* products.js - Easy to Edit Product Database for BEEYUH Men's T-Shirts */

/*
===============================================
📝 HOW TO EDIT PRODUCTS (NO CODING NEEDED):
===============================================

1. TO ADD A NEW PRODUCT:
   - Copy any existing product block
   - Change the id to a unique number
   - Update title, price, image, description, category, type
   - Set isCustomizable to true if initials can be added

2. TO REMOVE A PRODUCT:
   - Simply delete the entire product block (from { to },)

3. TO EDIT A PRODUCT:
   - Find the product by its title
   - Change any field you want (price, title, etc.)

4. CATEGORIES AVAILABLE:
   - "Basic Tees" - Simple solid color t-shirts
   - "Premium Collection" - High-end t-shirts
   - "Graphic Prints" - T-shirts with designs/prints
   - "Oversized Fit" - Relaxed, oversized t-shirts

5. TYPES FOR FILTERING:
   - "basic" - Basic t-shirts
   - "premium" - Premium quality
   - "graphic" - Graphic designs
   - "oversized" - Oversized fit

6. PRICE FORMAT:
   - Always use numbers without Rs. symbol
   - Example: 1299 (not "Rs. 1299")

7. IMAGE URLS:
   - Use high-quality images
   - Recommended size: 400x500 pixels
   - Must start with https://

8. CUSTOMIZABLE:
   - Set isCustomizable: true for t-shirts that can have initials
   - Set isCustomizable: false for products without customization
*/

const PRODUCTS = [
  // ===== BASIC TEES =====
  {
    id: 1001,
    title: "Classic Black Crew Neck Tee",
    price: 1299,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&facepad=10",
    description: "Premium 100% organic cotton crew neck t-shirt in classic black. Perfect for everyday wear with superior comfort and durability. Can be customized with your initials.",
    category: "Basic Tees",
    type: "basic",
    isCustomizable: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black"]
  },

  // ===== PREMIUM COLLECTION =====
  {
    id: 2001,
    title: "Premium Pima Cotton Black Tee",
    price: 1899,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=500&fit=crop",
    description: "Luxury Pima cotton t-shirt with exceptional softness and durability. Premium black finish with superior drape. Includes custom initial embroidery service.",
    category: "Premium Collection",
    type: "premium",
    isCustomizable: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Premium Black"]
  },

  // ===== GRAPHIC PRINTS =====
  {
    id: 3001,
    title: "Minimalist Logo Print Tee",
    price: 1499,
    image: "https://images.unsplash.com/photo-1583743814966-8936f37f5a40?w=400&h=500&fit=crop",
    description: "Clean minimalist design with subtle BEEYUH logo. Modern typography on premium cotton base. Can add personal initials alongside the design.",
    category: "Graphic Prints",
    type: "graphic",
    isCustomizable: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White"]
  },


  // ===== OVERSIZED FIT =====
  {
    id: 4001,
    title: "Oversized Drop Shoulder Black Tee",
    price: 1699,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
    description: "Trendy oversized fit with dropped shoulders for contemporary street style. Relaxed comfort in premium cotton. Large canvas perfect for statement initials.",
    category: "Oversized Fit",
    type: "oversized",
    isCustomizable: true,
    sizes: ["M", "L", "XL", "XXL", "XXXL"],
    colors: ["Oversized Black"]
  },

  // ===== LIMITED EDITION =====
  {
    id: 5001,
    title: "Limited Edition Charcoal Tee",
    price: 2199,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=500&fit=crop&contrast=10",
    description: "Exclusive limited edition design in premium charcoal. Only 100 pieces available. Includes complimentary initial customization with gold thread embroidery.",
    category: "Premium Collection",
    type: "premium",
    isCustomizable: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Limited Charcoal"]
  },
];

/*
===============================================
🎨 CUSTOMIZATION SETTINGS
===============================================
*/

// Colors available for customization (for custom orders)
const CUSTOM_COLORS = [
  { name: "Black", code: "black", hex: "#000000" },
  { name: "White", code: "white", hex: "#ffffff" },
  { name: "Navy Blue", code: "navy", hex: "#1a237e" },
  { name: "Charcoal Grey", code: "gray", hex: "#424242" },
  { name: "Olive Green", code: "green", hex: "#689f38" },
  { name: "Maroon", code: "red", hex: "#c62828" }
];

// Font options for initial customization
const CUSTOM_FONTS = [
  { name: "Clean", family: "Arial", display: "Modern & Clean" },
  { name: "Classic", family: "serif", display: "Traditional & Elegant" },
  { name: "Bold", family: "Impact", display: "Strong & Bold" },
  { name: "Script", family: "cursive", display: "Stylish & Flowing" }
];

// Placement options for initials
const CUSTOM_PLACEMENTS = [
  { name: "Left Chest", code: "left-chest", description: "Classic position, subtle and professional" },
  { name: "Right Chest", code: "right-chest", description: "Mirror position of left chest" },
  { name: "Center Chest", code: "center-chest", description: "Bold statement positioning" },
  { name: "Left Sleeve", code: "left-sleeve", description: "Modern arm placement" },
  { name: "Right Sleeve", code: "right-sleeve", description: "Contemporary sleeve style" },
  { name: "Back", code: "back", description: "Large statement on back" }
];

// Size guide information
const SIZE_GUIDE = {
  "S": { chest: "36-38", length: "27", shoulder: "17" },
  "M": { chest: "38-40", length: "28", shoulder: "18" },
  "L": { chest: "40-42", length: "29", shoulder: "19" },
  "XL": { chest: "42-44", length: "30", shoulder: "20" },
  "XXL": { chest: "44-46", length: "31", shoulder: "21" },
  "XXXL": { chest: "46-48", length: "32", shoulder: "22" }
};

// Pricing structure
const PRICING = {
  baseCustomization: 200, // Extra charge for adding initials
  premiumThread: 100, // Extra for gold/silver thread
  rushOrder: 300, // Extra for same-day processing
  bulkDiscount: {
    qty5: 0.10, // 10% discount for 5+ items
    qty10: 0.15, // 15% discount for 10+ items
    qty20: 0.20  // 20% discount for 20+ items
  }
};

/*
===============================================
📦 UTILITY FUNCTIONS (DO NOT EDIT)
===============================================
*/

// Get products by category
function getProductsByCategory(category) {
  return PRODUCTS.filter(product => product.category === category);
}

// Get products by type (for filtering)
function getProductsByType(type) {
  if (type === 'all') return PRODUCTS;
  return PRODUCTS.filter(product => product.type === type);
}

// Get product by ID
function getProductById(id) {
  return PRODUCTS.find(product => product.id === id);
}

// Search products
function searchProducts(query) {
  const searchTerm = query.toLowerCase();
  return PRODUCTS.filter(product =>
    product.title.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
}

// Get customizable products only
function getCustomizableProducts() {
  return PRODUCTS.filter(product => product.isCustomizable);
}

// Calculate custom price
function calculateCustomPrice(basePrice, options = {}) {
  let total = basePrice;
  
  if (options.hasInitials) {
    total += PRICING.baseCustomization;
  }
  
  if (options.premiumThread) {
    total += PRICING.premiumThread;
  }
  
  if (options.rushOrder) {
    total += PRICING.rushOrder;
  }
  
  // Apply bulk discount
  if (options.quantity >= 20) {
    total = total * (1 - PRICING.bulkDiscount.qty20);
  } else if (options.quantity >= 10) {
    total = total * (1 - PRICING.bulkDiscount.qty10);
  } else if (options.quantity >= 5) {
    total = total * (1 - PRICING.bulkDiscount.qty5);
  }
  
  return Math.round(total);
}

/*
===============================================
📊 STORE STATISTICS (AUTO-CALCULATED)
===============================================
*/

const STORE_STATS = {
  totalProducts: PRODUCTS.length,
  customizableProducts: PRODUCTS.filter(p => p.isCustomizable).length,
  categories: [...new Set(PRODUCTS.map(p => p.category))].length,
  averagePrice: Math.round(PRODUCTS.reduce((sum, p) => sum + p.price, 0) / PRODUCTS.length),
  priceRange: {
    min: Math.min(...PRODUCTS.map(p => p.price)),
    max: Math.max(...PRODUCTS.map(p => p.price))
  }
};

// Console information for developers
console.log(`
📦 BEEYUH PRODUCTS LOADED
========================
Total Products: ${STORE_STATS.totalProducts}
Customizable: ${STORE_STATS.customizableProducts}
Categories: ${STORE_STATS.categories}
Price Range: Rs. ${STORE_STATS.priceRange.min} - Rs. ${STORE_STATS.priceRange.max}
Average Price: Rs. ${STORE_STATS.averagePrice}
`);

/*
===============================================
📝 QUICK EDIT REFERENCE:
===============================================

To add a new product, copy this template:

{
  id: [UNIQUE_NUMBER],
  title: "[PRODUCT_NAME]",
  price: [PRICE_NUMBER],
  image: "[IMAGE_URL]",
  description: "[PRODUCT_DESCRIPTION]",
  category: "[Basic Tees/Premium Collection/Graphic Prints/Oversized Fit]",
  type: "[basic/premium/graphic/oversized]",
  isCustomizable: [true/false],
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: ["[COLOR_NAME]"]
},

Remember to add a comma after the closing }

===============================================
*/

