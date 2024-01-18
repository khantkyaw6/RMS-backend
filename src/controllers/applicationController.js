const responseMessage = require('../helpers/responseMessageHelper');
const applicationService = require('../services/v1/applicationService');

const applicationController = {
	index: async (req, res, next) => {
		applicationService
			.index(req)
			.then((data) => {
				responseMessage(res, data.message, data.data);
			})
			.catch((err) => {
				next(err);
			});
	},
	store: async (req, res, next) => {
		applicationService
			.store(req)
			.then((data) => {
				responseMessage(res, data.message, data.data);
			})
			.catch((err) => next(err));
	},
	show: async (req, res, next) => {
		applicationService
			.show(req)
			.then((data) => {
				responseMessage(res, data.message, data.data);
			})
			.catch((err) => next(err));
	},
	update: async (req, res, next) => {
		applicationService
			.update(req)
			.then((data) => {
				responseMessage(res, data.message, data.data);
			})
			.catch((err) => next(err));
	},
	delete: async (req, res, next) => {
		applicationService
			.delete(req)
			.then((data) => {
				responseMessage(res, data.message, data.data);
			})
			.catch((err) => next(err));
	},
};

module.exports = applicationController;
