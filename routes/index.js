const express = require('express');
const router = express.Router();
const path = require('path');
const { ensureAuthenticated } = require('../config/auth.js');

//Welcome page
router.get('/', (req, res) => res.render('welcome'));

// router.get('/12', (req, res) => {
//         res.sendFile('/Users/valeriachukovich/Documents/backend/dist/index.html')
//         console.log(req.path);
//     }
// );
// router.get('/yahor', (req, res) => {
//         res.sendFile('/Users/valeriachukovich/Documents/backend/dist/main.css')
//         console.log(req.path);
//     }
// );
// router.get('*', (req, res) => {
//         res.sendFile('/Users/valeriachukovich/Documents/backend/dist' + req.path)
//         console.log(req.path);
//     }
// );
// router.get('/main.css', (req, res) => {
//         res.sendFile('/Users/valeriachukovich/Documents/backend/dist/main.css')
//         console.log(req.path);
//     }
// );
// router.get('/main.js', (req, res) => {
//         res.sendFile('/Users/valeriachukovich/Documents/backend/dist/main.js')
//         console.log(req.path);
//     }
// );

//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard', {
        name: req.user.name
    }));

module.exports = router;
