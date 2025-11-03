const slides = document.querySelectorAll('.slides');
let slideNumber = 0;

// this cycles through all the slides every five seconds
const autoplay = setInterval(() => {
    slides[slideNumber].classList.remove('active');

    slideNumber++;

    /*
        if the slide number is equal to or greater than the number of slides, 
        then it resets back to the first slide
    */ 
    if (slideNumber >= slides.length) {
        slideNumber = 0;
    };
    
    slides[slideNumber].classList.add('active');
}, 5000);