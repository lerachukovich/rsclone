class Reservations {
    constructor() {
        this.reservationsContainer = document.getElementById('reservation');
        this.reservationsContent = document.getElementById('userReservations');
        this.closeButton = document.getElementById('close_btn');
    }

    renderReservations() {
        this.reservationsContainer.appendChild(this.reservationsContent);
        this.handleClicks();
    }

    handleClicks() {
        this.reservationsContainer.addEventListener('click', () => {
            this.reservationsContent.classList.toggle('invisible');
        });

        this.reservationsContent.addEventListener('click', () => {
            this.reservationsContent.classList.toggle('invisible');
        });

        this.closeButton.addEventListener('click', () => {
            this.reservationsContent.classList.toggle('invisible');
        });
    }
}

window.addEventListener('load', () => {
    return new Reservations().renderReservations();
});


export default Reservations;
