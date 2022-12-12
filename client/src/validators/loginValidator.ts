import Joi from 'joi';

import { regexp } from '../config';

export const LoginValidator = Joi.object({
    email: Joi.string()
        .regex(regexp.EMAIL)
        .required()
        .trim()
        .min(6)
        .max(250)
        .messages({
            'string.empty': 'Це поле повинно бути заповнене!',
            'string.pattern.base': 'Це поле повинно бути google-імейлом, наприклад: "exsample@gmail.com"!',
            'string.min': 'Це поле повинно містити не менше 6 символів!',
            'string.max': 'Це поле повинно містити не більше 250 символів!',
        }),

    password: Joi.string()
        .regex(regexp.PASSWORD)
        .required()
        .trim()
        .min(8)
        .max(250)
        .messages({
            'string.empty': 'Це поле повинно бути заповнене!',
            'string.pattern.base': 'Це поле повинно містити велику та малу літеру а також хоча б одну цифру!',
            'string.min': 'Це поле повинно містити не менше 8 символів!',
            'string.max': 'Це поле повинно містити не більше 250 символів!',
        }),
});

export const forgotPasswordValidator = Joi.object({
    email: Joi.string()
        .regex(regexp.EMAIL)
        .required()
        .trim()
        .min(6)
        .max(250)
        .messages({
            'string.empty': 'Це поле повинно бути заповнене!',
            'string.pattern.base': 'Це поле повинно бути google-імейлом, наприклад: "exsample@gmail.com"!',
            'string.min': 'Це поле повинно містити не менше 6 символів!',
            'string.max': 'Це поле повинно містити не більше 250 символів!',
        }),

    password: Joi.string()
        .regex(regexp.PASSWORD)
        .required()
        .trim()
        .min(8)
        .max(250)
        .messages({
            'string.empty': 'Це поле повинно бути заповнене!',
            'string.pattern.base': 'Це поле повинно містити велику та малу літеру а також хоча б одну цифру!',
            'string.min': 'Це поле повинно містити не менше 8 символів!',
            'string.max': 'Це поле повинно містити не більше 250 символів!',
        }),

    confirmPassword: Joi.any()
        .required()
        .valid(Joi.ref('password'))
        .messages({
            'any.only': 'Не вірний пароль!',
        }),
}).with('password', 'confirmPassword');
