const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const MainController = require('./MainController');
const AuthenticationController = require('./AuthenticationController');
const PartiesController = require('./PartiesController');
const ScoresController = require('./ScoresController');

/* Main area */
router.get('/', auth, MainController.renderMainView);

/* Authentication */
router.get('/auth', AuthenticationController.renderLoginView);
router.get('/auth/logout', AuthenticationController.logout);
router.post('/auth/login', AuthenticationController.login);
router.post('/auth/register', AuthenticationController.register);

/* Parties */
router.get('/parties', auth, PartiesController.getAllParties);
router.post('/parties', auth, PartiesController.addParty);

/* Scores */
router.post('/scores', auth, ScoresController.addScore);


module.exports = router;