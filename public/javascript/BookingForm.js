import { dictionary } from './dictionary.js';

class BookingForm {
    constructor() {
        this.currentLanguage = localStorage.getItem('current-lang') || 'en';
    }

    renderBookingForm(restaurant_id) {
        const bookingForm = document.createElement('form');
        bookingForm.setAttribute("action", "/reservation");
        bookingForm.setAttribute("method", "POST");
        bookingForm.classList.add('restaurant-page_booking_form');

        bookingForm.innerHTML = `
        <div>
            <label for="number-people" data-key="booking-number">${dictionary[this.currentLanguage]['booking-number']}</label>
            <select id="number-people" name="guestAmount">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>        
        </div>
        <!-- TODO: add validation to form -->
        <div>
            <div>
                <label for="date" data-key="booking-date">${dictionary[this.currentLanguage]['booking-date']}</label>
                <input type="date" id="date" name="reservationDate">            
            </div>

            <div>
                <label for="time" data-key="booking-time">${dictionary[this.currentLanguage]['booking-time']}</label>
                <input type="time" id="time" name="reservationTime" min="09:00" max="22:00" required>            
            </div>
            
            <div style="display: none">
                <input type="number" name="restaurantId" value="${restaurant_id}">            
            </div>
        </div>
        <button class="restaurant-page_menu_button" type="submit" data-key="find-table">${dictionary[this.currentLanguage]['find-table']}</button>
        `;

        // bookingForm.addEventListener('submit', (e) => {
        //     e.preventDefault();
        //     const time = document.querySelector('#time').value;
        //     const date = document.querySelector('#date').value;
        //     console.log(date, time, typeof date, typeof time);
        // });

        return bookingForm;



    }
}

export default BookingForm;
