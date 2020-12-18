import { Math as PMath } from 'phaser';
import { AsyncActionQueue, IAsyncAction } from '~src/base/async-action';
import { Mech } from '~src/base/mech';
import { Radar } from '~src/base/radar';
import MainScene from '..';
import { BaseBullet } from '../bullet/base-bullet';

interface IOperations {
  // 保持现在状态
  keep: () => this;

  // 向当前方向前进
  forward: (power?: number) => this;

  // 停止
  stop: () => this;

  // 攻击
  attach: () => this;

  // 旋转一个游戏时后停止
  rotateLeft: (a?: number) => this;

  // 旋转一个游戏时后停止
  rotateRight: (a?: number) => this;

  // 移动
  move: (target: { x: number; y: number }) => this;

  // 创建一个操作队列
  queue: (action: IAsyncAction<keyof IOperations>[]) => this;
}

export interface ICurrentState {
  state: {
    forward: number;
    stop: boolean;
    rotate: 'left' | 'right' | '';
    attach: 'attach' | '';
    move?: PMath.Vector2;
    moveState?: 'ready' | 'rotate' | 'forward' | 'stop';
  };
  force: PMath.Vector2;
  position: PMath.Vector2;
}

export class BaseMech extends Mech {
  radar!: Radar;

  current: ICurrentState = {
    state: { forward: 0, stop: false, rotate: '', attach: '', move: undefined },
    force: new PMath.Vector2(0.000001, 0.000001),
    position: new PMath.Vector2(this.body.velocity.x, this.body.velocity.y),
  };

  actionQueue = new AsyncActionQueue<keyof IOperations>();

  do = (name: keyof IOperations) => {
    this.state;
  };

  onCreate() {
    this.radar = new Radar(this, 90);
  }

  operations: IOperations = {
    keep: () => {
      return this.operations;
    },

    forward: (power: number = 0.1) => {
      this.current.state.stop = false;
      this.current.state.forward = power;
      this.current.state.move = undefined;
      this.current.force.setLength(this.model.MAX_THRUST * power);
      return this.operations;
    },

    stop: () => {
      this.current.state.stop = true;
      this.current.state.forward = 0;
      this.current.state.move = undefined;
      this.setFrictionAir(0.01);
      this.current.force.setLength(0);
      return this.operations;
    },

    attach: () => {
      this.current.state.attach = 'attach';
      new BaseBullet('plasma', MainScene.scene.gameDataLoader.bulletModels['B-1'], {
        current: this.body.position,
        angle: this.angle,
      });
      return this.operations;
    },

    rotateLeft: () => {
      this.current.state.rotate = 'left';
      return this.operations;
    },

    rotateRight: () => {
      this.current.state.rotate = 'right';
      return this.operations;
    },

    move: ({ x, y }) => {
      if (typeof x !== 'number' || typeof y !== 'number' || this.current.state.move !== undefined)
        return this.operations;
      this.current.state.moveState = 'ready';
      this.current.state.move = new PMath.Vector2(x, y);
      return this.operations;
    },

    queue: (action: any[]) => {
      return this.operations;
    },
  };

  computeInformation() {}

  gameTick(date: number) {
    this.current.state.rotate = '';
    this.chip.AI(
      {
        world: {
          date: date,
        },
        self: {
          position: { x: this.current.position.x, y: this.current.position.y },
          velocity: this.body.speed,
          angle: this.body.angle,
        },
        friend: [],
        empty: [],
      },
      this.operations,
    );
  }

  update(): any {
    this.current.position.set(this.body.position.x, this.body.position.y);
    if (this.current.state.move) {
      if (this.current.state.moveState === 'ready') {
        if (this.body.speed !== 0) return this.setFrictionAir(0.05);
        this.setFrictionAir(0);
        this.current.state.moveState = 'rotate';
      }

      if (this.current.state.moveState === 'rotate') {
        const angle = this.current.state.move.clone().subtract(this.current.position).angle();
        const rotate = PMath.Angle.RotateTo(this.body.angle, angle, Math.PI / 120);
        if (Math.abs(PMath.Angle.ShortestBetween(this.body.angle, angle)) < 0.0001) {
          this.current.force.rotate(angle);
          this.current.force.setLength(this.model.MAX_THRUST / 5);
          return (this.current.state.moveState = 'forward');
        }
        return this.setRotation(rotate);
      }

      if (this.current.state.moveState === 'forward') {
        const d = this.current.state.move.clone().subtract(this.current.position).length();
        if (d >= this.model.MAX_SPEED * 2) {
          this.applyForce(this.current.force);
        } else {
          this.current.state.moveState = 'stop';
          this.current.force.setLength(0);
        }
      }

      if (this.current.state.moveState === 'stop') {
        if (this.body.speed !== 0) return this.setFrictionAir(0.05);
        this.setPosition(this.current.state.move.x, this.current.state.move.y);
        this.setFrictionAir(0);
        this.current.state.moveState = undefined;
        this.current.state.move = undefined;
      }

      return;
    }

    if (this.current.state.rotate === 'left') {
      this.setAngularVelocity(-Math.PI / 600);
    } else if (this.current.state.rotate === 'right') {
      this.setAngularVelocity(Math.PI / 600);
    }

    if (Math.abs(this.body.angularVelocity) > 0.0001) {
      // 增加摩擦力 使飞行器的角速度降为 0
      this.setFrictionAir(0.01);
    } else {
      this.setAngularVelocity(0);
    }

    this.current.force.setAngle(this.body.angle);
    if (this.body.speed < this.model.MAX_SPEED) {
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
