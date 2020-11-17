import './styles.css';

import NewApiService from './js/api';
import countriesCard from './templates/countries.hbs';
import countriesList from './templates/countries-list.hbs';

import 'material-design-icons/iconfont/material-icons.css';
import "@pnotify/core/dist/PNotify.css";
import '@pnotify/core/dist/BrightTheme.css';
import {defaults, alert} from'@pnotify/core';

const debounce = require('lodash.debounce');

const searchForm = document.querySelector('.search__input');
const listCountry = document.querySelector('.countries-container');

const newApiService = new NewApiService();


searchForm.addEventListener('input', debounce(onSearch, 500));


function onSearch(event) {
    event.preventDefault();
    
    
    const search = newApiService.searchQuery = event.target.value;
    
    clearCountryContainer();
    
    if(search === ''){
    return
    };

    fetchCountries()
}

function pushError() {
    alert({
        text: 'Шеф, все пропало! Cделай запрос более специфичным'
    });
}


function fetchCountries() {
    
    newApiService.fetchCountries()

    .then(country => {
        if(country.length === 1){
            renderCountryCard(country, countriesCard);
        } else if(country.length <= 10){
            renderCountryCard(country, countriesList);
        } else if(country.length > 10){
            pushError()
        }
    })   
}

function renderCountryCard(country, hbs) {
    return listCountry.insertAdjacentHTML('beforeend', hbs(country))
}

function clearCountryContainer() {
    listCountry.innerHTML = '';
}



defaults.styling ='material';
defaults.icons = 'material';
defaults.width = '360px'; // ширина
defaults.minHeight = '40px'; // мин высота
defaults.delay = '1500'; // время показа уведомления
defaults.closer = false; // крестик закрытия
defaults.sticker = false; // иконка булавки
defaults.addClass = 'error'; // кастомный класс для своих стилей
defaults.autoOpen = true; // сработка при объявлении


