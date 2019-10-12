const bcrypt = require('bcrypt');
const { getAllParties, Party, createParty } = require('../models/PartiesModel');
const { getUser } = require('../models/UsersModel');
const { ValidationError } = require('../middleware/errorHandler');

module.exports = class PartiesController {
    static async getAllParties(req, res, next) {
        const parties = await getAllParties();
        
        return res.status(200).json({ status: 200, message: 'success', data: parties });
    }

    static async addParty(req, res, next) {
        const { partyName, password } = req.body;
        if (!partyName, !password) return next(new ValidationError());

        let party = await Party.findOne({ partyName });

        if (!party) {    // If party wasn't found then create party, otherwise authenticate
            party = await createParty(partyName, password, req.user._id);
        } else {
            const authenticated = await bcrypt.compare(password, party.password)
            if (!authenticated) return next(new ValidationError({}, 'Wrong password'));
        }

        let user = await getUser(req.user._id);
        await user.joinParty(party._id);
        res.status(200).json({ status: 200, message: 'success' });
    }
};