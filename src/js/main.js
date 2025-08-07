// This file contains the main JavaScript functionality for the landing page, handling interactions and dynamic content.

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

    // Carousel functionality with smooth rolling transitions
    const categoryBtns = document.querySelectorAll('.category-btn');
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const prevCard = document.querySelector('.prev-card');
    const nextCard = document.querySelector('.next-card');
    
    let currentSlide = 0;
    const totalSlides = carouselSlides.length;

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

    function updateCarousel() {
        if (!carouselTrack) return;
        
        // Update main carousel position
        const translateX = -currentSlide * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;

        // Update category buttons
        categoryBtns.forEach((btn, index) => {
            btn.classList.toggle('active', index === currentSlide);
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
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    function nextSlide() {
        currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
        updateCarousel();
    }

    // Event listeners for carousel
    categoryBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => goToSlide(index));
    });

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Preview card clicks
    if (prevCard) prevCard.addEventListener('click', prevSlide);
    if (nextCard) nextCard.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Initialize carousel
    updateCarousel();

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

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = document.querySelector('.btn-submit');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Get form data
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                
                // Simulate form submission delay
                setTimeout(() => {
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Log form data (in real app, you'd send to your backend)
                    console.log('Form submitted:', data);
                    
                    // Show success message
                    contactForm.style.display = 'none';
                    if (successMessage) {
                        successMessage.style.display = 'block';
                    }
                }, 1500);
            }
        });
    }

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

    // Make functions available globally for testing
    window.closeModal = closeModal;
    window.openModal = openModal;
});