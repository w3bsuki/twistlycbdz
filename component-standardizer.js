// component-standardizer.js
// A general-purpose script to standardize shadcn components
// Usage: node component-standardizer.js <componentName>
// Example: node component-standardizer.js Dialog

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);
const exists = promisify(fs.access).bind(fs, fs.constants.F_OK).then(() => true).catch(() => false);
const deleteFile = promisify(fs.unlink);

// Files to skip when searching the codebase
const SKIP_DIRS = [
  'node_modules',
  '.git',
  '.next',
  'public',
  'dist',
  'build'
];

async function main() {
  // Get the component name from command line arguments
  const componentName = process.argv[2];
  if (!componentName) {
    console.error('Please provide a component name. Example: node component-standardizer.js Dialog');
    process.exit(1);
  }

  console.log(`Starting standardization of ${componentName} component...`);

  const lowerCaseName = componentName.toLowerCase();
  const uiPath = path.join(process.cwd(), 'src', 'components', 'ui', `${lowerCaseName}.tsx`);
  const commonUiPath = path.join(process.cwd(), 'src', 'components', 'common', 'ui', `${lowerCaseName}.tsx`);

  // Check if both component versions exist
  const uiExists = await exists(uiPath);
  const commonUiExists = await exists(commonUiPath);

  if (!uiExists && !commonUiExists) {
    console.error(`Error: Component ${componentName} not found in either location.`);
    process.exit(1);
  }

  if (!uiExists) {
    console.log(`Component ${componentName} only exists in common/ui. Moving to ui/...`);
    await moveComponent(commonUiPath, uiPath);
  } else if (!commonUiExists) {
    console.log(`Component ${componentName} only exists in ui/. No need to standardize.`);
    process.exit(0);
  } else {
    // Both versions exist, need to compare and decide
    console.log(`Both versions of ${componentName} exist. Comparing...`);
    await compareAndStandardize(componentName, uiPath, commonUiPath);
  }

  // Update imports across the codebase
  await updateImports(componentName);

  // Remove the duplicate implementation if it still exists
  if (await exists(commonUiPath)) {
    await deleteFile(commonUiPath);
    console.log(`Removed duplicate ${componentName} component from common/ui/`);
  }

  console.log(`\nStandardization of ${componentName} completed successfully!`);
}

async function moveComponent(sourcePath, targetPath) {
  try {
    const content = await readFile(sourcePath, 'utf-8');
    
    // Add 'use client' directive if not already present
    const updatedContent = content.trim().startsWith("'use client'") || content.trim().startsWith('"use client"')
      ? content 
      : `'use client'\n\n${content}`;
    
    await writeFile(targetPath, updatedContent, 'utf-8');
    console.log(`Successfully moved component to ${targetPath}`);
    
  } catch (error) {
    console.error(`Error moving component: ${error}`);
    process.exit(1);
  }
}

async function compareAndStandardize(componentName, uiPath, commonUiPath) {
  try {
    const uiContent = await readFile(uiPath, 'utf-8');
    const commonUiContent = await readFile(commonUiPath, 'utf-8');
    
    // Simple heuristic: choose the version with more code (likely more features)
    // More sophisticated comparison could be implemented here
    if (commonUiContent.length > uiContent.length) {
      console.log(`The common/ui version of ${componentName} appears more feature-rich. Using that version.`);
      await moveComponent(commonUiPath, uiPath);
    } else {
      console.log(`The ui version of ${componentName} appears more feature-rich or equal. Keeping it.`);
    }
  } catch (error) {
    console.error(`Error comparing components: ${error}`);
    process.exit(1);
  }
}

async function updateImports(componentName) {
  console.log(`Updating imports for ${componentName}...`);
  
  // Create regex patterns for this component
  const importPattern = new RegExp(`import\\s+(?:{[^}]*?${componentName}[^}]*?})?\\s*from\\s+['"]@\\/components\\/common\\/ui\\/${componentName.toLowerCase()}['"]`, 'g');
  const newImport = `import { ${componentName} } from '@/components/ui/${componentName.toLowerCase()}'`;
  const extractPattern = new RegExp(`import\\s+{([^}]*?${componentName}[^}]*?)}\\s*from\\s+['"]@\\/components\\/common\\/ui\\/${componentName.toLowerCase()}['"]`);
  
  // Also look for badgeVariants, buttonVariants, etc.
  const variantsName = `${componentName.toLowerCase()}Variants`;
  const variantsImportPattern = new RegExp(`import\\s+{\\s*${variantsName}\\s*}\\s*from\\s+['"]@\\/components\\/common\\/ui\\/${componentName.toLowerCase()}['"]`, 'g');
  const newVariantsImport = `import { ${variantsName} } from '@/components/ui/${componentName.toLowerCase()}'`;
  
  let updatedCount = 0;
  
  async function processFile(filePath) {
    // Only process TypeScript/JavaScript files
    if (!['.tsx', '.jsx', '.ts', '.js'].includes(path.extname(filePath))) {
      return false;
    }
  
    try {
      const content = await readFile(filePath, 'utf-8');
      
      // Check if the file has the old import pattern
      if (importPattern.test(content) || variantsImportPattern.test(content)) {
        console.log(`Processing: ${filePath}`);
        
        // Replace component imports
        let newContent = content.replace(importPattern, (match) => {
          // If there are other components being imported alongside this one
          const extractMatch = match.match(extractPattern);
          if (extractMatch && extractMatch[1]) {
            const imports = extractMatch[1].split(',').map(imp => imp.trim());
            const otherImports = imports.filter(imp => !imp.includes(componentName) && imp !== '');
            
            if (otherImports.length > 0) {
              // Keep the other imports for the common/ui path
              return `import { ${otherImports.join(', ')} } from '@/components/common/ui/${componentName.toLowerCase()}';\n${newImport}`;
            }
          }
          return newImport;
        });
        
        // Replace variants imports
        newContent = newContent.replace(variantsImportPattern, newVariantsImport);
        
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
  
  try {
    const rootDir = process.cwd();
    updatedCount = await walkDir(rootDir);
    
    console.log(`Updated imports in ${updatedCount} files.`);
  } catch (error) {
    console.error('Error updating imports:', error);
  }
  
  return updatedCount;
}

main().catch(error => {
  console.error('An unexpected error occurred:', error);
  process.exit(1);
}); 