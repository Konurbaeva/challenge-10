import debounce from 'lodash.debounce';
// import getRefs from "./js/get-refs";
import Notiflix from 'notiflix';
import BASE_URL from "./js/api-service.js";
import countryTemplate from './templates/countryHandleBar.hbs';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


searchBox.addEventListener('input', debounce(filterCountriesChange, DEBOUNCE_DELAY));

/* function fetchCountriesChange(e) {
    BASE_URL.fetchCountries(searchBox.value)
    .then(renderCountry)
    .catch(onFetchError)
  } */

/* function filterCountriesChange() {
  
  BASE_URL.filterCountries(searchBox.value)
    .then(renderCountry)
    .catch(onFetchError)
} */

function filterCountriesChange() {
  
  BASE_URL.filterCountries(searchBox.value)
    .then(checkResponse)
    .catch(onFetchError);
}


function checkResponse(response) {

  console.log('checkResponse: ' + response.message)

  if(response.message === 'Not Found' || response.message === 'Page Not Found'){
    Notiflix.Notify.failure("Oops, there is no country with that name");
  } else {
    renderCountry(response);
  }
}
  function onFetchError(error) {
    console.error(error);
    Notiflix.Notify.failure('error: ', error);
   }

  function renderCountry(country) {
    const countryMarkup = countryTemplate(country).trim()
     countryInfo.innerHTML = countryMarkup;
   }