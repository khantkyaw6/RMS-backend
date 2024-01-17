const responseMessage = require('../helpers/responseMessageHelper');
const applicationService = require('../services/v1/applicationService');

const applicationController = {
	index: async (req, res, next) => {
		applicationService
			.index(req)
			.then((data) => {
				console.log('This is data', data);
				responseMessage(res, data.message, data.data);
			})
			.catch((err) => {
				next(err);
			});
	},
	store: async () => {},
	show: async () => {},
	update: async () => {},
	delete: async () => {},
};

module.exports = applicationController;
