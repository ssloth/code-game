import { IBaseMechChip } from '~src/game/main/mechs/base-mech/index';

export const baseI: IBaseMechChip = {
  AI: (information, operations) => {
    operations.trigger('move', 'forward', 0.5);
    if (information.world.date > 5 && information.world.date < 1000) {
      operations.trigger('rotate', 'rotateRight');
    } else {
      operations.trigger('rotate', 'noop');
    }
  },
};

export const baseII: IBaseMechChip = {
  AI: (information, operations) => {},
};

export const baseIII: IBaseMechChip = {
  AI: (information, operations) => {},
};
