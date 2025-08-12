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
                
                // Event 2: Send Request Submit
                trackEvent('form_submit', 'contact_request', {
                    event_category: 'conversion',
                    event_label: 'send_request_submitted',
                    customer_type: formData.get('customer_type') || 'unknown',
                    has_company: !!formData.get('company'),
                    has_message: !!formData.get('message'),
                    form_completion_time: getFormCompletionTime(),
                    timestamp: Date.now()
                });

                // Also track as conversion event for GA4
                trackEvent('generate_lead', 'contact_form', {
                    customer_type: formData.get('customer_type') || 'unknown',
                    has_company: !!formData.get('company'),
                    has_message: !!formData.get('message'),
                    value: 1 // Assign value to lead
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

    // Track Contact Modal Events - Send Request Tracking
    function setupContactModalTracking() {
        let formStartTime = null;

        // Track modal open events (Event 1: Send Request Form Open)
        function trackModalOpen(trigger) {
            formStartTime = Date.now(); // Start timing form completion
            
            trackEvent('form_start', 'contact_request', {
                event_category: 'engagement',
                event_label: 'send_request_form_open',
                trigger_element: trigger,
                page_location: window.location.href,
                timestamp: formStartTime
            });

            // Also send a custom GA4 event
            if (typeof gtag === 'function') {
                gtag('event', 'send_request_form_open', {
                    event_category: 'engagement',
                    event_label: 'contact_modal_opened',
                    trigger_source: trigger
                });
            }
        }

        // Get form completion time
        function getFormCompletionTime() {
            if (formStartTime) {
                return Math.floor((Date.now() - formStartTime) / 1000); // in seconds
            }
            return 0;
        }

        // Track all "Get Started" buttons that open the contact modal
        document.querySelectorAll('a[href="#"], a[href="#contact"], .btn-primary').forEach(button => {
            // Check if this button should open the contact modal
            const buttonText = button.textContent.trim();
            if (buttonText.includes('Get Started') || buttonText.includes('Contact')) {
                button.addEventListener('click', function(e) {
                    const triggerInfo = {
                        text: buttonText,
                        location: this.closest('section')?.id || 'unknown',
                        class: this.className
                    };
                    trackModalOpen(JSON.stringify(triggerInfo));
                });
            }
        });

        // Alternative: If you have a specific modal open function, track it directly
        // Override the modal open function if it exists
        if (typeof openContactModal === 'function') {
            const originalOpenModal = openContactModal;
            window.openContactModal = function(...args) {
                trackModalOpen('direct_function_call');
                return originalOpenModal.apply(this, args);
            };
        }

        // Store the function globally for manual tracking
        window.getFormCompletionTime = getFormCompletionTime;
    }

    // Track Contact Modal Events - Enhanced for Send Request
    function setupContactModalTracking() {
        // Track modal open events (Event 1: Form Open)
        function trackModalOpen(trigger) {
            trackEvent('form_start', 'contact_request', {
                event_category: 'engagement',
                event_label: 'send_request_form_open',
                trigger_element: trigger,
                page_location: window.location.href,
                timestamp: Date.now()
            });
        }

        // Track form submission events (Event 2: Form Submit)
        function trackFormSubmission(formData) {
            trackEvent('form_submit', 'contact_request', {
                event_category: 'conversion',
                event_label: 'send_request_form_submit',
                customer_type: formData.get('customer_type') || 'unknown',
                has_company: !!formData.get('company'),
                has_message: !!formData.get('message'),
                form_completion_time: getFormCompletionTime()
            });
        }

        // Track all "Get Started" buttons that open the contact modal
        document.querySelectorAll('.btn-primary, .btn-large').forEach(button => {
            const buttonText = button.textContent.trim();
            if (buttonText.includes('Get Started') || buttonText.includes('Contact')) {
                button.addEventListener('click', function(e) {
                    trackModalOpen(buttonText);
                });
            }
        });

        // Track contact form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            let formStartTime = null;
            
            // Record when user starts interacting with form
            const formInputs = contactForm.querySelectorAll('input, textarea, select');
            formInputs.forEach(input => {
                input.addEventListener('focus', function() {
                    if (!formStartTime) {
                        formStartTime = Date.now();
                    }
                }, { once: true });
            });

            // Track form submission
            contactForm.addEventListener('submit', function(e) {
                const formData = new FormData(this);
                trackFormSubmission(formData);
            });
        }

        // Helper function to calculate form completion time
        function getFormCompletionTime() {
            if (formStartTime) {
                return Math.round((Date.now() - formStartTime) / 1000); // seconds
            }
            return null;
        }

        // Track modal close events (optional)
        const modalCloseButtons = document.querySelectorAll('.close-modal, .btn-cancel');
        modalCloseButtons.forEach(button => {
            button.addEventListener('click', function() {
                trackEvent('form_abandon', 'contact_request', {
                    event_category: 'engagement',
                    event_label: 'send_request_form_close'
                });
            });
        });

        let formStartTime = null;
    }

        // Track actual form submission
        function trackFormSubmission(formData) {
            trackEvent('purchase', 'contact_form_submit', {
                customer_type: formData.get('customer_type') || 'unknown',
                has_company: !!formData.get('company'),
                has_message: !!formData.get('message'),
                form_completion_time: Date.now() - window.modalOpenTime
            });
        }

        // Track "Get Started" button clicks that open modal
        document.querySelectorAll('a[href="#"], a[href="#contact"]').forEach(button => {
            if (button.textContent.includes('Get Started')) {
                button.addEventListener('click', function(e) {
                    window.modalOpenTime = Date.now(); // Store modal open time
                    trackModalOpen('get_started_button');
                });
            }
        });

        // Track modal close events
        const modal = document.getElementById('contactModal');
        if (modal) {
            // Track when modal is shown (if using a modal library)
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        const isVisible = modal.style.display !== 'none' && 
                                         !modal.classList.contains('hidden');
                        if (isVisible && !window.modalTrackingActive) {
                            window.modalTrackingActive = true;
                            window.modalOpenTime = Date.now();
                            trackModalOpen('modal_display_change');
                        } else if (!isVisible && window.modalTrackingActive) {
                            window.modalTrackingActive = false;
                            const timeInModal = Date.now() - (window.modalOpenTime || 0);
                            trackEvent('engagement', 'modal_close', {
                                time_in_modal: timeInModal
                            });
                        }
                    }
                });
            });
            observer.observe(modal, { attributes: true, attributeFilter: ['style', 'class'] });
        }

        // Enhanced form submission tracking
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                const formData = new FormData(this);
                trackFormSubmission(formData);
                
                // Track conversion funnel
                trackEvent('conversion', 'lead_generated', {
                    funnel_step: 'form_submit',
                    lead_quality: formData.get('company') ? 'business' : 'individual'
                });
            });

            // Track form abandonment
            let formStarted = false;
            const formFields = contactForm.querySelectorAll('input, textarea');
            
            formFields.forEach(field => {
                field.addEventListener('input', function() {
                    if (!formStarted) {
                        formStarted = true;
                        trackEvent('begin_checkout', 'form_start', {
                            first_field: this.name || this.id
                        });
                    }
                });
            });

            // Track form abandonment on modal close
            window.addEventListener('beforeunload', function() {
                if (formStarted && window.modalTrackingActive) {
                    trackEvent('abandonment', 'form_abandon', {
                        time_to_abandon: Date.now() - (window.modalOpenTime || 0)
                    });
                }
            });
        }
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
            setupContactModalTracking(); // Add contact modal tracking
        });
    } else {
        initAnalytics();
        trackSectionViews();
        trackBounceRate();
        setupContactModalTracking(); // Add contact modal tracking
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
