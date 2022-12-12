import Joi from 'joi';

export const isLikeValidator = {
    save: Joi.object({
        userId: Joi.number()
            .required(),

        productId: Joi.number()
            .required(),

        isLike: Joi.boolean(),
    }),

    delete: Joi.object({
        userId: Joi.number(),
        productId: Joi.number(),
    }),
};
