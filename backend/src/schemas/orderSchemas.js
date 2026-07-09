import Joi from 'joi';

export const orderCreateSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  message: Joi.string().allow('').optional(),
  bouquetId: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().min(1).required(),
});
