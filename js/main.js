/**
 * @fileoverview Main application logic for the Digital Garden landing page.
 * Handles localization via external JSON files, screenshot management, animations, audio feedback, and PWA registration.
 *
 * Aligned with Google JavaScript Style Guide.
 */

'use strict';

/**
 * Global configuration object.
 * @const {!Object}
 */
const CONFIG = {
    VERSION: '1.3.5',
    DEFAULT_LANG: 'en',
    SUPPORTED_LANGS: ['en', 'it', 'fr', 'de', 'es', 'ja'],
    IMAGE_PATH: './images',
    LOCALES_PATH: './locales',
    STATS_PATH: './data/stats.json'
};

/** @type {!Object<string, string>} */
const LIVE_STATS = {
    rating: '5.0/5',
    downloads: '1,000+'
};

/**
 * Cache for loaded translations.
 * @type {!Object<string, !Object<string, string>>}
 */
const TRANSLATIONS_CACHE = {};

/**
 * Fallback embedded translations for instant first-paint or offline/file:// protocol support.
 * @const {!Object<string, string>}
 */
const FALLBACK_TRANSLATIONS = {
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
    support: 'Support',
    aria_prev_screenshot: 'Previous screenshot',
    aria_next_screenshot: 'Next screenshot',
    aria_select_language: 'Select Language',
    aria_dot_nav: 'Go to screenshot ',
    app_rating: '{{rating}} Rating',
    app_downloads: '{{downloads}} Downloads'
};

/**
 * Safely accesses localStorage with a fallback.
 * @const {!Object}
 */
const storage = {
    get(key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            return null;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {}
    }
};

const APP_SOUNDS = [
    './audio/sound_water.ogg',
    './audio/sound_fertilize.ogg',
    './audio/sound_repot.ogg',
    './audio/sound_camera.ogg'
];

/**
 * Plays one of the app's native .ogg sound effects when switching screenshots.
 */
function playAppSound() {
    try {
        const randomSound = APP_SOUNDS[Math.floor(Math.random() * APP_SOUNDS.length)];
        const audio = new Audio(randomSound);
        audio.volume = 0.6;
        audio.play().catch(() => {});
    } catch (e) {
        // Suppress playback errors
    }
}

/**
 * Updates SEO meta tags and canonical URL based on selected language.
 * @param {string} lang Language code.
 * @param {!Object<string, string>} translation Translation dictionary.
 */
function updateMetaTags(lang, translation) {
    const baseUrl = 'https://digitalgardensupport.com/';
    const localizedUrl = lang === CONFIG.DEFAULT_LANG ? baseUrl : `${baseUrl}?lang=${lang}`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', translation.header_subtitle);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', translation.header_subtitle);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', localizedUrl);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', localizedUrl);
}

/**
 * Updates all DOM elements with data-t attribute.
 * @param {string} lang Language code.
 * @param {!Object<string, string>} translation Translation dictionary.
 */
function applyTranslations(lang, translation) {
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (translation[key]) {
            let text = translation[key];
            text = text.replace('{{rating}}', LIVE_STATS.rating);
            text = text.replace('{{downloads}}', LIVE_STATS.downloads);

            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.innerText = text;
            }
        }
    });

    const langSelect = document.getElementById('languageSelect');
    if (langSelect) langSelect.setAttribute('aria-label', translation.aria_select_language);

    const btnLeft = document.getElementById('sliderBtnLeft');
    if (btnLeft) btnLeft.setAttribute('aria-label', translation.aria_prev_screenshot);

    const btnRight = document.getElementById('sliderBtnRight');
    if (btnRight) btnRight.setAttribute('aria-label', translation.aria_next_screenshot);

    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.setAttribute('aria-label', translation.aria_dot_nav + (index + 1));
    });

    document.documentElement.lang = lang;
    updateMetaTags(lang, translation);
}

/**
 * Loads translation dictionary for the selected language asynchronously.
 * @param {string} lang Language code.
 * @return {!Promise<!Object<string, string>>}
 */
async function loadTranslations(lang) {
    if (TRANSLATIONS_CACHE[lang]) {
        return TRANSLATIONS_CACHE[lang];
    }

    try {
        const response = await fetch(`${CONFIG.LOCALES_PATH}/${lang}.json?v=${CONFIG.VERSION}`);
        if (response.ok) {
            const data = await response.json();
            TRANSLATIONS_CACHE[lang] = data;
            return data;
        }
    } catch (e) {
        console.warn(`Failed to load locale: ${lang}, falling back to default.`, e);
    }

    return TRANSLATIONS_CACHE[CONFIG.DEFAULT_LANG] || FALLBACK_TRANSLATIONS;
}

/**
 * Updates screenshot image paths with localized versions and cache busting.
 * @param {string} lang Language code.
 */
function updateScreenshots(lang) {
    const imgFolder = lang === 'ja' ? 'jp' : lang;
    document.querySelectorAll('.screenshot-item img').forEach(img => {
        const baseFile = img.getAttribute('data-base');
        if (!baseFile) return;

        const version = CONFIG.VERSION;
        const trySrc = `${CONFIG.IMAGE_PATH}/${imgFolder}/${baseFile}?v=${version}`;

        const tempImg = new Image();
        tempImg.onload = () => { img.src = trySrc; };
        tempImg.onerror = () => {
            if (imgFolder !== CONFIG.DEFAULT_LANG) {
                img.src = `${CONFIG.IMAGE_PATH}/${CONFIG.DEFAULT_LANG}/${baseFile}?v=${version}`;
            }
        };
        tempImg.src = trySrc;
    });
}

/**
 * Main function to change site language.
 * @param {string} lang Selected language code.
 */
async function changeLanguage(lang) {
    if (!CONFIG.SUPPORTED_LANGS.includes(lang)) lang = CONFIG.DEFAULT_LANG;
    const translation = await loadTranslations(lang);
    applyTranslations(lang, translation);
    updateScreenshots(lang);
    storage.set('preferredLang', lang);
}

/**
 * Scrolls the screenshot slider.
 * @param {number} direction -1 for left, 1 for right.
 */
function scrollSlider(direction) {
    const slider = document.getElementById('screenshotSlider');
    if (!slider) return;
    playAppSound();
    const scrollAmount = slider.clientWidth * 0.8;
    slider.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

/**
 * Initializes Reveal on Scroll animations using Intersection Observer.
 */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target.tagName === 'HEADER') {
                 entry.target.classList.add('active');
            } else if (entry.isIntersecting) {
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

    items.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            playAppSound();
            slider.scrollTo({ left: items[index].offsetLeft - slider.offsetLeft, behavior: 'smooth' });
        });
        dotsContainer.appendChild(dot);
    });

    slider.addEventListener('scroll', () => {
        const index = Math.round(slider.scrollLeft / items[0].offsetWidth);
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }, { passive: true });
}

/**
 * Fetches latest stats from stats.json.
 * @return {!Promise}
 */
async function fetchStats() {
    try {
        const response = await fetch(CONFIG.STATS_PATH + '?v=' + CONFIG.VERSION);
        if (response.ok) {
            const data = await response.json();
            LIVE_STATS.rating = data.rating || LIVE_STATS.rating;
            LIVE_STATS.downloads = data.downloads || LIVE_STATS.downloads;
        }
    } catch (e) {}
}

// Initialization on DOM Ready
document.addEventListener('DOMContentLoaded', async () => {
    // Seed default English cache for instant first-paint
    TRANSLATIONS_CACHE[CONFIG.DEFAULT_LANG] = FALLBACK_TRANSLATIONS;

    await fetchStats();
    initSliderDots();
    initScrollReveal();

    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const savedLang = storage.get('preferredLang');
    const browserLang = navigator.language.split('-')[0];

    let initialLang = CONFIG.DEFAULT_LANG;
    if (urlLang && CONFIG.SUPPORTED_LANGS.includes(urlLang)) initialLang = urlLang;
    else if (savedLang && CONFIG.SUPPORTED_LANGS.includes(savedLang)) initialLang = savedLang;
    else if (CONFIG.SUPPORTED_LANGS.includes(browserLang)) initialLang = browserLang;

    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.value = initialLang;
        langSelect.addEventListener('change', async (e) => {
            const newLang = e.target.value;
            const newUrl = new URL(window.location);
            newUrl.searchParams.set('lang', newLang);
            window.history.pushState({}, '', newUrl);
            await changeLanguage(newLang);
        });
    }

    const btnLeft = document.getElementById('sliderBtnLeft');
    const btnRight = document.getElementById('sliderBtnRight');
    if (btnLeft) btnLeft.addEventListener('click', () => scrollSlider(-1));
    if (btnRight) btnRight.addEventListener('click', () => scrollSlider(1));

    await changeLanguage(initialLang);

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js').catch(() => {});
        });
    }
});
