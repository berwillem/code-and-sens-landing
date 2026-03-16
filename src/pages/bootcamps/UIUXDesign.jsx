import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutletContext, useLocation } from 'react-router-dom';
import i18n from '../../i18n/i18n';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#03BF1F" stroke="#03BF1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const UIUXDesign = () => {
  const { t } = useTranslation();
  const { onOpenModal } = useOutletContext();
  const isRtl = i18n.dir(i18n.language) === 'rtl';
  const primaryColor = '#03BF1F';
  const pageStyle = { '--page-primary': primaryColor };
  
  const containerRef = useRef(null);
  const featuresRef = useRef(null);
  const curriculumRef = useRef(null);
  const workRef = useRef(null);

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
    <div className="flex flex-col font-sans" style={pageStyle} ref={containerRef}>

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
      <section className="w-full px-8 lg:px-16 py-4 flex flex-col lg:flex-row items-center justify-between gap-6 min-h-[calc(100vh-5rem)]">
        
        {/* Left: Text */}
        <div className="flex-1 space-y-5" style={{ textAlign: isRtl ? 'right' : 'left' }}>
          <div
            className="hero-element inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{ flexDirection: isRtl ? 'row-reverse' : 'row', backgroundColor: `${primaryColor}1a`, color: primaryColor, border: `1px solid ${primaryColor}33` }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }}></span>
            UI/UX Design
          </div>

          <h1 className="hero-element text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-heading">
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
        <div className="hero-element flex-1 w-full max-w-lg relative group h-80 lg:h-96">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#03BF1F]/20 to-transparent rounded-[3rem] transform rotate-3 scale-105 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110 blur-2xl"></div>
          
          {/* Main Floating Mockup */}
          <div className="absolute inset-0 bg-white rounded-[2rem] border border-slate-100 shadow-2xl p-6 flex flex-col gap-4 transform -rotate-2 transition-transform duration-500 group-hover:-rotate-1 z-10 overflow-hidden">
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
          <div className="absolute -right-6 top-10 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
             <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: `${primaryColor}30`, color: primaryColor }}><PenIcon /></div>
                <span className="text-xs font-bold font-sans text-slate-700">Auto-Layout</span>
             </div>
          </div>
          <div className="absolute -left-4 bottom-16 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 z-20 animate-bounce" style={{ animationDuration: '4s' }}>
             <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-emerald-200"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-teal-200"></div>
                </div>
                <span className="text-xs font-bold font-sans text-slate-700">Prototype</span>
             </div>
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
        </div>
      </section>

      {/* ─── 3. STUDENTS WORK & TESTIMONIALS ────────────────────────────── */}
      <section className="py-24 overflow-hidden relative" ref={workRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-bold font-heading">{t('uiuxWorkTitle')}</h2>
            <p className="text-lg text-slate-500">
              {t('uiuxWorkSubtitle')}
            </p>
          </div>
          <button className="text-[#03BF1F] font-bold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:opacity-80" onClick={() => onOpenModal && onOpenModal()}>
            {t('heroCta1')} →
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
           
           {/* Left: Testimonials Column */}
           <div className="lg:w-1/3 flex flex-col gap-6">
             {[
               { quote: t('uiuxTestimonial1Quote'), name: t('uiuxTestimonial1Name'), role: t('uiuxTestimonial1Role') },
               { quote: t('uiuxTestimonial2Quote'), name: t('uiuxTestimonial2Name'), role: t('uiuxTestimonial2Role') },
               { quote: t('uiuxTestimonial3Quote'), name: t('uiuxTestimonial3Name'), role: t('uiuxTestimonial3Role') },
             ].map((tItem, idx) => (
                <div key={idx} className="testimonial-card bg-white border border-slate-100 p-6 rounded-2xl shadow-sm relative z-10">
                  <div className="text-[#03BF1F] mb-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.694 20 7.922L20 8.522H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.694 6 7.922L6 8.522H10V18H0Z"/></svg>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">"{tItem.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs">
                      {tItem.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{tItem.name}</h4>
                      <p className="text-xs text-slate-500">{tItem.role}</p>
                    </div>
                  </div>
                </div>
             ))}
           </div>

           {/* Right: Infinite Marquee of Mockups */}
           <div className="lg:w-2/3 relative h-[500px] overflow-hidden rounded-3xl bg-slate-900 shadow-2xl flex items-center">
             
             {/* Gradient Overlays for smooth scrolling edges */}
             <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
             <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10"></div>

             <div className="flex w-[200%] animate-marquee gap-6 px-6">
                {/* Duplicate the children to create the infinite loop effect seamlessly. 
                    We render 6 mockups total (3 original, 3 duplicated).
                */}
                {[1, 2, 3, 1, 2, 3].map((val, idx) => (
                  <div key={idx} className="w-[300px] sm:w-[350px] h-[350px] bg-slate-800 rounded-2xl flex-shrink-0 border border-slate-700 p-4 flex flex-col gap-4 transform transition-transform hover:scale-[1.02]">
                    <div className="flex justify-between items-center">
                      <div className="w-1/2 h-4 rounded-full bg-slate-700"></div>
                      <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                    </div>
                    <div className="w-full h-32 rounded-xl bg-gradient-to-br from-[#03BF1F]/20 to-teal-500/20"></div>
                    <div className="flex gap-2">
                       <div className="flex-1 h-20 rounded-xl bg-slate-700/50"></div>
                       <div className="flex-1 h-20 rounded-xl bg-slate-700/50"></div>
                    </div>
                    <div className="w-3/4 h-3 rounded-full bg-slate-600 mt-2"></div>
                    <div className="w-1/2 h-3 rounded-full bg-slate-700"></div>
                  </div>
                ))}
             </div>
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

    </div>
  );
};

export default UIUXDesign;
