import { Base } from './base';
import { IBulletModel, IBullet, IBulletState } from './interfaces/bullet';

export abstract class Bullet extends Base implements IBullet {
  constructor(sprite: string, public model: IBulletModel, public _state: IBulletState) {
    super(sprite, _state.position.x, _state.position.y);
    this.setSize(model.SIZE.WIDTH, model.SIZE.HEIGHT);
  }
}
