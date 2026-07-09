import { fetchTopSelling, fetchBouquets } from './api.js';

const topSellingList = document.querySelector('#top-selling-list');
const topSellingPrev = document.querySelector('#top-selling-prev');
const topSellingNext = document.querySelector('#top-selling-next');
const topSellingDots = document.querySelector('#top-selling-dots');
const bouquetsList = document.querySelector('#bouquets-list');
const bouquetsEmpty = document.querySelector('#bouquets-empty');
const showMoreBtn = document.querySelector('#show-more-btn');
const searchInput = document.querySelector('#bouquets-search');
const filterForm = document.querySelector('#bouquets-filter');

function getBouquetsLimit() {
  return window.innerWidth >= 1440 ? 8 : 4;
}

const state = {
  page: 1,
  search: '',
};

let allProducts = [];

function productCardMarkup(product) {
  return `
    <li class="product-card" data-aos="fade-up">
      <button class="product-card__link" type="button" data-id="${product.id}">
        <img
          class="product-card__image"
          src="${product.photoURL}"
          alt="${product.title} bouquet"
          loading="lazy"
        />
      </button>
      <h3 class="product-card__title">${product.title}</h3>
      <p class="product-card__price">$${product.price}</p>
    </li>
  `;
}

function findProduct(id) {
  return allProducts.find((item) => String(item.id) === String(id));
}

function registerProducts(items) {
  items.forEach((item) => {
    if (!findProduct(item.id)) {
      allProducts.push(item);
    }
  });
}

function getSliderStep(list) {
  const firstCard = list?.firstElementChild;
  if (!list || !firstCard) return 0;

  const styles = window.getComputedStyle(list);
  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;

  return firstCard.getBoundingClientRect().width + gap;
}

function getVisibleSlidesCount(list) {
  const step = getSliderStep(list);
  if (!list || !step) return 1;

  return Math.max(1, Math.round(list.clientWidth / step));
}

function getSliderPages(list) {
  const totalSlides = list?.children.length || 0;
  const visibleSlides = getVisibleSlidesCount(list);

  return Math.max(1, totalSlides - visibleSlides + 1);
}

function getCurrentSliderPage(list) {
  const step = getSliderStep(list);
  if (!step) return 0;

  return Math.round(list.scrollLeft / step);
}

function scrollSlider(list, direction) {
  const step = getSliderStep(list);
  if (!step) return;

  list.scrollBy({ left: direction * step, behavior: 'smooth' });
}

function updateTopSellingPagination() {
  const pages = getSliderPages(topSellingList);
  const currentPage = Math.min(getCurrentSliderPage(topSellingList), pages - 1);

  if (topSellingPrev) topSellingPrev.disabled = currentPage <= 0;
  if (topSellingNext) topSellingNext.disabled = currentPage >= pages - 1;

  if (!topSellingDots) return;

  topSellingDots.innerHTML = Array.from({ length: pages }, (_, index) => {
    const isActive = index === currentPage ? ' products__dot--active' : '';

    return `<button class="products__dot${isActive}" type="button" aria-label="Go to top-selling page ${
      index + 1
    }" data-page="${index}"></button>`;
  }).join('');
}

export async function initTopSelling() {
  try {
    const items = await fetchTopSelling();
    registerProducts(items);
    topSellingList.innerHTML = items.map(productCardMarkup).join('');
    updateTopSellingPagination();
  } catch (error) {
    topSellingList.innerHTML = `<li class="products__empty">Failed to load bestsellers. Please try again later.</li>`;
    console.error(error);
  }
}

async function loadBouquets({ append }) {
  try {
    const { items, total } = await fetchBouquets({
      page: state.page,
      limit: getBouquetsLimit(),
      search: state.search,
    });
    registerProducts(items);

    if (append) {
      bouquetsList.insertAdjacentHTML('beforeend', items.map(productCardMarkup).join(''));
    } else {
      bouquetsList.innerHTML = items.map(productCardMarkup).join('');
    }

    const loadedCount = bouquetsList.children.length;
    bouquetsEmpty.hidden = loadedCount > 0;
    showMoreBtn.hidden = loadedCount >= total;
    if (window.AOS) {
      AOS.refreshHard();
    }
  } catch (error) {
    if (!append) {
      bouquetsList.innerHTML = '';
      bouquetsEmpty.hidden = false;
      bouquetsEmpty.textContent = 'Failed to load bouquets. Please try again later.';
    } else {
      state.page -= 1;
    }
    showMoreBtn.hidden = append;
    console.error(error);
  }
}

export function initBouquets() {
  loadBouquets({ append: false });

  showMoreBtn.addEventListener('click', () => {
    state.page += 1;
    loadBouquets({ append: true });
  });

  let debounceId;
  searchInput.addEventListener('input', (event) => {
    clearTimeout(debounceId);
    debounceId = setTimeout(() => {
      state.search = event.target.value.trim();
      state.page = 1;
      loadBouquets({ append: false });
    }, 300);
  });

  filterForm.addEventListener('submit', (event) => event.preventDefault());
}

if (topSellingPrev && topSellingNext && topSellingList) {
  topSellingPrev.addEventListener('click', () => scrollSlider(topSellingList, -1));
  topSellingNext.addEventListener('click', () => scrollSlider(topSellingList, 1));

  topSellingList.addEventListener('scroll', () =>
    window.requestAnimationFrame(updateTopSellingPagination)
  );

  window.addEventListener('resize', updateTopSellingPagination);
}

if (topSellingDots && topSellingList) {
  topSellingDots.addEventListener('click', (event) => {
    const dot = event.target.closest('.products__dot');
    if (!dot) return;

    const page = Number(dot.dataset.page);
    const step = getSliderStep(topSellingList);

    topSellingList.scrollTo({ left: page * step, behavior: 'smooth' });
  });
}

export function onProductCardClick(callback) {
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('.product-card__link');
    if (!trigger) return;
    const product = findProduct(trigger.dataset.id);
    if (product) callback(product);
  });
}
