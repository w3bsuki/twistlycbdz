// update-badge-imports.js
// Script to update Badge imports to use the standard path @/components/ui/badge
// Run with: node update-badge-imports.js

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

// Files to skip
const SKIP_DIRS = [
  'node_modules',
  '.git',
  '.next',
  'public',
  'dist',
  'build'
];

// Target import pattern
const OLD_IMPORT_PATTERN = /import\s+(?:{[^}]*?Badge[^}]*?})?\s*from\s+['"]@\/components\/common\/ui\/badge['"]/g;
const NEW_IMPORT = "import { Badge } from '@/components/ui/badge'";

// If we need to extract other imports that might be in the same line
const EXTRACT_OTHER_IMPORTS = /import\s+{([^}]*?Badge[^}]*?)}\s*from\s+['"]@\/components\/common\/ui\/badge['"]/;

// Function to process a file
async function processFile(filePath) {
  // Only process TypeScript/JavaScript files
  if (!['.tsx', '.jsx', '.ts', '.js'].includes(path.extname(filePath))) {
    return;
  }

  try {
    const content = await readFile(filePath, 'utf-8');
    
    // Check if the file has the old import pattern
    if (OLD_IMPORT_PATTERN.test(content)) {
      console.log(`Processing: ${filePath}`);
      
      // Replace imports
      let newContent = content.replace(OLD_IMPORT_PATTERN, (match) => {
        // If there are other components being imported alongside Badge
        const extractMatch = match.match(EXTRACT_OTHER_IMPORTS);
        if (extractMatch && extractMatch[1]) {
          const imports = extractMatch[1].split(',').map(imp => imp.trim());
          const otherImports = imports.filter(imp => !imp.includes('Badge') && imp !== '');
          
          if (otherImports.length > 0) {
            // Keep the other imports for the common/ui path
            return `import { ${otherImports.join(', ')} } from '@/components/common/ui/badge';\n${NEW_IMPORT}`;
          }
        }
        return NEW_IMPORT;
      });
      
      // Write the updated content back to the file
      await writeFile(filePath, newContent, 'utf-8');
      console.log(`Updated: ${filePath}`);
      return true;
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
  return false;
}

// Function to walk the directory recursively
async function walkDir(dir) {
  let updated = 0;
  
  const files = await readDir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await stat(filePath);
    
    // Skip directories we don't want to process
    if (SKIP_DIRS.includes(file)) {
      continue;
    }
    
    if (fileStat.isDirectory()) {
      updated += await walkDir(filePath);
    } else {
      if (await processFile(filePath)) {
        updated++;
      }
    }
  }
  
  return updated;
}

// Main function
async function main() {
  console.log('Starting Badge import updates...');
  
  try {
    const rootDir = process.cwd(); // Current working directory
    const updatedCount = await walkDir(rootDir);
    
    console.log(`\nCompleted! Updated ${updatedCount} files.`);
  } catch (error) {
    console.error('Error:', error);
  }
}

main(); 