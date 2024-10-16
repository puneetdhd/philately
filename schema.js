const { signedCookie } = require('cookie-parser');
const Joi =require('joi');

module.exports.ProfileSchema= Joi.object({
    listing: Joi.object({
        name:Joi.string().required(),
        email:Joi.string().required(),
        profile_image:Joi.string().allow("",null)
    }).required()
});

module.exports.postSchema=Joi.object({
    post:Joi.object({
        image:Joi.string().required(),
        caption:Joi.string.required(),
    }).required()
});
