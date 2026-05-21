/**
 * Produtividade: OS Concluídas por Mecânico (Chart.js bar)
 */

Chart.defaults.font.family = "Inter, system-ui, sans-serif";
Chart.defaults.font.size = 11;
Chart.defaults.color = "#64748B";

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
  const el = document.getElementById("prodChart");
  if (!el) return;

  new Chart(el, {
    type: "bar",
    data: {
      labels: ["Ricardo Souza", "André Lima", "Fernanda Costa", "Marcos Oliveira"],
      datasets: [
        {
          data: [42, 31, 24, 18],
          backgroundColor: "#3B82F6",
          borderRadius: 6,
          maxBarThickness: 90,
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
          max: 50,
          ticks: { stepSize: 10 },
          grid: { color: "#E2E8F0", drawBorder: false },
        },
        x: { grid: { display: false } },
      },
    },
    plugins: [valueOnTopPlugin],
  });
}

document.addEventListener("DOMContentLoaded", () => setTimeout(initCharts, 50));
