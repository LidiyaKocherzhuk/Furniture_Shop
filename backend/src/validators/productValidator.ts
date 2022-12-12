import Joi from 'joi';

export const productValidator = {
    createProduct: Joi.object({
        model: Joi.string()
            .required()
            .trim()
            .max(250),

        slats: Joi.string()
            .allow('')
            .trim()
            .max(250),

        decor: Joi.string()
            .allow('')
            .trim()
            .max(250),

        price: Joi.string()
            .required()
            .min(1),

        headboardHeight: Joi.string()
            .allow('')
            .trim()
            .max(250),

        sidewallsHeight: Joi.string()
            .allow('')
            .trim(),

        dimensionsOfTheProduct: Joi.string()
            .allow('')
            .trim()
            .max(250),

        legs: Joi.string()
            .allow('')
            .trim()
            .max(250),

        mechanism: Joi.string()
            .allow('')
            .trim()
            .max(250),

        isNovelty: Joi.string()
            .allow('')
            .trim()
            .max(250),

        isPopular: Joi.string()
            .allow('')
            .trim()
            .max(250),

        anotherDetails: Joi.string()
            .allow('')
            .trim()
            .max(250),

        type: Joi.string()
            .required()
            .trim()
            .max(250),

        materials: Joi.string()
            .allow('')
            .trim()
            .max(250),

    }),

    productFromClient: Joi.object({
        id: Joi.number()
            .integer(),

        model: Joi.string()
            .allow('')
            .trim()
            .max(250),

        slats: Joi.string()
            .allow('')
            .trim()
            .max(250),

        decor: Joi.string()
            .allow('')
            .trim()
            .max(250),

        price: Joi.string()
            .allow('')
            .min(1),

        headboardHeight: Joi.string()
            .allow('')
            .trim()
            .max(250),

        sidewallsHeight: Joi.string()
            .allow('')
            .trim(),

        dimensionsOfTheProduct: Joi.string()
            .allow('')
            .trim()
            .max(250),

        legs: Joi.string()
            .allow('')
            .trim()
            .max(250),

        mechanism: Joi.string()
            .allow('')
            .trim()
            .max(250),

        isNovelty: Joi.string()
            .allow('')
            .trim()
            .max(250),

        isPopular: Joi.string()
            .allow('')
            .trim()
            .max(250),

        anotherDetails: Joi.string()
            .allow('')
            .trim()
            .max(250),

        type: Joi.string()
            .allow('')
            .trim()
            .max(250),

        materials: Joi.string()
            .allow('')
            .trim()
            .max(250),

        limit: Joi.number(),

    }),

    sortData: Joi.object({
        sortParam: Joi.string()
            .allow('')
            .trim()
            .max(250),

        orderParam: Joi.string()
            .allow('')
            .trim()
            .max(250),

        price: Joi.string()
            .max(250),

        params: Joi.object({
            isPopular: Joi.string()
                .allow('')
                .trim()
                .max(250),
            isNovelty: Joi.string()
                .allow('')
                .trim()
                .max(250),
            type: Joi.string()
                .allow('')
                .trim()
                .max(250),
        }),

        limit: Joi.number()
            .integer(),
    }),
};
