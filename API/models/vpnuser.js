const mongoose = require('mongoose');

const vpnuserSchema = mongoose.Schema({
    nom: { type: String, required: true},
    prenom: { type: String, required: true },
    role: { type: String, required: true },
    societe: { type: String, required: true },
    actif: { type: Boolean, required: true },
    //expiration: { type: String, required: true },
    userId: { type: String, required: true },
});

module.exports = mongoose.model('VpnUser', vpnuserSchema);