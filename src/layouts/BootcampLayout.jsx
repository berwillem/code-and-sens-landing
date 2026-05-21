import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import ContactModal from '../components/ContactModal';
import { submitToHubspot } from '../utils/hubspot';

// Route-to-primary-color map (mirrors Navbar)
const routePrimaryColors = {
  '/bootcamps/web-dev-essentials':         '#294CFF',
  '/bootcamps/ecommerce':                  '#EAB308',
  '/bootcamps/generative-ai-automation':   '#8C00FF',
  '/bootcamps/power-bi':                   '#8C00FF',
  '/bootcamps/ui-ux-design':               '#03BF1F',
  '/bootcamps/cybersecurity-bootcamp':     '#EF4444',
  '/bootcamps/cybersecurity-introduction': '#EF4444',
};

const BootcampLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const footerKeyMap = {
    '/bootcamps/web-dev-essentials': 'webDevFooterTagline',
    '/bootcamps/ecommerce': 'ecomFooterTagline',
    '/bootcamps/generative-ai-automation': 'genaiFooterTagline',
    '/bootcamps/power-bi': 'pbiFooterTagline',
    '/bootcamps/ui-ux-design': 'uiuxFooterTagline',
    '/bootcamps/cybersecurity-bootcamp': 'cyberBootcampFooterTagline',
    '/bootcamps/cybersecurity-introduction': 'cyberIntroFooterTagline',
  };

  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalCtaText, setModalCtaText] = useState('');

  const handleOpenModal = (title = '', ctaText = '') => {
    setModalTitle(title);
    setModalCtaText(ctaText || '');
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setModalTitle('');
      setModalCtaText('');
    }, 300);
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (phone.trim()) {
      const success = await submitToHubspot(
        { phone, name: 'unknown', email: 'unknown' },
        location.pathname,
        'Footer Lead Capture',
        t
      );
      if (success) {
        setSubmitted(true);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans">
      <Navbar onOpenModal={handleOpenModal} />

      {/* Main Content */}
      <main className="flex-1 w-full pt-20 pb-0">
        <Outlet context={{ onOpenModal: handleOpenModal }} />
      </main>

      {/* Global Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        primaryColor={primaryColor} 
        customTitle={modalTitle} 
        customCtaText={modalCtaText}
      />

      {/* ─── FOOTER ───────────────────────────────────────────────────── */}
      <footer style={{ background: primaryColor }}>

        {/* Top Row: 3 columns */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-10 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Column 1 — Brand + Lead Capture */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img src="/logo.svg" alt="Code & Sens" className="h-9 filter brightness-0 invert" />
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                                 {t(footerKeyMap[location.pathname] || 'footerTagline', "Algeria's premier tech bootcamp. We turn beginners into job-ready developers in 12 weeks.")}
              </p>
            </div>

            {/* Phone lead capture */}
            {!submitted ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-2">
                <p className="text-white text-sm font-semibold">{t('footerCallbackLabel', 'Get a callback in 24h:')}</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 mt-1" dir="ltr">
                  <div className="flex overflow-hidden rounded-xl sm:rounded-r-none shadow-sm bg-white/10 flex-1 border border-white/10">
                    <span className="inline-flex items-center px-4 md:px-3 text-white/80 text-sm font-sans border-r border-white/20 flex-shrink-0">
                      +213
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="555 123 456"
                      className="w-full px-4 md:px-3 py-3 md:py-2.5 bg-transparent placeholder-white/30 text-white text-base md:text-sm outline-none focus:bg-white/5 transition-colors text-left"
                      dir="ltr"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!phone.trim()}
                    className="w-full sm:w-auto px-6 py-3 md:py-2.5 bg-white rounded-xl sm:rounded-l-none text-base md:text-sm font-bold flex items-center justify-center transition-opacity hover:opacity-90 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ color: primaryColor }}
                  >
                    {t('footerCallbackBtn', 'Send')}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white/15 rounded-lg px-4 py-3 text-white text-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                {t('footerCallbackSuccess', "We'll call you back shortly!")}
              </div>
            )}
          </div>

          {/* Column 2 — Contact Info */}
          <div className="space-y-5">
            <h4 className="text-white font-heading font-bold text-lg">{t('footerContactTitle', 'Contact Us')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/80 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.1 7.87a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"></path></svg>
                <a href="tel:0668301569" className="hover:text-white transition-colors" dir="ltr">0668 30 15 69</a>
              </li>
              <li className="flex items-start gap-3 text-white/80 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <a href="mailto:contact@codeansens.com" className="hover:text-white transition-colors" dir="ltr">contact@codeansens.com</a>
              </li>
              <li className="flex items-start gap-3 text-white/80 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span dir="ltr" className="inline-block" style={{ textAlign: 'start' }}>N 1, lot alioua fodil,<br />Chéraga 16014</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-3 pt-1">
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/codeandsens', icon: <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 2h11A4.5 4.5 0 0122 6.5v11a4.5 4.5 0 01-4.5 4.5h-11A4.5 4.5 0 012 17.5v-11A4.5 4.5 0 016.5 2z" /> },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/company/code-and-sens', icon: <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></> },
                { label: 'Facebook', href: 'https://www.linkedin.com/company/code-and-sens', icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /> },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 3 — Google Maps */}
          <div className="space-y-3">
            <h4 className="text-white font-heading font-bold text-lg">{t('footerFindUs', 'Find Us')}</h4>
            <div className="rounded-xl overflow-hidden shadow-lg border-2 border-white/20" style={{ height: '200px' }}>
              <iframe
                title="Code & Sens Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.3701956263585!2d2.948738375696195!3d36.76168567225809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb11d0ca2e383%3A0xe33e76b5f516e429!2sCode%20And%20Sens!5e0!3m2!1sen!2sdz!4v1773638050616!5m2!1sen!2sdz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <a
              href="https://maps.google.com/maps?q=Birtouta,+Alger"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/70 text-xs hover:text-white transition-colors"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/15 py-5">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/50 text-xs">
            <p>&copy; {new Date().getFullYear()} Code & Sens. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BootcampLayout;

