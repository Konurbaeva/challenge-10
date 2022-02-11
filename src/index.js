// import getRefs from "./js/get-refs";
import Notiflix from 'notiflix';
import API from "./js/api-service.js";
//import countryTemplate from './country-info.hbs';

//const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const log = document.getElementById('values');

searchBox.addEventListener('input', fetchCountriesChange);
//searchBox.addEventListener('onchange', filterCountriesChange);



function fetchCountriesChange(e) {
    log.textContent = e.target.value
   // const currentTarget = e.currentTarget.value;

    console.log('fetchCountriesChange: ',  searchBox.value)

    API.fetchCountries(searchBox.value)
    .then(renderCountry)
    .catch(onFetchError)
  }

/* 
todo implement filter
function filterCountriesChange(e) {
    log.textContent = e.target.value
    const currentTarget = e.currentTarget.value;

    API.filterCountries(currentTarget)
    .then(renderCountry)
    .catch(onFetchError)
  } */

  function onFetchError(error) {
    console.error(error);
   // Notiflix.Notify.failure('error: ', error);
   }

  function renderCountry(countries) {
    const countryMarkup = createCountryMarkup(countries);
    countryInfo.insertAdjacentHTML('beforeend', countryMarkup);
  }

 function createCountryMarkup(countries) {

    console.log('countries: ', countries);

    const markup =  countries.map(({ name, capital, population, flags, languages } ) => {
        return `
        <img class="country-image" src="${flags.svg}" alt="${name}" />
        <p class="country-capital">Capital: ${{capital}}</p>
        <p class="country-population">Population: ${{population}}</p>
        <div class="country-language"> Language: ${{languages}}</div>
        </a>`
        }).join("");
         return markup;
    }