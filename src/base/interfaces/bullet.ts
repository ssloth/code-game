import { IBase, ICanAttach, ICanMove } from './base';
import { IAbsolutePosition } from './information';

export interface IBulletModel extends IBase, ICanMove, ICanAttach {}

export interface IBulletState extends IBase, ICanMove {
  position: IAbsolutePosition;
}

export interface IBullet {
  model: IBulletModel;
  state: IBulletState;
}
