import { Scene } from 'phaser';
import { Mech } from '~src/base/mech';
import { mechModelData } from '~src/data/mechs-model';
import { base } from './chip';

export default (scene: Scene) => {
  return {
    createMech: (index: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0) => {
      const mech = Mech.create('bullet', mechModelData[index], base);

      return mech;
    },
  };
};
