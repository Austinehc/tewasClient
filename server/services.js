/**
 * Services Page JavaScript
 * Handles page-specific functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Animation for service categories when they come into view
    const animateServiceCategories = function() {
        const categories = document.querySelectorAll('.service-category');
        
        categories.forEach(category => {
            const categoryPosition = category.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (categoryPosition < screenPosition) {
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const serviceCategories = document.querySelectorAll('.service-category');
    serviceCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateServiceCategories);
    window.addEventListener('scroll', animateServiceCategories);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});