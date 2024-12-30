// Función para mostrar el pop-up
function showLoginModal() {
    const popup = document.getElementById('popup');
    popup.classList.remove('hidden'); // Mostrar el pop-up
}

// Función para cerrar el pop-up
function closeLoginModal() {
    const popup = document.getElementById('popup');
    popup.classList.add('hidden'); // Ocultar el pop-up
}

// Agregar evento al botón de cierre
document.querySelector('.close-button').addEventListener('click', closeLoginModal);


// Cerrar el pop-up si el usuario hace clic fuera del área del contenido del pop-up
document.getElementById('popup').addEventListener('click', function(event) {
    // Verificar si el clic fue fuera del contenido del pop-up
    if (event.target === this) {
        closeLoginModal(); // Ocultar el pop-up
    }
});



