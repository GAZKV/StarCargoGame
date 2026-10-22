# Decisiones de desarrollo

Estado: demo local parcialmente implementada y recorrido completo verificado manualmente en navegador; esto no cierra la evaluación visual de planetas ni la auditoría exhaustiva de accesibilidad. Three.js es la presentación principal en `/`; Phaser está en `/phaser-fallback.html`. Las decisiones de fixture son temporales y no fijan balance ni reglas permanentes. Evidencia: [primer incremento](primer-incremento.md).

## Aprobadas para el primer prototipo (2026-10-21)

- **Objetivo:** navegación y entregas entre mercados, en single player.
- **Plataforma inicial:** navegador web de escritorio. No se exige instalación al jugador; el soporte móvil y el multijugador quedan para fases posteriores.
- **Decisión histórica del primer prototipo:** Phaser 3 (renderizado 2D), TypeScript y Vite. La decisión visual posterior aprobó modelos 3D en tiempo real; el alcance del sprint integró Three.js como presentación principal de vuelo y conservó Phaser como fallback. La demo Phaser está en `/phaser-fallback.html`; no se invalida la aprobación de plataforma web ni el dominio independiente del renderizador.
- **Arquitectura de partida:** simulación de mercados, inventarios, contratos y rutas en módulos TypeScript independientes de Phaser, para poder probarlos sin renderizado y adaptar la sincronización en una etapa multijugador futura. No implementar servidor todavía.
- **Vuelo y salto (regla anterior, reemplazada para el sprint):** se había previsto piloto automático en desplazamientos largos y aterrizaje automático con mejora. La aprobación específica del sprint del 2026-10-22 reemplaza esa regla para su alcance: vuelo y atraque manuales, sin autopiloto de crucero cercano. La regla anterior no debe tomarse como alcance vigente del sprint.
- **Vuelo — inercia continua (decisión aprobada):** la nave conserva su velocidad al soltar la aceleración, a cualquier velocidad. No hay un umbral que apague la inercia ni estabilización o frenado automáticos a baja velocidad. Para frenar, el jugador aplica empuje en sentido contrario; a mayor velocidad, la misma maniobra requiere más tiempo y distancia. El efecto se percibe más a velocidades altas, pero la inercia no desaparece a velocidades bajas. Es una inspiración newtoniana para la regla de pilotaje, no un requisito de simulación astrofísica completa. Empuje, masa, aceleración/frenado, cualquier límite de velocidad y controles son parámetros provisionales por calibrar; el modelo no está completamente balanceado.
- **Controles iniciales propuestos:** ratón para mapa, mercados y contratos; teclado para navegación y orientación. Validar en una prueba jugable antes de fijar las teclas y el comportamiento preciso.
- **Aterrizaje manual (primer prototipo):** acercarse al puerto, reducir la velocidad y permanecer dentro de una zona de atraque para poder aterrizar. Orientación y tolerancias son parámetros de prueba.
- **Alcance aprobado del primer incremento (histórico):** demo de contrato local entre dos mercados, movimiento, atraque manual y entrega, sin salto. El alcance posterior aprobado amplió el sprint al modo inmediato dentro del sistema; el estado probado está en [primer incremento](primer-incremento.md).
- **Fixture provisional de prueba (no balance ni regla permanente):** un bien genérico, cantidad 1, carga automática al aceptar, stock de origen −1 al aceptar y stock de destino +1 al entregar, recompensa de 100 créditos. Parámetros de prueba del atraque: radio 24 y velocidad máxima 12. Movimiento con flechas en vectorial. No fijan controles ni perfil finales.
- **Capacidad de carga y contratos (decisión aprobada, alto nivel):** cada nave tendrá capacidad de carga disponible; los contratos establecerán un requisito de capacidad disponible que la nave elegida debe cumplir para poder realizarlos. La capacidad de carga no es el tamaño físico del casco ni de las piezas (categorías y tamaños 1–8 del README). La carga transportada afectará al control/manejo y a la velocidad de la nave, y tendrá consecuencias en la gestión de consumibles. No se han aprobado fórmulas ni magnitudes.

## Capacidad de bodega: unidad (2026-10-22)

- **Decisión aprobada:** la capacidad de bodega se expresa en **Unidad de Volumen de Carga (UVC)**, símbolo **UVC**, unidad ficticia decimal de volumen utilizable de bodega. **1 UVC = 1 m³ = 1000 L.** Representa volumen, no masa ni tamaño físico del casco o las piezas.
- La equivalencia fija la unidad, no el balance. No asigna capacidades a naves ni UVC por mercancía o contrato, no decide si consumibles ocupan bodega ni establece efectos cuantitativos sobre velocidad, control, combustible u otros consumibles. Tampoco altera el fixture existente —un bien genérico, cantidad 1, carga automática— ni autoriza aplicar efectos de carga.

Motivo: un prototipo web reduce la fricción para jugar y compartir pruebas; la arquitectura conserva el dominio independiente y evita infraestructura de red prematura. Phaser sigue disponible como fallback histórico.

## Dirección visual futura aprobada (2026-10-21)

- **Objetivo:** vista de aspecto isométrico con modelos 3D renderizados en tiempo real en el navegador, no sprites prerenderizados como solución final.
- **Estrategia aprobada inicialmente:** mantener la demo Phaser y realizar un spike técnico separado con Three.js; este no autorizaba migración total. **Evolución aprobada después:** Three.js integrado como presentación principal de vuelo y Phaser preservado como fallback. `/spike-3d.html` sigue siendo spike aislado, no la integración. La migración total ni la reescritura del dominio están aprobadas.

Motivo: disponer de rotación, profundidad e iluminación de modelos reales sin arriesgar el ciclo jugable ya construido.

## Sprint confirmado por el usuario (2026-10-22)

- **Alcance corregido aprobado expresamente por el usuario (2026-10-22):** sprint íntegro dentro de un sistema, con dos planetas visuales y tres estaciones alrededor de cada planeta (seis en total). Las estaciones son los únicos lugares de atraque, servicio y misiones. Three.js renderiza el vuelo; Phaser se conserva como fallback y `src/domain` como dominio único. La presentación y el recorrido local están implementados parcialmente y el contrato se verificó manualmente; no se ha validado exhaustivamente la calidad visual de planetas. Persistencia queda pendiente.
- **Modo único crucero/cuántico:** activarlo habilita vuelo acelerado. Cerca del destino, por debajo de una distancia mínima, no permite salto y ofrece crucero controlado manualmente, sin autopiloto. A distancia suficiente se habilita el salto: el piloto mantiene orientación/alineación durante la carga y debe confirmar por segunda vez. Esa confirmación ejecuta un **traslado inmediato** dentro del sistema a una zona cercana no atracable del destino, bajo el umbral. Después el piloto vuela y atraca manualmente.
- **Modificación expresa de la regla aprobada previamente:** reemplaza el anterior crucero intersistema hasta destino, y también la regla anterior de salto puntual según resulte incompatible. El tránsito intersistema queda fuera del sprint; posteriormente se realizará mediante una estación espacial de salto.
- **Fixtures reversibles, no cifras definitivas:** distancia mínima, umbral de salto, distancia/zona de llegada, velocidad y carga. No se aprueban cifras para ellos. El combustible no se modela en el sprint. Persistencia, estación intersistema y lore definitivo quedan pendientes.

Motivo: el usuario corrigió y confirmó expresamente el alcance del sprint el 2026-10-22; los parámetros numéricos siguen abiertos y reversibles para calibración y pruebas.

## Dirección jugable y exploración (2026-10-22)

- **Idea central:** la vida del piloto, las capacidades de su nave y el oficio que puede realizar con ella. Los trabajos y la progresión giran alrededor de pilotar y equipar la nave; explorar es secundario.
- **Primera alfa:** todas las actividades se realizan desde la nave o sus interfaces al atracar. El piloto no desembarca ni recorre estaciones o planetas a pie. Los lugares siguen ofreciendo mercados, servicios y contratos accesibles desde la nave.
- **Evolución posterior:** se incorporará la posibilidad de desembarcar y recorrer estaciones o planetas; movimiento peatonal, interiores y transiciones requieren decisiones propias cuando llegue esa etapa.

Ver [idea central](vision-juego.md). Esta prioridad de diseño no altera la prohibición de crear mercancía infinita ni vuelve obligatorio el combate.

## Progresión de oficios (2026-10-22)

- El piloto acumula **niveles independientes por oficio** al realizar las actividades correspondientes, también cuando trabaja por cuenta propia. Los oficios no son clases exclusivas y el progreso del piloto se conserva al cambiar de nave o equipamiento.
- Cada nivel abre misiones del oficio con mayores recompensas y acceso a otras recompensas dentro de líneas de misiones de la historia del universo. Las condiciones concretas de historia y los tipos de recompensa todavía no están definidos.
- La nave y sus módulos siguen determinando qué actividades puede realizar. El nivel no ignora requisitos de capacidad, lugar, legalidad o disponibilidad de mercancía, y no convierte una oferta imposible en válida.

## Por definir

- Definir controles y perfil definitivos; validar controles mediante pruebas jugables.
- Calibrar empuje, masa, aceleración/frenado y cualquier límite de velocidad; definir controles. La distinción entre inercia continua y un modelo que la apaga bajo un umbral está resuelta por la decisión aprobada. No se ha decidido asistencia automática de frenado/estabilización a baja velocidad: queda descartada para esta regla.
- Calibrar la distancia mínima, el umbral de salto, llegada, velocidad y carga del modo crucero/cuántico; son fixtures reversibles, no cifras aprobadas. El salto inmediato y posterior aproximación/atraque manual se verificaron en el recorrido; esto no fija balance. Combustible no se modela en el sprint. El tránsito intersistema mediante estación espacial, persistencia y lore definitivo quedan pendientes.
- Definir tolerancias permanentes de atraque manual y automatización del módulo de aterrizaje.
- Definir mercancías, mercados, precios y pagos permanentes de contratos.
- Definir qué actividades otorgan progreso a cada oficio, experiencia por acción, niveles y umbrales, desbloqueos narrativos y tipos de recompensa; impedir que acciones repetidas sin coste o suministro creen experiencia ilimitada. Distinguir progreso del piloto de capacidad y módulos de su nave.
- Capacidad de carga: asignar capacidades a naves y UVC por mercancía/contrato; definir categoría/tamaño y momento de comprobar el requisito contractual; si los consumibles ocupan bodega; qué variables de vuelo cambian con la carga (masa, aceleración, velocidad máxima, manejo y frenado) y sus efectos cuantitativos; cómo afecta al consumo/autonomía de combustible y a la munición u otros consumibles; y una vía de recuperación que evite bloqueos. La equivalencia aprobada (1 UVC = 1 m³ = 1000 L) fija la unidad, no el balance, ni autoriza implementar efectos en el fixture existente.
- Tras la prueba 3D, elegir integración o migración del renderizador, presupuesto de rendimiento, formato y límites de los recursos, y adaptación de controles/colisiones; ver [evolución isométrica y 3D](arquitectura-isometrica-3d.md).
- Para el sprint confirmado, afinar controles y parámetros, y reemplazar/validar los fixtures provisionales de estaciones, misión, nombres y lore; no hay cifras finales aprobadas.

Las demás decisiones abiertas están enumeradas en `README.md` (sección «Decisiones pendientes»). Anotar aquí las decisiones confirmadas con fecha y motivo; mantener el README alineado cuando afecten al diseño general.
