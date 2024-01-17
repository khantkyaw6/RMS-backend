require('dotenv').config();
const connectToDatabase = require('./src/config/db.connection');

const app = require('./app');

const PORT = process.env.PORT || 5000;

connectToDatabase().then(() => {
	app.get('/', (req, res) => {
		res.status(200).json({
			isSuccess: true,
			message: 'Hello from the server',
			data: {
				name: 'Khant Kyaw',
				age: 24,
				sex: 'male',
			},
		});
	});

	app.listen(PORT, () => {
		console.log('Server is running at Port', PORT);
	});
});
