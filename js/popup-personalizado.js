//// === JavaScript para Personalización de Cupcake ===
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el botón 'abrir-popup' existe en la página
    const abrirPopup = document.querySelector('#abrir-popup');
    if (abrirPopup) {
        // Obtener los elementos del DOM para el pop-up
        const popup = document.querySelector('#popup');
        const cerrarPopup = document.querySelector('#cerrar-popup');
        const continuar = document.querySelector('#continuar');
        const indicadores = document.querySelectorAll('.indicador span');
        const tituloPopup = document.querySelector('#titulo-popup');
        const subtituloPopup = document.querySelector('#subtitulo-popup');
        const imagenCupcake = document.querySelector('#imagen-cupcake');

        // Estados actuales del pop-up
        let etapaActual = 0; // 0 = Frosting, 1 = Relleno, 2 = Masa
        
        // Datos para cada etapa de personalización
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
                id: 'opciones-frosting'
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
                id: 'opciones-relleno'
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
                id: 'opciones-masa'
            }
        ];
        
        // Función para habilitar/deshabilitar el botón de continuar
        const habilitarContinuar = () => {
            const opcionSeleccionada = document.querySelector(`#${etapas[etapaActual].id} input:checked`);
            continuar.disabled = !opcionSeleccionada; // Habilitar o deshabilitar el botón según si hay una opción seleccionada
        };
        
        // Función para manejar la selección y asegurar solo una opción seleccionada
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
        
        // Función para avanzar al siguiente paso
        const continuarHandler = () => {
            if (etapaActual < etapas.length - 1) {
                etapaActual++;
                actualizarContenido();
            } else {
                // Redirigir a Cajaspersonalizar.html al completar la última etapa
                window.location.href = 'Cajaspersonalizar.html'; // Redirige a la página Cajaspersonalizar.html
                alert('¡Tus Biteas casi están listos!');
                cerrarPopupHandler();
            }
        };
        
        // Función para mostrar el pop-up
        const mostrarPopup = () => {
            popup.classList.add('active');
            actualizarContenido();
        };
        
        // Función para cerrar el pop-up
        const cerrarPopupHandler = () => {
            popup.classList.remove('active');
            etapaActual = 0; // Reiniciar etapa al cerrar
            actualizarContenido();
        };
        
        // Función para actualizar contenido del pop-up
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
        
        // Event Listeners
        abrirPopup.addEventListener('click', mostrarPopup); // Muestra el pop-up al hacer clic en "Agregar +"
        cerrarPopup.addEventListener('click', cerrarPopupHandler); // Cierra el pop-up al hacer clic en la "x"
        continuar.addEventListener('click', continuarHandler); // Avanza a la siguiente etapa o redirige al completar
        
        // Inicializar contenido al cargar
        actualizarContenido();
    }

    // Verificar si el botón 'personalizar' existe en otra página
    const personalizar = document.querySelector('#personalizar');
    if (personalizar) {
        personalizar.addEventListener('click', () => {
            // Lógica para el botón de personalizar si está en la página
            alert('Botón personalizar clickeado');
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM
    const popup = document.getElementById('popup');
    const abrirPopupPersonalizado = document.getElementById('abrir-popup-personalizado');
    const cerrarPopup = document.getElementById('cerrar-popup');
    
    // Mostrar el pop-up cuando se haga clic en "Personalizar"
    abrirPopupPersonalizado.addEventListener('click', (event) => {
        event.preventDefault(); // Prevenir la acción por defecto del enlace (que redirige a otro lugar)
        popup.classList.add('active'); // Mostrar el pop-up
    });

    // Cerrar el pop-up cuando se haga clic en la "X"
    cerrarPopup.addEventListener('click', () => {
        popup.classList.remove('active'); // Ocultar el pop-up
    });
});
