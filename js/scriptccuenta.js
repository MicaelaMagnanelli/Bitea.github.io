function showLoginModal() {
    document.getElementById('popup-login').classList.remove('hidden');
}

const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', () => {
    document.getElementById('popup-login').classList.add('hidden');
});

// Agregar evento al enlace de iniciar sesión
document.querySelector('.login-link').addEventListener('click', showLoginModal);







