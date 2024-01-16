var express = require('express');
var router = express.Router();
var weatherController = require('../../controllers/weather');

router.get(
	'/getCurrentWeather/:lat/:long',
	weatherController.getCurrentWeather
);

module.exports = router;
