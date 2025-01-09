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

    // Bundle UV
    await esbuild.build({
        entryPoints: ['./Ultraviolet-main/src/uv.handler.js'],
        bundle: true,
        outfile: './public/uv/uv.handler.js',
        format: 'iife',
        globalName: 'UVServiceWorker',
    });

    await esbuild.build({
        entryPoints: ['./Ultraviolet-main/src/uv.bundle.js'],
        bundle: true,
        outfile: './public/uv/uv.bundle.js',
        format: 'iife',
        globalName: 'Ultraviolet',
    });

    // Copy SW
    fs.copyFileSync(
        path.join(__dirname, '..', 'Ultraviolet-main', 'src', 'uv.sw.js'),
        path.join(uvDir, 'uv.sw.js')
    );

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
