export type SystemId = 'system-1';
export type PlanetId = 'planet-1' | 'planet-2';
export type StationId = 'station-1a' | 'station-1b' | 'station-1c' | 'station-2a' | 'station-2b' | 'station-2c';
export interface Point2 { /** Plano de vuelo: x horizontal, y vertical; no es altura. */ x: number; y: number }
export interface Planet { id: PlanetId; systemId: SystemId; name: string }
export interface Station { id: StationId; systemId: SystemId; planetId: PlanetId; name: string; position: Point2 }
export const SYSTEMS: ReadonlyArray<{id:SystemId;name:string}> = [{id:'system-1',name:'Sistema Aster'}];
export const PLANETS: ReadonlyArray<Planet> = [
  {id:'planet-1',systemId:'system-1',name:'Aster I'}, {id:'planet-2',systemId:'system-1',name:'Aster II'}
];
export const STATIONS: ReadonlyArray<Station> = [
  {id:'station-1a',systemId:'system-1',planetId:'planet-1',name:'Mercado Origen',position:{x:100,y:200}},
  {id:'station-1b',systemId:'system-1',planetId:'planet-1',name:'Puerto Nadir',position:{x:500,y:200}},
  {id:'station-1c',systemId:'system-1',planetId:'planet-1',name:'Dársena Lumen',position:{x:300,y:450}},
  {id:'station-2a',systemId:'system-1',planetId:'planet-2',name:'Puerto Boreal',position:{x:900,y:200}},
  {id:'station-2b',systemId:'system-1',planetId:'planet-2',name:'Estación Umbral',position:{x:1200,y:400}},
  {id:'station-2c',systemId:'system-1',planetId:'planet-2',name:'Muelle Cobalto',position:{x:900,y:650}}
];
