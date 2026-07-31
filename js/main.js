/**
 * @fileoverview Main application logic for the Digital Garden landing page.
 * Handles localization, screenshot management, animations, and PWA registration.
 *
 * Aligned with Google JavaScript Style Guide.
 */

'use strict';

/**
 * Global configuration object.
 * @const {!Object}
 */
const CONFIG = {
    VERSION: '1.3.0',
    DEFAULT_LANG: 'en',
    SUPPORTED_LANGS: ['en', 'it', 'fr', 'de', 'es'],
    IMAGE_PATH: './images'
};

/**
 * Application translations dictionary.
 * @const {!Object<string, !Object<string, string>>}
 */
const TRANSLATIONS = {
    en: {
        header_title: 'Digital Garden',
        header_subtitle: 'Your smart botanical companion. Grow with confidence using automated care and expert AI diagnosis.',
        get_it_google_play: 'Get it on Google Play',
        feature_reminders_title: 'Smart Reminders',
        feature_reminders_desc: 'Custom schedules for watering and fertilizing tailored to your specific plant species.',
        feature_ai_title: 'AI Health Expert',
        feature_ai_desc: 'Identify plant diseases instantly by taking a photo. Get professional advice from our AI.',
        feature_database_title: 'Rich Database',
        feature_database_desc: 'Detailed care hints including soil types, light requirements, and pot sizing.',
        screenshots_title: 'Discover many other functionalities',
        screenshots_subtitle: 'Explore the intuitive interface and advanced features designed to help your garden thrive.',
        cap_garden_list: 'Manage all your plants in one place',
        cap_add_plant: 'Quick and easy onboarding for new species',
        cap_plant_detail: 'Complete overview of your plant\'s status',
        cap_ai_help: 'Chat with your botanical AI Expert',
        cap_recognition: 'Instant species identification from photos',
        cap_schedule: 'Daily care task organizer',
        cap_hints_1: 'Expert guidance on soil composition',
        cap_hints_2: 'Optimizing light conditions for growth',
        cap_hints_3: 'Watering and pruning techniques',
        cap_theme: 'Customizable icon bundles',
        cap_colors: 'Personalize app colors to your style',
        cap_backup: 'Secure cloud and local backup support',
        cap_languages: 'Support for multiple languages',
        cta_bottom_title: 'Ready to start your digital garden?',
        cta_bottom_subtitle: 'Join thousands of plant lovers and give your plants the care they deserve.',
        privacy_policy: 'Privacy Policy',
        support: 'Support'
    },
    it: {
        header_title: 'Digital Garden',
        header_subtitle: 'Il tuo compagno botanico intelligente. Coltiva con fiducia grazie alle cure automatizzate e alla diagnosi esperta dell\'IA.',
        get_it_google_play: 'Scarica su Google Play',
        feature_reminders_title: 'Promemoria Intelligenti',
        feature_reminders_desc: 'Programmi personalizzati per l\'irrigazione e la concimazione adatti alle tue specifiche piante.',
        feature_ai_title: 'Esperto AI per la Salute',
        feature_ai_desc: 'Identifica le malattie delle piante istantaneamente con una foto. Ricevi consigli professionali dalla nostra IA.',
        feature_database_title: 'Ampio Database',
        feature_database_desc: 'Consigli dettagliati sulla cura, inclusi tipi di terreno, requisiti di luce e dimensioni del vaso.',
        screenshots_title: 'Scopri molte altre funzionalità',
        screenshots_subtitle: 'Esplora l\'interfaccia intuitiva e le funzioni avanzate progettate per far fiorire il tuo giardino.',
        cap_garden_list: 'Gestisci tutte le tue piante in un unico posto',
        cap_add_plant: 'Inserimento rapido e facile di nuove specie',
        cap_plant_detail: 'Panoramica completa dello stato della tua pianta',
        cap_ai_help: 'Chatta con il tuo Esperto AI botanico',
        cap_recognition: 'Identificazione istantanea delle specie dalle foto',
        cap_schedule: 'Organizzatore giornaliero delle attività di cura',
        cap_hints_1: 'Guida esperta sulla composizione del terreno',
        cap_hints_2: 'Ottimizzazione delle condizioni di luce per la crescita',
        cap_hints_3: 'Tecniche di irrigazione e potatura',
        cap_theme: 'Pacchetti di icone personalizzabili',
        cap_colors: 'Personalizza i colori dell\'app secondo il tuo stile',
        cap_backup: 'Supporto backup sicuro su cloud e locale',
        cap_languages: 'Supporto per più lingue',
        cta_bottom_title: 'Pronto a iniziare il tuo giardino digitale?',
        cta_bottom_subtitle: 'Unisciti a migliaia di amanti delle piante e dai alle tue piante la cura che meritano.',
        privacy_policy: 'Informativa sulla Privacy',
        support: 'Supporto'
    },
    fr: {
        header_title: 'Digital Garden',
        header_subtitle: 'Votre compagnon botanique intelligent. Cultivez en toute confiance grâce aux soins automatisés et au diagnostic expert de l\'IA.',
        get_it_google_play: 'Disponible sur Google Play',
        feature_reminders_title: 'Rappels Intelligents',
        feature_reminders_desc: 'Des calendriers personnalisés pour l\'arrosage et la fertilisation adaptés à vos espèces de plantes.',
        feature_ai_title: 'Expert Santé IA',
        feature_ai_desc: 'Identifiez instantanément les maladies des plantes avec une photo. Obtenez des conseils professionnels de notre IA.',
        feature_database_title: 'Base de Données Riche',
        feature_database_desc: 'Conseils de soins détaillés incluant les types de sol, les besoins en lumière et la taille des pots.',
        screenshots_title: 'Découvrez de nombreuses autres fonctionnalités',
        screenshots_subtitle: 'Explorez l\'interface intuitive et les fonctionnalités avancées conçues pour aider votre jardin à s\'épanouir.',
        cap_garden_list: 'Gérez toutes vos plantes en un seul endroit',
        cap_add_plant: 'Ajout rapide et facile de nouvelles espèces',
        cap_plant_detail: 'Aperçu complet de l\'état de votre plante',
        cap_ai_help: 'Discutez avec votre expert botanique IA',
        cap_recognition: 'Identification instantanée des espèces à partir de photos',
        cap_schedule: 'Organisateur quotidien des tâches d\'entretien',
        cap_hints_1: 'Conseils d\'experts sur la composition du sol',
        cap_hints_2: 'Optimisation des conditions lumineuses pour la croissance',
        cap_hints_3: 'Techniques d\'arrosage et de taille',
        cap_theme: 'Packs d\'icônes personnalisables',
        cap_colors: 'Personnalisez les couleurs de l\'application',
        cap_backup: 'Prise en charge de la sauvegarde cloud et locale',
        cap_languages: 'Support de plusieurs langues',
        cta_bottom_title: 'Prêt à commencer votre jardin numérique ?',
        cta_bottom_subtitle: 'Rejoignez des milliers de passionnés de plantes et offrez à vos plantes les soins qu\'elles méritent.',
        privacy_policy: 'Politique de Confidentialité',
        support: 'Support'
    },
    de: {
        header_title: 'Digital Garden',
        header_subtitle: 'Ihr smarter botanischer Begleiter. Züchten Sie mit Vertrauen dank automatisierter Pflege und Experten-KI-Diagnose.',
        get_it_google_play: 'Jetzt bei Google Play',
        feature_reminders_title: 'Smarte Erinnerungen',
        feature_reminders_desc: 'Individuelle Pläne für Bewässerung und Düngung, zugeschnitten auf Ihre spezifischen Pflanzenarten.',
        feature_ai_title: 'KI-Gesundheitsexperte',
        feature_ai_desc: 'Identifizieren Sie Pflanzenkrankheiten sofort mit einem Foto. Erhalten Sie professionelle Beratung von unserer KI.',
        feature_database_title: 'Umfangreiche Datenbank',
        feature_database_desc: 'Detaillierte Pflegehinweise einschließlich Bodenarten, Lichtanforderungen und Topfgrößen.',
        screenshots_title: 'Entdecken Sie viele weitere Funktionen',
        screenshots_subtitle: 'Erkunden Sie die intuitive Benutzeroberfläche und die erweiterten Funktionen für Ihren Garten.',
        cap_garden_list: 'Verwalten Sie alle Ihre Pflanzen an einem Ort',
        cap_add_plant: 'Schnelle und einfache Aufnahme neuer Arten',
        cap_plant_detail: 'Vollständiger Überblick über den Status Ihrer Pflanze',
        cap_ai_help: 'Chatten Sie mit Ihrem botanischen KI-Experten',
        cap_recognition: 'Sofortige Artenbestimmung anhand von Fotos',
        cap_schedule: 'Täglicher Organizer für Pflegeaufgaben',
        cap_hints_1: 'Expertenberatung zur Bodenzusammensetzung',
        cap_hints_2: 'Optimierung der Lichtverhältnisse für das Wachstum',
        cap_hints_3: 'Bewässerungs- und Schnitttechniken',
        cap_theme: 'Anpassbare Symbolpakete',
        cap_colors: 'Personalisieren Sie die App-Farben',
        cap_backup: 'Sichere Cloud- und lokale Backup-Unterstützung',
        cap_languages: 'Unterstützung für mehrere Sprachen',
        cta_bottom_title: 'Bereit für Ihren digitalen Garten?',
        cta_bottom_subtitle: 'Schließen Sie sich Tausenden von Pflanzenliebhabern an und geben Sie Ihren Pflanzen die Pflege, die sie verdienen.',
        privacy_policy: 'Datenschutzerklärung',
        support: 'Support'
    },
    es: {
        header_title: 'Digital Garden',
        header_subtitle: 'Tu compañero botánico inteligente. Cultiva con confianza mediante cuidados automatizados y diagnóstico experto por IA.',
        get_it_google_play: 'Disponible en Google Play',
        feature_reminders_title: 'Recordatorios Inteligentes',
        feature_reminders_desc: 'Programas personalizados para riego y fertilización adaptados a tus especies de plantas.',
        feature_ai_title: 'Experto en Salud IA',
        feature_ai_desc: 'Identifica enfermedades de las plantas al instante con una foto. Obtén consejos profesionales de nuestra IA.',
        feature_database_title: 'Base de Datos Rica',
        feature_database_desc: 'Consejos detallados que incluyen tipos de suelo, requisitos de luz y tamaño de maceta.',
        screenshots_title: 'Descubre muchas otras funcionalidades',
        screenshots_subtitle: 'Explora la interfaz intuitiva y las funciones avanzadas diseñadas para que tu jardín prospere.',
        cap_garden_list: 'Gestiona todas tus plantas en un solo lugar',
        cap_add_plant: 'Incorporación rápida y fácil de nuevas especies',
        cap_plant_detail: 'Resumen completo del estado de tu planta',
        cap_ai_help: 'Chatea con tu experto botánico por IA',
        cap_recognition: 'Identificación instantánea de especies mediante fotos',
        cap_schedule: 'Organizador diario de tareas de cuidado',
        cap_hints_1: 'Guía experta sobre la composición del suelo',
        cap_hints_2: 'Optimización de la luz para el crecimiento',
        cap_hints_3: 'Técnicas de riego y poda',
        cap_theme: 'Paquetes de iconos personalizables',
        cap_colors: 'Personaliza los colores de la aplicación',
        cap_backup: 'Soporte de copia de seguridad local y en la nube',
        cap_languages: 'Soporte para varios idiomas',
        cta_bottom_title: '¿Listo para empezar tu jardín digital?',
        cta_bottom_subtitle: 'Únete a miles de amantes de las plantas y dales a tus plantas el cuidado que merecen.',
        privacy_policy: 'Política de Privacidad',
        support: 'Soporte'
    }
};

/**
 * Updates SEO meta tags based on selected language.
 * @param {string} lang Language code.
 */
function updateMetaTags(lang) {
    const translation = TRANSLATIONS[lang] || TRANSLATIONS[CONFIG.DEFAULT_LANG];

    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', translation.header_subtitle);
    }

    // Update Open Graph Description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
        ogDescription.setAttribute('content', translation.header_subtitle);
    }
}

/**
 * Updates all DOM elements with data-t attribute.
 * @param {string} lang Language code.
 */
function updatePageContent(lang) {
    const translation = TRANSLATIONS[lang] || TRANSLATIONS[CONFIG.DEFAULT_LANG];

    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (translation[key]) {
            // Check if it's a value (like an input) or text
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation[key];
            } else {
                el.innerText = translation[key];
            }
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update Meta Tags for SEO
    updateMetaTags(lang);
}

/**
 * Updates screenshot image paths with localized versions and cache busting.
 * Supports WebP with PNG fallback.
 * @param {string} lang Language code.
 */
function updateScreenshots(lang) {
    document.querySelectorAll('.screenshot-item img').forEach(img => {
        const baseFile = img.getAttribute('data-base');
        if (!baseFile) return;

        const filenameNoExt = baseFile.split('.').slice(0, -1).join('.');
        const version = CONFIG.VERSION;

        /**
         * Recursively tries to load images in order: Local WebP -> PNG -> English WebP -> PNG.
         * @param {string} targetLang The language folder to look in.
         * @param {boolean} useWebP Whether to try loading the WebP version.
         */
        const tryLoad = (targetLang, useWebP) => {
            const ext = useWebP ? 'webp' : 'png';
            const newSrc = `${CONFIG.IMAGE_PATH}/${targetLang}/${filenameNoExt}.${ext}?v=${version}`;

            const tempImg = new Image();
            tempImg.onload = () => {
                img.src = newSrc;
            };
            tempImg.onerror = () => {
                if (useWebP) {
                    // Try PNG for same lang
                    tryLoad(targetLang, false);
                } else if (targetLang !== CONFIG.DEFAULT_LANG) {
                    // Try WebP for default lang
                    tryLoad(CONFIG.DEFAULT_LANG, true);
                }
            };
            tempImg.src = newSrc;
        };

        tryLoad(lang, true);
    });
}

/**
 * Main function to change site language.
 * @param {string} lang Selected language code.
 */
function changeLanguage(lang) {
    if (!CONFIG.SUPPORTED_LANGS.includes(lang)) {
        lang = CONFIG.DEFAULT_LANG;
    }

    updatePageContent(lang);
    updateScreenshots(lang);
    localStorage.setItem('preferredLang', lang);
}

/**
 * Scrolls the screenshot slider.
 * @param {number} direction -1 for left, 1 for right.
 */
function scrollSlider(direction) {
    const slider = document.getElementById('screenshotSlider');
    if (!slider) return;

    const scrollAmount = slider.clientWidth * 0.8;
    slider.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

/**
 * Initializes Reveal on Scroll animations using Intersection Observer.
 */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Header is special-cased to animate on load.
            if (entries[0].target.tagName === 'HEADER') {
                 entry.target.classList.add('active');
                 return;
            }
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/**
 * Initializes and manages Slider Dots for navigation.
 */
function initSliderDots() {
    const slider = document.getElementById('screenshotSlider');
    const dotsContainer = document.getElementById('sliderDots');
    const items = document.querySelectorAll('.screenshot-item');
    if (!slider || !dotsContainer) return;

    // Create dots
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            slider.scrollTo({
                left: items[index].offsetLeft - slider.offsetLeft,
                behavior: 'smooth'
            });
        });
        dotsContainer.appendChild(dot);
    });

    // Update active dot on scroll
    slider.addEventListener('scroll', () => {
        const index = Math.round(slider.scrollLeft / items[0].offsetWidth);
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }, { passive: true });
}

// Initialization on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    // 1. Determine initial language
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = navigator.language.split('-')[0];
    const initialLang = savedLang || (TRANSLATIONS[browserLang] ? browserLang : CONFIG.DEFAULT_LANG);

    // 2. Set the select dropdown value and listener
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.value = initialLang;
        langSelect.addEventListener('change', (e) => changeLanguage(e.target.value));
    }

    // 3. Slider Button Listeners
    const btnLeft = document.getElementById('sliderBtnLeft');
    const btnRight = document.getElementById('sliderBtnRight');
    if (btnLeft) btnLeft.addEventListener('click', () => scrollSlider(-1));
    if (btnRight) btnRight.addEventListener('click', () => scrollSlider(1));

    // 4. Apply initial language
    changeLanguage(initialLang);

    // 5. Init Animations & Interactive Elements
    initScrollReveal();
    initSliderDots();

    // 6. Register Service Worker for Offline Support
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('Service Worker registered successfully'))
                .catch(err => console.warn('Service Worker registration failed:', err));
        });
    }
});
