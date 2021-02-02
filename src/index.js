//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//import './style.css';
//import { renderProjects, loadActive, } from './module/project';
console.log('weather-app2');

//API KEY: 
//DOVI KEY: 3069ae2718e40f8dc1998b7250e16f10
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=imperial

const API_KEY = '3069ae2718e40f8dc1998b7250e16f10';


async function getWeather(location, unit) {
    //call the api
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${unit}`);

    const weatherData = await response.json();
    //const response2 = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London&mode=xml')
    //process data

    console.log(weatherData);
    //return a value
};
getWeather('detroit', 'imperial');


//process data i want to display

//city
//weather (sunny/cloudy/rainy/etc)
//actual temp
// hi/lo
//humidity
//wind







//export {allProjects, setData,};