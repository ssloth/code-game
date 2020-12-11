import { Scene } from 'phaser';
import { Concealment } from './interfaces/base';
import { IBulletModel, IBullet, IBulletState } from './interfaces/bullet';
import { ICartesianCoordinate } from './interfaces/information';

export class Bullet implements IBullet {
  sprite: Phaser.GameObjects.Sprite;
  destroy: boolean;
  constructor(
    context: { scene: Scene; sprite: string },
    public model: IBulletModel,
    public state: IBulletState,
  ) {
    this.sprite = context.scene.add.sprite(0, 0, context.sprite);
    this.destroy = false;
  }
  setPosition(x: number, y: number) {
    this.sprite.x = x;
    this.sprite.y = y;
    this.state.position = { x, y };
  }

  hit() {
    this.destroy = false;
    this.sprite.destroy();
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
