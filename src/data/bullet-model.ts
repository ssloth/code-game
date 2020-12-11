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

export const bulletModelData: IBulletModel[] = factory([
  [100, 5, 0, [10, 10]],
  [200, 5, 0, [10, 10]],
  [300, 5, 0, [10, 10]],
  [400, 5, 0, [10, 10]],
  [500, 5, 0, [10, 10]],
  [600, 5, 0, [10, 10]],
]);
