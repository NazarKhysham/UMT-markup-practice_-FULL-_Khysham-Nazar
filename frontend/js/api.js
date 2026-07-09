import axios from './vendor/axios.esm.js';

const isLocalDev = ['localhost', '127.0.0.1'].includes(window.location.hostname);

const DEPLOYED_API_BASE_URL = 'https://umt-markup-practice-full-khysham-nazar.onrender.com/api';

const client = axios.create({
  baseURL: isLocalDev ? 'http://localhost:3000/api' : DEPLOYED_API_BASE_URL,
});

let bouquetsPromise;

function loadAllBouquets() {
  if (!bouquetsPromise) {
    bouquetsPromise = client.get('/bouquets').then(({ data }) => data);
  }
  return bouquetsPromise;
}

export async function fetchTopSelling() {
  const bouquets = await loadAllBouquets();
  return bouquets.filter((bouquet) => bouquet.favorite);
}

export async function fetchBouquets({ page, limit, search }) {
  const bouquets = await loadAllBouquets();
  const query = (search || '').toLowerCase();
  const filtered = bouquets.filter(
    (bouquet) => !bouquet.favorite && bouquet.title.toLowerCase().includes(query)
  );

  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);
  return { items, total: filtered.length };
}

export async function createOrder(order) {
  const { data } = await client.post('/orders', order);
  return data;
}
