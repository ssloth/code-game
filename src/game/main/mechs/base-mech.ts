import { Math as PMath } from 'phaser';
import { Mech } from '~src/base/mech';
import { Radar } from '~src/base/radar';
import MainScene from '..';
import { BaseBullet } from '../bullet/base-bullet';

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
  attach: () => Promise<any>;

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
    move: 'forward' | 'back' | 'stop' | '';
    rotate: 'left' | 'right' | '';
    attach: 'attach' | '';
  };
  force: PMath.Vector2;
  velocity: PMath.Vector2;
}

export class BaseMech extends Mech {
  radar!: Radar;
  prev = {
    position: new PMath.Vector2(this.x, this.y),
  };

  current: ICurrentState = {
    state: { move: '', rotate: '', attach: '' },
    force: new PMath.Vector2(0.000001, 0.000001),
    velocity: new PMath.Vector2(this.body.velocity.x, this.body.velocity.y),
  };

  do = (name: keyof IOperations) => {
    this.state;
  };

  onCreate() {
    this.radar = new Radar(this, 90);

    // const particles = this.scene.add.particles('space');
    // const ship = this;
    // particles.createEmitter({
    //   frame: 'blue',
    //   speed: {
    //     onEmit: function (particle, key, t, value) {
    //       return this.body?.speed;
    //     },
    //   },
    //   lifespan: {
    //     onEmit: (particle, key, t, value) => {
    //       return Phaser.Math.Percent(ship.body?.speed, 0, 300) * 20000;
    //     },
    //   },
    //   alpha: {
    //     onEmit: function (particle, key, t, value) {
    //       return Phaser.Math.Percent(ship.body?.speed, 0, 300) * 1000;
    //     },
    //   },
    //   scale: { start: 1.0, end: 0 },
    //   blendMode: 'ADD',
    // }).startFollow(this);
  }

  operations: IOperations = {
    keep: () => {},

    forward: (power: number = 0.1) => {
      if (this.current.state.move === 'forward') return;
      if (!(power < 1)) power = 1;
      this.current.state.move = 'forward';
      this.current.force.setLength(this.model.MAX_THRUST * power);
    },

    back: (power: number = 0.1) => {
      if (this.current.state.move === 'back') return;
      if (!(power < 1)) power = 1;
      this.current.state.move = 'back';
      this.current.force.setAngle(this.current.force.angle() - PMath.PI2 / 2);
      this.current.force.setLength((this.model.MAX_THRUST * power) / 2);
    },

    stop: () => {
      if (this.current.state.move === 'stop') return;
      this.current.state.move = 'stop';
      this.setFrictionAir(0.01);
      this.current.force.setLength(0);
    },

    move: async (x: number, y: number) => {},

    attach: async () => {
      this.current.state.attach = 'attach';

      new BaseBullet('plasma', MainScene.scene.gameDataLoader.bulletModels['B-1'], {
        current: this.body.position,
        angle: this.angle,
      });
    },

    rotateLeft: () => {
      if (this.current.state.rotate === 'right') return;
      this.current.state.rotate = 'right';
    },

    rotateRight: () => {
      if (this.current.state.rotate === 'left') return;
      this.current.state.rotate = 'left';
    },

    rotateTo: async (a: number) => {},

    rotateLeftTo: async (a: number) => {
      if (this.current.state.rotate === 'right') return;
      this.current.state.rotate = 'right';
    },

    rotateRightTo: async (a: number) => {
      if (this.current.state.rotate === 'left') return;
      this.current.state.rotate = 'left';
    },
  };

  computeInformation() {
    const position = new PMath.Vector2(this.x, this.y);
    this.current.velocity = this.prev.position.subtract(position);
    this.prev.position = position;
  }

  gameTick(date: number) {
    this.current.state.rotate = '';
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
    this.current.velocity.set(this.body.velocity.x, this.body.velocity.y);

    if (this.current.state.rotate === 'left') {
      this.setAngularVelocity(0.01);
    } else if (this.current.state.rotate === 'right') {
      this.setAngularVelocity(-0.01);
    }
    console.log(this.body.angularVelocity);
    if (Math.abs(this.body.angularVelocity) > 0.0001) {
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
