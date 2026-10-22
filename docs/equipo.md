# Roles para desarrollar StarCargoGame

Este es un **mapa de responsabilidades**, no una plantilla de contratación ni una orden de invocar todos los agentes. Un miembro humano puede cubrir varios roles; un subagente aporta propuestas o trabajo acotado, pero la aprobación creativa y de producto corresponde al usuario. El coordinador llama solo a los perfiles útiles para cada incremento.

| Función en el equipo | Subagente(s) | Responsabilidad y límites |
| --- | --- | --- |
| Producción y coordinación | `coordinador` (agente principal) | Planifica incrementos, pide confirmaciones, asigna tareas e integra entregables. |
| Dirección de juego y diseño de sistemas | `diseno-juego` | Propone visión, pilares, cambios de reglas y soluciones a bloqueos creativos; el usuario aprueba. |
| Operaciones de nave | `operaciones-nave` | Pilotaje, saltos, atraque, consumibles, mantenimiento y rescate. |
| Economía y comercio | `economia-comercio` | Producción, precios, stock, bots comerciantes legales, mercados y contratos. |
| Minería y salvamento | `recoleccion` | Diseña actividades distintas con recursos limitados que alimentan la economía común. |
| Combate y piratería | `combate-pirateria` | NPC, zonas voluntarias, botín limitado, legalidad y rutas civiles seguras. |
| Naves y progresión | `naves-progresion` | Cascos, tamaños, módulos, tiendas y cosméticos sin ventajas. |
| Mundo y narrativa | `mundo-narrativa` | Rutas, destinos, facciones, historia local y textos de misiones ligados a los mercados. |
| Arquitectura y dirección técnica | `arquitecto-software` | Separación dominio/render y evolución a vista isométrica con modelos 3D reales. |
| Programación de dominio | `backend` | Simulación y persistencia local sin servidor en single player. |
| Programación visual | `frontend` | Escenas, entradas, HUD y presentación web. |
| Integración entre capas | `fullstack` | Cierra ciclos jugables entre presentación y dominio sin duplicar ambas capas. |
| Diseño de interfaz y experiencia | `diseno-ui` | Flujo del piloto, jerarquía de información, controles y accesibilidad de interfaz. |
| Arte visual y técnico 3D | `arte-visual` | Dirección de identidad y pipeline de modelos, materiales y animación; identidad concreta por aprobar. |
| Audio y música | `audio` | Señales, efectos, ambiente y propuesta sonora con alternativas visuales para información crítica. |
| Pruebas y control de calidad | `pruebas`, `calidad` | Automatización, recorrido jugable, accesibilidad, auditoría y revisión de cambios. |
| Documentación | `documentacion` | README, decisiones, guías de GitHub y documentación de incrementos. |
| Build, CI y entrega | `infraestructura` | Build reproducible y eventual publicación web tras autorización; no introduce hosting por defecto. |

## Fases y huecos deliberados

- **Etapa single player:** mecánicas, contenido, presentación y evaluación 3D; no se necesitan servidores, operaciones en vivo ni agentes de red mientras ese siga siendo el alcance aprobado.
- **Antes de publicación:** harán falta pruebas manuales en navegadores reales, accesibilidad y rendimiento medidos, revisión de licencias/autoría de modelos, tipografías y audio, y aprobación humana de identidad, textos, música y calidad visual. Los agentes preparan criterios y revisan; no garantizan por sí solos esos entregables.
- **Multijugador posterior:** se necesitarán diseño de autoridad de servidor, sincronización, seguridad/antifraude, privacidad, operación y observabilidad. Se crearán responsables especializados cuando se apruebe esa etapa; no se presupone ahora.
- **Difusión comercial o comunidad:** marketing, comunicación, soporte y publicación legal son responsabilidades humanas futuras, no agentes técnicos activados por defecto.

Estos roles se definen por **responsabilidad**, no por el estado de una demo. En cada encargo deben consultar [decisiones.md](decisiones.md), el código vigente y los criterios aprobados en vez de requerir una edición de sus prompts. El coordinador puede resolver tareas mínimas directamente y nunca llama a todos a la vez. Detalles de OpenCode: [.opencode/README.md](../.opencode/README.md).
