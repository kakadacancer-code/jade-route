import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { monthName, useApp } from '../../app/app-context.jsx';
import { findPlaces, placeRegions, placeTypes } from './places.js';
import { placeVisits } from './place-visits.js';
import placePhotos from './place-photos.json';
import './places.css';

const pageSize = 12;
const initialFilters = { query: '', region: '', type: '', unescoOnly: false };

const adviceLinks = {
  jiuzhaiAccess: 'https://en.jiuzhai.com/about/visitor-information',
  tibetAdvice: 'https://www.gov.uk/foreign-travel-advice/china/regional-risks',
};

function FilterChips({ label, options, selected, onChange, allLabel }) {
  const { t } = useApp();
  return <fieldset className="places-chips">
    <legend>{label}</legend>
    <div>
      <button className="chip" type="button" aria-pressed={!selected} onClick={() => onChange('')}>{allLabel}</button>
      {options.map(option => <button className="chip" type="button" key={option} aria-pressed={selected === option} onClick={() => onChange(option)}>{t(option)}</button>)}
    </div>
  </fieldset>;
}

function PlaceImage({ place, photo }) {
  const [status, setStatus] = useState(photo ? 'loading' : 'unavailable');

  return <div className="place-banner" data-status={status} aria-hidden="true">
    <span lang="zh-Hans">{place.chineseName}</span>
    {photo && status !== 'unavailable' && <img
      src={`${import.meta.env.BASE_URL}places/${place.id}.webp`}
      alt=""
      loading="lazy"
      decoding="async"
      onLoad={() => setStatus('loaded')}
      onError={() => setStatus('unavailable')}
    />}
  </div>;
}

function PhotoCredit({ photo }) {
  const { t } = useApp();
  return <details className="place-photo-credit">
    <summary>{t('placePhotoCredit')}</summary>
    <p>{photo.creator && <>{photo.creator} · </>}<a href={photo.source}>{t('placePhotoSource')}</a> · {photo.licenseUrl
      ? <a href={photo.licenseUrl}>{photo.license}</a>
      : photo.license} · {t('placePhotoResized')}</p>
  </details>;
}

function PlaceCard({ place, onVisit }) {
  const { t, language } = useApp();
  const chinese = language === 'zh-Hans';
  const months = place.bestMonths.map(month => monthName(month, language, 'short')).join(t('listSeparator'));
  const photo = placePhotos[place.id];
  return <article className="place-card" data-type={place.type}>
    <PlaceImage place={place} photo={photo} />
    <div className="place-card-copy">
      <div className="place-badges"><span>{t(place.type)}</span>{place.unesco && <span className="unesco-badge">{t('unescoBadge')}</span>}</div>
      <h3>{chinese ? place.chineseName : place.name}</h3>
      <p className="place-alternate" lang={chinese ? 'en' : 'zh-Hans'}>{chinese ? place.name : place.chineseName}</p>
      <p className="place-location">{chinese ? place.chineseProvince : place.province} · {t(place.region)}</p>
      <p className="place-description">{chinese ? place.chineseDescription : place.description}</p>
      {place.advice && <a className="place-advice" href={adviceLinks[place.advice]}>{t(place.advice)} ↗</a>}
      <dl className="place-months"><dt>{t('bestMonths')}</dt><dd>{months}</dd></dl>
      <button className="button place-visit-button" type="button" aria-haspopup="dialog" aria-label={t('placeVisitFor', { name: chinese ? place.chineseName : place.name })} onClick={event => onVisit(place, event.currentTarget)}>
        {t('placeVisitDetails')} <span aria-hidden="true">↗</span>
      </button>
      {photo && <PhotoCredit photo={photo} />}
    </div>
  </article>;
}

function VisitDetails({ place, trigger, onClose }) {
  const { t, language } = useApp();
  const chinese = language === 'zh-Hans';
  const [start, chineseStart, tip, chineseTip] = placeVisits[place.id];
  const name = chinese ? place.chineseName : place.name;
  const startPoint = chinese ? chineseStart : start;
  const map = new URL('https://www.google.com/maps/search/');
  map.search = new URLSearchParams({ api: '1', query: startPoint });
  const dialog = useRef(null);

  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [trigger]);

  return <dialog
    ref={dialog}
    className="place-visit-dialog"
    aria-labelledby="visit-place-title"
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}
  >
    <div className="place-visit-content">
      <button className="icon-button dialog-close" type="button" onClick={onClose} aria-label={t('placeVisitClose')}>×</button>
      <div className="place-visit-photo"><PlaceImage place={place} photo={placePhotos[place.id]} /></div>
      <p className="label">{t('placeVisitDetails')}</p>
      <h2 id="visit-place-title">{name}</h2>
      <p className="place-alternate" lang={chinese ? 'en' : 'zh-Hans'}>{chinese ? place.name : place.chineseName}</p>
      <dl className="place-visit-facts">
        <div><dt>{t('placeVisitStart')}</dt><dd>{startPoint}</dd>
          {!chinese && <dd className="place-visit-local-name" lang="zh-Hans">{chineseStart}</dd>}
        </div>
        <div><dt>{t('bestMonths')}</dt><dd>{place.bestMonths.map(month => monthName(month, language)).join(t('listSeparator'))}</dd></div>
        <div><dt>{t('placeVisitSee')}</dt><dd>{chinese ? place.chineseDescription : place.description}</dd></div>
        <div><dt>{t('placeVisitTip')}</dt><dd>{chinese ? chineseTip : tip}</dd></div>
      </dl>
      <div className="place-visit-actions">
        <Link className="button" to={`/?place=${place.id}#planner`} onClick={onClose}>{t('planThisVisit')} ↗</Link>
        <a className="button secondary" href={map.href} target="_blank" rel="noreferrer">{t('placeVisitMap')} ↗</a>
        {place.advice && <a className="place-advice" href={adviceLinks[place.advice]}>{t(place.advice)} ↗</a>}
      </div>
    </div>
  </dialog>;
}

export default function Places() {
  const { t } = useApp();
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [visit, setVisit] = useState(null);
  const resultCount = useRef(null);
  const focusResults = useRef(false);
  const matching = findPlaces(filters);
  const start = (page - 1) * pageSize;
  const visible = matching.slice(start, start + pageSize);
  const pageCount = Math.ceil(matching.length / pageSize);
  const hasFilters = Boolean(filters.query || filters.region || filters.type || filters.unescoOnly);

  useEffect(() => {
    if (!focusResults.current) return;
    resultCount.current?.focus({ preventScroll: true });
    resultCount.current?.scrollIntoView({ block: 'start' });
    focusResults.current = false;
  }, [page]);

  function goToPage(next) {
    if (next === page) return;
    focusResults.current = true;
    setPage(next);
  }

  function filterBy(key, value) {
    setFilters(current => ({ ...current, [key]: value }));
    setPage(1);
  }

  function reset() {
    setFilters(initialFilters);
    setPage(1);
  }

  return <section id="places" className="wrap section places" aria-labelledby="places-title">
    <div className="section-heading">
      <p className="label">{t('placesDirectory')}</p>
      <h2 id="places-title">{t('placesTitle')}</h2>
      <p>{t('placesIntro')}</p>
    </div>
    <div className="places-controls">
      <div className="places-search-row">
        <label className="places-search">
          {t('searchPlaces')}
          <input type="search" value={filters.query} placeholder={t('placesPlaceholder')} onChange={event => filterBy('query', event.target.value)} />
        </label>
        <label className="checkbox places-unesco"><input type="checkbox" checked={filters.unescoOnly} onChange={event => filterBy('unescoOnly', event.target.checked)} />{t('unescoOnly')}</label>
      </div>
      <FilterChips label={t('placesRegion')} options={placeRegions} selected={filters.region} onChange={value => filterBy('region', value)} allLabel={t('allRegions')} />
      <FilterChips label={t('placesType')} options={placeTypes} selected={filters.type} onChange={value => filterBy('type', value)} allLabel={t('allTypes')} />
    </div>
    <div className="result-row">
      <p ref={resultCount} role="status" tabIndex={-1}>{t(matching.length === 1 ? 'onePlaceResult' : 'placesResultCount', {
        first: matching.length ? start + 1 : 0,
        last: start + visible.length,
        total: matching.length,
      })}</p>
      {hasFilters && <button className="quiet-button" type="button" onClick={reset}>{t('resetFilters')}</button>}
    </div>
    {matching.length ? <>
      <div className="places-grid">{visible.map(place => <PlaceCard key={place.id} place={place} onVisit={(place, trigger) => setVisit({ place, trigger })} />)}</div>
      {pageCount > 1 && <nav className="places-pagination" aria-label={t('placesPagination')}>
        <button className="button secondary" type="button" disabled={page === 1} onClick={() => goToPage(page - 1)}>{t('placesPrevious')}</button>
        {Array.from({ length: pageCount }, (_, index) => {
          const number = index + 1;
          return <button className={`button ${number === page ? '' : 'secondary'}`} type="button" key={number}
            aria-label={t('placesPage', { page: number })} aria-current={number === page ? 'page' : undefined}
            onClick={() => goToPage(number)}>{number}</button>;
        })}
        <button className="button secondary" type="button" disabled={page === pageCount} onClick={() => goToPage(page + 1)}>{t('placesNext')}</button>
      </nav>}
    </> : <div className="empty-state"><h3>{t('noPlaces')}</h3><p>{t('noPlacesCopy')}</p></div>}
    {visit && <VisitDetails place={visit.place} trigger={visit.trigger} onClose={() => setVisit(null)} />}
    <p className="places-source"><a href="https://whc.unesco.org/en/statesparties/cn">{t('unescoSource')} ↗</a></p>
  </section>;
}
