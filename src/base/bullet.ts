import { Scene } from 'phaser';
import MainScene from '~src/game/main';
import { Concealment } from './interfaces/base';
import { IBulletModel, IBullet, IBulletState } from './interfaces/bullet';
import { ICartesianCoordinate } from './interfaces/information';

export class Bullet implements IBullet {
  sprite: Phaser.Physics.Arcade.Sprite;
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

  private constructor(sprite: string, public model: IBulletModel, public state: IBulletState) {
    this.sprite = MainScene.scene.physics.add.sprite(0, 0, sprite);
    MainScene.scene.physics.add.existing(this.sprite);
  }

  destroy() {
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
