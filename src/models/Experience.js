const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const workExperienceSchema = new Schema({
	application_id: {
		type: Schema.Types.ObjectId,
		ref: 'Application',
	},
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
		required: true,
	},
	position: {
		type: String,
		required: true,
	},
});

const WorkExperienceModel = model('WorkExperience', workExperienceSchema);

module.exports = WorkExperienceModel;
