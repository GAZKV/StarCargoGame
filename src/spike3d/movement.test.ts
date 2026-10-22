import test from 'node:test';
import assert from 'node:assert/strict';
import { applyAction, distanceToPort, INITIAL_POSE, PORT_POSITION } from './movement';

test('inicializa a distancia del marcador y aproximarse reduce distancia', () => {
  const initial = distanceToPort(INITIAL_POSE);
  const next = applyAction(INITIAL_POSE, 'forward');
  assert.equal(initial, 6);
  assert.ok(distanceToPort(next) < initial);
});

test('giro modifica orientación sin desplazar la nave', () => {
  const turned = applyAction(INITIAL_POSE, 'turn-left');
  assert.equal(turned.x, INITIAL_POSE.x); assert.equal(turned.z, INITIAL_POSE.z);
  assert.notEqual(turned.rotation, INITIAL_POSE.rotation);
  assert.deepEqual(PORT_POSITION, { x: 3, z: 0 });
});
