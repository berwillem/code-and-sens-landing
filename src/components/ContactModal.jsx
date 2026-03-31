import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/i18n';
import { submitToHubspot } from '../utils/hubspot';

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ContactModal = ({ isOpen, onClose, primaryColor, customTitle, customCtaText }) => {
  const { t } = useTranslation();
  const [isRendered, setIsRendered] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const isRtl = i18n.dir(i18n.language) === 'rtl';

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsRendered(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen && !isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 font-sans ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-y-auto flex flex-col md:flex-row border border-slate-100 transition-transform duration-300 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
        dir={isRtl ? 'rtl' : 'ltr'}
        style={{ maxHeight: 'calc(100vh - 2rem)' }}
      >
        {/* Close Button — hidden on mobile, visible sm+ */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/10 hover:bg-black/20 text-white rounded-full hidden sm:flex items-center justify-center transition-colors shadow-sm"
          style={{ [isRtl ? 'left' : '1rem']: '1rem', [isRtl ? 'right' : 'auto']: 'auto' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Left info panel */}
        <div
          className="md:w-2/5 p-5 sm:p-8 md:p-12 flex flex-col justify-center"
          style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)` }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white leading-tight mb-4">
            {customTitle || t('contactTitle')}
          </h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6">
            {t('contactSubtitle')}
          </p>
          <ul className="space-y-2">
            {[t('contactCheck1'), t('contactCheck2'), t('contactCheck3')].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white/90 text-sm">
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right form */}
        <div className="md:w-3/5 p-5 sm:p-8 md:p-12">
          <h3 className="text-lg sm:text-xl font-bold font-heading mb-6 text-slate-800">{t('formTitle')}</h3>
          <form className="space-y-5" onSubmit={async (e) => { 
            e.preventDefault(); 
            const success = await submitToHubspot(
              { name: formData.name, email: formData.email, phone: formData.phone }, 
              window.location.pathname, 
              customTitle || t('contactTitle', 'Bootcamp Contact'),
              t
            );
            if (success) onClose(); 
          }}>
            <div className="space-y-1.5">
              <label htmlFor="modal-name" className="text-sm font-semibold text-slate-600">{t('formName')}</label>
              <input type="text" id="modal-name" className="input w-full" placeholder={t('formNamePlaceholder', 'Ahmed Benali')} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="modal-email" className="text-sm font-semibold text-slate-600">{t('formEmail')}</label>
              <input type="email" id="modal-email" className="input w-full" placeholder="contact@codeansens.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="modal-phone" className="text-sm font-semibold text-slate-600">{t('formPhone')}</label>
              <div className="flex" dir="ltr">
                <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm font-sans flex-shrink-0">
                  +213
                </span>
                <input type="tel" id="modal-phone" className="input rounded-l-none w-full" placeholder="0668 30 15 69" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
              </div>
            </div>
            <button
              type="submit"
              disabled={!formData.name || !formData.email || !formData.phone}
              className="w-full py-4 text-white text-base font-bold rounded-xl mt-2 shadow-lg hover:opacity-90 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:opacity-50"
              style={{ backgroundColor: primaryColor, boxShadow: `0 8px 32px ${primaryColor}40` }}
            >
              {customCtaText || t('formSubmit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
