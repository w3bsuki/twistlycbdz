const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to recursively get all TypeScript files
function getAllTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllTsxFiles(filePath, fileList);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

console.log('Finding all TypeScript files...');
const filePaths = getAllTsxFiles('src');
console.log(`Found ${filePaths.length} TypeScript files to check.`);

let updatedFileCount = 0;

filePaths.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Replace any import from common/ui to ui
    content = content.replace(
      /import\s+\{([^}]+)\}\s+from\s+['"]@\/components\/common\/ui\/([^'"]+)['"]/g,
      "import {$1} from '@/components/ui/$2'"
    );
    
    // If content was changed, write it back
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      updatedFileCount++;
      console.log(`✅ Updated imports in ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error);
  }
});

console.log(`✅ Updated imports in ${updatedFileCount} files.`);
console.log(`All common/ui imports have been updated to components/ui!`); 