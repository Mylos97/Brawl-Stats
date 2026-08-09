
const genericTitle = {
    text: "I should be changed",
    display: true,
    align: "start",
    color: "#8eaefc",
    padding: 0,
    font: {
        size: 18,
        family: "system-ui"
    }
}

export function redrawCharts(charts) {
    for (const chart of charts) {
        if (chart) {
            chart.destroy();
        }
    }
}

export function createHorizontalBarChart(htmlChartId, labels, data, title, datasetLabel = "Values") {
    return new Chart(document.getElementById(htmlChartId), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: datasetLabel,
                data: data,
                borderRadius: 8,
                barThickness: 14,
                backgroundColor: "#8eaefc",
                borderColor: "#8eaefc"
            }]
        },
        options: {
            indexAxis: "y",
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {...genericTitle, text: title}
            },
            scales: {
                x: {
                    display: false,
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        color: "#cfe0ff"
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

export function createDoughnutChart(htmlChartId, labels, data, title) {
    return new Chart(document.getElementById(htmlChartId), {
        type: "doughnut",
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ["#8eaefc", "#ffb86b", "#4dd3c5", "#5ea3ff", "#ef5f8d"],
                borderColor: "#0a1224",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "80%",
            plugins: {
                title: {...genericTitle, text: title, padding: {bottom: 34}, align: "center"},
                legend: {
                    position: "bottom",
                    labels: {
                        color: "#cfe0ff",
                        padding: 14,
                        boxWidth: 12
                    }
                },

            }
        }
    });
}

export function createLineChart(htmlChartId, labels, data, title) {
    return new Chart(document.getElementById(htmlChartId), {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                data: data,
                fill: true,
                borderColor: "#8eaefc",
                backgroundColor: "rgba(142, 174, 252, 0.2)",
                tension: 0.4
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {...genericTitle, text: title,  padding: {bottom: 34}}
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0,
                        maxTicksLimit: 5
                    }
                },
                x: {
                    display: false,
                }
            }
        }
    });
}

