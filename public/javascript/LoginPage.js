import {dictionary} from './dictionary.js';
import LanguageSwitcher from "./LanguageSwitcher.js";

//import Header from "./Header.js";

class LoginPage {
    constructor() {
        this.currentLanguage = localStorage.getItem('current-lang') || 'en';
    }

    renderLoginPage() {

        const loginPageWrapper = document.createElement('div');
        loginPageWrapper.classList.add('login_page', 'welcome_page');

        loginPageWrapper.innerHTML = `
            <div class='login_page_left-side welcome_page_right-side'>

                 <form action="/users/login" method="POST" class="login-form">
                    <h1 class="login-form_header"><i class="fas fa-sign-in-alt"></i> <span data-key="login-header">${dictionary[this.currentLanguage]['login-header']}</span></h1>
                    <input data-key="placeholder-email" type="email" class="login-form_input" id="email" name="email" placeholder="${dictionary[this.currentLanguage]['placeholder-email']}">
                    <input data-key="placeholder-password" type="password" class="login-form_input" id="password" name="password" placeholder="${dictionary[this.currentLanguage]['placeholder-password']}">
                    <button type="submit" class="btn btn-primary btn-block" data-key="login-button">${dictionary[this.currentLanguage]['login-button']}</button>
                     <div class="login-register"><div data-key="no-account">${dictionary[this.currentLanguage]['no-account']}</div> <a data-key="register" href="/users/register">${dictionary[this.currentLanguage]['register']}</a></div>
                </form>
            </div>
            
            <div class='login_page_right-side welcome_page_left-side'></div>
        `;
        return loginPageWrapper;
    }
}

const login = new LoginPage().renderLoginPage();

window.addEventListener('load', () => {
    document.querySelector('.app_main').appendChild(login);
    const languageSwitcher = new LanguageSwitcher();
    languageSwitcher.initLanguageSwitcher();
});

//export default LoginPage;



