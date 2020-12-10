import { IChip } from '~src/base/interfaces/chip';

export const base: IChip = {
  name: 'BASE-1',
  AI: (information, command) => {
    command.move({ x: 100, y: 100 });
  },
};
