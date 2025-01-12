// Seleccionar el botón y la imagen del ícono
const favoriteButton = document.getElementById("favoriteButton");
const heartIcon = document.getElementById("heartIcon");

// Bandera para controlar el estado (si es favorito o no)
let isFavorited = false;

// Evento al hacer clic en el botón
favoriteButton.addEventListener("click", () => {
  if (isFavorited) {
    // Cambiar a la imagen del corazón vacío
    heartIcon.src = "Imagenes/Sabores/Favorito/Ícono Favoritos.png";
    favoriteButton.innerHTML = `<img id="heartIcon" src="Imagenes/Sabores/Favorito/Ícono Favoritos.png" alt="Agregar a Favorito" /> Agregar a favorito`;
  } else {
    // Cambiar a la imagen del corazón lleno
    heartIcon.src = "Imagenes/Sabores/Favorito/Corazón negro relleno.png";
    favoriteButton.innerHTML = `<img id="heartIcon" src="Imagenes/Sabores/Favorito/Corazón negro relleno.png" alt="Quitar de Favorito" /> Favorito`;
  }
  isFavorited = !isFavorited; // Cambiar el estado
});

// ETIQUETA NUTRICIONAL E INGREDIENTES
function toggleAccordion(button) {
    const content = button.nextElementSibling;
    const arrow = button.querySelector(".arrow");
    const isActive = button.classList.contains("active");
  
    // Cerrar otros elementos (opcional)
    document.querySelectorAll(".accordion-header").forEach((item) => {
      if (item !== button) {
        item.classList.remove("active");
        item.nextElementSibling.style.maxHeight = null;
        const otherArrow = item.querySelector(".arrow");
        if (otherArrow) {
          otherArrow.src = "Imagenes/Flechas/Flecha.png"; // Flecha hacia abajo
        }
      }
    });
  
    if (isActive) {
      // Si está activo, lo cerramos
      button.classList.remove("active");
      content.style.maxHeight = null;
      arrow.src = "Imagenes/Flechas/Flecha.png"; // Flecha hacia abajo
    } else {
      // Si no está activo, lo abrimos
      button.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
      arrow.src = "Imagenes/Flechas/ Flecha (arriba).png"; // Flecha hacia arriba
    }
  
    // Depuración
    console.log("Estado del botón:", isActive ? "Cerrado" : "Abierto");
    console.log("Ruta actual de la flecha:", arrow.src);
  }
  
  


