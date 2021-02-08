//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//import './style.css';
//import { renderProjects, loadActive, } from './module/project';
console.log('weather-app2');

//API KEY: 
//DOVI KEY: 3069ae2718e40f8dc1998b7250e16f10
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=imperial

const API_KEY = '3069ae2718e40f8dc1998b7250e16f10';

//<!--degree symbol in UNICODE use-->
//° or °

async function getWeather(location, unit) {
    try {
        //call the api
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${unit}`);

        const weatherData = await response.json();
        //const response2 = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London&mode=xml')
        //process data

        console.log(weatherData);
        const filteredData = filterData(weatherData);
        populateData(filteredData, unit);

    }
    catch(err){
        console.log(err);
        console.log('Oops, city not found :(');
        populateErr();
    };
};

//getWeather('detroit', 'imperial');

function populateErr() {
    const parent = document.querySelector('header');
    const searchErr = document.createElement('p');
    searchErr.classList.add('search-err');
    searchErr.textContent = 'Oops! City not found, try again.';
    parent.appendChild(searchErr);
    setTimeout(function(){ searchErr.remove() }, 3000);
};


//process data i want to display
function filterData(weatherData) {
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
    console.log(displayData);
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

//DOM population

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

function searchValue() {
    const searchInput = document.querySelector('.form-input');
    //if (!searchInput.value) {return};
    console.log(searchInput.value);
    return searchInput.value;
};

function searchUnit() {
    const cBtn = document.querySelector('.celcius');
    const fBtn = document.querySelector('.fahrenheit');

    if (fBtn.matches('.selected')) {
        return 'imperial';
    } else {
        return 'metric';
    };

};

function getWeatherSearch() {
    let city = searchValue();
    let unit = searchUnit();
    getWeather(city, unit);
};

function removeSelected() {
    const unitBtns = document.querySelectorAll('.unit-btn');
    unitBtns.forEach(btn => btn.classList.remove('selected'));
};
/*------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------*/
//EVENT LISTENERS
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', (e) => {
    //if required input is empty --> cancel
    if (!document.querySelector('.form-input').value) {return};
    e.preventDefault();
    //things you want to do
    getWeatherSearch();
});

const celciusBtn = document.querySelector('.celcius');
celciusBtn.addEventListener('click', () => {
    removeSelected();
    celciusBtn.classList.add('selected');
    getWeatherSearch();
});

//boolean check if one is selected
//fahrenheitBtn.matches('.selected')

const fahrenheitBtn = document.querySelector('.fahrenheit');
fahrenheitBtn.addEventListener('click', () => {
    removeSelected();
    fahrenheitBtn.classList.add('selected');
    getWeatherSearch();
});


/*
//dont want to call the api a bunch of times
async function filterData2(location, unit) {
    //city
    const city = getWeather(location, unit).name;
    //weather (sunny/cloudy/rainy/etc)
    const sky = getWeather(location, unit).weather[0].description;
    const iconId = getWeather(location, unit).weather[0].icon;
    //actual temp
    const mainTemp = getWeather(location, unit).main.temp;
    const feelsLike = getWeather(location, unit).main.feels_like;
    // hi/lo
    const hi = getWeather(location, unit).main.temp_max;
    const lo = getWeather(location, unit).main.temp_min;
    //humidity
    const humidity = getWeather(location, unit).main.humidity;
    //wind
    const windSpeed = getWeather(location, unit).wind.speed;

    const displayData = await Promise.all([
        city,
        sky,
        iconId,
        mainTemp,
        feelsLike,
        hi,
        lo,
        humidity,
        windSpeed,
    ])

    return displayData;
}

//city

//weather (sunny/cloudy/rainy/etc)
//actual temp
// hi/lo
//humidity
//wind


const getFruit = async(name) => {
    const fruits = {
        pineapple: 'piney',
        peach: 'peachy',
        strawberry: 'rawberry'
    }
    return Promise.resolve(fruits[name]);
}
//getFruit('peach').then(console.log)

const makeSmoothie = async() => {
    try {
        const a = getFruit('pineapple');
        const b = getFruit('strawbery');
        const smoothie = await Promise.all([a, b]);

        //throw 'its broken'; //for testing

        return smoothie;

    } catch(err) {
        console.log(err);
    }
};

*/

//export {allProjects, setData,};