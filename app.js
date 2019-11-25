//mongo password: FqlzXH649T0Qyldl
//mongo link: mongodb+srv://<username>:<password>@mongodb-ga4vy.mongodb.net/test?retryWrites=true&w=majority


// mongo password: VdgP83AoAAvSOb25
// mongo link: mongodb+srv://Api:cCgurgr9oyolZ31S@cluster0-c6axh.mongodb.net/test?retryWrites=true&w=majority
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const vpnusersRoutes = require('./routes/vpnusers');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://Api:VdgP83AoAAvSOb25@cluster0-c6axh.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/stuff', stuffRoutes);
app.use('/api/vpnusers', vpnusersRoutes)
app.use('/api/auth', userRoutes);

  

module.exports = app;