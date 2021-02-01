import { dictionary } from './dictionary.js';
import RestaurantMenu from './RestaurantMenu.js';
import BookingForm from './BookingForm.js';
import Reviews from './Reviews.js';

class RestaurantPage {
    constructor(cardInfo, imageSource) {
        this.restaurantInfo = cardInfo;
        this.currentLanguage = localStorage.getItem('current-lang') || 'en';
        this.imageSrc = imageSource;
        this.restaurantId = cardInfo.restaurant_id;
    }

    openMenu() {
        const mainPage = document.querySelector('.app_main');
        const restaurantMenu = new RestaurantMenu(mainPage);

        const restaurantMenuData = this.restaurantInfo.menus[0].menu_sections;
        restaurantMenu.renderRestaurantMenu(restaurantMenuData);
    }

    renderRestaurantNav(parentEl) {
        const restaurantPageNav = document.createElement('div');
        restaurantPageNav.classList.add('restaurant-page_nav');

        restaurantPageNav.innerHTML = `
        <ul class="restaurant-page_nav-list">
            <li><a href="#overview" data-key="restaurant-nav-overview" class="active_link">${dictionary[this.currentLanguage]['restaurant-nav-overview']}</a></li>
            <li><a href="#photos" data-key="restaurant-nav-photos">${dictionary[this.currentLanguage]['restaurant-nav-photos']}</a></li>
            <li><a href="#menu" data-key="restaurant-nav-menu">${dictionary[this.currentLanguage]['restaurant-nav-menu']}</a></li>
            <li><a href="#reviews" data-key="restaurant-nav-reviews">${dictionary[this.currentLanguage]['restaurant-nav-reviews']}</a></li>
        </ul>
        `;

        parentEl.appendChild(restaurantPageNav);
    }

    renderRestaurantPhotos(parentEl) {
        const restaurantPagePhotos = document.createElement('div');
        restaurantPagePhotos.classList.add('restaurant-page_photos');

        restaurantPagePhotos.innerHTML = `
        <h3 id="photos" data-key="restaurant-nav-photos" class="restaurant-page_title">${dictionary[this.currentLanguage]['restaurant-nav-photos']}</h3>
        <div class="restaurant-page_photos_wrapper">
            <div class="restaurant-page_photos_wrapper_image"></div>
            <div class="restaurant-page_photos_wrapper_image"></div>
            <div class="restaurant-page_photos_wrapper_image"></div>
        </div>
        `;
        parentEl.appendChild(restaurantPagePhotos);
    }

    renderRestaurantOverview(parentEl) {
        const restaurantPageOverview = document.createElement('div');
        restaurantPageOverview.classList.add('restaurant-page_overview');

        const workingHours = this.restaurantInfo.hours !== '' ? this.restaurantInfo.hours : 'Mon-Thu: 11am-11pm Fri-Sat: 11am-12am Sun: 12pm-11pm';
        const priceRange = this.restaurantInfo.price_range !== '' ? this.restaurantInfo.price_range : '$$';
        const website = this.restaurantInfo.restaurant_website !== '' ? this.restaurantInfo.restaurant_website : ' --- ';
        const cuisines = this.restaurantInfo.cuisines[0] !== '' ? this.restaurantInfo.cuisines[0] : 'Mixed';

        restaurantPageOverview.innerHTML = `
        <h3 id="overview" data-key="restaurant-nav-overview" class="restaurant-page_title">${dictionary[this.currentLanguage]['restaurant-nav-overview']}</h3>
        <div class="restaurant-page_overview_wrapper">
            <div class="restaurant-page_overview_name">${this.restaurantInfo.restaurant_name}</div>
            <div class="restaurant-page_overview_address restaurant-page_overview_item">
                <div data-key="restaurant-overview-address">${dictionary[this.currentLanguage]['restaurant-overview-address']}</div>
                <div>${this.restaurantInfo.address.formatted}</div>
            </div>
            <div class="restaurant-page_overview_phone restaurant-page_overview_item">
                <div data-key="restaurant-overview-phone">${dictionary[this.currentLanguage]['restaurant-overview-phone']}</div>
                <div>${this.restaurantInfo.restaurant_phone}</div>
            </div>
            <div class="restaurant-page_overview_hours restaurant-page_overview_item">
                <div data-key="restaurant-overview-hours">${dictionary[this.currentLanguage]['restaurant-overview-hours']}</div>
                <div>${workingHours}</div>
            </div>
            <div class="restaurant-page_overview_price restaurant-page_overview_item">
                <div data-key="restaurant-overview-price">${dictionary[this.currentLanguage]['restaurant-overview-price']}</div>
                <div>${priceRange}</div>
            </div>
            <div class="restaurant-page_overview_website restaurant-page_overview_item">
                <div data-key="restaurant-overview-website">${dictionary[this.currentLanguage]['restaurant-overview-website']}</div>
                <div><a href="${website}">${this.restaurantInfo.restaurant_website}</a></div>
            </div>
            <div class="restaurant-page_overview_cuisines restaurant-page_overview_item">
                <div data-key="restaurant-overview-cuisines">${dictionary[this.currentLanguage]['restaurant-overview-cuisines']}</div>
                <div>${cuisines}</div>
            </div>
        </div>
        `;
        parentEl.appendChild(restaurantPageOverview);
    }

    renderRestaurantMenu(parentEl) {
        const restaurantPageMenu = document.createElement('div');
        restaurantPageMenu.classList.add('restaurant-page_menu');

        restaurantPageMenu.innerHTML = `
        <h3 id="menu" data-key="restaurant-nav-menu" class="restaurant-page_title">${dictionary[this.currentLanguage]['restaurant-nav-menu']}</h3>
        `;

        const openMenuBtn = document.createElement('div');
        openMenuBtn.classList.add('restaurant-page_menu_button');
        openMenuBtn.dataset.key = 'menu-button';
        openMenuBtn.textContent = dictionary[this.currentLanguage]['menu-button'];

        restaurantPageMenu.appendChild(openMenuBtn);
        parentEl.appendChild(restaurantPageMenu);

        openMenuBtn.addEventListener('click', this.openMenu.bind(this));
    }

    renderRestaurantReviews(parentEl) {
        const restaurantPageReviews = document.createElement('div');
        restaurantPageReviews.classList.add('restaurant-page_reviews');

        restaurantPageReviews.innerHTML = `
        <h3 id="reviews" data-key="restaurant-nav-reviews" class="restaurant-page_title">${dictionary[this.currentLanguage]['restaurant-nav-reviews']}</h3>
        `;

        const reviews = new Reviews(this.restaurantId, restaurantPageReviews);


        parentEl.appendChild(restaurantPageReviews);
    }

    renderRestaurantBookingForm(parentEl) {
        const restaurantBookingFormWrapper = document.createElement('div');
        restaurantBookingFormWrapper.classList.add('restaurant-page_booking_form_wrapper');

        restaurantBookingFormWrapper.innerHTML = `
        <h3 data-key="restaurant-booking-form" class="restaurant-page_title"><i class="fas fa-glass-cheers"></i> ${dictionary[this.currentLanguage]['restaurant-booking-form']}</h3>
        `;

        const restaurantBookingForm = new BookingForm().renderBookingForm(this.restaurantInfo.restaurant_id, this.restaurantInfo.restaurant_name);

        restaurantBookingFormWrapper.appendChild(restaurantBookingForm);

        parentEl.appendChild(restaurantBookingFormWrapper);
    }

    renderRestaurantCallForm(parentEl) {
        const restaurantCallForm = document.createElement('div');
        restaurantCallForm.classList.add('restaurant-page_booking_call');

        restaurantCallForm.innerHTML = `
        <h3 data-key="restaurant-booking-call" class="restaurant-page_title">${dictionary[this.currentLanguage]['restaurant-booking-call']}</h3>
        `;

        const restaurantCallButton = document.createElement('div');
        restaurantCallButton.classList.add('restaurant-page_booking_call_button');
        restaurantCallButton.innerHTML = `
        <a href="tel:${this.restaurantInfo.restaurant_phone}">${this.restaurantInfo.restaurant_phone}</a>`;

        restaurantCallForm.appendChild(restaurantCallButton);

        parentEl.appendChild(restaurantCallForm);
    }

    renderRestaurantMap(parentEl) {
        const restaurantMapWrapper = document.createElement('div');
        restaurantMapWrapper.classList.add('restaurant-page_booking_map');

        restaurantMapWrapper.innerHTML = `
        <h3 data-key="restaurant-booking-map" class="restaurant-page_title">${dictionary[this.currentLanguage]['restaurant-booking-map']}</h3>
        `;

        const restaurantMapContainer = document.createElement('div');
        restaurantMapContainer.classList.add('restaurant-map');
        restaurantMapContainer.id = 'map';

        restaurantMapWrapper.appendChild(restaurantMapContainer);

        parentEl.appendChild(restaurantMapWrapper);

        const { lat, lon } = this.restaurantInfo.geo;
        console.log(lat, lon);

        const restaurantMap = L.map('map').setView([lat, lon], 15);

        L.tileLayer('https://api.mapbox.com/styles/v1/fedola/ckklct3jr3nud17qt4im6gsrx/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZmVkb2xhIiwiYSI6ImNrajFzMnkwYzMzd3UycHNjOWJ1MGFrZ2QifQ.99ycDyPIvF-JWMTnsIFBxA', {
            maxZoom: 23,
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'your.mapbox.access.token',
        }).addTo(restaurantMap);

        const marker = L.marker([lat, lon]).addTo(restaurantMap);
        marker.bindPopup(`${this.restaurantInfo.address.formatted}`).openPopup();
    }


    renderRestaurantPage() {
        console.log(this.restaurantInfo);
        const restaurantPage = document.createElement('div');
        restaurantPage.classList.add('restaurant-page');

        restaurantPage.style.backgroundImage = `url(${this.imageSrc})`;

        const restaurantPageInfo = document.createElement('div');
        restaurantPageInfo.classList.add('restaurant-page_info');



        this.renderRestaurantNav(restaurantPageInfo);
        this.renderRestaurantOverview(restaurantPageInfo);
        this.renderRestaurantPhotos(restaurantPageInfo);
        this.renderRestaurantMenu(restaurantPageInfo);
        this.renderRestaurantReviews(restaurantPageInfo);

        const restaurantPageBooking = document.createElement('div');
        restaurantPageBooking.classList.add('restaurant-page_booking');

        this.renderRestaurantBookingForm(restaurantPageBooking);
        this.renderRestaurantCallForm(restaurantPageBooking);
        //this.renderRestaurantMap(restaurantPageBooking);

        restaurantPage.appendChild(restaurantPageInfo);
        restaurantPage.appendChild(restaurantPageBooking);

        return restaurantPage;
    }
}

export default RestaurantPage;
