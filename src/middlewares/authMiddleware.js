const jwt = require('jsonwebtoken');
const AdminModel = require('../models/Admin');
const AppError = require('../utils/appError');

module.exports = async (req, res, next) => {
	if (!req.headers['authorization']) {
		return next(new AppError('Token not present!', 401));
	}
	const token = req.headers['authorization'].split(' ')[1];

	const secretKey = process.env.SECRET_KEY || 'TRUSTLINKKEY';

	if (token) {
		jwt.verify(token, secretKey, async (err, authorizedData) => {
			if (err instanceof jwt.TokenExpiredError)
				return next(new AppError('Token Expired', 401));

			if (err) return next(new AppError('Invalid Token', 401));

			const exitAdmin = await AdminModel.findById(authorizedData.id);
			if (!exitAdmin)
				return next(new AppError('Unauthorized Token!', 401));
			// if (!exitAdmin || exitAdmin.authToken !== token)
			//   return next(new AppError('Unauthorized Token!', 401));

			req.authUserId = exitAdmin.id;
			req.token = exitAdmin.authToken;
			next();
		});
	}
};
