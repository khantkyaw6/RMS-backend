const moment = require('moment');
const { deleteFile } = require('../../helpers/fileHelper');
const ApplicationModel = require('../../models/Application');

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
	index: async () => {
		try {
			const applications = await ApplicationModel.find({
				isDeleted: false,
			})
				.populate(
					'working_exp',
					'companyName startDate endDate position'
				)
				.select(applicationService.attributes);

			applications.forEach((application) => {
				if (!application.working_exp) {
					application.working_exp = [];
				}
			});

			return {
				status: 200,
				message: 'Get Applications list successfully',
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
				education,
				skills,
			});

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
				education,
				skills,
			});

			const updateApplication = await ApplicationModel.findById(
				applicationId
			).populate('working_exp', 'companyName startDate endDate position');

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
	upload: async (req) => {
		try {
			const application = await ApplicationModel.findById(req.params.id);

			if (!application) {
				throw new Error('Application not found!');
			}
			let profileImage = req.body.image;
			if (req.file) {
				profileImage = req.file.path.replace('\\', '/');
			}
			if (!profileImage) {
				throw new Error('No file picked');
			}

			if (application.image && application.image != profileImage) {
				deleteFile(application.image);
			}

			application.image = profileImage;
			const result = await application.save();

			return {
				status: 200,
				message: 'Profile Upload Successfully',
				data: result,
			};
		} catch (error) {
			throw new Error(error);
		}
	},
};

module.exports = applicationService;
