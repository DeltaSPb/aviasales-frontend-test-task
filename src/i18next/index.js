import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import ru from './locales/ru';

i18n
  .use(initReactI18next)
  .use(intervalPlural)
  .init({
    debug: process.env.NODE_ENV !== 'production',
    lng: 'ru',
    resources: {
      ru,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
