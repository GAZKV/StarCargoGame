# OpenCode en StarCargoGame

Inicia OpenCode desde la raíz de esta carpeta con `opencode .`. `opencode.jsonc` selecciona `coordinador` como agente principal. El modelo queda a elección de la cuenta del usuario; el proyecto no fija proveedor ni credenciales.

Para iniciar un incremento en la interfaz, escribe `/iniciar-incremento` seguido del objetivo si ya lo tienes. El coordinador propone criterios, espera confirmación y después implementa. Para solo planificar, usa `/siguiente-incremento`.

## Agentes

- `coordinador`: prepara incrementos, solicita las decisiones necesarias e integra el trabajo.
- Diseño consultivo: `diseno-juego` (visión y bloqueos creativos), `operaciones-nave` (vuelo, saltos, atraque y servicios), `economia-comercio` (mercados, bots y contratos), `recoleccion` (minería y salvamento), `combate-pirateria` (riesgo legal/outlaw) y `naves-progresion` (cascos, carga y mejoras).
- Mundo y arte: `mundo-narrativa` (lugares, facciones y misiones), `arte-visual` (identidad y recursos 3D), `audio` (señales y música) y `diseno-ui` (flujos, HUD y accesibilidad).
- `arquitecto-software`: orienta decisiones técnicas y la separación entre reglas y presentación.
- Equipo de desarrollo: `frontend` (presentación), `backend` (reglas y datos), `fullstack` (integración) y `pruebas` (automatización). Solo editan los archivos asignados, tras confirmar los criterios del incremento.
- `calidad`: revisa cambios, riesgos, accesibilidad y regresiones sin editar ni ejecutar comandos. El coordinador o `pruebas` realiza las verificaciones que solicite.
- `documentacion`: organiza `README.md`, `docs/` y plantillas `.github/` después de cada decisión o incremento; no modifica código ni configuración de agentes.
- `infraestructura`: prepara builds y CI web reproducibles; no publica ni introduce hosting sin autorización.

El [mapa de roles y responsabilidades](../docs/equipo.md) relaciona los agentes con las funciones reales de un equipo de videojuegos. Las instrucciones de cada agente son estables: para saber qué está implementado y qué falta, consultan el código y `docs/decisiones.md` en cada encargo. Tener un agente disponible no implica convocarlo en todos los incrementos ni reemplazar trabajo artístico humano.

## Recursos locales

- `/siguiente-incremento`: propone un incremento y sus criterios antes de programarlo.
- `/iniciar-incremento`: organiza un incremento con el coordinador; solicita confirmación antes de escribir código.
- Skill `incremento-jugable`: proceso de diseño, verificación y entrega incremental.
- Skill `balance-economico`: revisión de stocks, bots, contratos y rentabilidad.
- `AGENTS.md`: reglas compartidas para todos los agentes.
- `docs/decisiones.md`: decisiones confirmadas y preguntas pendientes; consultar antes de modificar mecánicas.

## MCP y Git

El único MCP declarado por este proyecto es `context7`, para documentación actual de bibliotecas. Comprueba la conexión con `opencode mcp list`; otros servidores que aparezcan pueden proceder de la configuración global del usuario. No guardar secretos en los archivos del repositorio.

El repositorio Git local usa la rama `main`. Aún no se ha hecho el primer commit; revisar los archivos y autorizarlo expresamente cuando corresponda. Mantener separados los incrementos de documentación y los de código.
