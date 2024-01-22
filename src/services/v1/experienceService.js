const WorkExperienceModel = require('../../models/Experience');
const moment = require('moment');

const experienceService = {
	index: async () => {
		try {
			const experiences = await WorkExperienceModel.find();

			return {
				status: 200,
				message: 'All experience list',
				data: experiences,
			};
		} catch (error) {
			throw new Error(error);
		}
	},
	store: async (req) => {
		try {
			const {
				companyName,
				startDate,
				endDate,
				position,
				application_id,
			} = req.body;

			if (
				!companyName ||
				!startDate ||
				!endDate ||
				!position ||
				!application_id
			) {
				throw new Error('Form Invalid');
			}

			const formattedDate = (date) => moment(date, 'MM/DD/YYYY').toDate();

			const experience = await WorkExperienceModel.create({
				companyName,
				startDate: formattedDate(startDate),
				endDate: formattedDate(endDate),
				position,
				application_id,
			});

			return {
				status: 201,
				message: 'Working exp create successfully',
				data: experience,
			};
		} catch (error) {
			throw new Error(error);
		}
	},
	update: async () => {
		try {
		} catch (error) {}
	},
	delete: async () => {
		try {
		} catch (error) {}
	},
};

module.exports = experienceService;
