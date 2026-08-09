import { displayPlayerData } from "./playerInfoStats.js";
import { createCharts } from "./playerInfoGraphs.js";

const url = "http://81.88.19.86";

window.onload = function() {
  fetchData();
};

async function fetchData() {
    try {
        const params = new URLSearchParams(window.location.search);
        const playerTag = params.get("tag");

        const playerResponse = await fetch(`${url}/api/player/${playerTag}`);

        if (!playerResponse.ok) {
            throw new Error("Could not load one or more data files.");
        }

        const playerDataResult = await playerResponse.json();

        console.log(playerDataResult)
        const playerData = playerDataResult["accountInfo"];
        const battleStats = playerDataResult["battleLogs"];
        displayPlayerData(playerData, battleStats);
        createCharts(battleStats);

    } catch (error) {
        console.error("Error loading player data:", error);
    }
}