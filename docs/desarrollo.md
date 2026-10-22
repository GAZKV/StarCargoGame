# Colaboración y trabajo incremental

## Antes de empezar

1. Lee [README.md](../README.md), [decisiones.md](decisiones.md) y [AGENTS.md](../AGENTS.md).
2. Abre OpenCode desde la raíz con `opencode .` y utiliza `/iniciar-incremento` seguido del objetivo deseado si ya lo tienes.
3. El coordinador propone alcance, criterios y verificaciones. No se implementa hasta que el usuario confirme esos criterios.

## Cada incremento

- Revisar `git status` antes de tocar archivos; mantener los cambios limitados a la tarea y no sobrescribir trabajo ajeno.
- Anotar una decisión aprobada en `docs/decisiones.md` y actualizar las páginas afectadas sin repetir todo el README.
- Ejecutar las verificaciones realmente disponibles y consignar resultados y limitaciones; consulta los comandos comprobados del incremento en [primer-incremento.md](primer-incremento.md). No presentar una prueba automatizada como prueba manual de interfaz.
- Revisar el diff y usar las plantillas de [issues](../.github/ISSUE_TEMPLATE/) y [pull requests](../.github/PULL_REQUEST_TEMPLATE.md) al publicar en GitHub.
- No hacer commit, push o tag por cuenta del agente sin permiso explícito. El primer commit y el remoto de GitHub están pendientes.

## Distribución de responsabilidades

El coordinador asigna únicamente los agentes relevantes: especialistas de mecánica y contenido para propuestas, frontend y dominio para implementación, documentación para guías, calidad y revisión para auditoría, e infraestructura para builds autorizados. Consulta el [mapa de responsabilidades](equipo.md) y [.opencode/README.md](../.opencode/README.md). En single player no hace falta servidor.
