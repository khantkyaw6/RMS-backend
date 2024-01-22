const mongoose = require('mongoose');
const WorkExperienceModel = require('./Experience');
const { Schema, model } = mongoose;

const applicationSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			default: '',
		},
		gender: {
			type: String,
			required: true,
			enum: ['Male', 'Female', 'Other'],
		},
		working_exp: {
			type: Schema.Types.ObjectId,
			ref: 'WorkExperience', // Reference to the WorkExperienceModel
		},
		education: {
			type: String,
		},
		skills: [String],
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const ApplicationModel = model('Application', applicationSchema);

module.exports = {
	ApplicationModel, //WorkExperienceModel
};
