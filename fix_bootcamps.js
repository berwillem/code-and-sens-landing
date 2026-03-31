import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bootcampsDir = path.join(__dirname, 'src', 'pages', 'bootcamps');
const files = fs.readdirSync(bootcampsDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(bootcampsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Fix the syntax error in S'inscrire
  content = content.replace(/'S'inscrire/g, `"S'inscrire`);

  // 2. Make prices bigger and fix colors (White for dark themes).
  const isDarkTheme = file.includes('Cybersecurity');
  const priceColorClass = isDarkTheme ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'text-slate-900 drop-shadow-sm';

  // Fix sizes for WebDev style prices
  content = content.replace(
    /<span className="text-lg sm:text-xl xl:text-2xl font-bold" style={{ color: primaryColor }}>(.*?)<\/span>/g,
    `<span className="text-3xl lg:text-4xl font-black ${priceColorClass}" style={{ color: isRtl ? 'inherit' : 'inherit' }}>$1</span>`
  );
  // Also catch if it wasn't replaced yet (just in case)
  content = content.replace(
    /<span><strong className="text-slate-800">(.*?)<\/strong><\/span>/g,
    `<span className="text-3xl lg:text-4xl font-black ${priceColorClass}">$1</span>`
  );

  // Fix sizes for GenAI style prices
  content = content.replace(
    /<div className="text-3xl sm:text-4xl font-bold font-heading" style={{ color: primaryColor }}>(.*?)<\/div>/g,
    `<div className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight ${priceColorClass}">$1</div>`
  );

  // 3. Fix the "Section - Info" unmapped CTAs
  // Because my previous script missed some due to regex mismatch, we can explicitly map by looking at the line or surrounding context.
  // Testimonials usually uses `communityCta`
  content = content.replace(
    /onClick=\{\(\) => onOpenModal && onOpenModal\('Section - Info', 'Envoyer'\)\}\s*>\s*\{t\('communityCta'\)\}/g,
    `onClick={() => onOpenModal && onOpenModal('Testimonials - Communauté', 'Rejoindre la communauté')}>\n               {t('communityCta')}`
  );

  // Features/Cards uses `card1Cta`, `card2Cta`, etc.
  content = content.replace(
    /onClick=\{\(\) => onOpenModal && onOpenModal\('Section - Info', 'Envoyer'\)\}(>[^{]*)\{t\('card(\d+)Cta'\)\}/g,
    `onClick={() => onOpenModal && onOpenModal('Section Avantages', 'En savoir plus')}$1{t('card$2Cta')}`
  );

  // Any remaining generic "Section - Info" to "Plus d'infos"
  content = content.replace(
    /onOpenModal\('Section - Info', 'Envoyer'\)/g,
    `onOpenModal('Section Info', 'Plus d\\'infos')`
  );

  console.log(`Updated ${file}`);
  fs.writeFileSync(filePath, content, 'utf8');
});
