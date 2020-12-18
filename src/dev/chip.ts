import { IBaseMechChip } from '~src/game/main/mechs/base-mech';

export const baseI: IBaseMechChip = {
  AI: (information, operations) => {
    operations.queue([
      { name: 'move', args: { x: 100, y: 200 }, level: 1 },
      { name: 'move', args: { x: 200, y: 200 }, level: 1 },
      { name: 'move', args: { x: 300, y: 300 }, level: 1 },
    ]);
  },
};

export const baseII: IBaseMechChip = {
  AI: (information, operations) => {
    operations.forward(0.05);

    if (information.world.date > 10 && information.wweq5rworld.date < 15) {
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
