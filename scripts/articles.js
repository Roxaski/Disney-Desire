const recommendedArticles = document.querySelector('aside .content ul');
const asideContent = document.querySelector('aside .content');

// checks if recommended articles exist, this is done so that pages that don't have them don't needlessly fetch the json data
if(recommendedArticles) {
    fetch('../json/articles.json')
    .then(res => res.json())
    .then(data => {
        /*
            stores the value of the current article page pathname,
            using split to remove the ' / ' and pop to remove the last element of the array
        */
        let currentPage = window.location.pathname.split('/').pop();

        // filters the current article page using the pathname
        let filteredArticles = data.filter(article => {
            return article.href.split('/').pop() != currentPage;
        });

        // the for loop is using the Fisher-Yates shuffle
        for(let i = filteredArticles.length - 1; i > 0; i--) {
            // picks a random number from the filtered array
            let articleIndex = Math.floor(Math.random() * (i + 1));
            // stores the position of (i) from the filtered array
            let storedData = filteredArticles[i];
            // now the position of the index is equal to that of a random number in the filtered array
            filteredArticles[i] = filteredArticles[articleIndex];
            // then it's assigning the original value of (i) to the articleIndex position
            filteredArticles[articleIndex] = storedData;
        };

        // gets the first three articles from the filtered array
        let displayArticles = filteredArticles.slice(0, 3);

        // mapping out the data from the filtered array
        recommendedArticles.innerHTML = displayArticles.map(article => {
            return `
            <li>
                <a href="${article.href}">
                    <img loading="lazy" width="1920" height="1080" draggable="false"
                    src="${article.src}"
                    srcset="${article.srcset}"
                    sizes="${article.sizes}"
                    alt="${article.alt}">
                </a>

                <p>${article.name}</p>
            </li>
            `
        }).join(' '); // converts the array to a string
    })
    // catches any errors that may occur and displays them to the user
    .catch((err) => {
        asideContent.innerHTML = `
        <p class="error-message">
            📰 Unable to Display Articles
        </p>
        `
        console.log(err);
    });
};

const nav = document.querySelectorAll('nav a');
const articleLinks = document.querySelectorAll('article a');
const lightboxImg = document.querySelector('.lightbox img');
const articleImg = document.querySelectorAll('article img');
const articleOverlay = document.querySelector('.article-overlay');

// keeps track of which image was clicked
let currentImg = 0;

// creates an array of the images within the article
const imgArr = Array.from(articleImg);

// sets the lightbox images src and alt
function setLightboxImg() {
    const img = imgArr[currentImg];
    
    lightboxImg.src = img.src;
    lightboxImg.srcset = img.srcset;
    lightboxImg.alt = img.alt;
    // toggles a class depending on the natural height and width of the image to determine if it's a portrait img
    lightboxImg.classList.toggle('portrait', img.naturalHeight > img.naturalWidth);
};

function openLightBox(img) {
    document.body.classList.add('lightbox-no-scroll');

    // stores the value of the current image that was clicked on from the array
    currentImg = imgArr.indexOf(img);

    setLightboxImg();
    
    articleOverlay.classList.add('active');
    lightboxImg.classList.add('active');

    // loops through each element and sets the tab index accordingly
    nav.forEach(link => {
        link.setAttribute('tabIndex', '-1');
    });

    articleImg.forEach(img => {
        img.setAttribute('tabIndex', '-1');
    });

    articleLinks.forEach(anchor => {
        anchor.setAttribute('tabIndex', '-1');
    });
};

// closes the lightbox, also resets values and remove classes
function closeLightbox () {
    document.body.classList.remove('lightbox-no-scroll');
    articleOverlay.classList.remove('active');
    lightboxImg.classList.remove('zoom');
    lightboxImg.style.transform = '';
    imgPositionX = 0;
    imgPositionY = 0;
    lightboxImg.classList.remove('active');
    lightboxImg.srcset = '';
    lightboxImg.src = '';
    lightboxImg.alt = '';

    // loops through each element and sets the tab index accordingly
    nav.forEach(link => {
        link.setAttribute('tabIndex', 0);
    });

    articleLinks.forEach(anchor => {
        anchor.setAttribute('tabIndex', 0);
    });

    articleImg.forEach(img => {
        img.setAttribute('tabIndex', 0);
    });

    // checks if the user has a pointer device and if so then it adds focus onto the last image that it was on
    if (window.matchMedia('(hover: hover)').matches) {
        const img = imgArr[currentImg];
        img.focus();
    };
};

articleImg.forEach(img => {
    img.addEventListener('click', () => {
        openLightBox(img);
    });
});

lightboxImg.addEventListener('dblclick', () => {
    lightboxImg.classList.toggle('zoom');
});

articleOverlay.addEventListener('click', () => {
    closeLightbox();
});

articleImg.forEach(img => {
    img.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightBox(img);
        };
    });
});

window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && lightboxImg.classList.contains('active')) {
        closeLightbox();
    };
});

let screenTapStartX;
let screenTapStartY;
let screenTap;
let screenTapEnd;
let imgPositionX = 0;
let imgPositionY = 0;
let currentPositionX;
let currentPositionY;

lightboxImg.addEventListener('touchstart', (e) => {
    // the position of the initial tap on the screen for both x and y axis
    screenTapStartX = e.touches[0].clientX;
    screenTapStartY = e.touches[0].clientY;
});

lightboxImg.addEventListener('touchmove', (e) => {
    if(!lightboxImg.classList.contains('zoom')) {
        return;
    };

    // sets the initial zoom scale to 2
    let zoomScale = 2;

    // sets the zoom to 1.25 if the image has the portrait class
    if(lightboxImg.classList.contains('portrait')) {
        zoomScale = 1.25;
    };

    // adds a class to stop the image from having a transition while it's zoomed
    lightboxImg.classList.add('drag');

    // gets the position of where the screen was tapped for both x and y axis
    currentPositionX = e.touches[0].clientX;
    currentPositionY = e.touches[0].clientY;

    // stores the value of how much the image moved, by calculating the current position of x and y minus where the screen was initially tapped
    let imgMovementX = currentPositionX - screenTapStartX;
    let imgMovementY = currentPositionY - screenTapStartY;

    // sets transform and scale onto the lightbox image by calculating the position of the image plus how much it's moved from it's position
    lightboxImg.style.transform = `translate(${imgPositionX + imgMovementX}px, ${imgPositionY + imgMovementY}px) scale(${zoomScale})`;
});

lightboxImg.addEventListener('touchend', (e) => {
    // removes the drag class to allow the image to transition while it's zoomed
    lightboxImg.classList.remove('drag');

    // calculates and stores the value of how far the image travelled from the position of 0 on the x and y axis
    imgPositionX = imgPositionX + (e.changedTouches[0].clientX - screenTapStartX);
    imgPositionY = imgPositionY + (e.changedTouches[0].clientY - screenTapStartY);

    // stores the value of the current time in order to calculate the difference in between taps
    let currentTapTime = Date.now();

    // checks if there's been 300 or less ms between taps, toggles zoom and sets the screen tap back to 0
    if(currentTapTime - screenTap <= 300) {
        lightboxImg.classList.toggle('zoom');
        screenTap = 0;
    } else {
        screenTap = currentTapTime;
    };

    // if the image isn't zoomed in then sets the transform to an empty string to remove scale(2), else it just returns early
    if(!lightboxImg.classList.contains('zoom')) {
        lightboxImg.style.transform = '';
        // resets the position of the image so that the next zoom starts centred
        imgPositionX = 0;
        imgPositionY = 0;
    }
    else {
        return;
    };

    // the position of where the finger lifted off the screen
    screenTapEnd = e.changedTouches[0].clientX;
});