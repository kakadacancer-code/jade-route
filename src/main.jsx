import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Scene, { photos } from './Scene.jsx';
import { tours, popularPlaces } from './tours.js';
import { findJourneys, readSaved } from './journeys.js';
import './styles.css';

const filters = ['All', 'Rivers', 'Mountains', 'Culture', 'Cities'];
const featuredTours = tours.slice(0, 3);

function useParallax(ref) {
  useEffect(() => {
    const hero = ref.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let current = window.scrollY, target = current, frame = 0;
    const story = document.querySelector('.story-image');

    function paint() {
      frame = 0;
      if (reduced.matches) return;
      current += (target - current) * .09;
      const distance = Math.min(Math.max(current, 0), hero.offsetHeight);
      hero.style.setProperty('--scroll', `${distance}px`);
      if (story) {
        const offset = current - (story.offsetTop - window.innerHeight);
        story.style.setProperty('--parallax', `${Math.max(-100, Math.min(100, (offset - window.innerHeight / 2) * .12))}px`);
      }
      if (Math.abs(target - current) > .2) schedule();
    }
    function schedule() {
      target = window.scrollY;
      if (!frame && !reduced.matches) frame = requestAnimationFrame(paint);
    }
    function reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      current = target = window.scrollY;
      hero.style.setProperty('--scroll', '0px');
      story?.style.setProperty('--parallax', '0px');
      schedule();
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduced.addEventListener('change', reset);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduced.removeEventListener('change', reset);
    };
  }, [ref]);
}

function Reveal({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const target = ref.current;
    target.classList.add('waiting');
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      target.classList.remove('waiting');
      observer.disconnect();
    }, { threshold: .12 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  return <div className="reveal" ref={ref}>{children}</div>;
}

function Brand() {
  return <a className="brand" href="#top"><span className="seal" lang="zh" aria-hidden="true">玉</span> Jade Routes</a>;
}

function Itinerary({ tour, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const trigger = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      document.body.style.overflow = overflow;
      dialog.close();
      trigger?.focus();
    };
  }, []);

  function handleBackdrop(event) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
  }

  return (
    <dialog ref={ref} aria-labelledby="itinerary-title" onClick={handleBackdrop} onCancel={event => {
      event.preventDefault();
      onClose();
    }}>
      <button className="close" type="button" onClick={onClose} aria-label="Close itinerary">×</button>
      <figure><Scene kind={tour.id} /></figure>
      <div className="dialog-copy">
        <p className="eyebrow rust">{tour.region} / {tour.days.length} days</p>
        <h2 id="itinerary-title">{tour.name}</h2>
        <p>{tour.description}</p>
        <div className="itinerary-facts"><span>{tour.type}</span><span>{tour.days.length} days</span><span>Self-guided inspiration</span></div>
        <ol className="day-list">{tour.days.map((day, index) => <li key={day}><span className="eyebrow rust">Day 0{index + 1}</span><p>{day}</p></li>)}</ol>
        <button className="button download-button" type="button" onClick={() => downloadItinerary(tour)}>Download itinerary <span aria-hidden="true">↓</span></button>
      </div>
    </dialog>
  );
}

function downloadItinerary(tour) {
  const content = `${tour.name} — Jade Routes\n${tour.region} · ${tour.days.length} days\n\n${tour.description}\n\n${tour.days.map((day, i) => `Day ${i + 1}\n${day}`).join('\n\n')}\n\nAn independent itinerary idea, not a booked tour.\n`;
  const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `jade-routes-${tour.id}.txt`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const questions = [
  ['How do these journeys work?', 'Each journey is a short, independent itinerary to help you explore at your own pace. Browse the daily outline, save your favorites, and download a copy to take with you.'],
  ['Can I change the pace?', 'Of course. Use the daily outline as a starting point: stay longer in a place you love, skip a stop, or leave an afternoon entirely open.'],
  ['Can I book a tour here?', 'Jade Routes currently offers itinerary inspiration, rather than bookings. Transport, accommodation, and activities are arranged independently.'],
  ['Where are my saved journeys kept?', 'Favorites are saved in this browser on this device. No account is needed. Clearing browser data also clears saved journeys.'],
];

function App() {
  const hero = useRef(null);
  const [filter, setFilter] = useState('All');
  const [heroIndex, setHeroIndex] = useState(0);
  const [compareMode, setCompareMode] = useState(false);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');
  const [savedOnly, setSavedOnly] = useState(false);
  const [saved, setSaved] = useState(() => {
    try { return readSaved(window.localStorage, tours.map(tour => tour.id)); }
    catch { return []; }
  });
  const [compared, setCompared] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(() => window.scrollY > 24);
  useEffect(() => {
    const updateHeader = () => setHeaderScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    try { window.localStorage.setItem('jade-routes:saved', JSON.stringify(saved)); }
    catch { setNotice('Browser storage is unavailable. Favorites will last for this visit.'); }
  }, [saved]);
  useEffect(() => {
    if (!menuOpen) return;
    function close(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        document.getElementById('menu-toggle')?.focus();
      }
    }
    function resize() { if (window.innerWidth > 600) setMenuOpen(false); }
    window.addEventListener('keydown', close);
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('keydown', close); window.removeEventListener('resize', resize); };
  }, [menuOpen]);
  function toggleSaved(tour) {
    const exists = saved.includes(tour.id);
    setSaved(items => exists ? items.filter(id => id !== tour.id) : [...items, tour.id]);
    setNotice(`${tour.name} ${exists ? 'removed from' : 'added to'} saved journeys.`);
  }
  function resetFilters() { setQuery(''); setFilter('All'); setSavedOnly(false); }
  function toggleCompare(id) { setCompared(items => items.includes(id) ? items.filter(item => item !== id) : [...items, id]); }
  useParallax(hero);
  const journeys = findJourneys(tours, { category: filter, query, savedOnly, saved });
  const comparison = tours.filter(tour => compared.includes(tour.id));

  function renderJourney(tour, index) {
    return (
              <article className="card" key={tour.id} style={{ animationDelay: `${index * 85}ms` }}>
                <figure><Scene kind={tour.id} /><span className="card-category">{tour.type === 'Rivers' ? 'By the water' : tour.type === 'Mountains' ? 'Above the clouds' : tour.type === 'Cities' ? 'City discoveries' : 'Culture & stories'}</span><span className="art-label" lang="zh">{tour.chinese}</span><button className="save-card" type="button" aria-pressed={saved.includes(tour.id)} aria-label={`${saved.includes(tour.id) ? 'Unsave' : 'Save'} ${tour.name}`} onClick={() => toggleSaved(tour)}><span aria-hidden="true">{saved.includes(tour.id) ? '♥' : '♡'}</span></button></figure>
                <div className="card-copy">
                  <p className="eyebrow rust">{tour.region} / {tour.days.length} days</p>
                  <h3>{tour.name}</h3>
                  <p>{tour.description}</p>
                  <button className="view-itinerary" type="button" aria-label={`View itinerary for ${tour.name}`} onClick={() => setSelected(tour)}>View itinerary <span aria-hidden="true">↗</span></button>
                  {compareMode && <label className="compare-choice"><input type="checkbox" checked={compared.includes(tour.id)} onChange={() => toggleCompare(tour.id)} /> Compare journey</label>}
                </div>
              </article>
    );
  }

  return (
    <>
      <a className="skip" href="#journeys">Skip to journeys</a>
      <header className={`site-header${headerScrolled ? ' is-scrolled' : ''}`}>
        <nav className="wrap nav" aria-label="Main navigation">
          <Brand />
          <button id="menu-toggle" className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="nav-links" onClick={() => setMenuOpen(open => !open)}>{menuOpen ? 'Close ×' : 'Menu ☰'}</button>
          <div id="nav-links" className={menuOpen ? 'nav-links is-open' : 'nav-links'} onClick={event => { if (event.target.closest('a')) setMenuOpen(false); }}>
            <a href="#journeys">The journeys</a><a href="#popular">Popular places</a><a href="#approach">Our philosophy</a><a href="#questions">Good to know</a>
          </div>
          <a className="nav-saved" href="#journeys" onClick={() => { setSavedOnly(true); setFilter('All'); setQuery(''); }}>Your collection <span>{saved.length.toString().padStart(2, '0')}</span></a>
        </nav>
      </header>
      <section id="top" className="hero" ref={hero} aria-labelledby="hero-title">
        <div className="hero-photo" key={tours[heroIndex].id}><Scene kind={tours[heroIndex].id} priority /></div>
        <div className="wrap hero-copy">
          <p className="eyebrow"><span className="tiny-line" /> A slower kind of China</p>
          <h1 id="hero-title">Take the<br /><em>scenic</em> route<span className="hero-period">.</span></h1>
          <p className="intro">Beyond the busy streets, a different China awaits. Quiet rivers. Misty mountains. Moments worth staying for.</p>
          <a className="button" href="#journeys">Find your journey <span className="button-arrow" aria-hidden="true">↗</span></a>
          <div className="hero-note"><span className="note-symbol" aria-hidden="true">✳</span><p>Independently explored.<br /><strong>Intentionally unhurried.</strong></p></div>
        </div>
        <aside className="hero-postcard" aria-label="A glimpse of another journey">
          <button type="button" onClick={() => setSelected(featuredTours[(heroIndex + 1) % featuredTours.length])}>
            <span className="postcard-picture"><Scene kind={featuredTours[(heroIndex + 1) % featuredTours.length].id} /></span>
            <span className="postcard-caption">A little detour? <span aria-hidden="true">↗</span></span>
            <span className="postcard-place">{featuredTours[(heroIndex + 1) % featuredTours.length].region}</span>
          </button>
        </aside>
        <div className="hero-edition" aria-hidden="true"><span>中国</span><small>Notes from<br />the slower road</small></div>
        <div className="wrap hero-visual">
          <div className="photo-topline"><span className="location-dot" /> {tours[heroIndex].region}<span className="photo-index">0{heroIndex + 1} / 03</span></div>
          <button className="destination-label" type="button" onClick={() => setSelected(tours[heroIndex])}><span><span className="eyebrow">A place to begin</span><strong>{tours[heroIndex].name}</strong><small>{tours[heroIndex].days.length} days of discovery</small></span><span className="round-arrow" aria-hidden="true">↗</span></button>
          <div className="photo-picker" role="group" aria-label="Featured landscape">{featuredTours.map((tour, index) => <button type="button" key={tour.id} aria-label={`Show ${tour.name}`} aria-pressed={heroIndex === index} onClick={() => setHeroIndex(index)}>0{index + 1}</button>)}</div>
        </div>
      </section>
      <div className="wrap introduction-strip"><span className="eyebrow">The Jade Routes way</span><p>Collect moments.<br /><em>Leave the checklist behind.</em></p><a href="#journeys" aria-label="Discover the journeys"><span aria-hidden="true">↓</span></a></div>
      <main>
        <section id="journeys" className="wrap destinations" aria-labelledby="journeys-title" tabIndex={-1}>
          <div className="collection-heading"><Reveal>
            <p className="eyebrow rust"><span className="section-index">01</span> The handpicked collection</p>
            <h2 id="journeys-title" className="section-title">Somewhere <em>less ordinary.</em></h2>
          </Reveal><p className="section-intro">Seven ways to leave the everyday behind.<br />Each one, an invitation to take your time.</p></div>
          <div className="collection-toolbar">
            <div className="filters" role="group" aria-label="Filter journeys">{filters.map(item => <button key={item} type="button" aria-pressed={!savedOnly && filter === item} onClick={() => { setFilter(item); setSavedOnly(false); }}>{item === 'All' ? 'All journeys' : item}</button>)}</div>
            <details className="refine"><summary>Refine collection <span aria-hidden="true">☷</span></summary><div className="journey-tools">
              <label className="search-field"><span className="sr-only">Search journeys by place or landscape</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search a destination…" /></label>
              <button className="saved-toggle" type="button" aria-pressed={savedOnly} onClick={() => setSavedOnly(value => !value)}>Saved journeys <span>{saved.length}</span></button>
              <button className="saved-toggle" type="button" aria-pressed={compareMode} onClick={() => setCompareMode(value => !value)}>Compare journeys</button>
            </div></details>
          </div>
          <p className="sr-only" role="status">{journeys.length} journeys{savedOnly ? ' saved' : ' to explore'}</p>
          {(query || savedOnly) && <div className="active-filter"><span>{savedOnly ? 'Your saved collection' : `Results for “${query}”`} · {journeys.length} journeys</span><button type="button" onClick={resetFilters}>Show all ×</button></div>}
          <div className={`grid${journeys.length >= 3 ? ' grid--editorial' : ''}`} key={filter}>
            {journeys.slice(0, 3).map(renderJourney)}
          </div>
          {journeys.length > 3 && <div className="more-collection"><p className="eyebrow rust">A little further afield</p><div className="grid grid--more">{journeys.slice(3).map(renderJourney)}</div></div>}
          {journeys.length === 0 && <div className="empty-state"><span aria-hidden="true">{savedOnly ? '♡' : '⌕'}</span><h3>{savedOnly && !saved.length ? 'Your next escape starts here.' : 'A different path, perhaps?'}</h3><p>{savedOnly && !saved.length ? 'Tap the heart on a journey to keep it for later.' : 'Try a different place or clear your filters to see every journey.'}</p><button type="button" className="button" onClick={resetFilters}>Explore all journeys <span aria-hidden="true">↗</span></button></div>}
          {comparison.length > 0 && <section className="comparison" aria-labelledby="compare-title">
            <div className="comparison-heading"><div><p className="eyebrow rust">Side by side</p><h3 id="compare-title">A journey that feels like you.</h3></div><button type="button" className="text-button" onClick={() => setCompared([])}>Clear selection ×</button></div>
            {comparison.length === 1 && <p className="compare-hint" role="status">Select one more journey to compare landscapes and daily plans.</p>}
            <div className="compare-grid" style={{ '--columns': Math.min(comparison.length, 3) }}>{comparison.map(tour => <article key={tour.id}><p className="eyebrow rust">{tour.type} · {tour.days.length} days</p><h4>{tour.name}</h4><p>{tour.region}</p><ul>{tour.days.map((day, i) => <li key={day}><span>Day {i + 1}</span>{day}</li>)}</ul><button className="text-button" type="button" onClick={() => setSelected(tour)}>See full itinerary ↗</button><button type="button" className="remove-compare" onClick={() => toggleCompare(tour.id)} aria-label={`Remove ${tour.name} from comparison`}>Remove ×</button></article>)}</div>
          </section>}
        </section>
        <section className="popular-section" id="popular" aria-labelledby="popular-title"><div className="wrap">
          <div className="collection-heading"><Reveal><p className="eyebrow rust"><span className="section-index">02</span> Places to fall in love with</p><h2 className="section-title" id="popular-title"><span lang="zh-Hans">中国热门目的地</span><small>Popular places in China.</small></h2></Reveal><p className="section-intro"><span lang="zh-Hans">从千年古都到山水秘境，<br />发现属于你的中国之旅。</span><br />Familiar names. Unforgettable places.</p></div>
          <div className="popular-grid">{popularPlaces.map((place, index) => <button className="popular-card" type="button" key={place.tourId} aria-label={`Explore ${place.name} ${place.chinese}`} onClick={() => setSelected(tours.find(tour => tour.id === place.tourId))}>
            <div className="popular-photo"><Scene kind={place.tourId} /><span className="popular-number">0{index + 1}</span><span className="popular-arrow" aria-hidden="true">↗</span></div>
            <div className="popular-copy"><h3 lang="zh-Hans">{place.chinese}</h3><span className="popular-english">{place.name}</span><p lang="zh-Hans">{place.attractionChinese}</p><p className="popular-description" lang="zh-Hans">{place.descriptionChinese}</p><span className="popular-attraction">{place.attraction}</span></div>
          </button>)}</div>
          <p className="destination-source">Destination inspiration · <a href="https://www.chinahighlights.com/travelguide/article-top-china-tourist-destination.htm" target="_blank" rel="noreferrer">China Highlights city guide ↗</a></p>
        </div></section>
        <section className="travel-note wrap" aria-label="Our invitation"><span className="note-flower" aria-hidden="true">✳</span><p>Some places ask you to see them.<br /><em>These ask you to stay a little longer.</em></p><span className="note-signature">With curiosity, Jade Routes</span></section>
        <section className="wrap story" id="approach" aria-labelledby="approach-title">
          <div className="story-image"><Scene kind="tea" /><span className="story-image-caption">Longjing, Hangzhou · A moment of stillness</span><div className="story-photo-note"><span className="eyebrow">A note to yourself</span><span>There’s always time<br />for one more cup.</span><small>龙井 · Longjing</small></div></div>
          <div className="story-copy"><Reveal>
            <p className="eyebrow rust"><span className="section-index">03</span> The art of going slowly</p>
            <h2 id="approach-title" className="section-title">The best part?<br /><em>The in-between.</em></h2>
            <p>That second cup of tea. A turn down an unfamiliar lane. The view you didn't plan to find.</p><p>We leave space in every journey for the things that can't be put on an itinerary.</p>
            <a className="text-link" href="#journeys">Make a little room to wander <span aria-hidden="true">↗</span></a>
            <div className="story-bottom"><span className="story-stamp" lang="zh" aria-label="Take your time">慢慢来</span><span>Fewer stops.<br />Deeper connections.</span></div>
          </Reveal></div>
        </section>
        <section id="questions" className="wrap questions" aria-labelledby="questions-title">
          <Reveal><p className="eyebrow rust"><span className="section-index">04</span> A few helpful details</p><h2 id="questions-title" className="section-title">Good to know.</h2><p className="section-intro">A little preparation. A lot of possibility.</p></Reveal>
          <div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </section>
        <p className="sr-only" role="status">{notice}</p>
      </main>
      <footer><div className="wrap footer-invitation"><p>Your next story<br />starts with <em>a little curiosity.</em></p><a href="#journeys">Let’s wander <span aria-hidden="true">↗</span></a></div><div className="wrap footer-main"><div><Brand /><p>Go further. Feel more. Take your time.</p></div><a className="footer-top" href="#top">Until the next journey <span aria-hidden="true">↑</span></a></div><div className="wrap photo-credits">Photography via Unsplash · {Object.entries(photos).map(([id, photo], index) => <React.Fragment key={id}>{index > 0 && ' / '}<a href={photo.source} target="_blank" rel="noreferrer">{photo.credit}</a></React.Fragment>)}</div></footer>
      {selected && <Itinerary tour={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
