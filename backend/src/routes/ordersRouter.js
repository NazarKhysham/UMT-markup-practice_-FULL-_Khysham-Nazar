import { Router } from 'express';

import ordersControllers from '../controllers/ordersControllers.js';
import validateBody from '../middlewares/validateBody.js';
import { orderCreateSchema } from '../schemas/orderSchemas.js';

const router = Router();

router.post('/', validateBody(orderCreateSchema), ordersControllers.create);

export default router;
