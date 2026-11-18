import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { formatPrice, journeyPath, monthName, useApp } from '../../app/app-context.jsx';
import { findJourneys } from '../journeys/journeys.js';
import { tours as sourceTours } from '../journeys/tours.js';
import Scene from '../../components/Scene.jsx';
import Planner from '../planner/Planner.jsx';
import Places from '../places/Places.jsx';
import JourneyCard from '../journeys/JourneyCard.jsx';
import HomeSections from './HomeSections.jsx';

const categories = ['All', 'Rivers', 'Mountains', 'Culture', 'Cities'];
const months = Array.from({ length: 12 }, (_, index) => index + 1);
const sortOptions = ['popular', 'duration', 'price'];

function HeroPhoto({ slides, activeIndex, language }) {
  const photo = useRef(null);

  useEffect(() => {
    const layer = photo.current;
    const hero = layer.parentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let height = hero.offsetHeight;
    let progress;

    function paint() {
      frame = 0;
      const next = reduced.matches || !height ? 0 : Math.min(1, Math.max(0, window.scrollY / height));
      if (next === progress) return;
      progress = next;
      layer.style.setProperty('--hero-progress', next);
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(paint);
    }

    function onScroll() {
      if (!reduced.matches && (window.scrollY <= height || progress !== 1)) schedule();
    }

    function measure() {
      height = hero.offsetHeight;
      schedule();
    }

    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(hero);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    reduced.addEventListener('change', schedule);
    schedule();
    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      reduced.removeEventListener('change', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="hero-photo" ref={photo}>
    {slides.map((tour, index) => <div className="hero-slide" key={tour.id} data-active={activeIndex === index}>
      <Scene kind={tour.id} language={language} priority={index === 0} sizes="100vw" decorative />
    </div>)}
  </div>;
}

function Hero({ filters, apply }) {
  const { language, t, tours } = useApp();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const slides = tours.slice(0, 3);
  const featured = slides[featuredIndex];
  const hero = useRef(null);
  const [visible, setVisible] = useState(true);
  const [rotating, setRotating] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stop = event => { if (event.matches) setRotating(false); };
    reduced.addEventListener('change', stop);
    const observer = typeof IntersectionObserver === 'undefined' ? null
      : new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer?.observe(hero.current);
    return () => {
      observer?.disconnect();
      reduced.removeEventListener('change', stop);
    };
  }, []);

  useEffect(() => {
    if (!rotating || !visible || slides.length < 2) return;
    const timer = setInterval(() => {
      if (document.hidden) return;
      setFeaturedIndex(index => (index + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [rotating, visible, slides.length]);

  return <section className="hero" id="top" aria-labelledby="hero-title" ref={hero}>
    <HeroPhoto slides={slides} activeIndex={featuredIndex} language={language} />
    <div className="wrap hero-content">
      <p className="label">{t('heroEyebrow')}</p>
      <h1 id="hero-title">{t('heroTitle')}<br /><em>{t('heroEmphasis')}</em></h1>
      <p className="hero-intro">{t('heroIntro')}</p>
      <form className="hero-search" key={`${filters.query}-${filters.month}-${filters.travelers}`} onSubmit={event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        apply(Object.fromEntries(data));
      }}>
        <label>{t('destination')}<input name="query" type="search" defaultValue={filters.query} placeholder={t('searchPlaceholder')} /></label>
        <label>{t('travelMonth')}<select name="month" defaultValue={filters.month}>
          <option value="">{t('anyMonth')}</option>
          {months.map(month => <option key={month} value={month}>{monthName(month, language)}</option>)}
        </select></label>
        <label>{t('travelers')}<input name="travelers" type="number" min="1" max="99" placeholder={t('anyGroup')} defaultValue={filters.travelers} /></label>
        <button className="button" type="submit">{t('search')} <span aria-hidden="true">↗</span></button>
      </form>
      <div className="quick-picks">
        <button type="button" onClick={() => apply({ category: 'Rivers' })}>{t('Rivers')}</button>
        <button type="button" onClick={() => apply({ category: 'Mountains' })}>{t('Mountains')}</button>
        <button type="button" onClick={() => apply({ short: true })}>{t('underThree')}</button>
      </div>
      <div className="hero-feature">
        <Link to={journeyPath(featured)} onFocus={() => setRotating(false)}>{featured.region} <span aria-hidden="true">↗</span></Link>
        <div className="hero-dots" role="group" aria-label={t('featuredLandscapes')}>
          <button type="button" aria-label={t(rotating ? 'pauseHeroSlides' : 'playHeroSlides')} onClick={() => setRotating(value => !value)}>
            <span aria-hidden="true">{rotating ? 'Ⅱ' : '▶'}</span>
          </button>
          {slides.map((tour, index) => <button key={tour.id} type="button" aria-pressed={featuredIndex === index} aria-label={t('showJourney', { name: tour.name })}
            onClick={() => { setFeaturedIndex(index); setRotating(false); }}>0{index + 1}</button>)}
        </div>
      </div>
    </div>
  </section>;
}

function Stats() {
  const { t, tours } = useApp();
  const rating = (tours.reduce((total, tour) => total + tour.rating, 0) / tours.length).toFixed(1);
  return <div className="stats"><div className="wrap stats-inner">
    <div><strong>{tours.length}</strong><span>{t('curatedJourneys')}</span></div>
    <div><strong>{new Set(tours.map(tour => tour.region)).size}</strong><span>{t('destinations')}</span></div>
    <div><strong>{rating} <span aria-hidden="true">★</span></strong><span>{t('averageSampleRating')}</span></div>
  </div></div>;
}

function CompareJourneys({ tours, remove, clear }) {
  const { t, language } = useApp();
  if (!tours.length) return null;
  return <section className="compare-panel" aria-labelledby="compare-title">
    <div className="heading-row"><h3 id="compare-title">{t('compareJourneys')}</h3><button className="quiet-button" type="button" onClick={clear}>{t('clearSelection')}</button></div>
    {tours.length === 1 && <p>{t('compareHint')}</p>}
    <div className="compare-grid">{tours.map(tour => <article key={tour.id}>
      <h4><Link to={journeyPath(tour)}>{tour.name} ↗</Link></h4>
      <p>{t('durationValue', { days: tour.duration })} · {formatPrice(tour.price, language)}</p>
      <ul>{tour.days.map(day => <li key={day}>{day}</li>)}</ul>
      <button className="quiet-button" type="button" onClick={() => remove(tour.id)}>{t('removeJourney', { name: tour.name })}</button>
    </article>)}</div>
  </section>;
}

function Collection({ filters, setFilters, savedOnly, setSavedOnly }) {
  const { t, language, tours, saved, layout, setLayout } = useApp();
  const [sort, setSort] = useState('popular');
  const [compareMode, setCompareMode] = useState(false);
  const [compared, setCompared] = useState([]);
  const matches = findJourneys(sourceTours, { ...filters, savedOnly, saved, sort, localizedTours: tours })
    .map(result => tours.find(tour => tour.id === result.id));
  const active = [
    filters.query && [t('searchTerm', { query: filters.query }), { query: '' }],
    filters.month && [monthName(Number(filters.month), language), { month: '' }],
    filters.travelers && [t('travelerCount', { count: filters.travelers }), { travelers: '' }],
    filters.short && [t('underThree'), { short: false }],
  ].filter(Boolean);

  function toggleCompare(id) {
    setCompared(items => items.includes(id) ? items.filter(item => item !== id) : [...items, id]);
  }

  return <section id="journeys" className="wrap section" tabIndex={-1} aria-labelledby="journeys-title">
    <div className="section-heading"><p className="label">{t('curatedJourneys')}</p><h2 id="journeys-title">{t('collectionTitle')}</h2><p>{t('collectionIntro')}</p></div>
    <div className="filter-row" role="group" aria-label={t('filterJourneys')}>
      {categories.map(category => <button key={category} type="button" className="chip" aria-pressed={category === filters.category} onClick={() => setFilters({ ...filters, category })}>{t(category)}</button>)}
      <button type="button" className="chip" aria-pressed={filters.short} onClick={() => setFilters({ ...filters, short: !filters.short })}>{t('underThree')}</button>
    </div>
    <div className="collection-tools">
      <label className="search-field"><span className="sr-only">{t('searchJourneys')}</span><input type="search" value={filters.query} placeholder={t('searchPlaceholder')} onChange={event => setFilters({ ...filters, query: event.target.value })} /></label>
      <label><span className="sr-only">{t('sortJourneys')}</span><select value={sort} onChange={event => setSort(event.target.value)}>
        {sortOptions.map(option => <option key={option} value={option}>{t(option)}</option>)}
      </select></label>
      <label><span className="sr-only">{t('journeyLayout')}</span><select value={layout} onChange={event => setLayout(event.target.value)}>
        <option value="featured">{t('featuredLayout')}</option><option value="grid">{t('gridLayout')}</option>
      </select></label>
      <button type="button" className="chip" aria-pressed={savedOnly} onClick={() => setSavedOnly(!savedOnly)}>{t('saved')} · {saved.length}</button>
      <button type="button" className="chip" aria-pressed={compareMode} onClick={() => setCompareMode(!compareMode)}>{t('compare')}</button>
    </div>
    <div className="result-row">
      <p role="status">{t(matches.length === 1 ? 'singleResult' : 'resultCount', { count: matches.length })}</p>
      {active.map(([label, change]) => <button key={Object.keys(change)[0]} className="chip applied" type="button" aria-label={t('clearFilter', { label })} onClick={() => setFilters({ ...filters, ...change })}>{label} ×</button>)}
      {(active.length > 0 || filters.category !== 'All' || savedOnly) && <button className="quiet-button" type="button" onClick={() => { setFilters(defaultFilters); setSavedOnly(false); }}>{t('resetFilters')}</button>}
    </div>
    {matches.length ? <div className={`journey-grid ${layout === 'featured' && matches.length > 2 ? 'featured-grid' : ''}`}>
      {matches.map(tour => <JourneyCard key={tour.id} tour={tour} compare={compared.includes(tour.id)} onCompare={compareMode ? () => toggleCompare(tour.id) : undefined} />)}
    </div> : <div className="empty-state"><h3>{t('noResults')}</h3><p>{t('noResultsCopy')}</p><button type="button" className="button secondary" onClick={() => { setFilters(defaultFilters); setSavedOnly(false); }}>{t('resetFilters')}</button></div>}
    {compareMode && <CompareJourneys tours={tours.filter(tour => compared.includes(tour.id))} remove={toggleCompare} clear={() => setCompared([])} />}
  </section>;
}

const defaultFilters = { category: 'All', query: '', month: '', travelers: '', short: false };

export default function Home() {
  const { t } = useApp();
  const [params, setParams] = useSearchParams();
  const [filters, setFilters] = useState(defaultFilters);
  const savedOnly = params.get('saved') === '1';
  const planId = params.get('plan') || '';

  function setSavedOnly(value) {
    const next = new URLSearchParams(params);
    if (value) next.set('saved', '1'); else next.delete('saved');
    setParams(next, { replace: true, state: { preserveScroll: true } });
  }

  function apply(values) {
    setFilters({ ...defaultFilters, ...values, query: values.query?.trim() || '' });
    if (savedOnly) setSavedOnly(false);
    requestAnimationFrame(() => {
      const results = document.getElementById('journeys');
      results.focus({ preventScroll: true });
      results.scrollIntoView();
    });
  }

  return <main id="main">
    <Hero filters={filters} apply={apply} />
    <Stats />
    <Collection filters={filters} setFilters={setFilters} savedOnly={savedOnly} setSavedOnly={setSavedOnly} />
    <HomeSections />
    <Places />
    <Planner requestedTour={planId} requestedPlace={params.get('place')} />
    <section className="wrap section faq" id="questions" aria-labelledby="questions-title">
      <div className="section-heading"><p className="label">{t('support')}</p><h2 id="questions-title">{t('faqTitle')}</h2></div>
      <div>{[1, 2, 3, 4].map(number => <details key={number}><summary>{t(`question${number}`)}</summary><p>{t(`answer${number}`)}</p></details>)}</div>
    </section>
  </main>;
}
