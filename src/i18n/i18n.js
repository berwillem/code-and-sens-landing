import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import frTranslation from './locales/fr/translation.json';
import arTranslation from './locales/ar/translation.json';

const resources = {
  en: { translation: enTranslation },
  fr: { translation: frTranslation },
  ar: { translation: arTranslation }
};

const userLang = navigator.language || navigator.userLanguage;
const defaultLang = userLang.split('-')[0];
const supportedLangs = ['en', 'fr', 'ar'];
const initialLang = supportedLangs.includes(defaultLang) ? defaultLang : 'fr';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLang, // default language based on browser
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

// Event listener to change document direction on language change
i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = i18n.dir(lng);
  document.documentElement.lang = lng;
});

// Set initial direction
document.documentElement.dir = i18n.dir(i18n.language);
document.documentElement.lang = i18n.language;

export default i18n;
