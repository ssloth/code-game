import { Scene } from 'phaser';
import { IAbsolutePosition } from '~src/base/interfaces/information';
import { Mech } from '~src/base/mech';
import MainScene from '~src/game/main';
import { bulletModelData } from '~src/data/bullet-model';
import { Bullet } from '~src/base/bullet';

export const move = (mech: Mech, position: IAbsolutePosition) => {
  mech.actionSequence.moveTarget = { ...position };
};

export const attach = (mech: Mech, position: IAbsolutePosition) => {
  const scene = MainScene.scene;
  scene.gameCore.addBullet(
    new Bullet({ scene, sprite: 'plasma' }, bulletModelData[0], {
      position: mech.state.position,
      target: position,
    }),
  );
};
