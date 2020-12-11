import { Mech } from '~src/base/mech';
import { computeXY } from '~src/utils/move';

export const flushMechAction = (mechs: Mech[]) => {
  mechs.forEach((mech) => {
    if (!mech.actionSequence.moveTarget) return;
    const speed = mech.model.SPEED;
    const { x, y, a } = computeXY(mech.sprite.body.position, mech.actionSequence.moveTarget, speed);
    if (a) mech.sprite.angle = (a * 180) / Math.PI;
    mech.sprite.body.position.x = x
    mech.sprite.body.position.y = y
  });
};
