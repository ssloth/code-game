import { Math as PMath } from 'phaser';
import { Mech } from '~src/base/mech';
import { Radar } from '~src/base/radar';
import MainScene from '..';
import { BaseBullet } from '../bullet/base-bullet';

interface IOperations {
  // 保持现在状态
  keep: () => void;

  // 向当前方向前进
  forward: (power?: number, angle?: number) => void;

  // 停止
  stop: () => void;

  // 攻击
  attach: () => any;

  // 移动
  move: (x: number, y: number) => void;
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

export class CircleMech extends Mech {
  radar!: Radar;

  current: ICurrentState = {
    state: { forward: 0, stop: false, rotate: '', attach: '', move: undefined },
    force: new PMath.Vector2(0.000001, 0.000001),
    position: new PMath.Vector2(this.body.velocity.x, this.body.velocity.y),
  };

  do = (name: keyof IOperations) => {
    this.state;
  };

  onCreate() {
    this.radar = new Radar(this, 90);
  }

  operations: IOperations = {
    keep: () => {},

    forward: (power: number = 0.1, angle?: number) => {
      this.current.state.stop = false;
      this.current.state.forward = power;
      this.current.state.move = undefined;
      this.current.force.setLength(this.model.MAX_THRUST * power);
      if (angle) this.current.force.setAngle(angle);
    },

    stop: () => {
      this.current.state.stop = true;
      this.current.state.forward = 0;
      this.current.state.move = undefined;
      this.setFrictionAir(0.01);
      this.current.force.setLength(0);
    },

    attach: async () => {
      this.current.state.attach = 'attach';
      new BaseBullet('plasma', MainScene.scene.gameDataLoader.bulletModels['B-1'], {
        current: this.body.position,
        angle: this.angle,
      });
    },

    move: (x, y) => {
      if (typeof x !== 'number' || typeof y !== 'number' || this.current.state.move !== undefined)
        return;
      this.current.state.moveState = 'ready';
      this.current.state.move = new PMath.Vector2(x, y);
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
          position: { x: this.body.position.x, y: this.body.position.y },
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
        const angle = this.current.state.move.clone().subtract(this.current.position).angle();
        this.current.force.setLength(this.model.MAX_THRUST / 2);
        this.current.force.setAngle(angle);
        this.current.state.moveState = 'forward';
      }

      if (this.current.state.moveState === 'forward') {
        const d = this.current.state.move.clone().subtract(this.current.position).length();
        if (d >= 10)  {
          this.applyForce(this.current.force);
        } else {
          this.setPosition(this.current.state.move.x, this.current.state.move.y);
          this.current.state.moveState = 'stop';
          this.current.force.setLength(0);
        }
      }

      if (this.current.state.moveState === 'stop') {
        if (this.body.speed !== 0) return this.setFrictionAir(0.05);
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
