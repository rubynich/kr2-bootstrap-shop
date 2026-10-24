// Небольшой скрипт для демонстрации компонентов Bootstrap.
// Backend пока не подключён, поэтому формы никуда не отправляются.

// 1. Фильтр каталога по категориям (кнопки nav-pills).
const filterButtons = document.querySelectorAll('[data-filter]');
const catalogItems = document.querySelectorAll('[data-category]');
const catalogCount = document.getElementById('catalog-count');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    let visible = 0;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    catalogItems.forEach((item) => {
      const show = category === 'all' || item.dataset.category === category;
      item.classList.toggle('d-none', !show);
      if (show) visible += 1;
    });

    if (catalogCount) catalogCount.textContent = visible;
  });
});

// 2. Модальное окно: показываем, какой товар выбран.
const orderModal = document.getElementById('orderModal');

if (orderModal) {
  orderModal.addEventListener('show.bs.modal', (event) => {
    const trigger = event.relatedTarget;
    const productName = trigger && trigger.dataset.product ? trigger.dataset.product : 'Не выбран';
    document.getElementById('modal-product-name').textContent = productName;
    document.getElementById('modal-product').value = productName;
  });
}

// 3. Страница заявки: товар подставляется из ссылки order.html?product=3.
const productSelect = document.getElementById('order-product');

if (productSelect) {
  const productId = new URLSearchParams(window.location.search).get('product');
  if (productId && productSelect.querySelector(`option[value="${productId}"]`)) {
    productSelect.value = productId;
  }
}

// 4. Проверка форм средствами Bootstrap и уведомление toast.
const successToast = document.getElementById('successToast');

document.querySelectorAll('form.needs-validation').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    form.reset();
    form.classList.remove('was-validated');

    const modalElement = form.closest('.modal');
    if (modalElement) bootstrap.Modal.getInstance(modalElement).hide();

    if (successToast) bootstrap.Toast.getOrCreateInstance(successToast).show();
  });

  form.addEventListener('reset', () => form.classList.remove('was-validated'));
});
