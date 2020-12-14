import { Bullet } from '~src/base/bullet';

export class BaseBullet extends Bullet {
  onCreate() {}
  onCollide(m: any): void {}
  gameTick(date: number): void {}
  update(tc: number): void {}
}
