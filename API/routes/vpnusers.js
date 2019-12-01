const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const vpnuserctrl = require('../controllers/vpnusers');

router.get('/', auth, vpnuserctrl.getAllVpnUser);
router.post('/', auth, vpnuserctrl.createVpnUser);
router.get('/:id', auth, vpnuserctrl.getOneVpnUser);
router.put('/:id', auth, vpnuserctrl.updateVpnUser);
router.delete('/:id', auth, vpnuserctrl.deleteVpnUser);

module.exports = router;