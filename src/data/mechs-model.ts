import { Concealment } from '~src/base/interfaces/base';
import { IMechModel } from '~src/base/interfaces/mech';
export type MechDataLoad = [
  string,
  number,
  number,
  number,
  number,
  number,
  Concealment,
  [number, number],
];
export function factory(data: MechDataLoad[]): IMechModel[] {
  return data.map(createOne);
  function createOne(data: MechDataLoad): IMechModel {
    return {
      NAME: data[0],
      MAX_HEALTH: data[1],
      MAX_ENERGY: data[2],
      MAX_POWER: data[3],
      ATTACK_POWER: data[4],
      SPEED: data[5],
      CONCEALMENT: data[6],
      SIZE: { WIDTH: data[7][0], HEIGHT: data[7][1] },
    };
  }
}

export const data: IMechModel[] = factory([
  ['WA-01', 100, 1000, 1000, 1000, 1000, 10, [10, 10]],
  ['WA-02', 200, 1000, 1000, 1000, 1000, 10, [10, 10]],
  ['WA-03', 300, 1000, 1000, 1000, 1000, 10, [10, 10]],
  ['WA-04', 400, 1000, 1000, 1000, 1000, 10, [10, 10]],
  ['WA-05', 500, 1000, 1000, 1000, 1000, 10, [10, 10]],
  ['WA-06', 600, 1000, 1000, 1000, 1000, 10, [10, 10]],
]);
