import Joi from 'joi';

export const productTextileValidator = {
    save: Joi.object({
        textiles: Joi.array(),
        productId: Joi.number()
            .integer(),
    }),
};
