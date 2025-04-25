// carrito.js
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'es';
}

function getTranslation(key, lang) {
    if (!window.translations || !translations[lang]) return key;
    return translations[lang][key] || key;
}

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function mostrarCarrito() {
    console.log('mostrarCarrito ejecutado'); // Para depuración
    // Cerrar el menú hamburguesa si está abierto
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    if (navMenu && navMenu.classList.contains('menu-open')) {
        navMenu.classList.remove('menu-open');
        hamburger.classList.remove('active');
    }

    const carrito = obtenerCarrito();
    const contenidoCarrito = document.getElementById('contenido-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const lang = getCurrentLanguage();

    contenidoCarrito.innerHTML = '';
    totalCarrito.innerHTML = '';

    if (carrito.length === 0) {
        contenidoCarrito.innerHTML = `<p>${getTranslation('carrito-vacio', lang)}</p>`;
    } else {
        let total = 0;
        carrito.forEach(producto => {
            const productoHTML = `
                <div class="producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
                    <div class="detalles-producto">
                        <p class="nombre-producto"><strong>${producto.nombre}</strong></p>
                        <div class="cantidad-precio">
                            <button class="btn-cantidad" onclick="modificarCantidad('${producto.nombre}', '${producto.imagen}', -1)">-</button>
                            <span class="cantidad">${producto.cantidad}</span>
                            <button class="btn-cantidad" onclick="modificarCantidad('${producto.nombre}', '${producto.imagen}', 1)">+</button>
                            <span class="precio">$${(producto.precio * producto.cantidad).toLocaleString('es-CL')}</span>
                        </div>
                    </div>
                    <img src="Imagenes/Menu/Ícono Basurero sin fondo.png" alt="Eliminar producto" class="icono-eliminar" onclick="eliminarProducto('${producto.nombre}', '${producto.imagen}')">
                </div>
            `;
            contenidoCarrito.innerHTML += productoHTML;
            total += producto.precio * producto.cantidad;
        });
        totalCarrito.innerHTML = `
            <div class="total">
                <p>${getTranslation('total-label', lang)}</p>
                <p>$${total.toLocaleString('es-CL')}</p>
            </div>
        `;
    }

    const modal = document.getElementById('modal-carrito');
    modal.classList.add('active');
    modal.style.display = 'block';
}

function cerrarCarrito() {
    const modal = document.getElementById('modal-carrito');
    modal.classList.remove('active');
    modal.style.display = 'none';
}

function modificarCantidad(nombre, imagen, cantidad) {
    let carrito = obtenerCarrito();
    const producto = carrito.find(p => p.nombre === nombre && p.imagen === imagen);
    if (producto) {
        producto.cantidad += cantidad;
        if (producto.cantidad <= 0) {
            carrito = carrito.filter(p => p.nombre !== nombre || p.imagen !== imagen);
        }
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function irACaja() {
    window.location.href = 'caja.html';
}

function vaciarCarrito() {
    localStorage.removeItem('carrito');
    mostrarCarrito();
}

function eliminarProducto(nombre, imagen) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(producto => producto.nombre !== nombre || producto.imagen !== imagen);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function agregarAlCarrito(producto) {
    let carrito = obtenerCarrito();
    const productoExistente = carrito.find(p => p.nombre === producto.nombre && p.imagen === producto.imagen);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    mostrarCarrito();
}

function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const cantidadProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    const contadorCarrito = document.getElementById('contador-carrito');
    if (contadorCarrito) {
        contadorCarrito.textContent = cantidadProductos;
    }
}

function agregarAlCarritoYRedirigir(nombre, precio, imagen, pagina) {
    let carrito = obtenerCarrito();
    const producto = {
        nombre: nombre,
        precio: precio,
        cantidad: 1,
        imagen: imagen
    };
    const productoExistente = carrito.find(p => p.nombre === nombre && p.imagen === imagen);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push(producto);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    window.location.href = pagina;
}

document.addEventListener('DOMContentLoaded', () => {
    // Asegurar que el modal esté cerrado al cargar la página
    const modal = document.getElementById('modal-carrito');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
    }

    actualizarContadorCarrito();
    const carritoLink = document.querySelector('.icon-container a[onclick="mostrarCarrito()"]');
    if (carritoLink) {
        carritoLink.addEventListener('click', (e) => {
            e.preventDefault();
            mostrarCarrito();
        });
        carritoLink.addEventListener('touchstart', (e) => {
            e.preventDefault();
            mostrarCarrito();
        });
    }
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const newLang = btn.dataset.lang;
            localStorage.setItem('language', newLang);
            // No abrir el carrito automáticamente
            console.log(`Idioma cambiado a ${newLang}`);
        });
    });
});