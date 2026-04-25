/**
 * Cookie Consent Service for Feinstecher
 * GDPR / DSGVO compliant implementation
 */

export const CookieService = {
    storageKey: 'feinstecher_cookie_consent',

    init() {
        if (!localStorage.getItem(this.storageKey)) {
            this.showBanner();
        }
    },

    showBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'fixed bottom-0 left-0 right-0 md:bottom-8 md:right-8 md:left-auto md:max-w-md bg-surface-container-highest border-t md:border border-primary/20 p-6 md:rounded-sm shadow-2xl z-[100] transform translate-y-full opacity-0 transition-all duration-500';
        
        banner.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center gap-3 text-primary">
                    <span class="material-symbols-outlined notranslate">cookie</span>
                    <h4 class="font-headline font-bold uppercase tracking-widest text-sm">Cookie-Einstellungen</h4>
                </div>
                <p class="text-[10px] md:text-[11px] text-on-surface-variant leading-relaxed">
                    Wir nutzen Cookies, um unsere Website für Sie optimal zu gestalten und fortlaufend zu verbessern. 
                    Durch Bestätigen des Buttons "Alle akzeptieren" stimmen Sie der Verwendung zu. 
                    Weitere Informationen erhalten Sie in unserer <a href="datenschutz.html" class="text-primary hover:underline">Datenschutzerklärung</a>.
                </p>
                <div class="flex flex-col sm:flex-row gap-3 pt-2">
                    <button id="accept-all-cookies" class="flex-1 bg-primary text-on-primary py-3 md:py-2.5 text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all active:scale-95">
                        Alle akzeptieren
                    </button>
                    <button id="accept-necessary-cookies" class="flex-1 border border-white/10 text-white/70 py-3 md:py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all active:scale-95">
                        Nur notwendige
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Animate in
        setTimeout(() => {
            banner.classList.remove('translate-y-full', 'opacity-0');
        }, 500);

        // Event Listeners
        document.getElementById('accept-all-cookies').addEventListener('click', () => this.accept('all'));
        document.getElementById('accept-necessary-cookies').addEventListener('click', () => this.accept('necessary'));
    },

    accept(type) {
        localStorage.setItem(this.storageKey, JSON.stringify({
            type: type,
            date: new Date().toISOString()
        }));
        
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.add('translate-y-20', 'opacity-0');
            setTimeout(() => banner.remove(), 500);
        }

        // Here you would normally initialize tracking scripts if 'all' is accepted
        if (type === 'all') {
            console.log('All cookies accepted - initializing optional services');
        }
    }
};
