const input = document.querySelectorAll("input[type='checkbox']");
const label = document.querySelectorAll('label');

// prevents poster images from being focused when the respective accordion is closed
input.forEach(checkbox => {
    const posters = checkbox.parentElement.querySelectorAll('.content a');

    checkbox.addEventListener('click', () => {
        posters.forEach(poster => {
            if (checkbox.checked) {
                poster.removeAttribute('tabindex');
            } else {
                poster.setAttribute('tabindex', '-1');
            };
        });
    });
});

// allows the accordion to be opened and closed with the keyboard when focused
label.forEach(movieYear => {
    const checkbox = movieYear.previousElementSibling;

    if (checkbox.checked) {
        movieYear.setAttribute('tabindex', '0');
    } else {
        movieYear.removeAttribute('tabindex');
    };

    movieYear.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            checkbox.click();
        };
    });
});