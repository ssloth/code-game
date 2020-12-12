import { Scene } from 'phaser';
import MainScene from '~src/game/main';
import { computeXY } from '~src/utils/move';
import { Concealment } from './interfaces/base';
import { IBulletModel, IBullet, IBulletState } from './interfaces/bullet';
import { ICartesianCoordinate } from './interfaces/information';

export class Bullet extends Phaser.Physics.Arcade.Sprite implements IBullet {
  static instances: Bullet[] = [];

  static create(sprite: string, model: IBulletModel, state: IBulletState) {
    const bullet = new Bullet(sprite, model, state);
    Bullet.instances.push(bullet);
    return bullet;
  }

  static destroy(bullet: Bullet) {
    const index = Bullet.instances.indexOf(bullet);
    Bullet.instances.splice(index, 1);
  }

  private constructor(sprite: string, public model: IBulletModel, public _state: IBulletState) {
    super(MainScene.scene, _state.position.x, _state.position.y, sprite);
    MainScene.scene.physics.add.existing(this);
    MainScene.scene.add.existing(this);
    this.body.setSize(10, 10);
  }

  update() {
    if (!this.body) return;
    const speed = this.model.SPEED;
    const { x, y, a } = computeXY(this.body.position, this._state.target, speed);
    this.body.position.x = x;
    this.body.position.y = y;
    if (!a) return this.destroy();
    this.setAngle((a * 180) / Math.PI);
  }

  destroy() {
    super.destroy();
    Bullet.destroy(this);
  }
}

export class BulletModel implements IBulletModel {
  ATTACK_POWER!: number;
  CONCEALMENT!: Concealment;
  SIZE!: { WIDTH: number; HEIGHT: number };
  SPEED!: number;

  constructor(data: IBulletModel) {
    Object.entries(data).forEach(([k, v]) => (this[k] = v));
  }

  move(position: ICartesianCoordinate): this {
    return this;
  }
}
