const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve the 404 page for all requests except the secret access
app.use((req, res, next) => {
  // Only allow index.html through specific routes or conditions
  if (req.path === '/health') {
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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
