import { IBaseMechChip } from '~src/game/main/mechs/base-mech';

export const baseI: IBaseMechChip = {
  AI: (information, operations) => {
    operations.rotateLeft();
    if(information.world.date > 5) {
      operations.stop();
    }else{
      operations.forward(0.2);
    }
  },
};

export const baseII: IBaseMechChip = {
  AI: (information, operations) => {
    if (information.world.date > 3) {
      operations.forward(0);
    } else {
      operations.forward(1);
    }
  },
};

export const baseIII: IBaseMechChip = {
  AI: (information, operations) => {
    operations.forward();
  },
};
