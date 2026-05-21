/**
 * Relatórios: Receita Mensal vs Despesas (Chart.js bar)
 */

Chart.defaults.font.family = "Inter, system-ui, sans-serif";
Chart.defaults.font.size = 11;
Chart.defaults.color = "#64748B";

function initCharts() {
  const el = document.getElementById("barChart");
  if (!el) return;

  new Chart(el, {
    type: "bar",
    data: {
      labels: ["Nov", "Dez", "Jan", "Fev", "Mar", "Abr", "Mai"],
      datasets: [
        {
          label: "Receita (R$)",
          data: [55, 62, 48, 70, 75, 68, 78],
          backgroundColor: "#3B82F6",
          borderRadius: 4,
          maxBarThickness: 32,
        },
        {
          label: "Despesa (R$)",
          data: [30, 32, 28, 34, 36, 33, 35],
          backgroundColor: "#EF4444",
          borderRadius: 4,
          maxBarThickness: 32,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
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
          max: 100,
          ticks: { stepSize: 25 },
          grid: { color: "#E2E8F0", drawBorder: false },
        },
        x: {
          grid: { display: false },
        },
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", () => setTimeout(initCharts, 50));
