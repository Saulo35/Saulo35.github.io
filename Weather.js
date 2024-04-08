// Source: https://dev.to/iamcymentho/building-a-complete-weather-app-from-scratch-with-html-css-and-javascript-a-step-by-step-guide-30h4

const apiKey = '5add1770c3e622236b8b74f008ba7ebe';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput      = document.getElementById('locationInput');
const searchButton       = document.getElementById('searchButton');
const locationElement    = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const pressureElement    = document.getElementById('pressure');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});


/* 
https://openweathermap.org/current

Built-in API request by city name
You can call by city name or city name, state code and country code. Please note that searching by states available only for the USA locations.

API call

https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}

https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}

Parameters
q       required	City name, state code and country code divided by comma, Please refer to ISO 3166 for the state codes or country codes.
                    You can specify the parameter not only in English. In this case, the API response
                    should be returned in the same language as the language of requested location name
                    if the location is in our predefined list of more than 200,000 locations.

appid	required	Your unique API key (you can always find it on your account page under the "API key" tab)
mode	optional	Response format. Possible values are xml and html. If you don't use the mode parameter format is JSON by default. Learn more
units	optional	Units of measurement. standard, metric and imperial units are available.
                    If you do not use the units parameter, standard units will be applied by default. Learn more
lang	optional	You can use this parameter to get the output in your language. Learn more

 */

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent    = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°Caaa`;
            pressureElement.textContent    = `Barometric Pressure = ${Math.round(data.main.pressure)} hPa`;
            descriptionElement.textContent = data.weather[0].description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}