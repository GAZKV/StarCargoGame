# Hoja de ruta: sprint confirmado y alfa jugable integrada

**Estado: alcance del sprint confirmado (2026-10-22), con implementación parcial.** El recorrido de contrato, vuelo, salto inmediato, atraque y entrega se verificó manualmente. No se considera el sprint totalmente cerrado: faltan evaluación visual de planetas y auditoría exhaustiva de accesibilidad. Three.js es presentación principal en `/`, Phaser fallback en `/phaser-fallback.html`; el spike `/spike-3d.html` no es la integración. El [README](../README.md) es fuente de visión/requisitos; [decisiones.md](decisiones.md) registra aprobaciones y pendientes.

## Alcance aprobado del sprint y estado de implementación

- Vista de vuelo Three.js integrada en `/`, Phaser preservada como fallback en `/phaser-fallback.html` y `src/domain` como fuente de reglas (implementación parcial verificada; no acabado visual exhaustivo).
- Todo el sprint en un sistema: dos planetas visuales con tres estaciones alrededor de cada uno (seis estaciones). Solo las estaciones admiten atraque, servicios y misiones.
- Modo único crucero/cuántico: cerca del destino, bajo la distancia mínima, no permite salto y ofrece crucero controlado manualmente, sin autopiloto. A distancia suficiente se mantiene orientación/alineación durante la carga y una segunda confirmación ejecuta un traslado inmediato dentro del sistema a una zona cercana no atracable del destino, bajo el umbral. El vuelo y atraque finales son manuales.
- Intersistemas fuera del sprint; posteriormente mediante estación espacial de salto. Three.js renderiza el vuelo, Phaser queda como fallback y `src/domain` es dominio único. Combustible sin modelar en este sprint.
- Alcance corregido expresamente aprobado por el usuario el 2026-10-22, sustituyendo el alcance anterior de dos sistemas intersistema y la regla de crucero hasta destino.
- Umbral, llegada, velocidad y carga son fixtures reversibles, sin cifras definitivas. Persistencia, estación intersistema y lore definitivo quedan pendientes.

## Objetivo de producto

Una **alfa single player para navegador de escritorio** que permita una sesión continuada: pilotar, conocer lugares por sus trabajos y servicios, progresar por separado en los oficios practicados, ganar créditos y reinvertir en la nave para asumir trabajos distintos. El jugador debe poder terminar un recorrido, guardar su avance, recuperarse de una mala operación y encontrar otra actividad viable. La [dirección jugable aprobada](vision-juego.md) centra la experiencia en piloto, nave y progresión de oficios: no hay juego a pie en esta alfa. Dejar atrás las demos desconectadas no implica implementar todo a la vez.

La dirección visual aprobada son modelos 3D en tiempo real con cámara de aspecto isométrico. La integración Three.js para el vuelo forma parte del sprint confirmado, manteniendo Phaser como fallback; el spike aislado no acredita que la integración esté implementada. No supone migración total; criterios de rendimiento y detalles técnicos aún deben verificarse.

## Entregables de la alfa, no de un solo incremento

1. **Vuelo y mundo desde la nave:** navegación manual con inercia en un sistema; crucero/cuántico según el flujo confirmado, atraque manual en seis estaciones y acceso a servicios/misiones solo en ellas. El intersistema mediante estación de salto es posterior.
2. **Economía conectada:** varios mercados y bienes con stock, producción/consumo, contratos posibles y comercio libre; la actividad del jugador y bots legales mueve mercancía existente. Un único modelo económico para todos los roles.
3. **Cinco oficios jugables desde la nave:** transporte/comercio, minería, combate legal contra NPC, piratería contra NPC y salvamento. Cada uno exige capacidades de nave apropiadas, otorga progreso propio al practicarlo y ofrece al menos una actividad y una misión coherente con el lugar, con ganancias y riesgos verificables. Niveles del oficio desbloquean encargos mejor pagados y acceso a líneas narrativas, según reglas de experiencia aún pendientes.
4. **Nave y progreso:** combustible, munición donde corresponda, daños, desgaste, reparación/mantenimiento, rescate, capacidad de carga con consecuencias operativas, compras/mejoras compatibles y cosméticos sin efectos de juego.
5. **Experiencia completa:** HUD que anticipa ruta, costes y riesgos; textos locales legibles, señales visuales y sonoras accesibles, guardado/carga local, guía inicial, indicadores económicos y una vía para continuar si faltan recursos.
6. **Calidad y entrega:** pruebas de reglas e integración, recorrido manual de cada oficio, validación en navegador de controles/legibilidad/rendimiento y build web reproducible. No atribuir a un build una validación visual no realizada.

El contenido concreto (número de sistemas/mercados, mercancías, naves, misiones, cifras de balance, duración objetivo y umbrales técnicos) es **propuesta para dimensionar con el usuario**, no requisito aprobado por este documento. Multijugador, servidor y operaciones en vivo quedan fuera de esta alfa salvo decisión expresa.

## Orden sugerido de incrementos integrados

| Bloque | Resultado jugable que debe quedar al terminar |
| --- | --- |
| 1. Base visual y de vuelo | Una entrega real con el dominio actual y presentación Three.js integrada para el vuelo; pilotaje y atraque manual verificables, sin duplicar simulaciones. La demo Phaser queda como fallback. |
| 2. Viaje y economía | Conectar destinos mediante saltos, mercados y rutas; comercio libre, contratos, producción/consumo y bots legales conservan existencias. |
| 3. Diversificación | Minería y salvamento suministran la economía; combate legal y piratería tienen encuentros limitados y consecuencias, sin obligar a combatir a un transportista. |
| 4. Progreso y continuidad | Niveles independientes por oficio, desbloqueo de misiones y recompensas narrativas; naves, módulos, servicios, consumibles y guardado sin perder progreso del piloto al cambiar de casco. Se puede recuperar una partida bloqueada. |
| 5. Ajuste y alfa | Balance de ingresos netos, tiempo de primera mejora, accesibilidad, estabilidad y documentación de instalación/limitaciones; recorrido manual y automatizado registrado. |

Son bloques de planificación, no autorizaciones para implementar todos sus puntos juntos. Cada bloque se divide en tareas menores con criterios de aceptación confirmados antes de cambiar código. La primera entrega local existente sigue siendo válida como referencia para regresiones hasta que su sustituta funcione.

## Propuestas posteriores y pendientes de la alfa

- ¿Qué presupuesto de calendario o esfuerzo limita la alfa completa? Sin esa restricción, no fijar cifras de contenido ni fechas.
- ¿Qué presupuesto de calendario o esfuerzo limita la primera alfa? Sin esa restricción, no fijar cifras de contenido ni fechas.
