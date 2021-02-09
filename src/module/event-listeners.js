import { clearSearch } from './DOM-manipulation';
import { getWeatherSearch, removeSelected, getCurrentSearch } from './logic-functions';

//********** ---------- EVENT LISTENERS ----------**********

function addEventListeners() {
    const searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', (e) => {
        //if required input is empty --> cancel
        if (!document.querySelector('.form-input').value) {return};
        e.preventDefault();
        //things you want to do
        getWeatherSearch();
        clearSearch();
    });

    const celciusBtn = document.querySelector('.celcius');
    celciusBtn.addEventListener('click', () => {
        removeSelected();
        celciusBtn.classList.add('selected');
        getCurrentSearch();
        //unitChangeSearch();
    });

    const fahrenheitBtn = document.querySelector('.fahrenheit');
    fahrenheitBtn.addEventListener('click', () => {
        removeSelected();
        fahrenheitBtn.classList.add('selected');
        getCurrentSearch();
        //unitChangeSearch();
    });
};

export { addEventListeners };