// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const langToggle = document.querySelector('.lang-toggle');
const htmlElement = document.documentElement;

// Import translations
import { translations, languageDirection } from './translations.js';

// Theme handling
let currentTheme = localStorage.getItem('theme') || 'light';
function setTheme(theme) {
  htmlElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  currentTheme = theme;
}
setTheme(currentTheme);

themeToggle?.addEventListener('click', () => {
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
});

// Language handling
let currentLang = localStorage.getItem('lang') || 'en';
function setLanguage(lang) {
  htmlElement.setAttribute('dir', languageDirection[lang]);
  htmlElement.setAttribute('lang', lang);
  localStorage.setItem('lang', lang);
  currentLang = lang;
  updateTranslations();
}
setLanguage(currentLang);

langToggle?.addEventListener('click', () => {
  const newLang = currentLang === 'en' ? 'he' : 'en';
  setLanguage(newLang);
});

// Update translations on the page
function updateTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      if (element.tagName === 'INPUT' && element.type === 'submit') {
        element.value = translations[currentLang][key];
      } else {
        element.textContent = translations[currentLang][key];
      }
    }
  });
}

// FINA Points Calculator
const calculateFinaPoints = (time, baseTime) => {
  const timeInSeconds = typeof time === 'string' 
    ? time.split(':').reduce((acc, val) => acc * 60 + parseFloat(val), 0)
    : time;
  const baseTimeInSeconds = typeof baseTime === 'string'
    ? baseTime.split(':').reduce((acc, val) => acc * 60 + parseFloat(val), 0)
    : baseTime;
  
  return Math.round(1000 * Math.pow(baseTimeInSeconds / timeInSeconds, 3));
};

// Format time string
const formatTime = (timeStr) => {
  const parts = timeStr.split(':');
  if (parts.length === 1) {
    return parseFloat(parts[0]).toFixed(2);
  }
  return `${parts[0]}:${parseFloat(parts[1]).toFixed(2)}`;
};

// Export functions for use in other files
export { calculateFinaPoints, formatTime };