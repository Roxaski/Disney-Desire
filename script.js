const mobileNav = document.querySelector('nav');
const mobileLogo = document.querySelector('.mobile_logo a');
const links = document.querySelector('.links');
const menu = document.querySelector('.hamburger_menu');

menu.addEventListener('click', toggleHamburgerMenu);
document.addEventListener('keydown', handleEscape);

// adds the focus event listener but only if the mobile logo exists
if (mobileLogo) {
    mobileLogo.addEventListener('focusin', removeLogoFocus);
};

// toggles the hamburger menu, along with disabling scroll when menu is open
function toggleHamburgerMenu() {
    mobileNav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
};

// closes the hamburger menu
function handleEscape(e) {
    if (e.key !== 'Escape') return;

    // hides the overlay
    if (mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };
};

function removeLogoFocus(e) {
    // checks if the nav contains the active class
    if (mobileNav.classList.contains('active')) {
        // removes the focus from the logo
        e.currentTarget.blur();
        // makes the hamburger menu be the focus when nav is active
        menu.focus();
    };
};