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

const dataAttribute = document.body.getAttribute('data-theme');
let theme = themeColors[dataAttribute];
const subHeaderTheme = document.querySelectorAll('.subheader');
const movieTitle = document.querySelector('.content h1').textContent;

// checks if dark mode is active, and if so it applies the grey theme to all pages
const darkModeTheme = window.matchMedia('(prefers-color-scheme: dark)');

if(darkModeTheme.matches) {
    theme = themeColors['grey'];
};

// setting the star rating color properties to match the color of the theme, by updating the css variable
document.documentElement.style.setProperty('--theme', theme);

// styling each pages subheader with the appropriate color theme
subHeaderTheme.forEach((subheader) => {
    subheader.style.backgroundColor = theme;
});

const criticRatings = document.querySelectorAll('.critics .star')
const starWrapper = document.querySelector('.user .star-wrapper');
const starRatings = document.querySelectorAll('.user .star');
const ratingsArray = Array.from(starRatings);

// getting the saved score if one exists from local storage
let savedScore = parseInt(localStorage.getItem(movieTitle));

/*
    loops through each star and checks if a saved score exists in the index, 
    then adds an active class up to the clicked star and displays the color based on the theme
*/
ratingsArray.forEach((star, index) => {
    if(index <= savedScore) {
        star.classList.add('active');
    } else {
        star.classList.remove('active');
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
    // stores the value of the closest clicked on star
    const clickedStar = e.target.closest('.star');

    // gets the position of which star was clicked on within the array
    const clickedStarPosition = ratingsArray.indexOf(e.target.closest('.star'));

    // returns early if a hovered is null, this is in place to stop stars flashing when hovering over them
    if(clickedStar === null) {
        return;
    };

    // setting the saved score in local storage
    localStorage.setItem(movieTitle, clickedStarPosition);
    
    // adds an active class up to the clicked star in the index, and then displays the color based on the theme
    ratingsArray.forEach((star, index) => {
        if(index <= clickedStarPosition) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        };
    });
});

starWrapper.addEventListener('mouseover', (e) => {
    // stores the value of the closest hovered star
    const hoveredStar = e.target.closest('.star');

    // gets the position of which star was hovered over within the array
    const hoveredStarPosition = ratingsArray.indexOf(e.target.closest('.star'));
    
    if(hoveredStar === null) {
        return;
    };

    ratingsArray.forEach((star, index) => {
        if(index <= hoveredStarPosition) {
            star.classList.add('hovered');
        } else {
            star.classList.remove('hovered');
        };
    });
});

starWrapper.addEventListener('mouseleave', () => {
    ratingsArray.forEach((star) => {
        star.classList.remove('hovered');
    });
});

const trailer = document.querySelector('.trailer');
const button = document.querySelector('.trailer button');
const videoID = trailer.getAttribute('data-videoId');
const thumbnail = document.getElementById('thumbnail');

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