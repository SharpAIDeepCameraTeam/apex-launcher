import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function build() {
    // Ensure directories exist
    const publicDir = join(__dirname, '..', 'public');
    const uvDir = join(publicDir, 'uv');
    
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }
    if (!fs.existsSync(uvDir)) {
        fs.mkdirSync(uvDir);
    }

    // Copy Ultraviolet app files
    const uvAppDir = join(__dirname, '..', 'Ultraviolet-App-main');
    const uvStaticDir = join(uvAppDir, 'node_modules', 'ultraviolet-static', 'public');
    
    if (fs.existsSync(uvStaticDir)) {
        // Copy all files from UV static directory to our public/uv directory
        fs.readdirSync(uvStaticDir).forEach(file => {
            fs.copyFileSync(
                join(uvStaticDir, file),
                join(uvDir, file)
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

    fs.writeFileSync(join(uvDir, 'uv.config.js'), config);
}

build().catch(console.error);
