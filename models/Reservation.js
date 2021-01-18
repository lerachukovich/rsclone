const mongoose = require('mongoose');
const currentDate = Date.now();

const ReservationSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    restaurantId: {
        type: Number,
        required: true
    },
    reservationId: {
        type: Number,
        required: true
    },
    guestAmount: {
        type: Number,
        required: true,
    },
    reservationDate: {
        type: String,
        default: Date.now,
        required: true
    },
    reservationTime: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String,
        default: currentDate.getTime,
    }
});

const Reservation = mongoose.model('Reservation', ReservationSchema);
module.exports = Reservation;
