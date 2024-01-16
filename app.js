var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config({ path: path.join(__dirname, '.env') });
const bodyParser = require('body-parser');
const cors = require('cors');

var app = express();

// Add cors CROS (cross plotform enable)
app.use(cors());

app.use(logger('dev'));

app.use(express.json());
app.use(bodyParser.json({ limit: '150mb' }));
app.use(
	express.urlencoded({ limit: '150mb', extended: true, parameterLimit: 50000 })
);

app.use(cookieParser());

app.use(function (req, res, err, next) {
	console.log(err);

	next(createError(500));
});

// All webservices routes
var router = require('./routes/index')(app);

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to Whitehat Weather API.' });
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// Render the error page
	res.status(err.status || 500);
	res.json({ success: false, message: err.message });
});

module.exports = app;
