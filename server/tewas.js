/**
 * TEWAS Enterprise - Main JavaScript File
 * 
 * Handles all interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // ================ GLOBAL VARIABLES ================
    const DOM = {
        // Navigation elements
        hamburger: document.querySelector('.hamburger'),
        navLinks: document.querySelector('.nav-links'),
        navLinksAll: document.querySelectorAll('.nav-links a'),
        mainNav: document.querySelector('.main-nav'),
        
        // Hero slider elements
        heroSlides: document.querySelectorAll('.hero-slide'),
        sliderPrev: document.querySelector('.slider-prev'),
        sliderNext: document.querySelector('.slider-next'),
        sliderDotsContainer: document.querySelector('.slider-dots'),
        
        // Testimonial slider elements
        testimonialSlides: document.querySelectorAll('.testimonial-slide'),
        testimonialDotsContainer: document.querySelector('.testimonial-slider .slider-dots'),
        
        // Equipment filter elements
        filterButtons: document.querySelectorAll('.filter-btn'),
        equipmentItems: document.querySelectorAll('.equipment-card'),
        
        // Form elements
        contactForm: document.querySelector('.contact-form'),
        quoteButtons: document.querySelectorAll('.btn-quote')
    };
    
    let currentSlide = 0;
    let currentTestimonial = 0;
    let slideInterval;
    let testimonialInterval;
    
    // ================ INITIALIZATION ================
    initNavigation();
    initHeroSlider();
    initTestimonialSlider();
    initEquipmentFilter();
    initForms();
    initScrollEffects();
    
    // ================ NAVIGATION ================
    function initNavigation() {
        // Mobile menu toggle
        if (DOM.hamburger) {
            DOM.hamburger.addEventListener('click', function() {
                this.classList.toggle('active');
                DOM.navLinks.classList.toggle('active');
            });
        }
        
        // Close mobile menu when clicking on a link
        if (DOM.navLinksAll) {
            DOM.navLinksAll.forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        DOM.hamburger.classList.remove('active');
                        DOM.navLinks.classList.remove('active');
                    }
                });
            });
        }
        
        // Sticky navigation on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                DOM.mainNav.classList.add('scrolled');
            } else {
                DOM.mainNav.classList.remove('scrolled');
            }
        });
    }
    
    // ================ HERO SLIDER ================
    function initHeroSlider() {
        if (!DOM.heroSlides.length) return;
        
        // Create dots for slider navigation
        DOM.heroSlides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            DOM.sliderDotsContainer.appendChild(dot);
        });
        
        // Set up event listeners for prev/next buttons
        if (DOM.sliderPrev) {
            DOM.sliderPrev.addEventListener('click', () => {
                pauseSlider();
                prevSlide();
            });
        }
        
        if (DOM.sliderNext) {
            DOM.sliderNext.addEventListener('click', () => {
                pauseSlider();
                nextSlide();
            });
        }
        
        // Start auto-sliding
        startSlider();
        
        // Pause slider when hovering
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseenter', pauseSlider);
            hero.addEventListener('mouseleave', startSlider);
        }
    }
    
    function startSlider() {
        slideInterval = setInterval(nextSlide, 200);

    }
    
    function pauseSlider() {
        clearInterval(slideInterval);
    }
    
    function nextSlide() {
        goToSlide((currentSlide + 1) % DOM.heroSlides.length);
    }
    
    function prevSlide() {
        goToSlide((currentSlide - 1 + DOM.heroSlides.length) % DOM.heroSlides.length);
    }
    
    function goToSlide(index) {
        DOM.heroSlides[currentSlide].classList.remove('active');
        document.querySelectorAll('.slider-dot')[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        DOM.heroSlides[currentSlide].classList.add('active');
        document.querySelectorAll('.slider-dot')[currentSlide].classList.add('active');
    } 
    
    // ================ TESTIMONIAL SLIDER ================
    function initTestimonialSlider() {
        if (!DOM.testimonialSlides.length) return;
        
        // Create dots for testimonial navigation
        DOM.testimonialSlides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(index));
            DOM.testimonialDotsContainer.appendChild(dot);
        });
        
        // Start auto-sliding
        startTestimonialSlider();
    }
    
    function startTestimonialSlider() {
        testimonialInterval = setInterval(nextTestimonial, 7000);
    }
    
    function nextTestimonial() {
        goToTestimonial((currentTestimonial + 1) % DOM.testimonialSlides.length);
    }
    
    function goToTestimonial(index) {
        DOM.testimonialSlides[currentTestimonial].classList.remove('active');
        document.querySelectorAll('.testimonial-slider .slider-dot')[currentTestimonial].classList.remove('active');
        
        currentTestimonial = index;
        
        DOM.testimonialSlides[currentTestimonial].classList.add('active');
        document.querySelectorAll('.testimonial-slider .slider-dot')[currentTestimonial].classList.add('active');
    }
    
    // ================ EQUIPMENT FILTER ================
    function initEquipmentFilter() {
        if (!DOM.filterButtons.length) return;
        
        DOM.filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                DOM.filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter equipment items
                DOM.equipmentItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // ================ FORM HANDLING ================
    function initForms() {
        // Contact form submission
        if (DOM.contactForm) {
            DOM.contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const message = document.getElementById('message').value.trim();
                
                // Simple validation
                if (!name || !email || !message) {
                    alert('Please fill in all fields');
                    return;
                }
                
                if (!validateEmail(email)) {
                    alert('Please enter a valid email address');
                    return;
                }
                
                // In a real implementation, you would send the data to a server here
                alert(`Thank you, ${name}! Your message has been sent. We'll contact you soon.`);
                
                // Reset the form
                this.reset();
            });
        }
        
        // Quote buttons
        if (DOM.quoteButtons) {
            DOM.quoteButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const equipment = this.getAttribute('data-equipment');
                    // In a real implementation, you would redirect to a quote page with the equipment info
                    window.location.href = `quote.html?equipment=${equipment}`;
                });
            });
        }
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ================ SCROLL EFFECTS ================
    function initScrollEffects() {
        // Animate elements when they come into view
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.service-card, .equipment-card, .feature-card');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Set initial state for animated elements
        const animatedElements = document.querySelectorAll('.service-card, .equipment-card, .feature-card');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Run on load and scroll
        window.addEventListener('load', animateOnScroll);
        window.addEventListener('scroll', animateOnScroll);
    }
});