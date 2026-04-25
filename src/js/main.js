import "../styles/main.css";
import { initVideoScroll } from "./video-scroll.js";
import { AuthService } from "./auth.js";
import { LanguageService } from "./language.js";
import { CookieService } from "./cookies.js";

document.addEventListener("DOMContentLoaded", () => {
  window.LanguageService = LanguageService;
  initVideoScroll();
  initAuthUI();
  initLanguageUI();
  initHeroAnimations();
  CookieService.init();

  // Mobile Menu Logic
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('menu-icon');
  
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      icon.textContent = menu.classList.contains('open') ? 'close' : 'menu';
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        icon.textContent = 'menu';
        document.body.style.overflow = '';
      });
    });
  }
});

function initHeroAnimations() {
  const heroVideo = document.getElementById('hero-video');
  const isMobile = window.innerWidth < 768;

  if (heroVideo) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        // Smooth parallax for video - enabled for mobile too
        heroVideo.style.transform = `translateY(${scrolled * 0.3}px)`;
        // Fade out overlay content gradually
        const opacity = 1 - (scrolled / (window.innerHeight * 0.6));
        if (heroText) heroText.style.opacity = Math.max(0, opacity);
      }
    });
  }
}

function initLanguageUI() {
  LanguageService.init();
  const langOptions = document.querySelectorAll('.lang-option, .lang-option-mobile');
  const currentLangDisplay = document.getElementById('current-lang-name');

  langOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const lang = opt.getAttribute('data-lang');
      const name = opt.innerText;
      LanguageService.changeLanguage(lang);
      if (currentLangDisplay) currentLangDisplay.innerText = name;
      
      // Close mobile menu if open
      const menu = document.getElementById('mobile-menu');
      const icon = document.getElementById('menu-icon');
      if (menu && menu.classList.contains('open')) {
          menu.classList.remove('open');
          if (icon) icon.textContent = 'menu';
          document.body.style.overflow = '';
      }
    });
  });

  // Load saved language
  const savedLang = localStorage.getItem('feinstecher_lang') || 'de';
  const savedLangObj = LanguageService.languages.find(l => l.code === savedLang);
  if (savedLangObj && currentLangDisplay) {
    currentLangDisplay.innerText = savedLangObj.name;
  }
}

function initAuthUI() {
  const isLoggedIn = AuthService.isLoggedIn();
  const loginLink = document.getElementById('login-link');
  const profileLink = document.getElementById('profile-link');
  const mobileAuthLinks = document.querySelectorAll('.auth-mobile-link');

  if (isLoggedIn) {
    if (loginLink) loginLink.classList.add('hidden');
    if (profileLink) profileLink.classList.remove('hidden');
    
    mobileAuthLinks.forEach(link => {
        if (link.getAttribute('href') === 'login.html') link.classList.add('hidden');
        if (link.getAttribute('href') === 'profile.html') link.classList.remove('hidden');
    });
  } else {
    if (loginLink) loginLink.classList.remove('hidden');
    if (profileLink) profileLink.classList.add('hidden');

    mobileAuthLinks.forEach(link => {
        if (link.getAttribute('href') === 'login.html') link.classList.remove('hidden');
        if (link.getAttribute('href') === 'profile.html') link.classList.add('hidden');
    });
  }
}
