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
            // use dot notation to access certain data items in an object

            const cityName = data.city.name;

            // saves to local storage or an empty array
            const cities = JSON.parse(localStorage.getItem("cities")) || [];
            // if statement to see if city is already saved in local storage you can do without it but youll end up with
            // multiple cities with the same name in storage.

            if (!cities.includes(cityName)) {

                cities.push(cityName);

                // sets values of the oject in local storage
                localStorage.setItem('cities', JSON.stringify(cities));

                console.log("city name saved:", cityName);
            } else {
                console.log("city is already saved:", cityName);  
            }

        })

        // an error at any step of the .thens it stops function
        .catch(function (err) {
            console.log(err);
        })
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit, searchHistory);


function searchHistory() {
    const savedCities = JSON.parse(localStorage.getItem("cities")) || [];
    const historyContainer = document.querySelector('.history-container');

    savedCities.forEach(cities => {
        const searchedCity = document.createElement('p');
// add in add class for the css on the search history cities
        searchedCity.textContent = cities;
        historyContainer.append(searchedCity);
        console.log(cities);
    });

    
}
searchHistory();

    


// dynamically create elements to append information to containers

// task card assignment as starting point

// this is the starting point for the current results section.

// function printResults(resultObj) {
//     console.log(resultObj);

//     // set up `<div>` to hold result content
//     const resultCard = document.createElement('div');
//     resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

//     const resultBody = document.createElement('div');
//     resultBody.classList.add('card-body');
//     resultCard.append(resultBody);

//     const titleEl = document.createElement('h3');
//     titleEl.textContent = resultObj.title;

//     const bodyContentEl = document.createElement('p');
//     bodyContentEl.innerHTML =
//         `<strong>Date:</strong>${resultObj.date}<br/>`;

//     if (resultObj.subject) {
//         bodyContentEl.innerHTML +=
//             `<strong>Subjects:</strong>${resultObj.subject.join(', ')}<br/>`;
//     } else {
//         bodyContentEl.innerHTML +=
//             '<strong>Subjects:</strong> No subject for this entry.';
//     }