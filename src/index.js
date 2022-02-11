import debounce from 'lodash.debounce';
// import getRefs from "./js/get-refs";
import Notiflix from 'notiflix';
import BASE_URL from "./js/api-service.js";
import fetchCountries from './js/fetchCountries.js';
//import countryTemplate from './country-info.hbs';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const log = document.getElementById('values');
const capitalEl = document.querySelector('.country-capital');
const populationEl = document.querySelector('.country-population');
const languageEl = document.querySelector('.country-language');


searchBox.addEventListener('input', debounce(fetchCountriesChange, DEBOUNCE_DELAY));

function fetchCountriesChange(e) {
    log.textContent = e.target.value;

    BASE_URL.fetchCountries(searchBox.value)
    .then(renderCountry)
    .catch(onFetchError)

  }

function filterCountriesChange(e) {

  console.log('name: ')
  console.log('capital: ')
  console.log('currencies: ')

  BASE_URL.filterCountries(capitalEl.value, populationEl.value, languageEl.value)
  .then(renderCountry)
  .catch(onFetchError)

}

function onSuccess(success) {
  console.log('response on success', success);
 // Notiflix.Notify.failure('error: ', error);
 }


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