import Joi from 'joi';

export const ConfirmEmailValidator = Joi.object({
    emailCode: Joi.number()
        .required()
        .min(100000)
        .max(999999)
        .messages({
            'number.base': 'Це поле повинно бути заповнене!',
            'number.empty': 'Це поле повинно бути заповнене!',
            'number.min': 'Це поле повинно містити не менше 6 символів!',
            'number.max': 'Це поле повинно містити не більше 6 символів!',
        }),
});
