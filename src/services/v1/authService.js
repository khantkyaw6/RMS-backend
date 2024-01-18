const AdminModel = require('../../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authService = {
	login: async (req, res) => {
		try {
			const { email, password } = req.body;

			const admin = await AdminModel.findOne({ email: email });

			if (!admin) {
				throw new Error('Admin not found');
			}

			const isPasswordEqual = await bcrypt.compare(
				password,
				admin.password
			);

			if (!isPasswordEqual) {
				throw new Error('Password Incorrect');
			}

			const token = authService.signToken(admin);

			admin.token = token;

			const adminUpdated = await admin.save();

			console.log({ adminUpdated });

			return {
				status: 200,
				message: 'Login success',
				data: adminUpdated,
			};
		} catch (error) {
			throw new Error(error);
		}
	},
	logout: async () => {},
	signToken: (admin) => {
		console.log('in signtoken');
		return jwt.sign(
			{ id: admin._id },
			process.env.SECRET_KEY || 'TRUSTLINKKEY',
			{
				expiresIn: '1d',
			}
		);
	},
};

module.exports = authService;
