const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const reservationctrl = require('../controllers/reservation');


router.post('/reservation', auth, reservationctrl.createReservation);

module.exports = router;