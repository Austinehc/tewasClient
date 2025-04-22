// Simple pagination for the gallery grid
// Assumes each .gallery-item is a direct child of .gallery-grid

document.addEventListener('DOMContentLoaded', function() {
    const ITEMS_PER_PAGE = 6; // Change as needed
    const grid = document.querySelector('.gallery-grid');
    const items = Array.from(document.querySelectorAll('.gallery-item'));
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'gallery-pagination';
    grid.parentNode.appendChild(paginationContainer);

    let currentPage = 1;
    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

    function renderPage(page) {
        // Hide all items
        items.forEach(item => item.style.display = 'none');
        // Show only items for this page
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        items.slice(start, end).forEach(item => item.style.display = 'block');
        renderPagination(page);
    }

    function renderPagination(page) {
        paginationContainer.innerHTML = '';
        if (totalPages <= 1) return;
        // Prev button
        const prev = document.createElement('button');
        prev.textContent = 'Prev';
        prev.disabled = page === 1;
        prev.onclick = () => goToPage(page - 1);
        paginationContainer.appendChild(prev);
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            if (i === page) btn.classList.add('active');
            btn.onclick = () => goToPage(i);
            paginationContainer.appendChild(btn);
        }
        // Next button
        const next = document.createElement('button');
        next.textContent = 'Next';
        next.disabled = page === totalPages;
        next.onclick = () => goToPage(page + 1);
        paginationContainer.appendChild(next);
    }

    function goToPage(page) {
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        renderPage(currentPage);
    }

    // Only paginate if more than 1 page
    if (totalPages > 1) {
        renderPage(currentPage);
    }
});
