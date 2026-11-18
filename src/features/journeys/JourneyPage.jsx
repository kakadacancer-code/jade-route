import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Scene from '../../components/Scene.jsx';
import placePhotos from '../places/place-photos.json';
import { formatPrice, journeyPath, monthName, useApp } from '../../app/app-context.jsx';
import PlanFields, { emptyPlan } from '../planner/PlanFields.jsx';
import JourneyCard, { JourneyBadges } from './JourneyCard.jsx';

export function Timeline({ tour }) {
  const { t } = useApp();
  return <ol className="timeline">{tour.days.map((day, index) => <li key={index}>
    <span className="timeline-marker" aria-hidden="true">{index + 1}</span>
    <div><h3>{t('dayNumber', { day: index + 1 })}</h3><p>{day}</p></div>
  </li>)}</ol>;
}

export function NotFound() {
  const { t } = useApp();
  return <main id="main" className="wrap not-found">
    <p className="label">404</p><h1>{t('notFoundTitle')}</h1><p>{t('notFoundCopy')}</p>
    <Link className="button" to="/#journeys">{t('exploreJourneys')} ↗</Link>
  </main>;
}

function Gallery({ tour }) {
  const { t, language } = useApp();
  const [active, setActive] = useState(0);
  const photo = tour.gallery[active];
  const credit = photo.file ? placePhotos[photo.id] : null;
  return <section className="gallery" aria-label={t('gallery')}>
    <div className="gallery-feature">
      <Scene kind={tour.id} language={language} photo={photo} priority key={photo.id} />
      <a href={credit?.source || photo.source} target="_blank" rel="noreferrer" className="photo-tag">{t(photo.file ? 'placePhotoSource' : 'photoSource')} ↗</a>
    </div>
    {credit && <p className="sample-note">
      {credit.creator} · <a className="breadcrumb" href={credit.licenseUrl || credit.source}>{credit.license}</a> · {t('placePhotoResized')}
    </p>}
    <div className="gallery-thumbnails">{tour.gallery.map((image, index) =>
      <button type="button" key={image.id} aria-label={t('showPhoto', { number: index + 1 })} aria-pressed={active === index} onClick={() => setActive(index)}>
        <Scene kind={tour.id} language={language} photo={image} sizes="(max-width: 460px) 26vw, 120px" decorative />
      </button>
    )}</div>
  </section>;
}

function Inclusions({ tour }) {
  const { t } = useApp();
  return <div className="inclusions">
    <section><h2>{t('included')}</h2><ul>{tour.included.map(item => <li key={item}><span aria-hidden="true">✓</span> {item}</li>)}</ul></section>
    <section><h2>{t('notIncluded')}</h2><ul>{tour.notIncluded.map(item => <li key={item}><span aria-hidden="true">−</span> {item}</li>)}</ul></section>
  </div>;
}

function JourneyPlanForm({ tour }) {
  const { t, savedPlan, savePlan } = useApp();
  const [draft, setDraft] = useState(() => savedPlan?.tourId === tour.id && !savedPlan.placeId
    ? { ...emptyPlan, ...savedPlan }
    : { ...emptyPlan, tourId: tour.id });
  const [status, setStatus] = useState('');

  function update(event) {
    const { name, value } = event.target;
    setDraft(previous => ({ ...previous, [name]: value }));
    setStatus('');
  }

  function save(event) {
    event.preventDefault();
    setStatus(savePlan(draft) ? 'planSaved' : 'planTemporary');
  }

  return <section id="journey-planner" className="journey-planner" aria-labelledby="journey-planner-title">
    <h2 id="journey-planner-title">{t('plannerTitle')}</h2>
    <form className="planner-form" onSubmit={save}>
      <PlanFields draft={draft} maxTravelers={tour.groupSize} onChange={update} />
      <button className="button wide" type="submit">{t('savePlan')}</button>
      <div className="planner-actions wide" role="status">{status && t(status)}</div>
      {status && <Link className="breadcrumb wide" to="/#planner">{t('planner')} ↗</Link>}
    </form>
  </section>;
}

function JourneyDetails({ tour }) {
  const { t, language, tours, saved, toggleSaved } = useApp();
  const isSaved = saved.includes(tour.id);
  const related = tours.filter(item => item.id !== tour.id).sort((a, b) => Number(b.type === tour.type) - Number(a.type === tour.type)).slice(0, 3);

  return <main id="main" className="wrap journey-page">
    <Link className="breadcrumb" to="/#journeys">← {t('exploreJourneys')}</Link>
    <p className="label">{tour.region} · {t(tour.type)}</p>
    <h1>{tour.name}</h1>
    <JourneyBadges tour={tour} />
    <p className="sample-note">{t('sampleReviews', { count: tour.reviews })}</p>
    <Gallery tour={tour} />
    <div className="journey-body">
      <div className="journey-description">
        <section><h2>{t('aboutJourney')}</h2><p>{tour.description}</p>
          <ul className="highlight-list">{tour.highlights.map(item => <li key={item}>{item}</li>)}</ul>
          <dl className="trip-facts">
            <div><dt>{t('difficulty')}</dt><dd>{t(tour.difficulty)}</dd></div>
            <div><dt>{t('bestMonths')}</dt><dd>{tour.months.map(month => monthName(month, language)).join(t('listSeparator'))}</dd></div>
            <div><dt>{t('groupSize')}</dt><dd>{t('groupValue', { count: tour.groupSize })}</dd></div>
          </dl>
        </section>
        <section><h2>{t('dayByDay')}</h2><Timeline tour={tour} /></section>
        <Inclusions tour={tour} />
      </div>
      <aside className="journey-sidebar" aria-label={t('planTrip')}>
        <div className="booking-box">
          <strong>{t('fromPrice', { price: formatPrice(tour.price, language) })}</strong>
          <p>{t('planningEstimate')}</p>
          <Link className="button" to="#journey-planner">{t('planTrip')} ↓</Link>
          <button className="button secondary" type="button" aria-pressed={isSaved} onClick={() => toggleSaved(tour.id)}>{isSaved ? t('removeSaved') : t('saveTrip')}</button>
        </div>
        <JourneyPlanForm tour={tour} />
      </aside>
    </div>
    <section className="section journey-related">
      <h2>{t('relatedJourneys')}</h2>
      <div className="journey-grid">{related.map(item => <JourneyCard key={item.id} tour={item} />)}</div>
    </section>
  </main>;
}

export default function JourneyPage() {
  const { slug } = useParams();
  const { tours } = useApp();
  const tour = tours.find(item => item.slug === slug);
  return tour ? <JourneyDetails key={tour.id} tour={tour} /> : <NotFound />;
}

export function QuickPreview({ tour, close }) {
  const { t, language } = useApp();
  const ref = React.useRef(null);
  React.useEffect(() => {
    const modal = ref.current;
    const trigger = document.activeElement;
    modal.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      modal.close();
      document.body.style.overflow = overflow;
      if (trigger?.isConnected) trigger.focus();
    };
  }, []);

  return <dialog ref={ref} aria-labelledby="preview-title" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
    <div className="preview-content">
      <button className="icon-button dialog-close" type="button" onClick={close} aria-label={t('close')}>×</button>
      <div className="preview-photo"><Scene kind={tour.id} language={language} /></div>
      <div className="preview-copy">
        <p className="label">{tour.region}</p><h2 id="preview-title">{tour.name}</h2><p>{tour.description}</p>
        <JourneyBadges tour={tour} /><Timeline tour={tour} />
        <Link className="button" to={journeyPath(tour)} onClick={close}>{t('viewJourney')} ↗</Link>
      </div>
    </div>
  </dialog>;
}
