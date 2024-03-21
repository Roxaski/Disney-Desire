let nav = document.querySelector('nav');
let mobileNav = document.querySelector('.hamburger_menu');

//HAMBURGER MENU
mobileNav.addEventListener('click', () => {
    nav.classList.toggle('active')
});

//DISABLE SCROLL WHEN NAV ACTIVE
mobileNav.addEventListener('click', () => {
    document.body.classList.toggle('no-scroll');
});