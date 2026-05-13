class MenuHandler {
  constructor() {
    this.menuToggle = document.querySelector("#menu-toggle");
    this.mobileMenu = document.querySelector("#mobile-menu");
    this.menu = document.querySelector(".menu");
    this.init();
  }

  init() {
    this.menuToggle?.addEventListener("click", () => this.toggleMenu());
    document.addEventListener("click", (e) => this.handleClickOutside(e));
  }

  toggleMenu() {
    this.mobileMenu?.classList.toggle("-translate-y-full");
    this.mobileMenu?.classList.toggle("translate-y-0");
  }

  handleClickOutside(event) {
    if (
      this.mobileMenu &&
      !this.menuToggle?.contains(event.target) &&
      !this.mobileMenu.contains(event.target)
    ) {
      this.mobileMenu.classList.add("-translate-y-full");
      this.mobileMenu.classList.remove("translate-y-0");
    }
  }
}

class ThemeHandler {
  constructor() {
    this.themeToggle = document.querySelector("#btn-dark");
    this.todoElement = document.querySelector("#todo");
    this.init();
  }

  init() {
    this.themeToggle?.addEventListener("click", () => this.toggleTheme());
  }

  toggleTheme() {
    this.todoElement?.classList.toggle("dark");
  }
}

class FormValidator {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    this.init();
  }

  init() {
    this.form?.addEventListener("submit", (e) => this.handleSubmit(e));
    this.addRealTimeValidation();
  }

  addRealTimeValidation() {
    const inputs = this.form?.querySelectorAll("input, textarea");
    inputs?.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input));
      input.addEventListener("input", () => this.clearError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;

    this.clearError(field);

    if (!value) {
      this.showError(
        field,
        `El campo ${this.getFieldLabel(fieldName)} es requerido`,
      );
      return false;
    }

    if (fieldName === "email" && !this.isValidEmail(value)) {
      this.showError(field, "Ingresa un email válido");
      return false;
    }

    if (fieldName === "name" && value.length < 2) {
      this.showError(field, "El nombre debe tener al menos 2 caracteres");
      return false;
    }

    if (fieldName === "message" && value.length < 10) {
      this.showError(field, "El mensaje debe tener al menos 10 caracteres");
      return false;
    }

    this.showSuccess(field);
    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getFieldLabel(fieldName) {
    const labels = {
      name: "nombre",
      email: "email",
      message: "mensaje",
    };
    return labels[fieldName] || fieldName;
  }

  showError(field, message) {
    field.classList.add("border-red-500", "bg-red-50", "dark:bg-red-900/20");
    field.classList.remove(
      "border-green-500",
      "bg-green-50",
      "dark:bg-green-900/20",
    );

    let errorDiv = field.parentNode.querySelector(".error-message");
    if (!errorDiv) {
      errorDiv = document.createElement("div");
      errorDiv.className =
        "error-message text-red-500 text-sm mt-1 font-medium";
      field.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
  }

  showSuccess(field) {
    field.classList.add(
      "border-green-500",
      "bg-green-50",
      "dark:bg-green-900/20",
    );
    field.classList.remove("border-red-500", "bg-red-50", "dark:bg-red-900/20");
    this.clearError(field);
  }

  clearError(field) {
    field.classList.remove("border-red-500", "bg-red-50", "dark:bg-red-900/20");
    const errorDiv = field.parentNode.querySelector(".error-message");
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  validateForm() {
    const fields = this.form.querySelectorAll(
      "input[required], textarea[required]",
    );
    let isValid = true;

    fields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      this.showFormMessage(
        "Por favor, corrige los errores antes de enviar",
        "error",
      );
      return;
    }

    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando...
        `;

    try {
      await this.submitForm();
      this.showFormMessage(
        "¡Mensaje enviado correctamente! Te contactaré pronto.",
        "success",
      );
      this.form.reset();
      this.clearAllErrors();
    } catch (error) {
      this.showFormMessage(
        "Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.",
        "error",
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }

  async submitForm() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    const response = await fetch(
      "https://formsubmit.co/54d861e4fba2acc58aa8f89cf3ed35fd",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          _subject: "Nuevo mensaje desde tu portafolio",
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Error en el envío");
    }

    return response;
  }

  showFormMessage(message, type) {
    let messageDiv = this.form.querySelector(".form-message");
    if (!messageDiv) {
      messageDiv = document.createElement("div");
      messageDiv.className = "form-message mt-4 p-4 rounded-lg font-medium";
      this.form.appendChild(messageDiv);
    }

    messageDiv.className = `form-message mt-4 p-4 rounded-lg font-medium ${
      type === "success"
        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200"
        : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200"
    }`;

    messageDiv.textContent = message;

    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }

  clearAllErrors() {
    const errorDivs = this.form.querySelectorAll(".error-message");
    errorDivs.forEach((div) => div.remove());

    const fields = this.form.querySelectorAll("input, textarea");
    fields.forEach((field) => {
      field.classList.remove(
        "border-red-500",
        "bg-red-50",
        "dark:bg-red-900/20",
        "border-green-500",
        "bg-green-50",
        "dark:bg-green-900/20",
      );
    });
  }
}

class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupSmoothScrolling();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => {
      el.classList.add("opacity-0");
      observer.observe(el);
    });
  }

  setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  new MenuHandler();
  new ThemeHandler();
  new FormValidator("form");
  new ScrollAnimations();

  const skillsSection = document.querySelector("#skills");
  if (skillsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              const progressBars = document.querySelectorAll(".progress-bar");
              progressBars.forEach((bar) => {
                const targetWidth = bar.getAttribute("data-target");
                if (targetWidth) {
                  bar.style.width = targetWidth + "%";
                }
              });
            }, 500);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(skillsSection);
  }

  // Generar proyectos dinámicamente
  generarProyectosHTML();
});

// Datos de proyectos
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
    titulo: "Casas Comunales - GAMLP",
    descripcion:
      "Sistema de gestión para Casas Comunales del Adulto Mayor en La Paz, que administra talleres, asistencia con geolocalización, roles de usuario y genera reportes PDF desde un dashboard centralizado.",
    imagen: "/img/casas-comunales.jpg",
    tecnologias: ["React", "Next.js", "Tailwind"],
    demo: "https://www.behance.net/gallery/249320331/SISTEMA-CASAS-COMUNALES-GAMLP",
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
    imagen: "/img/proyecto8.jpg",
    tecnologias: ["React", "Tailwind"],
    demo: "https://snapshot-app-six.vercel.app",
    github: "#",
  },
  {
    titulo: "RecipeHub",
    descripcion:
      "Página que muestra recetas por categorías, con búsqueda y filtros.",
    imagen: "/img/proyecto9.png",
    tecnologias: ["React", "Tailwind", "JavaScript"],
    demo: "https://api-meal.vercel.app/",
    github: "#",
  },
  {
    titulo: "Klean",
    descripcion: "Recreación de una página de Made with - by Themewagon.",
    imagen: "/img/proyecto10.png",
    tecnologias: ["React", "Tailwind", "JavaScript"],
    demo: "https://tarea3-gamma.vercel.app/",
    github: "#",
  },
  {
    titulo: "AppWeather",
    descripcion:
      "App del clima para ver los climas en diferentes lugares. Uso de API de ipinfo.io.",
    imagen: "/img/proyecto11.png",
    tecnologias: ["React", "Tailwind", "JavaScript"],
    demo: "https://appweather-seven.vercel.app/",
    github: "#",
  },
  {
    titulo: "Delinut",
    descripcion:
      "Software de administración de reservas de pedidos e inventario. Backend Python FastAPI, Frontend React con login y roles de administrador, repartidor, cocinero y clientes.",
    imagen: "/img/proyecto12.png",
    tecnologias: ["React", "Tailwind", "JavaScript", "Next.js", "FastAPI"],
    demo: "https://delinut.vercel.app/",
    github: "#",
  },
  {
    titulo: "Belusauria",
    descripcion:
      "Práctica de página ecommerce con implementación de login y más.",
    imagen: "/img/proyecto13.png",
    tecnologias: ["React", "Tailwind", "JavaScript"],
    demo: "https://belusauria.vercel.app/",
    github: "#",
  },
];

function generarProyectosHTML() {
  const container = document.getElementById("proyectos-container");
  if (!container) return;

  container.innerHTML = "";

  // Mostrar solo los primeros 6 proyectos en el index
  const proyectosMostrar = proyectos.slice(0, 6);

  proyectosMostrar.forEach((proyecto, index) => {
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

// Función para manejar el carrusel de proyectos
function initCarousel() {
  const container = document.getElementById("proyectos-container");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const pagination = document.getElementById("carousel-pagination");

  if (!container || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  let autoplayInterval = null;
  const autoplaySpeed = 3000; // 3 segundos

  function getCardsToShow() {
    const width = window.innerWidth;
    if (width < 768) return 1; // móvil: 1 card
    if (width < 1024) return 2; // tablet: 2 cards
    return 3; // desktop: 3 cards
  }

  function createPagination() {
    if (!pagination) return;

    const cardsToShow = getCardsToShow();
    const totalPages = Math.max(1, container.children.length - cardsToShow + 1);
    pagination.innerHTML = "";

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("button");
      dot.className =
        "w-3 h-3 rounded-full transition-all duration-300 hover:scale-125";
      dot.style.backgroundColor = i === currentIndex ? "#ff4995" : "#d1d5db";
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateCarousel();
        resetAutoplay();
      });
      pagination.appendChild(dot);
    }
  }

  function updatePagination() {
    if (!pagination) return;

    const dots = pagination.children;
    Array.from(dots).forEach((dot, index) => {
      dot.style.backgroundColor =
        index === currentIndex ? "#ff4995" : "#d1d5db";
      dot.style.transform = index === currentIndex ? "scale(1.2)" : "scale(1)";
    });
  }

  function updateCarousel() {
    const cardsToShow = getCardsToShow();
    const cardWidth = container.children[0]?.offsetWidth || 350;
    const gap = 32; // gap de 8 en Tailwind (8 * 4px = 32px)
    const offset = currentIndex * (cardWidth + gap);
    container.style.transform = `translateX(-${offset}px)`;

    // Aplicar efecto 3D a las cards
    const cards = container.children;
    const centerIndex = currentIndex + Math.floor(cardsToShow / 2);

    Array.from(cards).forEach((card, index) => {
      const distance = index - centerIndex;
      const isVisible =
        index >= currentIndex && index < currentIndex + cardsToShow;

      if (isVisible) {
        if (distance === 0) {
          // Card central - sin rotación, más grande, más elevada
          card.style.transform = "rotateY(0deg) scale(1.05) translateZ(50px)";
          card.style.opacity = "1";
          card.style.zIndex = "10";
        } else if (distance < 0) {
          // Cards a la izquierda - rotar a la derecha
          card.style.transform = `rotateY(${distance * 8}deg) scale(0.9) translateZ(0px)`;
          card.style.opacity = "0.7";
          card.style.zIndex = "5";
        } else {
          // Cards a la derecha - rotar a la izquierda
          card.style.transform = `rotateY(${distance * 8}deg) scale(0.9) translateZ(0px)`;
          card.style.opacity = "0.7";
          card.style.zIndex = "5";
        }
      } else {
        card.style.opacity = "0";
      }

      card.style.transition = "all 0.5s ease-in-out";
    });

    // Actualizar estado de los botones
    prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
    prevBtn.style.pointerEvents = currentIndex === 0 ? "none" : "auto";

    const maxIndex = Math.max(0, container.children.length - cardsToShow);
    nextBtn.style.opacity = currentIndex >= maxIndex ? "0.5" : "1";
    nextBtn.style.pointerEvents = currentIndex >= maxIndex ? "none" : "auto";

    updatePagination();
  }

  function nextSlide() {
    const cardsToShow = getCardsToShow();
    const maxIndex = Math.max(0, container.children.length - cardsToShow);
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop back to start
    }
    updateCarousel();
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, autoplaySpeed);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
      resetAutoplay();
    }
  });

  nextBtn.addEventListener("click", () => {
    const cardsToShow = getCardsToShow();
    const maxIndex = Math.max(0, container.children.length - cardsToShow);
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
      resetAutoplay();
    }
  });

  // Pausar autoplay al hover
  const carouselSection = container.closest("section");
  if (carouselSection) {
    carouselSection.addEventListener("mouseenter", stopAutoplay);
    carouselSection.addEventListener("mouseleave", startAutoplay);
  }

  // Inicializar
  setTimeout(() => {
    createPagination();
    updateCarousel();
    startAutoplay();
  }, 200);

  // Actualizar al redimensionar
  window.addEventListener("resize", () => {
    currentIndex = 0;
    createPagination();
    updateCarousel();
  });
}
