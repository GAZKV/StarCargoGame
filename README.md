# StarCargoGame

**StarCargoGame** es un juego isométrico de pilotaje y oficios espaciales en una economía dinámica. El piloto progresa en cada oficio practicando actividades relacionadas, dentro de las capacidades de su nave: transportar mercancías, comerciar, extraer recursos, combatir, dedicarse a la piratería o recuperar restos mientras viaja entre planetas, estaciones y sistemas.

> **Estado:** la ruta `/` presenta vuelo con Three.js; `/phaser-fallback.html` ofrece la demo Phaser de respaldo y `src/domain` conserva las reglas compartidas. El recorrido local, incluido el modo inmediato y la entrega, se verificó manualmente en navegador; esto no equivale a validar exhaustivamente calidad visual, planetas, accesibilidad o toda la alfa. El spike aislado `/spike-3d.html` no es la integración. Alcance y límites en [primer incremento](docs/primer-incremento.md); decisiones y pendientes en [decisiones](docs/decisiones.md) y [hoja de ruta](docs/hoja-de-ruta-alfa.md).

## Visión

**Idea central:** la vida del piloto, su nave y el progreso en sus oficios. Equipar y pilotar una nave capaz de realizar distintos trabajos es la prioridad jugable; la exploración acompaña las oportunidades de trabajo, pero ocupa un segundo plano. Ver [dirección jugable](docs/vision-juego.md).

Cada lugar tiene una identidad económica y narrativa: produce, transforma o consume bienes, y ofrece misiones de distintos roles relacionadas con sus necesidades, su sistema y su historia. Una ruta rentable puede cambiar cuando llega un cargamento, se agotan las existencias o aparece una nueva demanda.

El objetivo a largo plazo es un mundo multijugador en el que las acciones de los pilotos afecten a los mercados. La primera etapa se desarrollará como **single player**.

## Ciclo de juego

1. Consultar mercados y ofertas desde las comunicaciones del piloto, la nave o las interfaces de las estaciones de carga y entrega.
2. Elegir un contrato del rol deseado o actuar por cuenta propia, por ejemplo comprando mercancía o extrayendo recursos.
3. Planificar el trayecto local según tiempo, munición, estado de la nave, capacidad de carga y riesgos. Los viajes intersistema quedan fuera del sprint.
4. Realizar la actividad elegida y entregar el objetivo, cobrar la recompensa o vender lo obtenido.
5. Cobrar, reinvertir y buscar nuevas oportunidades surgidas de los cambios del mercado.

Las ofertas del alcance actual son **locales al sistema**. El transporte intersistema queda para una etapa posterior y requerirá una estación espacial de salto.

## Roles y misiones

Los oficios **no son clases exclusivas**. El piloto tiene un **nivel independiente en cada oficio**, que crece al realizar actividades relacionadas, con o sin contrato. Su progreso no se pierde al cambiar de nave; la nave y el equipamiento determinan qué actividades puede llevar a cabo. Subir de nivel desbloquea misiones del oficio de mayor recompensa y acceso a otras recompensas mediante líneas narrativas del universo. Un nivel no sustituye requisitos de nave, mercancía o ubicación. Cada oficio tendrá ofertas coherentes con el lugar e interfaces de misiones; recompensas acordes con tiempo, inversión y riesgo.

| Rol | Actividad y ejemplos de misiones | Relación con el mundo |
| --- | --- | --- |
| Transportista y comerciante | Entregar suministros, cubrir contratos de compra/venta o comerciar sin contrato. | Redistribuye existencias entre mercados. |
| Recolector/minero | Extraer minerales u otros recursos y cumplir encargos de suministro. | Aporta materias primas a las zonas industriales y cadenas de producción. |
| Piloto de combate | Proteger rutas, escoltar cargamentos o eliminar piratas controlados por el juego. | Reduce amenazas en zonas de conflicto y recibe recompensas por encargos verificables. |
| Pirata | Interceptar cargamentos y cumplir encargos de facciones outlaw. | Obtiene botín con riesgo de combate, pérdida de reputación y restricciones para venderlo. |
| Salvamento (*salvage*) | Localizar pecios, recuperar restos y rescatar carga o componentes. | Devuelve materiales al circuito económico mediante recuperación, venta o encargos. |

**Pendiente de balance:** cómo se mide el progreso de cada actividad, niveles y umbrales, condiciones de desbloqueo de misiones, catálogo de recompensas narrativas y medidas para que una acción repetible no conceda experiencia ilimitada. Los niveles abren oportunidades; las misiones siguen dependiendo de necesidades, disponibilidad y contexto del mundo.

**Suposición:** «savage» se refiere a *salvage* (salvamento espacial). Si significa otra actividad, este rol se redefinirá.

Las misiones de combate tendrán lugar en **zonas diseñadas y señalizadas para el combate**, incluidas ubicaciones remotas o inhóspitas con presencia de piratas bots. Podrán participar naves de combate y naves de carga equipadas para defenderse, con dificultad y recompensas acordes a su capacidad. Los piratas enemigos y otros NPC de combate son distintos de los **bots comerciantes legales** que sostienen la economía: estos últimos nunca actuarán como piratas.

**Decisión de diseño:** el combate y la piratería serán actividades elegidas, no una barrera obligatoria para jugar como transportista, minero o comerciante. En single player los enfrentamientos serán contra NPC; cualquier combate entre jugadores queda fuera del alcance inicial y requerirá reglas propias para proteger las rutas no orientadas al combate. Las operaciones piratas no serán una forma de crear mercancía infinita: el botín recuperable estará ligado a cargamentos y encuentros limitados.

## Progreso: naves, mejoras y cosméticos

Los créditos obtenidos en contratos y comercio permiten mejorar la capacidad operativa del piloto sin imponer una única forma de jugar:

- **Mercado de naves:** comprar naves de carga, minería, combate o multipropósito con distintos compromisos entre bodega, alcance, consumo, maniobrabilidad y resistencia. Cambiar de nave abre nuevas actividades y tipos de encargo; ninguna nave debe ser la mejor en todo.
- **Mercado de mejoras y repuestos:** instalar o sustituir motores, armas, defensas y módulos de bodega, extracción, salvamento o navegación. Los módulos ocupan capacidad o espacios compatibles, de modo que elegir una mejora implica renunciar a otra. Una nave de carga puede equiparse para combatir sin igualar necesariamente a una nave de combate especializada.
- **Mercado de cosméticos:** personalizar al piloto y el aspecto de las naves, por ejemplo con atuendos, colores, insignias y acabados. Los cosméticos no modifican estadísticas, carga, detección ni recompensas.

**Decisión de diseño:** los tres mercados usan créditos ganados jugando; la personalización no otorga ventajas económicas. Los precios de naves y módulos servirán como objetivos de ahorro visibles, pero sus compras no deben dejar al jugador sin una forma viable de volver a ganar créditos. Las naves y módulos se podrán revender por una fracción de su precio; los cosméticos desbloqueados permanecerán disponibles. El balance de estos mercados se evaluará junto con el umbral de ganancias, para que ampliar la flota resulte atractivo sin convertir las primeras horas en una espera.

**Decisión de diseño:** las tiendas de naves, armamento y piezas tendrán inventarios distintos según la ubicación, su industria, jurisdicción y especialidad. Explorar otros sistemas será necesario para encontrar ciertas mejoras. La disponibilidad de artículos avanzados podrá depender de suministros y actividades económicas, pero el equipamiento básico y las reparaciones esenciales seguirán siendo accesibles en centros seguros para evitar bloqueos por falta de stock o por intervención de los bots.

### Categorías y tamaños de piezas

Cada casco y pieza tendrá una **categoría** —**civil, industrial, militar o carreras**— y un **tamaño del 1 al 8**. El tamaño indica la escala física de la nave o del componente: el **1 corresponde a naves pequeñas** y el **8 a naves capital**. Los tamaños intermedios representan una progresión de escala, no una obligación de que todos los roles usen el mayor tamaño.

- **Civil:** componentes equilibrados, disponibles en mercados habituales.
- **Industrial:** capacidad de carga, extracción y resistencia al trabajo continuado, a cambio de masa o maniobrabilidad.
- **Militar:** protección y armamento, con mayor consumo, coste o mantenimiento.
- **Carreras:** aceleración y maniobrabilidad, sacrificando carga, resistencia o autonomía.

**Decisión de diseño:** cada nave tendrá tamaño de casco y ranuras con tamaños admitidos. Una pieza solo se instala si coincide con una ranura compatible y respeta los límites de energía, masa y montaje; una nave de tamaño 8 no puede equipar cualquier arma de tamaño 8 si su torreta admite menos, ni una nave pequeña instalar una pieza capital. La categoría describe su especialización, **no** restringe todas las naves a una sola categoría: las combinaciones mixtas son posibles dentro de esos límites. Los cascos capitales (tamaño 8) forman parte de la escala prevista, pero su incorporación jugable queda para etapas posteriores.

**Propuesta:** mostrar en las tiendas dónde encontrar una pieza conocida y por qué no es compatible antes de comprarla. Las variantes escasas deberán tener alternativas funcionales comunes, aunque no igual de potentes.

## Desgaste, consumibles y servicios

Las naves gastan **combustible** al viajar y saltar, consumen **munición** al disparar armamento balístico y sufren **desgaste** por uso y **daños** por combate o accidentes. Desgaste y daños son estados diferentes: el desgaste reduce gradualmente la eficiencia o eleva el coste de mantenimiento; los daños pueden limitar sistemas concretos. Reabastecer combustible y munición no repara la nave, y reparar daños no elimina automáticamente el desgaste: el mantenimiento se contrata por separado y se muestra su precio antes de pagarlo.

- **Zonas seguras:** estaciones y centros de servicio con reparación, mantenimiento y reabastecimiento básicos habituales. Las tiendas de mejoras y piezas son independientes de estos servicios.
- **Zonas no seguras:** menos puntos de servicio, inventario y capacidad de reparación más limitados y, potencialmente, costes mayores. Encontrar un puesto avanzado puede formar parte de la planificación de una ruta, pero no se garantiza un taller completo.
- **Antes de salir:** el mapa y la interfaz de misión muestran autonomía estimada, munición disponible, estado de la nave, estaciones conocidas y costes previsibles. El jugador puede calcular si alcanza el siguiente lugar donde repostar o reparar.

**Decisión de diseño:** habrá una vía de recuperación si el jugador queda inmovilizado o sin créditos (por ejemplo, remolque a un centro seguro y contratos básicos para recuperarse); tendrá un coste razonable pero nunca borrará la partida. Los servicios consumen suministros cuando corresponda y sus costes forman parte de la economía, sin bloquear el combustible y las reparaciones básicas por una crisis de stock.

## Lugares y mercancías

- **Zonas industriales:** obtienen o procesan materias primas, incluidas las aportadas por mineros, y ofrecen contratos de transporte para distribuirlas.
- **Ubicaciones comerciales:** reciben materias primas, generan otros artículos a partir de ellas y ofrecen contratos de compra y venta.
- **Estaciones, planetas y sistemas:** albergan lugares con necesidades y actividades propias; todos consumen bienes y participan en la economía.
- **Ubicaciones outlaw:** tienen un mercado y contratos de mercancía ilegal coherentes con el lore de su entorno. El contrabando no debe sentirse como una lista genérica de encargos.

**Propuesta de modelado:** una estación o planeta contiene uno o varios mercados concretos; el sistema agrupa esos destinos y sus rutas, pero no duplica el inventario de cada uno. Cada bien tiene un origen, usos, legalidad según jurisdicción y lugares que lo demandan. Así es posible explicar por qué un producto es abundante en un sitio y escaso en otro.

### Cadena económica

1. Los yacimientos y lugares industriales generan o procesan materias primas hasta sus límites de disponibilidad y capacidad; los mineros también pueden extraerlas y entregarlas.
2. Los lugares comerciales consumen insumos para generar artículos; si faltan insumos, su producción disminuye o se detiene.
3. Todos los lugares consumen bienes según sus necesidades y reducen sus existencias con el tiempo.
4. El transporte, la compra y la venta modifican las existencias disponibles en origen y destino.
5. La oferta, la demanda y la disponibilidad generan nuevas oportunidades comerciales y contratos.

La minería añade recursos a los inventarios al extraerlos de yacimientos con disponibilidad limitada y recuperación definida; el salvamento recupera materiales de restos o encuentros limitados. Ambos deben alimentar las mismas cadenas de suministro que el transporte y el comercio, en lugar de crear un mercado separado sin consecuencias.

El consumo y la producción simulados mantienen la economía activa incluso si el jugador no interviene. En single player y cuando haya pocos jugadores, **bots comerciantes** cubren parte de las operaciones de transporte y comercio que faltan. En multijugador, las entregas y operaciones de los jugadores también alteran las existencias compartidas. Los bots no sustituyen la producción: trasladan bienes existentes desde lugares con oferta hacia lugares con demanda.

### Bots de equilibrio económico

- Realizan **solo operaciones legales**, según la jurisdicción de la ruta y de los mercados implicados; no aceptan contratos outlaw.
- Aparecen y desaparecen según la oferta, la demanda y la actividad de los jugadores. Cuanta menos actividad cubra una necesidad, más probable será que intervengan.
- Si la economía se acerca al colapso —por ejemplo, faltan insumos esenciales, se paraliza la producción o se acumulan bienes sin salida— su incorporación se vuelve más agresiva para recuperar el flujo de mercancías.
- Reducen su actividad cuando los jugadores vuelven a cubrir esas rutas; no deberían acaparar mercancías ni eliminar oportunidades razonables de juego.

**Propuesta:** medir la salud económica por mercado y por cadena de suministro, no solo por un indicador global; priorizar bienes esenciales y rutas viables. Limitar la velocidad, capacidad y número de bots, y usar umbrales distintos para incorporarlos y retirarlos, evita apariciones constantes ante pequeñas variaciones. Las compras, ventas y entregas de bots deben afectar al stock y a los precios bajo las mismas reglas económicas que las del jugador, sin crear bienes de la nada.

## Comercio y contratos

El jugador puede comprar y vender **sin contrato**: adquirir donde hay abundancia y precios bajos para vender donde escasea y se paga más. Un contrato, en cambio, fija una tarea concreta con origen, destino, mercancía, cantidad y recompensa.

- **Contratos industriales:** trasladar producción o insumos hacia donde se necesitan.
- **Contratos comerciales:** comprar, suministrar o vender bienes vinculados a las necesidades del mercado.
- **Contratos outlaw:** mover mercancía ilegal o restringida en rutas y lugares acordes con sus facciones e historia.

**Propuesta:** cada contrato especificará requisitos de carga, plazo si existe, pago, costes o penalizaciones por incumplimiento y condiciones de entrega. El sistema reservará o contabilizará la mercancía comprometida para impedir que una misma unidad satisfaga varios contratos. Las misiones se generarán por necesidades reales y reglas narrativas del lugar, con límites para evitar ofertas imposibles, infinitas o repetitivas.

**Decisión aprobada:** cada nave tendrá una capacidad de carga disponible. Los contratos especificarán un requisito de capacidad disponible y solo podrán realizarse con una nave que lo cumpla. Esta capacidad de carga es distinta del tamaño físico del casco y las piezas (categorías/tamaños 1–8 descritos arriba). La carga transportada tendrá efectos en el control/manejo y la velocidad de la nave, y también consecuencias para la gestión de sus consumibles. Los detalles de medición, efectos y requisitos siguen pendientes; ver [decisiones](docs/decisiones.md).

**Decisión aprobada (2026-10-22):** la capacidad de bodega se expresa en **Unidad de Volumen de Carga (UVC)**, símbolo **UVC**, unidad ficticia decimal de volumen utilizable de bodega. **1 UVC = 1 m³ = 1000 L.** Es volumen, no masa ni tamaño físico del casco o de las piezas. La conversión fija la unidad, no el balance. Todavía no se asignan capacidades a naves ni UVC por mercancía o contrato; tampoco se decide si los consumibles ocupan bodega ni los efectos cuantitativos de la carga sobre velocidad, control, combustible u otros consumibles. Estos detalles siguen pendientes en [decisiones](docs/decisiones.md); la decisión no modifica el fixture existente ni autoriza aplicar efectos de carga.

**Propuesta:** el precio de compra y venta dependerá de existencias, consumo esperado y tipo de lugar; la diferencia entre ambos, junto con combustible, peajes o riesgos si se incorporan, evitará ganancias garantizadas al comprar y revender inmediatamente en el mismo mercado. Habrá límites de inventario, capacidad de carga y presupuesto para que las decisiones tengan consecuencias.

### Umbral de ganancias y progresión

**Decisión de diseño:** el umbral será una **rentabilidad neta objetivo por hora de juego activo**, no un límite de créditos, patrimonio o ingresos diarios. La ganancia neta descuenta mercancía comprada, combustible, munición, peajes, mantenimiento, reparaciones y pérdidas esperadas por riesgos de la ruta; el tiempo incluye consultar ofertas, cargar, viajar, descargar y regresar o encontrar la siguiente oportunidad. Los contratos cuentan el pago neto después de esos costes. Una nave con más capacidad o una ruta mejor elegida puede superar las ganancias de la nave inicial: progresar debe valer la pena.

**Valores iniciales para pruebas de balance**, expresados con una nave inicial de valor de referencia de **10 000 créditos**:

| Actividad | Ganancia neta objetivo por hora activa |
| --- | ---: |
| Contratos legales accesibles desde el inicio | 700–1 000 créditos |
| Comercio legal planificado | 900–1 300 créditos |
| Rutas largas o peligrosas y contrabando, tras descontar pérdidas esperadas | 1 200–1 700 créditos |

**Extensión a los demás roles:** minería, salvamento y combate legal deben poder competir con el comercio legal en ingresos netos por hora activa con nave y equipo de inversión semejante. La piratería y las actividades peligrosas pueden apuntar al rango superior **solo después** de descontar munición, reparaciones, cargamentos perdidos y riesgo de fracaso. Los materiales y botines vendidos se contabilizan como ingreso; no se suman otra vez como recompensa de misión. Los números de la tabla son referencia para equipamiento inicial comparable, no un tope para naves avanzadas.

La primera mejora importante tendrá un **coste adicional objetivo de 5 000 créditos**: unas **4–6 horas** de comercio legal habitual. Los contratos iniciales no exigirán comprar una bodega completa de mercancía, para que un jugador con pocos créditos pueda recuperarse de una mala operación. Estas cifras son parámetros de partida para pruebas de juego, no precios definitivos de todos los bienes o naves.

El umbral es **flexible, no una penalización individual**. Los precios y el volumen disponible responden al stock y a la demanda del mercado para todos por igual: comprar mucho encarece las siguientes unidades; entregar mucho reduce el precio ofrecido por las siguientes. Los contratos tienen cantidades y plazos concretos, y las rutas se reponen gradualmente. Así, una oportunidad excepcional puede dar más que el objetivo, pero no repetirse indefinidamente sin que cambie la situación del mercado. Nunca se reducirán recompensas ya aceptadas ni se enviarán bots contra un jugador por ser rico. Los bots intervienen por necesidades de abastecimiento, no por las ganancias de una persona.

**Criterio de revisión:** en pruebas, medir ganancias netas por hora activa, tiempo hasta la primera mejora y disponibilidad de rutas rentables. Ajustar producción, consumo, costes y contratos si la mayoría de jugadores no puede alcanzar la primera mejora en 4–6 horas, si la opción segura siempre supera a la arriesgada o si una sola ruta domina el mercado de forma permanente.

## Riesgo, rutas y lore

Las rutas del sprint conectan estaciones dentro de un solo sistema. Los planetas son elementos visuales; las estaciones son los únicos lugares de atraque, servicios y misiones. El transporte intersistema queda para después y se realizará mediante una estación espacial de salto. La temática de cada lugar afecta a sus productos, contratos, necesidades y relatos locales.

**Decisión para el sprint:** la nave se pilota manualmente. El modo único de crucero/cuántico habilita vuelo acelerado; cerca del destino no permite salto y ofrece crucero controlado manualmente, sin autopiloto. A distancia suficiente, el piloto conserva orientación/alineación, espera la carga y confirma por segunda vez; entonces ocurre un traslado inmediato dentro del sistema a una zona próxima no atracable del destino, bajo el umbral. Después vuela y atraca manualmente. Distancia mínima, umbral y parámetros de llegada, velocidad y carga son fixtures reversibles, no cifras definitivas. El combustible no se modela en el sprint. El intersistema queda fuera y se proyecta posteriormente mediante una estación espacial de salto. Los detalles constan en [decisiones](docs/decisiones.md).

**Decisión aprobada:** la nave conserva su velocidad al soltar la aceleración, a cualquier velocidad; no hay umbral que apague la inercia ni estabilización o frenado automáticos a baja velocidad. Para frenar, el jugador aplica empuje en sentido contrario, y a mayor velocidad aumentan el tiempo y la distancia requeridos para la misma maniobra. El efecto se percibe más a velocidades altas, pero la inercia no desaparece a baja velocidad. Es inspiración newtoniana para el pilotaje, no una simulación astrofísica completa. Empuje, masa, aceleración/frenado, cualquier límite de velocidad y controles siguen siendo parámetros por calibrar; ver `docs/decisiones.md`.

**Propuesta:** transportar carga ilegal tendrá consecuencias según la jurisdicción: inspecciones, confiscación, multas o pérdida de reputación. Esas reglas deberán ser comprensibles antes de aceptar el riesgo. El lore se reflejará en los bienes, las facciones y la razón de cada encargo, no solo en el texto de ambientación.

## Alcance inicial y evolución

**Alcance aprobado del sprint y estado:** un sistema, dos planetas visuales y seis estaciones; solo las estaciones ofrecen atraque, servicios y misiones. La ruta `/` integra Three.js en la presentación de vuelo; `/phaser-fallback.html` mantiene Phaser de respaldo y `src/domain` el dominio único. El recorrido del fixture aceptado→salto→atraque→entrega está verificado manualmente en navegador (ver [evidencia y límites](docs/primer-incremento.md)). Siguen pendientes la evaluación visual exhaustiva, accesibilidad/contraste/lector de pantalla, benchmark y validación visual de planetas; esta verificación no supone que el sprint completo esté cerrado. Intersistemas y combustible quedan fuera; cifras de vuelo son fixtures reversibles. El spike `/spike-3d.html` es aislado, no la integración.

**Etapas posteriores:** una estación espacial de salto habilitará viajes intersistema. La alfa más amplia puede incorporar otros oficios y sistemas según se acuerde; desembarcar y explorar a pie siguen para etapas posteriores.

**Etapas posteriores:** desembarcar y recorrer estaciones o planetas a pie, más lugares, misiones y zonas de combate, cadenas de producción, facciones y rutas outlaw; multijugador con inventarios y mercado compartidos. La dirección visual aprobada incluye modelos 3D en tiempo real. El vuelo integrado usa Three.js en `/` y Phaser está disponible en `/phaser-fallback.html`; la comprobación no certifica acabado visual. El spike `/spike-3d.html` no es la integración; límites en [evolución isométrica y 3D](docs/arquitectura-isometrica-3d.md).

## Decisiones pendientes

- Se mantienen aprobados el navegador web de escritorio, TypeScript/Vite y el dominio independiente del renderizador; la aprobación inicial de Phaser 3 fue para la demo 2D. El alcance posterior aprobado conserva Phaser como fallback e integra Three.js para el vuelo principal. Controles y parámetros siguen pendientes; ver `docs/decisiones.md`.
- Escala del tiempo económico: cuándo avanzan producción, consumo y precios, y qué ocurre mientras no se juega.
- Parámetros y controles: distancia mínima para crucero/salto, umbral de salto, posición de llegada, velocidad y carga son fixtures reversibles por calibrar; combustible queda sin modelar en el sprint. Persistencia, estación intersistema y lore definitivo siguen pendientes. Las tolerancias de atraque manual y los controles precisos siguen por definir; el sprint no contempla autopiloto.
- Mecánicas concretas de extracción, salvamento, combate, daños, pérdida de nave y recuperación tras una derrota.
- Catálogo de mercancías, recetas de transformación y estadísticas, compatibilidad, tamaño de ranuras y precios concretos de naves y módulos.
- Capacidad de carga: están aprobados el nombre/símbolo UVC y la equivalencia 1 UVC = 1 m³ = 1000 L; definir capacidades de naves y UVC por mercancía/contrato, categoría/tamaño requerido por contrato y cuándo se comprueba el requisito; si los consumibles ocupan bodega; qué variables de vuelo cambian con la carga (masa, aceleración, velocidad máxima, manejo y frenado), sus efectos cuantitativos y las repercusiones en consumo/autonomía de combustible, munición u otros consumibles; y una vía de recuperación que evite bloqueos. La conversión fija la unidad, no el balance, y no autoriza aplicar efectos de carga al fixture existente.
- Tarifas y frecuencia exactas de desgaste, daños, consumo, reparación, rescate y reabastecimiento.
- Moneda, reputación, facciones, jurisdicciones y sanciones por contrabando.
- Reglas exactas de precios, plazos, fracaso de contratos y persistencia de la partida.
- Indicadores y umbrales de crisis económica, intensidad de los bots y transición entre intervención y retirada.
- Diseño del futuro multijugador: sincronización de existencias, equilibrio económico y protección frente a abusos.

La tecnología y las decisiones del incremento constan en [docs/decisiones.md](docs/decisiones.md). Los comandos verificados para instalar dependencias, ejecutar, probar y compilar están en [docs/primer-incremento.md](docs/primer-incremento.md).

## Documentación y colaboración

- [Índice de documentación](docs/README.md), [arquitectura](docs/arquitectura.md), [primer incremento](docs/primer-incremento.md) y [spike visual 3D](docs/arquitectura-isometrica-3d.md).
- [Hoja de ruta del sprint confirmado y alfa](docs/hoja-de-ruta-alfa.md) (separa alcance confirmado de propuestas posteriores).
- [Guía de desarrollo](docs/desarrollo.md) y [estructura del repositorio](docs/estructura.md).
- [Uso del coordinador y subagentes de OpenCode](.opencode/README.md).

La demo ejecutable cubre únicamente el recorrido local descrito en [docs/primer-incremento.md](docs/primer-incremento.md). El estado de Git y las decisiones que faltan no implican un commit inicial.
