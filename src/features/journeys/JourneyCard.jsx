import React from 'react';
import { Link } from 'react-router-dom';
import Scene from '../../components/Scene.jsx';
import { formatPrice, journeyPath, useApp } from '../../app/app-context.jsx';

export function JourneyBadges({ tour }) {
  const { t, language } = useApp();
  return <div className="badges">
    <span>{t('fromPrice', { price: formatPrice(tour.price, language) })}</span>
    <span><span aria-hidden="true">★ </span>{t('ratingValue', { rating: tour.rating.toFixed(1) })}</span>
    <span>{t('durationValue', { days: tour.duration })}</span>
    <span>{t(tour.bestSeason)}</span>
  </div>;
}

export default function JourneyCard({ tour, compare, onCompare }) {
  const { t, language, saved, toggleSaved, openPreview } = useApp();
  const isSaved = saved.includes(tour.id);
  return <article className="journey-card">
    <div className="card-photo">
      <Link to={journeyPath(tour)} tabIndex={-1} aria-hidden="true"><Scene kind={tour.id} language={language} /></Link>
      <span className="photo-tag">{t(tour.type)}</span>
      <button className="icon-button save-card" type="button" aria-label={t('saveJourney', { name: tour.name })} aria-pressed={isSaved} onClick={() => toggleSaved(tour.id)}>{isSaved ? '♥' : '♡'}</button>
    </div>
    <div className="card-content">
      <p className="label">{tour.region}</p>
      <h3><Link to={journeyPath(tour)}>{tour.name}</Link></h3>
      <p>{tour.description}</p>
      <JourneyBadges tour={tour} />
      <div className="card-actions">
        <Link to={journeyPath(tour)}>{t('viewJourney')} <span aria-hidden="true">↗</span></Link>
        <button type="button" className="quiet-button" onClick={() => openPreview(tour.id)}>{t('quickPreview')}</button>
      </div>
      {onCompare && <label className="checkbox"><input type="checkbox" checked={compare} onChange={onCompare} />{t('compareJourney')}</label>}
    </div>
  </article>;
}
