const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URL;

const connectToDatabase = async () => {
	try {
		await mongoose.connect(url);
		console.log('Connected to MongoDB Atlas with Mongoose!');
	} catch (err) {
		console.error('Error connecting to MongoDB Atlas with Mongoose:', err);
	}
};

module.exports = connectToDatabase;
