// Archivo: js/scripts.js

// Mostrar botón "volver arriba" cuando se hace scroll
window.addEventListener("scroll", () => {
  const btnTop = document.getElementById("btn-top");
  if (window.scrollY > 300) {
    btnTop.style.display = "block";
  } else {
    btnTop.style.display = "none";
  }
});

// Al hacer clic, subir arriba suavemente
const btnTop = document.getElementById("btn-top");
if (btnTop) {
  btnTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Placeholder inicial para la lógica futura de cookies flotantes avanzadas
// Aquí insertaremos la ventana emergente de la configuracion de cookies
// Se activará desde cookies.js más adelante
 
document.addEventListener("DOMContentLoaded", function () {
  const frase = document.querySelector(".frase-destacada");

  function checkFraseVisible() {
    const rect = frase.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.85;

    if (rect.top < triggerPoint) {
      frase.classList.add("visible");
      window.removeEventListener("scroll", checkFraseVisible);
    }
  }

  window.addEventListener("scroll", checkFraseVisible);
  checkFraseVisible(); // por si ya está visible al cargar
});


document.querySelectorAll('a[href^="#"]').forEach(ancla => {
  ancla.addEventListener('click', function (e) {
    const destino = this.getAttribute('href');
    if (destino.length > 1) {
      e.preventDefault();
      const objetivo = document.querySelector(destino);
      if (objetivo) {
        objetivo.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});


// animaciones con IntersectionObserver
document.addEventListener("DOMContentLoaded", () => {
  const elementosAnimados = document.querySelectorAll('.animado');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.3
  });

  elementosAnimados.forEach(el => observer.observe(el));
});


