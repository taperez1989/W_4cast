const searchFormEl = document.querySelector('.form');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    const searchInputVal = document.getElementById('city-search').value;

    if (!searchInputVal) {
        console.error('search input value required');
        return;
    }
    const latLon = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInputVal}&limit=1&appid=f8ad66aaefdb1e05f8e8a305f8140066`;
    // fetch request for lat and lon data
    fetch(latLon)
        // if response is false return error otherwise return response
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        // fetch lat and lon
        .then(function (data) {
            console.log(data);
            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=f8ad66aaefdb1e05f8e8a305f8140066`;

            return fetch(apiUrl)

        })
        // if response is false return erro
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // seperate function for local storage
        })

        // an error at any step of the .thens it stops function
        .catch(function (err) {
            console.log(err);
        })
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);




// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

