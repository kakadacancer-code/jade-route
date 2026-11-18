import React, { useState } from 'react';
import { useApp } from '../../app/app-context.jsx';
import { readPreference, writePreference } from '../../lib/preferences.js';

const steps = ['⌕', '♡', '↗'];
const reasons = ['◷', '◇', '☷', '✳'];
const testimonials = [
  { name: 'Maya L.', photo: '1534528741775-53994a69daeb' },
  { name: 'Alex C.', photo: '1500648767791-00dcc994a43e' },
  { name: 'Lin W.', photo: '1531123897727-8f129e1688ce' },
];

export function Newsletter() {
  const { t } = useApp();
  const [status, setStatus] = useState(() => readPreference('newsletter-email', '') ? 'newsletterSaved' : '');

  function submit(event) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('email').trim();
    if (writePreference('newsletter-email', email)) {
      setStatus('newsletterSaved');
      event.currentTarget.reset();
    } else {
      setStatus('newsletterError');
    }
  }

  return <section id="newsletter" className="newsletter" aria-labelledby="newsletter-title"><div className="wrap newsletter-inner">
    <div><p className="label">{t('newsletterLabel')}</p><h2 id="newsletter-title">{t('newsletterTitle')}</h2><p>{t('newsletterCopy')}</p></div>
    <form onSubmit={submit}>
      <label htmlFor="newsletter-email">{t('emailAddress')}</label>
      <div className="newsletter-controls"><input id="newsletter-email" name="email" type="email" autoComplete="email" required placeholder={t('emailPlaceholder')} /><button className="button" type="submit">{t('signUp')}</button></div>
      <p className="newsletter-status" role="status">{status ? t(status) : t('newsletterDemo')}</p>
    </form>
  </div></section>;
}

function Testimonials() {
  const { t } = useApp();
  const [active, setActive] = useState(0);
  const person = testimonials[active];
  const move = offset => setActive(index => (index + offset + testimonials.length) % testimonials.length);

  return <section id="travelers" className="testimonial-band" aria-labelledby="testimonial-title"><div className="wrap testimonial-inner">
    <div className="section-heading"><p className="label">{t('sampleTestimonials')}</p><h2 id="testimonial-title">{t('testimonialTitle')}</h2></div>
    <div className="testimonial-card">
      <figure aria-live="polite">
        <blockquote>{t(`quote${active + 1}`)}</blockquote>
        <figcaption><img key={person.photo} src={`https://images.unsplash.com/photo-${person.photo}?auto=format&fit=crop&w=120&h=120&q=80`} width="54" height="54" alt="" loading="lazy" /> <span><strong>{person.name}</strong><small>{t(`quoteTrip${active + 1}`)}</small></span></figcaption>
      </figure>
      <div className="carousel-controls">
        <button className="icon-button" type="button" onClick={() => move(-1)} aria-label={t('previousQuote')}>←</button>
        <span>{active + 1} / {testimonials.length}</span>
        <button className="icon-button" type="button" onClick={() => move(1)} aria-label={t('nextQuote')}>→</button>
      </div>
    </div>
  </div></section>;
}

export default function HomeSections() {
  const { t } = useApp();
  return <>
    <section className="wrap section" id="how" aria-labelledby="how-title">
      <div className="section-heading"><h2 id="how-title">{t('howItWorks')}</h2></div>
      <ol className="info-grid steps">{steps.map((icon, index) => <li key={icon}>
        <span className="info-icon" aria-hidden="true">{icon}</span><h3>{t(`stepTitle${index + 1}`)}</h3><p>{t(`stepCopy${index + 1}`)}</p>
      </li>)}</ol>
    </section>
    <Testimonials />
    <section className="wrap section" id="about" aria-labelledby="why-title">
      <div className="section-heading"><h2 id="why-title">{t('whyChooseUs')}</h2></div>
      <div className="info-grid reasons">{reasons.map((icon, index) => <article key={icon}>
        <span className="info-icon" aria-hidden="true">{icon}</span><h3>{t(`reasonTitle${index + 1}`)}</h3><p>{t(`reasonCopy${index + 1}`)}</p>
      </article>)}</div>
    </section>
  </>;
}
