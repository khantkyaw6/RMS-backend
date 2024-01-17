const cors = require('cors');
const express = require('express');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const route = require('./src/routes/index');
const app = express();

const corsOptions = {
	origin: '*',
};

app.use(morgan('dev'));

// Set Rate Limit
const limiter = rateLimit({
	windowMs: 7 * 60 * 1000, // 7 minutes
	max: 100, // limit each IP to 100 requests per windowMs
});

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(limiter);

app.use('/api', route);

app.use(errorMiddleware);

module.exports = app;
