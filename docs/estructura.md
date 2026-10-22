# Estructura del repositorio

## Actual

```text
StarCargoGame/
├── README.md              # Visión del juego y alcance
├── AGENTS.md              # Instrucciones compartidas de trabajo
├── opencode.jsonc         # Configuración local de OpenCode
├── .opencode/             # Agentes, skills, comandos y guía de uso
├── .github/               # Plantillas de issues y pull requests
├── docs/                  # Índice, decisiones y guías
├── public/                # Recursos servidos; incluye el modelo temporal del spike
├── scripts/               # Generación interna de recursos del spike
├── src/
│   ├── domain/             # Dominio de la demo
│   ├── spike3d/            # Presentación aislada del spike Three.js
│   ├── main.ts             # Entrada de la demo Phaser en /
│   └── style.css
├── spike-3d.html           # Entrada web separada del spike 3D
├── index.html              # Entrada web de la demo Phaser
├── package.json            # Scripts npm y dependencias
└── .gitignore              # Archivos locales y generados
```

El modelo `.glb` del spike se genera localmente como recurso temporal mediante `npm run generate:spike-model`; su procedencia y límites se describen en [evolución isométrica y 3D](arquitectura-isometrica-3d.md). La entrada `/` y el spike `/spike-3d.html` son páginas separadas. La estructura no implica integración entre sus renderizadores. Ver también [arquitectura](arquitectura.md) y [decisiones](decisiones.md).
