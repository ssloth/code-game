import { IBase, ICanAttach, ICanBeAttacked, ICanMove } from './base';
import { IChip } from './chip';
import { IAbsolutePosition } from './information';

export interface IMechModel extends ICanBeAttacked, ICanAttach, ICanMove, IBase {
  // 型号名称
  readonly NAME: string;
  // 最大储能
  readonly MAX_ENERGY: number;
  // 最大功率
  readonly MAX_POWER: number;
}

export interface IMechState {
  // 装甲型号
  readonly MODEL: IMechModel;
  // 生命值
  health: number;
  // 状态
  status: any;
  // 当前位置信息
  position: IAbsolutePosition;
}

export interface IActionSequence {
  moveTarget?: IAbsolutePosition;
}

export interface IMech {
  model: IMechModel;
  chip: IChip;
  state: IMechState;
  actionSequence: IActionSequence;
  sprite: Phaser.GameObjects.Sprite;
}
