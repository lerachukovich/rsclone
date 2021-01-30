import {dictionary} from './dictionary.js';
import LanguageSwitcher from './LanguageSwitcher.js';

const changeLang = () => {

    const currentLanguage = localStorage.getItem('current-lang') || 'en';

    const textNodes = document.querySelectorAll('[data-key]');

    textNodes.forEach(item => {
        const wordKey = item.dataset.key;
        if(item.localName === 'input') {
            item.setAttribute('placeholder', `${dictionary[currentLanguage][wordKey]}`);
        } 
        item.innerHTML = dictionary[currentLanguage][wordKey];
    });
};

changeLang();

window.addEventListener('load', () => {
    const langSwitcher = new LanguageSwitcher();
    langSwitcher.initLanguageSwitcher();
});
