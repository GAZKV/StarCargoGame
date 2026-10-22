import {test} from 'node:test'; import {strict as assert} from 'node:assert';
import {accept,deliver,dock,initialState,move,type State} from './game.ts';

function deepFreeze<T>(value:T):T {
  if(value && typeof value==='object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for(const child of Object.values(value as Record<string,unknown>)) deepFreeze(child);
  }
  return value;
}

function doesNotMutate<T>(input:T, operation:(value:T)=>unknown):void {
  const before=structuredClone(input);
  deepFreeze(input);
  operation(input);
  assert.deepEqual(input,before);
}

test('input neutral no despega; pilotaje sí',()=>{
 const parked=initialState();
 assert.equal(move(parked,0.05,0,0).docked,'origin');
 assert.equal(move(parked,0.05,1,0).docked,null);
});
test('estar atracado en origen no permite entregar el contrato',()=>{
  const loaded=accept(initialState());
  const result=deliver(loaded);
  assert.match(result.message,/Mercado Destino requerido/);
  assert.equal(result.phase,'loaded');assert.equal(result.shipCargo,1);assert.equal(result.destinationStock,0);assert.equal(result.credits,0);
});
test('reaceptar un contrato aceptado no modifica stock ni carga',()=>{
  const loaded=accept(initialState());
  const repeated=accept(loaded);
  assert.equal(repeated.phase,'loaded');assert.equal(repeated.originStock,loaded.originStock);assert.equal(repeated.shipCargo,loaded.shipCargo);
});
test('no acepta fuera del origen ni atraca rápido',()=>{let s:State={...initialState(),docked:null};assert.match(accept(s).message,/atraque/);s={...initialState(),velocity:{x:20,y:0}};assert.match(dock(s,'origin',{x:100,y:200}).message,/velocidad/)});

test('accept no muta el estado anidado en éxito ni en rechazos',()=>{
  const cases:State[]=[initialState(),{...initialState(),docked:null},{...initialState(),originStock:0},{...initialState(),phase:'loaded',originStock:0,shipCargo:1}];
  for(const state of cases) doesNotMutate(state,s=>accept(s));
  assert.equal(accept(initialState()).shipCargo,1);
  assert.match(accept({...initialState(),docked:null}).message,/atraque/);
  assert.match(accept({...initialState(),originStock:0}).message,/stock/);
  assert.match(accept({...initialState(),phase:'loaded'}).message,/ya fue aceptado/);
});

test('move no muta posición ni velocidad en movimiento ni con input neutral',()=>{
  const moving:State={...initialState(),position:{x:123,y:234},velocity:{x:2,y:-3}};
  doesNotMutate(moving,s=>move(s,0.05,1,-1));
  doesNotMutate(initialState(),s=>move(s,0.05,0,0));
  assert.notDeepEqual(move(moving,0.05,1,-1).position,moving.position);
});

test('dock no muta estado ni punto de atraque al aceptar o rechazar',()=>{
  const state:State={...initialState(),position:{x:100,y:200},velocity:{x:2,y:1}};
  const port={x:105,y:205};
  doesNotMutate({state,port},input=>dock(input.state,'destination',input.port));
  const distant={x:500,y:200};
  doesNotMutate({state,port:distant},input=>dock(input.state,'destination',input.port));
  const fast:State={...state,velocity:{x:20,y:0}};
  doesNotMutate({state:fast,port},input=>dock(input.state,'destination',input.port));
  assert.equal(dock(state,'destination',port).docked,'destination');
  assert.match(dock({...state,position:{x:500,y:200}},'destination',port).message,/distancia/);
  assert.match(dock(fast,'destination',port).message,/velocidad/);
});

test('deliver no muta estado anidado en éxito ni en rechazos',()=>{
  const loaded:State={...initialState(),phase:'loaded',originStock:0,shipCargo:1};
  const ready:State={...loaded,docked:'destination'};
  for(const state of [loaded,ready,initialState(),{...ready,shipCargo:0}]) doesNotMutate(state,s=>deliver(s));
  assert.equal(deliver(ready).phase,'delivered');
  assert.match(deliver(loaded).message,/Mercado Destino requerido/);
  assert.match(deliver(initialState()).message,/no hay contrato/);
  assert.match(deliver({...ready,shipCargo:0}).message,/falta la mercancía/);
});
