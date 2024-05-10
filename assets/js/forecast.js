const searchFormEl = document.querySelector('.form');

function handleSearchFormSubmit(event) {
    event.preventDefault();
// grabs the value input by the user in the form ex. user enters "san diego"
    const searchInputVal = document.getElementById('city-search').value;
    document.getElementById('city-search').value = '';

    if (!searchInputVal) {
        console.error('search input value required');
        return;
    }
    // the value of searchInputVal is then entered in this url for this lat lon variable in order for the first part of the fetch request to run.
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
            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&cnt=24&units=imperial&appid=f8ad66aaefdb1e05f8e8a305f8140066`;

            return fetch(apiUrl);

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
// display current weather forecast
            const currentForecast = data.list[0];
            console.log(data.list);

            const date = new Date(currentForecast.dt*1000);
            const humidity = currentForecast.main.humidity;
            const windSpeed = currentForecast.wind.speed;
            const temp = currentForecast.main.temp;
            
            const resultContainer = document.querySelector('.current-result');

            resultContainer.innerHTML = '';

            const currentHumidity = document.createElement('p');
            const currentWind = document.createElement('p');
            const currentTemp = document.createElement('p');
            const currentCity = document.createElement('h3');
                

            resultContainer.classList.add('result-card');

            currentCity.textContent = cityName +' '+date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' });
            currentHumidity.textContent = 'Humidity:' + humidity + '%';
            currentWind.textContent = 'Wind:' + windSpeed + 'MPH';
            currentTemp.textContent = 'Temp:' + temp + '\u00B0'; 

            resultContainer.append(currentCity, currentHumidity, currentWind, currentTemp);
            
            return data;

        })
        .then(function (data) {
// function for five day forecast
            const fiveDayForecast = data.list;

            

            for (i = 0; i < fiveDayForecast.length; i += 5) {
                const forecast = fiveDayForecast[i];
                console.log(forecast);
            
                const forecastContainer = document.querySelector('forecast-container');
                // forecastContainer.innerHTML = '';

                const date = new Date(forecast.dt * 1000);
                const humidity = forecast.main.humidity;
                const windSpeed = forecast.wind.speed;
                const temp = forecast.main.temp;

                const weatherCard = document.createElement('div');
                weatherCard.classList.add('forecast-card');

                const currentHumidity = document.createElement('p');
                const currentWind = document.createElement('p');
                const currentTemp = document.createElement('p');
                const forecastDate = document.createElement('h3');

                forecastDate.textContent = date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' });
                currentHumidity.textContent = 'Humidity:' + humidity + '%';
                currentWind.textContent = 'Wind:' + windSpeed + 'MPH';
                currentTemp.textContent = 'Temp:' + temp + '\u00B0';

                weatherCard.append(forecastDate, currentHumidity, currentWind, currentTemp);

                forecastContainer.append(weatherCard);
            };

            return data;
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
        // console.log(cities);
    });

    
}
searchHistory();


