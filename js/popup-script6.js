document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup-personalizado-c3");
    const abrirPopup = document.getElementById("abrir-popup-personalizado-c3");
    const cerrarPopup = document.getElementById("cerrar-popup-personalizado-c3");
    const continuar = document.getElementById("continuar-personalizado-c3");
    const tituloPopup = document.getElementById("titulo-popup-personalizado-c3");
    const subtituloPopup = document.getElementById("subtitulo-popup-personalizado-c3");
    const imagenCupcake = document.getElementById("imagen-cupcake-personalizado-c3");
    const indicadores = document.querySelectorAll(".indicador span");

    let etapaActual = 0;
    let cupcakeCount = 0;
    const maxCupcakes = 5; // Cambié el máximo a 5

    const etapas = [
        {
            titulo: "Armá tu cupcake",
            subtitulo: "Eligí tu Frosting",
            imagen: "Imagenes/Personalizado/Frosting (CUPCAKE - PERSONALIZADO).png",
            opciones: [
                "Frosting de manzanas asadas",
                "Frosting de limón",
                "Ganash de chocolate amargo",
                "Frosting de queso y caramelo",
                "Cobertura de chocolate y DDL",
                "Crema helada",
                "Frosting de pistacho",
                "Frosting de banana y caramelo",
                "Frosting de caramelo, sal y pretzel",
                "Frosting Flynn",
                "Frosting de cookies and cream",
                "Frosting cereales"
            ],
            id: "opciones-frosting-personalizado-c3"
        },
        {
            titulo: "Armá tu cupcake",
            subtitulo: "Eligí tu Relleno",
            imagen: "Imagenes/Personalizado/Relleno (CUPCAKE - PERSONALIZADO).png",
            opciones: [
                "Manzanas y caramelo",
                "Crema de limón y merengue",
                "Crema de cacao",
                "DDL Bitea",
                "Crema Helada",
                "Pistacho y nuez",
                "Banana y caramelo",
                "Flynn Bite",
                "Cream and cookies",
                "Caramelo y pretzel",
                "Cereales"
            ],
            id: "opciones-relleno-personalizado-c3"
        },
        {
            titulo: "Armá tu cupcake",
            subtitulo: "Eligí tu Masa",
            imagen: "Imagenes/Personalizado/Masa (CUPCAKES - PERSONALIZADO).png",
            opciones: [
                "Chocolate",
                "Vainilla",
                "Marmolada",
                "Red Velvet"
            ],
            id: "opciones-masa-personalizado-c3"
        }
    ];

    const habilitarContinuar = () => {
        const opcionSeleccionada = document.querySelector(`#${etapas[etapaActual].id} input:checked`);
        continuar.disabled = !opcionSeleccionada;
    };

    const manejarSeleccion = (event, categoria) => {
        const opcionesDelGrupo = document.querySelectorAll(`#${categoria} input[type="checkbox"]`);
        opcionesDelGrupo.forEach(opcion => {
            if (opcion !== event.target) {
                opcion.checked = false;
            }
        });
        habilitarContinuar();
    };

    const continuarHandler = () => {
        if (etapaActual < etapas.length - 1) {
            etapaActual++;
            actualizarContenido();
        } else {
            agregarCupcakePersonalizado();
            cerrarPopupHandler();
        }
    };

    const mostrarPopup = () => {
        popup.classList.add("active");
        actualizarContenido();
    };

    const cerrarPopupHandler = () => {
        popup.classList.remove("active");
        etapaActual = 0;
        actualizarContenido();
    };

    const actualizarContenido = () => {
        const etapa = etapas[etapaActual];
        tituloPopup.textContent = etapa.titulo;
        subtituloPopup.textContent = etapa.subtitulo;
        imagenCupcake.src = etapa.imagen;

        document.querySelectorAll("ul[id^='opciones-']").forEach((ul) => {
            ul.style.display = "none";
        });

        const listaOpciones = document.querySelector(`#${etapa.id}`);
        listaOpciones.style.display = "block";
        listaOpciones.innerHTML = etapa.opciones
            .map(opcion => `<li><input type="checkbox"> ${opcion}</li>`)
            .join('');

        habilitarContinuar();
        listaOpciones.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', (event) => {
                manejarSeleccion(event, etapa.id);
            });
        });

        indicadores.forEach((indicador, index) => {
            indicador.classList.toggle('active', index === etapaActual);
        });
    };

    abrirPopup.addEventListener("click", mostrarPopup);
    cerrarPopup.addEventListener("click", cerrarPopupHandler);
    continuar.addEventListener("click", continuarHandler);

    const cupcakeItemsContainer = document.querySelector(".selection-area");

    function agregarCupcakePersonalizado() {
        if (cupcakeCount < maxCupcakes) {
            cupcakeCount++;
            actualizarVistaCupcakes();
        }
    }

    function actualizarVistaCupcakes() {
        const cupcakesHtml = Array.from({ length: cupcakeCount }, (_, index) => {
            let top, left;
    
            if (window.innerWidth <= 414) {
                top = 500 + index * 60;
                left = 0;
            } else if (window.innerWidth <= 820) {
                top = 880 + index * 105;
                left = 70;
            } else if (window.innerWidth <= 1024) {
                top = 300 + index * 50;
                left = 600;
            } else {
                top = 200 + index * 50;
                left = 1300;
            }
    
            return `
                <div class="product-item cupcake-item" 
                     style="position: absolute; left: ${left}px; top: ${top}px;" 
                     draggable="true" 
                     ondragstart="event.dataTransfer.setData('text/plain', null);">
                    <img src="Imagenes/Personalizado/Cupcake con logo.png" alt="Cupcake Personalizado">
                    <span class="cupcake-personalizado">Cupcake Personalizado</span>
                </div>
            `;
        }).join('');
    
        cupcakeItemsContainer.innerHTML = `
            <h2 class="title">Seleccioná 6 sabores</h2>
            <button class="buy-button" id="buy-button" ${cupcakeCount === maxCupcakes ? '' : 'disabled'}>Comprar</button>
            ${cupcakesHtml}
        `;
    
        const agregarButton = document.getElementById("abrir-popup-personalizado-c3");
    
        if (window.innerWidth <= 414) {
            agregarButton.style.position = "absolute";
            agregarButton.style.left = "-100px";
            agregarButton.style.top = `${430 + cupcakeCount * 60 + 30}px`;
        } else if (window.innerWidth <= 820) {
            agregarButton.style.position = "absolute";
            agregarButton.style.left = "100px";
            agregarButton.style.top = `${850 + cupcakeCount * 80 + 30}px`;
        } else if (window.innerWidth <= 1024) {
            agregarButton.style.position = "absolute";
            agregarButton.style.left = "600px";
        } else {
            agregarButton.style.position = "absolute";
            agregarButton.style.left = "1300px";
            agregarButton.style.top = `${200 + cupcakeCount * 50 + 30}px`;
        }
    
        agregarButton.style.display = cupcakeCount >= maxCupcakes ? "none" : "block";
    
        // Mover el footer dinámicamente en pantallas pequeñas
        const footer = document.querySelector("footer");
        if (window.innerWidth <= 414 || window.innerWidth <= 820) {
            footer.style.position = "absolute";
            footer.style.width = "100%";
            footer.style.left = "0";
            footer.style.top = `${Math.max(agregarButton.offsetTop + 150, window.innerHeight - 50)}px`;
        }
    
        if (cupcakeCount === maxCupcakes) {
            footer.style.top = `${parseInt(footer.style.top) + 50}px`; // Ajuste adicional en el último cupcake
        }
    
        const buyButton = document.getElementById("buy-button");
        buyButton.addEventListener("click", () => {
            const popupLogin = document.getElementById("popup-login");
            popupLogin.classList.remove("hidden");
        });
    }
    
    
});

// CERARR POP UP LOG IN 

document.addEventListener("DOMContentLoaded", () => {
    const popupLogin = document.getElementById("popup-login");
    const closeButton = document.querySelector(".popup-login .close-button");

    // Función para cerrar el popup
    const cerrarPopupLogin = () => {
        popupLogin.classList.add("hidden");
    };

    // Evento para cerrar el popup cuando se haga clic en el botón de cerrar
    closeButton.addEventListener("click", cerrarPopupLogin);
});



