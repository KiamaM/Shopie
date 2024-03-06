import Joi from "joi";

export const regUserValidation = Joi.object({
    firstName: Joi.string().required().max(30),
    lastName: Joi.string().required().max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
   
})

export const loginUserValidation=Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
})

export const validateUpdateuser=Joi.object({
    firstName: Joi.string().required().max(30),
    lastName: Joi.string().required().max(30),
    email : Joi.string().required().email(),
})

// reset password validator
 
