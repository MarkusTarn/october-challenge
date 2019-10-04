const auth = require('../middleware/auth');
const scoresModel = require('../models/scoresModel');
const { ValidationError } = require('../middleware/errorHandler');
const express = require('express');
const router = express.Router();


router.post('/', auth, async (req, res) => {
    const { item, quantity } = req.body;
    if (!item, !quantity) return next(new ValidationError());

    const score = {
        item,
        quantity,
        timestamp: new Date().toDateString()
    };
    await scoresModel.addScoreForUser(req.user.name, score);

    res.status(200).json({ status: 200, message: 'success' });
});

module.exports = router;