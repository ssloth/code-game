import { IBaseMechChip } from '~src/game/main/mechs/base-mech/index';

export const baseI: IBaseMechChip = {
  AI: (information, operations) => {
    if (information.world.date > 2 && information.world.date < 20) {
      operations.tigger('move', 'forward', 0.5);
    }
    if (information.world.date > 10 && information.world.date < 15) {
      operations.tigger('rotate', 'rotateRight');
    } else {
      operations.tigger('rotate', 'noop');
    }
  },
};

export const baseII: IBaseMechChip = {
  AI: (information, operations) => {
  
  },
};

export const baseIII: IBaseMechChip = {
  AI: (information, operations) => {},
};
