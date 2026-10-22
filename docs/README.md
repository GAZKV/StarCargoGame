# Documentación de StarCargoGame

**Estado implementado:** Three.js presenta el vuelo en `/`, Phaser está disponible en `/phaser-fallback.html` y el dominio es compartido. El flujo completo con teclado real (Tab/Enter) se verificó manualmente en Playwright; el foco llega al mensaje tras la entrega. No se hizo prueba con lector de pantalla; solo inspección del árbol de accesibilidad. El contraste se midió en una muestra representativa y no acredita conformidad WCAG completa. `npm test` pasó (21/21), `npm run build` pasó con advertencias de chunks grandes y `git diff --check` se ejecutó sin errores en la verificación final. Permanecen pendientes una evaluación completa de contraste, pruebas con lector de pantalla y evaluación de rendimiento. Evidencia, detalles y límites: [Primer incremento](primer-incremento.md) y [Evolución isométrica y 3D](arquitectura-isometrica-3d.md). Visión/requisitos: [README](../README.md); decisiones aprobadas/pendientes: [decisiones](decisiones.md).

| Documento | Para qué sirve |
| --- | --- |
| [Visión y alcance](../README.md) | Requisitos y propuestas del juego; fuente principal de diseño. |
| [Idea central del juego](vision-juego.md) | Dirección jugable aprobada: piloto, nave y oficios; exploración a pie posterior. |
| [Decisiones](decisiones.md) | Definiciones acordadas y preguntas abiertas. |
| [Identidad visual y de marca](identidad-visual.md) | Estado de la dirección de marca, alcance de una identidad completa y propuestas/preguntas todavía abiertas. |
| [Arquitectura](arquitectura.md) | Separación entre presentación Three.js, fallback Phaser y dominio. |
| [Evolución isométrica y 3D](arquitectura-isometrica-3d.md) | Integración, verificación manual y límites visuales/técnicos. |
| [Equipo y responsabilidades](equipo.md) | Roles del juego, agentes disponibles y funciones reservadas para etapas posteriores. |
| [Guía de escritura narrativa](guia-narrativa.md) | Criterios para lore y misiones concretos, legibles y sin relleno formularizado. |
| [Hoja de ruta para la alfa](hoja-de-ruta-alfa.md) | Propuesta de producto jugable integrado y orden de incrementos; pendiente de aprobación. |
| [Primer incremento](primer-incremento.md) | Estado real, recorrido, fixture provisional y comandos verificados. |
| [Colaboración](desarrollo.md) | Flujo de trabajo, Git y documentación de cambios. |
| [Estructura del repositorio](estructura.md) | Ubicación de archivos actuales y carpetas previstas. |

Para propuestas o errores, utiliza las plantillas de `.github/`. Confirma criterios con el usuario antes de implementar y registra las decisiones aprobadas en [decisiones.md](decisiones.md); los valores de fixture no son reglas permanentes.
