import { dictionary } from './dictionary';

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
            item.innerHTML = dictionary[langCode][wordKey];
        });

    }

    renderLanguageSwitcher() {
        const languageSwitcher = document.createElement('div');
        languageSwitcher.classList.add('lang_wrapper');

        languageSwitcher.innerHTML = `
        <div class="en-lang lang_active" data-lang="en"></div>
        <div class="ru-lang" data-lang="ru"></div>
        `;

        languageSwitcher.addEventListener('click', this.changeLanguage);

        localStorage.setItem('current-lang', 'en');

        return languageSwitcher;
    }

}

export default LanguageSwitcher;