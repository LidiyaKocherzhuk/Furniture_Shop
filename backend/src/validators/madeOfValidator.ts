import Joi from 'joi';

export const madeOfValidator = {
    save: Joi.object({
        material: Joi.string()
            .required()
            .max(250),
    }),
};
