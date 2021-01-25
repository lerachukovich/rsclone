import { dictionary } from './dictionary.js';
import LanguageSwitcher from "./LanguageSwitcher.js";
import Header from "./Header.js";

class LoginPage {
    constructor() {
        this.currentLanguage = localStorage.getItem('current-lang') || 'en';
    }

    renderLoginPage() {

        const loginPageWrapper = document.createElement('div');
        loginPageWrapper.classList.add('login_page', 'welcome_page');

        loginPageWrapper.innerHTML=`
        <div class='login_page_left-side welcome_page_right-side'>
            <form action="/users/login" method="POST" class="login-form">
                <h2 class="login-form_header" data-key="login-header">${dictionary[this.currentLanguage]['login-header']}</h2>
                <label class="login-form_label" data-key="login-email" for="email">${dictionary[this.currentLanguage]['login-email']}</label>
                <input data-key="placeholder-email" type="email" class="login-form_input" id="email" name="email" placeholder="${dictionary[this.currentLanguage]['placeholder-email']}">
                <label class="login-form_label" data-key="login-password" for="password">${dictionary[this.currentLanguage]['login-password']}</label>
                <input data-key="placeholder-password" type="password" class="login-form_input" id="password" name="password" placeholder="${dictionary[this.currentLanguage]['placeholder-password']}">
                <button type="submit" class="login-form_button welcome_page_button" data-key="login-button">${dictionary[this.currentLanguage]['login-button']}</button>
            </form>
            <p>No Account?<a href="/users/register">Register</a></p>
        </div>
        <div class='login_page_right-side welcome_page_left-side'></div>
        `;
        return loginPageWrapper;
    }
}

const languageSwitcher = new LanguageSwitcher().renderLanguageSwitcher();
const login =  new LoginPage().renderLoginPage();

window.addEventListener('load', () => {
    document.body.appendChild(login);
    document.body.appendChild(languageSwitcher);
});


