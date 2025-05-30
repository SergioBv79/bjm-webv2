// Archivo: js/header.js

// Inserta este header en todas las páginas llamando a este script en el HTML
// Asegúrate de que el elemento <header id="header"></header> esté en el HTML principal
const base = location.pathname.includes("blog") || 
             location.pathname.includes("trabajos") || 
             location.pathname.includes("servicios") || 
             location.pathname.includes("quienes-somos") ||  // ⬅️ añade esto
             location.pathname.includes("candidatos")
             ? "../" : "";


document.getElementById("header").innerHTML = `

<div class="banner-top">
  <div class="logo">
    <a href="${base}index.html">
      <img src="${base}img/logo.png" alt="Logo BJM" />
    </a>
  </div>
  <div class="frase-banner">
    
    Personas que cuidan lo que otras personas necesitan para seguir adelante.
  </div>
</div>

<div class="contenedor-header">
  <!-- Botón hamburguesa para vista móvil -->
  <button id="menu-toggle" class="hamburguesa" aria-label="Abrir menú">
    <i class="fas fa-bars"></i>
  </button>

  <nav class="menu-principal">
    <ul>
      <li><a href="${base}index.html"><i class="fa-solid fa-house"></i> Inicio</a></li>
      <li><a href="${base}quienes-somos/index.html"><i class="fa-solid fa-users"></i> Quiénes somos</a></li>
      <li><a href="${base}servicios/index.html"><i class="fa-solid fa-gears"></i> Servicios</a></li>
      <li><a href="${base}trabajos/index.html"><i class="fa-solid fa-screwdriver-wrench"></i> Casos de éxito</a></li>
      <li><a href="${base}trabaja.html"><i class="fa-solid fa-user-plus"></i> Trabaja con nosotros</a></li>
      <li><a href="${base}contacto.html"><i class="fa-solid fa-envelope"></i> Contacto</a></li>
      <li><a href="${base}blog/index.html"><i class="fa-solid fa-blog"></i> Blog</a></li>
    </ul>
  </nav>

  <div class="redes-header">
    <a href="https://www.instagram.com/borja_1629/" aria-label="Instagram" target="_blank"><i class="fa-brands fa-instagram"></i></a>
    <a href="https://www.facebook.com/borja.gilgonzalez.7" aria-label="Facebook" target="_blank"><i class="fa-brands fa-facebook"></i></a>
    <a href="#" aria-label="TikTok" target="_blank"><i class="fa-brands fa-tiktok"></i></a>
    <a href="#" aria-label="LinkedIn" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
    <a href="#" aria-label="YouTube" target="_blank"><i class="fa-brands fa-youtube"></i></a>
  </div>
</div>
`;