const cors = require('cors');
const express = require('express');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const route = require('./src/routes/index');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');
const { rootDir } = require('./src/helpers/fileHelper');

const app = express();
const { v4 } = uuid;

const corsOptions = {
	origin: '*',
};

app.use(morgan('dev'));

// Set Rate Limit
const limiter = rateLimit({
	windowMs: 7 * 60 * 1000, // 7 minutes
	max: 100, // limit each IP to 100 requests per windowMs
});

const fileStorage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, 'images');
	},
	filename: (_req, file, cb) => {
		cb(null, `${v4()}_${file.originalname}`);
	},
});

const fileFilter = (_req, file, cb) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(limiter);

app.use(multer({ storage: fileStorage, fileFilter }).single('image'));
app.use('/images', express.static(path.join(rootDir, 'images')));

app.use('/api', route);

app.use(errorMiddleware);

module.exports = app;
