import WelcomePage from './WelcomePage';
import LoginPage from './LoginPage';


class Main {

    showLoginPage() {
        const loginPage = new LoginPage().renderLoginPage();
        this.appMain.appendChild(loginPage);


    }

    clearMainPage() {
        //const currentMainPageContext = document.querySelector('.app_main');
        this.appMain.innerHTML = '';
    }

    handleClicks(e) {
        if(e.target.className === 'welcome_page_button') {
            this.clearMainPage();
            this.showLoginPage();
        }
    }

    renderMain() {

        this.appMain = document.createElement('main');
        this.appMain.classList.add('app_main');

        const welcomePage = new WelcomePage().renderWelcomePage();

        window.addEventListener('click', (e) => this.handleClicks(e));

        this.appMain.appendChild(welcomePage);

        return this.appMain;
    }
}

export default Main;