const {
	ApplicationModel,
	WorkExperienceModel,
} = require('../../models/Application');

const applicationService = {
	attributes: [
		'_id',
		'name',
		'email',
		'image',
		'phone',
		'gender',
		'education',
		'working_exp',
		'skills',
	],
	index: async (req) => {
		try {
			const applications = await ApplicationModel.find({
				isDeleted: false,
			}).select(applicationService.attributes);

			return {
				status: 200,
				message: 'Retrived Applications list succesfully',
				data: applications,
			};
		} catch (error) {
			throw new Error(error);
		}
	},
	store: async (req) => {
		try {
			const {
				name,
				email,
				phone,
				image,
				gender,
				working_exp,
				education,
				skills,
			} = req.body;

			const checkEmail = await ApplicationModel.findOne({
				email: email,
			});

			if (checkEmail) {
				throw new Error('Email is already used');
			}

			const application = await ApplicationModel.create({
				name,
				email,
				phone,
				image,
				gender,
				working_exp,
				education,
				skills,
			});

			const workingExperiences = await WorkExperienceModel.create(
				working_exp.map((exp) => ({
					...exp,
					application: application._id, // Assuming application._id is the ID of the newly created application
				}))
			);

			if (!workingExperiences) {
				throw new Error('Create working exp failed');
			}

			if (!application) {
				throw new Error('Create application failed');
			}

			return {
				status: 201,
				message: 'Application created successfully',
				data: application,
			};
		} catch (error) {
			throw new Error(error);
		}
	},
	show: async (req) => {
		try {
			const application = await ApplicationModel.findById(
				req.params.id
			).select(applicationService.attributes);

			if (!application) {
				throw new Error('Application not found!');
			}

			return {
				status: 200,
				message: 'Retrived Application successfully',
				data: application,
			};
		} catch (error) {
			throw new Error(error);
		}
	},
	update: async (req) => {
		const applicationId = req.params.id;

		try {
			const {
				name,
				email,
				phone,
				image,
				gender,
				working_exp,
				education,
				skills,
			} = req.body;
			const application = await ApplicationModel.findById(applicationId);

			if (!application) {
				throw new Error('Application not found!');
			}

			if (email !== application.email) {
				const existingEmail = await ApplicationModel.findOne({
					email: email,
				});
				if (existingEmail) {
					throw new Error('Email already used');
				}
			}

			await application.updateOne({
				name,
				email,
				phone,
				image,
				gender,
				working_exp,
				education,
				skills,
			});

			const updateApplication = await ApplicationModel.findById(
				applicationId
			);

			return {
				status: 200,
				message: 'Updated Application successfully',
				data: updateApplication,
			};
		} catch (error) {
			throw new Error(error);
		}
	},
	delete: async (req) => {
		try {
			//Doing fake delete
			const application = await ApplicationModel.findByIdAndUpdate(
				req.params.id,
				{ isDeleted: true }
			);

			if (!application) {
				throw new Error('Application not found!');
			}

			return {
				status: 200,
				message: 'Application Deleted Successfully',
			};
		} catch (error) {
			throw new Error(error);
		}
	},
};

module.exports = applicationService;
