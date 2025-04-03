const fs = require('fs');
const path = require('path');

// Configuration
const SRC_DIR = path.join(__dirname, 'src');
const FILE_EXTENSIONS = ['.tsx', '.jsx', '.ts', '.js'];
const DRY_RUN = false; // Set to true to just log changes without modifying files

// Counter for statistics
let totalFilesChecked = 0;
let totalFilesWithIssues = 0;
let totalIssuesFixed = 0;

// Types of fixes to apply
const fixTypes = [
  // 1. General HTML entities in the content
  {
    name: "HTML entities in content",
    patterns: [
      { search: /&quot;/g, replace: '"' },
      { search: /&apos;/g, replace: "'" },
      { search: /&amp;/g, replace: "&" },
      { search: /&lt;/g, replace: "<" },
      { search: /&gt;/g, replace: ">" }
    ]
  },
  
  // 2. HTML entities in JSX attributes
  {
    name: "JSX attributes with entities",
    patterns: [
      // className attributes
      { 
        search: /className=(?:"[^"]*&(?:quot|apos);[^"]*"|'[^']*&(?:quot|apos);[^']*'|\{`[^`]*&(?:quot|apos);[^`]*`\})/g,
        replace: (match) => match.replace(/&quot;/g, '"').replace(/&apos;/g, "'")
      },
      // style attributes
      { 
        search: /style=(?:"[^"]*&(?:quot|apos);[^"]*"|'[^']*&(?:quot|apos);[^']*'|\{`[^`]*&(?:quot|apos);[^`]*`\})/g,
        replace: (match) => match.replace(/&quot;/g, '"').replace(/&apos;/g, "'")
      },
      // id attributes
      { 
        search: /id=(?:"[^"]*&(?:quot|apos);[^"]*"|'[^']*&(?:quot|apos);[^']*'|\{`[^`]*&(?:quot|apos);[^`]*`\})/g,
        replace: (match) => match.replace(/&quot;/g, '"').replace(/&apos;/g, "'")
      },
      // aria attributes
      { 
        search: /aria-[a-z]+=(?:"[^"]*&(?:quot|apos);[^"]*"|'[^']*&(?:quot|apos);[^']*'|\{`[^`]*&(?:quot|apos);[^`]*`\})/g,
        replace: (match) => match.replace(/&quot;/g, '"').replace(/&apos;/g, "'")
      }
    ]
  },
  
  // 3. HTML entities in template literals used in section IDs
  {
    name: "Section ID template literals",
    patterns: [
      { 
        search: /id=\{`[^`]*&apos;-&apos;[^`]*`\}/g,
        replace: (match) => match.replace(/&apos;-&apos;/g, "'-'")
      },
      {
        search: /\.replace\([^)]*&apos;[^)]*\)/g,
        replace: (match) => match.replace(/&apos;/g, "'")
      }
    ]
  },
  
  // 4. HTML entities in string literals
  {
    name: "String literals with entities",
    patterns: [
      {
        search: /(?<!=)"[^"]*&(?:quot|apos);[^"]*"/g,
        replace: (match) => match.replace(/&quot;/g, '"').replace(/&apos;/g, "'")
      },
      {
        search: /(?<!=)'[^']*&(?:quot|apos);[^']*'/g,
        replace: (match) => match.replace(/&quot;/g, '"').replace(/&apos;/g, "'")
      },
      {
        search: /`[^`]*&(?:quot|apos);[^`]*`/g,
        replace: (match) => match.replace(/&quot;/g, '"').replace(/&apos;/g, "'")
      }
    ]
  }
];

// Process a single file
function processFile(filePath) {
  try {
    // Read file content
    const content = fs.readFileSync(filePath, 'utf8');
    let updatedContent = content;
    let fileChanged = false;
    let issuesFixedInFile = 0;
    
    // Apply all fix types
    fixTypes.forEach(fixType => {
      fixType.patterns.forEach(({ search, replace }) => {
        const matches = updatedContent.match(search);
        if (matches) {
          if (typeof replace === 'function') {
            matches.forEach(match => {
              const fixed = replace(match);
              if (fixed !== match) {
                updatedContent = updatedContent.replace(match, fixed);
                issuesFixedInFile++;
              }
            });
          } else {
            const countMatches = matches.length;
            updatedContent = updatedContent.replace(search, replace);
            issuesFixedInFile += countMatches;
          }
          fileChanged = true;
        }
      });
    });

    // Update statistics
    if (fileChanged) {
      totalFilesWithIssues++;
      totalIssuesFixed += issuesFixedInFile;
      
      console.log(`[FOUND] ${filePath} (${issuesFixedInFile} issues)`);
      
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
      if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== '.git') {
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
console.log(`========== COMPREHENSIVE HTML ENTITY FIXER ==========`);
console.log(`Starting to scan ${SRC_DIR} for HTML entity issues...`);
console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no changes will be made)' : 'FIXING FILES'}`);
console.log(`-----------------------------------------------------`);

const startTime = Date.now();
scanDirectory(SRC_DIR);
const duration = ((Date.now() - startTime) / 1000).toFixed(2);

// Print summary
console.log(`\n============= SUMMARY =============`);
console.log(`Total files checked: ${totalFilesChecked}`);
console.log(`Files with issues: ${totalFilesWithIssues}`);
console.log(`Total issues fixed: ${totalIssuesFixed}`);
console.log(`Time taken: ${duration} seconds`);
console.log(`${DRY_RUN ? 'No changes were made (dry run)' : 'All changes applied successfully'}`);
console.log(`===================================`); 