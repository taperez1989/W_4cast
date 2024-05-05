const searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    const searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.error('search input value required');
        return;
    }

}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

// local storage?