import { Bullet } from '~src/base/bullet';
import { Mech } from '~src/base/mech';
import { computeXY } from '~src/utils/move';

export const flushBullet = (bullet: Bullet) => {
  console.log(bullet)
  if (!bullet.state.target) return;
  const speed = bullet.model.SPEED;
  const { x, y, a } = computeXY(bullet.state.position, bullet.state.target, speed / 1000);
  bullet.setPosition(x, y);
  if (!a) return bullet.hit(); 
  bullet.sprite.setAngle(a);
};
