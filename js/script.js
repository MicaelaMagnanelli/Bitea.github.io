document.addEventListener('DOMContentLoaded', function () {
    // Variables para el control de las páginas
    const page1 = document.querySelector('.page-1');
    const page2 = document.querySelector('.page-2');
    const nextButton = document.querySelector('.page-arrow-right');
    const prevButton = document.querySelector('.page-arrow-left');
    const pageNumber = document.querySelector('.page-number');
    const pagination = document.querySelector('.pagination');
    let currentPage = 1;
  
    // Debugging: Log pagination elements
    console.log('Pagination elements:', {
      pagination: !!pagination,
      page1: !!page1,
      page2: !!page2,
      nextButton: !!nextButton,
      prevButton: !!prevButton,
      pageNumber: !!pageNumber,
    });
  
    // Función para actualizar el estado de los botones de paginación
    function updatePaginationButtons() {
      prevButton.style.pointerEvents = currentPage === 1 ? 'none' : 'auto';
      nextButton.style.pointerEvents = currentPage === 2 ? 'none' : 'auto';
      prevButton.style.opacity = currentPage === 1 ? '0.8' : '1';
      nextButton.style.opacity = currentPage === 2 ? '0.8' : '1';
      console.log('Pagination button states:', {
        prevButton: prevButton.style.pointerEvents,
        nextButton: nextButton.style.pointerEvents,
      });
    }
  
    // Función para cambiar de página
    function changePage(page) {
      if (page === 1) {
        page1.classList.add('active');
        page1.classList.remove('hidden');
        page2.classList.remove('active');
        page2.classList.add('hidden');
        pageNumber.textContent = '1';
      } else if (page === 2) {
        page1.classList.remove('active');
        page1.classList.add('hidden');
        page2.classList.add('active');
        page2.classList.remove('hidden');
        pageNumber.textContent = '2';
      }
      currentPage = page;
      updatePaginationButtons();
  
      // Ensure pagination is visible
      pagination.classList.remove('hidden');
      pagination.style.display = 'flex';
      console.log('Pagination visibility:', {
        display: pagination.style.display,
        classes: pagination.classList,
      });
    }
  
    // Evento para el botón "Siguiente"
    nextButton.addEventListener('click', () => {
      if (currentPage === 1) {
        currentPage = 2;
        changePage(currentPage);
      }
    });
  
    // Evento para el botón "Anterior"
    prevButton.addEventListener('click', () => {
      if (currentPage === 2) {
        currentPage = 1;
        changePage(currentPage);
      }
    });
  
    // Inicializar la página al cargar
    changePage(1);
  
    // Obtener todos los contadores de productos
    const counters = document.querySelectorAll('.product-item');
    const buyButton = document.getElementById('buy-button');
  
    // Función para actualizar el total de productos seleccionados
    function updateTotal() {
      let total = 0;
      counters.forEach(counter => {
        const quantityInput = counter.querySelector('.quantity');
        total += parseInt(quantityInput.value, 10) || 0;
      });
      buyButton.disabled = total !== 3;
      console.log('Total quantity:', total, 'Buy button disabled:', buyButton.disabled);
    }
  
    // Función para incrementar el valor
    counters.forEach(counter => {
      const btnIncrease = counter.querySelector('.btn-increase');
      const btnDecrease = counter.querySelector('.btn-decrease');
      const quantityInput = counter.querySelector('.quantity');
  
      btnIncrease.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value, 10) || 0;
        if (currentValue < 3) {
          quantityInput.value = currentValue + 1;
          updateTotal();
        }
      });
  
      btnDecrease.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value, 10) || 0;
        if (currentValue > 0) {
          quantityInput.value = currentValue - 1;
          updateTotal();
        }
      });
  
      quantityInput.addEventListener('input', () => {
        let currentValue = parseInt(quantityInput.value, 10) || 0;
        if (currentValue < 0) quantityInput.value = 0;
        else if (currentValue > 3) quantityInput.value = 3;
        updateTotal();
      });
    });
  
    // Inicializar el estado del botón al cargar la página
    updateTotal();
  
    // Pop-up de login
    const popupLogin = document.querySelector('.popup-login');
    const closeButton = document.querySelector('.close-button');
  
    buyButton.addEventListener('click', () => {
      popupLogin.classList.remove('hidden');
      console.log('Login popup shown');
    });
  
    closeButton.addEventListener('click', () => {
      popupLogin.classList.add('hidden');
      console.log('Login popup hidden');
    });
  
    popupLogin.addEventListener('click', (event) => {
      if (event.target === popupLogin) {
        popupLogin.classList.add('hidden');
        console.log('Login popup hidden (click outside)');
      }
    });
  });