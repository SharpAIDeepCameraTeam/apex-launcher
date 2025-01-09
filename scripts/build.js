const path = require('path');
const fs = require('fs');
const esbuild = require('esbuild');

async function build() {
    // Ensure directories exist
    const publicDir = path.join(__dirname, '..', 'public');
    const uvDir = path.join(publicDir, 'uv');
    
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }
    if (!fs.existsSync(uvDir)) {
        fs.mkdirSync(uvDir);
    }

    // Copy Ultraviolet app files
    const uvAppDir = path.join(__dirname, '..', 'Ultraviolet-App-main');
    const uvStaticDir = path.join(uvAppDir, 'node_modules', 'ultraviolet-static', 'public');
    
    if (fs.existsSync(uvStaticDir)) {
        // Copy all files from UV static directory to our public/uv directory
        fs.readdirSync(uvStaticDir).forEach(file => {
            fs.copyFileSync(
                path.join(uvStaticDir, file),
                path.join(uvDir, file)
            );
        });
    }

    // Create config
    const config = `
self.__uv$config = {
    prefix: '/service/',
    bare: '/bare/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/uv/uv.handler.js',
    bundle: '/uv/uv.bundle.js',
    config: '/uv/uv.config.js',
    sw: '/uv/uv.sw.js',
};`;

    fs.writeFileSync(path.join(uvDir, 'uv.config.js'), config);
}

build().catch(console.error);
