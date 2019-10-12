const bcrypt = require('bcrypt');
const { User, getUser } = require('../models/UsersModel');
const { ValidationError } = require('../middleware/errorHandler');
const tokenOptions = { maxAge: 900000, httpOnly: true };


module.exports = class AuthenticationController {
    static async renderLoginView(req, res, next) {
        return res.render('auth')
    }

    static async logout(req, res, next) {
        return res.clearCookie('authorization').redirect('/auth');
    }
    
    static async login(req, res, next) {
        const { name, password } = req.body;
        if (!name, !password) return next(new ValidationError(name, 'Please fill username and password'));
        
        let user = await User.findOne({ name });
        if (!user) return next(new ValidationError(name, 'User not registered'));
        
        const authenticated = await bcrypt.compare(password, user.password)
        if (!authenticated) return next(new ValidationError({}, 'Wrong password'));
        
        const token = await user.generateAuthToken();
        res.cookie('authorization', token, tokenOptions);
        return res.status(200).json({ status: 200, message: 'success' });
    }
    
    static async register(req, res, next) {
        const { name, password } = req.body;
        if (!name, !password) return next(new ValidationError(name, 'Please fill username and password'));

        let user = await User.findOne({ name });
        if (user) return next(new ValidationError(name, 'User already registered'));

        user = new User({ name, password });
        user.password = await bcrypt.hash(password, 10);
        await user.save();

        const token = await user.generateAuthToken();
        res.cookie('authorization', token, tokenOptions);
        return res.status(200).json({ status: 200, message: 'success' });
    }

    static async recover(req, res, next) {
        const { id, password } = req.query;

        let user = await getUser(id);
        if (!user) return next(new ValidationError(name, 'No such user'));

        user.password = await bcrypt.hash(password, 10);
        await user.save();

        return res.status(200).json({ status: 200, message: 'success' });
    }
};