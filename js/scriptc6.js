// CAJA 6
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
            page1.classList.remove('hidden');
            page2.classList.add('hidden');
            pageNumber.textContent = '1';
        } else {
            page1.classList.add('hidden');
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
    changePage(1);

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

        // Habilitar el botón "Comprar" solo si el total es 6
        if (total === 6) {
            buyButton.disabled = false;
        } else {
            buyButton.disabled = true;
        }
    }

    // Función para incrementar el valor
    counters.forEach(counter => {
        const btnIncrease = counter.querySelector('.btn-increase');
        const btnDecrease = counter.querySelector('.btn-decrease');
        const quantityInput = counter.querySelector('.quantity');

        // Incrementar cantidad
        btnIncrease.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value, 10);
            if (isNaN(currentValue)) currentValue = 0;
            if (currentValue < 6) {  // Cambié de 3 a 6
                quantityInput.value = currentValue + 1;
                updateTotal();  // Actualizar el total después de cada cambio
            }
        });

        // Decrementar cantidad
        btnDecrease.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value, 10);
            if (isNaN(currentValue)) currentValue = 0;
            if (currentValue > 0) { 
                quantityInput.value = currentValue - 1;
                updateTotal();  // Actualizar el total después de cada cambio
            }
        });

        // Validación directa en el input
        quantityInput.addEventListener('input', () => {
            let currentValue = parseInt(quantityInput.value, 10);
            if (isNaN(currentValue) || currentValue < 0) {
                quantityInput.value = 0;
            } else if (currentValue > 6) {  // Cambié de 3 a 6
                quantityInput.value = 6;
            }
            updateTotal();  // Actualizar el total después de cada cambio
        });
    });

    // Inicializar el estado del botón al cargar la página
    updateTotal();
});


// PAGINAS
const pages = document.querySelectorAll('.product-list'); // Selecciona las páginas
const pageNumber = document.querySelector('.page-number'); // El número de página
const leftArrow = document.querySelector('.page-arrow-left'); // Flecha izquierda
const rightArrow = document.querySelector('.page-arrow-right'); // Flecha derecha
let currentPage = 1; // Página actual

// Función para actualizar la página activa
function updatePage(newPage) {
    pages.forEach((page, index) => {
        if (index === newPage - 1) {
            page.classList.add('active'); // Muestra la página activa
            page.classList.remove('hidden');
        } else {
            page.classList.remove('active'); // Oculta las otras páginas
            page.classList.add('hidden');
        }
    });
    pageNumber.textContent = newPage; // Actualiza el número de la página
    currentPage = newPage; // Actualiza la página actual
    updateArrows(); // Actualiza las flechas
}

// Función para actualizar las flechas de la paginación
function updateArrows() {
    leftArrow.style.pointerEvents = currentPage === 1 ? 'none' : 'auto'; // Desactiva la flecha izquierda en la página 1
    rightArrow.style.pointerEvents = currentPage === pages.length ? 'none' : 'auto'; // Desactiva la flecha derecha en la última página
}

// Añadir los eventos para las flechas
leftArrow.addEventListener('click', () => {
    if (currentPage > 1) {
        updatePage(currentPage - 1);
    }
});

rightArrow.addEventListener('click', () => {
    if (currentPage < pages.length) {
        updatePage(currentPage + 1);
    }
});

// Inicializa la paginación
updateArrows();


// POP UP

document.addEventListener('DOMContentLoaded', () => {
    const buyButton = document.querySelector('#buy-button'); // Botón "Comprar"
    const popupLogin = document.querySelector('.popup-login'); // Cambié de 'popup' a 'popup-login'
    const closeButton = document.querySelector('.close-button');

    // Mostrar el pop-up al hacer clic en "Comprar"
    buyButton.addEventListener('click', () => {
        popupLogin.classList.remove('hidden');
    });

    // Ocultar el pop-up al hacer clic en el botón de cerrar
    closeButton.addEventListener('click', () => {
        popupLogin.classList.add('hidden');
    });

    // Opcional: Ocultar el pop-up al hacer clic fuera del contenido
    popupLogin.addEventListener('click', (event) => {
        if (event.target === popupLogin) {
            popupLogin.classList.add('hidden');
        }
    });
});
