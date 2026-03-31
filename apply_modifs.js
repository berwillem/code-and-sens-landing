import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bootcampsDir = path.join(__dirname, 'src', 'pages', 'bootcamps');
const files = fs.readdirSync(bootcampsDir).filter(f => f.endsWith('.jsx'));

const priceMap = {
  'GenerativeAIAutomation.jsx': '30 000 DA',
  'Ecommerce.jsx': '35 000 DA',
  'CybersecurityBootcamp.jsx': 'A partir de 40 000 DA',
  'CybersecurityIntroduction.jsx': '40 000 DA',
  'PowerBI.jsx': '60 000 DA',
  'UIUXDesign.jsx': '50 000 DA',
  'WebDevEssentials.jsx': '35 000 DA'
};

files.forEach(file => {
  const filePath = path.join(bootcampsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Email fix
  content = content.replace(/codeandsens@contact\.com/g, 'contact@codeansens.com');

  // 2. Hero CTA text
  content = content.replace(/\{t\('heroCta1'(?:,\s*['"].*?['"])?\)\}/g, "{'Rendez-vous gratuit'}");

  // 3. Smart Tracking for onOpenModal
  // Using contextual replacement
  const isDark = file.includes('Cybersecurity');
  
  // Hero
  let heroReplaced = false;
  content = content.replace(/onClick=\{\(\) => onOpenModal && onOpenModal\(\)\}/g, (match) => {
    if (!heroReplaced) {
      heroReplaced = true;
      return `onClick={() => onOpenModal && onOpenModal('Hero - Rendez-vous gratuit', 'Confirmer le rendez-vous')}`;
    }
    return match; // handle others separately
  });

  // Specifically target Buttons containing string keys
  // Testimonials / Community
  content = content.replace(
    /onClick=\{\(\) => onOpenModal && onOpenModal\(\)\}([^>]*>)\s*\{t\('communityCta'\)\}/g,
    `onClick={() => onOpenModal && onOpenModal('Testimonials - Communauté', 'Rejoindre la communauté')}$1{t('communityCta')}`
  );
  // Curriculum
  content = content.replace(
    /onClick=\{\(\) => onOpenModal && onOpenModal\(\)\}([^>]*>)\s*\{t\('curriculumCta'\)\}/g,
    `onClick={() => onOpenModal && onOpenModal('Programme / Curriculum', "S'inscrire au programme")}$1{t('curriculumCta')}`
  );
  // Cards (card1Cta, card2Cta, etc.)
  content = content.replace(
    /onClick=\{\(\) => onOpenModal && onOpenModal\(\)\}([^>]*>)\s*\{t\('card(\d+)Cta'\)\}/g,
    `onClick={() => onOpenModal && onOpenModal('Section Avantages', 'En savoir plus')}$1{t('card$2Cta')}`
  );

  // Catch any remaining generic ones just in case (e.g. ones that didn't have t('') directly next to it)
  content = content.replace(
    /onClick=\{\(\) => onOpenModal && onOpenModal\(\)\}/g,
    `onClick={() => onOpenModal && onOpenModal('Section d\\'info', 'Plus d\\'infos')}`
  );

  // 4. Beautiful Pricing Badges
  const price = priceMap[file];
  if (price) {
    if (isDark) {
      // Dark theme badge (Cybersec)
      let replacement = `            \$1\n            <div className="w-px h-6 bg-slate-700"></div>\n            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-white/5 backdrop-blur-md shadow-sm" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>\n               <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/50">Prix</span>\n               <span className="text-sm sm:text-base font-black font-heading text-white">${price}</span>\n            </div>`;
      
      // Inline matching
      content = content.replace(
        /(<span><strong[^>]*>4\.9<\/strong>\s*\{t\('heroRating'\)\}<\/span>)/g,
        replacement
      );
    } else {
      // Light theme badge
      let badgeHtml = `
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-white shadow-sm" style={{ borderColor: \`\${primaryColor}30\` }}>
               <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Prix</span>
               <span className="text-sm sm:text-base font-black font-heading text-slate-800">${price}</span>
            </div>`;

      // WebDev (inline)
      if (content.includes("4.9</strong> {t('heroRating')}</span>")) {
        content = content.replace(
          /(<span><strong[^>]*>4\.9<\/strong>\s*\{t\('heroRating'\)\}<\/span>)/g,
          `$1\n            <div className="w-px h-6 bg-slate-200"></div>${badgeHtml}`
        );
      } 
      // GenAI (vertical)
      else if (content.includes("4.9</strong> {t('heroRating')}</div>")) {
        content = content.replace(
          /(<div className="text-xs text-slate-500 mt-0\.5"><strong[^>]*>4\.9<\/strong>\s*\{t\('heroRating'\)\}<\/div>\s*<\/div>)/g,
          `$1\n            <div className="w-px bg-slate-200 self-stretch"></div>\n            <div className="flex flex-col justify-center">${badgeHtml}\n            </div>`
        );
      }
    }
  }

  // Double quotes fix for s'inscrire
  content = content.replace(/'S'inscrire/g, `"S'inscrire`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
