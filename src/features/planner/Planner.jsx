import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Scene from '../../components/Scene.jsx';
import { formatPrice, journeyPath, useApp } from '../../app/app-context.jsx';
import { places, placeRegions } from '../places/places.js';
import { placeVisits } from '../places/place-visits.js';
import { destinationIds, destinationValue, resolveDestination } from './plan-destination.js';
import PlanFields, { emptyPlan } from './PlanFields.jsx';
import { Timeline } from '../journeys/JourneyPage.jsx';

function localDay(date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

function tripDate(date, language, offset = 0) {
  const instant = new Date(Date.parse(date) + offset * 86400000);
  return new Intl.DateTimeFormat(language, { dateStyle: 'medium', timeZone: 'UTC' }).format(instant);
}

function TripSummary({ plan, tour, place, onRemove, printable = false }) {
  const { language, t } = useApp();
  const [today, setToday] = useState(() => localDay(new Date()));
  useEffect(() => {
    if (printable) return;
    const timer = setInterval(() => setToday(localDay(new Date())), 60000);
    return () => clearInterval(timer);
  }, [printable]);
  const daysLeft = (Date.parse(plan.date) - today) / 86400000;
  const dates = tour?.duration > 1
    ? `${tripDate(plan.date, language)} – ${tripDate(plan.date, language, tour.duration - 1)}`
    : tripDate(plan.date, language);
  const name = tour?.name ?? (language === 'zh-Hans' ? place.chineseName : place.name);
  return <article className="plan-summary">
    <div className="plan-photo">{place
      ? <Scene key={place.id} photo={{ id: place.id, file: `places/${place.id}.webp` }} decorative />
      : <Scene key={tour.id} language={language} kind={tour.id} />}
    </div>
    <div className="plan-summary-copy">
      <p className="label">{t('tripSummary')}</p><h3>{name}</h3>
      <dl className="trip-facts">
        <div><dt>{t(place ? 'visitDate' : 'travelDates')}</dt><dd>{dates}</dd></div>
        <div><dt>{t('travelers')}</dt><dd>{plan.travelers}</dd></div>
        {tour && <div><dt>{t('estimatedTotal')}</dt><dd>{formatPrice(tour.price * Number(plan.travelers), language)}</dd></div>}
      </dl>
      {!printable && <p className="countdown">{daysLeft > 0 ? t(daysLeft === 1 ? 'oneDayLeft' : 'countdown', { days: daysLeft }) : t(daysLeft === 0 ? 'departToday' : 'departurePassed')}</p>}
      {plan.notes && <p className="trip-notes">{plan.notes}</p>}
      {!printable && <div className="plan-summary-actions">
        <Link className="button" to="/plan/print">{t('printItinerary')} ↗</Link>
        <button className="button secondary" type="button" onClick={onRemove}>{t('removeSavedPlan')}</button>
      </div>}
    </div>
  </article>;
}

export function PrintPlan() {
  const { t, tours, savedPlan: plan } = useApp();
  const { tour, place } = resolveDestination(plan, tours);
  return <main id="main" className="wrap print-page">
    <Link className="breadcrumb no-print" to="/#planner">← {t('planner')}</Link>
    <h1>{t('printTitle')}</h1>
    {(tour || place) && Number.isFinite(Date.parse(plan.date)) ? <>
      <TripSummary plan={plan} tour={tour} place={place} printable />
      {tour ? <><h2>{t('dayByDay')}</h2><Timeline tour={tour} /><p>{t('planningEstimate')}</p></> : <VisitPlan place={place} />}
      <button className="button no-print" type="button" onClick={() => window.print()}>{t('printSavePdf')}</button>
    </> : <p>{t('noPlan')}</p>}
  </main>;
}

function VisitPlan({ place }) {
  const { t, language } = useApp();
  const [start, chineseStart, tip, chineseTip] = placeVisits[place.id];
  const chinese = language === 'zh-Hans';
  return <section>
    <h2>{t('placeVisitDetails')}</h2>
    <dl className="place-visit-facts">
      <div><dt>{t('placeVisitStart')}</dt><dd>{chinese ? chineseStart : start}</dd></div>
      <div><dt>{t('placeVisitSee')}</dt><dd>{chinese ? place.chineseDescription : place.description}</dd></div>
      <div><dt>{t('placeVisitTip')}</dt><dd>{chinese ? chineseTip : tip}</dd></div>
    </dl>
  </section>;
}

export default function Planner({ requestedTour, requestedPlace }) {
  const { t, language, tours, savedPlan, savePlan, removeSavedPlan } = useApp();
  const [draft, setDraft] = useState(() => ({ ...emptyPlan, ...savedPlan }));
  const [status, setStatus] = useState('');
  const saveButton = useRef(null);
  const { tour: journey } = resolveDestination(draft, tours);
  const savedDestination = resolveDestination(savedPlan, tours);
  const validRequest = places.some(place => place.id === requestedPlace)
    ? destinationValue({ placeId: requestedPlace })
    : tours.some(tour => tour.id === requestedTour) ? requestedTour : '';

  useEffect(() => {
    if (!validRequest) return;
    setDraft(previous => ({ ...previous, ...destinationIds(validRequest) }));
    setStatus('');
  }, [validRequest]);

  function update(event) {
    const { name, value } = event.target;
    const change = name === 'destination' ? destinationIds(value) : { [name]: value };
    setDraft(previous => ({ ...previous, ...change }));
    setStatus('');
  }

  function save(event) {
    event.preventDefault();
    setStatus(savePlan(draft) ? 'planSaved' : 'planTemporary');
  }

  function remove() {
    setStatus(removeSavedPlan() ? 'planRemoved' : 'planRemovedTemporary');
    saveButton.current?.focus();
  }

  return <section id="planner" className="wrap section planner" aria-labelledby="planner-title">
    <div className="planner-panel">
      <div className="section-heading">
        <p className="label">{t('planner')}</p><h2 id="planner-title">{t('plannerTitle')}</h2><p>{t('plannerCopy')}</p>
        {journey && <Link className="inline-link" to={journeyPath(journey)}>{t('viewJourney')} ↗</Link>}
      </div>
      <form className="planner-form" onSubmit={save}>
        <label className="wide">{t('plannerDestination')}
          <select name="destination" required value={destinationValue(draft)} onChange={update}>
            <option value="">{t('choosePlanDestination')}</option>
            <optgroup label={t('curatedJourneys')}>
              {tours.map(tour => <option key={tour.id} value={tour.id}>{tour.name}</option>)}
            </optgroup>
            {placeRegions.map(region => <optgroup key={region} label={t(region)}>
              {places.filter(place => place.region === region).map(place =>
                <option key={place.id} value={destinationValue({ placeId: place.id })}>{language === 'zh-Hans' ? place.chineseName : place.name}</option>
              )}
            </optgroup>)}
          </select>
        </label>
        <PlanFields draft={draft} maxTravelers={journey?.groupSize ?? 99} onChange={update} />
        <div className="planner-actions wide"><button ref={saveButton} className="button" type="submit">{t('savePlan')}</button><span role="status">{status && t(status)}</span></div>
      </form>
    </div>
    {(savedDestination.tour || savedDestination.place) && Number.isFinite(Date.parse(savedPlan.date)) && <TripSummary plan={savedPlan} {...savedDestination} onRemove={remove} />}
  </section>;
}
