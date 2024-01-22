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
				.select(applicationService.attributes)
				.populate('working_exp');

			console.log(applications);

			applications.forEach((application) => {
				if (!application.working_exp) {
					application.working_exp = [];
				}
			});

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
				education,
				skills,
			});

			const formattedDate = (date) => moment(date, 'MM/DD/YYYY').toDate();
			if (working_exp.length > 0) {
				const workingExperiences = await WorkExperienceModel.create(
					working_exp.map((exp) => ({
						...exp,
						startDate: formattedDate(exp.startDate), //get MM/DD/YYYY format from client
						endDate: formattedDate(exp.endDate),
						application: application._id, // Assuming application._id is the ID of the newly created application
					}))
				);

				if (!workingExperiences) {
					throw new Error('Create working exp failed');
				}
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
