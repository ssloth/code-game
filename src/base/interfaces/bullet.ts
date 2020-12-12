import { IBase, ICanAttach, ICanMove } from './base';
import { IAbsolutePosition } from './information';

export interface IBulletModel extends IBase, ICanMove, ICanAttach {}

export interface IBulletState {
  position: IAbsolutePosition;
  target: IAbsolutePosition | IAbsolutePosition;
}

export interface IBullet extends Phaser.GameObjects.Sprite {
  model: IBulletModel;
  _state: IBulletState;
}
