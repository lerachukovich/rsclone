import RestaurantCard from './RestaurantCard.js';
import { dictionary } from './dictionary.js';

class RestaurantsCarousel {

    constructor(url, parentElement) {
        this.urlToFetch = url;
        this.parentElement = parentElement;
        this.currentLanguage = localStorage.getItem('current-lang') || 'en';
    }

    async getRestaurantsDataForDefaultCarousel () {
   
        await fetch(this.urlToFetch)
        .then((response) => response.json())
        .then((result) => {
            this.renderCarousel(result.data);
        });
    }

    moveCarousel(e) {
        const carouselWrap = document.querySelector('.carousel_wrapper-restaurants');
        const carouselCard = document.querySelector('.restaurant_card_wrapper');
        const carouselCardWidth = carouselCard.offsetWidth;
        const carouselMainContainer = document.querySelector('.carousel-restaurants');
        const carouselNavNext = document.querySelector('.carousel_nav-next-restaurants');
        const carouselNavPrev = document.querySelector('.carousel_nav-prev-restaurants');
        let carouselCurrentMarginLeft = parseInt(carouselWrap.style.marginLeft) || 0;
        const carouselHiddenWidth = carouselWrap.offsetWidth - carouselMainContainer.clientWidth;

        let currentHiddenWidth = carouselHiddenWidth + parseInt(carouselCurrentMarginLeft);

        if(e.target.className.includes('carousel_nav-prev-restaurants')) {

            if(carouselMainContainer.clientWidth < Math.abs(carouselCurrentMarginLeft)) {
                carouselCurrentMarginLeft = parseInt(carouselCurrentMarginLeft) + carouselMainContainer.clientWidth;
                carouselWrap.style.marginLeft = (carouselCurrentMarginLeft) + 'px';
                
            } else {
                carouselCurrentMarginLeft = 0;
                carouselWrap.style.marginLeft = '0px';


            }
        }

        if(e.target.className.includes('carousel_nav-next-restaurants')) {

            if(carouselMainContainer.clientWidth < currentHiddenWidth) {
                carouselCurrentMarginLeft = parseInt(carouselCurrentMarginLeft) - carouselMainContainer.clientWidth;
                carouselWrap.style.marginLeft = (carouselCurrentMarginLeft) + 'px';
                
            } else {
                carouselCurrentMarginLeft = carouselWrap.offsetWidth - carouselMainContainer.clientWidth;
                carouselWrap.style.marginLeft = '-' + (carouselCurrentMarginLeft) + 'px';

            }

        }

        if(Math.abs(carouselCurrentMarginLeft) === carouselWrap.offsetWidth - carouselMainContainer.clientWidth) {
            carouselNavNext.classList.add('disabled');
        } else {
            carouselNavNext.classList.remove('disabled');
        }

        if(carouselCurrentMarginLeft === 0) {
            carouselNavPrev.classList.add('disabled');
        } else {
            carouselNavPrev.classList.remove('disabled');
        }
    }

    renderCarousel(restaurantsData) {
        const carouselContainer = document.createElement('div');
        carouselContainer.classList.add('carousel_container');

        const carouselTitle = document.createElement('h3');
        carouselTitle.classList.add('carousel_title');
        carouselTitle.dataset.key = 'restaurants-carousel-title';
        carouselTitle.textContent = dictionary[this.currentLanguage]['restaurants-carousel-title'];
        carouselContainer.appendChild(carouselTitle);

        if(restaurantsData.length === 0) {
            const carouselMessage = document.createElement('div');
            carouselMessage.classList.add('carousel-message');
            carouselMessage.dataset.key = 'carousel-message';
            carouselMessage.textContent = dictionary[this.currentLanguage]['carousel-message'];

            carouselContainer.appendChild(carouselMessage);
            this.parentElement.appendChild(carouselContainer);

            return;
        }

        const carousel = document.createElement('div');
        carousel.classList.add('carousel', 'carousel-restaurants');

        const carouselWrapper = document.createElement('div');
        carouselWrapper.classList.add('carousel_wrapper', 'carousel_wrapper-restaurants');

        const navArrows = document.createElement('div');
        navArrows.classList.add('carousel_nav', 'carousel_nav-restaurants');

        const navArrowNext = document.createElement('div');
        navArrowNext.classList.add('carousel_nav-next', 'carousel_nav-next-restaurants');

        const navArrowPrev = document.createElement('div');
        navArrowPrev.classList.add('carousel_nav-prev', 'disabled', 'carousel_nav-prev-restaurants');

        navArrows.appendChild(navArrowPrev);
        navArrows.appendChild(navArrowNext);

        carousel.appendChild(navArrows);

        carouselContainer.appendChild(carousel);
        carousel.appendChild(carouselWrapper);

        let cuisineCardWrapper;
        const cuisineCardWidth = 300;
        const cuisineCardHeight = 300;

        restaurantsData.forEach(item => {
            cuisineCardWrapper = document.createElement('div');
            cuisineCardWrapper.classList.add('cuisine_card_wrapper', 'restaurant_card_wrapper');

            cuisineCardWrapper.style.width = cuisineCardWidth + 'px';
            cuisineCardWrapper.style.height = cuisineCardHeight + 'px';

            const restaurantCardContent = new RestaurantCard(item).renderRestaurantCard();

            cuisineCardWrapper.appendChild(restaurantCardContent);

            carouselWrapper.appendChild(cuisineCardWrapper);
        });

        navArrows.addEventListener('click', this.moveCarousel);

        carouselWrapper.style.width = ((restaurantsData.length * cuisineCardWidth) + (20 * restaurantsData.length)) + 'px';

        this.parentElement.appendChild(carouselContainer);
    }

} 

export default RestaurantsCarousel;