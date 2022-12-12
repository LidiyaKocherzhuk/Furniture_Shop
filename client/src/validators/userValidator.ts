import Joi from 'joi';

import { regexp } from '../config';

export const UserValidator = Joi.object({
    username: Joi.string()
        .required()
        .trim()
        .min(2)
        .max(50)
        .messages({
            'string.empty': 'Це поле повинно бути заповнене!',
            'string.min': 'Це поле повинно містити не менше 2 символів!',
            'string.max': 'Це поле повинно містити не більше 50 символів!',
        }),

    surname: Joi.string()
        .trim()
        .allow('')
        .min(2)
        .max(50)
        .messages({
            'string.min': 'Це поле повинно містити не менше 2 символів!',
            'string.max': 'Це поле повинно містити не більше 50 символів!',
        }),

    email: Joi.string()
        .regex(regexp.EMAIL)
        .required()
        .trim()
        .min(6)
        .max(250)
        .messages({
            'string.empty': 'Це поле повинно бути заповнене!',
            'string.min': 'Це поле повинно містити не менше 6 символів!',
            'string.max': 'Це поле повинно містити не більше 250 символів!',
            'string.pattern.base': 'Це поле повинно бути емейлом, наприклад: "exsample@gmail.com"!',
        }),

    password: Joi.string()
        .regex(regexp.PASSWORD)
        .required()
        .trim()
        .min(8)
        .max(250)
        .messages({
            'string.empty': 'Це поле повинно бути заповнене!',
            'string.min': 'Це поле повинно містити не менше 8 символів!',
            'string.max': 'Це поле повинно містити не більше 250 символів!',
            'string.pattern.base': 'Це поле повинно містити велику та малу літеру а також хоча б одну цифру!',
        }),

    confirmPassword: Joi.any()
        .required()
        .valid(Joi.ref('password'))
        .messages({
            'any.only': 'Не вірний пароль!',
        }),

    phone: Joi.string()
        .trim()
        .regex(regexp.PHONE)
        .allow('')
        .min(10)
        .max(30)
        .messages({
            'string.min': 'Це поле повинно містити не менше 10 символів!',
            'string.max': 'Це поле повинно містити не більше 30 символів!',
            'string.pattern.base': 'Це поле може починатись з "+" та має містити цифри, наприклад: "+380965684212" або "0965684212"!',
        }),

    age: Joi.number()
        .integer()
        .allow('')
        .min(18)
        .max(100)
        .messages({
            'number.min': 'Вам немає 18!',
            'number.max': 'Вам більше 100?!',
        }),

    city: Joi.string()
        .trim()
        .allow('')
        .min(2)
        .max(250)
        .messages({
            'string.min': 'Це поле повинно містити не менше 2 символів!',
            'string.max': 'Це поле повинно містити не більше 250 символів!',
        }),

    files: Joi.any()
        .allow(''),

}).with('password', 'confirmPassword');
