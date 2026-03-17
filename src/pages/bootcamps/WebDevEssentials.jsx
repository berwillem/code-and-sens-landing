import React, { useRef, useState } from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/i18n';
import { submitToHubspot } from '../../utils/hubspot';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import javascriptImg from '../../assets/web/javascript.png';
import reactImg from '../../assets/web/react.png';
import gitImg from '../../assets/web/git.png';
import cert1Img from '../../assets/web/certification1.png';
import cert2Img from '../../assets/web/certification2.png';

gsap.registerPlugin(ScrollTrigger);

// SVG Icons
const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);


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

const WebDevEssentials = () => {
  const { t } = useTranslation();
  const { onOpenModal } = useOutletContext();
  const location = useLocation();
  const isRtl = i18n.dir(i18n.language) === 'rtl';
  const primaryColor = '#294CFF';
  const pageStyle = { '--page-primary': primaryColor };

  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const curriculumRef = useRef(null);

  useGSAP(() => {
    // 1. Hero Animation (Soft blur, fade in & gentle slide up)
    gsap.fromTo(
      '.hero-element',
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.15, ease: 'expo.out' }
    );

    // 2. Features Animation (Smooth stagger with slight scaling)
    gsap.fromTo(
      '.feature-card',
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 75%',
        },
      }
    );

    // 3. Curriculum Animation (Header elegant reveal, cards stagger up with blur)
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

  }, { scope: containerRef });

  return (
    <div className="flex flex-col font-sans" style={pageStyle} ref={containerRef}>

      {/* ─── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full px-8 lg:px-16 py-4 flex flex-col lg:flex-row items-center justify-between gap-6 min-h-[calc(100vh-5rem)] overflow-hidden lg:overflow-visible">
        
        {/* Animated Background Lights */}
        <div className="absolute top-20 right-0 lg:right-20 w-80 h-80 bg-[#294CFF] rounded-full mix-blend-multiply filter blur-[100px] opacity-15 animate-blob animation-delay-2000 pointer-events-none z-0"></div>

        {/* Left: Text */}
        <div className="relative z-10 flex-1 space-y-5" style={{ textAlign: isRtl ? 'right' : 'left' }}>
          <div
            className="hero-element inline-flex items-center gap-2 bg-[#294CFF]/10 text-[#294CFF] px-4 py-1.5 rounded-full text-xs font-semibold border border-[#294CFF]/20"
            style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#294CFF] animate-pulse"></span>
            {t('bootcampTag')}
          </div>

          <h1 className="hero-element text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-heading">
            {t('heroTitle1')}{' '}
            <span className="text-[#294CFF]">{t('heroHighlight')}</span>
            <br />{t('heroTitle2')}
          </h1>

          <p className="hero-element text-base text-slate-500 max-w-lg leading-relaxed">
            {t('heroSubtitle')}
          </p>

          <div
            className="hero-element flex flex-wrap gap-3"
            style={{ justifyContent: isRtl ? 'flex-end' : 'flex-start', flexDirection: isRtl ? 'row-reverse' : 'row' }}
          >
            <button className="btn-primary text-sm px-7 py-3 shadow-lg" style={{ boxShadow: '0 8px 32px #294CFF33' }} onClick={() => onOpenModal && onOpenModal()}>
              {t('heroCta1')}
            </button>
            <button className="btn-secondary text-sm px-7 py-3" onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}>
              {t('heroCta2')}
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

        {/* Right: Code Mockup — always LTR regardless of language */}
        <div className="hero-element flex-1 w-full max-w-md relative group" dir="ltr">
          <div
            className="absolute -inset-1 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition duration-700"
            style={{ background: 'linear-gradient(135deg, #294CFF, #00c6ff)' }}
          ></div>
          <div className="relative bg-[#0d1117] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <div className="h-9 bg-[#161b22] border-b border-white/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
              <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
              <span className="ml-3 text-xs text-slate-500 font-sans">codeandsens.jsx</span>
            </div>
            <div className="p-6 text-sm text-slate-300 leading-loose font-sans text-left">
              <span className="text-pink-400 font-bold">import</span>{' '}
              <span className="text-teal-300">React</span>{' '}
              <span className="text-pink-400 font-bold">from</span>{' '}
              <span className="text-orange-300">'react'</span>;
              <br /><br />
              <span className="text-pink-400 font-bold">const</span>{' '}
              <span className="text-blue-300 font-bold">CodeAndSens</span>{' '}
              <span className="text-pink-400 font-bold">= () =&gt;</span> {'{'}
              <br />
              &nbsp;&nbsp;<span className="text-pink-400 font-bold">return</span> (
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-indigo-400">Career</span>{' '}
              <span className="text-slate-400">status</span>=
              <span className="text-orange-300">"واش راك تستنى ؟"</span> /&gt;
              <br />
              &nbsp;&nbsp;);
              <br />
              {'}'};
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. EVERYTHING YOU NEED ─────────────────────────────────────── */}
      <section className="bg-slate-50 py-24" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold font-heading">{t('featuresTitle')}</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {t('featuresSubtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Card 1: Coworking (Formerly Card 2) */}
            <div className="feature-card card-clickable bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-lg flex flex-col group">
              <div className="h-52 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-cyan-50 to-sky-50">
                <div className="flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-600 shadow-md animate-float" style={{animationDelay: '0s'}}>
                    <RocketIcon />
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-600 shadow-md animate-float" style={{animationDelay: '0.3s'}}>
                    <UsersIcon />
                  </div>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold font-heading mb-3 group-hover:text-cyan-600 transition-colors">{t('card2Title')}</h3>
                <p className="text-slate-500 leading-relaxed flex-1 mb-6">{t('card2Desc')}</p>
                <button className="btn-secondary w-full text-sm uppercase tracking-wider" onClick={() => onOpenModal && onOpenModal()}>{t('card2Cta')}</button>
              </div>
            </div>

            {/* Card 2: Modern Tech Stack (Formerly Card 1) */}
            <div className="feature-card card-clickable bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-lg flex flex-col group">
              <div className="h-52 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#294CFF]/10 to-[#294CFF]/5">
                <div className="flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-md animate-float" style={{animationDelay: '0s'}}>
                    <img src={javascriptImg} alt="JS" className="w-10 h-10 object-contain" />
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-md animate-float" style={{animationDelay: '0.2s'}}>
                    <img src={reactImg} alt="React" className="w-10 h-10 object-contain" />
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-md animate-float" style={{animationDelay: '0.4s'}}>
                    <img src={gitImg} alt="Git" className="w-10 h-10 object-contain" />
                  </div>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold font-heading mb-3 group-hover:text-[#294CFF] transition-colors">{t('card1Title')}</h3>
                <p className="text-slate-500 leading-relaxed flex-1 mb-6">{t('card1Desc')}</p>
                <button className="btn-secondary w-full text-sm uppercase tracking-wider" onClick={() => onOpenModal && onOpenModal()}>{t('card1Cta')}</button>
              </div>
            </div>

            {/* Card 3: Certifications */}
            <div className="feature-card card-clickable bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-lg flex flex-col group">
              <div className="h-52 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-50 to-violet-50">
                <div className="flex gap-5 items-center">
                  <div className="w-20 h-20 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-md animate-float" style={{animationDelay: '0s'}}>
                    <img src={cert1Img} alt="Cert 1" className="w-14 h-14 object-contain" />
                  </div>
                  <div className="w-20 h-20 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-md animate-float" style={{animationDelay: '0.3s'}}>
                    <img src={cert2Img} alt="Cert 2" className="w-14 h-14 object-contain" />
                  </div>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold font-heading mb-3 group-hover:text-indigo-600 transition-colors">{t('card3Title')}</h3>
                <p className="text-slate-500 leading-relaxed flex-1 mb-6">{t('card3Desc')}</p>
                <button className="btn-secondary w-full text-sm uppercase tracking-wider" onClick={() => onOpenModal && onOpenModal()}>{t('card3Cta')}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. CURRICULUM ───────────────────────────────────────────────── */}
      <section id="curriculum" className="py-24 bg-white" ref={curriculumRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="curriculum-header text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold font-heading">{t('curriculumTitle')}</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {t('curriculumSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {(t('curriculumModules', { returnObjects: true }) || []).map((mod, i) => (
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
                  <span className="text-xs font-semibold tracking-widest text-[#294CFF] uppercase">{mod.week}</span>
                  <h3 className="text-xl font-bold font-heading mt-1 mb-4">{mod.title}</h3>
                  <ul className="space-y-2">
                    {mod.topics.map((topic, j) => (
                      <li key={j} className={`flex items-start gap-3 text-slate-500 text-sm ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <span className="text-[#294CFF] flex-shrink-0 mt-0.5"><CheckIcon /></span>
                        <span className="leading-snug">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="curriculum-btn btn-primary px-10 py-4 text-base shadow-lg" onClick={() => onOpenModal && onOpenModal()}>
              {t('curriculumCta')}
            </button>
          </div>
        </div>
      </section>

      {/* ─── 4. TESTIMONIALS ─────────────────────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, #294CFF 0%, #1a35cc 100%)` }}
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
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 transition-all duration-500 flex flex-col w-full h-full">
                    <div className="flex items-center gap-1 mb-5">
                      {[...Array(testimonial.rating)].map((_, j) => <StarIcon key={j} />)}
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
               className="btn-primary bg-white text-[var(--page-primary,#4F46E5)] px-10 py-4 text-base font-bold rounded-xl shadow-xl hover:-translate-y-1 transition-all duration-300" 
               onClick={() => onOpenModal && onOpenModal()}
             >
               {t('communityCta')}
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
              style={{ background: `linear-gradient(135deg, #294CFF 0%, #1a35cc 100%)` }}
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
                  <input type="email" id="email" className="input w-full" placeholder="codeandsens@contact.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-sm font-semibold text-slate-600">{t('formPhone')}</label>
                  <div className="flex" dir="ltr">
                    <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm font-sans flex-shrink-0">
                      +213
                    </span>
                    <input type="tel" id="phone" className="input rounded-l-none w-full" placeholder="0668 30 15 69" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!formData.name || !formData.email || !formData.phone}
                  className="btn-primary w-full py-4 text-base mt-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:-translate-y-0"
                  style={{ boxShadow: '0 8px 32px #294CFF33' }}
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

export default WebDevEssentials;
