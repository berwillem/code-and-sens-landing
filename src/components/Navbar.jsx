import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import Flag PNGs
import flagFR from '../assets/flags/france.png';
import flagUK from '../assets/flags/uk.png';
import flagDZ from '../assets/flags/algeria.png';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [theme, setTheme] = useState({ bgClass: 'bg-slate-900/80', primaryHex: '#4F46E5', textClass: 'text-white' });
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Map routes to specific themes
  const routeThemes = {
    '/bootcamps/ecommerce':                  { bgClass: 'bg-white/95',      primaryHex: '#EAB308', textClass: 'text-slate-900' },
    '/bootcamps/cybersecurity-bootcamp':     { bgClass: 'bg-slate-900/95',  primaryHex: '#EF4444', textClass: 'text-white' },
    '/bootcamps/cybersecurity-introduction': { bgClass: 'bg-slate-900/95',  primaryHex: '#EF4444', textClass: 'text-white' },
    '/bootcamps/generative-ai-automation':   { bgClass: 'bg-white/95',      primaryHex: '#9333EA', textClass: 'text-slate-900' },
    '/bootcamps/power-bi':                   { bgClass: 'bg-white/95',      primaryHex: '#2563EB', textClass: 'text-slate-900' },
    '/bootcamps/ui-ux-design':               { bgClass: 'bg-white/95',      primaryHex: '#EC4899', textClass: 'text-slate-900' },
    '/bootcamps/web-dev-essentials':         { bgClass: 'bg-white/95',      primaryHex: '#294CFF', textClass: 'text-slate-900' },
  };

  useEffect(() => {
    const currentTheme = routeThemes[location.pathname] || { bgClass: 'bg-slate-900/80', primaryHex: '#4F46E5', textClass: 'text-white' };
    setTheme(currentTheme);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  const currentLang = i18n.language;

  const languages = [
    { code: 'fr', label: 'FR', flagRaw: flagFR },
    { code: 'en', label: 'EN', flagRaw: flagUK },
    { code: 'ar', label: 'AR', flagRaw: flagDZ },
  ];

  const activeLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  const isDarkText = theme.textClass.includes('slate-900');

  return (
    <nav 
      className={`fixed top-3 left-4 right-4 z-50 rounded-2xl backdrop-blur-md border shadow-md ${theme.bgClass} ${theme.textClass} ${isDarkText ? 'border-slate-200 shadow-slate-200/60' : 'border-white/10 shadow-black/20'} transition-all duration-300`}
      style={{ '--page-primary': theme.primaryHex }}
    >
      <div className="max-w-7xl mx-auto px-5 py-3 sm:px-8 flex justify-between items-center relative">
        
        {/* Logo Area */}
        <div className="flex items-center gap-3 cursor-pointer">
          {isDarkText ? (
            /* Light theme → use logo2 variant (dark logo) */
            <img
              src="/logo2.png"
              alt="Code & Sens Logo"
              className="h-10 transition-transform duration-300 hover:scale-105"
            />
          ) : (
            /* Dark theme → use logo.svg inverted to white */
            <img
              src="/logo.svg"
              alt="Code & Sens Logo"
              className="h-10 transition-transform duration-300 hover:scale-105 filter brightness-0 invert"
            />
          )}
          {/* Fallback Text Logo */}
          <div className="hidden items-center gap-2">
            <span className={`text-xl font-heading font-bold tracking-tight ${theme.textClass}`}>Code & Sens</span>
          </div>
        </div>


        {/* Actions Area */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          
          {/* Language Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer ${isDarkText ? 'hover:bg-slate-100' : 'hover:bg-white/10'}`}
              aria-haspopup="listbox"
              aria-expanded={isLangMenuOpen}
            >
              <img src={activeLanguage.flagRaw} alt={activeLanguage.label} className="w-5 h-5 rounded-full object-cover shadow-sm bg-white" />
              <span>{activeLanguage.label}</span>
              <svg className={`w-4 h-4 opacity-70 transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isLangMenuOpen && (
              <ul className={`absolute right-0 mt-2 py-1 w-28 border rounded-lg shadow-xl z-50 overflow-hidden transform transition-all duration-300 origin-top ${isDarkText ? 'bg-white border-slate-200' : 'bg-slate-800 border-slate-700'}`} role="listbox">
                {languages.map((lang) => (
                  <li key={lang.code} role="presentation">
                    <button
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                        currentLang === lang.code 
                          ? (isDarkText ? 'text-[var(--page-primary)] bg-slate-50' : 'text-[var(--page-primary)] bg-slate-700/50')
                          : (isDarkText ? 'text-slate-600 hover:bg-slate-50' : 'text-slate-300 hover:bg-slate-700')
                      }`}
                      role="option"
                      aria-selected={currentLang === lang.code}
                    >
                      <div className="transform transition-transform hover:scale-110">
                        <img src={lang.flagRaw} alt={lang.label} className="w-5 h-5 rounded-full object-cover shadow-sm bg-white" />
                      </div>
                      {lang.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact CTA Button */}
          <button className="btn-primary">
            {t('freeAppointment', 'Free Appointment')}
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
