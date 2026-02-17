// schema.js
const Joi = require('joi');

// Review validation schema
const reviewSchema = Joi.object({
    rating: Joi.number()
        .min(1)
        .max(5)
        .required()
        .messages({
            'number.base': 'Rating must be a number.',
            'number.min': 'Rating must be at least 1.',
            'number.max': 'Rating cannot be more than 5.',
            'any.required': 'Rating is required.'
        }),
    comment: Joi.string()
        .trim()
        .min(3)
        .required()
        .messages({
            'string.empty': 'Leave a proper comment.',
            'string.min': 'Comment must be at least 3 characters.',
            'any.required': 'Comment is required.'
        })
});

module.exports = { reviewSchema };