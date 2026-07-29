function createTopBrawlerChart() {
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
            maintainAspectRatio: false,
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

function createTopGamesModesChart() {
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
            maintainAspectRatio: false,
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

function createCharts() {
    createTopBrawlerChart();
    createTopGamesModesChart();
}