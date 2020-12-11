interface p {
  x: number;
  y: number;
}

export const computeDistance = (p1: p, p2: p) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
