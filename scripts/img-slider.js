const imgSlider = document.querySelector('.img-slider');
const slides = document.querySelectorAll('.slides');
const slideFocus = document.querySelectorAll('.slides a');
let activeSlide = 0;

function incrementSlideImg() {
    // removes the active class from the current slide, and increments it by one
    slides[activeSlide].classList.remove('active');
    activeSlide++;

    // if the number of images exceeds or is equal to the length of the slides it goes back to the first image
    if(activeSlide >= slides.length) {
        activeSlide = 0;
    };

    // adds the active class to the current image
    slides[activeSlide].classList.add('active');
};

function decrementSlideImg() {
    slides[activeSlide].classList.remove('active');
    activeSlide--;

    if(activeSlide < 0) {
        activeSlide = slides.length - 1;
    };

    slides[activeSlide].classList.add('active');
};

// runs the function every five seconds
let intervalId = setInterval(incrementSlideImg, 5000);

// pauses the image slider when the focus is active, resumes the image slider when focus is removed
imgSlider.addEventListener('focusin', () => {
    clearInterval(intervalId);
});

imgSlider.addEventListener('focusout', () => {
    intervalId = setInterval(incrementSlideImg, 5000);
});

// adds keyboard navigation when tabbed onto the image slider, along with adding focus to the active slide
imgSlider.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowRight') {
        incrementSlideImg();
        slideFocus[activeSlide].focus();
    };

    if(e.key === 'ArrowLeft') {
        decrementSlideImg();
        slideFocus[activeSlide].focus();
    };
});