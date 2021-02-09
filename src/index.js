import './normalize.css';
import './style.css';
import { getWeather } from './module/logic-functions';
import { addEventListeners } from './module/event-listeners';

addEventListeners();

getWeather('detroit', 'imperial');