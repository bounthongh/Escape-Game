// Product.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Product
let Reservation = new Schema({
  day: {
    type: Number
  },
  hours: {
    type: String
  }
},{
    collection: 'Reservation'
});

module.exports = mongoose.model('Reservation', Reservation);
