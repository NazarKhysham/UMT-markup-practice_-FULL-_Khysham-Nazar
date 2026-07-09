import { initTopSelling, initBouquets, onProductCardClick } from './render.js';
import { initOrderFormValidation } from './validate.js';
import { createOrder } from './api.js';

if (window.AOS) {
  AOS.init({ duration: 600, once: true, offset: 40 });
}

/* ---------- Mobile menu ---------- */
const navToggle = document.querySelector('.nav__toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu__close');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

function openMobileMenu() {
  mobileMenu.classList.add('is-open');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.classList.add('no-scroll');
}

function closeMobileMenu() {
  mobileMenu.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('no-scroll');
}

navToggle.addEventListener('click', openMobileMenu);
mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileMenuLinks.forEach((link) => link.addEventListener('click', closeMobileMenu));

/* ---------- Modals ---------- */
function openModal(modal) {
  modal.classList.add('is-open');
  document.body.classList.add('no-scroll');
}

function closeModal(modal) {
  modal.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
}

document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) closeModal(backdrop);
  });
  backdrop.querySelector('.modal__close').addEventListener('click', () => closeModal(backdrop));
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('.modal-backdrop.is-open').forEach((backdrop) => closeModal(backdrop));
  if (mobileMenu.classList.contains('is-open')) closeMobileMenu();
});

/* ---------- Product details modal ---------- */
const productModal = document.querySelector('#product-modal');
const productModalImage = document.querySelector('#product-modal-image');
const productModalTitle = document.querySelector('#product-modal-title');
const productModalPrice = document.querySelector('#product-modal-price');
const productModalDescription = document.querySelector('#product-modal-description');
const productModalBuy = document.querySelector('#product-modal-buy');

const orderModal = document.querySelector('#order-modal');
const orderProductId = document.querySelector('#order-product-id');
const orderQuantity = document.querySelector('#order-quantity');
const orderForm = document.querySelector('#order-form');
const productModalQty = document.querySelector('#product-modal-qty');

function openProductModal(product) {
  productModalImage.src = product.photoURL;
  productModalImage.removeAttribute('srcset');
  productModalImage.alt = `${product.title} bouquet`;
  productModalTitle.textContent = product.title;
  productModalPrice.textContent = `$${product.price}`;
  productModalDescription.textContent = product.description;
  productModalBuy.dataset.id = product.id;
  productModalQty.value = 1;
  openModal(productModal);
}

onProductCardClick(openProductModal);

productModalBuy.addEventListener('click', () => {
  orderProductId.value = productModalBuy.dataset.id;
  orderQuantity.value = Math.max(1, Number(productModalQty.value) || 1);
  closeModal(productModal);
  openModal(orderModal);
});

initOrderFormValidation(orderForm);

orderForm.addEventListener('order:submit', async (event) => {
  const entries = Object.fromEntries(event.detail.entries());
  const submitButton = orderForm.querySelector('.order-form__submit');

  submitButton.disabled = true;
  try {
    await createOrder({
      name: entries.name,
      phone: entries.phone,
      address: entries.address,
      message: entries.message || '',
      bouquetId: Number(entries.productId),
      quantity: Number(entries.quantity) || 1,
    });

    closeModal(orderModal);
    orderForm.reset();
    orderForm.querySelectorAll('.order-form__field.is-invalid').forEach((field) => {
      field.classList.remove('is-invalid');
    });
  } catch (error) {
    console.error('Order submission failed:', error);
    window.alert('Something went wrong while placing your order. Please try again.');
  } finally {
    submitButton.disabled = false;
  }
});

/* ---------- Testimonials carousel ---------- */
const testimonialsList = document.querySelector('.testimonials__list');
const testimonialsArrows = document.querySelectorAll('.testimonials__arrow');

function getTestimonialsStep() {
  const firstCard = testimonialsList.firstElementChild;
  if (!firstCard) return 0;

  const styles = window.getComputedStyle(testimonialsList);
  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;

  return firstCard.getBoundingClientRect().width + gap;
}

function updateTestimonialsArrows() {
  const maxScrollLeft = testimonialsList.scrollWidth - testimonialsList.clientWidth - 1;

  testimonialsArrows[0].disabled = testimonialsList.scrollLeft <= 0;
  testimonialsArrows[1].disabled = testimonialsList.scrollLeft >= maxScrollLeft;
}

testimonialsArrows.forEach((arrow, index) => {
  arrow.addEventListener('click', () => {
    const direction = index === 0 ? -1 : 1;

    testimonialsList.scrollBy({
      left: direction * getTestimonialsStep(),
      behavior: 'smooth',
    });
  });
});

testimonialsList.addEventListener('scroll', () => {
  window.requestAnimationFrame(updateTestimonialsArrows);
});

window.addEventListener('resize', updateTestimonialsArrows);

updateTestimonialsArrows();

/* ---------- Data ---------- */
initTopSelling();
initBouquets();
