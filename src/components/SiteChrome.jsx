import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../app/app-context.jsx';
import { Newsletter } from '../features/home/HomeSections.jsx';

const footerLinks = {
  explore: [['allJourneys', '/#journeys'], ['allPlaces', '/#places'], ['saved', '/?saved=1#journeys'], ['planner', '/#planner']],
  company: [['about', '/#about'], ['howItWorks', '/#how'], ['travelerStories', '/#travelers']],
  support: [['faqTitle', '/#questions'], ['newsletterLabel', '/#newsletter']],
};

function Brand() {
  const { t } = useApp();
  return <Link className="brand" to="/"><span className="seal" lang="zh-Hans" aria-hidden="true">玉</span>{t('brand')}</Link>;
}

function LanguageSelect() {
  const { t, language, setLanguage } = useApp();
  return <label className="language-select">
    <span className="sr-only">{t('language')}</span>
    <select value={language} onChange={event => setLanguage(event.target.value)}>
      <option value="en" lang="en">English</option><option value="zh-Hans" lang="zh-Hans">简体中文</option>
    </select>
  </label>;
}

export function Header() {
  const { t, theme, setTheme, saved } = useApp();
  const { pathname, key } = useLocation();
  const [openFor, setOpenFor] = useState(null);
  const menuOpen = openFor === key;
  const [scrolled, setScrolled] = useState(false);
  const progressBar = useRef(null);

  useEffect(() => {
    const bar = progressBar.current;
    let frame = 0;
    let range = 0;
    let pastHeader = false;

    function paint() {
      frame = 0;
      const top = window.scrollY;
      const progress = range > 0 ? Math.min(1, Math.max(0, top / range)) : 0;
      bar.style.transform = `scaleX(${progress})`;
      if ((top > 40) !== pastHeader) {
        pastHeader = top > 40;
        setScrolled(pastHeader);
      }
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(paint);
    }

    function measure() {
      range = document.documentElement.scrollHeight - window.innerHeight;
      schedule();
    }

    const observer = 'ResizeObserver' in window ? new ResizeObserver(measure) : null;
    observer?.observe(document.body);
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function close(event) {
      if (event.key !== 'Escape') return;
      setOpenFor(null);
      document.getElementById('menu-toggle')?.focus();
    }
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);

  return <>
    <a className="skip" href="#main">{t('skip')}</a>
    <header className={`site-header ${pathname === '/' && !scrolled ? 'over-hero' : ''}`}>
      <nav className="wrap nav" aria-label={t('navigation')}>
        <Brand />
        <button id="menu-toggle" className="icon-button menu-toggle" type="button" aria-label={t('menu')} aria-expanded={menuOpen} aria-controls="nav-links" onClick={() => setOpenFor(menuOpen ? null : key)}>{menuOpen ? '×' : '☰'}</button>
        <div id="nav-links" className={`nav-links ${menuOpen ? 'open' : ''}`} onClick={event => { if (event.target.closest('a')) setOpenFor(null); }}>
          <Link to="/#journeys">{t('explore')}</Link><Link to="/#places">{t('allPlaces')}</Link><Link to="/#how">{t('howItWorks')}</Link><Link to="/#planner">{t('planner')}</Link><Link to="/#questions">{t('support')}</Link>
        </div>
        <div className="nav-controls">
          <Link className="nav-saved" to="/?saved=1#journeys" aria-label={t('savedCount', { count: saved.length })}>♡ <span>{saved.length}</span></Link>
          <LanguageSelect />
          <button className="icon-button" type="button" aria-label={t('darkMode')} aria-pressed={theme === 'dark'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? '☾' : '☀'}</button>
        </div>
      </nav>
      <div className="scroll-progress" ref={progressBar} aria-hidden="true" />
    </header>
    {scrolled && <button className="icon-button back-top" type="button" onClick={() => window.scrollTo({ top: 0 })} aria-label={t('backToTop')}>↑</button>}
  </>;
}

export function MobileBar() {
  const { t } = useApp();
  return <nav className="mobile-bar" aria-label={t('mobileNavigation')}>
    <Link to="/#top"><span aria-hidden="true">⌕</span>{t('search')}</Link>
    <Link to="/?saved=1#journeys"><span aria-hidden="true">♡</span>{t('saved')}</Link>
    <Link to="/#planner"><span aria-hidden="true">▦</span>{t('planner')}</Link>
  </nav>;
}

export function Footer() {
  const { t } = useApp();
  const shareUrl = encodeURIComponent(window.location.origin);
  return <>
    <Newsletter />
    <footer className="site-footer"><div className="wrap">
      <div className="footer-grid">
        <div className="footer-brand"><Brand /><p>{t('footerCopy')}</p><LanguageSelect /></div>
        {Object.entries(footerLinks).map(([key, links]) => <section key={key}><h2>{t(key)}</h2><ul>
          {links.map(([label, path]) => <li key={label}><Link to={path}>{t(label)}</Link></li>)}
        </ul></section>)}
      </div>
      <div className="footer-bottom">
        <p>{t('demoFooter')}</p>
        <div className="social-links" aria-label={t('share')}>
          <a className="icon-button" href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer" aria-label={t('shareFacebook')}>f</a>
          <a className="icon-button" href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noreferrer" aria-label={t('shareLinkedIn')}>in</a>
          <a className="icon-button" href="mailto:kakadacancer@gmail.com" aria-label={t('contactEmail')}>✉</a>
        </div>
      </div>
    </div></footer>
  </>;
}
