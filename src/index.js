//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './normalize.css';
import './style.css';
import { getWeather } from './module/logic-functions';
import { addEventListeners } from './module/event-listeners';


console.log('weather-app');



addEventListeners();

getWeather('detroit', 'imperial');

console.log('finish load');


//export {allProjects, setData,};