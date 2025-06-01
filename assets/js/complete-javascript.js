/**
 * Aurumeta.World - Complete PopStoic JavaScript
 * Built with PopStoic philosophy - Where Wisdom Meets Innovation
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏛️ Aurumeta.World - PopStoic Platform Initialized');
    
    // Initialize all functionality
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeEmailForms();
    initializeContactForm();
    initializeScrollAnimations();
    initializeHoverEffects();
    initializeFAQ();
    initializeMetricCounters();
    initializeNotificationSystem();
    initializeAnalytics();
    optimizePerformance();
});

/**
 * Mobile Menu Toggle
 */
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Update aria-expanded for accessibility
            const isExpanded = navLinks.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
            
            // Update icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.className = isExpanded ? 'fas fa-times' : 'fas fa-bars';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu when pressing Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    }
}

/**
 * Initialize smooth scrolling for all anchor links
 */
function initializeSmoothScrolling() {
    // Smooth scrolling for CTA button and internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                        const icon = mobileMenuBtn.querySelector('i');
                        if (icon) icon.className = 'fas fa-bars';
                    }
                }
            }
        });
    });
}

/**
 * Initialize email form submission (newsletter signup)
 */
function initializeEmailForms() {
    const emailForms = document.querySelectorAll('.email-form');
    
    emailForms.forEach(form => {
        const emailInput = form.querySelector('.email-input');
        const submitBtn = form.querySelector('.cta-primary');
        
        if (emailInput && submitBtn) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = emailInput.value.trim();
                
                if (validateEmail(email)) {
                    handleEmailSubmission(email, submitBtn);
                } else {
                    showNotification('Please enter a valid email address', 'error');
                    emailInput.focus();
                }
            });
            
            // Real-time validation
            emailInput.addEventListener('blur', function() {
                const email = this.value.trim();
                if (email && !validateEmail(email)) {
                    this.style.borderColor = 'var(--error-red)';
                    showNotification('Please enter a valid email address', 'error');
                } else {
                    this.style.borderColor = '';
                }
            });
        }
    });
}

/**
 * Initialize contact form submission
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.submit-btn') || this.querySelector('.cta-primary');
            
            // Validate required fields
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--error-red)';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Handle form submission
            handleContactFormSubmission(formData, submitBtn);
        });
    }
}

/**
 * Initialize scroll animations
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe different types of elements
    const elementsToObserve = [
        '.section',
        '.content-section',
        '.timeline-item',
        '.solution-item',
        '.problem-block',
        '.contact-card',
        '.team-member'
    ];
    
    elementsToObserve.forEach(selector => {
        document.querySelectorAll(selector).forEach((element, index) => {
            // Set initial state
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
            
            observer.observe(element);
        });
    });
}

/**
 * Initialize hover effects and interactions
 */
function initializeHoverEffects() {
    // Add ripple effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.disabled) {
                createRippleEffect(e, this);
            }
        });
    });
    
    // Enhanced hover effects for solution items
    const solutionItems = document.querySelectorAll('.solution-item');
    
    solutionItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('hover-disabled')) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('hover-disabled')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Track social media clicks
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const platform = this.classList.contains('discord') ? 'discord' :
                           this.classList.contains('twitter') ? 'twitter' :
                           this.classList.contains('telegram') ? 'telegram' : 'unknown';
            
            trackSocialClick(platform);
        });
    });
}

/**
 * Initialize FAQ toggle functionality
 */
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
        
        // Keyboard accessibility
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * Initialize metric counters animation
 */
function initializeMetricCounters() {
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/[^\d]/g, '')) || 0;
                
                if (target > 0) {
                    const increment = Math.max(1, Math.floor(target / 100));
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        
                        const suffix = counter.textContent.match(/[^\d]+$/)?.[0] || '';
                        counter.textContent = formatNumber(current) + suffix;
                    }, 20);
                }
                
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.metric-number').forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * Initialize notification system
 */
function initializeNotificationSystem() {
    // Create notification container if it doesn't exist
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }
}

/**
 * Initialize analytics tracking
 */
function initializeAnalytics() {
    // Track page view
    trackPageView();
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', throttle(() => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if ([25, 50, 75, 90].includes(scrollPercent)) {
                trackScrollDepth(scrollPercent);
            }
        }
    }, 250));
    
    // Track time on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        trackTimeOnPage(timeOnPage);
    });
}

/**
 * Performance optimizations
 */
function optimizePerformance() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Reduce animations on low-performance devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduced-animations');
        
        const style = document.createElement('style');
        style.textContent = `
            .reduced-animations * {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Preload critical resources
    const criticalResources = [
        'assets/css/style.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

/**
 * Validate email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Handle email submission (newsletter signup)
 * @param {string} email - Validated email address
 * @param {HTMLElement} submitBtn - Submit button element
 */
function handleEmailSubmission(email, submitBtn) {
    // Disable button and show loading state
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Joining...';
    
    // TODO: Replace with your actual API endpoint
    console.log('📧 Email submitted:', email);
    
    // Simulate API call
    setTimeout(() => {
        // Success handling
        showNotification('Thank you! You will receive more information about Aurumeta.World soon', 'success');
        
        // Clear form
        const emailInput = submitBtn.closest('form').querySelector('.email-input');
        if (emailInput) emailInput.value = '';
        
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Track conversion
        trackNewsletterSignup(email);
        
    }, 2000);
    
    // Example: Actual API integration
    /*
    fetch('/api/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showNotification('Thank you! You will receive more information about Aurumeta.World soon', 'success');
            emailInput.value = '';
            trackNewsletterSignup(email);
        } else {
            throw new Error(data.message || 'Subscription failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Sorry, something went wrong. Please try again.', 'error');
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    });
    */
}

/**
 * Handle contact form submission
 * @param {FormData} formData - Form data
 * @param {HTMLElement} submitBtn - Submit button element
 */
function handleContactFormSubmission(formData, submitBtn) {
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // TODO: Replace with your actual API endpoint
    console.log('📬 Contact form submitted:', Object.fromEntries(formData));
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        const form = submitBtn.closest('form');
        if (form) form.reset();
        
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Track conversion
        trackContactFormSubmission(formData.get('inquiryType'));
        
    }, 2000);
}

/**
 * Show notification to user
 * @param {string} message - Notification message
 * @param {string} type - Notification type ('success' or 'error')
 */
function showNotification(message, type = 'info') {
    const container = document.querySelector('.notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" aria-label="Close notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        background: ${type === 'success' ? 'var(--success-green)' : type === 'error' ? 'var(--error-red)' : 'var(--vibrant-blue)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        margin-bottom: 1rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        pointer-events: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 400px;
        font-weight: 600;
    `;
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: 1rem;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    `;
    
    closeBtn.addEventListener('click', () => hideNotification(notification));
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.8');
    
    container.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

/**
 * Hide notification with animation
 * @param {HTMLElement} notification - Notification element to hide
 */
function hideNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

/**
 * Create ripple effect on button click
 * @param {Event} e - Click event
 * @param {HTMLElement} button - Button element
 */
function createRippleEffect(e, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    // Add ripple animation keyframes if not exists
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

/**
 * Format number with appropriate suffixes
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
}

/**
 * Throttle function to limit execution frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Analytics Functions (replace with your analytics service)
function trackPageView() {
    console.log('📊 Page view tracked:', window.location.pathname);
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('config', 'GA_TRACKING_ID', {
    //         page_path: window.location.pathname
    //     });
    // }
}

function trackSocialClick(platform) {
    console.log(`🔗 Social click tracked: ${platform}`);
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'social_click', {
    //         'social_platform': platform,
    //         'page_title': document.title
    //     });
    // }
}

function trackNewsletterSignup(email) {
    console.log('📧 Newsletter signup tracked:', email);
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'newsletter_signup', {
    //         'method': 'email',
    //         'page_title': document.title
    //     });
    // }
}

function trackContactFormSubmission(inquiryType) {
    console.log('📬 Contact form submission tracked:', inquiryType);
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'contact_form_submit', {
    //         'inquiry_type': inquiryType,
    //         'page_title': document.title
    //     });
    // }
}

function trackScrollDepth(percent) {
    console.log('📏 Scroll depth tracked:', percent + '%');
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'scroll_depth', {
    //         'percent_scrolled': percent,
    //         'page_title': document.title
    //     });
    // }
}

function trackTimeOnPage(seconds) {
    console.log('⏱️ Time on page tracked:', seconds + 's');
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'time_on_page', {
    //         'value': seconds,
    //         'page_title': document.title
    //     });
    // }
}

// Error handling and debugging
window.addEventListener('error', function(e) {
    console.error('🚨 Aurumeta.World Error:', e.error);
    
    // Send errors to logging service
    // logErrorToService(e.error);
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Show focus indicators when using keyboard navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    // Hide focus indicators when using mouse
    document.body.classList.remove('keyboard-navigation');
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        handleEmailSubmission,
        trackSocialClick,
        formatNumber,
        throttle
    };
}