import { Concealment } from '~src/base/interfaces/base';
import { IBulletModel } from '~src/base/interfaces/bullet';
import { IMechModel } from '~src/base/interfaces/mech';
export type BulletDataLoad = [number, number, Concealment, [number, number]];
export function factory(data: BulletDataLoad[]): IBulletModel[] {
  return data.map(createOne);
  function createOne(data: BulletDataLoad): IBulletModel {
    return {
      ATTACK_POWER: data[0],
      SPEED: data[1],
      CONCEALMENT: data[2],
      SIZE: { WIDTH: data[3][0], HEIGHT: data[3][1] },
    };
  }
}

export const data: IBulletModel[] = factory([
  [100, 1000, 0, [10, 10]],
  [200, 1000, 0, [10, 10]],
  [300, 1000, 0, [10, 10]],
  [400, 1000, 0, [10, 10]],
  [500, 1000, 0, [10, 10]],
  [600, 1000, 0, [10, 10]],
]);
