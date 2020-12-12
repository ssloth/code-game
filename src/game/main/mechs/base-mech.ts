import { Mech } from '~src/base/mech';

export class BaseMech extends Mech {
  operations = {
    forward: (power: number) => {
      this.body.velocity.set(100);
    },

    back: (power: number) => {},

    stop: () => {},

    attach: () => {},

    rotateLeft: () => {},

    rotateRight: () => {},
  };
}
