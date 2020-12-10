import Phaser, { Scene, Textures } from 'phaser';
import { Concealment } from './interfaces/base';
import { IChip } from './interfaces/chip';
import { ICartesianCoordinate } from './interfaces/information';
import { IActionSequence, IMech, IMechModel, IMechState } from './interfaces/mech';

export class Mech implements IMech {
  sprite: Phaser.GameObjects.Sprite;
  state: IMechState;
  actionSequence: IActionSequence;
  constructor(
    context: { scene: Scene; texture: Textures.Texture },
    public model: IMechModel,
    public chip: IChip,
  ) {
    this.sprite = context.scene.add.sprite(0, 0, 'logo');
    this.state = {
      MODEL: this.model,
      health: this.model.MAX_HEALTH,
      position: {
        x: this.sprite.x,
        y: this.sprite.y,
      },
      status: [],
    };
    this.actionSequence = {};
  }

  setPosition(x: number, y: number) {
    this.sprite.x = x;
    this.sprite.y = y;
    this.state.position = { x, y };
  }
}

export class MechModel implements IMechModel {
  NAME!: string;
  MAX_ENERGY!: number;
  MAX_POWER!: number;
  MAX_HEALTH!: number;
  ATTACK_POWER!: number;
  SPEED!: number;
  CONCEALMENT!: Concealment;
  SIZE!: { WIDTH: number; HEIGHT: number };

  constructor(data: IMechModel) {
    Object.entries(data).forEach(([k, v]) => (this[k] = v));
  }

  move(position: ICartesianCoordinate): this {
    return this;
  }
}
