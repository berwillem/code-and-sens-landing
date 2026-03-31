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

  // 1. Fix Sizing and Color of Prices
  // WebDev style
  content = content.replace(
    /<span><strong className="text-slate-800">(.*?)<\/strong><\/span>/g,
    `<span className="text-lg sm:text-xl xl:text-2xl font-bold" style={{ color: primaryColor }}>$1</span>`
  );

  // GenAI style
  content = content.replace(
    /<div className="text-2xl font-bold font-heading text-slate-800">(.*?)<\/div>/g,
    `<div className="text-3xl sm:text-4xl font-bold font-heading" style={{ color: primaryColor }}>$1</div>`
  );

  // 2. Fix CTAs by parsing the string blocks
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`('Section - Info', 'Envoyer')`)) {
      // Look forward up to 5 lines for the t('something')
      let ctx = '';
      for (let j = 0; j < 5 && i + j < lines.length; j++) {
        const match = lines[i + j].match(/t\('([^']+)'/);
        if (match) {
          ctx = match[1];
          break;
        }
      }
      
      let title = 'Section - Info';
      let cta = 'Envoyer';

      if (ctx.includes('card')) {
         title = 'Avantages / Feature';
         cta = 'En savoir plus';
      } else if (ctx.includes('curriculum')) {
         title = 'Programme / Curriculum';
         cta = "S'inscrire au programme";
      } else if (ctx.includes('community')) {
         title = 'Testimonials / Communauté';
         cta = 'Rejoindre la communauté';
      }

      lines[i] = lines[i].replace(`('Section - Info', 'Envoyer')`, `('${title}', '${cta}')`);
    }
  }

  content = lines.join('\n');

  console.log(`Updated ${file}`);
  fs.writeFileSync(filePath, content, 'utf8');
});
