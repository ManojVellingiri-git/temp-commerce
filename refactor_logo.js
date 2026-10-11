const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const configPath = path.join(srcDir, 'config', 'brandConfig');

function getRelativePath(fromPath, toPath) {
  let rel = path.relative(path.dirname(fromPath), toPath).replace(/\\/g, '/');
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel;
}

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const targetImageImports = [
  'Grocerylogo.png',
  'Grocerylogo',
  'logo.svg'
];

let modifiedCount = 0;

walk(srcDir, (filePath) => {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasLogo = content.includes('Grocerylogo') || content.includes('groceryshop');
    
    if (hasLogo && !filePath.includes('brandConfig') && !filePath.includes('Header.jsx')) {
      const relPath = getRelativePath(filePath, configPath);
      
      if (!content.includes('brandConfig')) {
        const importRegex = /^import\s+.*?;?\s*$/gm;
        let lastMatch = null;
        let match;
        while ((match = importRegex.exec(content)) !== null) {
          lastMatch = match;
        }
        
        const importStatement = `import { brandConfig } from "${relPath}";\n`;
        if (lastMatch) {
          const insertPos = lastMatch.index + lastMatch[0].length;
          content = content.slice(0, insertPos) + '\n' + importStatement + content.slice(insertPos);
        } else {
          content = importStatement + content;
        }
      }
      
      // Replace img tag referencing Grocerylogo with text logo
      // This is a bit tricky with regex, so I'll try to find common patterns
      // <img ... src={Grocerylogo} ... /> or src={groceryshop}
      
      // A safe way: replace <img ... src={Grocerylogo} ... /> with <h2 style={{color: brandConfig.colors.primary, fontWeight: 'bold'}}>{brandConfig.name}</h2>
      
      content = content.replace(/<img[^>]*src=\{Grocerylogo\}[^>]*\/?>/g, `<h2 style={{color: brandConfig.colors.primary, fontWeight: 'bold'}}>{brandConfig.name}</h2>`);
      content = content.replace(/<img[^>]*src=\{groceryshop\}[^>]*\/?>/g, `<h2 style={{color: brandConfig.colors.primary, fontWeight: 'bold'}}>{brandConfig.name}</h2>`);

      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Modified: ${filePath}`);
      modifiedCount++;
    }
  }
});

console.log(`Finished. Modified ${modifiedCount} files.`);
