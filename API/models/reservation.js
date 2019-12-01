const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Product
let Reservation = new Schema({
    Acheteur: {
        Civilite: String,
        Nom: String,
        Prenom: String,
        Age: String,
        Email: String
    },
    Game: {
        Nom: String,
        Jour: String,
        Horaire: String,
        VR: String
    },
    Reservation: Array
},{
    collection: 'ReservationUsers'
});


module.exports = mongoose.model('ReservationUsers', Reservation);