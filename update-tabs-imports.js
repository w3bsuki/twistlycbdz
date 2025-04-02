const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/components/features/home/benefits-section.tsx',
  'src/components/blocks/shadcnblocks-com-hero45.tsx'
];

filesToUpdate.forEach(filePath => {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace import statements
    content = content.replace(
      /import\s+\{([^}]+)\}\s+from\s+['"]@\/components\/common\/ui\/tabs['"]/g,
      "import {$1} from '@/components/ui/tabs'"
    );
    
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Updated imports in ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error);
  }
});

console.log('✅ All tabs imports updated successfully!'); 