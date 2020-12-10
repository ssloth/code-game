import { Mech } from '~src/base/mech';

export const doMechCommand = (mech: Mech) => {
  mech.chip.AI(
    {
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
    { move: () => {}, attach: () => {} },
  );
};
