const express = require('express');
const path = require('path');
const { createBareServer } = require('@tomphttp/bare-server-node');
const { uvPath } = require('@titaniumnetwork-dev/ultraviolet');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bareServer = createBareServer('/bare/');

// Handle bare server requests
server.on('request', (req, res) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
        return;
    }

    app(req, res);
});

server.on('upgrade', (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeUpgrade(req, socket, head);
        return;
    }
    socket.end();
});

// Serve Ultraviolet files
app.use('/uv/', express.static(uvPath));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve the 404 page for all requests except the secret access
app.use((req, res, next) => {
    // Allow UV and health check routes
    if (req.path.startsWith('/uv/') || 
        req.path.startsWith('/service/') || 
        req.path.startsWith('/bare/') || 
        req.path === '/health') {
        next();
        return;
    }
    
    // Serve the 404 page for all other requests
    res.sendFile(path.join(__dirname, '404_ No active service.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Handle all routes by serving index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
