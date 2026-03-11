const imgSlider = document.querySelector('.img-slider');
const numberOfSlides = document.querySelectorAll('.slides');
const slideFocus = document.querySelectorAll('.slides a');
let activeSlide = 0;

function incrementSlideImg() {
    // removes the active class from the current slide, and increments it by one
    numberOfSlides[activeSlide].classList.remove('active');
    activeSlide++;
    
    // if the number of images exceeds or is equal to the length of the slides it goes back to the first image
    if(activeSlide >= numberOfSlides.length) {
        activeSlide = 0;
    };

    //adds the active class to the current image that's active
    numberOfSlides[activeSlide].classList.add('active');

    // keeps focus on the active element if it's focused when tabbed to
    if(imgSlider.contains(document.activeElement)) {
        slideFocus[activeSlide].focus();
    };
};

// runs the function every five seconds
setInterval((incrementSlideImg), 5000);