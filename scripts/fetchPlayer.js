import { displayPlayerData } from "./playerInfoStats.js";
import { createCharts } from "./playerInfoGraphs.js";

const url = "https://api.findendag.dk";
const errorMessage = document.getElementById("errorMessage");

window.addEventListener("DOMContentLoaded", fetchData);

function showError(message) {
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = "block";
    }
}

async function fetchData() {
    try {
        const params = new URLSearchParams(window.location.search);
        const playerTag = params.get("tag")?.replace(/^#/, "").trim();

        if (!playerTag) {
            throw new Error("Player tag is required in the URL query string.");
        }

        const response = await fetch(`${url}/api/player/${encodeURIComponent(playerTag)}`);

        if (!response.ok) {
            const message = response.status === 404
                ? `Could not find a player with tag ${playerTag}.`
                : `Failed to load player data: ${response.status} ${response.statusText}`;
            showError(message);
            throw new Error(message);
        }

        const result = await response.json();
        const playerData = result?.accountInfo;
        const battleStats = result?.battleLogs;

        if (!playerData || !battleStats) {
            const message = `Could not find a player with tag ${playerTag}.`;
            showError(message);
            throw new Error(message);
        }

        displayPlayerData(playerData, battleStats);
        createCharts(battleStats);
    } catch (error) {
        console.error("Error loading player data:", error);
    }
}