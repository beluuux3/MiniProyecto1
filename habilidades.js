const habilidades = [
  {
    nombre: "Programas de Ofimática",
    nivel: 90,
    descripcion:
      "Word, Excel, PowerPoint, Google Drive, Google Docs, Google Slides, Dropbox, Meet, Zoom, Microsoft Teams.",
    icono: "M4 4h16v16H4z",
  },
  {
    nombre: "Diseño Gráfico",
    nivel: 85,
    descripcion:
      "Adobe Photoshop, Illustrator, InDesign, Dreamweaver y herramientas online como Canva.",
    icono: "M12 4v16m8-8H4",
  },
  {
    nombre: "Lenguajes de Programación",
    nivel: 80,
    descripcion: "JavaScript, HTML, CSS y Java.",
    icono: "M3 4a1 1 0 011-1h16a1 1 0 011 1v16l-9-4-9 4V4z",
  },
  {
    nombre: "Frameworks y Librerías",
    nivel: 75,
    descripcion: "FastAPI, React, Next.js y Node.js.",
    icono: "M14 10h4v4h-4zM6 10h4v4H6z",
  },
  {
    nombre: "Herramientas de Desarrollo",
    nivel: 88,
    descripcion: "VSCode, Eclipse y GitHub.",
    icono: "M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 7h16M4 12h16",
  },
  {
    nombre: "Redes Sociales y Comunicación",
    nivel: 92,
    descripcion:
      "Gestión de redes sociales y herramientas digitales para difusión de contenidos.",
    icono: "M8 10h8M8 14h8M12 18h0M12 6h0",
  },
  {
    nombre: "Equipos y Producción",
    nivel: 85,
    descripcion:
      "Manejo de PC, impresoras, escáneres, fotocopiadoras y equipos de sublimación y serigrafía.",
    icono:
      "M9 12h6m-3-3v6m-6 4h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    nombre: "Idiomas",
    nivel: 70,
    descripcion: "Inglés básico - intermedio.",
    icono: "M12 4l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z",
  },
];

function generarHabilidadesHTML() {
  const container = document.getElementById("habilidades-container");
  if (!container) return;

  container.innerHTML = "";

  habilidades.forEach((habilidad, index) => {
    const habilidadElement = document.createElement("div");
    habilidadElement.className =
      "habilidad-item group bg-white/70 dark:bg-[#1b1b1b]/70 border-2 border-[#ff3e7e] dark:border-[#3e61ff] rounded-2xl p-5 shadow-lg hover:scale-[1.02] transition-transform opacity-0 translate-y-4";
    habilidadElement.style.animationDelay = `${index * 0.1}s`;

    habilidadElement.innerHTML = `
            <div class="flex items-center gap-3 mb-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-7 h-7 text-[#ff4995] dark:text-[#3e61ff]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="${habilidad.icono}"
                    />
                </svg>
                <h3 class="text-xl font-semibold text-[#9c2858] dark:text-[#5a73ff]">
                    ${habilidad.nombre}
                </h3>
            </div>
            <p class="mb-4 text-gray-700 dark:text-gray-300">${habilidad.descripcion}</p>
            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div class="progress-bar bg-gradient-to-r from-[#ff4995] to-[#ff7ea9] dark:from-[#3e61ff] dark:to-[#5a73ff] h-2.5 rounded-full transition-all duration-1000 ease-out" 
                     style="width: 0%"
                     data-target="${habilidad.nivel}">
                </div>
            </div>
            <div class="mt-2 text-right">
                <span class="text-sm font-bold text-[#9c2858] dark:text-[#5a73ff]">${habilidad.nivel}%</span>
            </div>
        `;

    container.appendChild(habilidadElement);
  });

  setTimeout(() => {
    const habilidadItems = document.querySelectorAll(".habilidad-item");
    habilidadItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("animate-fadeInUp");
        item.classList.remove("opacity-0", "translate-y-4");
      }, index * 100);
    });

    setTimeout(() => {
      const progressBars = document.querySelectorAll(".progress-bar");
      progressBars.forEach((bar) => {
        const targetWidth = bar.getAttribute("data-target");
        bar.style.width = targetWidth + "%";
      });
    }, 500);
  }, 100);
}

document.addEventListener("DOMContentLoaded", generarHabilidadesHTML);
