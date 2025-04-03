const fs = require('fs');
const path = require('path');

// Configuration
const SRC_DIR = path.join(__dirname, 'src');
const FILE_EXTENSIONS = ['.tsx', '.jsx', '.ts', '.js'];
const DRY_RUN = false; // Set to true to just log changes without modifying files

// Entity replacements
const entityReplacements = [
  { search: /&quot;/g, replace: '"' },
  { search: /&apos;/g, replace: "'" },
  { search: /&amp;/g, replace: "&" },
  { search: /&lt;/g, replace: "<" },
  { search: /&gt;/g, replace: ">" },
];

// Counter for statistics
let totalFilesChecked = 0;
let totalFilesWithEntities = 0;
let totalEntitiesReplaced = 0;

// Process a single file
function processFile(filePath) {
  try {
    // Read file content
    const content = fs.readFileSync(filePath, 'utf8');
    let updatedContent = content;
    let fileChanged = false;
    let entitiesReplacedInFile = 0;

    // Apply replacements
    entityReplacements.forEach(({ search, replace }) => {
      const matches = updatedContent.match(search);
      if (matches) {
        const countMatches = matches.length;
        updatedContent = updatedContent.replace(search, replace);
        entitiesReplacedInFile += countMatches;
        fileChanged = true;
      }
    });

    // Update statistics
    if (fileChanged) {
      totalFilesWithEntities++;
      totalEntitiesReplaced += entitiesReplacedInFile;
      
      console.log(`[FOUND] ${filePath} (${entitiesReplacedInFile} entities)`);
      
      // Write changes to file if not in dry run mode
      if (!DRY_RUN) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`[FIXED] ${filePath}`);
      }
    }

    return fileChanged;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Recursively scan directories
function scanDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      // Skip node_modules and .next directories
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        scanDirectory(fullPath);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (FILE_EXTENSIONS.includes(ext)) {
        const fileChanged = processFile(fullPath);
        totalFilesChecked++;
      }
    }
  }
}

// Main execution
console.log(`Starting to scan ${SRC_DIR} for HTML entities...`);
console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no changes will be made)' : 'FIXING FILES'}`);

const startTime = Date.now();
scanDirectory(SRC_DIR);
const duration = ((Date.now() - startTime) / 1000).toFixed(2);

// Print summary
console.log('\n=== Summary ===');
console.log(`Total files checked: ${totalFilesChecked}`);
console.log(`Files with HTML entities: ${totalFilesWithEntities}`);
console.log(`Total entities replaced: ${totalEntitiesReplaced}`);
console.log(`Time taken: ${duration} seconds`);
console.log(`${DRY_RUN ? 'No changes were made (dry run)' : 'All changes applied successfully'}`); 