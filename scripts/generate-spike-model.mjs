import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

// Modelo procedural original de prueba, coordenadas +Y arriba, +Z delante.
const triangles = [
  [0,0,1.5,-.38,-.18,-.9,.38,-.18,-.9],[0,0,1.5,.38,-.18,-.9,.3,.2,-.8],
  [0,0,1.5,.3,.2,-.8,-.3,.2,-.8],[0,0,1.5,-.3,.2,-.8,-.38,-.18,-.9],
  [-.22,0,-.35,-1.25,0,-.75,-.38,0,-.9],[.22,0,-.35,.38,0,-.9,1.25,0,-.75],
  [-.22,0,-.35,.22,0,-.35,-.38,0,-.9],[.22,0,-.35,.38,0,-.9,-.22,0,-.35],
];
const positions=triangles.flat(), binary=Buffer.alloc(positions.length*4);
positions.forEach((v,i)=>binary.writeFloatLE(v,i*4));
const gltf={asset:{version:'2.0',generator:'StarCargoGame procedural spike mesh'},scene:0,scenes:[{nodes:[0]}],nodes:[{mesh:0,name:'NeutralTestShip'}],meshes:[{primitives:[{attributes:{POSITION:0},material:0,mode:4}]}],materials:[{name:'Matte test alloy',pbrMetallicRoughness:{baseColorFactor:[.34,.73,.78,1],metallicFactor:.35,roughnessFactor:.48}}],accessors:[{bufferView:0,componentType:5126,count:positions.length/3,type:'VEC3',min:[-1.25,-.18,-.9],max:[1.25,.2,1.5]}],bufferViews:[{buffer:0,byteOffset:0,byteLength:binary.length,target:34962}],buffers:[{byteLength:binary.length}]};
let json=Buffer.from(JSON.stringify(gltf));json=Buffer.concat([json,Buffer.alloc((4-json.length%4)%4,0x20)]);
const bin=binary.length%4?Buffer.concat([binary,Buffer.alloc(4-binary.length%4)]):binary,total=28+json.length+bin.length;
const header=Buffer.alloc(12);header.write('glTF');header.writeUInt32LE(2,4);header.writeUInt32LE(total,8);
const jh=Buffer.alloc(8);jh.writeUInt32LE(json.length);jh.writeUInt32LE(0x4e4f534a,4);
const bh=Buffer.alloc(8);bh.writeUInt32LE(bin.length);bh.writeUInt32LE(0x004e4942,4);
const out=resolve('public/assets/3d/spike/test-ship.glb');await mkdir(dirname(out),{recursive:true});await writeFile(out,Buffer.concat([header,jh,json,bh,bin]));console.log(`Generated ${out}`);
