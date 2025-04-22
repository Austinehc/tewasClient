// Gallery slider with center active image and half images on sides
// Navigation buttons appear on hover or tap and hide otherwise

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.gallery-slider');
    const items = Array.from(document.querySelectorAll('.gallery-item'));
    const prevBtn = document.querySelector('.gallery-slider-prev');
    const nextBtn = document.querySelector('.gallery-slider-next');
    let activeIndex = 0;
    const visibleCount = 3; // center + half on each side

    function updateSlider() {
        items.forEach((item, i) => {
            item.classList.remove('active', 'left', 'right', 'hidden');
            item.style.opacity = '';
            item.style.transform = '';
        });
        items.forEach((item, i) => {
            if (i === activeIndex) {
                item.classList.add('active');
                item.style.zIndex = 2;
                item.style.transform = 'scale(1.1)';
                item.style.opacity = 1;
            } else if (i === activeIndex - 1 || (activeIndex === 0 && i === items.length-1)) {
                item.classList.add('left');
                item.style.zIndex = 1;
                item.style.transform = 'translateX(-50%) scale(0.85)';
                item.style.opacity = 0.7;
            } else if (i === activeIndex + 1 || (activeIndex === items.length-1 && i === 0)) {
                item.classList.add('right');
                item.style.zIndex = 1;
                item.style.transform = 'translateX(50%) scale(0.85)';
                item.style.opacity = 0.7;
            } else {
                item.classList.add('hidden');
                item.style.zIndex = 0;
                item.style.opacity = 0;
                item.style.transform = 'scale(0.7)';
            }
        });
        slider.scrollLeft = slider.offsetWidth * (activeIndex - 1) / visibleCount;
    }

    function showNav(show) {
        prevBtn.style.opacity = show ? 1 : 0;
        prevBtn.style.pointerEvents = show ? 'auto' : 'none';
        nextBtn.style.opacity = show ? 1 : 0;
        nextBtn.style.pointerEvents = show ? 'auto' : 'none';
    }

    prevBtn.addEventListener('click', () => {
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        updateSlider();
    });
    nextBtn.addEventListener('click', () => {
        activeIndex = (activeIndex + 1) % items.length;
        updateSlider();
    });

    // Show/hide nav on hover/tap
    let navTimeout;
    function navAppear() {
        showNav(true);
        clearTimeout(navTimeout);
        navTimeout = setTimeout(() => showNav(false), 1500);
    }
    slider.addEventListener('mouseenter', navAppear);
    slider.addEventListener('mousemove', navAppear);
    slider.addEventListener('touchstart', navAppear);
    prevBtn.addEventListener('mouseenter', navAppear);
    nextBtn.addEventListener('mouseenter', navAppear);

    showNav(false);
    updateSlider();
});
