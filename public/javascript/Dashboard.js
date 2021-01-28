import dictionary from './dictionary.js';

class Dashboard {
    constructor() {
        this.currentLanguage = localStorage.getItem('current-lang') || 'en';
    }

    Dashboard() {

        const Dashboard = document.createElement('div');
        Dashboard.classList.add('login_page', 'welcome_page');

        Dashboard.innerHTML = `

        `;
        return Dashboard;
    }
}

const dashboard =  new Dashboard().renderDashboard();

window.addEventListener('load', () => {
    document.querySelector('.app_main').appendChild(login);
});
