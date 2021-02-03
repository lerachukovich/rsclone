import {statesCodes} from './inputListsData.js';

export const getRestaurantsData = async (state, cuisine) => {
    if(state && cuisine) {
        const stateCode = statesCodes[state];
        const url = `https://api.documenu.com/v2/restaurants/state/${stateCode}?key=035175c2658ba08d8c62792f71cc65b3&fullmenu=true&cuisine=${cuisine}`;

    await fetch(url)
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
    });

    }
};

