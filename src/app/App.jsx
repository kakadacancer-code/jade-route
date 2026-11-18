import React, { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { tours as sourceTours } from '../features/journeys/tours.js';
import { AppContext, localizer, translatedTour } from './app-context.jsx';
import { readPreference, removePreference, writePreference } from '../lib/preferences.js';
import { readSaved } from '../features/journeys/journeys.js';
import Home from '../features/home/Home.jsx';
import JourneyPage, { NotFound, QuickPreview } from '../features/journeys/JourneyPage.jsx';
import { Footer, Header, MobileBar } from '../components/SiteChrome.jsx';
import { PrintPlan } from '../features/planner/Planner.jsx';

function RouteEffects() {
  const { hash, pathname, key, state } = useLocation();

  useEffect(() => {
    if (state?.preserveScroll) return;
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [hash, pathname, key, state]);

  return null;
}

export default function App() {
  const [language, setLanguage] = useState(() => readPreference('language', 'en') === 'zh-Hans' ? 'zh-Hans' : 'en');
  const [theme, setTheme] = useState(() => readPreference('theme', 'light') === 'dark' ? 'dark' : 'light');
  const [layout, setLayout] = useState(() => readPreference('layout', 'featured') === 'grid' ? 'grid' : 'featured');
  const [saved, setSaved] = useState(() => {
    try { return readSaved(window.localStorage, sourceTours.map(tour => tour.id)); }
    catch { return []; }
  });
  const [savedPlan, setSavedPlan] = useState(() => readPreference('plan', null));
  const [preview, openPreview] = useState(null);
  const [toast, setToast] = useState(null);
  const tours = useMemo(() => sourceTours.map(tour => translatedTour(tour, language)), [language]);
  const t = useMemo(() => localizer(language), [language]);
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.lang = language;
    writePreference('language', language);
  }, [language]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    writePreference('theme', theme);
  }, [theme]);
  useEffect(() => { writePreference('layout', layout); }, [layout]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  function toggleSaved(id) {
    const remove = saved.includes(id);
    const next = remove ? saved.filter(item => item !== id) : [...saved, id];
    setSaved(next);
    const persisted = writePreference('saved', next);
    setToast({ id, key: persisted ? (remove ? 'toastRemoved' : 'toastSaved') : 'toastStorage' });
  }

  function savePlan(plan) {
    setSavedPlan(plan);
    return writePreference('plan', plan);
  }

  function removeSavedPlan() {
    setSavedPlan(null);
    return removePreference('plan');
  }

  const previewTour = tours.find(tour => tour.id === preview);
  const print = pathname === '/plan/print';

  return <AppContext.Provider value={{ t, language, setLanguage, theme, setTheme, tours, saved, toggleSaved, openPreview, layout, setLayout, savedPlan, savePlan, removeSavedPlan }}>
    <RouteEffects />
    {!print && <Header />}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/journey/:slug" element={<JourneyPage />} />
      <Route path="/plan/print" element={<PrintPlan />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    {!print && <><Footer /><MobileBar /></>}
    {previewTour && <QuickPreview tour={previewTour} close={() => openPreview(null)} />}
    <div className="toast-container" role="status">{toast && <div className="toast">
      <span aria-hidden="true">{toast.key === 'toastRemoved' ? '♡' : '✓'}</span>
      {t(toast.key, { name: tours.find(tour => tour.id === toast.id)?.name })}
    </div>}</div>
  </AppContext.Provider>;
}
