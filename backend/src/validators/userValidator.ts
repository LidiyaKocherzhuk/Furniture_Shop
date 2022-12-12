import Joi from 'joi';

import { regexp } from '../config';

export const userValidator = {
    createUser: Joi.object({
        username: Joi.string()
            .required()
            .trim()
            .min(2)
            .max(50),

        surname: Joi.string()
            .trim()
            .allow('')
            .min(2)
            .max(50),

        email: Joi.string()
            .regex(regexp.EMAIL)
            .required()
            .trim()
            .min(6)
            .max(250),

        password: Joi.string()
            .regex(regexp.PASSWORD)
            .required()
            .trim()
            .min(8)
            .max(250),

        phone: Joi.string()
            .trim()
            .regex(regexp.PHONE)
            .allow('')
            .min(10)
            .max(30),

        age: Joi.number()
            .integer()
            .allow('')
            .min(18)
            .max(100),

        city: Joi.string()
            .trim()
            .allow('')
            .min(2)
            .max(250),

        image: Joi.string()
            .trim()
            .allow('')
            .min(2)
            .max(250),
    }),

    loginUser: Joi.object({
        email: Joi.string()
            .regex(regexp.EMAIL)
            .required()
            .trim()
            .min(6)
            .max(250),

        password: Joi.string()
            .regex(regexp.PASSWORD)
            .required()
            .trim()
            .min(8)
            .max(250),
    }),

    logOutUser: Joi.object({
        userId: Joi.number()
            .integer()
            .required(),
    }),

    refreshUser: Joi.object({
        refreshToken: Joi.string()
            .required()
            .max(250)
            .trim(),
    }),

    forgotPassword: Joi.object({
        email: Joi.string()
            .regex(regexp.EMAIL)
            .required()
            .trim()
            .min(6)
            .max(250),
    }),

    updatePassword: Joi.object({
        password: Joi.string()
            .regex(regexp.PASSWORD)
            .required()
            .trim()
            .min(8)
            .max(250),
    }),
};
