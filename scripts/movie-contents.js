const themeColors = {
    black: '#212121',
    blue: '#2056a8',
    brown: '#80604f',
    coolRed: '#a80444',
    crimson: '#801c29',
    darkBlue: '#1a1c5e',
    gold: '#af814f',
    grey: '#3e3b3b',
    magenta: '#c05266ff',
    mauve: '#5b63d0ff',
    navyBlue: '#2d3d5a',
    orange: '#af5532',
    pink: '#d45b82ff',
    purple: '#57157a',
    red: '#970c0d'
};

const dataAttribute = document.body.getAttribute('data-theme');
let theme = themeColors[dataAttribute];
const subHeaderTheme = document.querySelectorAll('.subheader');
const starTheme = document.querySelectorAll('.star');
const starRating = document.querySelector('.reviews:last-child');
let userScore = 0;

// checks if dark mode is active, and if so it applies the grey theme to all pages
const darkModeTheme = window.matchMedia('(prefers-color-scheme: dark)');

if(darkModeTheme.matches) {
    theme = themeColors['grey'];
};

// styling each pages subheaders and stars with the appropriate color theme
subHeaderTheme.forEach((subheader) => {
    subheader.style.backgroundColor = theme;
});

starTheme.forEach((stars) => {
    stars.style.fill = theme;
    stars.style.stroke = theme;
});

// getting the elements from the reviews element's last child
const star = starRating.querySelector('.star');
const score = starRating.querySelector('#user-score');

// check if a user score is already stored in local storage
const savedScore = localStorage.getItem(document.title);

// if there's a saved score we take that and convert it to a number from a string, and set the inner text of the score
if(savedScore) {
    userScore = parseInt(savedScore);
    score.innerText = userScore;
};

// updates the user score and saves it to local storage
function updateUserScore() {
    userScore++;

    if(userScore > 10) {
        userScore = 1;
    };

    score.innerText = userScore;
    localStorage.setItem(document.title, userScore);
};

// runs the above function everytime the star is clicked
star.addEventListener('click', () => {
    updateUserScore();
});

// runs the above function everytime the star is focused and user presses enter or spave keys
star.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        updateUserScore();
    };
});

const trailer = document.querySelector('.trailer');
const button = document.querySelector('.trailer button');
let videoID = trailer.getAttribute('data-videoId');
let thumbnail = document.getElementById('thumbnail');

// gets the youtube thumbnail and sets the video id to each designated trailer
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