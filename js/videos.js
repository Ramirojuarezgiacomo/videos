/* =========================
   SISTEMA DE TABS
========================= */
function openTab(tabId) {

  const contents = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-btn");

  // tab activa actual
  const activeSection =
    document.querySelector(".tab-content.active");

  // pausar videos de la tab anterior
  if (activeSection) {
    pauseVideosInSection(activeSection);
  }

  // limpiar estados
  contents.forEach(c => c.classList.remove("active"));
  buttons.forEach(b => b.classList.remove("active"));

  // activar nueva tab
  const section = document.getElementById(tabId);
  if (!section) return;

  section.classList.add("active");

  // activar iframes si existieran
  activateIframesInSection(section);

  const button =
    document.querySelector(`[onclick="openTab('${tabId}')"]`);

  if (button) button.classList.add("active");


  /* =========================
     CAMBIAR FONDO
  ========================= */

  document.body.classList.remove(
    "bg-pantalla-azul",
    "bg-suspenso",
    "bg-futurista",
    "bg-kpop",
    "bg-transformice"
  );

  document.body.classList.add("bg-" + tabId);


  /* =========================
     ACTUALIZAR URL
  ========================= */

  window.location.hash = tabId;
}


/* =========================
   TAB INICIAL
========================= */
document.addEventListener("DOMContentLoaded", () => {

  // guardar src original de iframes
  document.querySelectorAll("iframe").forEach(iframe => {
    iframe.dataset.src = iframe.src;
  });

  const hash = window.location.hash.replace("#", "");

  if (hash && document.getElementById(hash)) {
    openTab(hash);
  } else {
    openTab("pantalla-azul");
  }

});


/* =========================
   PAUSAR VIDEOS EN SECCIÓN
========================= */
function pauseVideosInSection(section) {

  const videos = section.querySelectorAll("video");

  videos.forEach(video => {
    video.pause();
    video.currentTime = 0;
  });

}


/* =========================
   ACTIVAR IFRAMES
========================= */
function activateIframesInSection(section) {

  const iframes = section.querySelectorAll("iframe");

  iframes.forEach(iframe => {

    if (!iframe.src && iframe.dataset.src) {
      iframe.src = iframe.dataset.src;
    }

  });

}

/* =========================
   ABRE IMAGENES
========================= */


document.addEventListener("click", (e) => { 
  const img = e.target.closest("img"); 
  if (!img) return;
  
    // ignorar imágenes dentro del robot
  if (img.closest("#regresar")) return;

  window.open(img.src, "_blank"); 
});