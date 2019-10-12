const itemMap = {
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

const itemList = Object.keys(itemMap);

module.exports = {
	itemMap,
	itemList,
};
