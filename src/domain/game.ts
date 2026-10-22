import { STATIONS, type StationId, type Point2 } from '../content/universe.ts';
export type Phase = 'offer' | 'loaded' | 'delivered';
export type QuantumPhase = 'inactive' | 'aligning' | 'charging' | 'ready' | 'cruising' | 'arriving';
export interface State {
  phase: Phase; originStock:number; shipCargo:number; destinationStock:number; credits:number;
  position:Point2; velocity:Point2; docked:StationId|'origin'|'destination'|null; message:string;
  currentStation:StationId; selectedDestination:StationId|null; quantum:QuantumPhase; chargeTicks:number;
  /** Fixture: fuel and permanent fuel/cost rules are not modeled yet. */ fuelModel:'not-modeled';
}
/** Deterministic reversible fixture parameters; not balance values. */
export const FIXTURE = {cargo:'Módulo genérico',quantity:1,reward:100,dockRadius:24,maxDockSpeed:12,acceleration:10,drag:1,
  alignmentThreshold:0.96,quantumChargeTicks:3,cruiseSpeed:180,dockSpeed:8,minQuantumDistance:250,arrivalOffset:80} as const;
const station=(id:StationId)=>STATIONS.find(s=>s.id===id)!;
export function initialState():State {return {phase:'offer',originStock:1,shipCargo:0,destinationStock:0,credits:0,position:{...station('station-1a').position},velocity:{x:0,y:0},docked:'origin',message:'Contrato disponible en Mercado Origen.',currentStation:'station-1a',selectedDestination:null,quantum:'inactive',chargeTicks:0,fuelModel:'not-modeled'};}
export function move(s:State,dt:number,dx:number,dy:number):State {
 if(!Number.isFinite(dt)||dt<=0)return s;
 const x=s.velocity.x+dx*FIXTURE.acceleration*dt,y=s.velocity.y+dy*FIXTURE.acceleration*dt;
  if(dx===0&&dy===0&&x===0&&y===0)return s;
 return {...s,docked:null,currentStation:s.currentStation,velocity:{x,y},position:{x:s.position.x+x*dt,y:s.position.y+y*dt},message:'Vuelo local.'};
}
export function selectDestination(s:State,id:StationId):State {if(id===s.currentStation)return {...s,message:'Selecciona otra estación.'};return {...s,selectedDestination:id,quantum:'inactive',chargeTicks:0,message:`Destino seleccionado: ${station(id).name}.`};}
export function startQuantumMode(s:State):State {if(s.quantum==='cruising')return {...s,quantum:'inactive',chargeTicks:0,message:'Modo crucero desactivado; vuelo manual.'};if(!s.selectedDestination)return {...s,message:'Selecciona un destino primero.'};const d=station(s.selectedDestination),distance=Math.hypot(d.position.x-s.position.x,d.position.y-s.position.y);if(distance<FIXTURE.minQuantumDistance)return {...s,quantum:'cruising',chargeTicks:0,message:'Modo crucero activo: vuelo acelerado, sin salto por distancia insuficiente.'};return {...s,quantum:'aligning',chargeTicks:0,message:'Modo crucero activo: oriéntate y alinéate con el destino.'};}
export function update(s:State,dt:number,input:Point2={x:0,y:0}):State {
   if(!Number.isFinite(dt)||dt<=0)return s;
   const near=s.quantum==='cruising'&&s.selectedDestination!==null&&Math.hypot(station(s.selectedDestination).position.x-s.position.x,station(s.selectedDestination).position.y-s.position.y)<FIXTURE.minQuantumDistance;
   let n:State;
   if(near){
     // El modo solo amplifica el empuje manual; nunca dirige ni avanza por sí mismo.
      const scale=(input.x!==0||input.y!==0)?FIXTURE.cruiseSpeed/FIXTURE.acceleration:1;
      n=move(s,dt,input.x*scale,input.y*scale);
   } else n=s.quantum==='cruising'||s.quantum==='arriving'?s:move(s,dt,input.x,input.y);
 if(n.quantum==='aligning'||n.quantum==='charging'){
  if(!n.selectedDestination)return {...n,quantum:'inactive'};
   const target=station(n.selectedDestination).position,dx=target.x-n.position.x,dy=target.y-n.position.y,len=Math.hypot(dx,dy)||1;
   if(len<FIXTURE.minQuantumDistance)return {...n,quantum:'aligning',chargeTicks:0,message:'Distancia insuffisante para salto; continúa en crucero.'};
  const alignment=(n.velocity.x*dx+n.velocity.y*dy)/(Math.hypot(n.velocity.x,n.velocity.y)*len||1);
  if(alignment<FIXTURE.alignmentThreshold)return {...n,quantum:'aligning',chargeTicks:0,message:'Alineación insuficiente.'};
  const ticks=n.chargeTicks+1,ready=ticks>=FIXTURE.quantumChargeTicks;
  n={...n,quantum:ready?'ready':'charging',chargeTicks:ticks,message:ready?'Crucero cargado; confirma de nuevo para iniciar.':'Cargando crucero cuántico.'};
 }
  return n;
}
export function confirmQuantum(s:State):State {if(s.quantum!=='ready')return {...s,message:'Crucero no listo: requiere modo activo, alineación y carga completa.'};if(!s.selectedDestination)return {...s,quantum:'inactive',message:'Salto bloqueado: selecciona un destino.'};const dest=station(s.selectedDestination),dx=dest.position.x-s.position.x,dy=dest.position.y-s.position.y,d=Math.hypot(dx,dy);if(d<FIXTURE.minQuantumDistance)return {...s,quantum:'inactive',message:'Salto bloqueado: distancia inferior al umbral; usa crucero.'};const remaining=Math.max(0,d-FIXTURE.arrivalOffset);return {...s,position:{x:s.position.x+dx/d*remaining,y:s.position.y+dy/d*remaining},quantum:'inactive',chargeTicks:0,docked:null,message:`Salto completado; llegada próxima a ${dest.name}. Atraque manual requerido.`};}
export function dock(s:State,port:StationId|'origin'|'destination',p?:Point2):State {
 const id:StationId=port==='origin'?'station-1a':port==='destination'?'station-1b':port,point=p??station(id).position;
 const dist=Math.hypot(s.position.x-point.x,s.position.y-point.y),speed=Math.hypot(s.velocity.x,s.velocity.y);
 if(dist>FIXTURE.dockRadius)return {...s,message:`Atraque rechazado: distancia ${dist.toFixed(1)} > ${FIXTURE.dockRadius}.`};
 if(speed>FIXTURE.maxDockSpeed)return {...s,message:`Atraque rechazado: velocidad ${speed.toFixed(1)} > ${FIXTURE.maxDockSpeed}.`};
 return {...s,position:{...point},velocity:{x:0,y:0},docked:port==='origin'?'origin':port==='destination'?'destination':id,currentStation:id,message:`Atraque correcto en ${station(id).name}.`};
}
export function requestDock(s:State,id:StationId):State {if(s.selectedDestination!==id&&s.currentStation!==id)return {...s,message:'Destino de atraque no seleccionado.'};return dock(s,id);}
export function queryOffer(s:State,id:StationId):{kind:'offer';origin:StationId;destination:StationId;cargo:string;quantity:number;reward:number}|{kind:'none'} {
 return id==='station-1a'&&s.phase==='offer'?{kind:'offer',origin:'station-1a',destination:'station-1b',cargo:FIXTURE.cargo,quantity:1,reward:FIXTURE.reward}:{kind:'none'};
}
export function accept(s:State):State {
 if(s.phase!=='offer')return {...s,message:'Error: el contrato ya fue aceptado.'};if(s.docked!=='station-1a'&&s.docked!=='origin')return {...s,message:'Error: atraque en Mercado Origen requerido.'};if(s.originStock<FIXTURE.quantity)return {...s,message:'Error: stock insuficiente en origen.'};if(s.shipCargo+1>1)return {...s,message:'Error: capacidad de bodega insuficiente.'};
 return {...s,phase:'loaded',originStock:s.originStock-1,shipCargo:s.shipCargo+1,message:'Contrato aceptado: carga embarcada automáticamente.'};
}
export function deliver(s:State):State {if(s.phase!=='loaded')return {...s,message:'Error: no hay contrato cargado pendiente.'};if(s.docked!=='station-1b'&&s.docked!=='destination')return {...s,message:'Error: atraque en Mercado Destino requerido.'};if(s.shipCargo<1)return {...s,message:'Error: falta la mercancía contratada.'};return {...s,phase:'delivered',shipCargo:s.shipCargo-1,destinationStock:s.destinationStock+1,credits:s.credits+FIXTURE.reward,message:`Entrega completada: +${FIXTURE.reward} créditos.`};}
