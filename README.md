# Portfolio de Belén Segales

Portfolio personal con funcionalidades dinámicas implementadas en JavaScript vanilla.

## Características Implementadas

### 1. Carga Dinámica de Habilidades ✅

- Las habilidades se cargan desde `habilidades.js`
- Cada habilidad incluye nombre, nivel, descripción e icono
- Animaciones de entrada y barras de progreso animadas
- Se ejecuta automáticamente al cargar la página

### 2. Menú con Toggle ✅

- Menú responsive con toggle para dispositivos móviles
- Funcionalidad implementada con JavaScript
- Animaciones suaves de apertura/cierre
- Cierre automático al hacer clic fuera del menú

### 3. Página de Proyectos Separada ✅

- Nueva página `proyectos.html` dedicada
- Proyectos cargados dinámicamente desde `proyectos.js`
- Cada proyecto incluye título, descripción, imagen y tecnologías
- Efectos hover y animaciones de entrada
- Enlace de navegación actualizado en el menú principal

### 4. Mejoras de Interacción ✅

- **Efectos hover**: Todos los proyectos y habilidades tienen efectos hover mejorados
- **Animaciones**: Animaciones sutiles al cargar habilidades y proyectos
- **Formulario mejorado**:
  - Validación en tiempo real de todos los campos
  - Validación de formato de email
  - Mensajes de error dinámicos
  - Envío funcional a través de FormSubmit
  - Estados de carga y confirmación

## Estructura de Archivos

```
├── index.html          # Página principal
├── proyectos.html      # Página de proyectos
├── habilidades.js      # Datos y lógica de habilidades
├── proyectos.js        # Datos y lógica de proyectos
├── app.js             # Funcionalidades principales
├── input.css          # Estilos personalizados
├── output.css         # CSS compilado con Tailwind
└── img/               # Imágenes del proyecto
```

## Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos y animaciones personalizadas
- **JavaScript ES6+** - Funcionalidades interactivas
- **Tailwind CSS** - Framework de CSS utilitario
- **FormSubmit** - Servicio de envío de formularios

## Funcionalidades JavaScript

### MenuHandler

Maneja la funcionalidad del menú móvil con toggle y cierre automático.

### ThemeHandler

Controla el cambio entre tema claro y oscuro.

### FormValidator

Validación completa del formulario de contacto con:

- Validación en tiempo real
- Mensajes de error personalizados
- Envío asíncrono con estados de carga

### ScrollAnimations

Animaciones basadas en scroll e intersección para mejor UX.

## Instalación y Uso

1. Clona o descarga el proyecto
2. Abre `index.html` en tu navegador
3. Para desarrollo con Tailwind: `npx tailwindcss -i input.css -o output.css --watch`

## Personalización

### Agregar nuevas habilidades

Edita el array `habilidades` en `habilidades.js`:

```javascript
{
    nombre: "Nueva Habilidad",
    nivel: 85,
    descripcion: "Descripción de la habilidad",
    icono: "path-del-svg"
}
```

### Agregar nuevos proyectos

Edita el array `proyectos` en `proyectos.js`:

```javascript
{
    titulo: "Nuevo Proyecto",
    descripcion: "Descripción del proyecto",
    imagen: "/img/proyecto.jpg",
    tecnologias: ["React", "Node.js"],
    demo: "https://demo-url.com",
    github: "https://github.com/usuario/repo"
}
```

## Características Responsivas

- Diseño mobile-first
- Menú toggle para dispositivos móviles
- Grid responsive para proyectos y habilidades
- Animaciones optimizadas para diferentes tamaños de pantalla

## Contacto

Para consultas sobre el proyecto, puedes contactar a través del formulario en el sitio web.
