// Analytics Configuration and Event Tracking
// This file handles all analytics-related functionality

(function() {
    'use strict';

    // Analytics Configuration
    const AnalyticsConfig = {
        // Replace with your actual Google Analytics ID
        GA_ID: 'G-TSG0RK9QDY',
        
        // Event tracking configuration
        trackClicks: true,
        trackFormSubmissions: true,
        trackImageViews: true,
        trackScrollDepth: true,
        trackTimeOnPage: true
    };

    // Initialize Analytics
    function initAnalytics() {
        // Only track if analytics is properly configured
        if (typeof gtag !== 'function') {
            console.log('Analytics not configured - add your GA4 Measurement ID');
            return;
        }

        setupEventTracking();
        setupScrollTracking();
        setupTimeTracking();
        setupFormTracking();
    }

    // Track Button Clicks
    function setupEventTracking() {
        if (!AnalyticsConfig.trackClicks) return;

        // Track CTA button clicks
        document.querySelectorAll('.btn-primary, .btn-large').forEach(button => {
            button.addEventListener('click', function(e) {
                const buttonText = this.textContent.trim();
                trackEvent('click', 'cta_button', {
                    button_text: buttonText,
                    page_location: window.location.href
                });
            });
        });

        // Track navigation clicks
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function(e) {
                const linkText = this.textContent.trim();
                trackEvent('click', 'navigation', {
                    link_text: linkText,
                    destination: this.getAttribute('href')
                });
            });
        });

        // Track image modal opens
        document.querySelectorAll('.clickable-image').forEach(image => {
            image.addEventListener('click', function(e) {
                trackEvent('engagement', 'image_view', {
                    image_src: this.src,
                    image_alt: this.alt
                });
            });
        });

        // Track carousel interactions
        document.querySelectorAll('[class*="carousel-btn"]').forEach(button => {
            button.addEventListener('click', function(e) {
                const carouselType = this.className.includes('prev') ? 'previous' : 'next';
                const sectionType = this.className.split('-')[0]; // e.g., 'solution', 'features'
                trackEvent('engagement', 'carousel_navigation', {
                    carousel_type: sectionType,
                    direction: carouselType
                });
            });
        });
    }

    // Track Form Submissions
    function setupFormTracking() {
        if (!AnalyticsConfig.trackFormSubmissions) return;

        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                const formData = new FormData(this);
                trackEvent('generate_lead', 'contact_form', {
                    customer_type: formData.get('customer_type') || 'unknown',
                    has_company: !!formData.get('company'),
                    has_message: !!formData.get('message')
                });
            });
        }

        // Track form field interactions
        const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                trackEvent('engagement', 'form_field_focus', {
                    field_name: this.name || this.id
                });
            });
        });
    }

    // Track Scroll Depth
    function setupScrollTracking() {
        if (!AnalyticsConfig.trackScrollDepth) return;

        let scrollDepths = [25, 50, 75, 90];
        let trackedDepths = [];

        window.addEventListener('scroll', throttle(function() {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            scrollDepths.forEach(depth => {
                if (scrollPercent >= depth && !trackedDepths.includes(depth)) {
                    trackedDepths.push(depth);
                    trackEvent('scroll', 'page_scroll', {
                        percent_scrolled: depth
                    });
                }
            });
        }, 1000));
    }

    // Track Time on Page
    function setupTimeTracking() {
        if (!AnalyticsConfig.trackTimeOnPage) return;

        let startTime = Date.now();
        let timeThresholds = [30, 60, 120, 300]; // seconds
        let trackedTimes = [];

        setInterval(function() {
            const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
            
            timeThresholds.forEach(threshold => {
                if (timeOnPage >= threshold && !trackedTimes.includes(threshold)) {
                    trackedTimes.push(threshold);
                    trackEvent('engagement', 'time_on_page', {
                        time_threshold: threshold
                    });
                }
            });
        }, 10000); // Check every 10 seconds
    }

    // Generic event tracking function
    function trackEvent(action, category, parameters = {}) {
        if (typeof gtag === 'function') {
            gtag('event', action, {
                event_category: category,
                ...parameters
            });
        }
        
        // Log to console for debugging (remove in production)
        console.log('Analytics Event:', { action, category, parameters });
    }

    // Track page sections viewed
    function trackSectionViews() {
        const sections = document.querySelectorAll('section[id]');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    trackEvent('engagement', 'section_view', {
                        section_name: entry.target.id
                    });
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -10% 0px'
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Utility function to throttle scroll events
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

    // Track page view with custom parameters
    function trackPageView() {
        if (typeof gtag === 'function') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                content_group: 'landing_page',
                user_agent: navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop'
            });
        }
    }

    // Track bounce rate (time before leaving)
    function trackBounceRate() {
        let isUnloading = false;
        
        window.addEventListener('beforeunload', function() {
            if (!isUnloading) {
                isUnloading = true;
                const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
                trackEvent('engagement', 'page_exit', {
                    time_on_page: timeOnPage
                });
            }
        });
    }

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initAnalytics();
            trackSectionViews();
            trackBounceRate();
        });
    } else {
        initAnalytics();
        trackSectionViews();
        trackBounceRate();
    }

    // Track initial page view
    trackPageView();

    // Export functions for manual tracking if needed
    window.trackCustomEvent = trackEvent;
    
    // Track performance metrics
    window.addEventListener('load', function() {
        setTimeout(function() {
            if (window.performance && window.performance.timing) {
                const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
                trackEvent('performance', 'page_load_time', {
                    load_time_ms: loadTime
                });
            }
        }, 0);
    });

    let startTime = Date.now();
})();
