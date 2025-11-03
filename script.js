let nav = document.querySelector('nav');
let mobileNav = document.querySelector('.hamburger_menu');

// toggles hamburger menu
mobileNav.addEventListener('click', () => {
    nav.classList.toggle('active')
});

// disable scroll when hamburger menu is open
mobileNav.addEventListener('click', () => {
    document.body.classList.toggle('no-scroll');
});