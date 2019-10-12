const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User, scorePredicate } = require('./UsersModel');

const PartySchema = new mongoose.Schema({
    partyName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    admin: {
        type: String,
        required: true,
    },
});

PartySchema.methods.getMembers = async function() {
    let users = await User.find({ parties: this._id }, { _id: 0, name: 1, scoreTotal: 1 })
    return users.sort(scorePredicate);
}

const Party = mongoose.model('Party', PartySchema);

async function getAllParties() {
    let parties = await Party.find({}, { _id: 0, partyName: 1 });
    return parties
}

async function getParty(id) {
    return Party.findById({ _id: id })
}

async function createParty(partyName, password, admin) {
    const party = new Party({ partyName, password, admin});
    party.password = await bcrypt.hash(password, 10);
    await party.save();
    return party;
}

module.exports = {
    Party,
    getAllParties,
    getParty,
    createParty,
}
