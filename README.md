# AirPatagonia - Sistema de Gestión de Vuelos

Aplicación web para la gestión de vuelos, tripulaciones y asignación de personal en aerolíneas. Esta plataforma permite a los administradores gestionar vuelos, asignar tripulaciones y supervisar las operaciones de vuelo de manera eficiente.

## Características Principales

- Gestión completa de vuelos (creación, edición, eliminación)
- Asignación de tripulaciones a vuelos
- Gestión de empleados y sus roles
- Visualización de vuelos programados
- Interfaz intuitiva y responsiva

## Tecnologías Utilizadas

- **Frontend:**
  - Angular 19
  - TypeScript
  - HTML5 / CSS3
  - RxJS para manejo de estados asíncronos
  - Angular Material para componentes de UI

- **Herramientas de Desarrollo:**
  - Angular CLI
  - Node.js / npm
  - Git para control de versiones

## Instalación y Configuración

### Requisitos Previos

- Node.js (v18 o superior)
- npm (v9 o superior) o yarn
- Angular CLI (v19 o superior)

### Instalación

1. Clonar el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd air_patagonia-web
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   Crear un archivo `environment.ts` en `src/environments/` con la configuración necesaria.

## Iniciar la Aplicación

Para iniciar el servidor de desarrollo:

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

## Estructura del Proyecto

```
src/
├── app/
│   ├── core/           # Servicios, guards, interceptores
│   ├── shared/         # Componentes y módulos compartidos
│   ├── features/       # Módulos de características
│   └── app.module.ts   # Módulo principal
└── assets/             # Archivos estáticos
```

## Comandos Útiles

- **Generar un nuevo componente:**
  ```bash
  ng generate component nombre-componente
  ```

- **Construir para producción:**
  ```bash
  ng build --configuration production
  ```

- **Ejecutar pruebas unitarias:**
  ```bash
  ng test
  ```

- **Ejecutar pruebas e2e:**
  ```bash
  ng e2e
  ```

## Contribución

Las contribuciones son bienvenidas. Por favor, lee nuestras [guías de contribución](CONTRIBUTING.md) antes de enviar un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.

---

Desarrollado por [Tu Nombre o Equipo] - 2025eds.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
