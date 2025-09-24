// BEEYUH - Coming Soon Website JavaScript
// Sophisticated animations and interactions

class BEEYUHWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initAnimations();
        this.initCountdown();
        this.initParticleSystem();
        this.initScrollAnimations();
        this.initNavbarEffects();
        this.initEmailValidation();
        this.initSocialHovers();
        this.initVectorAnimations();
        this.initLoadingSequence();
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Window load event
        window.addEventListener('load', () => {
            this.startLoadingSequence();
        });

        // Scroll events
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));

        // Resize events
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));

        // Mouse movement for parallax
        document.addEventListener('mousemove', this.throttle(this.handleMouseMove.bind(this), 16));

        // Touch events for mobile
        document.addEventListener('touchstart', this.handleTouchStart.bind(this));
        document.addEventListener('touchmove', this.handleTouchMove.bind(this));
    }

    // Loading Sequence Animation
    startLoadingSequence() {
        const elements = [
            '.brand-title',
            '.coming-soon-text',
            '.vector-animations',
            '.email-subscription',
            '.social-links',
            '.features-preview'
        ];

        elements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                setTimeout(() => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                    element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    
                    requestAnimationFrame(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    });
                }, index * 200);
            }
        });
    }

    // Sophisticated Countdown Timer
    initCountdown() {
        const launchDate = new Date('2026-01-01T00:00:00').getTime();
        
        const countdownElement = document.createElement('div');
        countdownElement.className = 'countdown-timer';
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number" id="days">00</span>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number" id="hours">00</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number" id="minutes">00</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number" id="seconds">00</span>
                <span class="countdown-label">Seconds</span>
            </div>
        `;

        // Insert countdown after coming soon text
        const comingSoonText = document.querySelector('.coming-soon-text');
        if (comingSoonText) {
            comingSoonText.appendChild(countdownElement);
        }

        // Add countdown styles dynamically
        this.addCountdownStyles();

        // Update countdown every second
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = launchDate - now;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                this.animateNumber('days', days);
                this.animateNumber('hours', hours);
                this.animateNumber('minutes', minutes);
                this.animateNumber('seconds', seconds);
            }
        };

        setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call
    }

    // Animate number changes in countdown
    animateNumber(elementId, newValue) {
        const element = document.getElementById(elementId);
        if (element) {
            const currentValue = parseInt(element.textContent);
            if (currentValue !== newValue) {
                element.style.transform = 'scale(1.1)';
                element.style.color = '#c9a96e';
                
                setTimeout(() => {
                    element.textContent = newValue.toString().padStart(2, '0');
                    element.style.transform = 'scale(1)';
                    element.style.color = '#000000';
                }, 150);
            }
        }
    }

    // Add countdown styles
    addCountdownStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .countdown-timer {
                display: flex;
                justify-content: center;
                gap: 2rem;
                margin: 2rem 0;
                flex-wrap: wrap;
            }
            
            .countdown-item {
                text-align: center;
                min-width: 80px;
            }
            
            .countdown-number {
                display: block;
                font-size: 2.5rem;
                font-weight: 900;
                color: #000000;
                transition: all 0.3s ease;
                text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .countdown-label {
                display: block;
                font-size: 0.9rem;
                color: #666666;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                margin-top: 0.5rem;
            }
            
            @media (max-width: 768px) {
                .countdown-timer {
                    gap: 1rem;
                }
                
                .countdown-number {
                    font-size: 2rem;
                }
                
                .countdown-item {
                    min-width: 60px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Particle System for Premium Effect
    initParticleSystem() {
        const canvas = document.createElement('canvas');
        canvas.className = 'particle-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        canvas.style.opacity = '0.3';
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const particles = [];
        
        // Resize canvas
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            
            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = '#000000';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
        
        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    // Navbar Effects
    initNavbarEffects() {
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            // Change navbar background on scroll
            if (scrollTop > 50) {
                navbar.style.background = 'rgba(250, 250, 250, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(250, 250, 250, 0.95)';
                navbar.style.boxShadow = 'none';
            }
            
            lastScrollTop = scrollTop;
        });

        // Smooth nav link hover effects
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'translateY(-2px)';
            });
            
            link.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'translateY(0)';
            });
        });
    }

    // Email Validation and Animation
    initEmailValidation() {
        const emailInput = document.querySelector('.email-input');
        const subscribeBtn = document.querySelector('.subscribe-btn');
        const emailForm = document.querySelector('.email-form');
        
        if (emailInput && subscribeBtn) {
            // Real-time validation
            emailInput.addEventListener('input', (e) => {
                const email = e.target.value;
                const isValid = this.validateEmail(email);
                
                if (email.length > 0) {
                    if (isValid) {
                        emailInput.style.borderColor = '#28a745';
                        subscribeBtn.disabled = false;
                        subscribeBtn.style.opacity = '1';
                    } else {
                        emailInput.style.borderColor = '#dc3545';
                        subscribeBtn.disabled = true;
                        subscribeBtn.style.opacity = '0.6';
                    }
                } else {
                    emailInput.style.borderColor = '';
                    subscribeBtn.disabled = false;
                    subscribeBtn.style.opacity = '1';
                }
            });
            
            // Submit handler
            subscribeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const email = emailInput.value;
                
                if (this.validateEmail(email)) {
                    this.handleEmailSubmission(email);
                } else {
                    this.showEmailError();
                }
            });
            
            // Enter key support
            emailInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    subscribeBtn.click();
                }
            });
        }
    }

    // Email validation function
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Handle successful email submission
    handleEmailSubmission(email) {
        const subscribeBtn = document.querySelector('.subscribe-btn');
        const originalText = subscribeBtn.textContent;
        
        // Loading state
        subscribeBtn.textContent = 'Subscribing...';
        subscribeBtn.style.background = '#c9a96e';
        subscribeBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Success state
            subscribeBtn.textContent = 'Subscribed!';
            subscribeBtn.style.background = '#28a745';
            
            // Show success message
            this.showSuccessMessage();
            
            // Reset after delay
            setTimeout(() => {
                subscribeBtn.textContent = originalText;
                subscribeBtn.style.background = '#000000';
                subscribeBtn.disabled = false;
                document.querySelector('.email-input').value = '';
            }, 3000);
        }, 1500);
    }

    // Show success message
    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = 'Thank you! We\'ll notify you when we launch.';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideOutRight 0.5s ease-out forwards';
            setTimeout(() => message.remove(), 500);
        }, 3000);
    }

    // Show email error
    showEmailError() {
        const emailInput = document.querySelector('.email-input');
        emailInput.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            emailInput.style.animation = '';
        }, 500);
    }

    // Vector Animations Enhancement
    initVectorAnimations() {
        const vectors = document.querySelectorAll('.vector-item svg');
        
        vectors.forEach((svg, index) => {
            // Intersection Observer for scroll-triggered animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = `vectorAppear 0.8s ease-out ${index * 0.2}s both`;
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(svg);
            
            // Enhanced hover effects
            svg.addEventListener('mouseenter', () => {
                svg.style.transform = 'scale(1.15) rotate(5deg)';
                svg.style.filter = 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))';
            });
            
            svg.addEventListener('mouseleave', () => {
                svg.style.transform = 'scale(1) rotate(0deg)';
                svg.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))';
            });
        });
        
        // Add vector animation styles
        this.addVectorStyles();
    }

    // Add vector animation styles
    addVectorStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes vectorAppear {
                from {
                    opacity: 0;
                    transform: translateY(50px) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
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
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Social Media Hover Effects
    initSocialHovers() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                // Create ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: rgba(255,255,255,0.3);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                link.style.position = 'relative';
                link.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    width: 60px;
                    height: 60px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Scroll Animations
    initScrollAnimations() {
        const animateOnScroll = document.querySelectorAll('.feature-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInUp 0.8s ease-out both';
                }
            });
        }, { threshold: 0.3 });
        
        animateOnScroll.forEach(item => observer.observe(item));
    }

    // Mouse Movement Parallax
    handleMouseMove(e) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth) - 0.5;
        const yPos = (clientY / innerHeight) - 0.5;
        
        // Apply parallax to floating elements
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            element.style.transform = `translate(${xPos * speed * 20}px, ${yPos * speed * 20}px)`;
        });
        
        // Subtle parallax on brand title
        const brandTitle = document.querySelector('.brand-title');
        if (brandTitle) {
            brandTitle.style.transform = `translate(${xPos * 10}px, ${yPos * 10}px)`;
        }
    }

    // Scroll Handler
    handleScroll() {
        const scrollTop = window.pageYOffset;
        
        // Parallax effect on hero background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrollTop * 0.5}px)`;
        }
    }

    // Resize Handler
    handleResize() {
        // Update particle canvas size
        const canvas = document.querySelector('.particle-canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    // Touch Events for Mobile
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchMove(e) {
        if (!this.touchStartX || !this.touchStartY) return;
        
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        
        const diffX = this.touchStartX - touchEndX;
        const diffY = this.touchStartY - touchEndY;
        
        // Implement touch gestures if needed
        // For now, just reset values
        this.touchStartX = null;
        this.touchStartY = null;
    }

    // Initialize all animations
    initAnimations() {
        // Add CSS for smooth animations
        const style = document.createElement('style');
        style.textContent = `
            .vector-item svg {
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .floating-element {
                transition: transform 0.1s ease-out;
            }
            
            .brand-title {
                transition: transform 0.1s ease-out;
            }
            
            .navbar {
                transition: all 0.3s ease;
            }
            
            .email-input {
                transition: border-color 0.3s ease;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize loading sequence
    initLoadingSequence() {
        // Prevent scrolling during load
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            document.body.style.overflow = '';
            this.startLoadingSequence();
        }, 100);
    }

    // Utility Functions
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
}

// Initialize the website when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BEEYUHWebsite();
});

// Add performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`BEEYUH Website loaded in ${pageLoadTime}ms`);
    });
}

// Service Worker Registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
