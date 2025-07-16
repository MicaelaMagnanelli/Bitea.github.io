// popup-script.js

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup-personalizado-c3");
    const abrirPopup = document.getElementById("abrir-popup-personalizado-c3");
    const cerrarPopup = document.getElementById("cerrar-popup-personalizado-c3");
    const continuar = document.getElementById("continuar-personalizado-c3");
    const tituloPopup = document.getElementById("titulo-popup-personalizado-c3");
    const subtituloPopup = document.getElementById("subtitulo-popup-personalizado-c3");
    const imagenCupcake = document.getElementById("imagen-cupcake-personalizado-c3");
    const indicadores = document.querySelectorAll(".indicador span");
    const cupcakeListContainer = document.getElementById("cupcake-preview-list");
    const getCurrentLanguage = () => localStorage.getItem('language') || 'es';

    const getTranslation = (key, lang) => {
        if (!window.translations || !translations[lang]) return key;
        return translations[lang][key] || key;
    };

    if (!abrirPopup || !popup || !cupcakeListContainer) {
        console.error("Elementos críticos no encontrados en el DOM:", {
            abrirPopup: !!abrirPopup,
            popup: !!popup,
            cupcakeListContainer: !!cupcakeListContainer
        });
        return;
    }

    let etapaActual = 0;
    let cupcakeCount = 0;
    const maxCupcakes = 2;
    const eleccionesUsuario = [];

    const etapas = [
        {
            titulo: 'popup-title',
            subtitulo: 'subtitulo-0',
            imagen: 'Imagenes/Personalizado/Frosting (CUPCAKE - PERSONALIZADO).png',
            opciones: [
                'frosting-manzanas-asadas',
                'frosting-limon',
                'ganash-chocolate-amargo',
                'frosting-queso-caramelo',
                'cobertura-chocolate-ddl',
                'crema-helada',
                'frosting-pistacho',
                'frosting-banana-caramelo',
                'frosting-caramelo-sal-pretzel',
                'frosting-flynn',
                'frosting-cookies-cream',
                'frosting-cereales'
            ],
            id: "opciones-frosting-personalizado-c3"
        },
        {
            titulo: 'popup-title',
            subtitulo: 'subtitulo-1',
            imagen: 'Imagenes/Personalizado/Relleno (CUPCAKE - PERSONALIZADO).png',
            opciones: [
                'manzanas-caramelo',
                'crema-limon-merengue',
                'crema-cacao',
                'ddl-bitea',
                'crema-helada-relleno',
                'pistacho-nuez',
                'banana-caramelo',
                'flynn-bite-relleno',
                'cream-cookies',
                'caramelo-pretzel',
                'cereales-relleno'
            ],
            id: "opciones-relleno-personalizado-c3"
        },
        {
            titulo: 'popup-title',
            subtitulo: 'subtitulo-2',
            imagen: 'Imagenes/Personalizado/Masa (CUPCAKES - PERSONALIZADO).png',
            opciones: [
                'chocolate',
                'vainilla',
                'marmolada',
                'red-velvet'
            ],
            id: "opciones-masa-personalizado-c3"
        }
    ];

    function habilitarContinuar() {
        const opcionSeleccionada = document.querySelector(`#${etapas[etapaActual].id} input:checked`);
        continuar.disabled = !opcionSeleccionada;
        console.log("Estado del botón Continuar:", !opcionSeleccionada ? "Deshabilitado" : "Habilitado");
    }

    function manejarSeleccion(event, categoria) {
        document.querySelectorAll(`#${categoria} input[type="checkbox"]`).forEach(opcion => {
            if (opcion !== event.target) {
                opcion.checked = false;
            }
        });
        habilitarContinuar();
    }

    function continuarHandler() {
        const opcionSeleccionada = document.querySelector(`#${etapas[etapaActual].id} input:checked`);
        if (opcionSeleccionada) {
            eleccionesUsuario[etapaActual] = opcionSeleccionada.nextSibling.textContent.trim();
            console.log(`Opción seleccionada en etapa ${etapaActual}: ${eleccionesUsuario[etapaActual]}`);
        } else {
            console.warn("No se seleccionó ninguna opción en la etapa actual");
        }

        if (etapaActual < etapas.length - 1) {
            etapaActual++;
            actualizarContenido();
        } else {
            console.log("Finalizando personalización, agregando cupcake...");
            agregarCupcakePersonalizado();
            cerrarPopupHandler();
        }
    }

    function mostrarPopup() {
        popup.classList.add("active");
        actualizarContenido();
        console.log("Popup abierto");
    }

    function cerrarPopupHandler() {
        popup.classList.remove("active");
        etapaActual = 0;
        eleccionesUsuario.length = 0;
        actualizarContenido();
        console.log("Popup cerrado, estado reiniciado");
    }

    function actualizarContenido() {
        const etapa = etapas[etapaActual];
        const lang = getCurrentLanguage();

        tituloPopup.textContent = getTranslation(etapa.titulo, lang);
        subtituloPopup.textContent = getTranslation(etapa.subtitulo, lang);
        imagenCupcake.src = etapa.imagen;

        document.querySelectorAll("ul[id^='opciones-']").forEach(ul => {
            ul.style.display = "none";
        });

        const listaOpciones = document.querySelector(`#${etapa.id}`);
        if (!listaOpciones) {
            console.error(`Lista de opciones #${etapa.id} no encontrada`);
            return;
        }

        listaOpciones.style.display = "block";
        listaOpciones.innerHTML = etapa.opciones
            .map(opcion => {
                const translatedOption = getTranslation(opcion, lang);
                return `<li><input type="checkbox" value="${opcion}"> ${translatedOption}</li>`;
            })
            .join("");

        listaOpciones.querySelectorAll("input").forEach(input => {
            input.addEventListener("change", event => manejarSeleccion(event, etapa.id));
        });

        indicadores.forEach((indicador, index) => {
            indicador.classList.toggle("active", index === etapaActual);
        });

        habilitarContinuar();
        console.log("Contenido actualizado para etapa:", etapaActual);
    }

    function agregarCupcakePersonalizado() {
        if (cupcakeCount >= maxCupcakes) {
            console.warn("Límite máximo de cupcakes alcanzado");
            return;
        }

        cupcakeCount++;
        const cupcakeHTML = `
            <div class="product-item cupcake-item new-cupcake-item">
                <img src="Imagenes/Personalizado/Cupcake con logo.png" alt="Cupcake Personalizado">
                <span class="cupcake-personalizado" id="cupcake-personalizado-${cupcakeCount}">
                    Cupcake Personalizado
                </span>
            </div>
        `;

        // Insertamos el HTML
        cupcakeListContainer.insertAdjacentHTML("beforeend", cupcakeHTML);
        console.log(`Cupcake ${cupcakeCount} agregado al contenedor #cupcake-preview-list`);

        // Seleccionamos el elemento recién creado
        const nuevoCupcake = cupcakeListContainer.lastElementChild;

        // Función que aplica o limpia el desplazamiento
        function aplicarCorrimiento() {
            const allCupcakes = cupcakeListContainer.querySelectorAll(".cupcake-item");
            if (window.innerWidth <= 780) {
                if (cupcakeCount === 1) {
                    // Primer cupcake: -500px a la izquierda
                    nuevoCupcake.style.position = 'relative';
                    nuevoCupcake.style.left = '-500px';
                    console.log(`Cupcake ${cupcakeCount} desplazado: left: -500px`);
                } else if (cupcakeCount === 2) {
                    // Segundo cupcake agregado: mover ambos a la derecha (500px)
                    allCupcakes.forEach((cupcake, index) => {
                        cupcake.style.position = 'relative';
                        cupcake.style.left = '00px';
                        console.log(`Cupcake ${index + 1} desplazado: left: 00px`);
                    });
                }
            } else {
                // En pantallas grandes, limpiar el desplazamiento
                allCupcakes.forEach((cupcake, index) => {
                    cupcake.style.left = '';
                    console.log(`Cupcake ${index + 1} desplazamiento limpiado en pantalla grande`);
                });
            }
        }

        // Aplicamos inmediatamente y agregamos el listener para redimensionar
        aplicarCorrimiento();
        window.addEventListener('resize', aplicarCorrimiento);

        // Traducción si no es español
        const currentLang = getCurrentLanguage();
        if (currentLang !== "es") {
            const span = document.getElementById(`cupcake-personalizado-${cupcakeCount}`);
            if (span && window.translations && window.translations[currentLang]) {
                span.textContent = window.translations[currentLang]["cupcake-personalizado"];
            }
        }

        actualizarEstadoBotones();
    }

    function actualizarEstadoBotones() {
        const agregarButton = document.getElementById("abrir-popup-personalizado-c3");
        const buyButton = document.getElementById("buy-button");

        if (agregarButton) {
            agregarButton.style.display = cupcakeCount >= maxCupcakes ? "none" : "block";
        }
        if (buyButton) {
            buyButton.disabled = cupcakeCount < maxCupcakes;
            buyButton.removeEventListener("click", handleBuyButtonClick);
            buyButton.addEventListener("click", handleBuyButtonClick);
        }
        console.log(`Estado botones actualizado: agregarButton=${agregarButton ? agregarButton.style.display : 'no existe'}, buyButton=${buyButton ? (buyButton.disabled ? 'deshabilitado' : 'habilitado') : 'no existe'}`);
    }

    function handleBuyButtonClick() {
        const popupLogin = document.getElementById("popup-login");
        if (popupLogin) {
            popupLogin.classList.remove("hidden");
            console.log("Popup de login abierto");
        } else {
            console.error("Popup de login no encontrado");
        }
    }

    const popupLogin = document.getElementById('popup-login');
    const closeLoginButton = document.querySelector('#popup-login .close-button');

    if (closeLoginButton) {
        closeLoginButton.addEventListener('click', () => {
            popupLogin.classList.add('hidden');
            console.log("Popup de login cerrado");
        });
    }

    if (popupLogin) {
        popupLogin.addEventListener('click', (e) => {
            if (e.target === popupLogin) {
                popupLogin.classList.add('hidden');
                console.log("Popup de login cerrado al hacer clic fuera");
            }
        });
    }

    abrirPopup.addEventListener("click", mostrarPopup);
    cerrarPopup.addEventListener("click", cerrarPopupHandler);
    continuar.addEventListener("click", continuarHandler);

    console.log("Script inicializado, esperando interacción del usuario");
});