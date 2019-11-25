const VpnUser = require('../models/vpnuser');

exports.createVpnUser = (req, res, next) => {
    const vpnuser = new VpnUser({
      nom: req.body.nom,
      prenom: req.body.prenom,
      role: req.body.role,
      societe: req.body.societe,
      actif: req.body.actif,
    //  expiration: req.body.expiration,
      userId: req.body.userId
    });

    vpnuser.save().then(
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

exports.getOneVpnUser = (req, res, next) => {
  VpnUser.findOne({
      _id: req.params.id
    }).then(
      (vpnuser) => {
        res.status(200).json(vpnuser);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

  exports.getAllVpnUser = (req, res, next) => {
    VpnUser.vpnuser().then(
      (vpnuser) => {
        res.status(200).json(vpnuser);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.updateVpnUser = (req, res, next) => {
    const vpnuser = new VpnUser({
      _id: req.params.id,
      nom: req.body.nom,
      prenom: req.body.prenom,
      role: req.body.role,
      societe: req.body.societe,
      actif: req.body.actif,
      //expiration: req.body.expiration,
      userId: req.body.userId
    });
    VpnUser.updateOne({_id: req.params.id}, vpnuser).then(
      () => {
        res.status(201).json({
          message: 'VpnUser updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.deleteVpnUser = (req, res, next) => {
    VpnUser.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };