const scrollTop = document.querySelector('.scroll-top');
const scrollTopMobile = document.querySelector('.scroll-top-mobile');

// array of both scroll elements to avoid code repition when adding classes and attributes
const scrollElement = [scrollTop, scrollTopMobile];

/*
    when the window is scrolled more than a certain amount, 
    it displays a button that scrolls back to top of page
*/
window.addEventListener('scroll', () => {
    scrollElement.forEach(e => {
        if(window.scrollY > 1000) {
            e.classList.add('active');
            e.setAttribute('tabIndex', '0');
        } else {
            e.classList.remove('active');
            e.setAttribute('tabIndex', '-1');
        };
    });
});