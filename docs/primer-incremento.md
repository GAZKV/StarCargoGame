# Primer incremento jugable — contrato local

**Estado: incremento implementado parcialmente; recorrido manual final verificado en navegador.** En `/`, Three.js es presentación principal; `/phaser-fallback.html` conserva Phaser; `src/domain` es la fuente de reglas. Incluye vuelo local y modo único crucero/cuántico: aproximación manual y, desde distancia suficiente, traslado inmediato a zona cercana no atracable y continuación del vuelo/atraque manual. No significa que el sprint esté totalmente cerrado, que los planetas tengan acabado visual validado ni que el juego esté completo.

## Rediseño de la interfaz de vuelo

**Implementado y verificado:** en `/`, el canvas Three.js contiene la nave y un campo estelar procedural. La selección y la información permanecen en el HUD HTML fuera del canvas; el indicador HTML de estación muestra distancia y dirección relativa. El panel de misión mantiene oferta/encargo activo/completado, carga y créditos. El mapa es un `<details>` externo plegable, expone `aria-expanded` y respeta `prefers-reduced-motion` en su animación. El glow es discreto y el selector conserva los seis nombres existentes. No cambió el dominio ni se añadieron reglas, lore o assets.

**Corrección implementada:** tras la optimización, el indicador podía quedar fuera del stage porque su clamp medía `contentRect` y omitía el borde. Ahora la medición con `ResizeObserver` usa el borde completo (`borderBoxSize`, con fallback a `getBoundingClientRect`); no se mide en cada frame.

**Comprobación Playwright 360×812:** al seleccionar Puerto Nadir, los límites del indicador fueron x=192.41..323.99, dentro del stage x=14..331. El texto ocupó una línea (131.58 px) y el documento tuvo `clientWidth=scrollWidth=345`, sin overflow horizontal. Es evidencia de este caso, no cobertura de todos los tamaños/estados.

**Mejora semántica verificada:** el botón de crucero/cuántico expone `aria-pressed` según el modo activo, incluso mientras el control está deshabilitado durante la maniobra; el toggle del mapa expone `aria-expanded`. Esta comprobación puntual no constituye una auditoría exhaustiva de accesibilidad.

### Pase de accesibilidad del cockpit

**Implementado:** los controles tienen etiquetas semánticas y los botones de estado exponen `aria-pressed`; el botón de mapa ofrece `aria-expanded` y `aria-controls`. `#message` y `#station-status` son regiones `polite`; `quantum-state` es texto accesible, pero ya no una región live. Los marcadores del mapa son decorativos (`aria-hidden`) y la posición de la nave también se ofrece en texto. Se corrigieron los símbolos CSS `+`/`−` del disclosure. Al deshabilitar `accept`, `quantum` o `confirm`, y al mostrar el resultado de `deliver`, el foco se transfiere al mensaje correspondiente.

La navegación completa solo con teclado se verificó manualmente en Playwright con teclado real (Tab/Enter): destino Puerto Nadir, aceptar, activar modo, derecha para alinear, esperar estado listo y confirmar salto a staging x=420 (distancia 80); 35 Enter a derecha y 35 a izquierda llevaron a x=503 (distancia 3), seguido de atraque y entrega. El contrato terminó, bodega 0, destino 1, créditos 100 y el foco pasó al mensaje de entrega. El botón del mapa también fue alcanzable por Tab y activado con Enter; quedó `aria-expanded=true`. No se hizo prueba con lector de pantalla; solo se inspeccionó el árbol de accesibilidad.

El muestreo de contraste ejecutado con JavaScript en navegador es **representativo**, no exhaustivo: texto principal sobre el punto más claro del radial 12.35:1; texto de botón 13.47:1; botón seleccionado 13.38:1; texto deshabilitado 9.77:1; borde normal/deshabilitado `#6d8990` contra fondo `#182930` 4.03:1; anillo de foco 9.89:1 contra `#101c21`; texto atenuado 8.96:1; eyebrow 9.47:1 y texto de marcador 13:1. La muestra no prueba todas las combinaciones, niveles de zoom, píxeles ni estados y no acredita conformidad WCAG completa.

Playwright verificó el recorrido completo de teclado descrito arriba. La ruta `/phaser-fallback.html` cargó; no se rediseñó ni se verificó allí el recorrido completo.

Estas comprobaciones no son auditoría exhaustiva de lectores de pantalla, contraste ni rendimiento. No validan acabado visual completo ni alteran el estado general del sprint.

## Ajuste visual de planetas

**Implementado:** `src/main.ts` ajustó únicamente materiales existentes de planetas: tonos ocre y azul más claros, con emisividad sutil diferenciada (`0.35`). No se modificaron geometría, cámara, luces globales, controles ni reglas; no se incorporaron recursos externos. Este cambio de presentación no es una decisión de diseño aprobada ni demuestra que se haya alcanzado legibilidad visual.

**Verificación inicial de este ajuste (anterior a la corrección CSS):** `npm test` pasó (21/21), `npm run build` pasó con advertencias de tamaño de chunks Three.js (~577 kB) y Phaser (~1487 kB), y `git diff --check` pasó. La captura inicial no permitía juzgar la visibilidad de planetas; el resultado visual final tras el diagnóstico se documenta abajo. No se probaron varios estados o encuadres ni daltonización. La inspección de calidad no fue una revisión exhaustiva.

### Diagnóstico de CSS y confirmación visual

**Hallazgo implementado:** al investigar la captura sin objetos 3D, se encontró que `src/style.css` contenía dos secuencias literales `\n` antes del bloque `#system-map`, que invalidaban esas reglas CSS. Se sustituyeron por saltos LF auténticos y se eliminó el bloque `#system-map` duplicado. El intento previo de `lookAt` con `target.x + 70`, por sí solo, no había permitido confirmar éxito.

**Verificación visual final en navegador:** la captura Playwright en `/` muestra claramente el planeta ocre. El minimapa tiene `position: absolute` y mide 230×155 dentro del stage de 1052×620; sus seis estaciones y el marcador de nave quedan dentro de su rectángulo. Ya no aparece como mapa extendido sobre el juego. Para esta captura, el criterio limitado de un planeta reconocible y minimapa confinado se considera cumplido. No se ha comprobado visualmente la nave como objeto 3D; tampoco se han validado un segundo planeta, varios encuadres/viewports ni accesibilidad exhaustiva.

La apariencia anterior resultaba confusa, como observó correctamente el usuario; el hallazgo de CSS y esta captura precisan el diagnóstico sin invalidar esa observación. Tras la corrección CSS, `npm test` pasó (21/21), `npm run build` pasó con advertencias de tamaño de chunks Three.js (~577 kB) y Phaser (~1487 kB), y `git diff --check` pasó. La auditoría de calidad encontró que CSS duplicaba el bloque del mapa; el duplicado ya se eliminó. No hubo regla nueva ni se afirma que el sprint esté cerrado.

### Intento reversible de encuadre

**Cambio implementado:** en `src/main.ts`, el objetivo horizontal de `lookAt` se desplazó a `target.x + 70` como intento reversible de mejorar la visibilidad del planeta 1. No se alteraron posición ni seguimiento de cámara, geometría, reglas de juego ni minimapa. Es un ajuste de presentación, no una decisión aprobada sobre cámara ni una solución visual confirmada.

**Resultado inconcluso:** Playwright abrió `/`, esperó 1 s y capturó el estado inicial. El canvas siguió sin mostrar objetos 3D (ni nave ni planetas), así que el criterio de aceptación visual **no se superó**. HUD y minimapa sí aparecieron. Este resultado no permite atribuir el problema a la cámara: también podría deberse al renderizado o a la captura WebGL y requiere investigación. La ejecución de Playwright reportó además un error externo de Google `asyncdata` (`ERR_NAME_NOT_RESOLVED`); no se determinó que estuviera relacionado con el juego.

**Comprobaciones informadas:** `npm test` pasó (21/21); `npm run build` pasó con warnings de tamaño de chunks de Three.js (~577 kB) y Phaser (~1487 kB); `git diff --check` pasó. Git reportó todos los archivos como no rastreados, por lo que no existe baseline diferencial para atribuir cambios; no hubo commit ni publicación.

## Pruebas de dominio (incremento aprobado)

Las pruebas automatizadas comprueban que `accept`, `move`, `dock` y `deliver` no mutan el estado de entrada (incluidos posición, velocidad y punto de atraque), tanto en rutas exitosas como en rechazos. Esto protege la separación del dominio sin cambiar reglas, controles ni valores del fixture.

## Recorrido disponible

1. En el mercado de origen, aceptar el contrato carga automáticamente una unidad de un bien genérico.
2. Pilotar con movimiento vectorial mediante flechas hasta el segundo mercado.
3. Atraque manual: entrar en radio 24 y no superar velocidad 12.
4. Entregar la carga; el destino recibe una unidad y se conceden 100 créditos. La entrega se procesa una sola vez.

Los valores del bien, cantidad, carga, cambios de stock, recompensa, radio y velocidad son **fixture provisional de prueba**; no constituyen balance ni reglas permanentes. Este fixture de una unidad no modela todavía efectos de la carga sobre el vuelo ni sobre los consumibles. Las cifras de distancias, umbrales, llegada, velocidad y carga del sprint también son fixtures reversibles. Consulta [decisiones](decisiones.md) para las decisiones aprobadas y los detalles pendientes.

### Exploración de interfaz

En navegador en `/`: además del recorrido histórico, el recorrido final completo con teclado real se hizo con Tab/Enter: Puerto Nadir, aceptar, modo, derecha para alinear, esperar `ready`, confirmar salto a staging x=420 (distancia 80), 35 Enter a derecha y 35 a izquierda hasta x=503 (distancia 3), atraque y entrega. Contrato finalizado, bodega 0, destino 1, 100 créditos; el foco pasó al mensaje de entrega. El mapa fue navegable con Tab y Enter y expuso `aria-expanded=true`.

En `/phaser-fallback.html`: se seleccionó Puerto Nadir, se activó el modo y se aplicaron tres clics de empuje derecho hasta `ready`; la segunda confirmación trasladó la nave a posición 421 (80u de staging), sin atraque. **No se probó la entrega completa en el fallback.** El recorrido completo con entrega descrito arriba sí se probó en `/`.

También en `/` se verificaron layout en columna a 360×812 sin recorte horizontal. La inspección del árbol de accesibilidad no sustituye una prueba con lector de pantalla.

## Verificación y ejecución

Comandos ejecutados y verificados en este incremento (incluido el rediseño):

```sh
npm test
npm run build
npm run dev -- --host 127.0.0.1 --port 4174 --strictPort
```

Resultados actuales: `npm test` pasó (21/21); `npm run build` terminó correctamente con advertencias de chunks mayores de 500 kB (Three.js ~576 kB y Phaser ~1487 kB). El recorrido completo de teclado real se verificó manualmente en Playwright como se describe arriba. `git diff --check` queda pendiente de verificación final. No se hizo prueba con lector de pantalla ni se afirma conformidad WCAG completa. No se afirma que `npm install` haya sido ejecutado.

## Fuera de alcance y pendientes

Siguen pendientes comprobar visualmente la nave como objeto 3D, un segundo planeta, varios encuadres/viewports, una prueba con lector de pantalla y benchmark. El pase de contraste reportado es representativo, no exhaustivo. El incremento no implementa persistencia, combustible, viajes intersistema ni controles/perfil definitivos. Los demás aspectos permanecen sujetos al [README](../README.md) y a las preguntas abiertas de [decisiones](decisiones.md). No se afirma que el sprint esté cerrado ni conformidad total WCAG.
