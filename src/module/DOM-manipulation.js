import { findWindDirection } from './logic-functions';

//********** ---------- DOM POPULATION ----------**********

function populateData(displayData, unit) {
    //display
    const city = document.querySelector('.city');
    city.textContent = displayData.city;

    const currentTemp = document.querySelector('.current-temp');
    currentTemp.textContent = displayData.mainTemp + '°';

    const hiTemp = document.querySelector('.high');
    hiTemp.textContent = 'H: ' + displayData.hi + '°';

    const loTemp = document.querySelector('.low');
    loTemp.textContent = 'L: ' + displayData.lo + '°';

    //details
    const skyImg = document.querySelector('.icon');
    skyImg.src = 'https://openweathermap.org/img/wn/' + displayData.iconId + '@4x.png';
    skyImg.alt = displayData.sky;

    const skyDescription = document.querySelector('.sky');
    skyDescription.textContent = displayData.sky;

    const feelsLikeTemp = document.querySelector('.feels-like');
    feelsLikeTemp.textContent = displayData.feelsLike + '°';

    const humidity = document.querySelector('.humidity');
    humidity.textContent = displayData.humidity + '%';

    const windDir = findWindDirection(displayData.windDirection);
    const windSpeed = document.querySelector('.wind');
    if (unit === 'imperial') {
        windSpeed.textContent = displayData.windSpeed + ' mph ' + windDir;
    } else {
        windSpeed.textContent = displayData.windSpeed + ' m/s ' + windDir;
    };
};

function populateErr() {
    const parent = document.querySelector('header');
    const searchErr = document.createElement('p');
    searchErr.classList.add('search-err');
    searchErr.textContent = 'Oops! City not found, try again.';
    parent.appendChild(searchErr);
    setTimeout(function(){ searchErr.remove() }, 3000);
};

export { populateData, populateErr };