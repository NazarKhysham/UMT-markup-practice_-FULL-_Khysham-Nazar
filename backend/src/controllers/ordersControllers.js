import ctrlWrapper from '../helpers/ctrlWrapper.js';
import * as ordersServices from '../services/ordersServices.js';

const create = async (req, res) => {
  const order = await ordersServices.createOrder(req.body);
  res.status(201).json(order);
};

export default {
  create: ctrlWrapper(create),
};
