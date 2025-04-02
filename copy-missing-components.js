// copy-missing-components.js
const fs = require('fs');
const path = require('path');

// Source and destination directories
const srcDir = path.join(process.cwd(), 'src/components/common/ui');
const destDir = path.join(process.cwd(), 'src/components/ui');

// Get list of files in both directories
const commonUiFiles = fs.readdirSync(srcDir);
const uiFiles = fs.readdirSync(destDir);

// Count of copied files
let copiedCount = 0;

// Copy components that don't exist in the ui directory
console.log('Copying unique components from common/ui to ui...');

commonUiFiles.forEach(file => {
  if (!uiFiles.includes(file)) {
    try {
      // Read the file content
      const content = fs.readFileSync(path.join(srcDir, file), 'utf8');
      
      // Copy to destination
      fs.writeFileSync(path.join(destDir, file), content);
      
      console.log(`✅ Copied ${file} to ui directory`);
      copiedCount++;
    } catch (error) {
      console.error(`❌ Error copying ${file}: ${error.message}`);
    }
  }
});

console.log(`✅ Copied ${copiedCount} unique components to the ui directory`);
console.log('Now you can safely delete the entire common/ui directory'); 