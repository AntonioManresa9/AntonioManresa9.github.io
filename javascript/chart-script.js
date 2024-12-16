const ctx = document.getElementById('myChart').getContext('2d');

// Datos para los 12 meses
const labels = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const data = {
    labels: labels,
    datasets: [{
        label: 'Usuarios Activos Mensuales',
        data: [50, 75, 100, 125, 150, 200, 250, 300, 350, 400, 450, 500],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)', 
        borderWidth: 1.5 
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                        family: "'Roboto', sans-serif",
                        weight: 'bold'
                    },
                    color: '#4B4B4B'
                }
            },
            title: {
                display: true,
                text: 'Crecimiento de Usuarios Activos (Enero - Diciembre)',
                font: {
                    size: 20,
                    family: "'Roboto', sans-serif",
                    weight: 'bold'
                },
                color: '#333'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 600,
                ticks: {
                    stepSize: 50,
                    font: {
                        size: 12
                    },
                    color: '#4B4B4B'
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.5)',
                    borderDash: [5, 5]
                },
                title: {
                    display: true,
                    text: 'Usuarios Activos',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    color: '#4B4B4B'
                }
            },
            x: {
                ticks: {
                    font: {
                        size: 12
                    },
                    color: '#4B4B4B'
                },
                grid: {
                    display: false 
                },
                title: {
                    display: true,
                    text: 'Meses del Año',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    color: '#4B4B4B'
                }
            }
        },
        elements: {
            bar: {
                barPercentage: 0.7,
                categoryPercentage: 0.9,
                borderRadius: 5 
            }
        },
        layout: {
            padding: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20
            }
        }
    }
};

new Chart(ctx, config);
