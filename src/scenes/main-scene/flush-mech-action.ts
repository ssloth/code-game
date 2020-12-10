import { Mech } from '~src/base/mech';
import { computeXY } from '~src/utils/move';

let pre = {}
export const flushMechAction = (mech: Mech, ct: number) => {
  if (!mech.actionSequence.moveTarget) return;
  const speed = mech.model.SPEED;
  console.log('pre', pre, 'cur', mech.state.position, 'tar', mech.actionSequence.moveTarget)
  const { x, y } = computeXY(mech.state.position, mech.actionSequence.moveTarget, speed / 1000);
  mech.setPosition(x, y);
  pre = mech.state.position;
};
