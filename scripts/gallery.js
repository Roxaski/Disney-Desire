const nav = document.querySelectorAll('nav a');
const gallery = document.querySelector('.gallery');
const galleryImgs = document.querySelectorAll('.img-container img');
const galleryOverlay = document.querySelector('.gallery-overlay');
const lightboxImg = document.querySelector('.lightbox img');
const previousBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');

// keeps track of which image was clicked
let currentImg = 0;

// creates new image variables in order to preload them when the lightbox is active
let preloadPreviousImg = new Image();
let preloadNextImg = new Image();

// creates an array which then filters out the image icons from the gallery images
const filteredImgs = Array.from(galleryImgs).filter(img => !img.classList.contains('icon'));

// clears lightbox image before setting it to the currently selected gallery image
function setLightboxImg() {
    lightboxImg.src = '';
    lightboxImg.srcset = '';
    lightboxImg.src = filteredImgs[currentImg].src;
    lightboxImg.srcset = filteredImgs[currentImg].srcset;
};

/*
    displays the lightbox along with disabling the scroll while it's open,
    along with disabling the respective buttons from the first and last lightbox image,
    and setting the tab index to -1 in order to prevent the gallery images from being tabbed
*/
function openLightBox(e) {
    document.body.classList.add('no-scroll');

    // stores the value of the current image that was clicked on from the array
    currentImg = filteredImgs.indexOf(e.target);
    
    // checks if the target is an image within the gallery
    if(e.target.tagName === 'IMG') {
        setLightboxImg();

        galleryOverlay.classList.add('active');
        lightboxImg.classList.add('active');
    };

    // loops through each element and sets the tab index accordingly
    nav.forEach(link => {
        link.setAttribute('tabIndex', '-1');
    });

    filteredImgs.forEach(img => {
        img.setAttribute('tabIndex', '-1');
    });

    lightboxBtns();
};

// hides one of the lightbox buttons depending on the position of the image within the array
function lightboxBtns() {
    if(currentImg === 0) {
        previousBtn.classList.remove('active');
    } else {
        previousBtn.classList.add('active');
    };

    if(currentImg === filteredImgs.length - 1) {
        nextBtn.classList.remove('active');
    } else {
        nextBtn.classList.add('active');
    };
};

// preloads the adjacent photos within the lightbox
function preloadAdjacentImgs() {
    if (currentImg > 0) {
        preloadPreviousImg.src = filteredImgs[currentImg - 1].src;
    };

    if (currentImg < filteredImgs.length - 1) {
        preloadNextImg.src = filteredImgs[currentImg + 1].src;
    };
};

/*
    closes the lightbox by removing the active classes and re-enabling scroll,
    while also setting the tab index back to 0 to allow the images in the gallery to be tabbed to
*/
function closeLightbox () {
    document.body.classList.remove('no-scroll');
    galleryOverlay.classList.remove('active');
    lightboxImg.classList.remove('active');
    previousBtn.classList.remove('active');
    nextBtn.classList.remove('active');

    // loops through each element and sets the tab index accordingly
    nav.forEach(link => {
        link.setAttribute('tabIndex', 0);
    });

    filteredImgs.forEach(img => {
        img.setAttribute('tabIndex', 0);
    });
};

// lightbox click event listeners for mouse
gallery.addEventListener('click', (e) => {
    openLightBox(e);
    preloadAdjacentImgs();
});

galleryOverlay.addEventListener('click', () => {
    closeLightbox();
});

previousBtn.addEventListener('click', () => {
    currentImg--;

    setLightboxImg();
    lightboxBtns();
    preloadAdjacentImgs();
});

nextBtn.addEventListener('click', () => {
    currentImg++;

    setLightboxImg();
    lightboxBtns();
    preloadAdjacentImgs();
});

// lightbox click event listeners for keyboard
document.addEventListener('keydown', (e) => {
    if(!lightboxImg.classList.contains('active')) {
        return;
    };

    if(e.key === 'Escape' && lightboxImg.classList.contains('active')) {
        closeLightbox();
    };

    if(e.key === 'ArrowLeft' && lightboxImg.classList.contains('active')) {
        if(currentImg === 0) {
            return;
        };

        currentImg--;

        setLightboxImg();
        lightboxBtns();
        preloadAdjacentImgs();

    } else if (e.key === 'ArrowRight' && lightboxImg.classList.contains('active')) {
        if(currentImg === filteredImgs.length - 1) {
            return;
        };

        currentImg++;

        setLightboxImg();
        lightboxBtns();
        preloadAdjacentImgs();
    };
});

gallery.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightBox(e);
        preloadAdjacentImgs();
    };
});

// keeps track of where the screen tapping starts and ends, along with setting img zoom to false
let screenTapStart;
let screenTapEnd;
let imgZoom = false;

lightboxImg.addEventListener('touchstart', (e) => {
    // keeps track of whether more than one finger is on the screen
    if(e.touches.length > 1) {
        imgZoom = true;
        return;
    } else {
        imgZoom = false;
    };

    // the position of the initial tap on the screen
    screenTapStart = e.touches[0].clientX;
});

lightboxImg.addEventListener('touchend', (e) => {
    if(e.touches.length > 0 || imgZoom) {
        return;
    };

    // the position of where the finger lifted off the screen
    screenTapEnd = e.changedTouches[0].clientX;

    // checks if the swipe moved at least 100px to the left
    if(screenTapEnd - screenTapStart <= -100 && lightboxImg.classList.contains('active')) {
        if(currentImg === filteredImgs.length - 1) {
            return;
        };

        currentImg++;
        
        setLightboxImg();
        preloadAdjacentImgs();

    // checks if the swipe moved at least 100px to the right
    } else if(screenTapEnd - screenTapStart >= 100 && lightboxImg.classList.contains('active')) {
        if(currentImg === 0) {
            return;
        };

        currentImg--;

        setLightboxImg();
        preloadAdjacentImgs();
    };
});