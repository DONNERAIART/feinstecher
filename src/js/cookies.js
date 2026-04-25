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
            <style>
                @keyframes machine-buzz {
                    0% { transform: translate(0, 0) rotate(0); }
                    25% { transform: translate(1px, -1px) rotate(1deg); }
                    50% { transform: translate(-1px, 1px) rotate(-1deg); }
                    75% { transform: translate(1px, 1px) rotate(0.5deg); }
                    100% { transform: translate(0, 0) rotate(0); }
                }
                .buzz-active { animation: machine-buzz 0.1s infinite; }
                .ink-drop {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #00F0FF;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 101;
                }
            </style>
            <div class="space-y-4">
                <div class="flex items-center gap-3 text-primary">
                    <div id="tattoo-machine-icon" class="transition-transform duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2V6M12 6L9 10M12 6L15 10M12 22V17M10 17H14V22H10V17Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M7 6H17V15H7V6Z" stroke="currentColor" stroke-width="1.5"/>
                        </svg>
                    </div>
                    <h4 class="font-headline font-bold uppercase tracking-widest text-sm">Cookie-Einstellungen</h4>
                </div>
                <p class="text-[10px] md:text-[11px] text-on-surface-variant leading-relaxed">
                    Bereit für den ersten Stich? Wir nutzen Cookies, um Ihr Erlebnis zu perfektionieren. 
                    Klicken Sie auf die Maschine, um alles zu akzeptieren. 
                    Weitere Infos in der <a href="datenschutz.html" class="text-primary hover:underline">Datenschutzerklärung</a>.
                </p>
                <div class="flex flex-col sm:flex-row gap-3 pt-2">
                    <button id="accept-all-cookies" class="relative overflow-hidden group flex-1 bg-primary text-on-primary py-3 md:py-2.5 text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2">
                        <span>Alle akzeptieren</span>
                    </button>
                    <button id="accept-necessary-cookies" class="flex-1 border border-white/10 text-white/70 py-3 md:py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all active:scale-95">
                        Nur notwendige
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        setTimeout(() => {
            banner.classList.remove('translate-y-full', 'opacity-0');
        }, 500);

        document.getElementById('accept-all-cookies').addEventListener('click', (e) => this.animateAndAccept('all', e));
        document.getElementById('accept-necessary-cookies').addEventListener('click', () => this.accept('necessary'));
    },

    animateAndAccept(type, event) {
        const icon = document.getElementById('tattoo-machine-icon');
        const button = document.getElementById('accept-all-cookies');
        
        // Visual buzz
        icon.classList.add('buzz-active');
        button.classList.add('buzz-active');

        // Ink drops
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const drop = document.createElement('div');
                drop.className = 'ink-drop';
                const rect = button.getBoundingClientRect();
                drop.style.left = (rect.left + Math.random() * rect.width) + 'px';
                drop.style.top = (rect.top + Math.random() * rect.height) + 'px';
                document.body.appendChild(drop);
                
                const angle = Math.random() * Math.PI * 2;
                const dist = 20 + Math.random() * 40;
                drop.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`, opacity: 0 }
                ], { duration: 600, easing: 'ease-out' }).onfinish = () => drop.remove();
            }, i * 50);
        }

        setTimeout(() => {
            this.accept(type);
        }, 1000);
    },

    accept(type) {
        localStorage.setItem(this.storageKey, JSON.stringify({
            type: type,
            date: new Date().toISOString()
        }));
        
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.add('translate-y-full', 'opacity-0');
            setTimeout(() => banner.remove(), 500);
        }
    }
};
