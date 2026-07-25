const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'components/cv/layouts');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'index.ts');

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Strip arbitrary max-width constraints on the outer wrapper
  content = content.replace(/max-w-\[?\d+px\]?/g, 'w-full');
  
  // Remove box shadow
  content = content.replace(/boxShadow:\s*'[^']+',?/g, '');
  
  // Remove border radius on the outer wrapper
  content = content.replace(/borderRadius:\s*theme\.borderRadius,?/g, '');
  
  // Normalize padding to exactly 2rem (A4 standard)
  content = content.replace(/padding:\s*'[^']+',?/g, "padding: '2rem',");
  
  // Make sure it has w-full
  if (!content.includes('className="w-full')) {
    content = content.replace(/className="/, 'className="w-full ');
  }

  // Also remove margin auto
  content = content.replace(/mx-auto/g, '');

  // Consolidate classNames where possible by removing double spaces
  content = content.replace(/className="w-full w-full/g, 'className="w-full');
  content = content.replace(/\s+"/g, '"');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed: ${file}`);
});
