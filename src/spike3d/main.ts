import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { applyAction, distanceToPort, INITIAL_POSE, type MovementAction, type Pose } from './movement';

const canvas = document.querySelector<HTMLCanvasElement>('#viewport')!;
const status = document.querySelector<HTMLElement>('#status')!;
const distanceOutput = document.querySelector<HTMLOutputElement>('#distance')!;
const failure = document.querySelector<HTMLElement>('#failure')!;
let renderer: THREE.WebGLRenderer;
try {
  // Three.js actual requiere WebGL2. Deja que el renderer cree/adquiera el contexto:
  // probar webgl/webgl2 aquí podría fijar un contexto incompatible para el renderer.
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
} catch (error) {
  showFailure(`No se pudo iniciar el renderizado 3D (se requiere WebGL2). ${error instanceof Error ? error.message : ''}`.trim());
  canvas.hidden = true;
  status.textContent = 'Experimento no disponible.';
  document.querySelector<HTMLElement>('#failure button')?.focus();
  // No inicializar escena ni bucle de render si falta WebGL2.
  throw new Error('No se pudo crear el renderer WebGL2.', { cause: error });
}

const scene = new THREE.Scene(); scene.background = new THREE.Color('#0d1a29');
const camera = new THREE.OrthographicCamera(-7, 7, 5, -5, 0.1, 100);
camera.position.set(9, 10, 12); camera.lookAt(0, 0, 0);
scene.add(new THREE.HemisphereLight(0xd8efff, 0x25354b, 2));
const keyLight = new THREE.DirectionalLight(0xffffff, 2.2); keyLight.position.set(-4, 8, 5); scene.add(keyLight);

// Estación geométrica de bajo coste y puerto claramente marcado.
const station = new THREE.Group(); scene.add(station); station.position.set(3, 0, 0);
const metal = new THREE.MeshStandardMaterial({ color: 0x526a80, roughness: 0.82, metalness: 0.2 });
const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.95, 0.7, 12), metal); hub.position.y = 0.4; station.add(hub);
const spine = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 2.1), metal); spine.position.set(0, 0.35, -1.3); station.add(spine);
for (const x of [-1.2, 1.2]) { const pod = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.35, 0.65), metal); pod.position.set(x, 0.35, -1.3); station.add(pod); }
const portMaterial = new THREE.MeshBasicMaterial({ color: 0x72e1d2 });
const portRing = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.08, 6, 20), portMaterial); portRing.rotation.x = Math.PI / 2; portRing.position.y = 0.12; station.add(portRing);
const portMarker = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.55, 6), new THREE.MeshBasicMaterial({ color: 0xffca74 })); portMarker.position.set(0, 1.3, 0); station.add(portMarker);
const shipRoot = new THREE.Group(); scene.add(shipRoot);
let pose: Pose = { ...INITIAL_POSE };
function placeShip(): void { shipRoot.position.set(pose.x, 0, pose.z); shipRoot.rotation.y = pose.rotation; }
placeShip();

function updateStatus(): void {
  distanceOutput.value = `${distanceToPort(pose).toFixed(2)} unidades`;
  status.textContent = 'Vista de prueba activa. El marcador indica solo una referencia visual; no comprueba reglas de atraque.';
}
function act(action: MovementAction): void { pose = applyAction(pose, action); placeShip(); updateStatus(); }
document.querySelectorAll<HTMLButtonElement>('[data-action]').forEach((button) => button.addEventListener('click', () => act(button.dataset.action as MovementAction)));
canvas.addEventListener('click', () => canvas.focus());
window.addEventListener('keydown', (event) => {
  if (document.activeElement !== canvas) return;
  const keys: Record<string, MovementAction> = { ArrowUp: 'forward', ArrowDown: 'backward', ArrowLeft: 'turn-left', ArrowRight: 'turn-right' };
  const action = keys[event.key]; if (action) { event.preventDefault(); act(action); }
});
document.querySelector('#restart')!.addEventListener('click', () => { pose = { ...INITIAL_POSE }; placeShip(); updateStatus(); });

const loader = new GLTFLoader();
loader.load('/assets/3d/spike/test-ship.glb', ({ scene: model }) => {
  model.traverse((object) => { if (object instanceof THREE.Mesh) { object.geometry.computeVertexNormals(); object.castShadow = false; object.receiveShadow = false; } });
  shipRoot.add(model); updateStatus();
}, undefined, (error) => showFailure(`No se pudo cargar la nave GLB: ${error instanceof Error ? error.message : 'error de recurso'}`));

function resize(): void {
  const width = canvas.clientWidth, height = canvas.clientHeight;
  if (!width || !height) return;
  renderer.setSize(width, height, false);
  const halfHeight = 5, aspect = width / height;
  camera.left = -halfHeight * aspect; camera.right = halfHeight * aspect; camera.top = halfHeight; camera.bottom = -halfHeight;
  camera.updateProjectionMatrix();
}
const observer = new ResizeObserver(resize); observer.observe(canvas); window.addEventListener('resize', resize); resize();
updateStatus();
function render(): void { renderer.render(scene, camera); requestAnimationFrame(render); }
render();
function showFailure(message: string): void {
  failure.hidden = false; failure.replaceChildren();
  const text = document.createElement('p'); text.textContent = `${message} Puedes recargar o reiniciar la página para intentarlo de nuevo.`;
  const retry = document.createElement('button'); retry.type = 'button'; retry.textContent = 'Recargar experimento'; retry.addEventListener('click', () => location.reload());
  failure.append(text, retry); status.textContent = 'Experimento no disponible.';
}
window.addEventListener('pagehide', () => { observer.disconnect(); renderer.dispose(); });
