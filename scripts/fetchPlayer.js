import { setPlayer, setBattles, setAllBattleStats } from "./state.js";


const url = "https://api.findendag.dk";
const errorMessage = document.getElementById("errorMessage");
const loadingContainer = document.getElementById("cardShowcase");

function showError(message) {
    if (errorMessage) {
        loadingContainer.className = "";
        errorMessage.textContent = message;
        errorMessage.style.display = "block";
    }
}

export async function fetchPlayerSearch(text) {
    try {
        const playerSearchUrl = `${url}/api/player/search/${encodeURIComponent(text)}`;
        console.log("Fetching player search from URL:", playerSearchUrl);
        const response = await fetch(playerSearchUrl);

        if (!response.ok) {
            const message = `Failed to search for players with text "${text}".`;
            showError(message);
            throw new Error(message);
        }

        const result = await response.json();
        return result || [];
    } catch (error) {
        console.error("Error searching for players:", error);
        return [];
    }
}

export async function fetchData() {
    try {
        const params = new URLSearchParams(window.location.search);
        const playerTag = params.get("tag")?.replace(/^#/, "").trim();

        if (!playerTag) {
            throw new Error("Player tag is required in the URL query string.");
        }

        const response = await fetch(`${url}/api/player/${encodeURIComponent(playerTag)}`);

        if (!response.ok) {
            const message = `Failed to load player data with tag ${playerTag}.`;
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
        console.log("hello ")
        setPlayer(playerData);
        setBattles(battleStats);

    } catch (error) {
        console.error("Error loading player data:", error);
    }
}

export async function getAllPlayerStats() {
    const allPlayerStatsUrl = `${url}/api/allplayerstats`;

    try {

        const response = await fetch(allPlayerStatsUrl);

        if (!response.ok) {
            const message = `Failed to load all player data`;
            showError(message);
            throw new Error(message);
        }

        const result = await response.json();
        setAllBattleStats(result);
    } catch (error) {
        console.error("Error getting all battle data: ", error)        
    }
}