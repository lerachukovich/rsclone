const localPath = require('../env.json');
const express = require('express');
const router = express.Router();
const path = require('path');
const { ensureAuthenticated } = require('../config/auth.js');

// Reservation model
const Reservation = require('../models/Reservation.js');
//Welcome page
router.get('/', (req, res) => res.render('welcome'));

//Router for js static
router.get('/public/javascript/*', (req, res) => {
    res.sendFile( localPath.localPath + req.path)
    console.log(req.path);
});

router.get('/reservation', (req, res) => res.render('partials/reservation'));


// Reservation form handler
router.post('/reservation', ensureAuthenticated, (req, res) => {
    const { guestAmount, reservationDate, reservationTime, restaurantId } = req.body;
    let errors = [];

    //    Check required fields
    if (!guestAmount || !reservationDate || !reservationTime) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if (errors.length > 0) {
        res.render('reservation', {
            errors,
            guestAmount,
            reservationDate,
            reservationTime
        });
    } else {
        // Validation passed
        Reservation.find({restaurantId: restaurantId, reservationDate: reservationDate} )
            .then(reservation => {
                if (reservation.length > 15) {
                    // User exists
                    errors.push({ msg: 'Reservation is not available for this time' });
                    //  изменить на страницу ресторана
                    res.render('partials/reservation', {
                        errors,
                        guestAmount,
                        reservationTime,
                        reservationDate
                    });
                } else {
                    const newReservation = new Reservation({
                        reservationId: 17,
                        userId: 1,
                        restaurantId,
                        guestAmount,
                        reservationDate,
                        reservationTime
                    });
                    newReservation.save()
                        .then(reservation => {
                            req.flash('success_msg', 'Your reservation successfully created');
                            res.redirect('/dashboard');
                        })
                        .catch(err => console.log(err))
                }
            });
    }
})

//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
        // Reservation.find({ email: req.user.email })
        //     .then(reservation => {
        //         if (reservation) {
        //
        //         } else {
        //
        //         }
        //     })
    res.render('dashboard', {
            name: req.user.name
        })
    }
);

module.exports = router;
