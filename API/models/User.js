// User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for User
let User = new Schema({
  UsertName: {
    type: String
  },
  UserDescription: {
    type: String
  },
  UserId: {
    type: Number
  }
},{
    collection: 'User'
});

module.exports = mongoose.model('User', User);