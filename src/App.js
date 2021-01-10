import Header from './Header';
import Main from './Main';
class App {

    renderApp() {
        const appContainer = document.createElement('div');
        appContainer.classList.add('app_container');

        const appHeader = new Header().renderHeader();
        
        const appMain = new Main().renderMain();

        appContainer.appendChild(appHeader);
        appContainer.appendChild(appMain);
        return appContainer;
    }

    initApp() {
        const applicationWrapper = this.renderApp();
        document.body.appendChild(applicationWrapper);
    }
 
}

export default App;