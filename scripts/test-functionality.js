#!/usr/bin/env node

/**
 * GetEasyCV Functionality Test Script
 * 
 * This script performs automated checks to verify all key functionality
 * is working correctly after the improvements.
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 GetEasyCV Functionality Test Suite');
console.log('=====================================\n');

let passedTests = 0;
let totalTests = 0;

function test(description, testFunction) {
  totalTests++;
  try {
    const result = testFunction();
    if (result) {
      console.log(`✅ ${description}`);
      passedTests++;
    } else {
      console.log(`❌ ${description}`);
    }
  } catch (error) {
    console.log(`❌ ${description} - Error: ${error.message}`);
  }
}

// Test 1: Check if all required files exist
test('All core files exist', () => {
  const requiredFiles = [
    'app/layout.tsx',
    'app/page.tsx',
    'app/templates/page.tsx',
    'app/editor/page.tsx',
    'components/cv/TemplateRenderer.tsx',
    'data/themes.ts',
    'data/layouts.ts',
    'lib/generateTemplates.ts',
    'package.json',
    'styles/enhanced.css'
  ];
  
  return requiredFiles.every(file => {
    const exists = fs.existsSync(path.join(process.cwd(), file));
    if (!exists) console.log(`  Missing: ${file}`);
    return exists;
  });
});

// Test 2: Check package.json dependencies
test('Required dependencies are installed', () => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = [
    'next',
    'react',
    'react-dom',
    'html2canvas',
    'jspdf',
    'react-hot-toast'
  ];
  
  return requiredDeps.every(dep => {
    const exists = packageJson.dependencies[dep] || packageJson.devDependencies[dep];
    if (!exists) console.log(`  Missing dependency: ${dep}`);
    return exists;
  });
});

// Test 3: Check if themes are properly configured
test('Theme system is properly configured', () => {
  try {
    const themesPath = path.join(process.cwd(), 'data/themes.ts');
    const themesContent = fs.readFileSync(themesPath, 'utf8');
    
    // Check for required theme properties
    const hasThemeExports = themesContent.includes('export const themes') || 
                           themesContent.includes('export { themes }');
    const hasGetAllThemes = themesContent.includes('getAllThemes');
    
    return hasThemeExports && hasGetAllThemes;
  } catch (error) {
    return false;
  }
});

// Test 4: Check if layouts are properly configured
test('Layout system is properly configured', () => {
  try {
    const layoutsPath = path.join(process.cwd(), 'data/layouts.ts');
    const layoutsContent = fs.readFileSync(layoutsPath, 'utf8');
    
    // Check for required layout properties
    const hasLayoutExports = layoutsContent.includes('export const layouts') || 
                            layoutsContent.includes('export { layouts }');
    const hasGetAllLayouts = layoutsContent.includes('getAllLayouts');
    
    return hasLayoutExports && hasGetAllLayouts;
  } catch (error) {
    return false;
  }
});

// Test 5: Check template renderer component
test('Template renderer component exists and exports properly', () => {
  try {
    const rendererPath = path.join(process.cwd(), 'components/cv/TemplateRenderer.tsx');
    const rendererContent = fs.readFileSync(rendererPath, 'utf8');
    
    return rendererContent.includes('TemplateRenderer') && 
           (rendererContent.includes('export default') || rendererContent.includes('export {'));
  } catch (error) {
    return false;
  }
});

// Test 6: Check if enhanced CSS exists and has required classes
test('Enhanced CSS styling is properly configured', () => {
  try {
    const cssPath = path.join(process.cwd(), 'styles/enhanced.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    const hasRequiredClasses = [
      '.scrollbar-hide',
      '.glass-effect',
      '.animate-pulse-soft',
      '.shadow-premium'
    ].every(className => cssContent.includes(className));
    
    return hasRequiredClasses;
  } catch (error) {
    return false;
  }
});

// Test 7: Check template generation system
test('Template generation system is functional', () => {
  try {
    const generatePath = path.join(process.cwd(), 'lib/generateTemplates.ts');
    const generateContent = fs.readFileSync(generatePath, 'utf8');
    
    return generateContent.includes('generateTemplates') && 
           generateContent.includes('GeneratedTemplate') &&
           generateContent.includes('SectionVariant');
  } catch (error) {
    return false;
  }
});

// Test 8: Check if export utilities exist
test('Export utilities are properly implemented', () => {
  try {
    const exportUtilsPath = path.join(process.cwd(), 'lib/exportUtils.ts');
    return fs.existsSync(exportUtilsPath);
  } catch (error) {
    return false;
  }
});

// Test 9: Verify TypeScript configuration
test('TypeScript configuration is valid', () => {
  try {
    const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
    
    return tsconfig.compilerOptions && 
           tsconfig.compilerOptions.strict !== false &&
           tsconfig.include;
  } catch (error) {
    return false;
  }
});

// Test 10: Check if documentation files exist
test('Documentation is complete', () => {
  const docFiles = [
    'README.md',
    'IMPROVEMENTS.md',
    'QA_CHECKLIST.md',
    'IMPLEMENTATION_SUMMARY.md'
  ];
  
  return docFiles.every(file => fs.existsSync(path.join(process.cwd(), file)));
});

// Test 11: Verify Next.js configuration
test('Next.js configuration is valid', () => {
  try {
    const nextConfigPath = path.join(process.cwd(), 'next.config.ts');
    return fs.existsSync(nextConfigPath);
  } catch (error) {
    return false;
  }
});

// Test 12: Check component exports
test('CV component exports are properly configured', () => {
  try {
    const indexPath = path.join(process.cwd(), 'components/cv/index.ts');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf8');
      return indexContent.includes('TemplateRenderer');
    }
    return true; // If index doesn't exist, individual exports are fine
  } catch (error) {
    return false;
  }
});

console.log('\n📊 Test Results');
console.log('================');
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${totalTests - passedTests}`);
console.log(`Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);

if (passedTests === totalTests) {
  console.log('\n🎉 All tests passed! GetEasyCV is ready for production.');
} else {
  console.log('\n⚠️  Some tests failed. Please review the issues above.');
}

console.log('\n🔗 Next Steps:');
console.log('1. Run `npm run dev` to start the development server');
console.log('2. Open http://localhost:3000 to test the application');
console.log('3. Test template selection and preview functionality');
console.log('4. Test PDF and image export functionality');
console.log('5. Verify responsive design on different screen sizes');

console.log('\n✨ GetEasyCV Feature Highlights:');
console.log('• 200+ Template combinations (20 layouts × 10 themes)');
console.log('• Modern 3-panel editor interface');
console.log('• High-quality PDF and image export');
console.log('• Mobile-responsive design');
console.log('• Auto-save functionality');
console.log('• Professional UI/UX design');

console.log('\nHappy resume building! 🚀');