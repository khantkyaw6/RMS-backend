const AdminModel = require('../../models/Admin');
const bcrypt = require('bcrypt');

const adminService = {
	attributes: ['_id', 'email', 'token'],
	index: async () => {
		try {
			const admin = await AdminModel.find();

			return {
				status: 200,
				message: 'All admin list',
				data: admin,
			};
		} catch (error) {
			throw new Error(error);
		}
	},
	store: async (req) => {
		try {
			const { email, password } = req.body;

			const checkEmail = await AdminModel.findOne({ email: email });

			if (checkEmail) {
				throw new Error('Email is already used');
			}

			const salt = await bcrypt.genSalt(process.env.SALT_ROUND * 1);

			const admin = await AdminModel.create({
				email,
				password: bcrypt.hashSync(password, salt),
			});

			if (!admin) {
				throw new Error('Admin create failed');
			}

			return {
				status: 201,
				message: 'Admin created successfully',
				data: admin,
			};
		} catch (error) {
			throw new Error(error);
		}
	},
	show: async (req) => {
		try {
			const admin = await AdminModel.findById(req.params.id).select(
				adminService.attributes
			);

			if (!admin) {
				throw new Error('Admin not found!');
			}

			return {
				status: 200,
				message: 'Retrived Admin detail',
				data: admin,
			};
		} catch (error) {
			throw new Error(error);
		}
	},
	update: async (req) => {
		try {
			const { email, password } = req.body;
			const admin = await AdminModel.findById(req.params.id);

			if (!admin) {
				throw new Error('Admin not found');
			}

			if (email !== admin.email) {
				const existingEmail = await AdminModel.findOne({
					email: email,
				});
				if (existingEmail) {
					throw new Error('Email already used');
				}
			}

			const salt = await bcrypt.genSalt(process.env.SALT_ROUND * 1);

			await admin.updateOne({
				email,
				password: bcrypt.hashSync(password, salt),
			});

			const updateAdmin = await AdminModel.findById(req.params.id).select(
				adminService.attributes
			);

			return {
				status: 200,
				message: 'Admin update successfully',
				data: updateAdmin,
			};
		} catch (error) {
			throw new Error(error);
		}
	},
	delete: async (req) => {
		try {
		} catch (error) {
			throw new Error(error);
		}
	},
};

module.exports = adminService;
