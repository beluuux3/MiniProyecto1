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
        `El campo ${this.getFieldLabel(fieldName)} es requerido`
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
      "dark:bg-green-900/20"
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
      "dark:bg-green-900/20"
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
      "input[required], textarea[required]"
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
        "error"
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
        "success"
      );
      this.form.reset();
      this.clearAllErrors();
    } catch (error) {
      this.showFormMessage(
        "Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.",
        "error"
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
      }
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
        "dark:bg-green-900/20"
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
      }
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
      { threshold: 0.3 }
    );

    observer.observe(skillsSection);
  }
});
