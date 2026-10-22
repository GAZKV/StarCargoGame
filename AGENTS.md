# StarCargoGame — instrucciones del proyecto

- Lee `README.md` antes de diseñar o implementar. Es la fuente de verdad para visión, alcance y reglas ya decididas; las secciones «Propuesta» no son decisiones cerradas.
- Comunícate con el usuario en español. No elijas motor, plataforma, controles ni reglas pendientes sin consultar cuando afecten a la arquitectura o al juego.
- Trabaja en incrementos pequeños y jugables: definir objetivo y criterio de aceptación, implementar, verificar y resumir resultados y pendientes. No intentes construir de una vez todo el alcance del README.
- Mantén la primera etapa single player. Conserva la posibilidad de multijugador futuro sin implementar infraestructura prematura.
- Cada actividad y bot económico debe respetar inventarios y la misma economía; evita crear mercancía ilimitada o bloquear la recuperación del jugador.
- Antes de editar, comprueba el estado de Git y respeta cambios ajenos. No hagas commits, pushes ni tags sin autorización explícita. Tras cada incremento, ejecuta las pruebas disponibles y documenta cómo reproducirlas.
- Registra decisiones aprobadas y preguntas abiertas en `docs/decisiones.md`; no conviertas propuestas del README en requisitos definitivos.
- Para alterar una regla aprobada: pedir a `diseno-juego` una propuesta con impacto y prueba jugable, presentarla al usuario, esperar su aprobación y entonces actualizar `docs/decisiones.md`, README y código afectados. Un subagente no tiene autoridad para cambiar reglas por su cuenta. `docs/vision-juego.md` documenta la dirección aprobada: piloto, nave y oficios en primer plano; exploración secundaria y sin desplazamiento a pie en la primera alfa.
- Mantén `docs/README.md` como índice y actualiza la documentación afectada después de cada incremento; no describas funciones planeadas como implementadas ni inventes comandos de instalación.
- Usa los especialistas de mecánicas para análisis sin edición y los agentes técnicos para cambios acotados cuando aporte valor; el coordinador integra y valida el resultado. Asigna a cada agente archivos distintos y evita tareas simultáneas que compartan interfaces aún no acordadas. En single player, backend significa dominio y persistencia local, no servidor.
- Consulta `docs/equipo.md` para elegir agentes de arte, mundo, narrativa, audio e infraestructura según el incremento. Los especialistas que proponen contenido no aprueban identidad ni generan assets finales automáticamente; documenta procedencia y licencias de recursos antes de incorporarlos.
