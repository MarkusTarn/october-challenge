const { ValidationError } = require('../middleware/errorHandler');
const { getUser } = require('../models/UsersModel');


module.exports = class ScoresController {
    static async addScore(req, res, next) {
        const { item, quantity } = req.body;
        if (!item, !quantity) return next(new ValidationError());
        const user = await getUser(req.user._id);

        const score = {
            item,
            quantity,
            timestamp: new Date().toDateString()
        };
        await user.addScore(score);

        return res.status(200).json({ status: 200, message: 'success' });
    }
};