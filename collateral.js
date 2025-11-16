// ==========================================
// BEEYUH - Collateral Images for Carousel
// ==========================================

/**
 * Banner Slider Configuration
 * - Auto-rotates every 5 seconds
 * - Recommended image dimensions: 1920x720px
 * - Images fit edge-to-edge with small padding
 * - Add or remove images as needed
 */

const collateralImages = [
    // Replace these placeholder URLs with your actual banner images
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&h=720&fit=crop',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=720&fit=crop',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=720&fit=crop',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=720&fit=crop',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=720&fit=crop'
];

/**
 * Carousel Settings
 * Modify these values to customize carousel behavior
 */
const carouselSettings = {
    autoPlayInterval: 5000,        // Time between slides (milliseconds)
    transitionDuration: 800,       // Slide transition speed (milliseconds)
    enableLoop: true,              // Loop back to first slide after last
    pauseOnHover: false            // Pause auto-rotation on mouse hover
};

// ==========================================
// USAGE INSTRUCTIONS
// ==========================================

/**
 * HOW TO ADD YOUR OWN IMAGES:
 * 
 * 1. Upload your banner images to an image hosting service:
 *    - Imgur (https://imgur.com)
 *    - Cloudinary (https://cloudinary.com)
 *    - Your own server
 *    - Google Drive (make sure it's public)
 * 
 * 2. Get the direct image URL for each banner
 * 
 * 3. Replace the placeholder URLs in the collateralImages array above
 * 
 * EXAMPLE:
 * const collateralImages = [
 *     'https://i.imgur.com/YOUR_IMAGE_1.jpg',
 *     'https://i.imgur.com/YOUR_IMAGE_2.jpg',
 *     'https://i.imgur.com/YOUR_IMAGE_3.jpg'
 * ];
 * 
 * RECOMMENDED IMAGE SPECS:
 * - Dimensions: 1920x720px (16:3.75 aspect ratio)
 * - Format: JPG or PNG
 * - File size: Under 500KB for fast loading
 * - Quality: High resolution for retina displays
 * 
 * TIPS FOR BEST RESULTS:
 * - Use consistent dimensions across all images
 * - Optimize images before uploading (use TinyPNG or similar)
 * - Test on mobile to ensure text/logos are readable
 * - Keep important content centered (avoid edges)
 * - Use high contrast for better visibility
 */

// ==========================================
// SAMPLE BANNER IDEAS
// ==========================================

/**
 * BANNER CONTENT SUGGESTIONS:
 * 
 * 1. NEW COLLECTION LAUNCH
 *    - "New Arrivals - Spring/Summer 2025"
 *    - Featured product images
 *    - CTA: "Shop Now"
 * 
 * 2. SEASONAL SALE
 *    - "Up to 50% Off - Limited Time"
 *    - Discount codes visible
 *    - CTA: "Grab Deals"
 * 
 * 3. BRAND STORY
 *    - BEEYUH logo with tagline
 *    - Lifestyle photography
 *    - Brand values/mission
 * 
 * 4. CUSTOM T-SHIRT PROMO
 *    - "Design Your Own T-Shirt"
 *    - Showcase customization options
 *    - CTA: "Start Designing"
 * 
 * 5. FREE SHIPPING BANNER
 *    - "Free Shipping on Orders Over ₹999"
 *    - Delivery truck icon
 *    - CTA: "Order Now"
 */

// ==========================================
// ALTERNATIVE IMAGE SOURCES
// ==========================================

/**
 * If you want to use different placeholder images while testing:
 * 
 * Unsplash Fashion Keywords:
 * - https://source.unsplash.com/1920x720/?fashion,clothing
 * - https://source.unsplash.com/1920x720/?streetwear,style
 * - https://source.unsplash.com/1920x720/?tshirt,apparel
 * 
 * Picsum (Random Images):
 * - https://picsum.photos/1920/720
 * 
 * Lorem Picsum with ID (Consistent images):
 * - https://picsum.photos/id/10/1920/720
 * - https://picsum.photos/id/20/1920/720
 */

// ==========================================
// EXAMPLE: MULTIPLE BANNER SETS
// ==========================================

/**
 * You can create different banner sets for different occasions:
 */

// Holiday season banners
const holidayBanners = [
    'https://your-cdn.com/holiday-banner-1.jpg',
    'https://your-cdn.com/holiday-banner-2.jpg',
    'https://your-cdn.com/holiday-banner-3.jpg'
];

// Sale event banners
const saleBanners = [
    'https://your-cdn.com/sale-banner-1.jpg',
    'https://your-cdn.com/sale-banner-2.jpg',
    'https://your-cdn.com/sale-banner-3.jpg'
];

// New arrival banners
const newArrivalBanners = [
    'https://your-cdn.com/new-arrival-1.jpg',
    'https://your-cdn.com/new-arrival-2.jpg',
    'https://your-cdn.com/new-arrival-3.jpg'
];

/**
 * To switch between banner sets, simply change the export:
 * 
 * For holidays: collateralImages = holidayBanners;
 * For sales: collateralImages = saleBanners;
 * For new arrivals: collateralImages = newArrivalBanners;
 */

// ==========================================
// VALIDATION
// ==========================================

// Check if images array is valid
if (collateralImages.length === 0) {
    console.warn('⚠️ BEEYUH Collateral: No images configured. Please add banner images to Collateral.js');
}

// Log carousel configuration on load
console.log('✅ BEEYUH Collateral Loaded:', {
    totalImages: collateralImages.length,
    autoPlayInterval: carouselSettings.autoPlayInterval + 'ms',
    transitionDuration: carouselSettings.transitionDuration + 'ms'
});
