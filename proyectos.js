const proyectos = [
  {
    titulo: "Página One Piece",
    descripcion:
      "Web sobre información del anime One Piece, con detalles de personajes, episodios y noticias.",
    imagen: "/img/TAREA.png",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    demo: "https://www.behance.net/gallery/242489839/One-Piece-Responsive-Web-Design-(Fan-Project)",
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
  {
    titulo: "WindBnB",
    descripcion:
      "Página de búsqueda de alojamientos para reservar, con búsqueda por nombre y cantidad de guests.",
    imagen: "/img/proyecto7.jpg",
    tecnologias: ["React", "JavaScript", "Tailwind"],
    demo: "https://wind-react.vercel.app",
    github: "#",
  },
  {
    titulo: "Snapshot",
    descripcion:
      "Página para buscar imágenes usando API de Pexels, con buscador dinámico que muestra imágenes relacionadas.",
    imagen: "/img/Proyecto8.jpg",
    tecnologias: ["React", "Tailwind"],
    demo: "https://snapshot-app-six.vercel.app",
    github: "#",
  },
  {
    titulo: "RecipeHub",
    descripcion:
      "Página que muestra recetas por categorías, con búsqueda y filtros.",
    imagen: "/img/Proyecto9.jpg",
    tecnologias: ["React", "Tailwind", "JavaScript"],
    demo: "https://api-meal.vercel.app/",
    github: "#",
  },
  {
    titulo: "Klean",
    descripcion: "Recreación de una página de Made with - by Themewagon.",
    imagen: "/img/Proyecto10.jpg",
    tecnologias: ["React", "Tailwind", "JavaScript"],
    demo: "https://tarea3-gamma.vercel.app/",
    github: "#",
  },
  {
    titulo: "AppWeather",
    descripcion:
      "App del clima para ver los climas en diferentes lugares. Uso de API de ipinfo.io.",
    imagen: "/img/Proyecto11.jpg",
    tecnologias: ["React", "Tailwind", "JavaScript"],
    demo: "https://appweather-seven.vercel.app/",
    github: "#",
  },
  {
    titulo: "Delinut",
    descripcion:
      "Software de administración de reservas de pedidos e inventario. Backend Python FastAPI, Frontend React con login y roles de administrador, repartidor, cocinero y clientes.",
    imagen: "/img/Proyecto12.jpg",
    tecnologias: ["React", "Tailwind", "JavaScript", "Next.js", "FastAPI"],
    demo: "https://delinut.vercel.app/",
    github: "#",
  },
  {
    titulo: "Belusauria",
    descripcion:
      "Práctica de página ecommerce con implementación de login y más.",
    imagen: "/img/Proyecto13.jpg",
    tecnologias: ["React", "Tailwind", "JavaScript"],
    demo: "https://belusauria.vercel.app/",
    github: "#",
  },
  {
    titulo: "Casas Comunales - GAMLP",
    descripcion:
      "Sistema de gestión para Casas Comunales del Adulto Mayor en La Paz, que administra talleres, asistencia con geolocalización, roles de usuario y genera reportes PDF desde un dashboard centralizado.",
    imagen: "/img/casas-comunales.jpg",
    tecnologias: ["React", "Next.js", "Tailwind"],
    demo: "https://www.behance.net/gallery/249320331/SISTEMA-CASAS-COMUNALES-GAMLP",
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
          "Next.js":
            "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-200",
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
                
                <div class="flex justify-center items-center">
                    <a
                        href="${proyecto.demo}"
                        target="_blank"
                        class="inline-flex items-center px-6 py-2 bg-[#ff4995] hover:bg-[#e63d85] dark:bg-[#3e61ff] dark:hover:bg-[#2d4de0] text-white text-sm font-medium rounded-lg transition-colors duration-200"
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
