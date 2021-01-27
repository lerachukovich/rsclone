import { dictionary } from './dictionary.js';
import LanguageSwitcher from './LanguageSwitcher.js';

class WelcomePage {
    constructor() {
        this.currentLanguage = localStorage.getItem('current-lang') || 'en';
    }

    renderWelcomePage() {

        const welcomePageWrapper = document.createElement('div');
        welcomePageWrapper.classList.add('welcome_page');

        welcomePageWrapper.innerHTML=`
        <div class='welcome_page_left-side'></div>
        <div class='welcome_page_right-side'>
            <ul class="welcome_page_list">
                <li>
                    <span data-key="discover">${dictionary[this.currentLanguage]['discover']}</span>
                    <span data-key="discover-text"> 
                        ${dictionary[this.currentLanguage]['discover-text']}
                    </span>
                </li>
                <li>
                    <span data-key="book">${dictionary[this.currentLanguage]['book']}</span>
                    <span data-key="book-text">
                        ${dictionary[this.currentLanguage]['book-text']}
                    </span>
                 </li>
                <li>
                    <span data-key="eat">${dictionary[this.currentLanguage]['eat']}</span>
                    <span data-key="eat-text">
                        ${dictionary[this.currentLanguage]['eat-text']}
                    </span>
                </li>
                <li>
                    <span data-key="manage">${dictionary[this.currentLanguage]['manage']}</span>
                    <span data-key="manage-text">
                        ${dictionary[this.currentLanguage]['manage-text']}
                    </span>
                </li>
            </ul>
            <a href="/users/login" class="welcome_page_button" data-key="welcome-button">${dictionary[this.currentLanguage]['welcome-button']}</a>
        </div>
        `;

        return welcomePageWrapper;
    }
}

//const languageSwitcher = new LanguageSwitcher().renderLanguageSwitcher();
const welcome =  new WelcomePage().renderWelcomePage();

window.addEventListener('load', () => {
    document.querySelector('.app_main').appendChild(welcome);
    const languageSwitcher = new LanguageSwitcher();
    languageSwitcher.initLanguageSwitcher();
});

export default WelcomePage;
