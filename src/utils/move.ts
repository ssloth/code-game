interface p {
  x: number;
  y: number;
}

export const computeXY = (origin: p, target: p, speed: number) => {
  const dx = target.x - origin.x;
  const dy = target.y - origin.y;
  if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
    return { ...target };
  }
  return {
    x: origin.x + (dx > 0 ? speed : -speed) * (dx ** 2 / (dx ** 2 + dy ** 2)),
    y: origin.y + (dy > 0 ? speed : -speed) * (dy ** 2 / (dx ** 2 + dy ** 2)),
  };
};
