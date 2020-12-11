import { Mech } from '~src/base/mech';
import { computeXY } from '~src/utils/move';

export const flushMechAction = (mech: Mech) => {
  if (!mech.actionSequence.moveTarget) return;
  const speed = mech.model.SPEED;
  const { x, y } = computeXY(mech.state.position, mech.actionSequence.moveTarget, speed / 1000);
  mech.setPosition(x, y);
};
