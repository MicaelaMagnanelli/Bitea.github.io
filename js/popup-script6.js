document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById('popup-personalizado-c3');
    const abrirPopup = document.getElementById('abrir-popup-personalizado-c3');
    const cerrarPopup = document.getElementById('cerrar-popup-personalizado-c3');
    const continuar = document.getElementById('continuar-personalizado-c3');
    const tituloPopup = document.getElementById('titulo-popup-personalizado-c3');
    const subtituloPopup = document.getElementById('subtitulo-popup-personalizado-c3');
    const imagenCupcake = document.getElementById('imagen-cupcake-personalizado-c3');
    const indicadores = document.querySelectorAll('.indicador span');

    let etapaActual = 0; // 0 = Frosting, 1 = Relleno, 2 = Masa

    const etapas = [
        {
            titulo: 'Crea tu cupcake',
            subtitulo: 'Elige tu Frosting',
            imagen: 'Imagenes/Personalizado/Frosting (CUPCAKE - PERSONALIZADO).png',
            opciones: [
                'Frosting de manzanas asadas',
                'Frosting de limón',
                'Ganash de chocolate amargo',
                'Frosting de queso y caramelo',
                'Cobertura de chocolate y DDL',
                'Crema helada',
                'Frosting de pistacho',
                'Frosting de banana y caramelo',
                'Frosting de caramelo, sal y pretzel',
                'Frosting Flynn',
                'Frosting de cookies and cream',
                'Frosting cereales'
            ],
            id: 'opciones-frosting-personalizado-c3'
        },
        {
            titulo: 'Crea tu cupcake',
            subtitulo: 'Elige tu Relleno',
            imagen: 'Imagenes/Personalizado/Relleno (CUPCAKE - PERSONALIZADO).png',
            opciones: [
                'Manzanas y caramelo',
                'Crema de limón y merengue',
                'Crema de cacao',
                'DDL Bitea',
                'Crema Helada',
                'Pistacho y nuez',
                'Banana y caramelo',
                'Flynn Bite',
                'Cream and cookies',
                'Caramelo y pretzel',
                'Cereales'
            ],
            id: 'opciones-relleno-personalizado-c3'
        },
        {
            titulo: 'Crea tu cupcake',
            subtitulo: 'Elige tu Masa',
            imagen: 'Imagenes/Personalizado/Masa (CUPCAKES - PERSONALIZADO).png',
            opciones: [
                'Chocolate',
                'Vainilla',
                'Marmolada',
                'Red Velvet'
            ],
            id: 'opciones-masa-personalizado-c3'
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
        popup.classList.add('active');
        actualizarContenido();
    };

    const cerrarPopupHandler = () => {
        popup.classList.remove('active');
        etapaActual = 0;
        actualizarContenido();
    };

    const actualizarContenido = () => {
        const etapa = etapas[etapaActual];
        tituloPopup.textContent = etapa.titulo;
        subtituloPopup.textContent = etapa.subtitulo;
        imagenCupcake.src = etapa.imagen;

        document.querySelectorAll("ul[id^='opciones-']").forEach((ul) => {
            ul.style.display = 'none';
        });

        const listaOpciones = document.querySelector(`#${etapa.id}`);
        listaOpciones.style.display = 'block';
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

    abrirPopup.addEventListener('click', mostrarPopup);
    cerrarPopup.addEventListener('click', cerrarPopupHandler);
    continuar.addEventListener('click', continuarHandler);

    let cupcakeCount = 0;
    const maxCupcakes = 5;

    const cupcakeItemsContainer = document.querySelector('.selection-area');

    function agregarCupcakePersonalizado() {
        if (cupcakeCount < maxCupcakes) {
            cupcakeCount++;
            actualizarVistaCupcakes();
        }
    }

    function actualizarVistaCupcakes() {
        const cupcakesHtml = Array.from({ length: cupcakeCount }, (_, index) => {
            const top = 200 + index * 50; // Ajusta el margen superior dinámicamente
            return `
                <div class="product-item cupcake-item" 
                     style="position: absolute; left: 1300px; top: ${top}px;" 
                     draggable="true" 
                     ondragstart="event.dataTransfer.setData('text/plain', null);">
                    <img src="Imagenes/Personalizado/Cupcake con logo.png" alt="Cupcake Personalizado">
                    <span class="cupcake-personalizado">Cupcake Personalizado</span>
                </div>
            `;
        }).join('');

        cupcakeItemsContainer.innerHTML = `
            <h2 class="title">Selecciona hasta ${maxCupcakes} sabores</h2>
            <button class="buy-button" id="buy-button" ${cupcakeCount === maxCupcakes ? '' : 'disabled'}>Comprar</button>
            ${cupcakesHtml}
        `;

        // Actualiza la posición del botón "Agregar +" y lo oculta si se alcanza el máximo
        const agregarButton = document.getElementById('abrir-popup-personalizado-c3');
        agregarButton.style.position = 'absolute';
        agregarButton.style.left = '1300px';
        agregarButton.style.top = `${200 + cupcakeCount * 50 + 30}px`;
        
        // Oculta el botón si se alcanzó el máximo de cupcakes
        agregarButton.style.display = cupcakeCount >= maxCupcakes ? 'none' : 'block';

        const buyButton = document.getElementById('buy-button');
        buyButton.addEventListener('click', () => {
            const popupLogin = document.getElementById('popup-login');
            popupLogin.classList.remove('hidden'); // Muestra el popup de login
        });
    }

    // Evento para cerrar el popup de login
    const closeButton = document.querySelector('.close-button'); // Selecciona el botón de cerrar del popup de login
    closeButton.addEventListener('click', () => {
        const popupLogin = document.getElementById('popup-login');
        popupLogin.classList.add('hidden'); // Oculta el popup de login
    });
});

