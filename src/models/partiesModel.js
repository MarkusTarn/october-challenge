const { User } = require('../models/usersModel');

async function getAllParties() {
	let parties = await User.distinct('parties');

    return parties;
}

async function getParty(partyName) {
    const members = {};
    let users = await User.find({ parties: partyName })
    users.forEach(member => { members[member.name] = member.scoreTotal });

    return members;
}

module.exports = {
    getAllParties,
    getParty,
}