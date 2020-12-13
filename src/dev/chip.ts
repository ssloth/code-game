import { IBaseMechChip } from '~src/game/main/mechs/base-mech';

export const baseI: IBaseMechChip = {
  AI: (information, operations) => {
    operations.rotateLeft();
    if (information.world.date > 5) {
      operations.stop();
    } else {
      operations.forward(0.2);
    }
    if (information.world.date % 5 === 0) {
      operations.attach(Math.random() * 500, Math.random() * 500);
    }
  },
};

export const baseII: IBaseMechChip = {
  AI: (information, operations) => {
    if (information.world.date > 4) {
      operations.stop();
    } else if (information.world.date > 2) {
      operations.forward(0);
    } else {
      operations.forward(0.5);
    }
  },
};

export const baseIII: IBaseMechChip = {
  AI: (information, operations) => {
    operations.forward(0.1);
  },
};
