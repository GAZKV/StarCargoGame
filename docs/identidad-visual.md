# Identidad visual y de marca

## Estado y fuentes de verdad

Este documento organiza el trabajo de identidad; no fija por sí solo decisiones de diseño pendientes. La visión y los requisitos del juego tienen como fuente [README.md](../README.md), y las decisiones aprobadas y pendientes de producto se registran en [Decisiones](decisiones.md). Las recomendaciones de esta guía son propuestas hasta que se aprueben expresamente.

## Hechos y contexto

### Decisión aprobada

- **Territorio de marca: ficción espacial industrial.** Esta es la dirección de marca confirmada por el usuario. No implica que estén elegidos el lore, las facciones, los símbolos ni una estética concreta.

### Contexto aprobado del producto

- StarCargoGame es un juego de **oficios espaciales** en una **economía dinámica**, con actividades como transporte, comercio, minería, combate, piratería y salvamento; véase [la visión y alcance](../README.md).
- La etapa inicial es **single player**.
- El primer prototipo aprobado es para **navegador web de escritorio**, con **Phaser 3**, TypeScript y Vite; la vista prevista es isométrica 2D. Consultar [Decisiones](decisiones.md) para el detalle tecnológico.

### Situación actual

La demo web actual explora una interfaz bajo el territorio aprobado de ficción espacial industrial. Su jerarquía organiza el panel de vuelo, contrato, inventarios y acciones; los colores y el tratamiento visual son **provisionales**, propios de esta exploración. No significa que se hayan aprobado una paleta, logo, tipografía ni marca, ni que sus decisiones visuales sean precedentes obligatorios.

No hubo validación visual manual en navegador de contraste, comportamiento responsive ni foco. Por tanto, la accesibilidad visual y de interacción no está verificada. El estado jugable se describe en [Primer incremento](primer-incremento.md).

## Alcance de una identidad completa

La identidad completa deberá cubrir, como mínimo, las áreas siguientes. Esta lista define el alcance del trabajo, no decisiones estéticas ya tomadas.

1. **Estrategia y personalidad:** propósito, promesa, públicos, atributos, diferenciación y personalidad verbal/visual, coherentes con los oficios espaciales y la economía. Acordar qué significa “industrial” para este producto sin convertirlo automáticamente en una estética específica.
2. **Logo y wordmark:** explorar símbolo, logotipo tipográfico o combinación; versiones, proporciones, áreas de protección, tamaños mínimos, fondos y usos incorrectos. El nombre de trabajo disponible es StarCargoGame; cualquier cambio de nombre requiere decisión aparte.
3. **Color y semántica:** paleta de marca y roles de interfaz (por ejemplo, superficies, texto, foco, información, éxito, advertencia y error), documentando combinaciones y contraste. No asignar códigos ni significados finales antes de validarlos.
4. **Tipografía:** criterios de selección para marca, títulos, texto de lectura y cifras/datos; revisar legibilidad, cobertura de caracteres, licencias y disponibilidad en navegador. No hay familias elegidas.
5. **Iconografía:** gramática de formas, tamaños y consistencia para acciones, mercancías, navegación y estados; definir cuándo acompañar iconos con etiquetas.
6. **Ilustración y materiales:** dirección para naves, lugares, fondos, interfaces y recursos promocionales. Explorar opciones visuales y materiales en lugar de presuponer un tipo exacto (metal, desgaste u otro).
7. **Tono y microcopy:** voz para contratos, mercados, navegación, errores, confirmaciones y ayuda; reglas de claridad, longitud, terminología y traducción. No hay eslogan ni lore de marca aprobado.
8. **Sistema de UI/HUD:** componentes, jerarquía, estados, espaciado, densidad de información, navegación, comportamiento adaptable y relación entre interfaz operativa y ambientación.
9. **Accesibilidad:** contraste, escalado y lectura, foco visible, navegación por teclado, alternativas textuales y comunicación de estados; verificar también que información importante no dependa de un único canal sensorial.
10. **Aplicaciones:** dentro del juego (HUD, menús, mercados, contratos y señalización); web (página, demo y recursos informativos); GitHub (avatar, banners si se usan, capturas y plantillas). No asumir que cada canal requiere un logo o tratamiento distinto.
11. **Proceso de aprobación:** recoger alternativas y criterios, validar muestras en juego y navegador, comprobar accesibilidad/licencias, registrar la elección y fecha en [Decisiones](decisiones.md), y actualizar esta guía solo con acuerdos explícitos. Mantener las opciones no elegidas como propuestas, no como requisitos.
12. **Licencia y procedencia de recursos:** registrar autoría, origen, licencia y atribución requerida para fuentes, iconos, texturas, ilustraciones, audio y otros recursos; comprobar que la licencia permite los usos previstos y conservar avisos. No se ha decidido una licencia de marca ni de recursos.

## Recomendaciones por aprobar

Son propuestas de trabajo, no reglas vigentes:

- **Lectura operativa primero:** evitar que la decoración compita con la lectura de rutas, estado de nave, inventario, contratos y acciones.
- **Estados por más de un canal:** acompañar el color con texto, forma, icono, patrón u otra señal perceptible para comunicar estados importantes.
- **Diseño desde tareas reales:** probar componentes con recorridos de mercado, contrato, navegación y entrega, en lugar de aprobar una identidad solo a partir de láminas o mockups aislados.
- **Coherencia con ficción espacial industrial sin clichés obligatorios:** comparar direcciones visuales mediante criterios de legibilidad, carácter, escalabilidad y coste de producción; no adoptar señales visuales solo por asociación genérica con ciencia ficción.
- **Sistema extensible:** favorecer componentes reutilizables y tokens semánticos para que los cambios de tema o contenido no requieran redefinir cada pantalla.

## Preguntas abiertas

- ¿Qué personalidad y atributos debe transmitir la marca, además de pertenecer al territorio de ficción espacial industrial?
- ¿Se mantiene StarCargoGame como nombre público? ¿Se desea un símbolo, un wordmark o ambos?
- ¿Qué referencias y límites visuales describen mejor la dirección industrial buscada? ¿Qué alternativas se deben evitar?
- ¿Qué paleta, tipografías, iconos, ilustración y tratamiento de materiales representan esa dirección sin perjudicar claridad o rendimiento?
- ¿Cuál será el tono editorial y qué terminología debe mantenerse consistente? ¿Se requiere localización desde el prototipo?
- ¿Qué criterios de accesibilidad y pruebas se adoptarán como mínimos para UI/HUD y web?
- ¿Quién aprueba las propuestas y cómo se resuelven desacuerdos? ¿Qué entregables se requieren antes de aprobar una identidad?
- ¿Qué recursos de terceros se aceptarán y qué política de licencias, atribución y almacenamiento se seguirá?
- ¿Qué aplicaciones de marca son necesarias en la etapa actual y cuáles se reservan para etapas posteriores?

Hasta resolver estas preguntas, los detalles enumerados aquí permanecen como opciones para investigar; no se deben presentar como decisiones ni implementarse como requisitos de marca.
