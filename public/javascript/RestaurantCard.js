import { dictionary } from './dictionary.js';
import RestaurantPage from './RestaurantPage.js';

class RestaurantCard {
    constructor(cardInfo) {
        this.cardInfo = cardInfo;

        this.currentLanguage = localStorage.getItem('current-lang') || 'en';

        const getRandomImage = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + 1;
        };

        const randomImageNum = getRandomImage(1, 55);
        this.imageSrc = `./assets/restaurants-images/${randomImageNum}.jpg`;
    }

    renderRestaurantPage(){
        const mainAppPage = document.querySelector('.app_main');
        mainAppPage.innerHTML = '';

        console.log(this);

        const restaurantPage = new RestaurantPage(this.cardInfo, this.imageSrc);
        const restaurantRenderedPage = restaurantPage.renderRestaurantPage();
        mainAppPage.appendChild(restaurantRenderedPage);

        const mapParent = document.querySelector('.restaurant-page_booking');
        restaurantPage.renderRestaurantMap(mapParent);
    }

    renderRestaurantCard() {
        const restaurantCard = document.createElement('div');
        restaurantCard.classList.add('restaurant-card');

        const cuisinesType = this.cardInfo.cuisines[0] !== '' ? this.cardInfo.cuisines[0] : 'Mixed';

        restaurantCard.innerHTML = `
        <div class="restaurant-card_image">
            <img src=${this.imageSrc}>
        </div>
        <div class="restaurant-card_info">
            <div class="restaurant-card_info-name">${this.cardInfo.restaurant_name}</div>
            <div class="restaurant-card_info-city"><span data-key="restaurants-carousel-city">${dictionary[this.currentLanguage]['restaurants-carousel-city']} </span>${this.cardInfo.address.city}</div>
            <div class="restaurant-card_info-cuisines"><span data-key="restaurants-carousel-cuisines"> ${dictionary[this.currentLanguage]['restaurants-carousel-cuisines']} </span>${cuisinesType}</div>
        </div>
        `;

        restaurantCard.addEventListener('click', () => this.renderRestaurantPage());

        return restaurantCard;
    }
 
}

export default RestaurantCard;