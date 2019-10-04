const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const es6Renderer = require('express-es6-template-engine');
const { join } = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middleware/errorHandler')
const authRoute = require('./routes/auth');
const scoresRoute = require('./routes/scores');
const partiesRoute = require('./routes/parties');
const mainRoute = require('./routes/main');
const app = express();


/* Check that private key exists in config */
if (!config.has('myprivatekey')) {
	console.error('FATAL ERROR: myprivatekey is not defined.');
	process.exit(1);
}

/* Create MongoDB connection */
mongoose
	.connect('mongodb://localhost/oct-challenge', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error('Could not connect to MongoDB...'));

/* Set up template engine */
app.engine('html', es6Renderer);
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'html');

/* Set up dependencies */
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(join(__dirname, 'public')));

/* Set up routes */
app.use('/auth', authRoute);
app.use('/scores', scoresRoute);
app.use('/parties', partiesRoute);
app.use('/', mainRoute);
app.use(errorHandler);

/* Start application */
const port = process.env.PORT || 6500;
app.listen(port, () => console.log(`Listening on port ${port}...`));