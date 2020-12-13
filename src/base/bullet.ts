import { Math, Physics } from 'phaser';
import { BaseImage } from './base';
import { IBulletModel } from './interfaces/bullet';

export abstract class Bullet extends BaseImage {
  constructor(
    sprite: string,
    public model: IBulletModel,
    info: { current: Math.Vector2; target: Math.Vector2 },
  ) {
    super(sprite, info.current.x, info.current.y);
    this.setDisplaySize(model.SIZE.WIDTH, model.SIZE.HEIGHT);
    this.setFrictionAir(0);
    this.setCollisionGroup(-1);
    const v = info.target.subtract(info.current).setLength(this.model.SPEED / 3);
    this.setVelocity(v.x, v.y);
    this.setSensor(true);
  }
}
