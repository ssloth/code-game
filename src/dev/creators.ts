import { Scene } from 'phaser';
import { CircleMech } from '~src/game/main/mechs/circle-mech';
import data from '~src/data/data-load';
import { baseI, baseII, baseIII } from './chip';
import { BaseMech } from '~src/game/main/mechs/base-mech/index';

const base = [baseI, baseII, baseIII];

export default (scene: Scene) => {
  return {
    createMech: (m: string, bi: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0) =>
      new BaseMech({ sprite: 'mech-1', x: 0, y: 0 }, data.mechModels[m], base[bi]),
  };
};
