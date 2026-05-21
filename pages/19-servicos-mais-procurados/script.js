/**
 * Serviços Mais Procurados: barra com valores no topo (Chart.js)
 */

Chart.defaults.font.family = "Inter, system-ui, sans-serif";
Chart.defaults.font.size = 11;
Chart.defaults.color = "#64748B";

// Plugin para mostrar valor acima de cada barra
const valueOnTopPlugin = {
  id: "valueOnTop",
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    const ds = chart.getDatasetMeta(0);
    if (!ds) return;
    ctx.save();
    ctx.fillStyle = "#0F172A";
    ctx.font = `600 12px ${Chart.defaults.font.family}`;
    ctx.textAlign = "center";
    ds.data.forEach((bar, i) => {
      const value = chart.data.datasets[0].data[i];
      ctx.fillText(value, bar.x, bar.y - 8);
    });
    ctx.restore();
  },
};

function initCharts() {
  const el = document.getElementById("topServices");
  if (!el) return;

  new Chart(el, {
    type: "bar",
    data: {
      labels: ["Troca de Óleo", "Revisão Geral", "Alinhamento", "Troca de Pastilhas", "Higienização"],
      datasets: [
        {
          data: [532, 287, 198, 142, 89],
          backgroundColor: "#3B82F6",
          borderRadius: 6,
          maxBarThickness: 70,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 24 } },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0F172A",
          padding: 10,
          cornerRadius: 8,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 600,
          ticks: { stepSize: 150 },
          grid: { color: "#E2E8F0", drawBorder: false },
        },
        x: { grid: { display: false } },
      },
    },
    plugins: [valueOnTopPlugin],
  });
}

document.addEventListener("DOMContentLoaded", () => setTimeout(initCharts, 50));
