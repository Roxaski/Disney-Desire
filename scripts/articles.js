const recommendedArticles = document.querySelector('aside .content');

// fetching the json data
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
        let articleIndex = Math.floor(Math.random () * i);
        // stores the position of (i) from the filtered array
        let storedData = filteredArticles[i];
        // now the position of the index is equal to that of a random number in the filtered array
        filteredArticles[i] = filteredArticles[articleIndex];
        // then it's assigning the original value of (i) to the recipeIndex position
        filteredArticles[articleIndex] = storedData;
    };

    // gets the first four recipes from the filtered array
    let displayArticles = filteredArticles.slice(0, 3);

    // mapping out the data from the filtered array
    recommendedArticles.innerHTML = displayArticles.map(article => {
        return `
        <ul>
            <li>
                <a href="${article.href}">
                    <img width="1920" height="1080" draggable="false"
                    src="${article.src}"
                    srcset="${article.srcset}"
                    sizes="${article.sizes}"
                    alt="${article.alt}">
                </a>
                <p>${article.name}</p>
            </li>
        </ul>
        `
    }).join(' '); // converts the array to a string
})
// catches any errors that may occur and displays them to the user
.catch((err) => {
    recommendedArticles.innerHTML = `
    <p class="error-message">
        📰 Unable to Display Articles
    </p>
    `
    console.log(err);
});