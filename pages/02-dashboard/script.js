/**
 * Dashboard charts (Chart.js)
 *  - Fluxo de OS vs Receita (linha dupla)
 *  - Status das OS (donut com total no centro)
 */

const fontFamily = "Inter, system-ui, sans-serif";
const colorText = "#0F172A";
const colorMuted = "#64748B";
const colorGrid = "#E2E8F0";

// Defaults globais Chart.js
Chart.defaults.font.family = fontFamily;
Chart.defaults.font.size = 11;
Chart.defaults.color = colorMuted;

// Plugin para texto central no donut
const centerTextPlugin = {
  id: "centerText",
  afterDraw(chart) {
    const opts = chart.config.options.plugins?.centerText;
    if (!opts) return;
    const { ctx, chartArea: { left, top, right, bottom } } = chart;
    const cx = (left + right) / 2;
    const cy = (top + bottom) / 2;
    ctx.save();
    ctx.textAlign = "center";
    ctx.fillStyle = colorText;
    ctx.font = `700 32px ${fontFamily}`;
    ctx.fillText(opts.text, cx, cy + 4);
    if (opts.subtext) {
      ctx.fillStyle = colorMuted;
      ctx.font = `500 11px ${fontFamily}`;
      ctx.fillText(opts.subtext, cx, cy + 22);
    }
    ctx.restore();
  }
};

function initCharts() {
  // ============ Linha: Fluxo OS vs Receita ============
  const lineEl = document.getElementById("flowChart");
  if (lineEl) {
    new Chart(lineEl, {
      type: "line",
      data: {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        datasets: [
          {
            label: "Ordens de Serviço",
            data: [22, 28, 18, 34, 30, 24, 20],
            borderColor: "#3B82F6",
            backgroundColor: "#3B82F6",
            tension: 0.35,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: "#fff",
            pointBorderWidth: 2,
            pointHoverRadius: 6,
          },
          {
            label: "Receita (R$)",
            data: [12, 18, 14, 26, 30, 22, 16],
            borderColor: "#EF4444",
            backgroundColor: "#EF4444",
            tension: 0.35,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: "#fff",
            pointBorderWidth: 2,
            pointHoverRadius: 6,
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
            max: 40,
            ticks: { stepSize: 10 },
            grid: { color: colorGrid, drawBorder: false },
          },
          x: {
            grid: { display: false },
          },
        },
      },
    });
  }

  // ============ Donut: Status das OS ============
  const donutEl = document.getElementById("donutChart");
  if (donutEl) {
    new Chart(donutEl, {
      type: "doughnut",
      data: {
        labels: ["Concluídas", "Em andamento", "Pendentes"],
        datasets: [
          {
            data: [45, 35, 20],
            backgroundColor: ["#10B981", "#3B82F6", "#F59E0B"],
            borderWidth: 0,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "72%",
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#0F172A",
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`,
            },
          },
          centerText: { text: "80", subtext: "Total" },
        },
      },
      plugins: [centerTextPlugin],
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initCharts, 50);
});
