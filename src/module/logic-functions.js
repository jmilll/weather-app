import { populateErr, populateData } from './DOM-manipulation';

//********** ---------- LOGIC FUNCTIONS ----------**********

function _getKey() {
    //split key to prevent scraping since no backend setup
    const a = '3069ae2718e40f8dc';
    const b = '1998b7250e16f';
    const c =  9 + 1;
    return a + b + c;
}

const API_KEY = _getKey();

async function getWeather(location, unit) {
    try {
        //call the api
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${unit}`,
        { mode: 'cors',});

        const weatherData = await response.json();

        console.log(weatherData);
        const filteredData = _filterData(weatherData);
        populateData(filteredData, unit);

    }
    catch(err){
        console.log(err);
        populateErr();
    };
};

//process data to display
function _filterData(weatherData) {
    //coordinates
    const lat = weatherData.coord.lat;
    const lon = weatherData.coord.lon;
    //city
    const city = weatherData.name;
    //weather (sunny/cloudy/rainy/etc)
    const sky = weatherData.weather[0].description;
    const iconId = weatherData.weather[0].icon;
    //temp
    const mainTemp = Math.round(weatherData.main.temp);
    const feelsLike = Math.round(weatherData.main.feels_like);
    const hi = Math.round(weatherData.main.temp_max);
    const lo = Math.round(weatherData.main.temp_min);
    //humidity
    const humidity = weatherData.main.humidity;
    //wind
    const windSpeed = Math.round(weatherData.wind.speed);
    const windDirection = weatherData.wind.deg;

    const displayData = {
        lat,
        lon,
        city,
        sky,
        iconId,
        mainTemp,
        feelsLike,
        hi,
        lo,
        humidity,
        windSpeed,
        windDirection,
    };
    //console.log(displayData);
    return displayData;
};

function findWindDirection(deg) {
    switch (true) {
        case (deg < 22.5):
            return 'N';
        case (deg < 67.5):
            return 'NE';
        case (deg < 112.5):
            return 'E';
        case (deg < 157.5):
            return 'SE';
        case (deg < 202.5):
            return 'S';
        case (deg < 247.5):
            return 'SW';
        case (deg < 192.5):
            return 'W';
        case (deg < 337.5):
            return 'NW';
        case (deg > 337.6):
            return 'N';
        default:
          console.log('Windy Boi Trouble');
    };
};

function _searchValue() {
    const searchInput = document.querySelector('.form-input');
    //if (!searchInput.value) {return};
    return searchInput.value;
};

function _searchUnit() {
    const fBtn = document.querySelector('.fahrenheit');

    if (fBtn.matches('.selected')) {
        return 'imperial';
    } else {
        return 'metric';
    };
};

function getWeatherSearch() {
    const city = _searchValue();
    const unit = _searchUnit();
    getWeather(city, unit);
};

function getCurrentSearch() {
    const city = document.querySelector('.city').textContent;
    const unit = _searchUnit();
    getWeather(city, unit);
};

function unitChangeSearch() {
    const searchInput = document.querySelector('.form-input');
    return !searchInput.value ? getCurrentSearch() : getWeatherSearch();
};

function removeSelected() {
    const unitBtns = document.querySelectorAll('.unit-btn');
    unitBtns.forEach(btn => btn.classList.remove('selected'));
};

export { findWindDirection, getWeatherSearch, unitChangeSearch, removeSelected, getWeather, getCurrentSearch };