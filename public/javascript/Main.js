import Menu from './Menu.js';
import SearchForm from './SearchForm.js';
import CuisinesCarousel from './CuisinesCarousel.js';
import RestaurantsCarousel from './RestaurantsCarousel.js';
import EditProfilePage from './EditProfilePage.js';
import LanguageSwitcher from './LanguageSwitcher.js';


class Main {
    constructor() {
        this.appMain = document.querySelector('.app_main');
    }

    addSpinner() {
        this.spinner = document.createElement('div');
        this.spinner.classList.add('spinner');
        this.defaultTMainPageWrapper.appendChild(this.spinner);
    }

    renderDefaultMainPage() {

        this.defaultTMainPageWrapper = document.createElement('div');
        this.defaultTMainPageWrapper.classList.add('default-main-page_wrapper');

        this.appMain.appendChild(this.defaultTMainPageWrapper);

        const getRandomPage = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + 1;
        };

        //const randomPage = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
        const randomPage = getRandomPage(1, 20);
        
        const url = `https://api.documenu.com/v2/restaurants/search/fields?fullmenu=true&key=9509fd93681327cefe078c26c8fb0ca2&page=${randomPage}`;

        // const newRestCarousel = new RestaurantsCarousel(url, this.appMain);
        // newRestCarousel.getRestaurantsDataForDefaultCarousel();

        // const newCarousel = new CuisinesCarousel().renderCarousel();
        // this.appMain.appendChild(newCarousel);

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
        //const headerRightPart = document.querySelector('.header_right-part');
        
        const appMenu = new Menu().renderMenu();
        return appMenu;

        //headerRightPart.appendChild(appMenu);
    }

    showLoginPage() {
        const loginPage = new LoginPage().renderLoginPage();
        this.appMain.appendChild(loginPage);
    }

    clearMainPage() {
        //const currentMainPageContext = document.querySelector('.app_main');
        this.appMain.innerHTML = '';
    }

    showWelcomePage() {
        this.clearMainPage();
        const welcomePage = new WelcomePage().renderWelcomePage();
        this.appMain.appendChild(welcomePage);
    }

    handleClicks(e) {
        const dashboardBlock = e.target.closest('.dashboard-block');
        console.dir(window.location);

        if(dashboardBlock.dataset.aim === 'dashboard' && e.target.id !== 'logout') {
            //window.location.pathname = '/';
            const headerRightPart = document.querySelector('.header_right-part');

            const searchingForm = this.addSearchFormToHeader();
            const appMenuBtn = this.addMenuToHeader();

            headerRightPart.appendChild(searchingForm);
            headerRightPart.appendChild(appMenuBtn);

        }

        if(dashboardBlock.id === 'main') {
            this.clearMainPage();
            this.renderDefaultMainPage();
        }

        if(dashboardBlock.id === 'logout') {
            window.location.pathname = '/users/logout';
        }

        if(dashboardBlock.id === 'edit') {
            const userName = document.querySelector('.user-name').textContent;
            const userMail = document.querySelector('.user-email').textContent;
          
            this.clearMainPage();
            const editProfilePage = new EditProfilePage(this.appMain, userName, userMail);
            editProfilePage.renderEditProfilePage();
            //this.editProfilePage(this.appMain, userName, userMail);
        }

        if(e.target.id === 'login-btn') {
            e.preventDefault();

            const searchingForm = this.addSearchFormToHeader();
            const appMenuBtn = this.addMenuToHeader();

            headerRightPart.appendChild(searchingForm);
            headerRightPart.appendChild(appMenuBtn);

            this.clearMainPage();
            this.renderDefaultMainPage();
        }
    }

    initMain() {
        window.addEventListener('click', (e) => this.handleClicks(e));  
        const languageSwitcher = new LanguageSwitcher();
        languageSwitcher.initLanguageSwitcher();
    }
}

window.addEventListener('load', () => {
    const mainApp =  new Main();
    mainApp.initMain();
});


export default Main;

