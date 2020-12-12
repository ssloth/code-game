import Phaser, { Scene, Textures } from 'phaser';
import MainScene from '~src/game/main';
import { computeXY } from '~src/utils/move';
import { Concealment } from './interfaces/base';
import { IChip } from './interfaces/chip';
import { IActionSequence, IMech, IMechModel, IMechState } from './interfaces/mech';

export class Mech extends Phaser.Physics.Arcade.Sprite implements IMech {
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

  _state: IMechState;
  actionSequence: IActionSequence;

  constructor(sprite: string, public model: IMechModel, public chip: IChip) {
    super(MainScene.scene, 0, 0, sprite);
    MainScene.scene.physics.add.existing(this);
    MainScene.scene.add.existing(this);

    this._state = {
      MODEL: this.model,
      health: this.model.MAX_HEALTH,
      status: [],
    };

    this.actionSequence = {};
  }

  update() {
    if (!this.body || !this.actionSequence.moveTarget) return;
    const speed = this.model.SPEED;
    const { x, y, a } = computeXY(this.body.position, this.actionSequence.moveTarget, speed);
    if (a) this.angle = (a * 180) / Math.PI;
    this.body.position.x = x;
    this.body.position.y = y;
  }

  destroy() {
    super.destroy();
    Mech.destroy(this);
  }

  attach(x: number, y: number) {
    
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
