# Evolución a vista isométrica y modelos 3D

**Estado: Three.js integrado como presentación principal del vuelo del sprint; Phaser se conserva como fallback.** La ruta `/` carga la vista Three.js con seis destinos y `src/domain` sigue siendo el dominio compartido. `/phaser-fallback.html` carga la presentación Phaser. La integración no implica migrar el dominio ni completar la entrega jugable.

## Presentación actual de `/`

**Implementado:** el canvas Three.js contiene la nave y un campo estelar procedural. Selección e información se presentan en HUD HTML externo; el indicador de estación muestra distancia y dirección relativa. El panel de misión conserva oferta/encargo activo/completado, carga y créditos. El mapa está fuera del canvas como `<details>` plegable, con `aria-expanded` y animación que respeta `prefers-reduced-motion`. El glow es discreto y se mantienen los seis nombres existentes. No cambió el dominio y Phaser no fue rediseñado.

**Corrección implementada y verificada en móvil:** tras la optimización, el indicador podía quedar fuera del stage al medir solo `contentRect`. `ResizeObserver` mide ahora el borde completo mediante `borderBoxSize`, con fallback a `getBoundingClientRect`; no se mide cada frame. En Playwright 360×812 con Puerto Nadir, indicador x=192.41..323.99 y stage x=14..331; texto de una línea, 131.58 px; `document.clientWidth=scrollWidth=345`. No es cobertura de todos los tamaños/estados.

### Pase de accesibilidad del cockpit

**Implementado:** controles con etiquetas semánticas y estado `aria-pressed`; el mapa expone `aria-expanded` y `aria-controls`. `#message` y `#station-status` son polite live regions; `quantum-state` es texto accesible, no una región live. Los marcadores del mapa son decorativos (`aria-hidden`) y la posición tiene representación textual. Al deshabilitar `accept`, `quantum` o `confirm`, y al entregar, el foco pasa al mensaje pertinente. Se corrigieron los símbolos CSS `+`/`−` del disclosure.

El muestreo de contraste medido con JavaScript en navegador es representativo: texto principal sobre el radial más claro 12.35:1; texto de botón 13.47:1; botón seleccionado 13.38:1; deshabilitado 9.77:1; borde normal/deshabilitado `#6d8990` vs `#182930` 4.03:1; foco 9.89:1 vs `#101c21`; muted 8.96:1; eyebrow 9.47:1 y marcador 13:1. No prueba todas las combinaciones, zoom, píxeles ni estados y no acredita conformidad WCAG completa.

El flujo completo con teclado real (Tab/Enter) se verificó manualmente en Playwright: destino Puerto Nadir, aceptar, activar modo, orientar con derecha, esperar estado listo, confirmar salto a staging x=420 (distancia 80), 35 Enter derecha y 35 izquierda hasta x=503 (distancia 3), atraque y entrega. Resultado: contrato finalizado, bodega 0, destino 1 y créditos 100; el foco pasa al mensaje de entrega. El botón mapa se alcanzó con Tab y activó con Enter, exponiendo `aria-expanded=true`. No se probó lector de pantalla; solo se inspeccionó el árbol de accesibilidad. El contraste y el rendimiento no se evaluaron exhaustivamente.

## Resultado implementado

- Vuelo local en Three.js y flujo de crucero/cuántico conforme al alcance descrito en [primer incremento](primer-incremento.md) y a las decisiones aprobadas.
- Prueba manual en navegador de `/`: misión aceptada, Puerto Nadir, modo activado, tres clics de empuje derecho hasta `ready`, segunda confirmación y llegada a 80u sin atraque. Después se hicieron 30 empujes a derecha y 30 a izquierda, atraque manual válido y entrega; bodega 0, stock destino 1, 100 créditos y contrato completado.
- Prueba Playwright en `/phaser-fallback.html`: se seleccionó Puerto Nadir, se activó el modo, tres clics de empuje derecho alcanzaron `ready` y la segunda confirmación llevó a posición 421 (80u de staging), sin atraque. **No se probó la entrega completa en el fallback**; el recorrido completo, incluida la entrega, sí se probó en `/`.
- Viewport 360×812 mostró disposición en columna sin recorte horizontal. El recorrido completo de teclado real y la activación del mapa con teclado constan arriba; sigue pendiente probar lector de pantalla. No se afirma conformidad total WCAG. Tampoco es revisión visual exhaustiva de planetas.
- En consola se observó un 404 de favicon; no hubo errores funcionales.
- El recorrido completo de este fixture (aceptar misión → salto inmediato → aproximación y atraque manual → entrega) quedó verificado en navegador, como se detalla arriba. La captura final confirma únicamente un planeta reconocible y minimapa confinado. Siguen pendientes la comprobación visual de la nave como objeto 3D, un segundo planeta, varios encuadres/viewports, la auditoría de accesibilidad (incluidos contraste y lector de pantalla) y el benchmark; tampoco se ha fijado un presupuesto de rendimiento. Los modelos, valores de fixture y detalles visuales no son arte final ni balance definitivo.

### Ajuste de materiales de planetas

**Implementado:** se aclararon los tonos ocre/azul de los materiales existentes y se diferenció sutilmente su emisividad (`0.35`), sin cambiar geometría, cámara, luces globales, controles o reglas ni añadir recursos externos. Es un cambio de presentación, no una decisión aprobada sobre identidad visual, ni evidencia de haber logrado el objetivo visual.

La captura inicial anterior a la corrección CSS no permitía evaluar la visibilidad de los planetas. La comprobación visual final se registra más abajo y solo cubre el criterio limitado indicado. No hay validación en varios estados/encuadres ni con daltonización. Las comprobaciones de calidad no constituyen una revisión exhaustiva.

### Intento reversible de visibilidad del planeta 1

**Implementado:** se cambió en `src/main.ts` el objetivo horizontal de `lookAt` a `target.x + 70`, como intento reversible para mejorar la visibilidad del planeta 1. Posición/seguimiento de cámara, geometría, reglas y minimapa quedaron intactos. No es una decisión aprobada ni confirma una solución de encuadre.

**Resultado: criterio de aceptación NO superado.** En Playwright, la ruta `/` se capturó en el estado inicial tras esperar 1 s. El canvas seguía sin mostrar objetos 3D —ni nave ni planetas—, aunque HUD y minimapa eran visibles. No se puede concluir que la causa sea la cámara; puede estar en el renderizado o en la captura WebGL y necesita investigación. Playwright informó también un error externo Google asyncdata `ERR_NAME_NOT_RESOLVED`, cuya relación con el juego no se determinó.

**Comprobaciones:** `npm test` pasó (21/21), `npm run build` pasó con warnings de chunks Three.js (~577 kB) y Phaser (~1487 kB), y `git diff --check` pasó. Git reportó todos los archivos como no rastreados, sin baseline diferencial; no hubo commit ni publicación.

### Corrección de CSS y captura posterior

La captura inicial sin objetos 3D motivó continuar el diagnóstico; el desplazamiento de `lookAt` a `target.x + 70` no confirmó por sí solo que el problema estuviera resuelto. Después se detectaron en `src/style.css` dos secuencias literales `\n` antes del bloque `#system-map`, que invalidaban sus reglas. Se reemplazaron por LF auténticos y se quitó el bloque `#system-map` duplicado.

En la comprobación final en navegador, la captura Playwright en `/` muestra claramente el planeta ocre. El minimapa computa `position: absolute`, mide 230×155 dentro del stage de 1052×620, y contiene sus seis estaciones y el marcador de nave dentro de su rectángulo; dejó de ser un mapa extendido. Se cumple el criterio limitado de un planeta reconocible y minimapa confinado. No se ha comprobado visualmente la nave como objeto 3D, un segundo planeta ni varios encuadres/viewports; tampoco se han completado accesibilidad/contraste exhaustivos. La apariencia confusa señalada por el usuario fue una observación correcta del estado anterior.

Tras estos cambios, `npm test` pasó (21/21), `npm run build` pasó con advertencias de tamaño de chunks Three.js (~577 kB) y Phaser (~1487 kB), y `git diff --check` pasó. La auditoría de calidad detectó CSS duplicado para el bloque del mapa; el duplicado ya se eliminó. No hubo regla nueva ni se afirma que el sprint esté cerrado.

## Reproducción

Comprobaciones actuales: `npm test` pasó (21/21); `npm run build` terminó correctamente con warning de chunks >500 kB (Three.js ~576 kB, Phaser ~1487 kB). Playwright verificó indicador en 360×812 y recorrido completo de teclado real descrito arriba. `git diff --check` queda pendiente de verificación final.

## Evaluación y límites

La verificación posterior a CSS: `npm test` pasó (21/21), `npm run build` terminó correctamente con advertencias de chunks Three.js (~576 kB) y Phaser (~1487 kB). En consola se observó un 404 de favicon; no hubo errores funcionales. No se hizo benchmark ni evaluación exhaustiva de rendimiento o accesibilidad. El flujo completo de teclado se probó en `/`; no se probó lector de pantalla, ni entrega completa en `/phaser-fallback.html`. La comprobación visual limitada no cubre nave 3D, segundo planeta ni múltiples encuadres/viewports. `git diff --check` está pendiente de verificación final.

La integración actual no valida la dirección visual final ni establece un presupuesto de rendimiento. El recorrido del fixture y el flujo completo de teclado están verificados; siguen pendientes la evaluación visual exhaustiva, prueba con lector de pantalla, benchmark y validación de planetas. Las cifras de contraste son muestras, no auditoría exhaustiva ni certificación WCAG. No se ha decidido reescribir la simulación ni eliminar el fallback. Las decisiones aprobadas y pendientes se mantienen en [decisiones](decisiones.md); los límites entre dominio y presentación, en [arquitectura](arquitectura.md).
