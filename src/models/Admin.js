const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const adminSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 5,
		},
		token: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const AdminModel = model('Admin', adminSchema);

module.exports = AdminModel;
