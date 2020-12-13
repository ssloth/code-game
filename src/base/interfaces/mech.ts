import { IBase, ICanAttach, ICanBeAttacked } from './base';
import { IAbsolutePosition } from './information';

export interface IMechModel extends ICanBeAttacked, ICanAttach, IBase {
  // 型号名称
  readonly NAME: string;
  // 最大储能
  readonly MAX_ENERGY: number;
  // 最大功率
  readonly MAX_POWER: number;
  // 最大推力
  readonly MAX_THRUST: number;
  // 最大速度
  readonly MAX_SPEED: number;
}

export interface IMechState {
  // 生命值
  health: number;
  // 状态
  status: any;
}

export interface IActionSequence {
  moveTarget?: IAbsolutePosition;
}

export interface IMech {
  model: IMechModel;
  chip: IChip;
  _state: IMechState;
}

export interface IChip {
  AI: (information: any, operations: any) => void;
}
