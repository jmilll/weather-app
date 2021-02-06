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
    //call the api
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${unit}`);

    const weatherData = await response.json();
    //const response2 = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London&mode=xml')
    //process data

    console.log(weatherData);
    filterData(weatherData);
    //return a value
    //return weatherData;
};
//getWeather('detroit', 'imperial');


//process data i want to display
function filterData(weatherData) {
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

    const displayData = {
        city,
        sky,
        iconId,
        mainTemp,
        feelsLike,
        hi,
        lo,
        humidity,
        windSpeed,
    }
    console.log(displayData);
    return displayData;
}

function displayData() {

}



/*------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------*/
//EVENT LISTENERS

const celciusBtn = document.querySelector('.celcius');


const celciusBtn = document.querySelector('.fahrenheit');

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