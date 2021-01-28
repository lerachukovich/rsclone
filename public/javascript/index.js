//import './../styles/styles.css';

import App from './App.js';


//window.location.href = '/main';

console.log('yes');
new App().initApp();


const handleClicks = (e) => {
    if(e.target.className === 'welcome_page_button') {
        const h1 = document.createElement('h1');
        h1.innerHTML = 'пРивтк';
        document.body.appendChild(h1);
    }

    if(e.target.dataset.hash === 'menu' ) {
        console.log('container');
        const main = document.querySelector('.container');
        main.innerHTML = '';
    }


    if(e.target.id === 'login-btn') {
        e.preventDefault();

        const headerRightPart = document.querySelector('.header_right-part');

        const searchingForm = this.addSearchFormToHeader();
        const appMenuBtn = this.addMenuToHeader();

        headerRightPart.appendChild(searchingForm);
        headerRightPart.appendChild(appMenuBtn);

        this.clearMainPage();
        this.renderDefaultMainPage();
    }
};

window.addEventListener('click', (e) => handleClicks(e));

