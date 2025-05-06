// popup-script6.js

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
    const maxCupcakes = 5;

    const getCurrentLanguage = () => localStorage.getItem('language') || 'es';
    const getTranslation = (key, lang) => {
        if (!window.translations || !translations[lang]) return key;
        return translations[lang][key] || key;
    };

    const etapas = [
        {
            titulo: "popup-title",
            subtitulo: "subtitulo-0",
            imagen: "Imagenes/Personalizado/Frosting (CUPCAKE - PERSONALIZADO).png",
            opciones: ["frosting-manzanas-asadas", "frosting-limon", "ganash-chocolate-amargo", "frosting-queso-caramelo", "cobertura-chocolate-ddl", "crema-helada", "frosting-pistacho", "frosting-banana-caramelo", "frosting-caramelo-sal-pretzel", "frosting-flynn", "frosting-cookies-cream", "frosting-cereales"],
            id: "opciones-frosting-personalizado-c3"
        },
        {
            titulo: "popup-title",
            subtitulo: "subtitulo-1",
            imagen: "Imagenes/Personalizado/Relleno (CUPCAKE - PERSONALIZADO).png",
            opciones: ["manzanas-caramelo", "crema-limon-merengue", "crema-cacao", "ddl-bitea", "crema-helada-relleno", "pistacho-nuez", "banana-caramelo", "flynn-bite-relleno", "cream-cookies", "caramelo-pretzel", "cereales-relleno"],
            id: "opciones-relleno-personalizado-c3"
        },
        {
            titulo: "popup-title",
            subtitulo: "subtitulo-2",
            imagen: "Imagenes/Personalizado/Masa (CUPCAKES - PERSONALIZADO).png",
            opciones: ["chocolate", "vainilla", "marmolada", "red-velvet"],
            id: "opciones-masa-personalizado-c3"
        }
    ];

    const habilitarContinuar = () => {
        const opcionSeleccionada = document.querySelector(`#${etapas[etapaActual].id} input:checked`);
        continuar.disabled = !opcionSeleccionada;
    };

    const manejarSeleccion = (event, categoria) => {
        const opciones = document.querySelectorAll(`#${categoria} input[type="checkbox"]`);
        opciones.forEach(op => {
            if (op !== event.target) op.checked = false;
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
        const lang = getCurrentLanguage();

        tituloPopup.textContent = getTranslation(etapa.titulo, lang);
        subtituloPopup.textContent = getTranslation(etapa.subtitulo, lang);
        imagenCupcake.src = etapa.imagen;

        document.querySelectorAll("ul[id^='opciones-']").forEach(ul => ul.style.display = "none");

        const lista = document.getElementById(etapa.id);
        lista.style.display = "block";
        lista.innerHTML = etapa.opciones.map(op => `
            <li>
                <label>
                    <input type="checkbox" name="${etapa.id}" value="${op}">
                    ${getTranslation(op, lang)}
                </label>
            </li>
        `).join('');

        lista.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', (event) => manejarSeleccion(event, etapa.id));
        });

        indicadores.forEach((el, idx) => el.classList.toggle('active', idx === etapaActual));
        habilitarContinuar();
    };

    abrirPopup.addEventListener("click", mostrarPopup);
    cerrarPopup.addEventListener("click", cerrarPopupHandler);
    continuar.addEventListener("click", continuarHandler);

    const cupcakePreviewList = document.getElementById("cupcake-preview-list");

    function agregarCupcakePersonalizado() {
        if (cupcakeCount >= maxCupcakes) return;

        cupcakeCount++;
        const lang = getCurrentLanguage();
        const descripcion = getTranslation("cupcake-personalizado", lang);

        const nuevoCupcake = document.createElement("div");
        nuevoCupcake.className = "product-item cupcake-item new-cupcake-item";
        nuevoCupcake.innerHTML = `
            <img src="Imagenes/Personalizado/Frosting (CUPCAKE - PERSONALIZADO).png" alt="${descripcion}">
            <span class="cupcake-personalizado" id="cupcake-personalizado-${cupcakeCount}">${descripcion}</span>
        `;

        cupcakePreviewList.appendChild(nuevoCupcake);
        actualizarEstadoBotones();
    }

    function actualizarEstadoBotones() {
        const agregarBtn = document.getElementById("abrir-popup-personalizado-c3");
        const buyBtn = document.getElementById("buy-button");

        agregarBtn.style.display = cupcakeCount >= maxCupcakes ? "none" : "block";
        buyBtn.disabled = cupcakeCount < maxCupcakes;

        buyBtn.removeEventListener("click", handleBuyButtonClick);
        buyBtn.addEventListener("click", handleBuyButtonClick);
    }

    function handleBuyButtonClick() {
        const popupLogin = document.getElementById("popup-login");
        if (popupLogin) {
            popupLogin.classList.remove("hidden");
        } else {
            console.error("Popup de login #popup-login no encontrado");
        }
    }

    window.addEventListener("languageChange", () => {
        if (popup.classList.contains("active")) actualizarContenido();

        const lang = getCurrentLanguage();
        const cupcakes = cupcakePreviewList.querySelectorAll(".cupcake-personalizado");
        cupcakes.forEach(span => {
            span.textContent = getTranslation("cupcake-personalizado", lang);
        });
    });
});

// Cerrar popup de login
document.addEventListener("DOMContentLoaded", () => {
    const popupLogin = document.getElementById("popup-login");
    const closeButton = document.querySelector(".popup-login .close-button");
    if (closeButton) {
        closeButton.addEventListener("click", () => popupLogin.classList.add("hidden"));
    }
});
