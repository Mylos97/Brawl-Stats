import { displayPlayerData } from "./playerInfoStats.js";
import { createCharts } from "./playerInfoGraphs.js";

const url = "https://api.findendag.dk";

window.addEventListener("DOMContentLoaded", fetchData);

async function fetchData() {
    try {
        const params = new URLSearchParams(window.location.search);
        const playerTag = params.get("tag")?.replace(/^#/, "").trim();

        if (!playerTag) {
            throw new Error("Player tag is required in the URL query string.");
        }

        const response = await fetch(`${url}/api/player/${encodeURIComponent(playerTag)}`);

        if (!response.ok) {
            throw new Error(`Failed to load player data: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        const playerData = result?.accountInfo;
        const battleStats = result?.battleLogs;

        if (!playerData || !battleStats) {
            throw new Error("Incomplete player data received from API.");
        }

        displayPlayerData(playerData, battleStats);
        createCharts(battleStats);
    } catch (error) {
        console.error("Error loading player data:", error);
    }
}