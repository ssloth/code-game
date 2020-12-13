import MatterJS from 'matter';
import { Math, } from 'phaser';
import { Mech } from '~src/base/mech';
import MainScene from '..';
import { BaseBullte } from '../bullet/base-bullet';

interface IOperations {
  // 保持现在状态
  keep: () => void;

  // 向当前方向前进
  forward: (power?: number) => void;

  // 后退
  back: (power?: number) => void;

  // 停止
  stop: () => void;

  // 移动到 x y
  move: (x: number, y: number) => Promise<any>;

  // 攻击
  attach: (x: number, y: number) => Promise<any>;

  // 最快到速度转到 a 度
  rotateTo: (a: number) => Promise<any>;

  // 旋转一个游戏时后停止
  rotateLeft: (a?: number) => void;

  // 旋转一个游戏时后停止
  rotateRight: (a?: number) => void;

  // 左转到 a 度
  rotateLeftTo: (a: number) => Promise<any>;

  // 右转到 a 度
  rotateRightTo: (a: number) => Promise<any>;
}

export interface ICurrentState {
  state: {
    move: 'forward' | 'back' | 'stop' | string;
    rotate: 'left' | 'right' | string;
    attach: 'attach' | string;
  };
  force: Math.Vector2;
  velocity: Math.Vector2;
  position: Math.Vector2;
}

export class BaseMech extends Mech {
  radar!: MatterJS.BodyType;
  prev = {
    position: new Math.Vector2(this.x, this.y),
  };

  current: ICurrentState = {
    position: new Math.Vector2(this.x, this.y),
    state: { move: 'keep', rotate: '', attach: '' },
    force: new Math.Vector2(0.000001, 0.000001),
    velocity: new Math.Vector2(0.000001, 0.000001),
  };

  do = (name: keyof IOperations) => {
    this.state;
  };

  onCreate() {
    this.radar = this.scene.matter.add.circle(this.x, this.y, 100, { isSensor: true });
  }

  operations: IOperations = {
    keep: () => {},

    forward: (power: number = 0.1) => {
      if (this.current.state.move === 'forward') return;
      if (!(power < 1)) power = 1;
      this.current.state.move = 'forward';
      this.current.force.setLength(this.model.MAX_THRUST * power);
      this.setAngle((this.current.force.angle() * 360) / Math.PI2);
    },

    back: (power: number = 0.1) => {
      if (this.current.state.move === 'back') return;
      if (!(power < 1)) power = 1;
      this.current.state.move = 'back';
      this.current.force.setAngle(this.current.force.angle() - Math.PI2 / 2);
      this.current.force.setLength((this.model.MAX_THRUST * power) / 2);
    },

    stop: () => {
      if (this.current.state.move === 'stop') return;
      this.current.state.move = 'stop';
      this.setFrictionAir(0.01);
      this.current.force.setLength(0);
    },

    move: async (x: number, y: number) => {},

    attach: async (x: number, y: number) => {
      this.current.state.attach = 'attach';
      const target = new Math.Vector2(x, y);
      console.log('attch');
      new BaseBullte('plasma', MainScene.scene.gameDataLoader.bulletModels['B-1'], {
        current: this.current.position,
        target: target,
      });
    },

    rotateLeft: () => {
      if (this.current.state.rotate === 'rotateRight') return;
      this.current.state.rotate = 'rotateLeft';
    },

    rotateRight: () => {
      if (this.current.state.rotate === 'rotateRight') return;
      this.current.state.rotate = 'rotateRight';
    },

    rotateTo: async (a: number) => {},

    rotateLeftTo: async (a: number) => {
      if (this.current.state.rotate === 'rotateLeftTo') return;
      this.current.state.rotate = 'rotateLeft';
    },

    rotateRightTo: async (a: number) => {
      if (this.current.state.rotate === 'rotateRightTo') return;
      this.current.state.rotate = 'rotateRight';
    },
  };

  computeInformation() {
    const position = new Math.Vector2(this.x, this.y);
    this.current.velocity = this.prev.position.subtract(position);
    this.prev.position = position;
  }

  gameTick(date: number) {
    this.chip.AI(
      {
        world: {
          date: date,
        },
        self: {
          position: { x: this.x, y: this.y },
          velocity: this.current.velocity.length(),
          angle: this.current.velocity.angle(),
        },
        friend: [],
        empty: [],
      },
      this.operations,
    );
  }

  update(): void {
    this.radar.position = {x: this.x, y:this.y};
    this.current.position.set(this.x, this.y);
    if (this.current.velocity.length() < this.model.MAX_SPEED) {
      this.applyForce(this.current.force);
    }
  }

  onCollide() {
    console.log('!');
  }
}

export interface IBaseMechChip {
  AI: (information: any, operations: IOperations) => void;
}
