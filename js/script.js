document.addEventListener('DOMContentLoaded', function () {
    // Variables para el control de las páginas
    const page1 = document.querySelector('.page-1');
    const page2 = document.querySelector('.page-2');
    const nextButton = document.querySelector('.page-arrow-right');
    const prevButton = document.querySelector('.page-arrow-left');
    const pageNumber = document.querySelector('.page-number');
    let currentPage = 1;

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
    changePage(1); // Esto asegurará que se muestre la página 1 al cargar



    // Obtener todos los contadores de productos
    const counters = document.querySelectorAll('.product-item');
    const buyButton = document.getElementById('buy-button');

    // Función para actualizar el total de productos seleccionados
    function updateTotal() {
        let total = 0;
        counters.forEach(counter => {
            const quantityInput = counter.querySelector('.quantity');
            total += parseInt(quantityInput.value, 10);
        });

        // Habilitar el botón "Comprar" solo si el total es 3
        buyButton.disabled = total !== 3;
    }

    // Función para incrementar el valor
    counters.forEach(counter => {
        const btnIncrease = counter.querySelector('.btn-increase');
        const btnDecrease = counter.querySelector('.btn-decrease');
        const quantityInput = counter.querySelector('.quantity');

        // Incrementar cantidad
        btnIncrease.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value, 10) || 0;
            if (currentValue < 3) {
                quantityInput.value = currentValue + 1;
                updateTotal();
            }
        });

        // Decrementar cantidad
        btnDecrease.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value, 10) || 0;
            if (currentValue > 0) {
                quantityInput.value = currentValue - 1;
                updateTotal();
            }
        });

        // Validación directa en el input
        quantityInput.addEventListener('input', () => {
            let currentValue = parseInt(quantityInput.value, 10) || 0;
            if (currentValue < 0) quantityInput.value = 0;
            else if (currentValue > 3) quantityInput.value = 3;
            updateTotal();
        });
    });

    // Inicializar el estado del botón al cargar la página
    updateTotal();

    // Paginación
    const pages = document.querySelectorAll('.product-list');
    const leftArrow = document.querySelector('.page-arrow-left');
    const rightArrow = document.querySelector('.page-arrow-right');

    // Función para actualizar la página activa
    function updatePage(newPage) {
        pages.forEach((page, index) => {
            page.classList.toggle('active', index === newPage - 1);
            page.classList.toggle('hidden', index !== newPage - 1);
        });
        pageNumber.textContent = newPage;
        currentPage = newPage;
        updateArrows();
    }

    // Función para actualizar las flechas de la paginación
    function updateArrows() {
        leftArrow.style.pointerEvents = currentPage === 1 ? 'none' : 'auto';
        rightArrow.style.pointerEvents = currentPage === pages.length ? 'none' : 'auto';
    }

    // Eventos de las flechas
    leftArrow.addEventListener('click', () => {
        if (currentPage > 1) updatePage(currentPage - 1);
    });

    rightArrow.addEventListener('click', () => {
        if (currentPage < pages.length) updatePage(currentPage + 1);
    });

    // Inicializar la paginación
    updateArrows();

    // Pop-up de login (modificado a popup-login)
    const popupLogin = document.querySelector('.popup-login');
    const closeButton = document.querySelector('.close-button');

    // Mostrar el pop-up al hacer clic en "Comprar"
    buyButton.addEventListener('click', () => {
        popupLogin.classList.remove('hidden');
    });

    // Ocultar el pop-up al hacer clic en el botón de cerrar
    closeButton.addEventListener('click', () => {
        popupLogin.classList.add('hidden');
    });

    // Ocultar el pop-up al hacer clic fuera del contenido
    popupLogin.addEventListener('click', (event) => {
        if (event.target === popupLogin) {
            popupLogin.classList.add('hidden');
        }
    });
});


