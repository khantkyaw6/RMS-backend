module.exports = {
	validateBody: (schema) => {
		return (req, res, next) => {
			let result = schema.validate(req.body, { abortEarly: false });

			if (result.error) {
				const errors = result.error.details.map((err) => ({
					message: err.message,
					path: err.path,
					type: err.type,
				}));
				res.json({
					isSuccess: false,
					path: req.originalUrl,
					message: 'Validation Error',
					errors,
				});
			} else {
				next();
			}
		};
	},
};
