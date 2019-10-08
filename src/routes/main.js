const auth = require('../middleware/auth');
const { getUser } = require('../models/usersModel');
const { itemList } = require('../models/scoresModel');
const express = require('express');
const router = express.Router();


router.get('/', auth, async (req, res) => {
    const User = await getUser(req.user._id);
    res.render('main', {
        locals: {
            name: User.name,
            scoreTotal: User.scoreTotal,
            scores: User.scores,
            itemList,
            parties: User.parties
        }
    })
});

module.exports = router;