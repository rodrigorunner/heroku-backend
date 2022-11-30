const Joi = require('joi')

module.exports.racesSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
}).required()
