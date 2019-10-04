const { User } = require('../models/usersModel');

async function getAllParties() {
	let parties = await User.distinct('parties');

    return parties;
}

async function getUserParties(name) {
	let user = await User.findOne({ name });

	return user.parties;
}

async function addPartyToUser(name, party) {
	let user = await User.findOne({ name });

	user.parties.push(party);
	user.save();
}


module.exports = {
    getAllParties,
    getUserParties,
    addPartyToUser,
}