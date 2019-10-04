const auth = require('../middleware/auth');
const partiesModel = require('../models/partiesModel');
const { ValidationError } = require('../middleware/errorHandler');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const parties = await partiesModel.getAllParties();
    console.log(parties);
    
    res.status(200).json({ status: 200, message: 'success', data: parties });
});

router.post('/', auth, async (req, res) => {
    const { party } = req.body;
    if (!party) return next(new ValidationError());

    await partiesModel.addPartyToUser(req.user.name, party.toLowerCase());
    res.status(200).json({ status: 200, message: 'success' });
});

module.exports = router;