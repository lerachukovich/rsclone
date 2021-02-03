import Menu from './Menu.js';
import SearchForm from './SearchForm.js';
import CuisinesCarousel from './CuisinesCarousel.js';
import RestaurantsCarousel from './RestaurantsCarousel.js';
import EditProfilePage from './EditProfilePage.js';
import LanguageSwitcher from './LanguageSwitcher.js';
import { dictionary } from './dictionary.js';


class Main {
    constructor() {
        this.appMain = document.querySelector('.app_main');
        this.currentLanguage = localStorage.getItem('current-lang') || 'en';

        const getRandomPage = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + 1;
        };

        const randomPage = getRandomPage(1, 20);

        this.defaultUrl = `https://api.documenu.com/v2/restaurants/search/fields?fullmenu=true&key=035175c2658ba08d8c62792f71cc65b3&page=${randomPage}`;
    }

    addLogoutBtnToFooter() {
        const logoutBtn = document.createElement('a');
        logoutBtn.classList.add('logout-button');
        logoutBtn.href='/users/logout';
        logoutBtn.dataset.key = 'logout-btn';
        logoutBtn.innerHTML = dictionary[this.currentLanguage]['logout-btn'];

        document.querySelector('.app_footer').appendChild(logoutBtn);
    }

    addSpinner() {
        this.spinner = document.createElement('div');
        this.spinner.classList.add('spinner');
        this.defaultTMainPageWrapper.appendChild(this.spinner);
    }

    renderDefaultMainPage(url) {
        this.defaultTMainPageWrapper = document.createElement('div');
        this.defaultTMainPageWrapper.classList.add('default-main-page_wrapper');

        this.appMain.appendChild(this.defaultTMainPageWrapper);

        let renderRestaurantCarouselPromise = new Promise((resolve, reject) => {
            this.addSpinner();
            const newRestCarousel = new RestaurantsCarousel(url, this.defaultTMainPageWrapper);
            resolve(newRestCarousel.getRestaurantsDataForDefaultCarousel());
        });

        renderRestaurantCarouselPromise.then(() => {
            if(this.spinner) {
                this.spinner.remove();
            }
            const newCarousel = new CuisinesCarousel().renderCarousel();
            this.defaultTMainPageWrapper.appendChild(newCarousel);
        });
    }

    addSearchFormToHeader() {
        const headerSearchForm = new SearchForm().renderSearchForm();
        return headerSearchForm;
    }

    addMenuToHeader() {
        const appMenu = new Menu().renderMenu();
        return appMenu;
    }

    showLoginPage() {
        const loginPage = new LoginPage().renderLoginPage();
        this.appMain.appendChild(loginPage);
    }

    clearMainPage() {
        this.appMain.innerHTML = '';
    }

    showWelcomePage() {
        this.clearMainPage();
        const welcomePage = new WelcomePage().renderWelcomePage();
        this.appMain.appendChild(welcomePage);
    }

    handleClicks(e) {
        let dashboardBlock;

        if(e.target.closest('.dashboard-block') !== null) {
            dashboardBlock = e.target.closest('.dashboard-block');

            if(dashboardBlock.id && dashboardBlock.id === 'main') {
                this.clearMainPage();
                this.renderDefaultMainPage(this.defaultUrl);
            }

            if(dashboardBlock.id && dashboardBlock.id === 'logout') {
                window.location.pathname = '/users/logout';
            }

            if(dashboardBlock.id && dashboardBlock.id === 'edit') {
                this.clearMainPage();
                const editProfilePage = new EditProfilePage(this.appMain, this.userName);
                editProfilePage.renderEditProfilePage();
            }
        }

        if(e.target.closest('.menu_list') !== null) {
            if(e.target.dataset.key === 'about-us') {
                this.clearMainPage();
                this.renderDefaultMainPage(this.defaultUrl);
            }

            if(e.target.dataset.key === 'your-profile') {
                this.clearMainPage();
                const editProfilePage = new EditProfilePage(this.appMain, this.userName);
                editProfilePage.renderEditProfilePage();
            }
        }

    }

    handleKeyEvents(e) {
        if(e.code === 'KeyR' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            this.clearMainPage();
            this.renderDefaultMainPage(this.defaultUrl);
        }

        if(e.code === 'KeyP' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            this.clearMainPage();
            const profilePage = new EditProfilePage(this.appMain, this.userName);
            profilePage.renderEditProfilePage();
        }

    }

    initMain() {
        window.addEventListener('click', (e) => this.handleClicks(e));

        const languageSwitcher = new LanguageSwitcher();
        languageSwitcher.initLanguageSwitcher();

        const searchingForm = this.addSearchFormToHeader();
        const appMenuBtn = this.addMenuToHeader();

        const headerRightPart = document.querySelector('.header_right-part');

        headerRightPart.appendChild(searchingForm);
        headerRightPart.appendChild(appMenuBtn);

        this.addLogoutBtnToFooter();

        document.addEventListener('keydown', (e) => this.handleKeyEvents(e));

        this.userName = document.querySelector('.user-name').textContent;

    }
}

window.addEventListener('load', () => {
    const mainApp =  new Main();
    mainApp.initMain();
});


export default Main;

