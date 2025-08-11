// This file contains the main JavaScript functionality for the landing page, handling interactions and dynamic content.

// Mobile optimization and image loading enhancements
(function() {
    'use strict';

    // Optimize images for mobile devices
    function optimizeImagesForMobile() {
        const images = document.querySelectorAll('img[loading="lazy"]');

        // Intersection Observer for lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Improve touch interactions on mobile
    function enhanceMobileInteractions() {
        // Add touch-friendly classes for mobile devices
        if (window.innerWidth <= 767) {
            document.body.classList.add('mobile-device');

            // Optimize carousel for touch
            const carouselWrapper = document.querySelector('.carousel-wrapper');
            if (carouselWrapper) {
                carouselWrapper.style.touchAction = 'pan-x';
            }

            // Reduce motion for better performance on mobile
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
                document.body.classList.add('reduce-motion');
            }
        }
    }

    // Responsive image sizing based on device
    function adjustImageSizes() {
        const screenWidth = window.innerWidth;
        const images = document.querySelectorAll('.main-dashboard-screen, .solution-screen-img, .features-screen-gif, .budget-screen-img');

        images.forEach(img => {
            if (screenWidth <= 479) {
                // Small mobile
                img.style.maxWidth = '100%';
                img.style.borderRadius = '6px';
            } else if (screenWidth <= 767) {
                // Mobile
                img.style.maxWidth = '100%';
                img.style.borderRadius = '8px';
            }
        });
    }

    // Initialize mobile optimizations
    document.addEventListener('DOMContentLoaded', function() {
        optimizeImagesForMobile();
        enhanceMobileInteractions();
        adjustImageSizes();
    });

    // Re-adjust on window resize
    window.addEventListener('resize', function() {
        adjustImageSizes();
    });

})();

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality with scroll detection
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');

    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + 100;

        // Add/remove scrolled class for header background
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavigation);

    // Initialize scroll state on page load
    updateActiveNavigation();

    // Enhanced Carousel functionality with swiper-like experience
    const categoryBtns = document.querySelectorAll('.category-btn');
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const prevCard = document.querySelector('.prev-card');
    const nextCard = document.querySelector('.next-card');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const paginationDots = document.querySelectorAll('.pagination-dot');

    let currentSlide = 0;
    const totalSlides = carouselSlides.length;
    let isTransitioning = false;

    // Touch/drag functionality
    let startX = 0;
    let currentX = 0;
    let initialTranslate = 0;
    let isDragging = false;

    // Slide data for preview cards
    const slideData = [
        { icon: '📊', title: 'Traffic & Market', content: 'Analyze traffic sources and market trends with comprehensive analytics' },
        { icon: '🔍', title: 'SEO', content: 'Optimize for search engines with AI insights and comprehensive SEO tools' },
        { icon: '📝', title: 'Content', content: 'Create SEO-ready content with AI assistance and real-time optimization' },
        { icon: '📍', title: 'Local', content: 'Manage local business presence and reviews with advanced analytics' },
        { icon: '🤖', title: 'AI', content: 'Smart campaign optimization and predictive analytics powered by AI' },
        { icon: '📱', title: 'Social', content: 'Social media management and engagement tracking across platforms' },
        { icon: '🎯', title: 'Advertising', content: 'Cross-platform ad management with ROI optimization and targeting' }
    ];

    function updateCarousel(animate = true) {
        if (!carouselTrack) return;

        // Prevent multiple transitions
        if (isTransitioning && animate) return;

        if (animate) {
            isTransitioning = true;
            carouselTrack.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            carouselTrack.style.transition = 'none';
        }

        // Update main carousel position
        const translateX = -currentSlide * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;

        // Update category buttons
        categoryBtns.forEach((btn, index) => {
            btn.classList.toggle('active', index === currentSlide);
        });

        // Update pagination dots
        paginationDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        // Update preview cards
        const prevIndex = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
        const nextIndex = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;

        // Update previous card
        if (prevCard && slideData[prevIndex]) {
            const prevData = slideData[prevIndex];
            const prevCardIcon = prevCard.querySelector('.card-icon');
            const prevCardTitle = prevCard.querySelector('h3');
            const prevCardContent = prevCard.querySelector('.preview-content');

            if (prevCardIcon) prevCardIcon.textContent = prevData.icon;
            if (prevCardTitle) prevCardTitle.textContent = prevData.title;
            if (prevCardContent) prevCardContent.textContent = prevData.content;
        }

        // Update next card
        if (nextCard && slideData[nextIndex]) {
            const nextData = slideData[nextIndex];
            const nextCardIcon = nextCard.querySelector('.card-icon');
            const nextCardTitle = nextCard.querySelector('h3');
            const nextCardContent = nextCard.querySelector('.preview-content');

            if (nextCardIcon) nextCardIcon.textContent = nextData.icon;
            if (nextCardTitle) nextCardTitle.textContent = nextData.title;
            if (nextCardContent) nextCardContent.textContent = nextData.content;
        }

        // Reset transition flag after animation
        if (animate) {
            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        }
    }

    function goToSlide(index, animate = true) {
        if (isTransitioning && animate) return;
        currentSlide = index;
        updateCarousel(animate);
    }

    function nextSlide() {
        if (isTransitioning) return;
        currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        updateCarousel();
    }

    function prevSlide() {
        if (isTransitioning) return;
        currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
        updateCarousel();
    }

    // Touch/Mouse drag functionality
    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    function dragStart(e) {
        if (isTransitioning) return;

        isDragging = true;
        startX = getPositionX(e);
        initialTranslate = -currentSlide * 100;

        carouselTrack.style.transition = 'none';
        carouselWrapper.style.cursor = 'grabbing';

        // Prevent default to avoid text selection
        e.preventDefault();
    }

    function dragMove(e) {
        if (!isDragging || isTransitioning) return;

        currentX = getPositionX(e);
        const diffX = currentX - startX;
        const dragPercentage = (diffX / carouselWrapper.offsetWidth) * 100;
        const newTranslate = initialTranslate + dragPercentage;

        // Add resistance at boundaries
        let finalTranslate = newTranslate;
        const maxTranslate = -(totalSlides - 1) * 100;

        if (newTranslate > 0) {
            finalTranslate = newTranslate * 0.3; // Resistance at start
        } else if (newTranslate < maxTranslate) {
            finalTranslate = maxTranslate + (newTranslate - maxTranslate) * 0.3; // Resistance at end
        }

        carouselTrack.style.transform = `translateX(${finalTranslate}%)`;
    }

    function dragEnd() {
        if (!isDragging) return;

        isDragging = false;
        carouselWrapper.style.cursor = 'grab';

        const diffX = currentX - startX;
        const threshold = carouselWrapper.offsetWidth * 0.2; // 20% threshold

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0 && currentSlide > 0) {
                prevSlide();
            } else if (diffX < 0 && currentSlide < totalSlides - 1) {
                nextSlide();
            } else {
                updateCarousel(); // Snap back to current slide
            }
        } else {
            updateCarousel(); // Snap back to current slide
        }
    }

    // Event listeners for carousel
    categoryBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => goToSlide(index));
    });

    // Pagination dots
    paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Preview card clicks
    if (prevCard) prevCard.addEventListener('click', prevSlide);
    if (nextCard) nextCard.addEventListener('click', nextSlide);

    // Touch events
    if (carouselWrapper) {
        carouselWrapper.style.cursor = 'grab';

        // Mouse events
        carouselWrapper.addEventListener('mousedown', dragStart);
        carouselWrapper.addEventListener('mousemove', dragMove);
        carouselWrapper.addEventListener('mouseup', dragEnd);
        carouselWrapper.addEventListener('mouseleave', dragEnd);

        // Touch events
        carouselWrapper.addEventListener('touchstart', dragStart, { passive: false });
        carouselWrapper.addEventListener('touchmove', dragMove, { passive: false });
        carouselWrapper.addEventListener('touchend', dragEnd);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Auto-play functionality (optional)
    let autoplayInterval;

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 10000); // 10 seconds
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Start autoplay and pause on hover
    if (carouselWrapper) {
        startAutoplay();
        carouselWrapper.addEventListener('mouseenter', stopAutoplay);
        carouselWrapper.addEventListener('mouseleave', startAutoplay);
        carouselWrapper.addEventListener('touchstart', stopAutoplay);
    }

    // Initialize carousel
    updateCarousel(false);

    // Image Modal functionality
    window.openImageModal = function(src, alt) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const caption = document.getElementById('imageCaption');

        if (modal && modalImage && caption) {
            modal.style.display = 'block';
            modalImage.src = src;
            modalImage.alt = alt;
            caption.textContent = alt;

            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeImageModal = function() {
        const modal = document.getElementById('imageModal');
        if (modal) {
            modal.style.display = 'none';

            // Restore body scroll
            document.body.style.overflow = 'auto';
        }
    };

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });

    // Contact Modal functionality - FIXED
    const modal = document.getElementById('contactModal');
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.btn-cancel');

    // Debug: Check if modal elements exist
    console.log('Modal elements found:', {
        modal: !!modal,
        contactForm: !!contactForm,
        successMessage: !!successMessage,
        closeModalBtn: !!closeModalBtn,
        cancelBtn: !!cancelBtn
    });

    function openModal() {
        if (!modal) {
            console.error('Modal element not found!');
            return;
        }

        console.log('Opening modal...');

        // Prevent page scroll and add blur effect to body
        document.body.classList.add('modal-open');

        // Show modal with flex display and center positioning
        modal.style.display = 'flex';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.zIndex = '999999';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';

        // Add show class for animations
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        // Reset form and show form, hide success message
        if (contactForm) {
            contactForm.style.display = 'block';
            contactForm.reset();
        }
        if (successMessage) {
            successMessage.style.display = 'none';
        }

        // Focus on first input
        setTimeout(() => {
            const nameInput = document.getElementById('name');
            if (nameInput) {
                nameInput.focus();
            }
        }, 350); // Delay to allow animation to complete
    }

    function closeModal() {
        if (!modal) return;

        console.log('Closing modal...');

        // Remove show class for exit animation
        modal.classList.remove('show');

        // Remove body blur and restore scroll after animation
        setTimeout(() => {
            document.body.classList.remove('modal-open');
            modal.style.display = 'none';

            // Reset modal state for next time
            if (contactForm) {
                contactForm.style.display = 'block';
                contactForm.reset();

                // Reset submit button state
                const submitBtn = document.querySelector('.btn-submit');
                if (submitBtn) {
                    submitBtn.textContent = 'Send Request';
                    submitBtn.disabled = false;

                }
            }
            if (successMessage) {
                successMessage.style.display = 'none';
            }
        }, 300);
    }

    // Get all "Get Started" buttons
    const getStartedBtns = document.querySelectorAll('.btn-primary');

    console.log('Get Started buttons found:', getStartedBtns.length);

    // Open modal when clicking "Get Started" buttons
    getStartedBtns.forEach((btn, index) => {
        const buttonText = btn.textContent.toLowerCase().trim();
        if (buttonText.includes('get started') || buttonText.includes('get start')) {
            console.log(`Adding click listener to button ${index}:`, btn.textContent);
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Get Started button clicked!');
                openModal();
            });
        }
    });

    // Close modal events
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Set dynamic redirect URL for FormSubmit
    function setFormRedirectURL() {
        const nextInput = document.querySelector('input[name="_next"]');
        if (nextInput) {
            // For direct email usage, set redirect to current domain
            const currentURL = window.location.origin + window.location.pathname;
            nextInput.value = currentURL + '?success=true';
            console.log('FormSubmit redirect URL set to:', nextInput.value);
        }
    }

    // Check for success parameter on page load
    function checkForSuccess() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            // Show modal with success message
            if (modal) {
                openModal();
                
                // Hide form and show success message
                setTimeout(() => {
                    if (contactForm) {
                        contactForm.style.display = 'none';
                    }
                    if (successMessage) {
                        successMessage.style.display = 'block';
                    }
                }, 100);
            }
            
            // Clean up URL by removing the success parameter
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        }
    }
    
    // Initialize form redirect URL and check for success
    setFormRedirectURL();
    checkForSuccess();

    // Note: Form submission is handled naturally by FormSubmit with dynamic redirect




























































    // Pricing toggle functionality
    const toggleLabels = document.querySelectorAll('.toggle-label');
    const prices = document.querySelectorAll('.price');

    toggleLabels.forEach(label => {
        label.addEventListener('click', () => {
            // Remove active class from all labels
            toggleLabels.forEach(l => l.classList.remove('active'));
            // Add active class to clicked label
            label.classList.add('active');

            const period = label.dataset.period;

            // Update all prices
            prices.forEach(price => {
                const monthlyPrice = price.dataset.monthly;
                const yearlyPrice = price.dataset.yearly;

                if (period === 'monthly') {
                    price.textContent = monthlyPrice;
                } else {
                    price.textContent = yearlyPrice;
                }
            });
        });
    });

    // Customer Type Switch functionality
    const customerTypeInputs = document.querySelectorAll('input[name="customerType"]');
    const switchSlider = document.querySelector('.switch-slider');

    if (customerTypeInputs.length > 0 && switchSlider) {
        customerTypeInputs.forEach((input, index) => {
            input.addEventListener('change', function() {
                if (this.checked) {
                    // Move slider based on selected option
                    if (this.value === 'agency') {
                        switchSlider.style.transform = 'translateX(100%)';
                    } else {
                        switchSlider.style.transform = 'translateX(0%)';
                    }

                    // Update text colors
                    const options = document.querySelectorAll('.switch-option');
                    options.forEach((option, optionIndex) => {
                        if (optionIndex === index) {
                            option.style.color = 'white';
                        } else {
                            option.style.color = '#64748b';
                        }
                    });
                }
            });
        });

        // Initialize with default selection (individual)
        const defaultInput = document.querySelector('input[name="customerType"][value="individual"]');
        if (defaultInput && defaultInput.checked) {
            switchSlider.style.transform = 'translateX(0%)';
            const firstOption = document.querySelector('.switch-option');
            if (firstOption) {
                firstOption.style.color = 'white';
            }
        }
    }

    // Make functions available globally for testing
    window.closeModal = closeModal;
    window.openModal = openModal;
});