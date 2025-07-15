document.addEventListener('DOMContentLoaded', () => {
    // === Funciones de traducción ===
    const getCurrentLanguage = () => localStorage.getItem('language') || 'es';
    const getTranslation = (key, lang) => {
        if (!window.translations || !translations[lang]) return key;
        return translations[lang][key] || key;
    };

    // === Personalización de Cupcake ===
    const abrirPopup = document.querySelector('#abrir-popup');
    const abrirPopupPersonalizado = document.querySelector('#abrir-popup-personalizado');
    const popup = document.querySelector('#popup');
    const cerrarPopup = document.querySelector('#cerrar-popup');
    const continuar = document.querySelector('#continue-btn');
    const indicadores = document.querySelectorAll('.indicador span');
    const tituloPopup = document.querySelector('#titulo-popup');
    const subtituloPopup = document.querySelector('#subtitulo-popup');
    const imagenCupcake = document.querySelector('#imagen-cupcake');

    // Estados actuales del pop-up
    let etapaActual = 0;

    // Datos para cada etapa de personalización (usando claves de traducción)
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
            id: 'opciones-frosting'
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
            id: 'opciones-relleno'
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
            id: 'opciones-masa'
        }
    ];

    // Función para habilitar/deshabilitar el botón de continuar
    const habilitarContinuar = () => {
        if (continuar) {
            const opcionSeleccionada = document.querySelector(`#${etapas[etapaActual].id} input:checked`);
            continuar.disabled = !opcionSeleccionada;
        }
    };

    // Función para manejar la selección y asegurar solo una opción seleccionada
    const manejarSeleccion = (event, categoria) => {
        const opcionesDelGrupo = document.querySelectorAll(`#${categoria} input[type="checkbox"]`);
        opcionesDelGrupo.forEach(opcion => {
            if (opcion !== event.target) {
                opcion.checked = false;
            }
        });
        habilitarContinuar();
    };

    // Función para avanzar al siguiente paso
    const continuarHandler = () => {
        if (etapaActual < etapas.length - 1) {
            etapaActual++;
            actualizarContenido();
        } else {
            const lang = getCurrentLanguage();
            window.location.href = 'Cajaspersonalizar.html';
            alert(getTranslation('alert-biteas-listos', lang));
            cerrarPopupHandler();
        }
    };

    // Función para mostrar el pop-up
    const mostrarPopup = (event) => {
        event.preventDefault();
        if (popup) {
            popup.classList.add('active');
            actualizarContenido();
        }
    };

    // Función para cerrar el pop-up
    const cerrarPopupHandler = () => {
        if (popup) {
            popup.classList.remove('active');
            etapaActual = 0;
            actualizarContenido();
        }
    };

    // Función para actualizar contenido del pop-up
    const actualizarContenido = () => {
        if (!popup) return;
        const etapa = etapas[etapaActual];
        const lang = getCurrentLanguage();

        // Actualizar textos traducidos
        if (tituloPopup) tituloPopup.textContent = getTranslation(etapa.titulo, lang);
        if (subtituloPopup) subtituloPopup.textContent = getTranslation(etapa.subtitulo, lang);

        // Actualizar imagen
        if (imagenCupcake) imagenCupcake.src = etapa.imagen;

        // Mostrar solo las opciones de la etapa actual
        document.querySelectorAll("ul[id^='opciones-']").forEach((ul) => {
            ul.style.display = 'none';
        });

        const listaOpciones = document.querySelector(`#${etapa.id}`);
        if (listaOpciones) {
            listaOpciones.style.display = 'block';
            listaOpciones.innerHTML = etapa.opciones
                .map(opcion => {
                    const translatedOption = getTranslation(opcion, lang);
                    return `<li><input type="checkbox" value="${opcion}"> ${translatedOption}</li>`;
                })
                .join('');
        }

        habilitarContinuar();

        // Delegar eventos a checkboxes
        if (listaOpciones) {
            listaOpciones.querySelectorAll('input').forEach(input => {
                input.addEventListener('change', (event) => {
                    manejarSeleccion(event, etapa.id);
                });
            });
        }

        // Actualizar indicador visual
        indicadores.forEach((indicador, index) => {
            indicador.classList.toggle('active', index === etapaActual);
        });
    };

    // Asignar eventos
    if (abrirPopup) {
        abrirPopup.addEventListener('click', mostrarPopup);
    }
    if (abrirPopupPersonalizado) {
        abrirPopupPersonalizado.addEventListener('click', mostrarPopup);
    }
    if (cerrarPopup) {
        cerrarPopup.addEventListener('click', cerrarPopupHandler);
    }
    if (continuar) {
        continuar.addEventListener('click', continuarHandler);
    }

    // Cerrar popup al hacer clic fuera
    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                cerrarPopupHandler();
            }
        });
    }

    // Inicializar contenido si el popup está presente
    if (popup) {
        actualizarContenido();
    }

    // === Cambio de imagen en hover para personalización ===
    const cuadrado = document.querySelector('.cuadrado');
    const imagenPersonalizada = document.getElementById('img-personalizado');
    const imagenOriginal = 'Imagenes/Personalizado/C. Personalizae.png';
    const imagenHover = 'Imagenes/Personalizado/Cupcake con logo.png';

    if (cuadrado && imagenPersonalizada) {
        cuadrado.addEventListener('mouseenter', () => {
            imagenPersonalizada.src = imagenHover;
        });
        cuadrado.addEventListener('mouseleave', () => {
            imagenPersonalizada.src = imagenOriginal;
        });
    }


    // === Botones Keto y Gluten Free ===
    const btnKeto = document.getElementById('btnKeto');
    const btnGlutenFree = document.getElementById('btnGlutenFree');
    const imageDisplay = document.getElementById('imageDisplay');
    const indicator = document.getElementById('indicator');
    const title = document.getElementById('keto-title');
    const description = document.getElementById('keto-desc');

    const ketoImage = 'Imagenes/Keto y Gluten Free/15. C. KETO SIN FONDO.png';
    const glutenFreeImage = 'Imagenes/Keto y Gluten Free/14. C. GLUTEN FREE (SIN FONDO).png';

    // Estado para rastrear la opción activa
    let activeOption = 'keto'; // Por defecto, Keto está activo

    const updateContent = (buttonClicked) => {
        const lang = getCurrentLanguage();
        activeOption = buttonClicked; // Actualizar opción activa

        if (buttonClicked === 'keto') {
            if (imageDisplay) imageDisplay.src = ketoImage;
            if (title) title.textContent = getTranslation('keto-title', lang);
            if (description) description.textContent = getTranslation('keto-desc', lang);
            if (indicator) indicator.style.width = '50%';
        } else if (buttonClicked === 'glutenFree') {
            if (imageDisplay) imageDisplay.src = glutenFreeImage;
            if (title) title.textContent = 'Gluten Free'; // Título fijo, sin traducción
            if (description) description.textContent = getTranslation('keto-desc-gluten-free', lang);
            if (indicator) indicator.style.width = '100%';
        }

        if (btnKeto) btnKeto.classList.toggle('active', buttonClicked === 'keto');
        if (btnGlutenFree) btnGlutenFree.classList.toggle('active', buttonClicked === 'glutenFree');
    };

    // Inicializar contenido de Keto por defecto
    updateContent('keto');

    // Actualizar descripciones al cambiar idioma
    const updateDescriptions = (lang) => {
        if (title) {
            title.textContent = activeOption === 'keto' ? getTranslation('keto-title', lang) : 'Gluten Free';
        }
        if (description) {
            description.textContent = getTranslation(activeOption === 'keto' ? 'keto-desc' : 'keto-desc-gluten-free', lang);
        }
    };

    // Escuchar cambios de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const newLang = btn.dataset.lang;
            localStorage.setItem('language', newLang);
            updateDescriptions(newLang);
        });
    });

    if (btnKeto) {
        btnKeto.addEventListener('click', () => updateContent('keto'));
    }
    if (btnGlutenFree) {
        btnGlutenFree.addEventListener('click', () => updateContent('glutenFree'));
    }

    // === Eliminar indicadores del carrusel ===
    const observer = new MutationObserver(() => {
        const dots = document.querySelectorAll(".carousel .dots, .carousel .carousel-indicators");
        if (dots.length > 0) {
            dots.forEach(dot => dot.style.display = "none");
            observer.disconnect();
        }
    });

    const carousel = document.querySelector(".carousel");
    if (carousel) {
        observer.observe(carousel, { childList: true, subtree: true });
    }
});