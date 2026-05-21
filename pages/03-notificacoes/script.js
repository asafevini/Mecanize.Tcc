document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tabs__item").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tabs__item").forEach(t => t.classList.remove("is-active"));
      tab.classList.add("is-active");
    });
  });
});
