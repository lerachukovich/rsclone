import {statesCodes} from './inputListsData.js';

export const getRestaurantsData = async (state, cuisine) => {
    if(state && cuisine) {
        const stateCode = statesCodes[state];
        const url = `https://api.documenu.com/v2/restaurants/state/${stateCode}?key=9509fd93681327cefe078c26c8fb0ca2&fullmenu=true&cuisine=${cuisine}`;

    await fetch(url)
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
    });

    }
};





// const getCountriesInfo = async () => {
//     const url = './js/data/countriesInfo.json';

//     await fetch(url)
//     .then((response) => response.json())
//     .then((result) => {
//         localStorage.setItem('countries-info', JSON.stringify(result));
//     });
// };