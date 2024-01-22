const responseMessage = require('../helpers/responseMessageHelper');
const experienceService = require('../services/v1/experienceService');

const experienceController = {
	index: async (req, res, next) => {
		experienceService
			.index(req)
			.then((data) => {
				responseMessage(res, data.message, data.data);
			})
			.catch((err) => {
				next(err);
			});
	},
	store: async (req, res, next) => {
		experienceService
			.store(req)
			.then((data) => {
				responseMessage(res, data.message, data.data);
			})
			.catch((err) => next(err));
	},
	update: async (req, res, next) => {
		experienceService
			.update(req)
			.then((data) => {
				responseMessage(res, data.message, data.data);
			})
			.catch((err) => next(err));
	},
	delete: async (req, res, next) => {
		experienceService
			.delete(req)
			.then((data) => {
				responseMessage(res, data.message, data.data);
			})
			.catch((err) => next(err));
	},
};

module.exports = experienceController;
