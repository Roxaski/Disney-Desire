// object for page theme
const themeColors = {
    black: '#212121',
    blue: '#2056a8',
    brown: '#80604f',
    coolRed: '#a80444',
    charcoal: '#7f7979',
    crimson: '#801c29',
    darkBlue: '#1a1c5e',
    gold: '#af814f',
    grey: '#3e3b3b',
    lightGrey: '#cccccc',
    magenta: '#c05266ff',
    mauve: '#5b63d0ff',
    navyBlue: '#2d3d5a',
    orange: '#af5532',
    pink: '#d45b82ff',
    purple: '#57157a',
    red: '#970c0d',
};

// global variables for page headers
const dataAttribute = document.body.getAttribute('data-theme');
let theme = themeColors[dataAttribute];
const subHeaderTheme = document.querySelectorAll('.subheader');

// checks if dark mode is active, and if so it applies the grey theme to all pages
const darkModeTheme = window.matchMedia('(prefers-color-scheme: dark)');

if(darkModeTheme.matches) {
    theme = themeColors['grey'];
};

// styling each pages subheader with the appropriate color theme
subHeaderTheme.forEach((subheader) => {
    subheader.style.backgroundColor = theme;
});

// global variables for star ratings
const criticRatings = document.querySelectorAll('.critics .star')
const starWrapper = document.querySelector('.user .star-wrapper');
const starRatings = document.querySelectorAll('.user .star');
const ratingsArray = Array.from(starRatings);

// getting the saved score if one exists from local storage
let savedScore = parseInt(localStorage.getItem('userRating'));

/*
    loops through each star and checks if a saved score exists in the index, 
    then adds an active class up to the clicked star and displays the color based on the theme
*/
ratingsArray.forEach((star, index) => {
    if(index <= savedScore) {
        star.classList.add('active');
        star.style.fill = darkModeTheme.matches ? themeColors['charcoal'] : theme;
    } else {
        star.classList.remove('active');
        star.style.fill = darkModeTheme.matches ? themeColors['grey'] : themeColors['lightGrey'];
    };
});

// looping through each critics star and checking for an active class, which then displays the color based on theme
criticRatings.forEach((rating) => {
    if(rating.classList.contains('active')) {
        rating.style.fill = darkModeTheme.matches ? themeColors['charcoal'] : theme;
    };
});

// event listener on the star ratings container, which returns whichever star was clicked on
starWrapper.addEventListener('click', (e) => {
    // gets the position of which star was clicked on within the array
    const clickedStar = ratingsArray.indexOf(e.target.closest('.star'));

    /*
        since -1 dosen't exist in the array it returns early,
        this is to stop the user from removing the star rating when clicking outside the container
    */
    if(clickedStar === -1) {
        return;
    };

    // setting the saved score in local storage
    localStorage.setItem('userRating', clickedStar);
    
    // adds an active class up to the clicked star in the index, and then displays the color based on the theme
    ratingsArray.forEach((star, index) => {
        if(index <= clickedStar) {
            star.classList.add('active');
            star.style.fill = darkModeTheme.matches ? themeColors['charcoal'] : theme;
        } else {
            star.classList.remove('active');
            star.style.fill = darkModeTheme.matches ? themeColors['grey'] : themeColors['lightGrey'];
        };
    });
});

// global variables for youtube data
const trailer = document.querySelector('.trailer');
const button = document.querySelector('.trailer button');
let videoID = trailer.getAttribute('data-videoId');
let thumbnail = document.getElementById('thumbnail');

thumbnail.src = `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;

// plays the designated youtube trailer when clicking on the play button
button.addEventListener('click', () => {
    trailer.innerHTML =
    `<iframe
        src="https://www.youtube-nocookie.com/embed/${videoID}?hd=1&rel=0&autoplay=1"
        title="${document.title} Official Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen>
    </iframe>`
});