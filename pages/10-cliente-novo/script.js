document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tabs__item").forEach(t => {
    t.addEventListener("click", () => {
      const parent = t.parentElement;
      parent.querySelectorAll(".tabs__item").forEach(x => x.classList.remove("is-active"));
      t.classList.add("is-active");
    });
  });
});
