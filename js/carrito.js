// carrito.js

// Función para obtener el carrito desde el localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

// Función para mostrar el carrito en el modal
function mostrarCarrito() {
    const carrito = obtenerCarrito();
    const contenidoCarrito = document.getElementById('contenido-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    
    // Limpiar el contenido actual
    contenidoCarrito.innerHTML = '';
    totalCarrito.innerHTML = '';

    if (carrito.length === 0) {
        contenidoCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
    } else {
        let total = 0;

        // Mostrar los productos en el carrito
        carrito.forEach(producto => {
            const productoHTML = `
                <div class="producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
                    <p>${producto.nombre}</p>
                    <p>$${producto.precio} x ${producto.cantidad}</p>
                    <p>Total: $${producto.precio * producto.cantidad}</p>
                    <button onclick="eliminarProducto('${producto.nombre}')">Eliminar</button>
                </div>
            `;
            contenidoCarrito.innerHTML += productoHTML;
            total += producto.precio * producto.cantidad;
        });

        // Mostrar el total
        totalCarrito.innerHTML = `<h3>Total: $${total}</h3>`;
    }

    // Mostrar la modal
    const modal = document.getElementById('modal-carrito');
    modal.style.display = 'block';
}

// Función para cerrar el carrito
function cerrarCarrito() {
    const modal = document.getElementById('modal-carrito');
    modal.style.display = 'none';
}

// Función para ir a la página de caja
function irACaja() {
    window.location.href = 'caja.html'; // Redirige a la página de caja
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    mostrarCarrito(); // Actualizar el modal después de vaciar el carrito
}

// Función para eliminar un producto del carrito
function eliminarProducto(nombre) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(producto => producto.nombre !== nombre); // Eliminar el producto con el nombre especificado
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar el carrito en localStorage
    mostrarCarrito(); // Actualizar el modal después de eliminar el producto
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    let carrito = obtenerCarrito();
    const productoExistente = carrito.find(p => p.nombre === producto.nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1; // Si el producto ya existe, aumentamos la cantidad
    } else {
        producto.cantidad = 1; // Si no existe, lo agregamos con cantidad 1
        carrito.push(producto);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito actualizado en localStorage
    actualizarContadorCarrito(); // Actualizar el contador del carrito
}

// Función para actualizar el contador del carrito en el ícono
function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const cantidadProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);

    const contadorCarrito = document.getElementById('contador-carrito');
    if (contadorCarrito) {
        contadorCarrito.textContent = cantidadProductos; // Actualiza el texto con la cantidad total de productos
    }
}

// Función para agregar un producto al carrito y redirigir a la página correspondiente
function agregarAlCarritoYRedirigir(nombre, precio, imagen, pagina) {
    let carrito = obtenerCarrito();
    
    // Crear el objeto del producto
    const producto = {
        nombre: nombre,
        precio: precio,
        cantidad: 1,
        imagen: imagen
    };

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1; // Si el producto ya existe, aumentamos la cantidad
    } else {
        carrito.push(producto); // Si no existe, lo agregamos al carrito
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar el contador del carrito
    actualizarContadorCarrito();

    // Redirigir a la página correspondiente
    window.location.href = pagina;
}

// Llamar a la función para mostrar el carrito cuando se cargue la página
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);
