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
		// Create a new Date object
		let currentDate = new Date();

		// Get the components of the date
		let year = currentDate.getFullYear();
		let month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
		let day = currentDate.getDate().toString().padStart(2, '0');

		// Make axios requests
		const currentWeather = await axios
			.get(process.env.WEATHER_API_URL, {
				params: {
					query: `${lat},${long}`,
					days: 1,
					dt: `${year}-${month}-${day}`,
					lang: 'en',
					key: process.env.ACCESS_KEY,
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
			...current,
			...location,
			temperature: current?.temp_c,
			weather_descriptions: [current?.condition?.text],
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
