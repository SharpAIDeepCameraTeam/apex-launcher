const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8081;

// Enable trust proxy for Koyeb's forwarded headers
app.set('trust proxy', true);

// Serve static files
app.use(express.static(__dirname));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Serve index.html for root path and any unmatched routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
