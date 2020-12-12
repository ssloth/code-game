import { IBaseMechChip } from '~src/game/main/mechs/base-mech';

export const base: IBaseMechChip = {
  AI: (information, operations) => {
    operations.forward();
    if (information.world.date % 10 === 0) operations.rotateLeft();
  },
};
