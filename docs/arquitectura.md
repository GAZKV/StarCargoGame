# Arquitectura prevista

**Estado: separación aplicada parcialmente.** Three.js presenta el vuelo en `/`; `/phaser-fallback.html` conserva Phaser. `src/domain` contiene reglas compartidas independientes del renderizador. Un sistema, dos planetas visuales y seis estaciones son el alcance aprobado. Persistencia y servidor no forman parte de esta implementación. El recorrido local se verificó manualmente, pero no la calidad visual exhaustiva de planetas ni accesibilidad exhaustiva; ver [primer incremento](primer-incremento.md) y [evolución isométrica y 3D](arquitectura-isometrica-3d.md).

## Límites entre capas

- **Presentación:** Three.js renderiza el vuelo y su interfaz; Phaser se conserva como fallback. Ningún renderizador debe determinar reglas, precios ni inventarios.
- **Dominio:** lógica TypeScript en `src/domain`, independiente del motor, como fuente compartida de reglas. Las pruebas automatizadas cubren el dominio; los detalles implementados y su cobertura se describen en [primer incremento](primer-incremento.md).
- **Persistencia local:** pendiente de definir. No presumir formato de guardado ni introducir un servidor antes de acordarlo.
- **Datos de contenido:** lugares, bienes, naves y contratos; sus catálogos concretos siguen abiertos. Una ubicación posee sus mercados, mientras el sistema agrupa destinos y rutas (propuesta en el README).

En el futuro multijugador podrían reutilizarse reglas de dominio tras definir autoridad y sincronización. Esto **no** autoriza a construir servicios de red ahora.

## Regla de integración

Antes de dividir una tarea entre frontend y dominio, acordar interfaces, responsables de archivos y criterios de aceptación. Verificar el ciclo completo desde una acción del piloto hasta los cambios de carga, existencias y recompensa. Detalles económicos y reglas del juego: [README.md](../README.md); decisiones pendientes: [decisiones.md](decisiones.md).
