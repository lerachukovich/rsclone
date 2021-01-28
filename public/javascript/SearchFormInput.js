import { dictionary } from './dictionary.js';

class SearchFormInput {
    constructor(selectListData, placeholderKey, className) {
        this.currentLanguage = localStorage.getItem('current-lang') || 'en';
        this.selectListData = selectListData;
        this.placeholderKey = placeholderKey;
        this.className = className;
    }

    showInputList(e) {

        const activeInput = e.target;
        const activeInputWrapper = e.target.closest('.search-form_input_wrapper');

        if(activeInput.classList.contains('required-field')) {
            activeInput.classList.remove('required-field');
            activeInput.value = '';
        }
        
        if(!activeInputWrapper.querySelector('.search-form_input_list')) {
            const inputList = document.createElement('ul');
            inputList.classList.add('search-form_input_list');

            this.selectListData.forEach(item => {
                const inputListItem = document.createElement('li');
                inputListItem.classList.add('search-form_input_list-item');

                inputListItem.textContent = item;

                inputListItem.addEventListener('click', (e) => {

                    activeInput.value = e.target.innerText;
                });

                inputList.appendChild(inputListItem);
            });

            this.searchFormInputWrapper.appendChild(inputList);
        }

    }

    delateSelectList(e) {
        const activeSearchInput = e.target.closest('.search-form_input_wrapper');
        
        if(activeSearchInput.querySelector('.search-form_input_list')) {
            setTimeout(function() {
                activeSearchInput.querySelector('.search-form_input_list').remove();}, 500);
        }
    }

    findInputItem(e) {

        const insertMark = (inputValue, position, length) => `${inputValue.slice(0, position)}<mark>${inputValue.slice(position, position + length)}</mark>${inputValue.slice(position + length)}`;
        const deleteMarks = (el) => {
            el.classList.remove('hide-item');
            el.innerHTML = el.innerText;
        };

        const inputValue = this.value.trim();
        const itemsList = document.querySelectorAll('.search-form_input_list-item');

        if (inputValue !== '') {
            itemsList.forEach((element) => {
                const enteredValuePosition = element.innerText.toLowerCase().search(inputValue.toLowerCase());
                if (enteredValuePosition === -1) {
                    element.classList.add('hide-item');
                    element.innerHTML = element.innerText;
                } else {
                    deleteMarks(element);
                    const stringVal = element.innerText;
                    element.innerHTML = insertMark(stringVal, enteredValuePosition, inputValue.length);
                }
            });
        } else {
            itemsList.forEach((element) => {
                    deleteMarks(element);
            });
        }

        // window.onclick = (e) => {
        //         itemsList.forEach((element) => {
        //             deleteMarks(element);
        //         });

        //     if (e.target.className !== 'search-form_input_list-item') {
        //         this.value = e.target.innerText;
        //     }
        // };
    
    }

    renderSearchFormInput() {

        this.searchFormInputWrapper = document.createElement('div');
        this.searchFormInputWrapper.classList.add('search-form_input_wrapper');

        const searchFormInput = document.createElement('input');
        searchFormInput.classList.add(`${this.className}`);
        searchFormInput.classList.add('search-form_input');

        searchFormInput.dataset.key = this.placeholderKey;

        searchFormInput.setAttribute('placeholder', `${dictionary[this.currentLanguage][this.placeholderKey]}`);

        searchFormInput.addEventListener('focus', (e) => this.showInputList(e));

        this.searchFormInputWrapper.appendChild(searchFormInput);

        searchFormInput.addEventListener('input', this.findInputItem);
        searchFormInput.addEventListener('blur', this.delateSelectList);

        return this.searchFormInputWrapper;
    }
}

export default SearchFormInput;