// cookies.js - Gestión completa de cookies

document.addEventListener("DOMContentLoaded", function () {
  const consent = localStorage.getItem("cookies_accepted");

  const bannerHTML = `
    <div id="cookie-banner" class="cookie-banner">
      <p>Este sitio utiliza cookies para mejorar la experiencia del usuario y analizar el tráfico. Puedes aceptar todas, rechazarlas o configurarlas.</p>
      <div class="cookie-buttons">
        <button id="accept-cookies">Aceptar todas</button>
        <button id="reject-cookies">Rechazar</button>
        <button id="configure-cookies">Configurar</button>
      </div>
    </div>
  `;

  const configHTML = `
    <div id="cookie-config-modal" class="cookie-modal oculto">
      <div class="cookie-modal-contenido configuracion-cookies animar-aparicion">
        <h2><i class="fas fa-cogs"></i> Configuración de cookies</h2>
        <form id="cookie-options">
          <label><input type="checkbox" disabled checked> Cookies necesarias (siempre activas)</label><br>
          <label><input type="checkbox" id="analytics"> Cookies estadísticas</label><br>
          <label><input type="checkbox" id="marketing"> Cookies de marketing</label><br>
          <div class="cookie-modal-botones">
            <button type="submit">Guardar configuración</button>
            <button type="button" id="close-config">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Insertar siempre el panel de configuración para que funcione la galleta
  document.body.insertAdjacentHTML("beforeend", configHTML);

  const modal = document.getElementById("cookie-config-modal");
  // ✅ Espera hasta que el botón y el modal estén en el DOM y engancha el evento
const esperarBotonYModal = setInterval(() => {
  const boton = document.querySelector(".abrir-config-cookies");
  const modal = document.getElementById("cookie-config-modal");

  if (boton && modal && !boton.classList.contains("evento-puesto")) {
    boton.addEventListener("click", () => {
      modal.classList.remove("oculto");
    });
    boton.classList.add("evento-puesto");
    clearInterval(esperarBotonYModal);
  }
}, 200);


  // Mostrar el banner SOLO si estamos en index.html o raíz
  const path = window.location.pathname;
  const esIndex = path.endsWith("index.html") || path === "/" || path.endsWith("/");

  if (!consent && esIndex) {
    document.body.insertAdjacentHTML("beforeend", bannerHTML);
    document.getElementById("cookie-banner").classList.add("visible");
  } else if (consent) {
    activarGoogleAnalyticsSiProcede();
  }

  const openConfig = document.getElementById("abrir-configuracion-cookies");

  if (openConfig) {
    openConfig.addEventListener("click", () => {
      modal.classList.remove("oculto");
    });
  }

  document.querySelectorAll('.abrir-config-cookies').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      modal.classList.remove("oculto");
    });
  });

  document.addEventListener("click", function (e) {
    if (e.target.id === "configure-cookies") {
      modal.classList.remove("oculto");
    }
    if (e.target.id === "close-config") {
      modal.classList.add("oculto");
    }
    if (e.target.id === "accept-cookies") {
      localStorage.setItem("cookies_accepted", "all");
      const banner = document.getElementById("cookie-banner");
      if (banner) banner.remove();
      modal.classList.add("oculto");
      activarGoogleAnalyticsSiProcede();
    }
    if (e.target.id === "reject-cookies") {
      localStorage.setItem("cookies_accepted", "necessary");
      const banner = document.getElementById("cookie-banner");
      if (banner) banner.remove();
      modal.classList.add("oculto");
    }
  });

  document.addEventListener("submit", function (e) {
    if (e.target.id === "cookie-options") {
      e.preventDefault();
      const accepted = {
        analytics: document.getElementById("analytics").checked,
        marketing: document.getElementById("marketing").checked
      };
      localStorage.setItem("cookies_custom", JSON.stringify(accepted));
      localStorage.setItem("cookies_accepted", "custom");
      const banner = document.getElementById("cookie-banner");
      if (banner) banner.remove();
      modal.classList.add("oculto");
      activarGoogleAnalyticsSiProcede();
      if (typeof mostrarFormularioSiHayConsentimiento === "function") {
        mostrarFormularioSiHayConsentimiento();
      }

    }
  });
});


// Espera a que el botón flotante esté en el DOM y le asigna su evento
const esperarBotonCookie = setInterval(() => {
  const boton = document.querySelector(".abrir-config-cookies");
  const modal = document.getElementById("cookie-config-modal");

  if (boton && modal) {
    boton.addEventListener("click", () => {
      modal.classList.remove("oculto");
    });
    clearInterval(esperarBotonCookie);
  }
}, 200);







// ✅ ACTIVACIÓN DE GOOGLE ANALYTICS SOLO SI HAY CONSENTIMIENTO DE MARKETING
function activarGoogleAnalyticsSiProcede() {
  const consentimiento = localStorage.getItem("cookies_accepted");

  if (consentimiento === "all") {
    inyectarGA();
  } else if (consentimiento === "custom") {
    try {
      const config = JSON.parse(localStorage.getItem("cookies_custom"));
      if (config.marketing) {
        inyectarGA();
      }
    } catch (error) {
      console.error("Error leyendo configuración personalizada de cookies:", error);
    }
  }
}

// ✅ INYECTAR GA DINÁMICAMENTE (EDITAR EL ID CUANDO SE PUBLIQUE)
function inyectarGA() {
  const scriptTag = document.createElement("script");
  scriptTag.async = true;
  scriptTag.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"; // ← REEMPLAZAR ESTE ID CUANDO PUBLIQUES

  const inlineScript = document.createElement("script");
  inlineScript.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX'); // ← REEMPLAZAR ESTE ID TAMBIÉN
  `;

  document.head.appendChild(scriptTag);
  document.head.appendChild(inlineScript);
}

