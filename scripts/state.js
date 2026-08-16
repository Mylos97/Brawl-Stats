let state = {
    playerData: null,
    battleStats: null
};

export function getState() {
    if(state.playerData == null || state.battleStats == null) {
        throw new Error("State is not fully initialized. Player data or battle stats are missing.");
    }
    
    return state;
}

export function setPlayer(playerData) {
    state.playerData = playerData;
}

export function setBattles(battleStats) {
    state.battleStats = battleStats;
}