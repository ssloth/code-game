import { IBaseMechChip } from '~src/game/main/mechs/base-mech';

export const baseI: IBaseMechChip = {
  AI: (information, operations) => {
    operations.move(200, 200);
  },
};

export const baseII: IBaseMechChip = {
  AI: (information, operations) => {
    operations.forward(0.05);

    if (information.world.date > 10 && information.world.date < 15) {
      operations.rotateLeft();
      operations.attach();
    }
  },
};

export const baseIII: IBaseMechChip = {
  AI: (information, operations) => {
    operations.forward(0.05);
    if (information.world.date % 5 === 0) {
      operations.attach();
    }
    operations.forward(0.1);

    operations.rotateRight();
  },
};
