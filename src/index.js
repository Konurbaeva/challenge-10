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

 /*  function renderCountry(countries) {
   const countryMarkup = createCountryMarkup(countries);
    countryInfo.insertAdjacentHTML('beforeend', countryMarkup);
  }
 */

  function renderCountry(country) {
    const countryMarkup = countryTemplate(country);
     countryInfo.innerHTML = countryMarkup;
   }
   
 function createCountryMarkup(countries) {
    console.log('countries: ', countries);

    console.log('countries.name: ', countries[0].name);
    console.log('countries.capital: ', countries[0].capital);
    console.log('countries.population: ', countries[0].population);


    const markup =  countries.map(({ name, capital, population, flags, languages } ) => {
      return `
      <div class="countries">
      <img class="country-image" src="${flags.svg}" alt="${name}" />
      <p class="country-capital">Capital: ${{capital}}</p>
      <p class="country-population">Population: ${{population}}</p>
      <div class="country-language"> Language: ${{languages}}</div>
      </a></div>`
      }).join("");
       return markup;
       

/*     const markup =  countries.map(({ name, capital, population, flags, languages } ) => {
        return `
        <div class="countries">
        <img class="country-image" src="${flags.svg}" alt="${name}" />
        <p class="country-capital">Capital: ${{capital}}</p>
        <p class="country-population">Population: ${{population}}</p>
        <div class="country-language"> Language: ${{languages}}</div>
        </a></div>`
        }).join("");
         return markup; */
    }