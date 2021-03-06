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
    const { guestAmount, reservationDate, reservationTime, restaurantId, restaurantName } = req.body;
    const email = req.user.email;
    let errors = [];

    //    Check required fields
    if (!guestAmount || !reservationDate || !reservationTime || !email) {
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
                        email: email,
                        restaurantName,
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

// Delete reservations
router.post('/delete', ensureAuthenticated, (req, res) => {
   const _id = req.body.reservationId;
    console.log(_id);

    if (_id) {
        Reservation.deleteOne({_id: _id})
            .then(reservation => {
                if (reservation.deletedCount === 0) {
                    req.flash('error_msg', 'Sorry, this reservation is not exist');
                    res.redirect('/dashboard');
                } else {
                    req.flash('success_msg', 'Your reservation successfully deleted');
                    res.redirect('/dashboard');
                }
            })
            .catch(err => console.log(err))
    } else {
        req.flash('error_msg', 'Sorry, reservation id was not provided');
        res.redirect('/dashboard');
    }

})

//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    let errors = [];
    let reservations = [];
        Reservation.find({ email: req.user.email })
            .then(reservation => {
                if (reservation) {
                reservation.forEach(elem => {
                    reservations.push(elem);
                })
                } else {
                    req.flash('error_msg', 'You do not have any reservations yet');
                }
            }).then( elem => {
            res.render('dashboard', {
                name: req.user.name,
                email: req.user.email,
                reservations: reservations,
                errors : errors
            })}
        )
    }
);

module.exports = router;
