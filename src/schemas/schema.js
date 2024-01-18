const Joi = require('joi');

module.exports = {
	applicationSchema: {
		store: Joi.object({
			name: Joi.string().required().messages({
				'string.base': 'name_must_be_string',
				'any.required': 'name_required',
				'string.empty': 'name_not_empty',
			}),
			email: Joi.string().email().required().messages({
				'string.email': 'email_must_valid',
				'string.empty': 'email_not_empty',
				'any.required': 'email_required',
			}),
			phone: Joi.string().min(7).max(11).required().messages({
				'string.empty': 'phone_not_empty',
				'any.required': 'phone_required',
				'string.min': 'phone_min_length',
				'string.max': 'phone_max_length',
			}),
			gender: Joi.string()
				.valid('Male', 'Female', 'Other')
				.required()
				.messages({
					'string.base': 'Gender_must_be_string',
					'any.required': 'Gender is required',
					'any.only': 'Gender Invalid',
				}),
			education: Joi.string().messages({
				'string.base': 'education_must_be_string',
			}),
			skills: Joi.array().items(Joi.string()).messages({
				'array.base': 'skills_must_be_array',
				'array.items': 'skills_elements_must_be_strings',
			}),
			working_exp: Joi.array()
				.items(
					Joi.object({
						companyName: Joi.string().required(),
						startDate: Joi.date().required(),
						endDate: Joi.date(),
						position: Joi.string().required(),
					})
				)
				.messages({
					'array.base': 'working_exp_must_be_array',
					'array.items': 'working_exp_elements_invalid',
				}),
			image: Joi.string().allow('').messages({
				'string.base': 'image_must_be_string',
			}),
		}),
	},
};
