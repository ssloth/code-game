import Phaser, { Scene, Textures } from 'phaser';
import MainScene from '~src/game/main';
import { Concealment } from './interfaces/base';
import { IChip } from './interfaces/chip';
import { ICartesianCoordinate } from './interfaces/information';
import { IActionSequence, IMech, IMechModel, IMechState } from './interfaces/mech';

export class Mech implements IMech {
  static cid: number = 0;
  id: number;
  sprite: Phaser.GameObjects.Sprite;
  state: IMechState;
  actionSequence: IActionSequence;
  constructor(
    context: { scene: Scene; sprite: string },
    public model: IMechModel,
    public chip: IChip,
  ) {
    this.id = Mech.cid++;
    this.sprite = context.scene.add.sprite(0, 0, context.sprite);
    this.sprite.setSize(50, 50);
    context.scene.physics.add.existing(this.sprite);

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
    this.sprite.body.position.x = x;
    this.sprite.body.position.y = y;
    this.state.position = { x, y };
  }

  destroy() {
    this.sprite.destroy();
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
}
