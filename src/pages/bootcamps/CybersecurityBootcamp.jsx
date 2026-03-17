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
import ejptLogo from '../../assets/cybersec/ejpt.png';

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

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

const TerminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const RadarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle><line x1="12" y1="12" x2="19" y2="5"></line></svg>
);

const BugIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="6" width="8" height="14" rx="4"></rect><path d="M19 11h-3"></path><path d="M8 11H5"></path><path d="M19 15h-3"></path><path d="M8 15H5"></path><path d="M17 7h-2"></path><path d="M9 7H7"></path><path d="M12 2v4"></path><path d="M12 20v2"></path></svg>
);

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
);

const NetworkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"></rect><rect x="2" y="16" width="6" height="6" rx="1"></rect><rect x="9" y="2" width="6" height="6" rx="1"></rect><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path><path d="M12 12V8"></path></svg>
);

const CybersecurityBootcamp = () => {
  const { t } = useTranslation();
  const { onOpenModal } = useOutletContext();
  const location = useLocation();
  const isRtl = i18n.dir(i18n.language) === 'rtl';
  const primaryColor = '#FF1717';
  const pageStyle = { '--page-primary': primaryColor };
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  
  const containerRef = useRef(null);
  const featuresRef = useRef(null);
  const curriculumRef = useRef(null);
  const workRef = useRef(null);
  const floatingIconsRef = useRef([]);

  useGSAP(() => {
    gsap.fromTo(
      '.hero-element',
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.15, ease: 'expo.out' }
    );

    gsap.fromTo(
      '.cert-card',
      { opacity: 0, y: 50, scale: 0.95 },
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
    <div className="flex flex-col font-sans overflow-x-hidden bg-slate-950 text-slate-300" style={pageStyle} ref={containerRef}>

      {/* Injecting Marquee Keyframes */}
      <style>
        {`
          @keyframes borderRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-border-rotate {
            animation: borderRotate 4s linear infinite;
          }
          .glass-panel {
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 23, 23, 0.15);
          }
        `}
      </style>

      {/* ─── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full px-6 lg:px-16 pt-10 pb-20 lg:py-8 flex flex-col lg:flex-row items-center justify-between gap-10 min-h-[calc(100vh-5rem)] overflow-visible">
        
        {/* Background ambient light */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF1717] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-900 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

        {/* Left: Text */}
        <div className="flex-1 space-y-5 relative z-10 w-full" style={{ textAlign: isRtl ? 'right' : 'left' }}>
          <div
            className="hero-element inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{ flexDirection: isRtl ? 'row-reverse' : 'row', backgroundColor: `rgba(255, 23, 23, 0.1)`, color: primaryColor, border: `1px solid rgba(255, 23, 23, 0.3)` }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor, boxShadow: `0 0 8px ${primaryColor}` }}></span>
            {t('cyberBootcampTag', '16 Weeks · 12h/Week')}
          </div>

          <h1 className="hero-element text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-heading text-white drop-shadow-lg">
            {t('cyberBootcampHeroTitle1')}{' '}
            <span style={{ color: primaryColor, textShadow: `0 0 20px rgba(255,23,23,0.5)` }}>{t('cyberBootcampHeroHighlight')}</span>
            <br />{t('cyberBootcampHeroTitle2')}
          </h1>

          <p className="hero-element text-base md:text-lg text-slate-400 max-w-lg leading-relaxed">
            {t('cyberBootcampHeroSubtitle')}
          </p>

          <div
            className="hero-element flex flex-wrap gap-3"
            style={{ justifyContent: isRtl ? 'flex-end' : 'flex-start', flexDirection: isRtl ? 'row-reverse' : 'row' }}
          >
            <button 
              className="text-white text-sm px-8 py-3.5 rounded-xl font-bold transition-all duration-300 hover:opacity-90 hover:-translate-y-1 hover:shadow-xl active:scale-95 shadow-lg group relative overflow-hidden" 
              style={{ backgroundColor: primaryColor, boxShadow: `0 8px 32px rgba(255,23,23,0.3)` }} 
              onClick={() => onOpenModal && onOpenModal()}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10">{t('heroCta1', 'Start Learning')}</span>
            </button>
            <button 
              className="text-slate-300 bg-slate-900/50 border border-slate-700 text-sm px-8 py-3.5 rounded-xl font-bold transition-all duration-300 hover:bg-slate-800 hover:-translate-y-1 hover:shadow-md active:scale-95 hover:border-red-500/50" 
              onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('heroCta2', 'View Curriculum')}
            </button>
          </div>

          <div
            className="hero-element flex items-center gap-3 text-slate-400 text-xs pt-1"
            style={{ justifyContent: isRtl ? 'flex-end' : 'flex-start', flexDirection: isRtl ? 'row-reverse' : 'row' }}
          >
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
            </div>
            <span><strong className="text-white">4.9</strong> {t('heroRating')}</span>
          </div>
        </div>

        {/* Right: Creative Visual Container */}
        <div className="hero-element flex-1 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto relative group mt-8 mb-10 lg:my-0 px-6 sm:px-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF1717]/20 to-transparent rounded-[3rem] transform rotate-3 scale-105 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110 blur-2xl"></div>
          
          {/* Main Floating Mockup */}
          <div className="relative bg-slate-900 rounded-[2rem] border border-slate-700 shadow-[0_0_50px_rgba(255,23,23,0.15)] p-5 sm:p-6 flex flex-col gap-4 transform -rotate-1 sm:-rotate-2 transition-transform duration-500 group-hover:rotate-0 z-10 overflow-hidden">
            {/* Fake UI Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor, boxShadow: `0 0 8px ${primaryColor}` }}></div>
              </div>
              <div className="text-xs text-slate-500 font-mono">root@target:~</div>
            </div>
            {/* Fake Content Area */}
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 relative overflow-hidden font-mono text-xs">
              <div className="space-y-2 relative z-10 w-full">
                <div className="text-slate-500">$ nmap -sS -p- 192.168.1.100</div>
                <div className="text-green-500">Starting Nmap 7.92...</div>
                <div className="text-slate-400">Discovered open port 22/tcp</div>
                <div className="text-slate-400">Discovered open port 80/tcp</div>
                <div className="text-[#FF1717] mt-4 blur-[1px] group-hover:blur-0 transition-all duration-300">Target Vulnerable - Exploit Ready</div>
                <div className="w-full h-8 mt-4 rounded border border-red-500/30 bg-red-500/10 flex items-center px-3 gap-2">
                   <div className="w-2 h-4 bg-red-500 animate-pulse"></div>
                   <span className="text-red-400">root access granted_</span>
                </div>
              </div>
               <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </div>
          </div>

          {/* Floating UI Elements */}
          <div 
            ref={el => el && floatingIconsRef.current.push(el)}
            className="absolute -right-2 sm:-right-8 top-6 w-14 h-14 sm:w-20 sm:h-20 z-20 flex items-center justify-center p-3 rounded-[1.5rem] bg-slate-800 border border-slate-600 shadow-2xl backdrop-blur-sm shadow-[#FF1717]/10"
          >
             <div className="text-[#FF1717] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"><ShieldIcon /></div>
          </div>

          <div 
            ref={el => el && floatingIconsRef.current.push(el)}
            className="absolute -left-2 sm:-left-6 top-24 w-12 h-12 sm:w-16 sm:h-16 z-20 flex items-center justify-center p-2.5 rounded-xl bg-slate-800 border border-slate-600 shadow-xl backdrop-blur-sm shadow-[#FF1717]/10"
          >
             <div className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"><TerminalIcon /></div>
          </div>

          <div 
            ref={el => el && floatingIconsRef.current.push(el)}
            className="absolute right-6 sm:right-10 -bottom-5 w-12 h-12 sm:w-16 sm:h-16 z-20 flex items-center justify-center p-2.5 rounded-xl bg-slate-800 border border-slate-600 shadow-xl backdrop-blur-sm shadow-[#FF1717]/10"
          >
             <div className="text-slate-300 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"><LockIcon /></div>
          </div>
        </div>
      </section>

      {/* ─── 2. eJPT CERTIFICATION SECTION ─────────────────────────────── */}
      <section className="bg-slate-900 border-t border-b border-slate-800 py-24 relative overflow-hidden" ref={featuresRef}>
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF1717]/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/20 mb-4">
              <TargetIcon /> {t('cyberBootcampCertTitle')}
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold font-heading text-white">{t('cyberBootcampCertSubtitle')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="cert-card glass-panel rounded-2xl p-8 flex flex-col group hover:border-[#FF1717]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,23,23,0.1)] hover:-translate-y-2">
               <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 text-red-500 group-hover:scale-110 group-hover:bg-red-500/10 transition-all duration-300">
                 <NetworkIcon />
               </div>
               <h3 className="text-xl font-bold font-heading text-white mb-3">{t('cyberBootcampCard1Title')}</h3>
               <p className="text-slate-400 text-sm leading-relaxed">{t('cyberBootcampCard1Desc')}</p>
            </div>

            {/* Card 2 */}
            <div className="cert-card glass-panel rounded-2xl p-8 flex flex-col group hover:border-[#FF1717]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,23,23,0.1)] hover:-translate-y-2">
               <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 text-red-500 group-hover:scale-110 group-hover:bg-red-500/10 transition-all duration-300">
                 <BugIcon />
               </div>
               <h3 className="text-xl font-bold font-heading text-white mb-3">{t('cyberBootcampCard2Title')}</h3>
               <p className="text-slate-400 text-sm leading-relaxed">{t('cyberBootcampCard2Desc')}</p>
            </div>

            {/* Card 3 */}
            <div className="cert-card glass-panel rounded-2xl p-8 flex flex-col group hover:border-[#FF1717]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,23,23,0.1)] hover:-translate-y-2">
               <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 text-red-500 group-hover:scale-110 group-hover:bg-red-500/10 transition-all duration-300">
                 <RadarIcon />
               </div>
               <h3 className="text-xl font-bold font-heading text-white mb-3">{t('cyberBootcampCard3Title')}</h3>
               <p className="text-slate-400 text-sm leading-relaxed">{t('cyberBootcampCard3Desc')}</p>
            </div>

            {/* Card 4 - Highlighted eJPT with logo */}
            <div className="cert-card bg-gradient-to-br from-red-600 to-red-900 rounded-2xl p-8 flex flex-col group hover:-translate-y-2 transition-all duration-300 shadow-[0_10px_40px_rgba(255,23,23,0.3)] border border-red-500/50 relative overflow-hidden">
               <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
               {/* eJPT Logo */}
               <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20 overflow-hidden">
                 <img src={ejptLogo} alt="eJPT" className="w-full h-full object-contain p-1" />
               </div>
               <h3 className="text-xl font-bold font-heading text-white mb-3 relative z-10">{t('cyberBootcampCard4Title')}</h3>
               <p className="text-white/80 text-sm leading-relaxed relative z-10">{t('cyberBootcampCard4Desc')}</p>
            </div>

          </div>

          {/* Features CTA */}
          <div className="text-center mt-16 pt-8 border-t border-slate-800">
             <button 
               className="btn-primary px-10 py-4 text-base shadow-[0_0_20px_rgba(255,23,23,0.4)] hover:-translate-y-1 transition-transform border border-red-500/50" 
               style={{ backgroundColor: primaryColor, color: 'white' }}
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
        style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #800b0b 100%)` }}
        ref={workRef}
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 translate-y-1/2 -translate-x-1/2"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold font-heading text-white">{t('testimonialsTitle')}</h2>
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
                  <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-8 border border-white/10 transition-all duration-500 flex flex-col w-full h-full shadow-xl">
                    <div className="flex items-center gap-1 mb-5">
                       {[...Array(testimonial.rating)].map((_, j) => (
                         <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#FF1717]">
                           <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                         </svg>
                       ))}
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-7 italic flex-1">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold font-heading flex-shrink-0"
                        style={{ background: 'rgba(255,23,23,0.2)', border: '1px solid rgba(255,23,23,0.5)' }}
                      >
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                        <div className="text-slate-400 text-xs">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="text-center mt-12 relative z-10">
             <button 
               className="px-10 py-4 text-base font-bold bg-white text-slate-900 rounded-xl shadow-xl hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_20px_white]" 
               onClick={() => onOpenModal && onOpenModal()}
             >
               {t('communityCta')}
             </button>
          </div>
        </div>
      </section>

      {/* ─── 4. CURRICULUM ───────────────────────────────────────────────── */}
      <section id="curriculum" className="py-24 bg-slate-950" ref={curriculumRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="curriculum-header text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold font-heading text-white">{t('cyberBootcampCurriculumTitle')}</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {t('cyberBootcampCurriculumSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {(t('cyberBootcampCurriculumModules', { returnObjects: true }) || []).map((mod, i) => (
              <div
                key={i}
                className="curriculum-card group relative bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-sm hover:shadow-[0_0_30px_rgba(255,23,23,0.1)] hover:border-red-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className="absolute top-0 bottom-0 w-1 rounded-2xl transition-all duration-300 group-hover:w-2"
                  style={{ background: primaryColor, [isRtl ? 'right' : 'left']: 0 }}
                ></div>
                <div className={isRtl ? 'pr-4 text-right' : 'pl-4'}>
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: primaryColor }}>{mod.week}</span>
                  <h3 className="text-xl font-bold font-heading mt-1 mb-4 text-white">{mod.title}</h3>
                  <ul className="space-y-2">
                    {mod.topics?.map((topic, j) => (
                      <li key={j} className={`flex items-start gap-3 text-slate-400 text-sm ${isRtl ? 'flex-row-reverse' : ''}`}>
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
               className="btn-secondary text-sm px-8 py-3.5 outline outline-1 outline-slate-700 text-white bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-red-500/50 active:scale-95" 
               onClick={() => onOpenModal && onOpenModal()}
             >
                {t('curriculumCta')}
             </button>
          </div>
        </div>
      </section>

      {/* ─── 5. CONTACT FORM ─────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-900 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-950 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-800">
            {/* Left info panel */}
            <div
              className="md:w-2/5 p-10 md:p-14 flex flex-col justify-center relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #800b0b 100%)` }}
            >
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
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
            </div>

            {/* Right form */}
            <div className="md:w-3/5 p-10 md:p-14 bg-slate-950">
              <h3 className="text-xl font-bold font-heading mb-8 text-white">{t('formTitle')}</h3>
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
                  <label htmlFor="bc-name" className="text-sm font-semibold text-slate-400">{t('formName')}</label>
                  <input type="text" id="bc-name" className="input w-full bg-slate-900 border-slate-800 text-white focus:border-red-500/50 focus:ring-red-500/20" placeholder="Ahmed Benali" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="bc-email" className="text-sm font-semibold text-slate-400">{t('formEmail')}</label>
                  <input type="email" id="bc-email" className="input w-full bg-slate-900 border-slate-800 text-white focus:border-red-500/50 focus:ring-red-500/20" placeholder="ahmed@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="bc-phone" className="text-sm font-semibold text-slate-400">{t('formPhone')}</label>
                  <div className="flex" dir="ltr">
                    <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-slate-800 bg-slate-900 text-slate-400 text-sm font-sans flex-shrink-0">
                      +213
                    </span>
                    <input type="tel" id="bc-phone" className="input rounded-l-none w-full bg-slate-900 border-slate-800 text-white focus:border-red-500/50 focus:ring-red-500/20" placeholder="555 123 456" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!formData.name || !formData.email || !formData.phone}
                  className="btn-primary w-full py-4 text-base mt-2 shadow-[0_0_20px_rgba(255,23,23,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:-translate-y-0 disabled:shadow-none border border-red-500/50"
                  style={{ backgroundColor: primaryColor, color: 'white' }}
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

export default CybersecurityBootcamp;
