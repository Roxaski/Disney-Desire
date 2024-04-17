//BUTTON THAT SCROLLS BACK TO TOP OF PAGE
const scrollToTop = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if(window.scrollY > 100) {
        scrollToTop.classList.add('active');
    } else {
        scrollToTop.classList.remove('active');
    }
});