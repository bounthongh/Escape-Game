const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Product


let Price = new Schema({
  price: {type: String, required: true},
  tarif: {type: String, required: true}
},{
    collection: 'Price'
});


module.exports = mongoose.model('Price', Price);
