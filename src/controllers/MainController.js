const { getUser } = require('../models/UsersModel');
const { itemList } = require('../models/ScoresModel');
const { Party, getParty } = require('../models/PartiesModel');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

async function gatherMembers(partyId) {
    let party = await getParty(partyId);
    return {
        id: partyId,
        partyName: party.partyName,
        members: await party.getMembers(),
    };
}

module.exports = class MainController {
    static async renderMainView(req, res, next) {
        const User = await getUser(req.user._id);
        let userParties = [];
        await asyncForEach(User.parties, async (partyId) => userParties.push(await gatherMembers(partyId)));

        res.render('main', {
            locals: {
                name: User.name,
                scoreTotal: User.scoreTotal,
                scores: User.scores,
                itemList,
                userParties,
            }
        })
    }
};

