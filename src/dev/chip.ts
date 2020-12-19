import { IBaseMechChip } from '~src/game/main/mechs/base-mech/index';

export const baseI: IBaseMechChip = {
  AI: (information, operations) => {
    if (information.world.date === 2) {
      operations.tigger('move', 'forward', 0.5);
    }
  },
};

export const baseII: IBaseMechChip = {
  AI: (information, operations) => {},
};

export const baseIII: IBaseMechChip = {
  AI: (information, operations) => {},
};
