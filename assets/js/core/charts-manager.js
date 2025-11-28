// assets/js/core/charts-manager.js

export class ChartsManager {
    static createMacroChart(ctx, proteinGrams, carbGrams, fatGrams, goalCalories, proteinPerc, carbPerc, fatPerc) {
        // Lógica para crear el gráfico de macronutrientes
        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Proteínas (g)', 'Carbohidratos (g)', 'Grasas (g)'],
                datasets: [{
                    label: 'Gramos por Macronutriente',
                    data: [proteinGrams.toFixed(1), carbGrams.toFixed(1), fatGrams.toFixed(1)],
                    backgroundColor: [
                        'rgba(46, 125, 50, 0.7)',
                        'rgba(52, 199, 89, 0.7)', 
                        'rgba(32, 201, 151, 0.7)'
                    ],
                    borderColor: [
                        'rgba(46, 125, 50, 1)',
                        'rgba(52, 199, 89, 1)',
                        'rgba(32, 201, 151, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    title: {
                        display: true,
                        text: `Distribución de Macronutrientes (${goalCalories} kcal)`
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed + ' g';
                                    const dataIndex = context.dataIndex;
                                    const percentages = [proteinPerc, carbPerc, fatPerc];
                                    if (dataIndex < percentages.length) {
                                        label += ` (${percentages[dataIndex]}%)`;
                                    }
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    // ... otros métodos para gráficos
}