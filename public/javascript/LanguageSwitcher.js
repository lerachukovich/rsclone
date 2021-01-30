import { dictionary } from './dictionary.js';
class LanguageSwitcher {

    changeLanguage(e) {

        if(document.querySelector('.lang_active')) {
            document.querySelector('.lang_active').classList.remove('lang_active');
        }

        e.target.classList.add('lang_active');

        const langCode = e.target.dataset.lang;

        localStorage.setItem('current-lang', langCode);

        const textNodes = document.querySelectorAll('[data-key]');

        textNodes.forEach(item => {
            const wordKey = item.dataset.key;
            if(item.localName === 'input') {
                item.setAttribute('placeholder', `${dictionary[langCode][wordKey]}`);
            } 
            item.innerHTML = dictionary[langCode][wordKey];
        });

    }

    initLanguageSwitcher() {
        const languageSwitcher = document.querySelector('.lang_wrapper');

        if(localStorage.getItem('current-lang')) {
            const langNow = localStorage.getItem('current-lang');
            const langNowButton = document.querySelector(`[data-lang="${langNow}"]`);
            
            if(document.querySelector('.lang_active')) {
                document.querySelector('.lang_active').classList.remove('lang_active');
            }
    
            langNowButton.classList.add('lang_active');
        }

        languageSwitcher.addEventListener('click', this.changeLanguage);

        return languageSwitcher;
    }

}

export default LanguageSwitcher;

