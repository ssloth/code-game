import { Concealment } from './interfaces/base';
import { IChip } from './interfaces/chip';
import { ICartesianCoordinate } from './interfaces/information';
import { IMech, IMechModel, IMechState } from './interfaces/mech';

export class Mech implements IMech {
  constructor(public model: IMechModel, public chip: IChip, public state: IMechState) {}
}

export class MechModel implements IMechModel {
  NAME!: string;
  MAX_ENERGY!: number;
  MAX_POWER!: number;
  MAX_HEALTH!: number;
  ATTACK_POWER!: number;
  SPEED!: number;
  CONCEALMENT!: Concealment
  SIZE!: { WIDTH: number; HEIGHT: number; };

  constructor(data: IMechModel) {
    Object.entries(data).forEach(([k, v]) => (this[k] = v));
  }

  move(position: ICartesianCoordinate): this {
    return this;
  }
}
