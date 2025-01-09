import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer } from 'node:http';
import wisp from 'wisp-server-node';
import { publicPath } from 'ultraviolet-static';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { epoxyPath } from '@mercuryworkshop/epoxy-transport';
import { baremuxPath } from '@mercuryworkshop/bare-mux/node';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);

// Handle WebSocket upgrades for Ultraviolet
server.on('upgrade', (req, socket, head) => {
    if (req.url.endsWith('/wisp/')) {
        wisp.routeRequest(req, socket, head);
    } else {
        socket.end();
    }
});

// Serve Ultraviolet static files
app.use('/uv/', express.static(uvPath));
app.use('/epoxy/', express.static(epoxyPath));
app.use('/bare-mux/', express.static(baremuxPath));
app.use('/ultraviolet/', express.static(publicPath));

// Inject loader into client files
import('./scripts/inject-loader.js');

// Serve static files
app.use(express.static(join(__dirname)));

// Serve the 404 page for all requests except specific routes
app.use((req, res, next) => {
    // Allow UV and health check routes
    if (req.path.startsWith('/uv/') || 
        req.path.startsWith('/epoxy/') || 
        req.path.startsWith('/bare-mux/') || 
        req.path.startsWith('/ultraviolet/') || 
        req.path === '/health') {
        next();
        return;
    }
    
    // Serve the 404 page for all other requests
    res.sendFile(join(__dirname, '404_ No active service.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Handle all routes by serving index.html
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
