export const BASE_URL = 'https://restcountries.com';

function fetchCountries(name) {                        
   return fetch(`${BASE_URL}/v3.1/name/${name}`)
    .then(response => response.json())
    .catch(err => console.log(err));
}

function filterCountries(name, capital, currencies) {
    return fetch(`${BASE_URL}//v2/all?fields=${name},${capital},${currencies}`)
     .then(response => response.json())
     .catch(err => console.log(err));
 }
 
export default {fetchCountries, filterCountries, BASE_URL};