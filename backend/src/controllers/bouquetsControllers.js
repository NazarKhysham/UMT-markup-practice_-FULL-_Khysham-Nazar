import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import * as bouquetsServices from '../services/bouquetsServices.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const photosDir = path.join(__dirname, '../../public/photos');

const getAll = async (req, res) => {
  const bouquets = await bouquetsServices.listBouquets();
  res.status(200).json(bouquets);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const bouquet = await bouquetsServices.getBouquetById(id);
  if (!bouquet) throw new HttpError(404, 'Not found');
  res.status(200).json(bouquet);
};

const create = async (req, res) => {
  const bouquet = await bouquetsServices.createBouquet(req.body);
  res.status(201).json(bouquet);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const bouquet = await bouquetsServices.updateBouquetById(id, req.body);
  if (!bouquet) throw new HttpError(404, 'Not found');
  res.status(200).json(bouquet);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const bouquet = await bouquetsServices.deleteBouquetById(id);
  if (!bouquet) throw new HttpError(404, 'Not found');
  res.status(200).json(bouquet);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const bouquet = await bouquetsServices.updateFavoriteById(id, favorite);
  if (!bouquet) throw new HttpError(404, 'Not found');
  res.status(200).json(bouquet);
};

const updatePhoto = async (req, res) => {
  const { id } = req.params;
  if (!req.file) throw new HttpError(400, 'Photo file is required');

  const extension = path.extname(req.file.originalname);
  const uniqueName = `${crypto.randomUUID()}${extension}`;
  const targetPath = path.join(photosDir, uniqueName);

  await fs.rename(req.file.path, targetPath);

  const photoURL = `${process.env.BACKEND_URL || ''}/public/photos/${uniqueName}`;
  const bouquet = await bouquetsServices.updatePhotoById(id, photoURL);

  if (!bouquet) {
    await fs.unlink(targetPath).catch(() => {});
    throw new HttpError(404, 'Not found');
  }

  res.status(200).json({ photoURL: bouquet.photoURL });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  create: ctrlWrapper(create),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateFavorite: ctrlWrapper(updateFavorite),
  updatePhoto: ctrlWrapper(updatePhoto),
};
