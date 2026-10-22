import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('GLB es binario glTF 2.0 con chunks JSON y BIN íntegros', async () => {
  const glb = await readFile('public/assets/3d/spike/test-ship.glb');
  assert.equal(glb.toString('ascii', 0, 4), 'glTF');
  assert.equal(glb.readUInt32LE(4), 2); assert.equal(glb.readUInt32LE(8), glb.length);
  const jsonLength = glb.readUInt32LE(12), jsonType = glb.readUInt32LE(16);
  assert.equal(jsonType, 0x4e4f534a);
  const doc = JSON.parse(glb.toString('utf8', 20, 20 + jsonLength));
  assert.equal(doc.asset.version, '2.0'); assert.equal(doc.buffers.length, 1);
  const binHeader = 20 + jsonLength;
  assert.equal(glb.readUInt32LE(binHeader + 4), 0x004e4942);
  assert.equal(binHeader + 8 + glb.readUInt32LE(binHeader), glb.length);
});
