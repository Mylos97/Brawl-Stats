const localHosts = new Set(["localhost", "127.0.0.1", "::1"]);

export const API_BASE_URL = window.BRAWLSTATS_API_URL
    || (localHosts.has(window.location.hostname)
        ? "http://127.0.0.1:8000"
        : "https://api.findendag.dk");
