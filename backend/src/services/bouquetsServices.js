import Bouquet from '../models/Bouquet.js';

export const listBouquets = () => Bouquet.findAll({ order: [['id', 'ASC']] });

export const getBouquetById = (id) => Bouquet.findByPk(id);

export const createBouquet = (data) => Bouquet.create(data);

export const updateBouquetById = async (id, data) => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) return null;
  await bouquet.update(data);
  return bouquet;
};

export const deleteBouquetById = async (id) => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) return null;
  await bouquet.destroy();
  return bouquet;
};

export const updateFavoriteById = async (id, favorite) => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) return null;
  bouquet.favorite = favorite;
  await bouquet.save();
  return bouquet;
};

export const updatePhotoById = async (id, photoURL) => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) return null;
  bouquet.photoURL = photoURL;
  await bouquet.save();
  return bouquet;
};
