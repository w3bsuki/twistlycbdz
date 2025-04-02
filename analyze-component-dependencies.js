const fs = require('fs');
const path = require('path');

// Configuration
const srcDir = 'src';
const componentsDir = path.join(srcDir, 'components');
const appDir = path.join(srcDir, 'app');
const outputFile = 'component-dependencies-report.md';

// Track component dependencies
const componentUsage = new Map();
const componentDefinitions = new Map();
const pageComponents = new Map();

// Helper to extract component name from file path
function getComponentNameFromPath(filePath) {
  const fileName = path.basename(filePath, path.extname(filePath));
  return fileName.charAt(0).toUpperCase() + fileName.slice(1);
}

// Find all component definitions in /components directory
function findComponentDefinitions(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      findComponentDefinitions(fullPath);
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const componentName = getComponentNameFromPath(fullPath);
        
        // Look for export patterns to confirm it's a component
        if (content.includes(`export function ${componentName}`) || 
            content.includes(`export const ${componentName}`) ||
            content.includes(`export default function ${componentName}`)) {
          
          componentDefinitions.set(componentName, {
            path: fullPath,
            used: 0,
            usedBy: [],
            imports: []
          });
          
          // Extract imports
          const importMatches = content.matchAll(/import\s+(?:{([^}]+)}|\*\s+as\s+([^\s]+)|([^\s{},]+))\s+from\s+['"]([^'"]+)['"]/g);
          for (const match of importMatches) {
            const [_, namedImports, namespaceImport, defaultImport, importPath] = match;
            
            if (namedImports) {
              const components = namedImports.split(',').map(c => c.trim());
              for (const component of components) {
                if (component && !component.startsWith('type ')) {
                  componentDefinitions.get(componentName).imports.push({
                    name: component,
                    path: importPath
                  });
                }
              }
            }
            
            if (defaultImport && !defaultImport.startsWith('type ')) {
              componentDefinitions.get(componentName).imports.push({
                name: defaultImport,
                path: importPath
              });
            }
          }
        }
      } catch (error) {
        console.error(`Error processing ${fullPath}:`, error);
      }
    }
  }
}

// Find component usage in page files
function findComponentUsage(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      findComponentUsage(fullPath);
    } else if (file.name === 'page.tsx' || file.name === 'layout.tsx') {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const pageName = path.relative(appDir, path.dirname(fullPath)).replace(/\\/g, '/') || 'root';
        
        pageComponents.set(pageName, {
          path: fullPath,
          components: []
        });
        
        // Extract imports
        const importMatches = content.matchAll(/import\s+(?:{([^}]+)}|\*\s+as\s+([^\s]+)|([^\s{},]+))\s+from\s+['"]([^'"]+)['"]/g);
        for (const match of importMatches) {
          const [_, namedImports, namespaceImport, defaultImport, importPath] = match;
          
          if (namedImports) {
            const components = namedImports.split(',').map(c => c.trim());
            for (const component of components) {
              if (component && !component.startsWith('type ')) {
                pageComponents.get(pageName).components.push({
                  name: component,
                  path: importPath
                });
                
                // Track component usage
                if (!componentUsage.has(component)) {
                  componentUsage.set(component, {
                    usedBy: [pageName],
                    count: 1
                  });
                } else {
                  componentUsage.get(component).usedBy.push(pageName);
                  componentUsage.get(component).count++;
                }
                
                // Update definition if it exists
                if (componentDefinitions.has(component)) {
                  componentDefinitions.get(component).used++;
                  componentDefinitions.get(component).usedBy.push(pageName);
                }
              }
            }
          }
          
          if (defaultImport && !defaultImport.startsWith('type ')) {
            pageComponents.get(pageName).components.push({
              name: defaultImport,
              path: importPath
            });
            
            // Track component usage
            if (!componentUsage.has(defaultImport)) {
              componentUsage.set(defaultImport, {
                usedBy: [pageName],
                count: 1
              });
            } else {
              componentUsage.get(defaultImport).usedBy.push(pageName);
              componentUsage.get(defaultImport).count++;
            }
            
            // Update definition if it exists
            if (componentDefinitions.has(defaultImport)) {
              componentDefinitions.get(defaultImport).used++;
              componentDefinitions.get(defaultImport).usedBy.push(pageName);
            }
          }
        }
      } catch (error) {
        console.error(`Error processing ${fullPath}:`, error);
      }
    }
  }
}

// Generate the report
function generateReport() {
  let report = `# Component Dependencies Analysis\n\n`;
  
  // Page Component Usage
  report += `## Pages and Their Components\n\n`;
  for (const [pageName, data] of pageComponents) {
    report += `### ${pageName}\n`;
    report += `- File: ${data.path}\n`;
    report += `- Components Used:\n`;
    
    for (const component of data.components) {
      report += `  - ${component.name} (from ${component.path})\n`;
    }
    
    report += `\n`;
  }
  
  // Most Used Components
  report += `## Most Used Components\n\n`;
  const sortedComponents = [...componentUsage.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 20);
  
  for (const [name, data] of sortedComponents) {
    report += `- **${name}** - Used ${data.count} times\n`;
    report += `  - Used by: ${data.usedBy.join(', ')}\n`;
  }
  
  // Unused Components
  report += `\n## Potentially Unused Components\n\n`;
  for (const [name, data] of componentDefinitions) {
    if (data.used === 0) {
      report += `- **${name}** (${data.path})\n`;
    }
  }
  
  // Component Import Chains
  report += `\n## Component Import Dependencies\n\n`;
  for (const [name, data] of componentDefinitions) {
    if (data.imports.length > 0) {
      report += `### ${name}\n`;
      report += `- File: ${data.path}\n`;
      report += `- Imports:\n`;
      
      for (const imp of data.imports) {
        report += `  - ${imp.name} (from ${imp.path})\n`;
      }
      
      report += `\n`;
    }
  }
  
  fs.writeFileSync(outputFile, report);
  console.log(`Report generated: ${outputFile}`);
}

// Main execution
console.log('Analyzing component definitions...');
findComponentDefinitions(componentsDir);
console.log(`Found ${componentDefinitions.size} component definitions`);

console.log('Analyzing component usage...');
findComponentUsage(appDir);
console.log(`Found ${pageComponents.size} pages with component imports`);

console.log('Generating report...');
generateReport();
console.log('Analysis complete!'); 