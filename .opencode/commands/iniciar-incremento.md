---
description: Iniciar un incremento con el coordinador
agent: coordinador
---

Coordina el siguiente incremento de StarCargoGame. Lee README.md, docs/decisiones.md y AGENTS.md; comprueba el estado de Git. Usa la skill incremento-jugable. Si el usuario indicó un objetivo, priorízalo: $ARGUMENTS

Primero presenta un incremento mínimo, criterios de aceptación observables y verificaciones; distingue decisiones ya aprobadas de supuestos. Pregunta solo por decisiones imprescindibles que falten y solicita confirmación de los criterios antes de escribir código. Una vez confirmados, ejecuta el incremento, usa subagentes especializados si aportan valor, verifica el resultado y resume cambios y pendientes. No hagas commits ni pushes sin autorización expresa.
