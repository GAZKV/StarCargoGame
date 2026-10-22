# Documentación de StarCargoGame

**Estado:** Three.js presenta el vuelo en `/`, Phaser está disponible en `/phaser-fallback.html` y el dominio es compartido. Playwright verificó la corrección del borde del indicador a 360×812; `npm test` (21/21) y `npm run build` pasaron, con warning de chunks >500 kB. `git diff --check` pendiente. Contraste, lector de pantalla y benchmark siguen pendientes; tampoco hay pruebas manuales desktop recientes más allá de la evidencia histórica. Evidencia y límites: [Primer incremento](primer-incremento.md) y [Evolución isométrica y 3D](arquitectura-isometrica-3d.md). Visión/requisitos: [README](../README.md); decisiones aprobadas/pendientes: [decisiones](decisiones.md).

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
