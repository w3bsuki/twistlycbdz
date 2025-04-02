const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/components/common/ui/hero-with-group-of-images-text-and-two-buttons.tsx',
  'src/components/common/ui/product-card.tsx',
  'src/components/common/ui/focus-cards.tsx',
  'src/components/blocks/shadcnblocks-com-hero45.tsx',
  'src/components/blocks/shadcnblocks-com-feature108.tsx'
];

filesToUpdate.forEach(filePath => {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace import statements
    content = content.replace(
      /import\s+\{([^}]+)\}\s+from\s+['"]@\/components\/common\/ui\/aspect-ratio['"]/g,
      "import {$1} from '@/components/ui/aspect-ratio'"
    );
    
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Updated imports in ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error);
  }
});

console.log('✅ All AspectRatio imports updated successfully!'); 