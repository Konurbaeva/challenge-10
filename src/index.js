import debounce from 'lodash.debounce';
// import getRefs from "./js/get-refs";
import Notiflix from 'notiflix';
import BASE_URL from "./js/api-service.js";
import singleCountryTemplate from './templates/singleCountryTemplate.hbs';
import multipleCountriesTemplate from './templates/multipleCountriesTemplate.hbs';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


searchBox.addEventListener('input', debounce(filterCountriesChange, DEBOUNCE_DELAY));

function filterCountriesChange() {
  
  BASE_URL.filterCountries(searchBox.value)
    .then(checkResponse)
    .catch(onFetchError);
}


function checkResponse(response) {

    if(response.message === 'Not Found' || response.message === 'Page Not Found'){
      Notiflix.Notify.failure("Oops, there is no country with that name");
    } else if (response.length > 5) {
      Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else {
      renderCountry(response);
    }
}
  function onFetchError(error) {
    console.error(error);
    Notiflix.Notify.failure('error: ', error);
   }

  function renderCountry(response) {
    if(response.length > 2 || response.length < 10) {
      const countryMarkup = multipleCountriesTemplate(response).trim()
      countryInfo.innerHTML = countryMarkup;
    } else {
      const countryMarkup = singleCountryTemplate(response).trim()
      countryInfo.innerHTML = countryMarkup;
    }
   }