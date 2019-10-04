const { User } = require('../models/usersModel');

const scoreMap = {
	Beer: 1,
	Wine: 1,
	Coctail: 1,
	Shot: 1,
	Marijuana: 1,  // per bowl
	Shrooms: 1,    // per gram
	Acid: 6,	   // per plotter
	MDMA: 5,       // per night, min 100mg
	DMT: 4,		   // if you get there
	Cocaine: 4,    // per line
	Ketamine: 4,   // per key bump
	Meth: 10,      // per pipe
	Heroin: 15,    // per spoon
	Crack: 0,      // say no to crack
	Pills: 3       // per pill, various
};

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const mapper = (array) => array.map(score => scoreMap[score.item] * score.quantity);



async function getScoreMap() {
	return Object.keys(scoreMap);
}

async function getUserScoreTotal(name) {
	let user = await User.findOne({ name });

	return user.scores.length ? mapper(user.scores).reduce(reducer) : 0;
}

async function getUserScores(name) {
	let user = await User.findOne({ name });

	return user.scores.reverse();
}

async function addScoreForUser(name, score) {
	let user = await User.findOne({ name });

	user.scores.push(score);
	user.save();
}

module.exports = {
	getScoreMap,
	getUserScoreTotal,
	getUserScores,
	addScoreForUser,
};