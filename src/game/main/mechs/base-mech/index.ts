import { Math as PMath } from 'phaser';
import { Mech } from '~src/base/mech';
import { Radar } from '~src/base/radar';
import MainScene from '../../';
import { BaseBullet } from '../../bullet/base-bullet';
import { ActionStateMachine } from '~src/base/action-state-machine';
import { createFSM } from './fsm';

export interface ICurrentState {
  state: {
    forward: number;
    stop: boolean;
    rotate: 'left' | 'right' | '';
    attach: 'attach' | '';
    move?: PMath.Vector2;
    moveState?: 'ready' | 'rotate' | 'forward' | 'stop';
    promise?: { resolve: (v: any) => any; reject: (v: any) => any };
  };
  force: PMath.Vector2;
  position: PMath.Vector2;
}

export class BaseMech extends Mech {
  radar!: Radar;

  current: ICurrentState = {
    state: { forward: 0, stop: false, rotate: '', attach: '', move: undefined },
    force: new PMath.Vector2(ZERO, ZERO),
    position: new PMath.Vector2(this.body.velocity.x, this.body.velocity.y),
  };

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
        position: { x: this.current.position.x, y: this.current.position.y },
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
    this.current.position.set(this.body.position.x, this.body.position.y);
    return this.fsm.update();
  }

  onCollide() {
    console.log('!');
  }
}

export interface IBaseMechChip {
  AI: (information: any, operations: ActionStateMachine) => void;
}
