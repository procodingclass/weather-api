const axios = require('axios');

exports.getCurrentWeather = async (req, res, next) => {
	try {
		const { lat, long } = req.params;
		if (!lat || !long) {
			return res.status(500).json({
				success: false,
				message: 'Latitude and Longitude is required!',
			});
		}
		// Make axios requests
		const currentWeather = await axios
			.get(process.env.WEATHER_API_URL, {
				params: {
					query: `${lat},${long}`,
					access_key: process.env.ACCESS_KEY,
				},
			})
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return null;
			});

		let { location, current } = currentWeather;
		let weather = {
			...location,
			...current,
		};
		return res.status(200).json({
			success: true,
			message: 'Weather details fetched successfully',
			data: weather,
		});
	} catch (err) {
		console.error('Error coming from getCurrentWeather()', err);
	}
};
