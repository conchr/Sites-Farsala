/* ============================================================
   ARCHAEOLOGICAL SITES OF FARSALA — PRESENTATION SCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    const slides          = document.querySelectorAll('.slide');
    const totalPages      = slides.length;
    const prevBtn         = document.getElementById('prevBtn');
    const nextBtn         = document.getElementById('nextBtn');
    const progressBar     = document.getElementById('progress-bar');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan  = document.getElementById('totalPages');

    let currentPageIndex = 1;

    // Initialize total pages
    totalPagesSpan.textContent = totalPages;

    // --------------------------------------------------------
    // Update progress bar
    // --------------------------------------------------------
    function updateProgress() {
        const progressPercentage = (currentPageIndex / totalPages) * 100;
        if (progressBar) progressBar.style.width = progressPercentage + '%';
        if (currentPageSpan) currentPageSpan.textContent = currentPageIndex;
    }

    // --------------------------------------------------------
    // Show a specific slide
    // --------------------------------------------------------
    function showPage(index) {
        if (index < 1 || index > totalPages) return;

        slides.forEach(slide => slide.classList.remove('active'));

        const targetPage = document.getElementById('page-' + index);
        if (targetPage) {
            targetPage.classList.add('active');
            targetPage.scrollTop = 0;
        }

        currentPageIndex = index;
        prevBtn.disabled = (index === 1);
        nextBtn.disabled = (index === totalPages);

        updateProgress();
    }

    // --------------------------------------------------------
    // Navigation helpers
    // --------------------------------------------------------
    function nextPage() {
        if (currentPageIndex < totalPages) {
            showPage(currentPageIndex + 1);
        }
    }

    function prevPage() {
        if (currentPageIndex > 1) {
            showPage(currentPageIndex - 1);
        }
    }

    // --------------------------------------------------------
    // Buttons
    // --------------------------------------------------------
    prevBtn.addEventListener('click', prevPage);
    nextBtn.addEventListener('click', nextPage);

    // --------------------------------------------------------
    // Keyboard navigation
    // --------------------------------------------------------
    document.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextPage();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevPage();
        } else if (e.key === 'Home') {
            e.preventDefault();
            showPage(1);
        } else if (e.key === 'End') {
            e.preventDefault();
            showPage(totalPages);
        }
    });

    // --------------------------------------------------------
    // Touch swipe
    // --------------------------------------------------------
    let touchStartX = 0;
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        const threshold = 50;

        if (touchEndX < touchStartX - threshold && currentPageIndex < totalPages) {
            nextPage();
        } else if (touchEndX > touchStartX + threshold && currentPageIndex > 1) {
            prevPage();
        }
    }, { passive: true });

    // --------------------------------------------------------
    // Initialize
    // --------------------------------------------------------
    showPage(1);
});