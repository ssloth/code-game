import { IBase, ICanAttach } from './base';
import { IAbsolutePosition } from './information';

export interface IBulletModel extends IBase, ICanAttach {
  SPEED: number
}

export interface IBulletState {
  position: IAbsolutePosition;
  target: IAbsolutePosition | IAbsolutePosition;
}

export interface IBullet extends Phaser.GameObjects.Sprite {
  model: IBulletModel;
  _state: IBulletState;
}
