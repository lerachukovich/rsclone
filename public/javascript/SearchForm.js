import SearchFormInput from './SearchFormInput.js';
import {statesList, cuisinesList} from './inputListsData.js';
import { dictionary } from './dictionary.js';
import {statesCodes} from './inputListsData.js';
import Main from './Main.js';

class SearchForm{

    constructor() {
        this.currentLanguage = localStorage.getItem('current-lang') || 'en';
    }

    checkInputsValue(stateInput, stateInputValue, cuisineInput, cuisineInputValue) {

        if(stateInputValue === '') {
            stateInput.classList.add('required-field');
            stateInput.value = 'Required field';
        }

        if(cuisineInputValue === '') {
            cuisineInput.classList.add('required-field');
            cuisineInput.value = 'Required field';
        }

        if(cuisineInputValue && stateInputValue) {

            document.querySelector('.app_main').innerHTML = '';

            const stateCode = statesCodes[stateInputValue];
            const searchUrl = `https://api.documenu.com/v2/restaurants/state/${stateCode}?key=035175c2658ba08d8c62792f71cc65b3&fullmenu=true&cuisine=${cuisineInputValue}`;

            const main = new Main();
            main.renderDefaultMainPage(searchUrl);
        }
    }

    renderSearchForm() {
        const searchForm = document.createElement('form');
        searchForm.classList.add('search-form');

        const searchStateInput = new SearchFormInput(statesList, 'state-input-placeholder', 'search-form_input-state' ).renderSearchFormInput();
        

        const searchCuisineInput = new SearchFormInput(cuisinesList, 'cuisine-input-placeholder', 'search-form_input-cuisine').renderSearchFormInput();
        
        const submitSearchFormBtn = document.createElement('button');
        submitSearchFormBtn.classList.add('search-form_button');
        submitSearchFormBtn.setAttribute('type', 'submit');
        submitSearchFormBtn.dataset.key = 'search-form-button';
        submitSearchFormBtn.textContent = `${dictionary[this.currentLanguage]['search-form-button']}`;

        searchForm.appendChild(searchStateInput);
        searchForm.appendChild(searchCuisineInput);
        searchForm.appendChild(submitSearchFormBtn);

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const searchStateInputValue = searchStateInput.firstChild.value;
            const searchCuisineInputValue = searchCuisineInput.firstChild.value;

            this.checkInputsValue(searchStateInput.firstChild, searchStateInputValue, searchCuisineInput.firstChild, searchCuisineInputValue);
        });

        return searchForm;
    }

}

export default SearchForm;