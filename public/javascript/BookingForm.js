import { dictionary } from './dictionary.js';
class BookingForm {
    constructor() {
        this.currentLanguage = localStorage.getItem('current-lang') || 'en';
    }

    renderBookingForm() {
        const bookingForm = document.createElement('form');
        bookingForm.classList.add('restaurant-page_booking_form');

        bookingForm.innerHTML = `
        <div>
            <label for="number-people" data-key="booking-number">${dictionary[this.currentLanguage]['booking-number']}</label>
            <select id="number-people">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>></option>
            </select>        
        </div>
        <div>
            <div>
                <label for="date" data-key="booking-date">${dictionary[this.currentLanguage]['booking-date']}</label>
                <input type="date" id="date">            
            </div>

            <div>
                <label for="time" data-key="booking-time">${dictionary[this.currentLanguage]['booking-time']}</label>
                <input type="time" id="time">            
            </div>
        </div>
        <button class="restaurant-page_menu_button" type="submit" data-key="find-table">${dictionary[this.currentLanguage]['find-table']}</button>
        `;

        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const time = document.querySelector('#time').value;
            const date = document.querySelector('#date').value;
            console.log(date, time, typeof date, typeof time);

        });

        return bookingForm;



    }
}

export default BookingForm;