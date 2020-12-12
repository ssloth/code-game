import { Scene } from 'phaser';
import { IAbsolutePosition } from '~src/base/interfaces/information';
import { Mech } from '~src/base/mech';
import MainScene from '~src/game/main';
import { bulletModelData } from '~src/data/bullet-model';
import { Bullet } from '~src/base/bullet';

export const move = (mech: Mech, position: IAbsolutePosition) => {
  mech.actionSequence.moveTarget = { ...position };
};

export const attach = (mech: Mech, target: IAbsolutePosition) => {
  const scene = MainScene.scene;
  const { angle } = mech;
  const { x, y } = mech.body;
  const current = {
    x: x + 10 * Math.cos((angle * Math.PI) / 180),
    y: y + 10 * Math.sin((angle * Math.PI) / 180),
  };
  scene.gameCore.addBullet(
    Bullet.create('plasma', bulletModelData[0], {
      position: current,
      target: target,
    }),
  );
};
