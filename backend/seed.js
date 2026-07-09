import 'dotenv/config';

import sequelize, { connectDb } from './src/config/db.js';
import Bouquet from './src/models/Bouquet.js';
import Order from './src/models/Order.js';

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:3000';

const bouquets = [
  {
    title: 'Spring Elegance',
    price: 35,
    photoURL: `${BASE_URL}/public/photos/bouquet-spring-elegance.png`,
    favorite: true,
    description:
      "Each stem is carefully selected to create a bouquet that radiates freshness, elegance, and the gentle charm of spring. Whether you're celebrating a birthday, sending love, or simply brightening someone's day, this arrangement is sure to bring warm smiles and lasting impressions.",
  },
  {
    title: 'Berry Chic',
    price: 40,
    photoURL: `${BASE_URL}/public/photos/bouquet-rosy-glow.png`,
    favorite: true,
    description:
      'A bold arrangement of deep berry roses and eucalyptus, finished with a satin ribbon.',
  },
  {
    title: 'Lavender Dream',
    price: 55,
    photoURL: `${BASE_URL}/public/photos/bouquet-lavender-dream.png`,
    favorite: true,
    description:
      'Delicate lavender and violet blooms gathered in a rustic glass vase for a dreamy centerpiece.',
  },
  {
    title: 'Peach Meadow',
    price: 55,
    photoURL: `${BASE_URL}/public/photos/bouquet-pastel-meadow.png`,
    favorite: false,
    description:
      'Peach and blush blooms with wild meadow greens, wrapped in a soft woven basket.',
  },
  {
    title: 'Blush Romance',
    price: 34,
    photoURL: `${BASE_URL}/public/photos/bouquet-white-serenity.png`,
    favorite: false,
    description: 'A romantic mix of blush roses and eucalyptus, hand-tied by our in-house florist.',
  },
  {
    title: 'Pastel Garden',
    price: 40,
    photoURL: `${BASE_URL}/public/photos/bouquet-forest-basket.png`,
    favorite: false,
    description:
      'Pastel garden roses and succulents styled in a rustic basket with pinecone accents.',
  },
  {
    title: 'Tulip Charm',
    price: 61,
    photoURL: `${BASE_URL}/public/photos/bouquet-sunny-morning.png`,
    favorite: false,
    description: 'Charming tulips and garden roses presented in a rustic wooden crate.',
  },
  {
    title: 'Berry Bloom',
    price: 32,
    photoURL: `${BASE_URL}/public/photos/bouquet-tropical-bloom.png`,
    favorite: false,
    description: 'Rich berry-toned blooms and dried accents for a warm, textured arrangement.',
  },
  {
    title: 'Sweet Whisper',
    price: 40,
    photoURL: `${BASE_URL}/public/photos/bouquet-notecard-basket.png`,
    favorite: false,
    description:
      'A sweet mix of pastel peonies and roses in a woven basket with a keepsake notecard.',
  },
  {
    title: 'Field Joy',
    price: 49,
    photoURL: `${BASE_URL}/public/photos/bouquet-wildflowers.png`,
    favorite: false,
    description: 'A joyful hand-tied bunch of wildflowers bursting with color.',
  },
  {
    title: 'Soft Bloom',
    price: 37,
    photoURL: `${BASE_URL}/public/photos/bouquet-vintage-dark.png`,
    favorite: false,
    description: 'Soft blush blooms wrapped in kraft paper with a satin bow for a timeless gift.',
  },
];

async function seed() {
  await connectDb();
  await sequelize.sync({ force: true });
  await Bouquet.bulkCreate(bouquets);
  // Order table is created by sync() above; referenced here only to ensure it's registered.
  void Order;
  console.log(`Seeded ${bouquets.length} bouquets.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed failed:', error.message);
  process.exit(1);
});
