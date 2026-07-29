const container = document.getElementById("graphShowcase");
let brawlerChart = null;
let gamemodeChart = null;

function createTopBrawlerChart(battleStats) {
    brawlerChart = new Chart(document.getElementById("topBrawlersChart"), {
        type: "bar",
        data: {
            labels: battleStats.top_brawlers.map(b => b.brawler),
            datasets: [{
                label: "Games Played",
                data: battleStats.top_brawlers.map(b => b.games),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}

function createTopGamesModesChart(battleStats) {
    gamemodeChart = new Chart(document.getElementById("topGamemodesChart"), {
        type: "bar",
        data: {
            labels: battleStats.top_gamemodes.map(g => g.gamemode),
            datasets: [{
                label: "Games Played",
                data: battleStats.top_gamemodes.map(g => g.games),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}

function cleanUpcharts() {
    if (brawlerChart) brawlerChart.destroy();
    if (gamemodeChart) gamemodeChart.destroy();
}

function createCards() {
    const top5Brawlers = `
        <div class="card">
            <h2 class="card-title">Top 5 Brawlers</h2>
            <canvas id="topBrawlersChart"></canvas>
        </div>`

    const top5GamesModes = `
        <div class="card">
            <h2 class="card-title">Top 5 Gamemodes</h2>
            <canvas id="topGamemodesChart"></canvas>
        </div>`;
    
    container.innerHTML = top5Brawlers + top5GamesModes;
}

export function createCharts(battleStats) {
    cleanUpcharts();

    createCards();
    createTopBrawlerChart(battleStats);
    createTopGamesModesChart(battleStats);
}