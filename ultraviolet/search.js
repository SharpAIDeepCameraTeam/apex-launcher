/**
 * Search and navigate using Ultraviolet
 */

// Create Ultraviolet instance
const uv = new Ultraviolet();

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('uv-form');
    const address = document.getElementById('uv-address');
    const searchEngine = document.getElementById('uv-search-engine');

    if (form && address && searchEngine) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            let url = address.value.trim();
            if (!isUrl(url)) {
                url = searchEngine.value.replace('%s', encodeURIComponent(url));
            }

            window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
        });
    }
});

/**
 * Check if string is a valid URL
 * @param {string} url
 * @returns {boolean}
 */
function isUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}
