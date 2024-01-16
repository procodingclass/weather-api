const weatherRouter = require('./weather');

module.exports = function (app) {
	app.use(`/${process.env.BASE_API_PATH}/`, weatherRouter);
};
