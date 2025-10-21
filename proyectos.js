const proyectos = [
  {
    titulo: "Página One Piece",
    descripcion:
      "Web sobre información del anime One Piece, con detalles de personajes, episodios y noticias.",
    imagen: "/img/TAREA.png",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    demo: "#",
    github: "#",
  },
  {
    titulo: "PRESENTACIÓN - PRACT 1 - FUNVAL",
    descripcion:
      "Aprendiendo lo básico de html y css. Primera práctica de Funval.",
    imagen: "/img/TAREA 1.png",
    tecnologias: ["HTML", "CSS"],
    demo: "https://beluuux3.github.io/tareas-funval/practica-1/index.html",
    github: "#",
  },
  {
    titulo: "FORMULARIO - PRACT 2 - FUNVAL",
    descripcion:
      "Recreación de formulario de EpicGames con botones funcionales.",
    imagen: "/img/TAREA 2.png",
    tecnologias: ["HTML", "CSS"],
    demo: "https://beluuux3.github.io/tareas-funval/practica-2/index.html",
    github: "#",
  },
  {
    titulo: "MANEJO FLEX DISPLAY - PRACT 3 - FUNVAL",
    descripcion:
      "Elaboración de página web para una One piece. Uso de Flex, display.",
    imagen: "/img/TAREA 3.png",
    tecnologias: ["HTML", "CSS"],
    demo: "https://beluuux3.github.io/tareas-funval/practica-3/index.html",
    github: "#",
  },
  {
    titulo: "CHALLENGE TIC TAC TOE - PRACT 4 - FUNVAL",
    descripcion:
      "Elaboración de challenge Tic Tac Toe. Responsive web con uso de Grid y Flex.",
    imagen: "/img/TAREA 4.png",
    tecnologias: ["HTML", "Tailwind"],
    demo: "https://beluuux3.github.io/tareas-funval/practica-3/index.html",
    github: "#",
  },
  {
    titulo: "Sistema de Control Académico - UMAM",
    descripcion:
      "Plataforma web para la gestión académica de la Universidad Municipal del Adulto Mayor, con módulos de inscripción, calificaciones y certificados.",
    imagen: "/img/umam.png",
    tecnologias: ["React", "Tailwind", "FastAPI"],
    demo: "https://proyecto-belen-umam.vercel.app/login",
    github: "#",
  },
];

function generarProyectosHTML() {
  const container = document.getElementById("proyectos-container");
  if (!container) return;

  container.innerHTML = "";

  proyectos.forEach((proyecto, index) => {
    const proyectoElement = document.createElement("div");
    proyectoElement.className =
      "proyecto-card bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 opacity-0 translate-y-8";
    proyectoElement.style.animationDelay = `${index * 0.15}s`;

    const tecnologiasHTML = proyecto.tecnologias
      .map((tech) => {
        const colorClasses = {
          HTML: "bg-orange-100 text-orange-600 dark:bg-orange-800/40 dark:text-orange-300",
          CSS: "bg-purple-100 text-purple-600 dark:bg-purple-800/40 dark:text-purple-300",
          JavaScript:
            "bg-yellow-100 text-yellow-600 dark:bg-yellow-800/40 dark:text-yellow-300",
          React:
            "bg-blue-100 text-blue-600 dark:bg-blue-800/40 dark:text-blue-300",
          "Vue.js":
            "bg-green-100 text-green-600 dark:bg-green-800/40 dark:text-green-300",
          "Node.js":
            "bg-green-100 text-green-700 dark:bg-green-800/40 dark:text-green-300",
          Tailwind:
            "bg-cyan-100 text-cyan-600 dark:bg-cyan-800/40 dark:text-cyan-300",
          FastAPI:
            "bg-emerald-100 text-emerald-600 dark:bg-emerald-800/40 dark:text-emerald-300",
          MongoDB:
            "bg-green-100 text-green-700 dark:bg-green-800/40 dark:text-green-300",
          Firebase:
            "bg-amber-100 text-amber-600 dark:bg-amber-800/40 dark:text-amber-300",
          CSS3: "bg-indigo-100 text-indigo-600 dark:bg-indigo-800/40 dark:text-indigo-300",
          "Three.js": "bg-black text-white dark:bg-gray-700 dark:text-gray-200",
          GSAP: "bg-pink-100 text-pink-600 dark:bg-pink-800/40 dark:text-pink-300",
        };

        const colorClass =
          colorClasses[tech] ||
          "bg-gray-100 text-gray-600 dark:bg-gray-800/40 dark:text-gray-300";

        return `<span class="px-3 py-1 text-xs font-semibold rounded-full ${colorClass}">${tech}</span>`;
      })
      .join("");

    proyectoElement.innerHTML = `
            <div class="relative overflow-hidden">
                <img
                    src="${proyecto.imagen}"
                    alt="${proyecto.titulo}"
                    class="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    onerror="this.src='/img/placeholder-project.jpg'"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div class="p-6">
                <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2">
                    ${proyecto.titulo}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    ${proyecto.descripcion}
                </p>
                
                <div class="flex flex-wrap gap-2 mb-6">
                    ${tecnologiasHTML}
                </div>
                
                <div class="flex justify-between items-center">
                    <a
                        href="${proyecto.demo}"
                        target="_blank"
                        class="inline-flex items-center px-4 py-2 bg-[#ff4995] hover:bg-[#e63d85] dark:bg-[#3e61ff] dark:hover:bg-[#2d4de0] text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                        Ver Demo
                    </a>
                    
                    <a
                        href="${proyecto.github}"
                        target="_blank"
                        class="inline-flex items-center px-4 py-2 border-2 border-[#ff4995] dark:border-[#3e61ff] text-[#ff4995] dark:text-[#3e61ff] hover:bg-[#ff4995] hover:text-white dark:hover:bg-[#3e61ff] dark:hover:text-white text-sm font-medium rounded-lg transition-all duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                    </a>
                </div>
            </div>
        `;

    container.appendChild(proyectoElement);
  });

  setTimeout(() => {
    const proyectoCards = document.querySelectorAll(".proyecto-card");
    proyectoCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("animate-fadeInUp");
        card.classList.remove("opacity-0", "translate-y-8");
      }, index * 150);
    });
  }, 100);
}

document.addEventListener("DOMContentLoaded", generarProyectosHTML);
