import { Scene } from 'phaser';
import { CircleMech } from '~src/game/main/mechs/circle-mech';
import data from '~src/data/data-load';
import { baseI, baseII, baseIII } from './chip';
const base = [baseI, baseII, baseIII];
export default (scene: Scene) => {
  return {
    createMech: (m: string, bi: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0) =>
      new CircleMech(
        { sprite: 'mech-5', x: Math.random() * 500, y: 500 },
        data.mechModels[m],
        base[bi],
      ),
  };
};
