const auth = require('../middleware/auth');
const { getUser } = require('../models/usersModel');
const { ValidationError } = require('../middleware/errorHandler');
const express = require('express');
const router = express.Router();


router.post('/', auth, async (req, res) => {
    const { item, quantity } = req.body;
    if (!item, !quantity) return next(new ValidationError());
    const user = await getUser(req.user._id);

    const score = {
        item,
        quantity,
        timestamp: new Date().toDateString()
    };
    await user.addScore(score);

    res.status(200).json({ status: 200, message: 'success' });
});

module.exports = router;