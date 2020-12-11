import { IChip } from '~src/base/interfaces/chip';

export const base: IChip = {
  name: 'BASE-1',
  AI: (information, command) => {
    if (information.world.gameDate % 10 === 9)
      command.attach({ x: Math.floor(Math.random() * 500), y: Math.floor(Math.random() * 500) });
    command.move({ x: Math.floor(Math.random() * 500), y: Math.floor(Math.random() * 500) });
  },
};
