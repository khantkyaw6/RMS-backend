const ApplicationModel = require('../../models/Application');
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

			// Add the newly created work experience to the associated application
			const application = await ApplicationModel.findById(application_id);
			if (!application) {
				throw new Error('Application not found!');
			}
			application.working_exp.push(experience._id);
			await application.save();

			return {
				status: 201,
				message: 'Working exp create successfully',
				data: experience,
			};
		} catch (error) {
			throw new Error(error);
		}
	},
	update: async (req) => {
		const experienceId = req.params.id;

		try {
			const { companyName, startDate, endDate, position } = req.body;

			console.log(req.body);

			const experience = await WorkExperienceModel.findById(experienceId);

			console.log({ startDate, endDate });

			if (!experience) {
				throw new Error('Experience not found');
			}

			const formattedDate = (date) => moment(date, 'MM/DD/YYYY').toDate();

			await experience.updateOne({
				companyName,
				startDate: formattedDate(startDate),
				endDate: formattedDate(endDate),
				position,
			});

			const updateExperience = await WorkExperienceModel.findById(
				experienceId
			);

			return {
				status: 200,
				message: 'Experience update successfully',
				data: updateExperience,
			};
		} catch (error) {
			throw new Error(error);
		}
	},
	delete: async (req) => {
		try {
			const experienceId = req.params.id;

			const deletedExperience =
				await WorkExperienceModel.findByIdAndDelete(experienceId);

			if (!deletedExperience) {
				throw new Error('Experience not found');
			}

			const applicationId = deletedExperience.application_id;
			const application = await ApplicationModel.findById(applicationId);

			if (!application) {
				throw new Error('Application Not found');
			}

			application.working_exp = application.working_exp.filter(
				(expId) => expId.toString() !== experienceId
			);

			await application.save();

			return {
				status: 200,
				message: 'Experience Delete Successfully',
			};
		} catch (error) {
			throw new Error(error);
		}
	},
};

module.exports = experienceService;
