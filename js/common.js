// common.js
// common.js
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Verificar que translations.js esté cargado
        if (!window.translations) {
            console.error('translations.js no está cargado');
            return;
        }

        // Funciones comunes
        const getCurrentLanguage = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const urlLang = urlParams.get('lang');
            return urlLang && ['es', 'en'].includes(urlLang) ? urlLang : localStorage.getItem('language') || 'es';
        };

        const getTranslation = (key, lang) => {
            return window.translations?.[lang]?.[key] || key;
        };

        const updateLanguage = (lang) => {
            localStorage.setItem('language', lang);
            document.documentElement.lang = lang;

            // Traducir elementos con data-i18n
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                const htmlFlag = el.getAttribute('data-html') === 'true';
                if (key) {
                    if (htmlFlag) {
                        el.innerHTML = getTranslation(key, lang);
                    } else {
                        el.textContent = getTranslation(key, lang);
                    }
                }
            });

            // Traducir placeholders
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if (key) el.placeholder = getTranslation(key, lang);
            });

            // Actualizar enlaces con parámetro lang
            document.querySelectorAll('a').forEach(link => {
                const href = link.getAttribute('href');
                if (href && !href.includes('lang=') && !href.startsWith('#') && !href.startsWith('http')) {
                    link.href = `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`;
                }
            });

            // Disparar evento para scripts específicos
            window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
        };

        const setLanguage = (lang) => {
            const modal = document.getElementById('language-modal');
            const main = document.getElementById('main-content');
            if (modal) modal.style.display = 'none';
            if (main) main.style.display = 'block';
            updateLanguage(lang);
        };

        // Menú hamburguesa
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('menu-open');
            });

            document.querySelectorAll('.menu li a, .menu li button').forEach(el => {
                el.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('menu-open');
                });
            });

            document.addEventListener('click', e => {
                if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('menu-open');
                }
            });

            window.addEventListener('resize', () => {
                if (window.innerWidth > 1024) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('menu-open');
                }
            });
        }

        // Inicialización del idioma
        const lang = getCurrentLanguage();
        const modal = document.getElementById('language-modal');
        const main = document.getElementById('main-content');

        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
            if (modal && main) {
                modal.style.display = 'flex';
                main.style.display = 'none';
            }
        } else {
            if (main) main.style.display = 'block';
            updateLanguage(lang);
        }

        // Botones de idioma
        const selector = document.getElementById('language-modal');
        if (selector) {
            selector.querySelectorAll('.lang-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    setLanguage(btn.dataset.lang);
                });
            });
        }

        // Exponer funciones globales
        window.getCurrentLanguage = getCurrentLanguage;
        window.getTranslation = getTranslation;
        window.updateLanguage = updateLanguage;
        window.setLanguage = setLanguage;

    } catch (error) {
        console.error('Error en common.js:', error);
    }
});