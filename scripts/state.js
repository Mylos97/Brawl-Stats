let state = {
    playerData: null,
    battleStats: null,
    allBattleStats: null
};

export function getState() {
    if(state.playerData == null || state.battleStats == null) {
        throw new Error("State is not fully initialized. Player data or battle stats are missing.");
    }
    
    return state;
}

export function getAllBattleStats() {
    if(state.allBattleStats == null) {
        throw new Error("All battle stats are not initinalized")
    }

    return state.allBattleStats;
}

export function setPlayer(playerData) {
    state.playerData = playerData;
}

export function setBattles(battleStats) {
    state.battleStats = battleStats;
}

export function setAllBattleStats(allBattleStats) {
    state.allBattleStats = allBattleStats;
}