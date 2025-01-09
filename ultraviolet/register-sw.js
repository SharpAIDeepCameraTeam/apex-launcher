/**
 * Register the service worker for Ultraviolet
 */

const sw = "/uv/uv.sw.js";

/**
 * Register the service worker
 */
async function registerSW() {
    try {
        await navigator.serviceWorker.register(sw, {
            scope: __uv$config.prefix
        });
    } catch (err) {
        console.error('Failed to register service worker:', err);
    }
}

registerSW();
