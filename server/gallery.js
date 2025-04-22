/**
 * Gallery Page JavaScript
 * Handles page-specific functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const DOM = {
        filterButtons: document.querySelectorAll('.filter-btn'),
        galleryItems: document.querySelectorAll('.gallery-item'),
        galleryModal: document.querySelector('.gallery-modal'),
        modalImage: document.querySelector('.modal-image'),
        modalTitle: document.querySelector('.modal-title'),
        modalDescription: document.querySelector('.modal-description'),
        modalCategory: document.querySelector('.modal-category'),
        modalDate: document.querySelector('.modal-date'),
        modalClose: document.querySelector('.modal-close'),
        modalPrev: document.querySelector('.modal-prev'),
        modalNext: document.querySelector('.modal-next')
    };

    // State
    let currentFilter = 'all';
    let currentItems = [];
    let currentIndex = 0;

    // Initialize Gallery
    initGallery();

    function initGallery() {
        // Filter functionality
        setupFilters();
        
        // Modal functionality
        setupModal();
        
        // Check for filter in URL
        checkUrlFilter();
        
        // Animation for gallery items
        setupAnimations();
    }

    function setupFilters() {
        DOM.filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active filter button
                DOM.filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Get filter value
                currentFilter = this.getAttribute('data-filter');
                
                // Filter items
                filterItems(currentFilter);
                
                // Update URL
                updateUrlFilter(currentFilter);
            });
        });
    }

    function filterItems(filter) {
        DOM.galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filter === 'all' || itemCategory === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Update current items array for modal navigation
        updateCurrentItems(filter);
    }

    function updateCurrentItems(filter) {
        currentItems = Array.from(DOM.galleryItems).filter(item => {
            if (filter === 'all') return true;
            return item.getAttribute('data-category') === filter;
        });
    }

    function updateUrlFilter(filter) {
        if (history.pushState) {
            const newUrl = window.location.pathname + '?filter=' + filter;
            history.pushState(null, null, newUrl);
        }
    }

    function checkUrlFilter() {
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get('filter');
        
        if (filterParam) {
            const activeButton = document.querySelector(`.filter-btn[data-filter="${filterParam}"]`);
            if (activeButton) {
                activeButton.click();
            }
        }
    }

    function setupModal() {
        // Open modal when clicking on gallery items
        DOM.galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                openModal(this, index);
            });
        });
        
        // Close modal
        DOM.modalClose.addEventListener('click', closeModal);
        DOM.galleryModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
        
        // Navigation
        DOM.modalPrev.addEventListener('click', showPrevItem);
        DOM.modalNext.addEventListener('click', showNextItem);
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!DOM.galleryModal.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    showPrevItem();
                    break;
                case 'ArrowRight':
                    showNextItem();
                    break;
            }
        });
    }

    function openModal(item, index) {
        const imgSrc = item.querySelector('img').src;
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        const category = item.getAttribute('data-category');
        
        // Set modal content
        DOM.modalImage.src = imgSrc;
        DOM.modalImage.alt = title;
        DOM.modalTitle.textContent = title;
        DOM.modalDescription.textContent = description;
        DOM.modalCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1);
       
        
        // Update current index
        currentIndex = currentItems.indexOf(item);
        
        // Show modal
        DOM.galleryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        DOM.galleryModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function showPrevItem() {
        if (currentItems.length === 0) return;
        
        currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
        updateModalContent();
    }

    function showNextItem() {
        if (currentItems.length === 0) return;
        
        currentIndex = (currentIndex + 1) % currentItems.length;
        updateModalContent();
    }

    function updateModalContent() {
        const item = currentItems[currentIndex];
        const imgSrc = item.querySelector('img').src;
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        const category = item.getAttribute('data-category');
        
        DOM.modalImage.src = imgSrc;
        DOM.modalImage.alt = title;
        DOM.modalTitle.textContent = title;
        DOM.modalDescription.textContent = description;
        DOM.modalCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    }

    function setupAnimations() {
        // Set initial state
        DOM.galleryItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Animate on scroll
        window.addEventListener('load', animateItems);
        window.addEventListener('scroll', animateItems);
    }

    function animateItems() {
        DOM.galleryItems.forEach(item => {
            if (item.style.display !== 'none') {
                const itemPosition = item.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (itemPosition < screenPosition) {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }
            }
        });
    }
});