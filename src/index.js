import debounce from 'lodash.debounce';
// import getRefs from "./js/get-refs";
import Notiflix from 'notiflix';
import BASE_URL from "./js/api-service.js";
import fetchCountries from './js/fetchCountries.js';

import countryTemplate from './templates/countryHandleBar.hbs';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const log = document.getElementById('values');


searchBox.addEventListener('input', debounce(fetchCountriesChange, DEBOUNCE_DELAY));

function fetchCountriesChange(e) {
    log.textContent = e.target.value;

    BASE_URL.fetchCountries(searchBox.value)
    .then(renderCountry)
    .catch(onFetchError)

  }

/* function filterCountriesChange(e) {
  console.log('name: ')
  console.log('capital: ')
  console.log('currencies: ')

  BASE_URL.filterCountries(capitalEl.value, populationEl.value, languageEl.value)
  .then(renderCountry)
  .catch(onFetchError)
}
 */

function filterCountriesChange(e) {

  BASE_URL.filterCountries()
  .then(renderCountry)
  .catch(onFetchError)

}

function onSuccess(success) {
  console.log('response on success', success);
 }

  function onFetchError(error) {
    console.error(error);
   // Notiflix.Notify.failure('error: ', error);
   }

  function renderCountry(country) {
    const countryMarkup = countryTemplate(country);
     countryInfo.innerHTML = countryMarkup;
   }
   