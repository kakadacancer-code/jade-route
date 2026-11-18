import { createContext, useContext } from 'react';
import en from '../i18n/en.json';
import km from '../i18n/km.json';
import zh from '../i18n/zh.json';
import journeyDetailsKm from '../features/journeys/journey-details-km.json';
import journeyDetailsZh from '../features/journeys/journey-details-zh.json';
import { localizeTour } from '../features/journeys/tour-translations.js';

export const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);
const messagesByLanguage = { en, km, 'zh-Hans': zh };

export function localizer(language) {
  const messages = messagesByLanguage[language] ?? en;
  return (key, values = {}) => (messages[key] ?? en[key] ?? key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? '');
}

export function translatedTour(tour, language) {
  if (language === 'km') return { ...tour, ...journeyDetailsKm[tour.id] };
  if (language !== 'zh-Hans') return tour;
  const [highlights, included, notIncluded] = journeyDetailsZh[tour.id];
  return { ...localizeTour(tour, language), highlights, included, notIncluded };
}

export function formatPrice(value, language) {
  return new Intl.NumberFormat(language === 'en' ? 'en-US' : language, {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0,
  }).format(value);
}

export function monthName(month, language, format = 'long') {
  return new Intl.DateTimeFormat(language, { month: format, timeZone: 'UTC' }).format(new Date(Date.UTC(2024, month - 1, 1)));
}

export const journeyPath = tour => `/journey/${tour.slug}`;
