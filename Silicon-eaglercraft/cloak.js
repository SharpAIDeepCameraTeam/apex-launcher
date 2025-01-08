function googleDocsCloak() {
    // Create a blank window
    const win = window.open();
    
    // Write Google Docs-like content to make it look legitimate
    win.document.write(`
        <title>Google Docs</title>
        <link rel="icon" type="image/x-icon" href="https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico">
        <style>
            body { margin: 0; }
            iframe {
                width: 100%;
                height: 100vh;
                border: none;
            }
        </style>
    `);

    // Create an iframe pointing to the original page
    const iframe = win.document.createElement('iframe');
    iframe.src = window.location.href;
    win.document.body.appendChild(iframe);

    // Close the original window
    window.location.replace('https://docs.google.com');
}

// Add keyboard shortcut (Ctrl + Shift + H)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'H') {
        googleDocsCloak();
    }
}); 