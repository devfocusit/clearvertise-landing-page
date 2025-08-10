const fs = require('fs');
const path = require('path');

// Cross-platform build script for Clearvertise Landing Page
console.log('Building Clearvertise Landing Page...');

const srcDir = path.join(__dirname, 'src');
const buildDir = path.join(__dirname, 'build');

// Clean and create build directory
if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true, force: true });
}
fs.mkdirSync(buildDir, { recursive: true });

// Copy files recursively
function copyRecursive(src, dest) {
    const stat = fs.statSync(src);
    
    if (stat.isDirectory()) {
        // Create directory if it doesn't exist
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        
        // Copy all files in directory
        const files = fs.readdirSync(src);
        files.forEach(file => {
            const srcFile = path.join(src, file);
            const destFile = path.join(dest, file);
            copyRecursive(srcFile, destFile);
        });
    } else {
        // Copy file
        fs.copyFileSync(src, dest);
        console.log(`Copied: ${path.relative(__dirname, src)}`);
    }
}

try {
    copyRecursive(srcDir, buildDir);
    console.log('✅ Build completed successfully!');
    console.log(`📁 Files built to: ${buildDir}`);
    
    // List built files
    const files = fs.readdirSync(buildDir);
    console.log('📋 Built files:', files.join(', '));
    
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}
