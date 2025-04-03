const fs = require('fs');
const path = require('path');

// Configuration
const SRC_DIR = path.join(__dirname, 'src');
const FILE_EXTENSIONS = ['.tsx', '.jsx'];

// Counter for statistics
let totalFilesChecked = 0;
let totalFilesWithIssues = 0;
let totalPotentialIssues = 0;

// Patterns to check for potential issues
const issuePatterns = [
  // HTML entities
  { 
    name: "HTML entities",
    regex: /&(?:quot|apos|amp|lt|gt);/g,
    severity: "HIGH",
    message: "HTML entity found that could cause parsing errors in JSX"
  },
  
  // Potential tag mismatches
  {
    name: "Opening Link closing as a",
    regex: /<Link[^>]*>(?:(?!<\/Link>).)*<\/a>/gs,
    severity: "HIGH",
    message: "Potential tag mismatch: <Link> opened but </a> used to close"
  },
  {
    name: "Opening a closing as Link",
    regex: /<a[^>]*>(?:(?!<\/a>).)*<\/Link>/gs,
    severity: "HIGH",
    message: "Potential tag mismatch: <a> opened but </Link> used to close"
  },
  
  // Missing closing JSX tags
  {
    name: "Unclosed JSX tags",
    regex: /<(?!\/|!--)[A-Za-z][A-Za-z0-9]*(?:\s+[^>]*)?(?<!\/)>(?![\s\S]*?<\/\1>)/g,
    severity: "MEDIUM",
    message: "Potentially unclosed JSX tag"
  },
  
  // String concatenation in JSX that could cause issues
  {
    name: "Unsafe string concatenation",
    regex: /className=(?:{[^}]*\+[^}]*}|"[^"]*\+[^"]*"|'[^']*\+[^']*')/g,
    severity: "LOW",
    message: "String concatenation in className prop could cause issues"
  },
  
  // Inconsistent quote usage
  {
    name: "Inconsistent quotes",
    regex: /className=(['"])[^'"]*\1.*?className=(['"])[^'"]*\2/g,
    severity: "LOW",
    condition: (match) => match[1] !== match[2],
    message: "Inconsistent quote style in attributes (mixing ' and \")"
  }
];

// Process a single file
function processFile(filePath) {
  try {
    // Read file content
    const content = fs.readFileSync(filePath, 'utf8');
    let hasIssues = false;
    let issuesInFile = [];
    
    // Check for each issue pattern
    issuePatterns.forEach(pattern => {
      const matches = content.match(pattern.regex);
      
      if (matches) {
        // If there's a condition function, filter matches that meet the condition
        const validMatches = pattern.condition ? 
          matches.filter(match => pattern.condition(match)) : 
          matches;
        
        if (validMatches.length > 0) {
          hasIssues = true;
          
          // Get line numbers for each match
          validMatches.forEach(match => {
            const position = content.indexOf(match);
            const lineNumber = content.substring(0, position).split('\n').length;
            
            issuesInFile.push({
              type: pattern.name,
              severity: pattern.severity,
              message: pattern.message,
              lineNumber: lineNumber,
              example: match.length > 50 ? match.substring(0, 47) + '...' : match
            });
          });
          
          totalPotentialIssues += validMatches.length;
        }
      }
    });
    
    if (hasIssues) {
      totalFilesWithIssues++;
      
      console.log(`\n[FILE] ${filePath}`);
      console.log('-'.repeat(filePath.length + 7));
      
      // Sort issues by line number
      issuesInFile.sort((a, b) => a.lineNumber - b.lineNumber);
      
      // Print issues
      issuesInFile.forEach(issue => {
        const severityColor = 
          issue.severity === 'HIGH' ? '\x1b[31m' :  // Red
          issue.severity === 'MEDIUM' ? '\x1b[33m' : // Yellow
          '\x1b[36m';  // Cyan for LOW
          
        console.log(`${severityColor}[${issue.severity}]\x1b[0m Line ${issue.lineNumber}: ${issue.message}`);
        console.log(`  Type: ${issue.type}`);
        console.log(`  Example: ${issue.example}`);
      });
    }
    
    return hasIssues;
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
        processFile(fullPath);
        totalFilesChecked++;
      }
    }
  }
}

// Main execution
console.log(`========== JSX POTENTIAL ISSUES VALIDATOR ==========`);
console.log(`Starting to scan ${SRC_DIR} for potential parsing issues...`);
console.log(`-----------------------------------------------------`);

const startTime = Date.now();
scanDirectory(SRC_DIR);
const duration = ((Date.now() - startTime) / 1000).toFixed(2);

// Print summary
console.log(`\n============= SUMMARY =============`);
console.log(`Total files checked: ${totalFilesChecked}`);
console.log(`Files with potential issues: ${totalFilesWithIssues}`);
console.log(`Total potential issues found: ${totalPotentialIssues}`);
console.log(`Time taken: ${duration} seconds`);

if (totalFilesWithIssues === 0) {
  console.log(`\x1b[32mNo JSX parsing issues detected!\x1b[0m`);
} else {
  console.log(`\x1b[33mFix the reported issues to prevent parsing errors.\x1b[0m`);
}
console.log(`===================================`); 