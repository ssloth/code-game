import { BaseImage } from './base';
import { IBulletModel } from './interfaces/bullet';

export abstract class Bullet extends BaseImage {
  constructor(
    sprite: string,
    public model: IBulletModel,
    info: { current: { x: number; y: number }; angle: number },
  ) {
    super(sprite, info.current.x, info.current.y);
    this.setDisplaySize(model.SIZE.WIDTH, model.SIZE.HEIGHT);
    this.setFrictionAir(0);
    this.setCollisionGroup(-1);
    this.setVelocity(
      Math.cos((info.angle / 180) * Math.PI) * this.model.SPEED,
      Math.sin((info.angle / 180) * Math.PI) * this.model.SPEED,
    );
    this.setSensor(true);
  }
}
