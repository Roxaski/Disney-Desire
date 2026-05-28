const mobileNav = document.querySelector('nav');
const logo = document.querySelector('.logo');
const menu = document.querySelector('.hamburger_menu');
const main = document.querySelector('main');

menu.addEventListener('click', toggleHamburgerMenu);

// toggles the hamburger menu, along with disabling scroll when menu is open
function toggleHamburgerMenu() {
    mobileNav.classList.toggle('menu-open');
    document.body.classList.toggle('no-scroll');

    // the variable gets updated after it's toggled
    const menuOpen = mobileNav.classList.contains('menu-open');

    // prevents these elements from being focused, clicked, or read by screen readers
    main.inert = menuOpen;
    logo.inert = menuOpen;

    // adds or removes the esc key event listener when the hamburger menu is open or closed
    if (menuOpen) {
        document.removeEventListener('keydown', escapeKeyPress);
    } else {
        document.addEventListener('keydown', escapeKeyPress);
    };
};

// listens for escape key while the hamburger menu is open
function escapeKeyPress(e) {
    if (e.key === 'Escape') {
        toggleHamburgerMenu();
    };
};