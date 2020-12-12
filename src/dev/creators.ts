import { Scene } from 'phaser';
import { BaseMech } from '~src/game/main/mechs/base-mech';
import data from '~src/data/data-load';
import { base } from './chip';
export default (scene: Scene) => {
  return {
    createMech: (index: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0) =>
      new BaseMech('bullet', data.mechModels['M-1'], base),
  };
};
