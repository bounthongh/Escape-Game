const express = require('express');
const app = express();
const route = express.Router();

// Require Product model in our routes module
let Reservation = require('../models/ReservationTimes.js');

// Defined store route
route.route('/add').post(function (req, res) {
  let reservation_ = new Reservation(req.body);
  reservation_.save()
    .then(reservation_ => {
      res.status(200).json({'Reservation': 'time has been added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Get All reservation
route.route('/').get(function (req, res) {
  Reservation.find(function (err, result){
    if(err){
      console.log(err);
    }
    else {
      res.json(result);
    }
  });
});

// Get hours booking
route.route('/:day').get(function (req, res) {
  const id = req.params.day;
  const item = {
    "day": id
  }
  const arrayHours = [];
  Reservation.find(item, function (err, result){
    result.forEach(element => {
      arrayHours.push(element.hours);
    });
      res.json(arrayHours);
  });
});

module.exports = route;
