// Seleccionar el botón y la imagen del ícono
const favoriteButton = document.getElementById("favoriteButton");
const heartIcon = document.getElementById("heartIcon");

// Bandera para controlar el estado (si es favorito o no)
let isFavorited = false;

// Evento al hacer clic en el botón
favoriteButton.addEventListener("click", () => {
  const lang = localStorage.getItem("language") || "es"; // Idioma actual

  isFavorited = !isFavorited;

  const iconSrc = isFavorited
    ? "Imagenes/Sabores/Favorito/Corazón negro relleno.png"
    : "Imagenes/Sabores/Favorito/Ícono Favoritos.png";

  const labelText = isFavorited
    ? translations[lang]["favorito-label"]
    : translations[lang]["agregar-favorito-label"];

  favoriteButton.innerHTML = `
    <img id="heartIcon" src="${iconSrc}" alt="${labelText}" /> ${labelText}
  `;
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




