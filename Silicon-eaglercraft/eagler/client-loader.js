// Add loading overlay to the page
function addLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.innerHTML = `
        <div style="text-align: center;">
            <div class="loading-spinner"></div>
            <div id="loading-text">Loading Client...</div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Add CSS link if not present
    if (!document.querySelector('link[href="client.css"]')) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'client.css';
        document.head.appendChild(cssLink);
    }

    // Add font if not present
    if (!document.querySelector('link[href*="Poppins"]')) {
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
        document.head.appendChild(fontLink);
    }

    // Remove overlay after loading
    window.onload = function() {
        setTimeout(function() {
            overlay.style.opacity = '0';
            setTimeout(function() {
                overlay.style.display = 'none';
            }, 500);
        }, 2000);
    };
}

// Run immediately
addLoadingOverlay();
