const scrollToTop = document.querySelector('.scroll-top');
const scrollToTopMobile = document.querySelector('.scroll-top-mobile');

// displays the buttons for PC and mobile by toggling an active class when scrolling more than 5000px
window.addEventListener('scroll', () => {
    const displayButton = window.scrollY > 3000;

    // displays the button that allows the user to scroll back to the top of the page
    scrollToTop.classList.toggle('active', displayButton);
    scrollToTopMobile.classList.toggle('active', displayButton);

    // checks if the button is displaying and sets the attribute accordingly
    scrollToTop.setAttribute('tabindex', displayButton ? '0' : '-1');
    scrollToTopMobile.setAttribute('tabindex', displayButton ? '0' : '-1');
});