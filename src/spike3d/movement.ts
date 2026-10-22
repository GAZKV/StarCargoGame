export type MovementAction = 'forward' | 'backward' | 'turn-left' | 'turn-right';
export interface Pose { x: number; z: number; rotation: number }
export const PORT_POSITION = { x: 3, z: 0 } as const;
export const INITIAL_POSE: Pose = { x: -3, z: 0, rotation: Math.PI / 2 };
export const STEP = 0.35;
export const TURN_STEP = Math.PI / 12;

export function applyAction(pose: Pose, action: MovementAction): Pose {
  if (action === 'turn-left') return { ...pose, rotation: pose.rotation + TURN_STEP };
  if (action === 'turn-right') return { ...pose, rotation: pose.rotation - TURN_STEP };
  const direction = action === 'forward' ? 1 : -1;
  return { ...pose, x: pose.x + Math.sin(pose.rotation) * STEP * direction, z: pose.z + Math.cos(pose.rotation) * STEP * direction };
}

export function distanceToPort(pose: Pose): number {
  return Math.hypot(PORT_POSITION.x - pose.x, PORT_POSITION.z - pose.z);
}
