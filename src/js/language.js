/**
 * Language Service for Feinstecher
 * Integrates Google Translate with a custom premium UI
 */

export const LanguageService = {
    languages: [
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' }
    ],

    init() {
        // Define the callback globally immediately
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement({
                pageLanguage: 'de',
                autoDisplay: false
            }, 'google_translate_element');
        };

        this.loadGoogleTranslate();
        this.hideGoogleBar();
    },

    hideGoogleBar() {
        // Aggressive JS approach to keep the bar hidden
        const observer = new MutationObserver(() => {
            const bar = document.querySelector('.goog-te-banner-frame');
            if (bar) {
                bar.style.display = 'none';
                document.body.style.top = '0';
            }
        });
        observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    },

    loadGoogleTranslate() {
        // Create the Google Translate element (hidden)
        if (!document.getElementById('google_translate_element')) {
            const div = document.createElement('div');
            div.id = 'google_translate_element';
            div.style.display = 'none';
            document.head.appendChild(div);
        }

        // Load the script if not already loaded
        if (!document.querySelector('script[src*="translate_a/element.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            document.head.appendChild(script);
        }
    },

    changeLanguage(langCode) {
        const triggerTranslation = () => {
            if (langCode === 'de') {
                this.resetTranslation();
                return true;
            }

            const select = document.querySelector('.goog-te-combo');
            if (select) {
                select.value = langCode;
                select.dispatchEvent(new Event('change'));
                localStorage.setItem('feinstecher_lang', langCode);
                return true;
            }
            return false;
        };

        if (!triggerTranslation()) {
            let attempts = 0;
            const interval = setInterval(() => {
                attempts++;
                if (triggerTranslation() || attempts > 20) {
                    clearInterval(interval);
                }
            }, 500);
        }
    },

    resetTranslation() {
        // Remove the Google Translate cookies thoroughly
        const domains = [
            window.location.hostname,
            '.' + window.location.hostname,
            window.location.hostname.split('.').slice(-2).join('.')
        ];
        
        const cookies = ['googtrans', 'googtrans_ext'];
        
        cookies.forEach(cookie => {
            domains.forEach(domain => {
                document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
                document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            });
        });

        // Reset localStorage
        localStorage.setItem('feinstecher_lang', 'de');

        // Force a clean reload to kill the Google Translate JS engine state
        window.location.reload();
    },

    setupCustomUI() {
        const savedLang = localStorage.getItem('feinstecher_lang');
        if (savedLang && savedLang !== 'de') {
            setTimeout(() => this.changeLanguage(savedLang), 1500);
        }
    }
};

window.LanguageService = LanguageService;
