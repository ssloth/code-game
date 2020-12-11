import { IAbsolutePosition } from '~src/base/interfaces/information';
import { Mech } from '~src/base/mech';
import { GameData } from './game-core';
import { attach, move } from './open-command/mech';

export const doMechCommand = (mechs: Mech[], gameData: GameData) => {
  const { gameDate, mechPositionRelation } = gameData;
  mechs.forEach((mech) => {
    mech.chip.AI(
      {
        world: { gameDate },
        self: {
          position: {
            absolute: {
              x: 0,
              y: 1,
            },
            relative: {
              angle: 0,
              distance: 0,
            },
          },
        },
        friend: [],
        empty: [],
      },
      {
        move: (position: IAbsolutePosition) => move(mech, position),
        attach: (position: IAbsolutePosition) => attach(mech, position),
      },
    );
  });
};
