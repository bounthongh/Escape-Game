const Reservation = require('../models/reservation');

exports.createReservation = (req, res, next) => {
    console.log(req.body);
    const reservation = new Reservation({
        /*Acheteur: {
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
        Reservation: Array*/
      /*title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId*/
    });
    reservation.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully'
            })
        }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      })
};

