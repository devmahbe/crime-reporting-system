// Header functionality
export function initHeader() {
    document.addEventListener("DOMContentLoaded", function() {
        const menuOpenBtn = document.getElementById('menu-open-btn');
        const menuCloseBtn = document.getElementById('menu-close-btn');
        const navigationMenu = document.querySelector('.navigation-menu');
        const body = document.body;

        if (menuOpenBtn && menuCloseBtn && navigationMenu) {
            menuOpenBtn.addEventListener('click', function() {
                body.classList.add('appear-side-bar');
            });

            menuCloseBtn.addEventListener('click', function() {
                body.classList.remove('appear-side-bar');
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navigationMenu.contains(e.target) && !menuOpenBtn.contains(e.target)) {
                    body.classList.remove('appear-side-bar');
                }
            });
        }
    });
}