document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById('popup-personalizado');
    const abrirPopup = document.getElementById('abrir-popup-personalizado');
    const cerrarPopup = document.getElementById('cerrar-popup-personalizado');
    const continuar = document.getElementById('continuar-personalizado');
    const tituloPopup = document.getElementById('titulo-popup-personalizado');
    const subtituloPopup = document.getElementById('subtitulo-popup-personalizado');
    const imagenCupcake = document.getElementById('imagen-cupcake-personalizado');
    const indicadores = document.querySelectorAll('.indicador span');
    
    let etapaActual = 0; // 0 = Frosting, 1 = Relleno, 2 = Masa
    
    const etapas = [
        {
            titulo: 'Armá tu cupcake',
            subtitulo: 'Elegí tu Frosting',
            imagen: 'Imagenes/Personalizado/Frosting (CUPCAKE - PERSONALIZADO).png',
            opciones: [
                'Frosting de manzanas asadas',
                'Frosting de limón',
                'Ganash de chocolate amargo',
                'Frosting de queso y caramelo',
                'Cobertura de chocolate y DDL',
                'Crema helada',
                'Froosting de pistacho',
                'Froosting de banana y caramelo',
                'Froosting de caramelo, sal y pretzel',
                'Froostin Flynn',
                'Froostin de cookies and cream',
                'Frosting cereales'
            ],
            id: 'opciones-frosting-personalizado'
        },
        {
            titulo: 'Armá tu cupcake',
            subtitulo: 'Elegí tu Relleno',
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
            id: 'opciones-relleno-personalizado'
        },
        {
            titulo: 'Armá tu cupcake',
            subtitulo: 'Elegí tu Masa',
            imagen: 'Imagenes/Personalizado/Masa (CUPCAKES - PERSONALIZADO).png',
            opciones: [
                'Chocolate',
                'Vainilla',
                'Marmolada',
                'Red Velvet'
            ],
            id: 'opciones-masa-personalizado'
        }
    ];
    
    const habilitarContinuar = () => {
        const opcionSeleccionada = document.querySelector(`#${etapas[etapaActual].id} input:checked`);
        continuar.disabled = !opcionSeleccionada; // Habilitar o deshabilitar el botón según si hay una opción seleccionada
    };
    
    const manejarSeleccion = (event, categoria) => {
        const opcionesDelGrupo = document.querySelectorAll(`#${categoria} input[type="checkbox"]`);
    
        // Desmarcar las otras opciones si se selecciona una
        opcionesDelGrupo.forEach(opcion => {
            if (opcion !== event.target) {
                opcion.checked = false; // Desmarcar las demás opciones
            }
        });
    
        habilitarContinuar(); // Habilitar o deshabilitar el botón de continuar
    };
    
    const continuarHandler = () => {
        if (etapaActual < etapas.length - 1) {
            etapaActual++;
            actualizarContenido();
        } else {
            // Cuando llegamos a la última etapa (Masa), mostrar el cupcake con la imagen y texto
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
        etapaActual = 0; // Reiniciar etapa al cerrar
        actualizarContenido();
    };
    
    const actualizarContenido = () => {
        const etapa = etapas[etapaActual];
    
        // Actualizar textos
        tituloPopup.textContent = etapa.titulo;
        subtituloPopup.textContent = etapa.subtitulo;
    
        // Actualizar imagen
        imagenCupcake.src = etapa.imagen;
    
        // Mostrar solo las opciones de la etapa actual
        document.querySelectorAll("ul[id^='opciones-']").forEach((ul) => {
            ul.style.display = 'none'; // Ocultar todas las listas
        });
    
        const listaOpciones = document.querySelector(`#${etapa.id}`);
        listaOpciones.style.display = 'block'; // Mostrar la lista actual
        
        listaOpciones.innerHTML = etapa.opciones
            .map(opcion => `<li><input type="checkbox"> ${opcion}</li>`)
            .join('');
    
        habilitarContinuar(); // Verificar si se habilita el botón de continuar
    
        // Delegar el evento a cada checkbox para manejar la selección
        listaOpciones.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', (event) => {
                manejarSeleccion(event, etapa.id);
            });
        });
    
        // Actualizar indicador visual
        indicadores.forEach((indicador, index) => {
            indicador.classList.toggle('active', index === etapaActual);
        });
    };
    
    abrirPopup.addEventListener('click', mostrarPopup); // Muestra el pop-up al hacer clic en "Agregar +"
    cerrarPopup.addEventListener('click', cerrarPopupHandler); // Cierra el pop-up al hacer clic en la "x"
    continuar.addEventListener('click', continuarHandler); // Avanza a la siguiente etapa o redirige al completar
    
    // Función para agregar un cupcake personalizado a la lista
    let cupcakeCount = 0;
    const maxCupcakes = 5; // Limitar a 5 cupcakes personalizados

    const cupcakeItemsContainer = document.querySelector('.selection-area');
    const cupcakePersonalizadoText = "🧁 Cupcake Personalizado";

    // Función para agregar un cupcake personalizado a la lista
    function agregarCupcakePersonalizado() {
        if (cupcakeCount < maxCupcakes) {
            cupcakeCount++;
            actualizarVistaCupcakes();
        }
    }

    // Actualizar la interfaz con los cupcakes personalizados
    function actualizarVistaCupcakes() {
        const cupcakesHtml = Array(cupcakeCount).fill(`
            <div class="product-item cupcake-item">
                <img src="Imagenes/Personalizado/Cupcake con logo.png" alt="Cupcake Personalizado">
                <span class="cupcake-personalizado">Cupcake Personalizado</span>
            </div>
        `).join('');

        cupcakeItemsContainer.innerHTML = `
            <h2 class="title">Seleccioná 6 sabores</h2>
            <button class="buy-button" id="buy-button" ${cupcakeCount === maxCupcakes ? '' : 'disabled'}>Comprar</button>
            ${cupcakesHtml}
        `;

        // Solo mostrar el botón "Agregar +" si no se ha alcanzado el límite máximo de cupcakes
        if (cupcakeCount < maxCupcakes) {
            // Verificar si el botón "Agregar +" ya está presente
            const agregarButton = document.getElementById('abrir-popup-personalizado');
            if (!agregarButton) {
                cupcakeItemsContainer.innerHTML += `
                    <div class="agregar-personalizado">
                        <button id="abrir-popup-personalizado">Agregar +</button>
                    </div>
                `;
                // Asociar el evento para abrir el popup
                document.getElementById('abrir-popup-personalizado').addEventListener('click', mostrarPopup);
            }
        } else {
            // Desaparecer el botón "Agregar +" y habilitar el botón "Comprar"
            const agregarButton = document.getElementById('abrir-popup-personalizado');
            if (agregarButton) {
                agregarButton.style.display = 'none'; // Ocultar el botón "Agregar +"
            }
            document.getElementById('buy-button').disabled = false; // Habilitar el botón "Comprar"
        }

        // Mostrar el popup-login cuando se hace clic en "Comprar"
        const buyButton = document.getElementById('buy-button');
        buyButton.addEventListener('click', () => {
            const popupLogin = document.getElementById('popup-login'); // El pop-up de login
            popupLogin.classList.remove('hidden'); // Muestra el pop-up de login
        });
    }

    // Funcionalidad para cerrar el popup-login
    const popupLogin = document.getElementById('popup-login');
    const closeButton = popupLogin.querySelector('.close-button'); // Botón de cerrar
    
    // Función para cerrar el popup
    const cerrarPopupLogin = () => {
        popupLogin.classList.add('hidden'); // Agregar la clase 'hidden' para ocultar el popup
    };
    
    // Agregar el evento al botón de cerrar
    closeButton.addEventListener('click', cerrarPopupLogin);
    
    // Inicializar la vista con un cupcake personalizado
    actualizarVistaCupcakes();
});
