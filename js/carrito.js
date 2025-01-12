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

        // Mostrar el total
        totalCarrito.innerHTML = `
            <div class="total">
                <p>Total:</p>
                <p>$${total.toLocaleString('es-CL')}</p>
            </div>
        `;
    }

    // Mostrar la modal
    const modal = document.getElementById('modal-carrito');
    modal.style.display = 'block';
}

// Función para modificar la cantidad de un producto
function modificarCantidad(nombre, imagen, cantidad) {
    let carrito = obtenerCarrito();
    const producto = carrito.find(p => p.nombre === nombre && p.imagen === imagen); // Verificar por nombre e imagen
    if (producto) {
        producto.cantidad += cantidad;
        if (producto.cantidad <= 0) {
            carrito = carrito.filter(p => p.nombre !== nombre || p.imagen !== imagen); // Eliminar el producto si la cantidad es cero o menos
        }
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

// Función para ir a la página de caja (renombrada a "Finalizar compra")
function irACaja() {
    window.location.href = 'caja.html'; // Redirige a la página de caja
}

// Función para cerrar el carrito
function cerrarCarrito() {
    const modal = document.getElementById('modal-carrito');
    modal.style.display = 'none';
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    mostrarCarrito(); // Actualizar el modal después de vaciar el carrito
}

// Función para eliminar un producto del carrito
function eliminarProducto(nombre, imagen) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(producto => producto.nombre !== nombre || producto.imagen !== imagen); // Eliminar el producto con el nombre e imagen especificados
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar el carrito en localStorage
    mostrarCarrito(); // Actualizar el modal después de eliminar el producto
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    let carrito = obtenerCarrito();
    
    // Verificar si el producto ya existe en el carrito
    const productoExistente = carrito.find(p => p.nombre === producto.nombre && p.imagen === producto.imagen); // Agregar la verificación de imagen

    if (productoExistente) {
        productoExistente.cantidad += 1; // Si el producto ya existe, aumentamos la cantidad
    } else {
        producto.cantidad = 1; // Si no existe, lo agregamos con cantidad 1
        carrito.push(producto);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar el contador del carrito
    actualizarContadorCarrito();

    // Mostrar el carrito actualizado
    mostrarCarrito();
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
    const productoExistente = carrito.find(p => p.nombre === nombre && p.imagen === imagen); // Verificar por nombre e imagen

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
