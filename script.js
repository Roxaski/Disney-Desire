const mobileNav = document.querySelector('nav');
const logo = document.querySelector('.logo');
const menu = document.querySelector('.hamburger_menu');
const main = document.querySelector('main');

menu.addEventListener('click', toggleHamburgerMenu);
// toggles the hamburger menu, along with disabling scroll when menu is open
function toggleHamburgerMenu() {
    mobileNav.classList.toggle('active');
    const active = mobileNav.classList.contains('active');
    document.body.classList.toggle('no-scroll');
    // prevents these elements from being focused, clicked, or read by screen readers
    main.inert = active;
    logo.inert = active;

    // adds or removes the esc key event listener when the hamburger menu is open or closed
    if (active) {
        document.addEventListener('keydown', escapeKeyPress);
    } else {
        document.removeEventListener('keydown', escapeKeyPress);
    };
};

function escapeKeyPress(e) {
    if (e.key === 'Escape') {
        toggleHamburgerMenu();
    };
};