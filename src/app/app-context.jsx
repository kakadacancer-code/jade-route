import { createContext, useContext } from 'react';
import en from '../i18n/en.json';
import zh from '../i18n/zh.json';
import journeyDetailsZh from '../features/journeys/journey-details-zh.json';
import { localizeTour } from '../features/journeys/tour-translations.js';

export const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export function localizer(language) {
  const messages = language === 'zh-Hans' ? zh : en;
  return (key, values = {}) => (messages[key] ?? en[key] ?? key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? '');
}

export function translatedTour(tour, language) {
  if (language === 'en') return tour;
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
