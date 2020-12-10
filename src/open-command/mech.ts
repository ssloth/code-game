import { IAbsolutePosition } from '~src/base/interfaces/information';
import { Mech } from '~src/base/mech';

export const move = (mech: Mech, position: IAbsolutePosition) => {
  mech.actionSequence.moveTarget = { ...position };
};

export const attach = (mech: Mech, position: IAbsolutePosition) => {};
