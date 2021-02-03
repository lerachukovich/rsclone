import { dictionary } from './dictionary.js';
class Menu{
    constructor() {
        this.currentLanguage = localStorage.getItem('current-lang') || 'en';
    }

    toggleMenuVisibility() {
        const menuList = document.querySelector('.menu_list');
        menuList.classList.toggle('menu_list_hidden');

        const menuButton = document.querySelector('.menu_button');
        menuButton.classList.toggle('menu_button_close');
    }

    renderMenu() {

        const menu = document.createElement('div');
        menu.classList.add('menu');

        menu.innerHTML = `
        <div class="menu_button">
            <div class="menu_button_line menu_button_line-up"></div>
            <div class="menu_button_line menu_button_line-middle"></div>
            <div class="menu_button_line menu_button_line-down"></div>        
        </div>
        <ul class="menu_list menu_list_hidden">
            <li class="menu_list-item about-us" ><a data-key="about-us" href="#restaurants">${dictionary[this.currentLanguage]['about-us']}</a></li>
            <li class="menu_list-item your-profile" ><a data-key="your-profile" href="#profile">${dictionary[this.currentLanguage]['your-profile']}</a></li>
            <li class="menu_list-item favorites" ><a href="reservations" data-key="reservations">${dictionary[this.currentLanguage]['reservations']}</a></li>
            <li class="menu_list-item settings" ><a href="" data-key="settings">${dictionary[this.currentLanguage]['settings']}</a></li>
        </ul>
        `;

        menu.addEventListener('click', this.toggleMenuVisibility);

        document.addEventListener('keydown', (e) => {
            
            if(e.code === 'KeyM' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                this.toggleMenuVisibility();
            }
        });

        return menu;
    }
}

export default Menu;