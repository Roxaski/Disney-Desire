const imgSlides = document.querySelectorAll('.slides');
const numOfSlides = imgSlides.length;
let imgSlideNumber = 0;

//IMAGE SLIDER AUTOPLAY
let autoPlayImgSlider;

let repeatAutoPlayImgs = () => {
    autoPlayImgSlider = setInterval(function() {
        imgSlides.forEach((slides) => {
            slides.classList.remove('active');
        });
    
        imgSlideNumber++;
    
        if(imgSlideNumber > (numOfSlides - 1)) {
            imgSlideNumber = 0;
        }
    
        imgSlides[imgSlideNumber].classList.add('active');
    }, 5000);
};

repeatAutoPlayImgs();