const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/components/features/home/featured-collections.tsx',
  'src/components/blocks/gallery6.tsx'
];

filesToUpdate.forEach(filePath => {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace import statements
    content = content.replace(
      /import\s+\{([^}]+)\}\s+from\s+['"]@\/components\/common\/ui\/carousel['"]/g,
      "import {$1} from '@/components/ui/carousel'"
    );
    
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Updated imports in ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error);
  }
});

console.log('✅ All carousel imports updated successfully!'); 