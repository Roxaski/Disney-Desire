const gallery = document.querySelector('.gallery')
const galleryImg = document.querySelectorAll('.gallery img');
const lightbox = document.querySelector('.lightbox img');
const lightboxSizes = '(max-width: 550px) 90vw, 600px';
const previousBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');
const overlay = document.querySelector('.gallery-overlay');

// returns the value as false if the image contains 'icon' in its class name
function filterImages(img) {
    return !img.className.includes('icon');
};

// variable that creates a new array from gallery images, which then uses the above function to filter out the icons
const filteredGallery = Array.from(galleryImg).filter(filterImages);

// stores the index of the currently displayed image
let currentImage;

gallery.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG' && !e.target.className.includes('icon')) {
        // finds the current image within the filtered array
        currentImage = filteredGallery.indexOf(e.target);

        displayOverlay();
        imagePreview();
        preload(currentImage + 1);
        preload(currentImage - 1);
    };
});

gallery.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName === 'IMG' && !e.target.className.includes('icon')) {
        currentImage = filteredGallery.indexOf(e.target);

        displayOverlay();
        imagePreview();
        preload(currentImage + 1);
        preload(currentImage - 1);
    };
});

// preloads the previous and next image
function preload(imageIndex) {
    // checks if the image is within the length of the gallery 
    if (imageIndex >= 0 && imageIndex < filteredGallery.length) {
        // creates a new image element, whose source is equal to that of the gallery position, + or - 1 when called
        new Image().src = filteredGallery[imageIndex].src;
    };
};

// displays an overlay
function displayOverlay() {
    document.body.style.overflow = 'hidden';
    overlay.style.display = 'block';
};

// displays image & buttons
function imagePreview() {
    lightbox.src = filteredGallery[currentImage].src;
    lightbox.srcset = filteredGallery[currentImage].srcset;
    lightbox.sizes = lightboxSizes;
    lightbox.classList.add('active');

    displayGalleryBtns();
};

// removes the buttons from the first and last gallery img
function displayGalleryBtns() {
    if(currentImage == 0) {
        previousBtn.style.display = 'none';
    } else {
        previousBtn.style.display = 'block';
    };

    if(currentImage == filteredGallery.length - 1) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'block';
    };
};

// displays next image
nextBtn.addEventListener('click', () => {
    currentImage ++;
    imagePreview();
    preload(currentImage +1);
});

// displays previous image
previousBtn.addEventListener('click', () => {
    currentImage --;
    imagePreview();
    preload(currentImage -1);
});

// removes overlay, image and buttons
function closeOverlay() {
    document.body.style.overflow = 'auto';
    lightbox.classList.remove('active');
    overlay.style.display = 'none';
    nextBtn.style.display = 'none';
    previousBtn.style.display = 'none';
};

overlay.addEventListener('click', () => {
    closeOverlay();
});

lightbox.addEventListener('touchstart', (e) => {
    // stops the default event from happening (swiping from the edge of the screen makes the page go back)
    e.preventDefault();
    
    // returns the location of where the touch started on the X-axis
    touchStart = e.touches[0].clientX;
});

lightbox.addEventListener('touchend', (e) => {
    // returns the location of where touch ended on the X-axis
    touchEnd = e.changedTouches[0].clientX;

    const minSwipe = 100;
    const swipeToChangeImg = touchStart - touchEnd;

    if(swipeToChangeImg > minSwipe && currentImage < filteredGallery.length - 1) {
        currentImage ++;
        imagePreview();
        preload(currentImage +1);

    } else if (swipeToChangeImg < -minSwipe && currentImage > 0) {
        currentImage --;
        imagePreview();
        preload(currentImage -1);
    };
});

// image navigation using the arrows keys
window.addEventListener('keydown', (e) => {
    if(overlay.style.display == 'block' && e.key == 'ArrowRight' &&  currentImage < filteredGallery.length - 1) {
        currentImage ++;
        imagePreview();
        preload(currentImage +1);

    } else if (overlay.style.display == 'block' && e.key == 'ArrowLeft' && currentImage > 0) {
        currentImage --;
        imagePreview();
        preload(currentImage -1);

    } else if (e.key == 'Escape') {
        closeOverlay();
    };
});