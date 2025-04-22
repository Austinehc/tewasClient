/**
 * Equipment Page JavaScript
 * Handles page-specific functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Equipment Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const equipmentCards = document.querySelectorAll('.equipment-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter equipment cards
            equipmentCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Update URL without reload
            if (history.pushState) {
                const newUrl = window.location.pathname + '?filter=' + filterValue;
                history.pushState(null, null, newUrl);
            }
        });
    });
    
    // Check for filter parameter in URL on load
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    
    if (filterParam) {
        const activeButton = document.querySelector(`.filter-btn[data-filter="${filterParam}"]`);
        if (activeButton) {
            activeButton.click();
        }
    }
    
    // Animation for equipment cards when they come into view
    const animateEquipmentCards = function() {
        const cards = document.querySelectorAll('.equipment-card:not([style*="display: none"])');
        
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    equipmentCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateEquipmentCards);
    window.addEventListener('scroll', animateEquipmentCards);
    
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