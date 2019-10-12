const { getUser } = require('../models/UsersModel');
const { itemList } = require('../models/ScoresModel');
const { Party, getParty } = require('../models/PartiesModel');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
// const userParties = [
//     {
//         id: '5da08927ec85dd3f4f4eea35',
//         partyName: "Teet",
//         members: ['5d96366b5c2259be18117382']
//     },
//     {
//         id: '5da093d5b6065742ee468d73',
//         partyName: "Tuut",
//         members: ['5d96366b5c2259be18117382']
//     },
// ]

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
        // Promise.resolve([...User.parties].map(async (id) => await Promise.resolve(gatherMembers(id)))).then(stuff => stuff).then(stuff => console.log(stuff));

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

