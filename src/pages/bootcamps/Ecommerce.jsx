import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutletContext, useLocation } from 'react-router-dom';
import i18n from '../../i18n/i18n';
import { submitToHubspot } from '../../utils/hubspot';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    name: 'Younes A.',
    role: 'Financier à la Clinique du Val',
    quote: "La formation était excellente, l'instructeur très pédagogue. Un grand merci à lui et à toute l'équipe Code & Sens.",
    rating: 5,
    avatar: 'YA',
  },
  {
    name: 'Wassim B.',
    role: 'Tech Support @ Moneco',
    quote: "jazt hayle t3lemna bzf 3fays ! J'ai connu beaucoup de gens bien aussi à l'école. Je recommande.",
    rating: 5,
    avatar: 'WB',
  },
  {
    name: 'Manel K.',
    role: '2nd Year Geology Student @ USTHB',
    quote: "بدينا موالو م 0 حتا ولينا نخدموا كلش وحدنا المرافقة في الدورة و بعد الدورة كانت رائعة بديت الخدمة بفضلكم شكرا و ربي يوفقكم",
    rating: 5,
    avatar: 'MK',
  },
  {
    name: 'Mouhamed S.',
    role: 'Alumni Code & Sens',
    quote: "La formation était top, la pédagogie d'apprentissage aussi. On apprend avec des projets réels et en pratiquant.",
    rating: 5,
    avatar: 'MS',
  },
  {
    name: 'Lydia H.',
    role: 'Alumni Code & Sens',
    quote: "Excellent school! Thank you very much for everything and special mention to my group, best people ever ❤️",
    rating: 5,
    avatar: 'LH',
  },
];

// ── Icons ──────────────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

// Shopify-style bag icon
const ShopIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 01-8 0"></path>
  </svg>
);

const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

// ── Component ──────────────────────────────────────────────────────────────────
const Ecommerce = () => {
  const { t } = useTranslation();
  const { onOpenModal } = useOutletContext();
  const location = useLocation();
  const isRtl = i18n.dir(i18n.language) === 'rtl';
  const primaryColor = '#FFA200';
  const darkerColor = '#cc8200';
  const pageStyle = { '--page-primary': primaryColor };

  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const containerRef = useRef(null);
  const featuresRef = useRef(null);
  const curriculumRef = useRef(null);
  const workRef = useRef(null);
  const floatingBadgesRef = useRef([]);

  useGSAP(() => {
    gsap.fromTo(
      '.hero-element',
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.15, ease: 'expo.out' }
    );

    gsap.fromTo(
      '.bento-card',
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.15, ease: 'power4.out',
        scrollTrigger: { trigger: featuresRef.current, start: 'top 75%' },
      }
    );

    gsap.fromTo(
      '.curriculum-header',
      { opacity: 0, y: -20, filter: 'blur(5px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: curriculumRef.current, start: 'top 80%' },
      }
    );

    gsap.fromTo(
      '.curriculum-card',
      { opacity: 0, scale: 0.9, y: 40, filter: 'blur(8px)' },
      {
        opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.1, ease: 'power4.out',
        scrollTrigger: { trigger: '.curriculum-header', start: 'top 60%' },
      }
    );

    gsap.fromTo(
      '.curriculum-btn',
      { opacity: 0, scale: 0.9, y: 20 },
      {
        opacity: 1, scale: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.curriculum-header', start: 'top 60%' },
      }
    );

    gsap.fromTo(
      '.testimonial-card',
      { opacity: 0, x: isRtl ? 50 : -50 },
      {
        opacity: 1, x: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: workRef.current, start: 'top 70%' },
      }
    );

    floatingBadgesRef.current.forEach((el, i) => {
      if (el) {
        gsap.to(el, {
          y: -8,
          duration: 2.2 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.5,
        });
      }
    });
  }, { scope: containerRef });

  return (
    <div className="flex flex-col font-sans overflow-x-hidden" style={pageStyle} ref={containerRef}>

      <style>{`
        @keyframes subtleGrid {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        .ecom-grid-bg {
          background-image:
            linear-gradient(rgba(255,162,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,162,0,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: subtleGrid 14s linear infinite;
        }
        .ecom-hero-visual {
          animation: ecomFloat 6s ease-in-out infinite;
        }
        @keyframes ecomFloat {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-12px) rotate(0deg); }
        }
        .ecom-badge-pill {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
      `}</style>

      {/* ─── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full px-6 lg:px-16 pt-10 pb-24 lg:py-8 flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[calc(100vh-5rem)] overflow-hidden">

        {/* Bg grid */}
        <div className="absolute inset-0 ecom-grid-bg pointer-events-none"></div>
        {/* Orange glow orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle, ${primaryColor}12 0%, transparent 70%)` }}></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle, ${primaryColor}08 0%, transparent 70%)` }}></div>

        {/* Left: Text */}
        <div className="flex-1 space-y-6 relative z-10 max-w-xl" style={{ textAlign: isRtl ? 'right' : 'left' }}>

          {/* Tag badge */}
          <div
            className="hero-element inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{ flexDirection: isRtl ? 'row-reverse' : 'row', backgroundColor: `${primaryColor}1a`, color: primaryColor, border: `1px solid ${primaryColor}30` }}
          >
            <ShopIcon />
            {t('ecomTag', 'Programme 8 Semaines (6h/semaine) — E-Commerce & Marketing Digital')}
          </div>

          <h1 className="hero-element text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-heading">
            {t('ecomHeroTitle1')}{' '}
            <span style={{ color: primaryColor }}>{t('ecomHeroHighlight')}</span>
            <br />{t('ecomHeroTitle2')}
          </h1>

          <p className="hero-element text-base md:text-lg text-slate-500 max-w-lg leading-relaxed">
            {t('ecomHeroSubtitle')}
          </p>

          <div
            className="hero-element flex flex-wrap gap-3"
            style={{ justifyContent: isRtl ? 'flex-end' : 'flex-start', flexDirection: isRtl ? 'row-reverse' : 'row' }}
          >
            <button
              className="text-white text-sm px-8 py-3.5 rounded-xl font-bold transition-all duration-300 hover:opacity-90 hover:-translate-y-1 active:scale-95 shadow-lg"
              style={{ backgroundColor: primaryColor, boxShadow: `0 8px 32px ${primaryColor}40` }}
              onClick={() => onOpenModal && onOpenModal('Hero - Rendez-vous gratuit', 'Confirmer le rendez-vous')}
            >
              {'Rendez-vous gratuit'}
            </button>
            <button
              className="text-slate-700 bg-white border border-slate-200 text-sm px-8 py-3.5 rounded-xl font-bold transition-all duration-300 hover:bg-slate-50 hover:-translate-y-1 hover:shadow-md active:scale-95"
              onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('heroCta2', 'Voir le programme')}
            </button>
          </div>

          {/* Stats row */}
          <div className="hero-element flex flex-wrap gap-6 pt-2">
            <div>
              <div className="text-2xl font-bold font-heading" style={{ color: primaryColor }}>8</div>
              <div className="text-xs text-slate-500">{t('ecomStatLabel1', 'Semaines intensives')}</div>
            </div>
            <div className="w-px bg-slate-200 self-stretch"></div>
            <div>
              <div className="text-2xl font-bold font-heading text-slate-800">Shopify</div>
              <div className="text-xs text-slate-500">{t('ecomStatLabel2', '100% pratique')}</div>
            </div>
            <div className="w-px bg-slate-200 self-stretch"></div>
            <div>
              <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <StarIcon key={i} />)}</div>
              <div className="text-xs text-slate-500 mt-0.5"><strong className="text-slate-800">4.9</strong> {t('heroRating')}</div>
            </div>
            <div className="w-px bg-slate-200 self-stretch"></div>
            <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-white shadow-sm" style={{ borderColor: `${primaryColor}30` }}>
               <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Prix</span>
               <span className="text-sm sm:text-base font-black font-heading text-slate-800">39 000 DA</span>
            </div>
            </div>
          </div>
        </div>

        {/* Right: Visual Section */}
        <div className="hero-element flex-1 w-full max-w-sm sm:max-w-md md:max-w-xl mx-auto relative group mt-4 lg:mt-0 px-4 sm:px-0 z-10">

          {/* Glow behind visual */}
          <div
            className="absolute inset-0 rounded-[2.5rem] blur-3xl transform scale-90 opacity-30 group-hover:opacity-50 transition-opacity duration-700"
            style={{ background: `radial-gradient(ellipse, ${primaryColor}40 0%, transparent 70%)` }}
          ></div>

          {/* Main visual: Shopify-style store mockup built with divs */}
          <div className="relative ecom-hero-visual">
            {/* Store card */}
            <div
              className="w-full rounded-2xl shadow-2xl border border-white/40 relative z-10 overflow-hidden bg-white"
              style={{ boxShadow: `0 30px 80px ${primaryColor}25, 0 0 0 1px ${primaryColor}15` }}
            >
              {/* Store header */}
              <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100" style={{ background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)` }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    </svg>
                  </div>
                  <span className="text-white font-bold text-sm">Ma Boutique</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
              </div>

              {/* Revenue chart */}
              <div className="p-5 bg-slate-50 border-b border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Ventes du mois</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: primaryColor }}>+38%</span>
                </div>
                <div className="flex items-end gap-1.5 h-16">
                  {[35, 55, 40, 72, 60, 88, 75, 95, 82, 100, 90, 78].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-sm transition-all" style={{ height: `${h}%`, backgroundColor: i === 9 ? primaryColor : `${primaryColor}40` }}></div>
                  ))}
                </div>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-2xl font-bold text-slate-800">482 000</span>
                  <span className="text-sm text-slate-500 mb-1">DZD</span>
                </div>
              </div>

              {/* Product list */}
              <div className="p-5 space-y-3 bg-white">
                {[
                  { name: 'Sneakers Premium', price: '12 900 DA', sold: 42 },
                  { name: 'Sac en Cuir', price: '8 500 DA', sold: 31 },
                  { name: 'Montre Tendance', price: '19 900 DA', sold: 18 },
                ].map((product, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: `${primaryColor}${i === 0 ? 'ff' : i === 1 ? 'cc' : '99'}` }}>
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-800">{product.name}</div>
                        <div className="text-xs text-slate-400">{product.sold} vendus</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold" style={{ color: primaryColor }}>{product.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge: Shopify */}
            <div
              ref={el => el && floatingBadgesRef.current.push(el)}
              className="ecom-badge-pill absolute -top-4 -right-2 sm:-right-8 z-20 flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/90 border border-white shadow-xl"
            >
              <span className="text-base">🛍️</span>
              <span className="text-xs font-bold text-slate-800 font-mono">Shopify</span>
            </div>

            {/* Floating badge: Ads */}
            <div
              ref={el => el && floatingBadgesRef.current.push(el)}
              className="ecom-badge-pill absolute -bottom-4 -left-2 sm:-left-8 z-20 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 border border-white shadow-xl"
            >
              <span className="text-base">📊</span>
              <span className="text-xs font-bold text-slate-800 font-mono">Facebook Ads</span>
            </div>

            {/* Floating badge: SEO */}
            <div
              ref={el => el && floatingBadgesRef.current.push(el)}
              className="ecom-badge-pill absolute top-1/3 -left-3 sm:-left-10 z-20 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 border border-white shadow-xl"
            >
              <span className="text-base">🔍</span>
              <span className="text-xs font-bold text-slate-800 font-mono">SEO</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. FEATURES (Bento Box) ─────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold font-heading">{t('ecomFeaturesTitle')}</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t('ecomFeaturesSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[260px]">

            {/* Card 1: Wide — Shopify Mastery */}
            <div className="bento-card md:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between group overflow-hidden relative transition-all hover:shadow-lg">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity" style={{ background: `${primaryColor}15` }}></div>
              <div className="absolute inset-0 opacity-30 rounded-3xl overflow-hidden" style={{ backgroundImage: `linear-gradient(${primaryColor}08 1px, transparent 1px), linear-gradient(90deg, ${primaryColor}08 1px, transparent 1px)`, backgroundSize: '24px 24px' }}></div>
              <div className="relative z-10 w-16 h-16 mb-4 flex items-center justify-center rounded-2xl text-white" style={{ backgroundColor: primaryColor }}>
                <ShopIcon />
              </div>
              <div className="relative z-10">
                <span className="text-xs font-bold tracking-widest uppercase mb-1 block" style={{ color: primaryColor }}>{t('ecomCard1Subtitle')}</span>
                <h3 className="text-2xl font-bold font-heading mb-2 text-slate-800">{t('ecomCard1Title')}</h3>
                <p className="text-slate-500 max-w-md">{t('ecomCard1Desc')}</p>
              </div>
            </div>

            {/* Card 2: Tall dark — Digital Marketing & Ads */}
            <div className="bento-card md:col-span-1 md:row-span-2 bg-slate-950 rounded-3xl p-8 shadow-xl flex flex-col group overflow-hidden relative">
              <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{ backgroundImage: `linear-gradient(${primaryColor}15 1px, transparent 1px), linear-gradient(90deg, ${primaryColor}15 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-auto border relative z-10" style={{ background: `${primaryColor}25`, borderColor: `${primaryColor}40`, color: primaryColor }}>
                <TargetIcon />
              </div>
              <div className="relative z-10 mt-8">
                <h3 className="text-2xl font-bold font-heading mb-3 text-white">{t('ecomCard2Title')}</h3>
                <p className="text-white/70 leading-relaxed">{t('ecomCard2Desc')}</p>
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {['Facebook Ads', 'Instagram', 'Google Ads', 'Retargeting'].map(tool => (
                    <span key={tool} className="text-xs font-mono px-2.5 py-1 rounded-lg border" style={{ color: `${primaryColor}cc`, borderColor: `${primaryColor}40`, backgroundColor: `${primaryColor}20` }}>{tool}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3: Small — SEO & Contenu */}
            <div className="bento-card md:col-span-1 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-center group relative overflow-hidden transition-all hover:shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold font-heading text-slate-800">{t('ecomCard3Title')}</h3>
              </div>
              <p className="text-slate-500 text-sm">{t('ecomCard3Desc')}</p>
            </div>

            {/* Card 4: Small primary — Analytics */}
            <div className="bento-card md:col-span-1 rounded-3xl p-8 shadow-lg flex flex-col justify-center text-white relative overflow-hidden" style={{ backgroundColor: primaryColor }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 relative z-10">
                <TrendingUpIcon />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold font-heading mb-2">{t('ecomCard4Title')}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{t('ecomCard4Desc')}</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16 pt-8 border-t border-slate-100">
            <button
              className="btn-primary px-10 py-4 text-base shadow-lg hover:-translate-y-1 transition-transform"
              style={{ backgroundColor: primaryColor }}
              onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('card1Cta')}
            </button>
          </div>
        </div>
      </section>

      {/* ─── 3. TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${darkerColor} 100%)` }}
        ref={workRef}
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 -translate-y-1/2 translate-x-1/2" style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 translate-y-1/2 -translate-x-1/2" style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold font-heading text-white">{t('ecomTestimonialsTitle')}</h2>
            <div className="flex items-center justify-center gap-2 text-white/80">
              <div className="flex">{[1,2,3,4,5].map(i => <StarIcon key={i} />)}</div>
              <span className="text-lg font-semibold">4.9</span>
              <span className="text-white/50">· 160+ graduates</span>
            </div>
          </div>

          <div className="w-full" dir="ltr">
            <Swiper
              modules={[Autoplay]}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              loop={true}
              autoplay={{ delay: 7000, disableOnInteraction: false }}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 1.5, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 40 },
              }}
              className="testimonials-swiper !pb-12 px-4"
            >
              {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, i) => (
                <SwiperSlide key={i} className="!h-auto flex max-w-[400px]">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 transition-all duration-500 flex flex-col w-full h-full">
                    <div className="flex items-center gap-1 mb-5">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      ))}
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed mb-7 italic flex-1">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold font-heading flex-shrink-0" style={{ background: 'rgba(255,255,255,0.2)' }}>
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                        <div className="text-white/60 text-xs">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="text-center mt-12 relative z-10">
            <button
              className="px-10 py-4 text-base font-bold bg-white text-slate-900 rounded-xl shadow-xl hover:-translate-y-1 transition-all duration-300"
              onClick={() => onOpenModal && onOpenModal('Testimonials - Communauté', 'Rejoindre la communauté')}
            >{t('communityCta')}
            </button>
          </div>
        </div>
      </section>

      {/* ─── 4. CURRICULUM — 4 CARDS ─────────────────────────────────────────── */}
      <section id="curriculum" className="py-24 bg-white" ref={curriculumRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="curriculum-header text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold font-heading">{t('ecomCurriculumTitle')}</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t('ecomCurriculumSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {(t('ecomCurriculumModules', { returnObjects: true }) || []).map((mod, i) => (
              <div
                key={i}
                className="curriculum-card group relative bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Phase number badge */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white font-mono" style={{ backgroundColor: primaryColor }}>
                  {i + 1}
                </div>
                <div className="absolute top-0 bottom-0 w-1 rounded-2xl" style={{ background: primaryColor, [isRtl ? 'right' : 'left']: 0 }}></div>
                <div className={isRtl ? 'pr-4 text-right' : 'pl-4'}>
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: primaryColor }}>{mod.week}</span>
                  <h3 className="text-xl font-bold font-heading mt-1 mb-4">{mod.title}</h3>
                  <ul className="space-y-2">
                    {mod.topics?.map((topic, j) => (
                      <li key={j} className={`flex items-start gap-3 text-slate-500 text-sm ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <span className="flex-shrink-0 mt-0.5" style={{ color: primaryColor }}><CheckIcon /></span>
                        <span className="leading-snug">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center curriculum-btn">
            <button
              className="btn-secondary text-sm px-8 py-3.5 outline outline-1 outline-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-95"
              onClick={() => onOpenModal && onOpenModal('Section d\'info', 'Plus d\'infos')}
            >
              {t('ecomCurriculumCta')}
            </button>
          </div>
        </div>
      </section>

      {/* ─── 5. CONTACT FORM ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
            {/* Left info panel */}
            <div
              className="md:w-2/5 p-10 md:p-14 flex flex-col justify-center"
              style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${darkerColor} 100%)` }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold font-heading text-white leading-tight mb-5">
                {t('contactTitle')}
              </h2>
              <p className="text-white/80 text-base leading-relaxed mb-8">
                {t('ecomContactSubtitle')}
              </p>
              <ul className="space-y-3">
                {[t('contactCheck1'), t('contactCheck2'), t('ecomContactCheck3')].map((item, i) => (
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
            <div className="md:w-3/5 p-10 md:p-14">
              <h3 className="text-xl font-bold font-heading mb-8 text-slate-800">{t('formTitle')}</h3>
              <form className="space-y-5" onSubmit={async (e) => {
                e.preventDefault();
                const success = await submitToHubspot(
                  { name: formData.name, email: formData.email, phone: formData.phone },
                  location.pathname,
                  t('contactTitle', 'Bootcamp Contact'),
                  t
                );
                if (success) setFormData({ name: '', email: '', phone: '' });
              }}>
                <div className="space-y-1.5">
                  <label htmlFor="ecom-name" className="text-sm font-semibold text-slate-600">{t('formName')}</label>
                  <input type="text" id="ecom-name" className="input w-full" placeholder="Ahmed Benali" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="ecom-email" className="text-sm font-semibold text-slate-600">{t('formEmail')}</label>
                  <input type="email" id="ecom-email" className="input w-full" placeholder="ahmed@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="ecom-phone" className="text-sm font-semibold text-slate-600">{t('formPhone')}</label>
                  <div className="flex" dir="ltr">
                    <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm font-sans flex-shrink-0">+213</span>
                    <input type="tel" id="ecom-phone" className="input rounded-l-none w-full" placeholder="555 123 456" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!formData.name || !formData.email || !formData.phone}
                  className="btn-primary w-full py-4 text-base mt-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:-translate-y-0"
                  style={{ boxShadow: `0 8px 32px ${primaryColor}33`, backgroundColor: primaryColor }}
                >
                  {t('formSubmit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Ecommerce;
