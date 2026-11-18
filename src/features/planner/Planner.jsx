import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Scene from '../../components/Scene.jsx';
import { formatPrice, journeyPath, useApp } from '../../app/app-context.jsx';
import { Timeline } from '../journeys/JourneyPage.jsx';

const blank = { tourId: '', date: '', travelers: '2', notes: '' };

function localDay(date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

function tripDate(date, language, offset = 0) {
  const instant = new Date(Date.parse(date) + offset * 86400000);
  return new Intl.DateTimeFormat(language, { dateStyle: 'medium', timeZone: 'UTC' }).format(instant);
}

function TripSummary({ plan, tour, printable = false }) {
  const { language, t } = useApp();
  const [today, setToday] = useState(() => localDay(new Date()));
  useEffect(() => {
    if (printable) return;
    const timer = setInterval(() => setToday(localDay(new Date())), 60000);
    return () => clearInterval(timer);
  }, [printable]);
  const daysLeft = (Date.parse(plan.date) - today) / 86400000;
  const dates = tour.duration > 1
    ? `${tripDate(plan.date, language)} – ${tripDate(plan.date, language, tour.duration - 1)}`
    : tripDate(plan.date, language);
  return <article className="plan-summary">
    <div className="plan-photo"><Scene key={tour.id} language={language} kind={tour.id} /></div>
    <div className="plan-summary-copy">
      <p className="label">{t('tripSummary')}</p><h3>{tour.name}</h3>
      <dl className="trip-facts">
        <div><dt>{t('travelDates')}</dt><dd>{dates}</dd></div>
        <div><dt>{t('travelers')}</dt><dd>{plan.travelers}</dd></div>
        <div><dt>{t('estimatedTotal')}</dt><dd>{formatPrice(tour.price * Number(plan.travelers), language)}</dd></div>
      </dl>
      {!printable && <p className="countdown">{daysLeft > 0 ? t(daysLeft === 1 ? 'oneDayLeft' : 'countdown', { days: daysLeft }) : t(daysLeft === 0 ? 'departToday' : 'departurePassed')}</p>}
      {plan.notes && <p className="trip-notes">{plan.notes}</p>}
      {!printable && <Link className="button" to="/plan/print">{t('printItinerary')} ↗</Link>}
    </div>
  </article>;
}

export function PrintPlan() {
  const { t, tours, savedPlan: plan } = useApp();
  const tour = tours.find(item => item.id === plan?.tourId);
  return <main id="main" className="wrap print-page">
    <Link className="breadcrumb no-print" to="/#planner">← {t('planner')}</Link>
    <h1>{t('printTitle')}</h1>
    {tour && Number.isFinite(Date.parse(plan.date)) ? <>
      <TripSummary plan={plan} tour={tour} printable />
      <h2>{t('dayByDay')}</h2><Timeline tour={tour} />
      <p>{t('planningEstimate')}</p>
      <button className="button no-print" type="button" onClick={() => window.print()}>{t('printSavePdf')}</button>
    </> : <p>{t('noPlan')}</p>}
  </main>;
}

export default function Planner({ requestedTour }) {
  const { t, tours, savedPlan, savePlan } = useApp();
  const [draft, setDraft] = useState(() => ({ ...blank, ...savedPlan }));
  const [status, setStatus] = useState('');
  const journey = tours.find(tour => tour.id === draft.tourId);
  const savedJourney = tours.find(tour => tour.id === savedPlan?.tourId);
  const validRequest = tours.some(tour => tour.id === requestedTour) ? requestedTour : '';

  useEffect(() => {
    if (!validRequest) return;
    setDraft(previous => ({ ...previous, tourId: validRequest }));
    setStatus('');
  }, [validRequest]);

  function update(event) {
    const { name, value } = event.target;
    setDraft(previous => ({ ...previous, [name]: value }));
    setStatus('');
  }

  function save(event) {
    event.preventDefault();
    setStatus(savePlan(draft) ? 'planSaved' : 'planTemporary');
  }

  return <section id="planner" className="wrap section planner" aria-labelledby="planner-title">
    <div className="planner-panel">
      <div className="section-heading">
        <p className="label">{t('planner')}</p><h2 id="planner-title">{t('plannerTitle')}</h2><p>{t('plannerCopy')}</p>
        {journey && <Link className="inline-link" to={journeyPath(journey)}>{t('viewJourney')} ↗</Link>}
      </div>
      <form className="planner-form" onSubmit={save}>
        <label className="wide">{t('journey')}
          <select name="tourId" required value={draft.tourId} onChange={update}>
            <option value="">{t('chooseJourney')}</option>
            {tours.map(tour => <option key={tour.id} value={tour.id}>{tour.name}</option>)}
          </select>
        </label>
        <label>{t('departureDate')}<input name="date" type="date" required value={draft.date} onChange={update} /></label>
        <label>{t('travelers')}<input name="travelers" type="number" min="1" max={journey?.groupSize ?? 99} required value={draft.travelers} onChange={update} /></label>
        <label className="wide">{t('notesOptional')}<textarea name="notes" rows="4" maxLength="1000" value={draft.notes} onChange={update} placeholder={t('notesPlaceholder')} /></label>
        <div className="planner-actions wide"><button className="button" type="submit">{t('savePlan')}</button><span role="status">{status && t(status)}</span></div>
      </form>
    </div>
    {savedJourney && Number.isFinite(Date.parse(savedPlan.date)) && <TripSummary plan={savedPlan} tour={savedJourney} />}
  </section>;
}
