/* alerts.js - Easy to Edit Alert System for BEEYUH */

/*
===============================================
📝 HOW TO EDIT ALERTS (NO CODING NEEDED):
===============================================

1. TO ADD A POPUP ALERT:
   - Change popup message to your text
   - Set title for the popup
   - Leave message empty ("") to disable popup

2. TO ADD NOTIFICATIONS:
   - Add new objects to the notifications array
   - Each notification needs: title, message, time
   - Remove notifications by deleting the entire { } block

3. TO DISABLE ALL ALERTS:
   - Set popup message to ""
   - Set notifications to []

4. TO SHOW ONLY POPUP:
   - Add popup message
   - Set notifications to []

5. TO SHOW ONLY NOTIFICATIONS:
   - Set popup message to ""
   - Add items to notifications array

6. FORMATTING TIPS:
   - Keep messages short and clear
   - Use exciting language for offers
   - Include expiry dates for limited offers
   - Use emojis to make alerts more attractive

===============================================
*/

const ALERTS = {
  
  // ===== POPUP ALERT =====
  // This shows as a popup overlay when someone visits the website
  // Leave message empty ("") to disable popup
  popup: {
    title: "🔥 Welcome to BE☰YUH!", 
    message: "Get 25% OFF on all t-shirts + FREE custom initials! Use code: BEEYUH25. Limited time offer ending tonight!"
  },
  
  // ===== NOTIFICATIONS =====
  // These show in the notification panel (bell icon)
  // Add/remove notifications by editing this array
  notifications: [
    {
      title: "🎉 Flash Sale Active!",
      message: "25% OFF on all products + FREE shipping above Rs. 999. Hurry, only few hours left!",
      time: "2 hours ago"
    },
    {
      title: "✨ New Arrival Alert",
      message: "Check out our latest Premium Collection - Merino Wool Blend Tees now available!",
      time: "5 hours ago"
    },
    {
      title: "💝 Free Custom Initials",
      message: "All t-shirts now come with complimentary initial customization. Add your personal touch!",
      time: "1 day ago"
    },
    {
      title: "🚚 Fast Delivery Update",
      message: "Now delivering across India in just 2-3 days! Free shipping on orders above Rs. 999.",
      time: "2 days ago"
    },
    {
      title: "⭐ Customer Milestone",
      message: "Thank you! We've successfully served 10,000+ happy customers. Join our growing family!",
      time: "3 days ago"
    }
  ]
  
  // ===== MORE NOTIFICATION EXAMPLES =====
  // Copy any of these examples to add more notifications:
  
  /*
  
  // SALE NOTIFICATIONS:
  {
    title: "🛍️ Weekend Sale!",
    message: "Flat 30% OFF on Premium Collection. Valid till Sunday midnight!",
    time: "1 hour ago"
  },
  
  {
    title: "💸 Clearance Sale",
    message: "Up to 50% OFF on selected items. Limited stock available!",
    time: "3 hours ago"
  },
  
  // PRODUCT LAUNCHES:
  {
    title: "🆕 Just Launched!",
    message: "Introducing our new Organic Bamboo Collection - eco-friendly and super soft!",
    time: "6 hours ago"
  },
  
  {
    title: "🎨 New Customization Options",
    message: "Now offering 6 new placement positions and 4 font styles for your initials!",
    time: "12 hours ago"
  },
  
  // SEASONAL OFFERS:
  {
    title: "🌟 Festive Special",
    message: "Celebrate the season with 20% OFF + buy 2 get 1 FREE on all basic tees!",
    time: "1 day ago"
  },
  
  {
    title: "☀️ Summer Collection",
    message: "Beat the heat with our lightweight breathable tees. Special summer pricing!",
    time: "2 days ago"
  },
  
  // SHIPPING & SERVICE:
  {
    title: "📦 Express Delivery",
    message: "Same day delivery now available in Mumbai, Delhi, and Bangalore!",
    time: "4 hours ago"
  },
  
  {
    title: "💳 New Payment Options",
    message: "Now accepting UPI, Cards, EMI, and Cash on Delivery. Shop with convenience!",
    time: "1 day ago"
  },
  
  // CUSTOMER APPRECIATION:
  {
    title: "🏆 5-Star Rating Achievement",
    message: "We've maintained 4.8+ star rating from 5000+ reviews. Thank you for your trust!",
    time: "2 days ago"
  },
  
  {
    title: "❤️ Customer Love",
    message: "Over 95% customers return for more purchases. Experience the BEEYUH difference!",
    time: "1 week ago"
  },
  
  // STOCK UPDATES:
  {
    title: "⚡ Restocked!",
    message: "Popular sizes M and L are back in stock for Black Classic Crew Neck Tee!",
    time: "30 minutes ago"
  },
  
  {
    title: "⏰ Limited Stock Alert",
    message: "Only 15 pieces left of Premium Pima Cotton Black Tee in size L. Order now!",
    time: "2 hours ago"
  }
  
  */
};

/*
===============================================
🎯 QUICK TEMPLATES FOR COMMON ALERTS:
===============================================

COPY-PASTE READY TEMPLATES:

// FOR SALES/DISCOUNTS:
{
  title: "🔥 [SALE_NAME]",
  message: "[DISCOUNT]% OFF on [PRODUCTS]. Use code: [CODE]. Valid till [DATE]!",
  time: "[TIME]"
}

// FOR NEW PRODUCTS:
{
  title: "🆕 New Arrival!",
  message: "Introducing [PRODUCT_NAME] - [BRIEF_DESCRIPTION]. Shop now!",
  time: "[TIME]"
}

// FOR LIMITED OFFERS:
{
  title: "⚡ Limited Time!",
  message: "[OFFER_DESCRIPTION]. Only [QUANTITY/TIME] left!",
  time: "[TIME]"
}

// FOR SERVICES:
{
  title: "✨ New Service!",
  message: "[SERVICE_DESCRIPTION]. Now available for all customers!",
  time: "[TIME]"
}

===============================================
*/

/*
===============================================
📱 NOTIFICATION SETTINGS:
===============================================
*/

// Notification display settings (DO NOT EDIT unless you know what you're doing)
const NOTIFICATION_SETTINGS = {
  maxNotifications: 10, // Maximum notifications to show
  autoMarkRead: true, // Auto mark as read when clicked
  showTimestamp: true, // Show time for each notification
  enableSound: false, // Play sound for new notifications
  persistAcrossSessions: false, // Keep notifications after page reload
};

// Popup settings (DO NOT EDIT unless you know what you're doing)
const POPUP_SETTINGS = {
  showOnFirstVisit: true, // Show popup on first visit
  showOnEveryVisit: false, // Show popup every time
  autoCloseAfter: 0, // Auto close after X seconds (0 = manual close only)
  showCloseButton: true, // Show X button to close
  overlayClickToClose: true, // Click outside to close
};

/*
===============================================
🔧 ADVANCED FEATURES (FOR DEVELOPERS):
===============================================
*/

// Function to add notification dynamically (for developers)
function addNotification(title, message, time = 'just now') {
  if (ALERTS.notifications.length >= NOTIFICATION_SETTINGS.maxNotifications) {
    ALERTS.notifications.pop(); // Remove oldest notification
  }
  ALERTS.notifications.unshift({ title, message, time });
}

// Function to clear all notifications (for developers)
function clearAllNotifications() {
  ALERTS.notifications = [];
}

// Function to show popup programmatically (for developers)
function showCustomPopup(title, message) {
  ALERTS.popup = { title, message };
  // Trigger popup display (handled by main script)
}

/*
===============================================
📊 ALERT STATISTICS (AUTO-CALCULATED):
===============================================
*/

const ALERT_STATS = {
  totalNotifications: ALERTS.notifications.length,
  hasPopup: ALERTS.popup && ALERTS.popup.message && ALERTS.popup.message.trim() !== '',
  lastUpdated: new Date().toLocaleString()
};

// Console log for developers
console.log(`
🔔 BEEYUH ALERTS LOADED
======================
Popup Alert: ${ALERT_STATS.hasPopup ? 'ACTIVE' : 'DISABLED'}
Notifications: ${ALERT_STATS.totalNotifications} active
Last Updated: ${ALERT_STATS.lastUpdated}
`);

/*
===============================================
📝 QUICK EDIT EXAMPLES:
===============================================

EXAMPLE 1 - Holiday Sale Popup:
popup: {
  title: "🎄 Christmas Sale!",
  message: "Ho Ho Ho! Get 40% OFF + FREE gift wrapping on all orders. Use code: XMAS40"
}

EXAMPLE 2 - New Product Launch Notification:
{
  title: "🚀 Product Launch!",
  message: "Our new Eco-Friendly Organic Cotton series is here! Limited edition colors available.",
  time: "1 hour ago"
}

EXAMPLE 3 - Shipping Update:
{
  title: "📦 Shipping Update",
  message: "Now delivering to 500+ cities across India. Check if we deliver to your area!",
  time: "Today"
}

EXAMPLE 4 - Customer Milestone:
{
  title: "🎉 Milestone Achieved!",
  message: "We've crossed 1 million t-shirts sold! Thank you for making us India's favorite!",
  time: "Yesterday"
}

===============================================
*/

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ALERTS;
}
