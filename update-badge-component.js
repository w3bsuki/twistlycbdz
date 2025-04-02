// update-badge-component.js
// Script to update Badge component to use the more feature-rich version
// Run with: node update-badge-component.js

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function main() {
  try {
    console.log('Starting Badge component update...');
    
    // 1. Read the feature-rich version from common/ui/badge.tsx
    const sourcePath = path.join(process.cwd(), 'src', 'components', 'common', 'ui', 'badge.tsx');
    const sourceContent = await readFile(sourcePath, 'utf-8');
    
    // Add 'use client' directive if not already present at the top
    const updatedSourceContent = sourceContent.startsWith("'use client'") 
      ? sourceContent 
      : "'use client'\n\n" + sourceContent;
    
    // 2. Replace the version in ui/badge.tsx
    const targetPath = path.join(process.cwd(), 'src', 'components', 'ui', 'badge.tsx');
    await writeFile(targetPath, updatedSourceContent, 'utf-8');
    
    console.log('Successfully updated Badge component in ui/badge.tsx with the feature-rich version.');
    
    // 3. Next steps will be to update imports with another script
    
  } catch (error) {
    console.error('Error updating Badge component:', error);
  }
}

main(); 