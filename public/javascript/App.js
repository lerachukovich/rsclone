//import Header from './Header.js';
import Main from './Main.js';
//import Footer from './Footer.js';
import LanguageSwitcher from './LanguageSwitcher.js';

class App {

    // renderApp() {
    //     // const appContainer = document.createElement('div');
    //     // appContainer.classList.add('app_container');

    //     // const appHeader = new Header().renderHeader();
        
    //     //const appMain = new Main().renderMain();

    //     // const appFooter = new Footer().renderFooter();

    //     // appContainer.appendChild(appHeader);
    //     // appContainer.appendChild(appMain);
    //     // appContainer.appendChild(appFooter);

    //     // return appContainer;

    //     const languageSwitcher = new LanguageSwitcher().renderLanguageSwitcher();
    //     document.querySelector('.app_footer').appendChild(languageSwitcher);

    //     return appMain;
    // }

    initApp() {

        const languageSwitcher = new LanguageSwitcher();
        languageSwitcher.renderLanguageSwitcher();
        //document.querySelector('.app_footer').appendChild(languageSwitcher);
        // const applicationWrapper = this.renderApp();
        // document.body.appendChild(applicationWrapper);

        const applicationMain = new Main();
        applicationMain.initMain();
    }
 
}

export default App;
