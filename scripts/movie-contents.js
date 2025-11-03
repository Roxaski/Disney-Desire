// pageTitle is used for matching the movie page to their respective theme and user scores
const pageTitle = document.title;

// color schemes for the different movie pages
const colorScheme = {
    'black' : '#212121',
    'blue' : '#2056a8',
    'brown' : '#80604f',
    'cool-red' : '#a80444',
    'crimson' : '#801c29',
    'dark-blue' : '#1a1c5e',
    'gold' : '#af814f',
    'grey' : '#3e3b3b',
    'magenta': '#c05266ff',
    'mauve' : '#5b63d0ff',
    'navyBlue' : '#2d3d5a',
    'orange' : '#af5532',
    'pink' : '#d45b82ff',
    'purple': '#57157a',
    'red' : '#970c0d',
};

// array containing the movie page titles
const blueTheme = [
    'Ant-Man and the Wasp: Quantumania',
    'Lightyear',
    'The Little Mermaid',
];
const brownTheme = [
    'Pinocchio',
];
const coolRedTheme = [
    'Thor: Love and Thunder',
]
const crimsonTheme = [
    'Disenchanted',
];
const darkBlueTheme = [
    'Haunted Mansion',
];
const goldTheme = [
    'Mufasa: The Lion King',
];
const greyTheme = [
    'Black Panther: Wakanda Forever',
];
const magentaTheme = [
    'Strange World',
]
const mauveTheme = [
    'Elemental',
];
const navyBlueTheme = [
    'Peter Pan & Wendy',
];
const orangeTheme = [
    'Chip \'n Dale: Rescue Rangers',
    'Indiana Jones and the Dial of Destiny',
];
const pinkTheme = [
    'Inside Out 2',
];
const purpleTheme = [
    'Hocus Pocus 2',
];
const redTheme = [
    'Doctor Strange in the Multiverse of Madness',
    'The Descendants: The Rise of Red',
];

function themeColor() {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if(darkMode) {
        return 'grey';
    };

    // maps movie titles to their respective color schemes
    const keywords = [
        { 
            name: 'blue', 
            keyword: blueTheme 
        },
        {
            name: 'brown',
            keyword: brownTheme
        },
        {
            name: 'cool-red',
            keyword: coolRedTheme
        },
        {
            name: 'crimson', 
            keyword: crimsonTheme
        },
        {
            name: 'dark-blue',
            keyword: darkBlueTheme
        },
        {   name: 'gold', 
            keyword: goldTheme 
        },
        {
            name: 'grey', 
            keyword: greyTheme 
        },
        {
            name: 'magenta',
            keyword: magentaTheme
        },
        {
            name: 'mauve', 
            keyword: mauveTheme
        },
        {
            name: 'navyBlue',
            keyword: navyBlueTheme
        },
        { 
            name: 'orange', 
            keyword: orangeTheme 
        },
        {
            name: 'pink',
            keyword: pinkTheme
        },
        {
            name: 'purple',
            keyword: purpleTheme
        },
        { 
            name: 'red', 
            keyword: redTheme 
        },
    ];

    // loops through all themes to find a matching keyword
    for (const theme of keywords) {
        // checks if any of the keywords in the theme match the page title
        if (theme.keyword.some(movieTitle => pageTitle.includes(movieTitle))) {
            
            return theme.name;
        };
    };

};

function setThemeColor() {
    /*
        the theme variable holds the color from the above function,
        which then loops through both stars and subheaders and sets the colors accordingly
    */
    let theme =  themeColor();

    if(colorScheme[theme] === undefined) {
        theme = 'black';
    };

    document.querySelectorAll('.star').forEach(star => {
        star.style.color = colorScheme[theme];
    });

    document.querySelectorAll('.subheader').forEach(subheader => {
        subheader.style.background = colorScheme[theme];
    });
};

/*
    displays a numerical value up to ten that gets reset to one if pressed again,
    it also stores the numerical value in local storage for each movie page
*/
function userInput() {
    const star = document.querySelector('.reviews:last-child .star');
    const span = document.getElementById('user-score');
    const storageKey = `userReviewScore_${pageTitle}`;

    let currentScore = 0;
    
    // fetches the user score from local storage for the specific movie page
    let savedScore = localStorage.getItem(storageKey);

    // if there's a scored saved then it gets displayed and converted from a string to a number
    if (savedScore) {
        currentScore = parseInt(savedScore);
        span.textContent = currentScore;
    };

    /*
        listens out for a click on the last star element,
        which then displays the numerical value whenever the star is clicked,
        and it then stores the value in local storage
    */
    star.addEventListener('click', () => {
        // Increment the score first, then display and save
        currentScore++;

        // if the score goes above 10 it will reset back to 1
        if (currentScore > 10) {
            currentScore = 1;
        };

        span.textContent = currentScore;
        // restores the user score from local storage for the specific movie page
        localStorage.setItem(storageKey, currentScore);
    });
};

// creates an embedded youtube video for the specific movie page
function youtubeTrailer() {
    const trailer = document.querySelector('.trailer');
    const movieTitle = pageTitle;

    // Get the video id from the data attribute
    const videoId = trailer.getAttribute('data-videoId');

    // mapping out the iframe to the trailer div container
    trailer.innerHTML = `
        <iframe 
            src="https://www.youtube-nocookie.com/embed/${videoId}?hd=1&rel=0" 
            title="${movieTitle} Official Trailer"
            allow="accelerometer; clipboard-write; encrypted-media; web-share"
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
        </iframe>
    `;
};

setThemeColor();
userInput();
youtubeTrailer();