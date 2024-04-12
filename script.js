const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const imgSlides = document.querySelectorAll('.slides');
const numOfSlides = imgSlides.length;
let imgSlideNumber = 0;
let nav = document.querySelector('nav');
let mobileNav = document.querySelector('.hamburger_menu');

//IMAGE SLIDER PREVIOUS BUTTON
prevBtn.addEventListener('click', ()=> {
    imgSlides.forEach((slides) => {
        slides.classList.remove('active');
    });
    
    imgSlideNumber--;

    if(imgSlideNumber < 0) {
        imgSlideNumber = numOfSlides - 1;
    }

    imgSlides[imgSlideNumber].classList.add('active');
});

//IMAGE SLIDER NEXT BUTTON
nextBtn.addEventListener('click', () => {
    imgSlides.forEach((slides) => {
        slides.classList.remove('active');
    });

    imgSlideNumber++;

    if(imgSlideNumber > (numOfSlides - 1)) {
        imgSlideNumber = 0;
    }

    imgSlides[imgSlideNumber].classList.add('active');
});

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
    }, 7000);
};

repeatAutoPlayImgs();

//HAMBURGER MENU
mobileNav.addEventListener('click', () => {
    nav.classList.toggle('active')
});

//DISABLE SCROLL WHEN NAV ACTIVE
mobileNav.addEventListener('click', () => {
    document.body.classList.toggle('no-scroll');
});