import { IChip } from '~src/base/interfaces/chip';

export const base: IChip = {
  name: 'BASE-1',
  AI: (information, command) => {
    // command.move({ x: 500, y: 500 });
    command.move({ x: Math.floor(Math.random() * 500), y: Math.floor(Math.random() * 500) });
  },
};
