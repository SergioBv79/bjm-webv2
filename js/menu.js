document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle");
  const menu = document.querySelector(".menu-principal");

  toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("abierto");
  });
});
