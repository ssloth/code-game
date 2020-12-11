import { IBase, ICanAttach, ICanMove } from './base';
import { IAbsolutePosition } from './information';

export interface IBulletModel extends IBase, ICanMove, ICanAttach {}

export interface IBulletState {
  position: IAbsolutePosition;
  target: IAbsolutePosition;
}

export interface IBullet {
  sprite: Phaser.GameObjects.Sprite;
  model: IBulletModel;
  state: IBulletState;
}
