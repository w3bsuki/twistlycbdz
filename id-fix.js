const fs = require('fs');
const path = require('path');

// Configuration
const SRC_DIR = path.join(__dirname, 'src');
const FILE_EXTENSIONS = ['.tsx', '.jsx'];
const DRY_RUN = false; // Set to true to just log changes without modifying files

// Counter for statistics
let totalFilesChecked = 0;
let totalFilesWithIdIssues = 0;
let totalIssuesFixed = 0;

// Process a single file
function processFile(filePath) {
  try {
    // Read file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Multiple patterns to catch different types of ID issues
    const patterns = [
      // Pattern 1: id={`${...replace(/[&\s]+/g, &apos;-&apos;)}-section`}
      { 
        regex: /id=\{`\${[^}]+\.replace\(\s*\/\[[^]+\/g,\s*&apos;-&apos;\s*\)\s*}[^`]*`\}/g,
        replacement: (match) => match.replace(/&apos;-&apos;/g, "'-'").replace(/&apos;/g, "'")
      },
      // Pattern 2: Other common ID patterns with entities
      {
        regex: /id=\{`[^`]*&apos;[^`]*`\}/g,
        replacement: (match) => match.replace(/&apos;/g, "'")
      },
      // Pattern 3: id="some-&apos;thing&apos;"
      {
        regex: /id="[^"]*&apos;[^"]*"/g,
        replacement: (match) => match.replace(/&apos;/g, "'")
      },
      // Pattern 4: className with HTML entities
      {
        regex: /className=\{?(?:`|\")[^"`}]*&(?:apos|quot);[^"`}]*(?:"|`)\}?/g,
        replacement: (match) => match.replace(/&apos;/g, "'").replace(/&quot;/g, '"')
      }
    ];
    
    let hasChanges = false;
    let updatedContent = content;
    let totalMatches = 0;
    
    // Apply each pattern
    patterns.forEach(pattern => {
      const matches = content.match(pattern.regex);
      if (matches) {
        matches.forEach(match => {
          const fixed = pattern.replacement(match);
          updatedContent = updatedContent.replace(match, fixed);
        });
        
        totalMatches += matches.length;
        hasChanges = true;
      }
    });
    
    if (hasChanges) {
      totalFilesWithIdIssues++;
      totalIssuesFixed += totalMatches;
      
      console.log(`[FOUND] ${filePath} (${totalMatches} issues)`);
      
      // Write changes to file if not in dry run mode
      if (!DRY_RUN) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`[FIXED] ${filePath}`);
      }
      
      return true;
    }
    
    return false;
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
        processFile(fullPath);
        totalFilesChecked++;
      }
    }
  }
}

// Main execution
console.log(`Starting to scan ${SRC_DIR} for HTML entity issues in JSX attributes...`);
console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no changes will be made)' : 'FIXING FILES'}`);

const startTime = Date.now();
scanDirectory(SRC_DIR);
const duration = ((Date.now() - startTime) / 1000).toFixed(2);

// Print summary
console.log('\n=== Summary ===');
console.log(`Total files checked: ${totalFilesChecked}`);
console.log(`Files with issues: ${totalFilesWithIdIssues}`);
console.log(`Total issues fixed: ${totalIssuesFixed}`);
console.log(`Time taken: ${duration} seconds`);
console.log(`${DRY_RUN ? 'No changes were made (dry run)' : 'All issues fixed successfully'}`); 