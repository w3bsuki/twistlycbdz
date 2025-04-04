const fs = require('fs');
const path = require('path');

// Paths
const eslintConfigPath = path.join(__dirname, '.eslintrc.json');
const backupConfigPath = path.join(__dirname, '.eslintrc.json.backup');

// Check if backup exists
if (fs.existsSync(backupConfigPath)) {
  console.log('🔄 Restoring original ESLint config...');
  fs.copyFileSync(backupConfigPath, eslintConfigPath);
  fs.unlinkSync(backupConfigPath);
  console.log('✅ ESLint configuration restored!');
} else {
  console.error('❌ No backup ESLint configuration found!');
} 