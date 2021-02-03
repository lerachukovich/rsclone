class RestaurantMenu {
    constructor(parentElement) {
        this.parentElement = parentElement;
    }

    renderRestaurantMenu(menuData) {

        const menuLayout = document.createElement('div');
        menuLayout.classList.add('menu_layout');

        menuLayout.addEventListener('click', () => menuLayout.remove());

        const menuWrapper =  document.createElement('div');
        menuWrapper.classList.add('menu_wrapper');

        const menuTitle =  document.createElement('div');
        menuTitle.classList.add('menu_title');
        menuTitle.textContent = 'Menu';

        menuWrapper.appendChild(menuTitle);

        menuData.forEach(menuBlock => {
            const menuSection = document.createElement('div');
            menuSection.classList.add('menu_section');

            const menuSectionTitle = document.createElement('h4');
            menuSectionTitle.classList.add('menu_section_title');
            menuSectionTitle.textContent = menuBlock.section_name;

            menuSection.appendChild(menuSectionTitle);

            menuBlock.menu_items.forEach(menuItem => {
                const menuItemWrapper = document.createElement('div');
                menuItemWrapper.classList.add('menu_section_item_wrapper');

                const menuPrice = menuItem.price !== 0 ? menuItem.price + '$' : '';

                menuItemWrapper.innerHTML = `
                    <div class="menu_section_item-name">${menuItem.name}</div>
                    <div class="menu_section_item-description">${menuItem.description}</div>
                    <div class="menu_section_item-name-price">${menuPrice}</div>
                `;

                menuSection.appendChild(menuItemWrapper);
            });

            menuWrapper.appendChild(menuSection);

        });

        menuLayout.appendChild(menuWrapper);

        this.parentElement.appendChild(menuLayout);

        menuLayout.scrollIntoView(true);
    }
}

export default RestaurantMenu;