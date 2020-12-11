import Phaser, { Scene, Textures } from 'phaser';
import MainScene from '~src/game/main';
import { Concealment } from './interfaces/base';
import { IChip } from './interfaces/chip';
import { IActionSequence, IMech, IMechModel, IMechState } from './interfaces/mech';

export class Mech implements IMech {
  static instances: Mech[] = [];

  static create(sprite: string, model: IMechModel, state: IChip) {
    const mech = new Mech(sprite, model, state);
    Mech.instances.push(mech);
    return mech;
  }

  static destroy(mech: Mech) {
    const index = Mech.instances.indexOf(mech);
    Mech.instances.splice(index, 1);
  }

  sprite: Phaser.Physics.Arcade.Sprite;
  state: IMechState;
  actionSequence: IActionSequence;

  constructor(sprite: string, public model: IMechModel, public chip: IChip) {
    this.sprite = MainScene.scene.physics.add.sprite(0, 0, sprite);
    MainScene.scene.physics.add.existing(this.sprite);

    this.state = {
      MODEL: this.model,
      health: this.model.MAX_HEALTH,
      status: [],
    };

    this.actionSequence = {};
  }

  destroy() {
    Mech.destroy(this);
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
