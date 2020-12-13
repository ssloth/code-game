import { IBase, ICanAttach } from './base';
import { IAbsolutePosition } from './information';

export interface IBulletModel extends IBase, ICanAttach {
  SPEED: number
}
