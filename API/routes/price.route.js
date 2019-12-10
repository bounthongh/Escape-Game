const express = require('express');
const app = express();
const route = express.Router();

// Require Product model in our routes module
const Price = require('../models/price');
// Defined store route
route.route('/add').post(function (req, res) {
  let price_ = new Price(req.body);
  price_.save()
    .then(price_ => {
      res.status(200).json({'newPrice': 'Price has been added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Get All reservation
route.route('/').get(function (req, res) {
  Price.find(function (err, result){
    if(err){
      console.log(err);
    }
    else {
      res.json(result);
    }
  });
});


// Put reservation
route.route('/update').put(function (req, res) {
  const id = { _id: req.body['_id']};
  console.log(id)
  const myquery = { price: req.body['newPrice'] };
  console.log(myquery)
  Price.updateOne(id, myquery,function (err, result) {
    if(err){
      console.log(err);
    }
    else {
      res.json(result);
    }
  })
});


module.exports = route;
