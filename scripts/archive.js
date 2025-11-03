const scrollToTop = document.querySelector('.scroll-top');
const scrollToTopMobile = document.querySelector('.scroll-top-mobile');

// displays the buttons for PC and mobile by toggling an active class when scrolling more than 5000px
window.addEventListener('scroll', () => {
    const displayButton = window.scrollY > 5000;

    scrollToTop.classList.toggle('active', displayButton);
    scrollToTopMobile.classList.toggle('active', displayButton);
});