import { Scene } from 'phaser';
import { BaseMech } from '~src/game/main/mechs/base-mech';
import data from '~src/data/data-load';
import { baseI, baseII, baseIII } from './chip';
const base = [baseI, baseII, baseIII];
export default (scene: Scene) => {
  return {
    createMech: (m: string, bi: 0 | 1 | 2 = 0) =>
      new BaseMech(
        { sprite: 'bullet', x: Math.random() * 500, y: Math.random() * 500 },
        data.mechModels[m],
        base[bi],
      ),
  };
};
