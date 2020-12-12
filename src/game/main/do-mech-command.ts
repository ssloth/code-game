import { IAbsolutePosition } from '~src/base/interfaces/information';
import { GameData } from './game-core';
import { BaseMech } from './mechs/base-mech';

export const doMechCommand = (mechs: BaseMech[], gameData: GameData) => {
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
        move: (position: IAbsolutePosition) => mech,
        attach: (position: IAbsolutePosition) => mech,
      },
    );
  });
};
