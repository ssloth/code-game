import { Game, Scene, GameObjects } from 'phaser';
import { Mech } from '~src/base/mech';
import { data as mechModels } from '~src/data/mechs-model';
import { base } from './chip';

export default (game: Game, scene: Scene) => {
  return {
    createMech: (index: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0) => {
      const mech = new Mech(
        { scene, texture: scene.textures.get('logo') },
        mechModels[index],
        base,
      );

      return mech;
    },
  };
};
