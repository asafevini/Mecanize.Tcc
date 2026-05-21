/**
 * Login page interactions
 */
document.addEventListener("DOMContentLoaded", () => {
  // --- toggle senha ---
  const toggleBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      // troca o ícone
      const iconName = isPassword ? "eye-off" : "eye";
      toggleBtn.innerHTML = "";
      const i = document.createElement("i");
      i.dataset.icon = iconName;
      i.dataset.size = "16";
      toggleBtn.appendChild(i);
      if (window.Icons) window.Icons.render();
      toggleBtn.setAttribute("aria-label", isPassword ? "Ocultar senha" : "Mostrar senha");
    });
  }

  // --- contador animado nos stats ---
  const counters = document.querySelectorAll("[data-count-to]");
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.countTo, 10);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easing easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * eased);
      // formata com ponto a cada 3 dígitos
      const formatted = value.toLocaleString("pt-BR");
      el.textContent = `${prefix}${formatted}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // dispara contadores após pequena pausa pra coincidir com fade-in
  setTimeout(() => counters.forEach(animateCounter), 900);

  // --- submit do form ---
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const pass = passwordInput.value;
      if (!email || !pass) {
        // efeito de shake no card se inválido
        const card = form;
        card.style.animation = "none";
        // força reflow
        void card.offsetWidth;
        card.style.animation = "shake .4s ease-in-out";
        setTimeout(() => (card.style.animation = ""), 400);
        return;
      }
      // estado de loading no botão
      const btn = form.querySelector(".login-submit");
      const originalContent = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<span style="opacity:.85">Entrando...</span>`;
      setTimeout(() => {
        window.location.href = "../02-dashboard/index.html";
      }, 600);
    });
  }
});

// shake keyframe injetado dinamicamente (evita poluir CSS principal)
const styleSheet = document.createElement("style");
styleSheet.textContent = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25%      { transform: translateX(-8px); }
  75%      { transform: translateX(8px); }
}
`;
document.head.appendChild(styleSheet);
