
// 💥 Animación divertida al hacer clic en los botones
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".card-enlace").forEach(card => {
    card.addEventListener("click", (e) => {
      card.classList.add("explosion");
      setTimeout(() => {
        card.classList.remove("explosion");
      }, 500);
    });
  });
});
