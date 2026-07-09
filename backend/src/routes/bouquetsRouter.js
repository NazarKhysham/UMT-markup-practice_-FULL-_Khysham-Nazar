import { Router } from 'express';

import bouquetsControllers from '../controllers/bouquetsControllers.js';
import validateBody from '../middlewares/validateBody.js';
import upload from '../middlewares/upload.js';
import {
  bouquetCreateSchema,
  bouquetUpdateSchema,
  bouquetFavoriteSchema,
} from '../schemas/bouquetSchemas.js';

const router = Router();

router.get('/', bouquetsControllers.getAll);
router.get('/:id', bouquetsControllers.getById);
router.post('/', validateBody(bouquetCreateSchema), bouquetsControllers.create);
router.put('/:id', validateBody(bouquetUpdateSchema), bouquetsControllers.updateById);
router.delete('/:id', bouquetsControllers.deleteById);
router.patch(
  '/:id/favorite',
  validateBody(bouquetFavoriteSchema),
  bouquetsControllers.updateFavorite,
);
router.patch('/:id/photo', upload.single('photo'), bouquetsControllers.updatePhoto);

export default router;
