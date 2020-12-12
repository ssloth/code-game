import { Math } from 'phaser';
import { Mech } from '~src/base/mech';

interface IOperations {
  // 保持现在状态
  keep: () => void;

  // 向当前方向前进
  forward: (power?: number) => void;

  // 后退
  back: (power?: number) => void;

  // 停止
  stop: () => void;

  // 攻击
  attach: () => void;

  // 左转
  rotateLeft: () => void;

  // 右转
  rotateRight: () => void;
}

export interface ICurrentState {
  state: keyof IOperations;
  force: Math.Vector2;
}

export class BaseMech extends Mech {
  current: ICurrentState = {
    state: 'keep',
    force: new Math.Vector2(0.000001, 0.0000001),
  };

  operations: IOperations = {
    keep: () => {},

    forward: (power?: number) => {
      this.current.state = 'forward';
      this.current.force.setLength(0.00001);
      console.log((this.current.force.angle() * 360) / Math.PI2);
      this.setAngle((this.current.force.angle() * 360) / Math.PI2);
    },

    back: (power?: number) => {
      this.current.state = 'back';
      this.current.force.setLength(-0.00001);
      this.setAngle((this.current.force.angle() * 360) / Math.PI2);
    },

    stop: () => {
      this.current.state = 'stop';
    },

    attach: () => {
      this.current.state = 'attach';
    },

    rotateLeft: () => {
      this.current.force.rotate(Math.PI2 / 16);
      this.current.state = 'rotateLeft';
    },

    rotateRight: () => {
      this.current.force.rotate(-Math.PI2 / 16);

      this.current.state = 'rotateRight';
    },
  };

  gameTick(date: number) {
    this.chip.AI(
      {
        world: {
          date: date
        },
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
      this.operations,
    );
  }

  update(): void {
    this.applyForce(this.current.force);
  }
}

export interface IBaseMechChip {
  AI: (information: any, operations: IOperations) => void;
}
