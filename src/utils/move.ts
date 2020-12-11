interface p {
  x: number;
  y: number;
}

export const computeXY = (origin: p, target: p, speed: number) => {
  const dx = target.x - origin.x;
  const dy = target.y - origin.y;
  const a = Math.atan2(dy, dx);
  return { x: origin.x + speed * Math.sin(a), y: origin.y + speed * Math.cos(a), a };
};
