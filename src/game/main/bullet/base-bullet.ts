import { Bullet } from '~src/base/bullet';

export class BaseBullte extends Bullet {
  onCreate() {}
  onCollide(m: any): void {}
  gameTick(date: number): void {}
  update(tc: number): void {}
}
