import Phaser from 'phaser';
import { computeDistance } from '.';

interface p {
  x: number;
  y: number;
}

export const computeXY = (
  origin: p,
  target: p,
  speed: number,
): { x: number; y: number; a?: number } => {
  if (computeDistance(origin, target) < speed) return target;
  const dx = target.x - origin.x;
  const dy = target.y - origin.y;
  const a = Math.atan2(dy, dx);
  return {
    x: origin.x + speed * Math.cos(a),
    y: origin.y + speed * Math.sin(a),
    a: a,
  };
};
