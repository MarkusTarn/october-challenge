const bcrypt = require('bcrypt');
const { User, validate } = require('../models/usersModel');
const { ValidationError, SystemError } = require('../middleware/errorHandler');
const express = require('express');
const router = express.Router();

/* Log-in page */
router.get('/', async (req, res) => res.render('auth'));

/* Log-out */
router.get('/logout', async (req, res) => res.clearCookie('authorization').redirect('/auth'));

/* Authenticate or register */
router.post('/', async (req, res, next) => {
  // const { error } = await validate(req.body);
  // if (error) return next(new ValidationError({}, error.details[0].message));

  const { name, password, action } = req.body;
  let user = await User.findOne({ name });

  if (action === 'auth') {
    /* Authenticate */
    if (!user) return next(new ValidationError(name, 'User not registered'));
    const authenticated = await bcrypt.compare(password, user.password)
    if (!authenticated) return next(new ValidationError({}, 'Wrong password'));
  } else if (action === 'new') {
    /* Register new */
    if (!name, !password) return next(new ValidationError(name, 'Please fill username and password'));
    if (user) return next(new ValidationError(name, 'User already registered'));
    user = new User({ name, password });
    user.password = await bcrypt.hash(password, 10);
    await user.save();
  } else {
    return next(new SystemError());
  }

  const token = await user.generateAuthToken();
  res.cookie('authorization', token, { maxAge: 900000, httpOnly: true }).status(200).json({ status: 200, message: 'success' });
});


module.exports = router;