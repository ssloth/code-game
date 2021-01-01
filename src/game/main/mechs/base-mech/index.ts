import { Mech } from '~src/base/mech';
import { Radar } from '~src/base/radar';
import { ActionStateMachine } from '~src/base/action-state-machine';
import { createFSM } from './fsm';
export class BaseMech extends Mech {
  radar!: Radar;

  fsm = new ActionStateMachine(createFSM(this) as any);

  onCreate() {
    this.radar = new Radar(this, 90);
  }

  computeInformation(date: number) {
    return Object.freeze({
      world: {
        date: date,
      },
      self: {
        position: this.body.position,
        speed: this.body.speed,
        angle: this.body.angle,
      },
      friend: [],
      empty: [],
    });
  }

  gameTick(date: number) {
    this.chip.AI(this.computeInformation(date), this.fsm);
  }

  update(): any {
    return this.fsm.update();
  }

  onCollide() {
    console.log('!');
  }
}

export interface IBaseMechChip {
  AI: (information: any, operations: ActionStateMachine) => void;
}
