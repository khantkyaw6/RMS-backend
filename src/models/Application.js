const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const workExperienceSchema = new Schema({
	companyName: {
		type: String,
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
	},
	position: {
		type: String,
		required: true,
	},
});

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
		working_exp: [workExperienceSchema],
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
const WorkExperienceModel = model('WorkExperience', workExperienceSchema);

module.exports = { ApplicationModel, WorkExperienceModel };
