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
  
  // Fix the syntax error: "S'inscrire au programme')
  content = content.replace(/"S'inscrire au programme'\)/g, `"S'inscrire au programme"\)`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed syntax in ${file}`);
});
