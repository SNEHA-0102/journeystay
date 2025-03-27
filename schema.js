const Joi = require('joi');

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().allow('', null), // Match Mongoose default behavior
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        // Make image optional since it's not required in Mongoose schema
        image: Joi.object({
            url: Joi.string(),
            filename: Joi.string()
        }).optional()
    }).required()
});

module.exports = { listingSchema };