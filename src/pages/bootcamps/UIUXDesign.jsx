import React, { useRef, useState, useEffect } from 'react';
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

// Custom icons import
import figmaIcon from '../../assets/ui-ux/figma.png';
import aiIcon from '../../assets/ui-ux/ai.png';
import psIcon from '../../assets/ui-ux/ps.png';

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

// Inline Icons
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const PenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
);

const LayersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ComponentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
    <line x1="12" y1="22" x2="12" y2="15.5"></line>
    <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
    <polyline points="2 15.5 12 8.5 22 15.5"></polyline>
    <line x1="12" y1="2" x2="12" y2="8.5"></line>
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const UIUXDesign = () => {
  const { t } = useTranslation();
  const { onOpenModal } = useOutletContext();
  const location = useLocation();
  const isRtl = i18n.dir(i18n.language) === 'rtl';
  const primaryColor = '#03BF1F';
  const pageStyle = { '--page-primary': primaryColor };
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  
  const containerRef = useRef(null);
  const featuresRef = useRef(null);
  const curriculumRef = useRef(null);
  const workRef = useRef(null);
  const floatingIconsRef = useRef([]);

  useGSAP(() => {
    // 1. Hero Animation (Soft blur, fade in & gentle slide up)
    gsap.fromTo(
      '.hero-element',
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.15, ease: 'expo.out' }
    );

    // 2. Bento Box Features (Stagger with slight scaling)
    gsap.fromTo(
      '.bento-card',
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 75%',
        },
      }
    );

    // 3. Curriculum Animation
    gsap.fromTo(
      '.curriculum-header',
      { opacity: 0, y: -20, filter: 'blur(5px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: curriculumRef.current,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      '.curriculum-card',
      { opacity: 0, scale: 0.9, y: 40, filter: 'blur(8px)' },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.curriculum-header',
          start: 'top 60%',
        },
      }
    );

    gsap.fromTo(
      '.curriculum-btn',
      { opacity: 0, scale: 0.9, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.curriculum-header',
          start: 'top 60%',
        },
      }
    );

    // 4. Students Work / Testimonials Section
    gsap.fromTo(
      '.testimonial-card',
      { opacity: 0, x: isRtl ? 50 : -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: workRef.current,
          start: 'top 70%',
        },
      }
    );

  }, { scope: containerRef });

  return (
    <div className="flex flex-col font-sans overflow-x-hidden" style={pageStyle} ref={containerRef}>

      {/* Injecting Marquee Keyframes */}
      <style>
        {`
          @keyframes marqueeSlide {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 12px)); }
          }
          .animate-marquee {
            animation: marqueeSlide 30s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* ─── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full px-6 lg:px-16 pt-10 pb-20 lg:py-8 flex flex-col lg:flex-row items-center justify-between gap-10 min-h-[calc(100vh-5rem)] overflow-visible">
        
        {/* Left: Text */}
        <div className="flex-1 space-y-5" style={{ textAlign: isRtl ? 'right' : 'left' }}>
          <div
            className="hero-element inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{ flexDirection: isRtl ? 'row-reverse' : 'row', backgroundColor: `${primaryColor}1a`, color: primaryColor, border: `1px solid ${primaryColor}33` }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }}></span>
            {t('bootcampTag')}
          </div>

          <h1 className="hero-element text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-heading">
            {t('uiuxHeroTitle1')}{' '}
            <span style={{ color: primaryColor }}>{t('uiuxHeroHighlight')}</span>
            <br />{t('uiuxHeroTitle2')}
          </h1>

          <p className="hero-element text-base md:text-lg text-slate-500 max-w-lg leading-relaxed">
            {t('uiuxHeroSubtitle')}
          </p>

          <div
            className="hero-element flex flex-wrap gap-3"
            style={{ justifyContent: isRtl ? 'flex-end' : 'flex-start', flexDirection: isRtl ? 'row-reverse' : 'row' }}
          >
            <button 
              className="text-white text-sm px-8 py-3.5 rounded-xl font-bold transition-all duration-300 hover:opacity-90 hover:-translate-y-1 hover:shadow-xl active:scale-95 shadow-lg" 
              style={{ backgroundColor: primaryColor, boxShadow: `0 8px 32px ${primaryColor}40` }} 
              onClick={() => onOpenModal && onOpenModal()}
            >
              {t('heroCta1', 'Start Learning')}
            </button>
            <button 
              className="text-slate-700 bg-white border border-slate-200 text-sm px-8 py-3.5 rounded-xl font-bold transition-all duration-300 hover:bg-slate-50 hover:-translate-y-1 hover:shadow-md active:scale-95" 
              onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('heroCta2', 'View Curriculum')}
            </button>
          </div>

          <div
            className="hero-element flex items-center gap-3 text-slate-500 text-xs pt-1"
            style={{ justifyContent: isRtl ? 'flex-end' : 'flex-start', flexDirection: isRtl ? 'row-reverse' : 'row' }}
          >
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
            </div>
            <span><strong className="text-slate-800">4.9</strong> {t('heroRating')}</span>
          </div>
        </div>

        {/* Right: Creative Visual Container */}
        <div className="hero-element flex-1 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto relative group mt-8 mb-10 lg:my-0 px-6 sm:px-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#03BF1F]/20 to-transparent rounded-[3rem] transform rotate-3 scale-105 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110 blur-2xl"></div>
          
          {/* Main Floating Mockup */}
          <div className="relative bg-white rounded-[2rem] border border-slate-100 shadow-2xl p-5 sm:p-6 flex flex-col gap-4 transform -rotate-1 sm:-rotate-2 transition-transform duration-500 group-hover:rotate-0 z-10 overflow-hidden">
            {/* Fake UI Header */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor }}></div>
              </div>
              <div className="w-20 h-3 rounded-full bg-slate-100"></div>
            </div>
            {/* Fake Content Area */}
            <div className="flex-1 rounded-xl bg-slate-50 border border-slate-100 p-4 relative overflow-hidden">
              <div className="absolute top-4 left-4 w-32 h-32 rounded-full blur-3xl opacity-40 mix-blend-multiply" style={{ backgroundColor: primaryColor }}></div>
              <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full blur-3xl opacity-20 mix-blend-multiply bg-emerald-400"></div>
              
              <div className="space-y-4 relative z-10 w-full">
                <div className="w-1/2 h-4 rounded-full bg-slate-200"></div>
                <div className="w-full h-8 rounded-lg" style={{ backgroundColor: `${primaryColor}20` }}></div>
                <div className="w-full h-24 rounded-lg bg-white shadow-sm border border-slate-100 flex p-3 gap-3">
                   <div className="w-10 h-10 rounded-lg bg-slate-100 flex-shrink-0"></div>
                   <div className="space-y-2 flex-1">
                     <div className="w-full h-2 rounded bg-slate-100"></div>
                     <div className="w-2/3 h-2 rounded bg-slate-100"></div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating UI Elements */}
          <div 
            ref={el => el && floatingIconsRef.current.push(el)}
            className="absolute -right-2 sm:-right-8 top-6 w-14 h-14 sm:w-20 sm:h-20 z-20 flex items-center justify-center p-3 rounded-[1.5rem] bg-white border border-slate-100 shadow-2xl backdrop-blur-sm"
          >
            <img src={figmaIcon} alt="Figma" className="w-full h-full object-contain drop-shadow-md" />
          </div>

          <div 
            ref={el => el && floatingIconsRef.current.push(el)}
            className="absolute -left-2 sm:-left-6 top-24 w-12 h-12 sm:w-16 sm:h-16 z-20 flex items-center justify-center p-2.5 rounded-xl bg-white border border-slate-100 shadow-xl backdrop-blur-sm"
          >
             <img src={aiIcon} alt="Illustrator" className="w-full h-full object-contain drop-shadow-md" />
          </div>

          <div 
            ref={el => el && floatingIconsRef.current.push(el)}
            className="absolute right-6 sm:right-10 -bottom-5 w-12 h-12 sm:w-16 sm:h-16 z-20 flex items-center justify-center p-2.5 rounded-xl bg-white border border-slate-100 shadow-xl backdrop-blur-sm"
          >
             <img src={psIcon} alt="Photoshop" className="w-full h-full object-contain drop-shadow-md" />
          </div>
        </div>
      </section>

      {/* ─── 2. FEATURES (Bento Box Design) ─────────────────────────────── */}
      <section className="bg-slate-50 py-24" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold font-heading">{t('uiuxFeaturesTitle')}</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {t('uiuxFeaturesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {/* Card 1: Large Wide (Figma Mastery) */}
            <div className="bento-card md:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between group overflow-hidden relative transition-all hover:shadow-lg">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#03BF1F]/5 rounded-full blur-3xl group-hover:bg-[#03BF1F]/10 transition-colors"></div>
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#03BF1F]/10 text-[#03BF1F] flex items-center justify-center mb-4 border border-[#03BF1F]/20">
                <PenIcon />
              </div>
              <div className="relative z-10">
                <span className="text-xs font-bold tracking-widest uppercase text-[#03BF1F] mb-1 block">{t('uiuxCard1Subtitle')}</span>
                <h3 className="text-2xl font-bold font-heading mb-2 text-slate-800">{t('uiuxCard1Title')}</h3>
                <p className="text-slate-500 max-w-md">{t('uiuxCard1Desc')}</p>
              </div>
            </div>

            {/* Card 2: Tall narrow (User Research) */}
            <div className="bento-card md:col-span-1 md:row-span-2 bg-slate-900 rounded-3xl p-8 shadow-xl flex flex-col group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#03BF1F]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center mb-auto border border-white/20">
                <UsersIcon />
              </div>
              <div className="relative z-10 mt-8">
                <h3 className="text-2xl font-bold font-heading mb-3 text-white">{t('uiuxCard2Title')}</h3>
                <p className="text-white/70 leading-relaxed">{t('uiuxCard2Desc')}</p>
              </div>
            </div>

            {/* Card 3: Small square (Prototyping) */}
            <div className="bento-card md:col-span-1 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-center group relative overflow-hidden transition-all hover:shadow-lg hover:border-[#03BF1F]/50">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                   <PlayIcon />
                 </div>
                 <h3 className="text-xl font-bold font-heading text-slate-800">{t('uiuxCard3Title')}</h3>
              </div>
              <p className="text-slate-500 text-sm">{t('uiuxCard3Desc')}</p>
            </div>

            {/* Card 4: Standard square (Design Systems) */}
            <div className="bento-card md:col-span-1 bg-[#03BF1F] rounded-3xl p-8 shadow-lg flex flex-col justify-center text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-bl-full"></div>
               <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 relative z-10">
                 <LayersIcon />
               </div>
               <div className="relative z-10">
                 <h3 className="text-xl font-bold font-heading mb-2">{t('uiuxCard4Title')}</h3>
                 <p className="text-white/80 text-sm leading-relaxed">{t('uiuxCard4Desc')}</p>
               </div>
            </div>
          </div>

          {/* Features CTA */}
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

      {/* ─── 3. TESTIMONIALS ────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #028e17 100%)` }}
        ref={workRef}
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 translate-y-1/2 -translate-x-1/2"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold font-heading text-white">{t('uiuxWorkTitle')}</h2>
            <div className="flex items-center justify-center gap-2 text-white/80">
              <div className="flex">
                {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
              </div>
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
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold font-heading flex-shrink-0"
                        style={{ background: 'rgba(255,255,255,0.2)' }}
                      >
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

          {/* Testimonials CTA */}
          <div className="text-center mt-12 relative z-10">
             <button 
               className="px-10 py-4 text-base font-bold bg-white text-slate-900 rounded-xl shadow-xl hover:-translate-y-1 transition-all duration-300" 
               onClick={() => onOpenModal && onOpenModal()}
             >
               {t('communityCta')}
             </button>
          </div>
        </div>
      </section>

      {/* ─── 4. CURRICULUM ───────────────────────────────────────────────── */}
      <section id="curriculum" className="py-24 bg-white" ref={curriculumRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="curriculum-header text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold font-heading">{t('uiuxCurriculumTitle')}</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {t('uiuxCurriculumSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {(t('uiuxCurriculumModules', { returnObjects: true }) || []).map((mod, i) => (
              <div
                key={i}
                className="curriculum-card group relative bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Accent bar — switches sides for RTL */}
                <div
                  className="absolute top-0 bottom-0 w-1 rounded-2xl"
                  style={{ background: primaryColor, [isRtl ? 'right' : 'left']: 0 }}
                ></div>
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
               onClick={() => onOpenModal && onOpenModal()}
             >
                {t('uiuxCurriculumCta')}
             </button>
          </div>
        </div>
      </section>

      {/* ─── 5. CONTACT FORM ─────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
            {/* Left info panel */}
            <div
              className="md:w-2/5 p-10 md:p-14 flex flex-col justify-center"
              style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #028e17 100%)` }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold font-heading text-white leading-tight mb-5">
                {t('contactTitle')}
              </h2>
              <p className="text-white/80 text-base leading-relaxed mb-8">
                {t('contactSubtitle')}
              </p>
              <ul className="space-y-3">
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

            {/* Right form — always LTR layout */}
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
                if (success) {
                  setFormData({ name: '', email: '', phone: '' });
                }
              }}>
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-semibold text-slate-600">{t('formName')}</label>
                  <input type="text" id="name" className="input w-full" placeholder="Ahmed Benali" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-slate-600">{t('formEmail')}</label>
                  <input type="email" id="email" className="input w-full" placeholder="ahmed@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-sm font-semibold text-slate-600">{t('formPhone')}</label>
                  <div className="flex" dir="ltr">
                    <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm font-sans flex-shrink-0">
                      +213
                    </span>
                    <input type="tel" id="phone" className="input rounded-l-none w-full" placeholder="555 123 456" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
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

export default UIUXDesign;
