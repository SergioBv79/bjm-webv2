
// Carrusel automático para sección "Quiénes somos"
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".carrusel-slide");
  let currentSlide = 0;
  const tiempoCambio = 5000; // 5 segundos

  function mostrarSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("activo");
      if (i === index) slide.classList.add("activo");
    });
  }

  function siguienteSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    mostrarSlide(currentSlide);
  }

  // Iniciar carrusel automático
  mostrarSlide(currentSlide);
  setInterval(siguienteSlide, tiempoCambio);

  // Animación de aparición para secciones con clase .animar-aparicion
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.2,
  });

  document.querySelectorAll(".animar-aparicion").forEach((el) => {
    observador.observe(el);
  });
});
