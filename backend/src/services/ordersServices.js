import Order from '../models/Order.js';

export const createOrder = (data) => Order.create(data);
