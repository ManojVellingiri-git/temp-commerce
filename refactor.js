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

let modifiedCount = 0;

walk(srcDir, (filePath) => {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file contains "FreshCart" or "Fresh Cart" (case-insensitive) but only in text, not URLs
    if (/fresh\s*cart/i.test(content) && !filePath.includes('brandConfig')) {
      // Calculate relative path for import
      const relPath = getRelativePath(filePath, configPath);
      
      // Ensure import doesn't already exist
      if (!content.includes('brandConfig')) {
        // Find the last import and insert after it, or at top
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
      
      // Replace variations of FreshCart that are NOT in image tags as alt text, or inside URLs
      // Actually, let's just replace all 'FreshCart' / 'Fresh Cart' with {brandConfig.name} in JSX text
      // Note: "alt='freshcart'" or alt="freshcart" will be replaced by alt={brandConfig.name}
      // "Welcome to FreshCart" -> "Welcome to {brandConfig.name}"
      
      content = content.replace(/"freshcart"/gi, `{brandConfig.name}`);
      content = content.replace(/'freshcart'/gi, `{brandConfig.name}`);
      content = content.replace(/>([^<]*)fresh\s*cart([^<]*)</gi, (match, p1, p2) => {
          return `>${p1}{brandConfig.name}${p2}<`;
      });
      content = content.replace(/>([^<]*)FreshCart([^<]*)</gi, (match, p1, p2) => {
          return `>${p1}{brandConfig.name}${p2}<`;
      });

      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Modified: ${filePath}`);
      modifiedCount++;
    }
  }
});

// Update index.html
const indexHtmlPath = path.join(__dirname, 'public', 'index.html');
if (fs.existsSync(indexHtmlPath)) {
    let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
    htmlContent = htmlContent.replace(/<title>.*?<\/title>/gi, '<title>TEMP GROCERY</title>');
    htmlContent = htmlContent.replace(/<meta content="Fresh Cart".*?>/gi, '<meta content="TEMP GROCERY" name="Description" />');
    fs.writeFileSync(indexHtmlPath, htmlContent, 'utf8');
    console.log('Modified index.html');
}

console.log(`Finished. Modified ${modifiedCount} files.`);
