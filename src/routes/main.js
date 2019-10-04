const auth = require('../middleware/auth');
const scoresModel = require('../models/scoresModel');
const partiesModel = require('../models/partiesModel');
const express = require('express');
const router = express.Router();


router.get('/', auth, async (req, res) => {
    const { name } = req.user
    const scores = await scoresModel.getUserScores(name);
    const scoreTotal = await scoresModel.getUserScoreTotal(name);
    const scoreMap = await scoresModel.getScoreMap();
    const parties = await partiesModel.getUserParties(name);
    console.log(parties);
    

    console.log(scoreTotal);
    
    res.render('main', {
        locals: {
            name,
            scoreTotal,
            scores,
            scoreMap,
            parties
        }
    })
});

module.exports = router;
// <!-- ${parties.map(party => `<div id="${party}" class="col s12">Siia tuleb ${party} scoreboard</div>`).join('')} -->