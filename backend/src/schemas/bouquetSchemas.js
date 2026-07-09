import Joi from 'joi';

export const bouquetCreateSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  photoURL: Joi.string().uri().optional(),
  favorite: Joi.boolean().optional(),
});

export const bouquetUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  price: Joi.number().positive(),
  photoURL: Joi.string().uri(),
  favorite: Joi.boolean(),
}).min(1);

export const bouquetFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
