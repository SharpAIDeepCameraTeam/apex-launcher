const fs = require('fs');
const path = require('path');

// Function to inject loader script into HTML files
function injectLoader(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if script is already injected
    if (content.includes('client-loader.js')) {
        return;
    }

    // Find the closing head tag
    const headCloseIndex = content.indexOf('</head>');
    if (headCloseIndex === -1) return;

    // Insert our script before the closing head tag
    const injection = '<script src="client-loader.js"></script>\n';
    content = content.slice(0, headCloseIndex) + injection + content.slice(headCloseIndex);

    // Write the modified content back
    fs.writeFileSync(filePath, content);
}

// Process all HTML files in the eagler directory
const eaglerDir = path.join(__dirname, '..', 'Silicon-eaglercraft', 'eagler');
fs.readdirSync(eaglerDir).forEach(file => {
    if (file.endsWith('.html')) {
        injectLoader(path.join(eaglerDir, file));
    }
});

console.log('Loader script injected into client files');
