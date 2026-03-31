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

  // Fix wrong email in contact form if present
  content = content.replace(/codeandsens@contact\.com/g, 'contact@codeansens.com');

  // Update hero CTA text (Rendez-vous gratuit)
  content = content.replace(/\{t\('heroCta1'(?:,\s*['"].*?['"])?\)\}/g, "{'Rendez-vous gratuit'}");

  // Update Hero onOpenModal
  let heroReplaced = false;
  content = content.replace(/onClick=\{\(\) => onOpenModal && onOpenModal\(\)\}/g, (match, offset) => {
    if (!heroReplaced) {
      heroReplaced = true;
      return "onClick={() => onOpenModal && onOpenModal('Hero - Rendez-vous gratuit', 'Confirmer le rendez-vous')}";
    }
    return "onClick={() => onOpenModal && onOpenModal('Section - Info', 'Envoyer')}";
  });

  // Inject price into stats
  const price = priceMap[file];
  if (price) {
    if (content.includes("4.9</strong> {t('heroRating')}</span>")) {
       // WebDev style
       content = content.replace(
         /(<span><strong[^>]*>4\.9<\/strong>\s*\{t\('heroRating'\)\}<\/span>)/g,
         `$1\n            <div className="w-px h-4 bg-slate-200"></div>\n            <span><strong className="text-slate-800">${price}</strong></span>`
       );
    } else if (content.includes("4.9</strong> {t('heroRating')}</div>")) {
       // GenAI style
       content = content.replace(
         /(<div className="text-xs text-slate-500 mt-0\.5"><strong[^>]*>4\.9<\/strong>\s*\{t\('heroRating'\)\}<\/div>\s*<\/div>)/g,
         `$1\n            <div className="w-px bg-slate-200 self-stretch"></div>\n            <div>\n              <div className="text-2xl font-bold font-heading text-slate-800">${price}</div>\n              <div className="text-xs text-slate-500">Prix</div>\n            </div>`
       );
    }
  }

  console.log(`Updated ${file}`);
  fs.writeFileSync(filePath, content, 'utf8');
});
