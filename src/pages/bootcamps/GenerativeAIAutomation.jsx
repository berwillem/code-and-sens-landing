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

// Assets
import chatgptIcon from '../../assets/genai/chatgpt.png';
import n8nIcon from '../../assets/genai/n8n.png';
import aiAssistantIcon from '../../assets/genai/ai-assistant.png';

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

const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24A2.5 2.5 0 0 1 9.5 2Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24A2.5 2.5 0 0 0 14.5 2Z"></path>
  </svg>
);

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

// ── Component ──────────────────────────────────────────────────────────────────
const GenerativeAIAutomation = () => {
  const { t } = useTranslation();
  const { onOpenModal } = useOutletContext();
  const location = useLocation();
  const isRtl = i18n.dir(i18n.language) === 'rtl';
  const primaryColor = '#8C00FF';
  const darkerColor = '#6300b3';
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

    // Floating icons subtle bob
    floatingIconsRef.current.forEach((el, i) => {
      gsap.to(el, {
        y: -10,
        duration: 2 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.4,
      });
    });
  }, { scope: containerRef });

  return (
    <div className="flex flex-col font-sans overflow-x-hidden" style={pageStyle} ref={containerRef}>

      <style>{`
        @keyframes aiPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes gridFlow {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        .ai-grid-bg {
          background-image: linear-gradient(rgba(140,0,255,0.07) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(140,0,255,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridFlow 8s linear infinite;
        }
        .ai-glow {
          box-shadow: 0 0 40px rgba(140,0,255,0.25), 0 0 80px rgba(140,0,255,0.1);
        }
        @keyframes tokenFlow {
          0% { transform: translateY(0) translateX(0); opacity: 0.8; }
          100% { transform: translateY(-60px) translateX(10px); opacity: 0; }
        }
        .token-particle {
          animation: tokenFlow 3s ease-out infinite;
        }
      `}</style>

      {/* ─── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full px-6 lg:px-16 pt-10 pb-20 lg:py-8 flex flex-col lg:flex-row items-center justify-between gap-10 min-h-[calc(100vh-5rem)] overflow-hidden">
        
        {/* Animated bg grid */}
        <div className="absolute inset-0 ai-grid-bg opacity-60 pointer-events-none"></div>
        {/* Glow blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle, ${primaryColor}18 0%, transparent 70%)` }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle, ${primaryColor}12 0%, transparent 70%)` }}></div>

        {/* Left: Text */}
        <div className="flex-1 space-y-5 relative z-10" style={{ textAlign: isRtl ? 'right' : 'left' }}>
          <div
            className="hero-element inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{ flexDirection: isRtl ? 'row-reverse' : 'row', backgroundColor: `${primaryColor}1a`, color: primaryColor, border: `1px solid ${primaryColor}33` }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }}></span>
            {t('genaiTag', 'Programme 5 Semaines (6h/semaine) — IA & Automation')}
          </div>

          <h1 className="hero-element text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-heading">
            {t('genaiHeroTitle1')}{' '}
            <span style={{ color: primaryColor }}>{t('genaiHeroHighlight')}</span>
            <br />{t('genaiHeroTitle2')}
          </h1>

          <p className="hero-element text-base md:text-lg text-slate-500 max-w-lg leading-relaxed">
            {t('genaiHeroSubtitle')}
          </p>

          <div
            className="hero-element flex flex-wrap gap-3"
            style={{ justifyContent: isRtl ? 'flex-end' : 'flex-start', flexDirection: isRtl ? 'row-reverse' : 'row' }}
          >
            <button
              className="text-white text-sm px-8 py-3.5 rounded-xl font-bold transition-all duration-300 hover:opacity-90 hover:-translate-y-1 hover:shadow-xl active:scale-95 shadow-lg"
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
              <div className="text-2xl font-bold font-heading" style={{ color: primaryColor }}>10x</div>
              <div className="text-xs text-slate-500">{t('genaiStatLabel1', 'Productivité augmentée')}</div>
            </div>
            <div className="w-px bg-slate-200 self-stretch"></div>
            <div>
              <div className="text-2xl font-bold font-heading text-slate-800">5</div>
              <div className="text-xs text-slate-500">{t('genaiStatLabel2', 'Semaines intensives')}</div>
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
               <span className="text-sm sm:text-base font-black font-heading text-slate-800">35 000 DA</span>
            </div>
            </div>
          </div>
        </div>

        {/* Right: AI Visual */}
        <div className="hero-element flex-1 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto relative group mt-8 mb-10 lg:my-0 px-6 sm:px-0 z-10">
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-[3rem] transform rotate-3 scale-105 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110 blur-2xl" style={{ background: `linear-gradient(135deg, ${primaryColor}30 0%, transparent 70%)` }}></div>
          
          {/* Main card — AI chatbot mockup */}
          <div className="relative bg-slate-950 rounded-[2rem] border border-purple-900/40 shadow-2xl p-5 sm:p-6 flex flex-col gap-4 transform -rotate-1 sm:-rotate-2 transition-transform duration-500 group-hover:rotate-0 z-10 overflow-hidden ai-glow">
            {/* Window chrome */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor }}></div>
              </div>
              <div className="flex items-center gap-2 text-xs text-purple-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                AI Assistant
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex flex-col gap-3 px-1">
              {/* User message */}
              <div className="self-end max-w-[85%]">
                <div className="bg-white/10 text-white/90 text-xs rounded-2xl rounded-br-sm px-4 py-2.5 leading-relaxed">
                  {t('genaiHeroChatMsg1', 'Génère un rapport marketing hebdomadaire automatiquement.')}
                </div>
              </div>
              {/* AI response */}
              <div className="self-start max-w-[85%]">
                <div className="text-white/90 text-xs rounded-2xl rounded-bl-sm px-4 py-2.5 leading-relaxed border border-purple-500/30" style={{ background: `linear-gradient(135deg, ${primaryColor}33 0%, ${primaryColor}11 100%)` }}>
                  ✓ {t('genaiHeroChatMsg2', 'Rapport généré. Workflow n8n déclenché. 4 tâches automatisées.')}
                </div>
              </div>
              {/* Automation tags */}
              <div className="flex flex-wrap gap-1.5 mt-1">
                {['GPT-4o', 'n8n', 'Make', 'Zapier'].map(tag => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-full border text-purple-300 border-purple-700/50 bg-purple-900/30">{tag}</span>
                ))}
              </div>
              {/* Progress indicators */}
              <div className="space-y-1.5 mt-1">
                {[{ label: 'Analyse données', pct: 100 }, { label: 'Génération contenu', pct: 78 }, { label: 'Export rapport', pct: 45 }].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="text-[10px] text-purple-400 w-32 font-mono truncate">{item.label}</div>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${item.pct}%`, background: `linear-gradient(90deg, ${primaryColor}, #c44dff)` }}></div>
                    </div>
                    <div className="text-[10px] text-purple-400 font-mono">{item.pct}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Tool Icons */}
          <div
            ref={el => el && floatingIconsRef.current.push(el)}
            className="absolute -right-2 sm:-right-8 top-4 w-14 h-14 sm:w-20 sm:h-20 z-20 flex items-center justify-center p-3 rounded-[1.5rem] bg-white border border-slate-100 shadow-2xl backdrop-blur-sm"
          >
            <img src={chatgptIcon} alt="ChatGPT" className="w-full h-full object-contain drop-shadow-md" />
          </div>

          <div
            ref={el => el && floatingIconsRef.current.push(el)}
            className="absolute -left-2 sm:-left-6 top-20 w-12 h-12 sm:w-16 sm:h-16 z-20 flex items-center justify-center p-2.5 rounded-xl bg-white border border-slate-100 shadow-xl backdrop-blur-sm"
          >
            <img src={n8nIcon} alt="n8n" className="w-full h-full object-contain drop-shadow-md" />
          </div>

          <div
            ref={el => el && floatingIconsRef.current.push(el)}
            className="absolute right-6 sm:right-10 -bottom-5 w-12 h-12 sm:w-16 sm:h-16 z-20 flex items-center justify-center p-2.5 rounded-xl bg-white border border-slate-100 shadow-xl backdrop-blur-sm"
          >
            <img src={aiAssistantIcon} alt="AI Assistant" className="w-full h-full object-contain drop-shadow-md" />
          </div>
        </div>
      </section>

      {/* ─── 2. FEATURES (Bento Box) ─────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold font-heading">{t('genaiFeaturesTitle')}</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t('genaiFeaturesSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {/* Card 1: Wide — Prompt Engineering */}
            <div className="bento-card md:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between group overflow-hidden relative transition-all hover:shadow-lg">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full blur-3xl group-hover:opacity-100 opacity-50 transition-opacity" style={{ background: `${primaryColor}10` }}></div>
              {/* Faint grid pattern */}
              <div className="absolute inset-0 opacity-30 rounded-3xl overflow-hidden" style={{ backgroundImage: `linear-gradient(${primaryColor}10 1px, transparent 1px), linear-gradient(90deg, ${primaryColor}10 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
              <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor, borderColor: `${primaryColor}30` }}>
                <BrainIcon />
              </div>
              <div className="relative z-10">
                <span className="text-xs font-bold tracking-widest uppercase mb-1 block" style={{ color: primaryColor }}>{t('genaiCard1Subtitle')}</span>
                <h3 className="text-2xl font-bold font-heading mb-2 text-slate-800">{t('genaiCard1Title')}</h3>
                <p className="text-slate-500 max-w-md">{t('genaiCard1Desc')}</p>
              </div>
            </div>

            {/* Card 2: Tall narrow dark — Automation & n8n */}
            <div className="bento-card md:col-span-1 md:row-span-2 bg-slate-950 rounded-3xl p-8 shadow-xl flex flex-col group overflow-hidden relative">
              <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{ backgroundImage: `linear-gradient(${primaryColor}15 1px, transparent 1px), linear-gradient(90deg, ${primaryColor}15 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-auto border relative z-10" style={{ background: `${primaryColor}25`, borderColor: `${primaryColor}40`, color: primaryColor }}>
                <ZapIcon />
              </div>
              <div className="relative z-10 mt-8">
                <h3 className="text-2xl font-bold font-heading mb-3 text-white">{t('genaiCard2Title')}</h3>
                <p className="text-white/70 leading-relaxed">{t('genaiCard2Desc')}</p>
                {/* Tool badges */}
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {['n8n', 'Make', 'API', 'Webhook'].map(tool => (
                    <span key={tool} className="text-xs font-mono px-2.5 py-1 rounded-lg text-purple-300 border border-purple-700/50 bg-purple-900/30">{tool}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3: Small — AI for Business */}
            <div className="bento-card md:col-span-1 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-center group relative overflow-hidden transition-all hover:shadow-lg" style={{ '--tw-border-opacity': 1 }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                  <TargetIcon />
                </div>
                <h3 className="text-xl font-bold font-heading text-slate-800">{t('genaiCard3Title')}</h3>
              </div>
              <p className="text-slate-500 text-sm">{t('genaiCard3Desc')}</p>
            </div>

            {/* Card 4: Small primary — Real-world Impact */}
            <div className="bento-card md:col-span-1 rounded-3xl p-8 shadow-lg flex flex-col justify-center text-white relative overflow-hidden" style={{ backgroundColor: primaryColor }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-bl-full"></div>
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 relative z-10">
                <TrendingUpIcon />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold font-heading mb-2">{t('genaiCard4Title')}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{t('genaiCard4Desc')}</p>
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
            <h2 className="text-4xl lg:text-5xl font-bold font-heading text-white">{t('genaiTestimonialsTitle')}</h2>
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

      {/* ─── 4. CURRICULUM ───────────────────────────────────────────────────── */}
      <section id="curriculum" className="py-24 bg-white" ref={curriculumRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="curriculum-header text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold font-heading">{t('genaiCurriculumTitle')}</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t('genaiCurriculumSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {(t('genaiCurriculumModules', { returnObjects: true }) || []).map((mod, i) => (
              <div
                key={i}
                className="curriculum-card group relative bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Week number badge */}
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white font-mono" style={{ backgroundColor: primaryColor }}>
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
              {t('genaiCurriculumCta')}
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
                {t('genaiContactSubtitle')}
              </p>
              <ul className="space-y-3">
                {[t('contactCheck1'), t('contactCheck2'), t('genaiContactCheck3')].map((item, i) => (
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
                  <label htmlFor="genai-name" className="text-sm font-semibold text-slate-600">{t('formName')}</label>
                  <input type="text" id="genai-name" className="input w-full" placeholder="Ahmed Benali" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="genai-email" className="text-sm font-semibold text-slate-600">{t('formEmail')}</label>
                  <input type="email" id="genai-email" className="input w-full" placeholder="ahmed@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="genai-phone" className="text-sm font-semibold text-slate-600">{t('formPhone')}</label>
                  <div className="flex" dir="ltr">
                    <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm font-sans flex-shrink-0">+213</span>
                    <input type="tel" id="genai-phone" className="input rounded-l-none w-full" placeholder="555 123 456" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
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

export default GenerativeAIAutomation;
