import * as THREE from 'three';
import { STATIONS, SYSTEMS } from './content/universe.ts';
import { accept, deliver, initialState, requestDock, queryOffer, selectDestination, startQuantumMode, confirmQuantum, update, FIXTURE, type State } from './domain/game.ts';
import './style.css';

const fallbackLink = document.createElement('a');
fallbackLink.href = '/phaser-fallback.html'; fallbackLink.textContent = 'Respaldo visual 2D (Phaser)'; fallbackLink.className = 'fallback-link';
document.body.prepend(fallbackLink);
const root = document.querySelector<HTMLDivElement>('#app')!;
root.innerHTML = `<header class="topbar"><div><p class="eyebrow">STAR CARGO / OPERACIONES DE VUELO</p><h1>Puente de mando</h1></div><span id="system-name" class="flight-state"></span></header>
<main><section class="flight-section"><div class="section-heading"><div><p class="eyebrow">VUELO LOCAL \u00b7 SISTEMA \u00daNICO</p><h2>\u00c1rea de pilotaje</h2></div><span class="flight-state" id="station-status"></span></div>
<nav id="destination-list" aria-label="Seleccionar estaci\u00f3n de destino"></nav>
<div id="stage"><canvas id="flight" role="img" aria-label="Vista tridimensional de la nave en el espacio; la c\u00e1mara la sigue."></canvas><div id="destination-indicator" aria-hidden="true"></div><span class="scene-label">VUELO \u00b7 ESPACIO LOCAL</span></div>
<section class="flight-readout" aria-label="Datos de vuelo"><p id="distance"></p><p id="target-direction"></p><p id="quantum-state"></p></section><p id="message" role="status" aria-live="polite"></p>
<div class="controls" aria-label="Controles de nave"><button data-vector="0,-1">\u2191 Arriba</button><button data-vector="-1,0">\u2190 Izquierda</button><button data-vector="0,1">\u2193 Abajo</button><button data-vector="1,0">\u2192 Derecha</button><button id="quantum">Activar crucero / cu\u00e1ntico</button><button id="confirm">Segunda confirmaci\u00f3n de salto</button><button id="dock">Solicitar atraque en destino</button></div><p class="hint">Mant\u00e9n pulsadas las flechas o usa empuje. La nave conserva inercia; aplica empuje contrario para frenar. Atraque manual.</p>
<details id="map-panel"><summary id="map-toggle" aria-controls="system-map" aria-expanded="false">Mapa del sistema <span>Mostrar / ocultar</span></summary><section id="system-map" aria-label="Mapa local del sistema"><p class="map-legend">Estaciones \u00b7 destino \u00b7 nave</p><div id="map-markers"></div><p id="map-position"></p></section></details>
</section><aside class="panel"><p class="eyebrow">INTERFAZ DE ESTACI\u00d3N</p><h2 id="station-title">Sin estaci\u00f3n atracada</h2><p id="station-lore">Atraque en una estaci\u00f3n para consultar sus contratos.</p><section class="contract-card"><p class="card-label">CONTRATO</p><p id="offer"></p><p id="cargo"></p><div class="actions"><button id="accept">Aceptar contrato</button><button id="deliver">Entregar y cobrar</button></div></section><section class="inventory"><h3>Carga e inventario</h3><p id="inventory"></p><p id="credits"></p></section></aside></main><footer>Three.js \u00b7 vuelo local</footer>`;

let state: State = initialState();
const canvas = document.querySelector<HTMLCanvasElement>('#flight')!; canvas.tabIndex = 0;
document.querySelector<HTMLDetailsElement>('#map-panel')!.addEventListener('toggle', e => document.querySelector('#map-toggle')!.setAttribute('aria-expanded', String((e.currentTarget as HTMLDetailsElement).open)));
const scene = new THREE.Scene(); scene.background = new THREE.Color('#071018');
// Lightweight procedural starfield; no station/planet meshes or world labels in the flight scene.
const starPositions = new Float32Array(1200 * 3); for (let i=0;i<starPositions.length;i++) starPositions[i]=(Math.random()-.5)*1800;
const starGeometry=new THREE.BufferGeometry(); starGeometry.setAttribute('position',new THREE.BufferAttribute(starPositions,3));
const stars=new THREE.Points(starGeometry,new THREE.PointsMaterial({color:0xc4d9e4,size:1.5,sizeAttenuation:false})); scene.add(stars);
const camera = new THREE.PerspectiveCamera(48,1,.1,6000);
const renderer = new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'low-power'}); renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
scene.add(new THREE.HemisphereLight(0xd4eaff,0x26333c,2));
const ship=new THREE.Group(); scene.add(ship);
const hull=new THREE.Mesh(new THREE.ConeGeometry(1.1,3.5,5),new THREE.MeshStandardMaterial({color:0xe4a75c,emissive:0x493016,emissiveIntensity:.22,metalness:.25,roughness:.55})); hull.rotation.x=Math.PI/2; ship.add(hull);
const getSystem=(id:string)=>SYSTEMS.find(s=>s.id===id)?.name??id;
const destinationList=document.querySelector('#destination-list')!;
const stage=document.querySelector<HTMLElement>('#stage')!, indicator=document.querySelector<HTMLElement>('#destination-indicator')!;
const mapMarkers=document.querySelector<HTMLElement>('#map-markers')!;
const stationMarkers=STATIONS.map((s,i)=>{const marker=document.createElement('span');marker.className='map-station';marker.textContent=String(i+1);marker.style.left=`${5+s.position.x/1300*90}%`;marker.style.top=`${8+s.position.y/750*74}%`;mapMarkers.append(marker);return marker});
const shipMarker=document.createElement('span');shipMarker.className='map-ship';shipMarker.textContent='\u25b2';mapMarkers.append(shipMarker);
let stageWidth=0,stageHeight=0,indicatorWidth=0,indicatorHeight=0;
function positionIndicator(){
 const dest=STATIONS.find(s=>s.id===state.selectedDestination);
 if(!dest||indicator.hidden||stageWidth<=0||stageHeight<=0||indicatorWidth<=0||indicatorHeight<=0)return;
 const dx=dest.position.x-state.position.x,dy=dest.position.y-state.position.y,angle=Math.atan2(dy,dx);
  const margin=8,halfW=indicatorWidth/2,halfH=indicatorHeight/2;
  const desiredX=stageWidth*(.5+Math.cos(angle)*.43),desiredY=stageHeight*(.5+Math.sin(angle)*.40);
  const x=Math.max(margin+halfW,Math.min(stageWidth-margin-halfW,desiredX));
  const y=Math.max(margin+halfH,Math.min(stageHeight-margin-halfH,desiredY));
  indicator.style.left=`${x}px`;indicator.style.top=`${y}px`;
 }
function borderBoxSize(entry:ResizeObserverEntry,element:HTMLElement){
 const box=entry.borderBoxSize;
 const size=Array.isArray(box)?box[0]:box;
 return size?{width:size.inlineSize,height:size.blockSize}:{width:element.getBoundingClientRect().width,height:element.getBoundingClientRect().height};
}
new ResizeObserver(entries=>{const entry=entries[0];if(entry){const size=borderBoxSize(entry,stage);stageWidth=size.width;stageHeight=size.height;positionIndicator()}}).observe(stage);
new ResizeObserver(entries=>{const entry=entries[0];if(entry){const size=borderBoxSize(entry,indicator);indicatorWidth=size.width;indicatorHeight=size.height;positionIndicator()}}).observe(indicator);
function setText(selector:string,value:string){const node=document.querySelector<HTMLElement>(selector)!;if(node.textContent!==value)node.textContent=value}
STATIONS.forEach((station,i)=>{const b=document.createElement('button');b.type='button';b.className='destination';b.textContent=`${i+1}. ${station.name}`;b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>{state=selectDestination(state,station.id);refresh()});destinationList.append(b)});
function refresh(){
 const dest=STATIONS.find(s=>s.id===state.selectedDestination), station=STATIONS.find(s=>s.id===state.currentStation)!;
 setText('#system-name',getSystem(station.systemId));
 setText('#message',state.message);
  setText('#station-title',state.docked?station.name:'Sin estaci\u00f3n atracada');
  setText('#station-lore',state.docked?'Contratos disponibles en esta estaci\u00f3n.':'Atraque en una estaci\u00f3n para consultar sus contratos.');
  const offer=state.docked?queryOffer(state,station.id):{kind:'none' as const};
  const contract=offer.kind==='offer'?offer:state.phase!=='offer'?{cargo:FIXTURE.cargo,quantity:FIXTURE.quantity,destination:'station-1b',reward:FIXTURE.reward}:null;
   setText('#offer',contract?`${contract.cargo} \u00d7 ${contract.quantity} \u00b7 Destino: ${STATIONS.find(s=>s.id===contract.destination)?.name} \u00b7 Recompensa ${contract.reward} CR`:'No hay contrato disponible en esta estaci\u00f3n.');
   setText('#cargo',`Estado del contrato: ${state.phase==='offer'?'disponible':state.phase==='loaded'?'activo \u00b7 carga a bordo':'completado \u00b7 entrega realizada'}`);
  setText('#station-status',state.docked?`Atracado \u00b7 ${station.name}`:'En vuelo \u00b7 sin atraque');
  setText('#inventory',`Origen ${state.originStock} \u00b7 A bordo ${state.shipCargo} \u00b7 Destino ${state.destinationStock}`);
  setText('#credits',`Cr\u00e9ditos: ${state.credits}`);
  const distance=dest?Math.hypot(dest.position.x-state.position.x,dest.position.y-state.position.y):0;
   setText('#distance',dest?`Destino: ${dest.name} \u00b7 Distancia ${distance.toFixed(0)} u`:'Selecciona una estaci\u00f3n de destino.');

    if(dest){const dx=dest.position.x-state.position.x,dy=dest.position.y-state.position.y;const directions:string[]=[];if(dx<0)directions.push('izquierda');else if(dx>0)directions.push('derecha');if(dy<0)directions.push('arriba');else if(dy>0)directions.push('abajo');setText('#target-direction',directions.length?`Direcci\u00f3n al destino: ${directions.join(' y ')}.`:'Est\u00e1s en el destino.');indicator.hidden=false;setText('#destination-indicator',`\u25ce ${dest.name} \u00b7 ${distance.toFixed(0)} u`);
     // Keep the visual bearing, but clamp the complete measured label inside the canvas.
     positionIndicator();
   }else{setText('#target-direction','');indicator.hidden=true}
  const q=state.quantum; setText('#quantum-state',`${q==='inactive'?(dest?(distance>=FIXTURE.minQuantumDistance?'Salto cu\u00e1ntico disponible.':'Cerca del destino: crucero manual.'):'Sin destino seleccionado.'):{aligning:'Alinea la nave con el destino.',charging:`Carga ${state.chargeTicks}/${FIXTURE.quantumChargeTicks}.`,ready:'Listo: confirma el salto.',cruising:'Crucero manual activo.',arriving:'Llegada a zona pr\u00f3xima.'}[q]}`);
 document.querySelectorAll<HTMLButtonElement>('.destination').forEach((b,i)=>b.setAttribute('aria-pressed',String(STATIONS[i].id===state.selectedDestination)));
 stationMarkers.forEach((marker,i)=>marker.classList.toggle('is-destination',STATIONS[i].id===state.selectedDestination));
 shipMarker.style.left=`${5+state.position.x/1300*90}%`;shipMarker.style.top=`${8+state.position.y/750*74}%`;
  setText('#map-position',`Nave ${state.position.x.toFixed(0)}, ${state.position.y.toFixed(0)} \u00b7 Destino ${dest?.name??'ninguno'}`);
  const quantumButton=document.querySelector<HTMLButtonElement>('#quantum')!; quantumButton.textContent=q==='cruising'?'Desactivar crucero':q==='aligning'||q==='charging'||q==='ready'?'Modo cu\u00e1ntico en curso':'Activar crucero / cu\u00e1ntico';
  quantumButton.setAttribute('aria-pressed',String(q!=='inactive'));
  quantumButton.toggleAttribute('disabled',['aligning','charging','ready'].includes(q)); document.querySelector('#confirm')!.toggleAttribute('disabled',q!=='ready');
 document.querySelector('#dock')!.textContent=dest?`Solicitar atraque: ${dest.name}`:'Solicitar atraque en destino';
 document.querySelector('#accept')!.toggleAttribute('disabled',!state.docked||station.id!=='station-1a'||state.phase!=='offer'); document.querySelector('#deliver')!.toggleAttribute('disabled',!state.docked||station.id!=='station-1b'||state.phase!=='loaded');
}
document.querySelectorAll<HTMLButtonElement>('[data-vector]').forEach(b=>{const [x,y]=b.dataset.vector!.split(',').map(Number);let timer=0,pressed=false;b.addEventListener('pointerdown',e=>{pressed=true;e.preventDefault();state=update(state,.08,{x,y});refresh();timer=window.setInterval(()=>{state=update(state,.08,{x,y});refresh()},80)});const stop=()=>{clearInterval(timer);timer=0;pressed=false};b.addEventListener('click',e=>{if(!pressed&&e.detail===0){state=update(state,.08,{x,y});refresh()}});b.addEventListener('pointerup',stop);b.addEventListener('pointerleave',stop);b.addEventListener('pointercancel',stop)});
document.querySelector('#quantum')!.addEventListener('click',()=>{state=startQuantumMode(state);refresh()}); document.querySelector('#confirm')!.addEventListener('click',()=>{state=confirmQuantum(state);refresh()});
document.querySelector('#dock')!.addEventListener('click',()=>{if(state.selectedDestination)state=requestDock(state,state.selectedDestination);refresh()}); document.querySelector('#accept')!.addEventListener('click',()=>{state=accept(state);refresh()}); document.querySelector('#deliver')!.addEventListener('click',()=>{state=deliver(state);refresh()});
const held=new Set<string>(),vectors:Record<string,[number,number]>={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
window.addEventListener('keydown',e=>{if(e.key in vectors&&(e.target===canvas||e.target===document.body)){e.preventDefault();held.add(e.key)}}); window.addEventListener('keyup',e=>held.delete(e.key)); window.addEventListener('blur',()=>held.clear());
let previous=performance.now();function frame(now:number){const dt=Math.min((now-previous)/1000,.05);previous=now;let x=0,y=0;for(const key of held){x+=vectors[key][0];y+=vectors[key][1]}if(x||y||['aligning','charging','cruising','arriving'].includes(state.quantum)){state=update(state,dt,{x,y});refresh()}ship.position.set(state.position.x,0,state.position.y);camera.position.set(state.position.x,42,state.position.y-48);camera.lookAt(state.position.x,0,state.position.y);stars.position.set(state.position.x,0,state.position.y);renderer.render(scene,camera);requestAnimationFrame(frame)}
function resize(){const {clientWidth:w,clientHeight:h}=canvas;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}new ResizeObserver(resize).observe(canvas);window.addEventListener('resize',resize);resize();refresh();requestAnimationFrame(frame);window.addEventListener('pagehide',()=>{renderer.dispose();starGeometry.dispose()});
