import Phaser from 'phaser';
import Matter from 'matter';
export default class TestScene extends Phaser.Scene {
  private tc = 0;
  static scene: TestScene;
  private state: any = {};
  mech!: Phaser.Physics.Matter.Sprite;
  cons!: Matter.ConstraintType;
  constructor() {
    super('test-scene');
    TestScene.scene = this;
  }

  preload() {
    this.load.setBaseURL('http://localhost:8989');
    this.load.image('bullet', 'res/mech/bullet.png');
    this.load.image('destroyer', 'res/mech/destroyer.png');
    this.load.image('oppressor', 'res/mech/oppressor.png');
    this.load.image('plasma', 'res/mech/plasma.png');
  }

  create() {
    this.mech = this.matter.add.sprite(100, 100, 'bullet', undefined, {
      density: 100,
      frictionAir: 0.3,
    });
    const radar = this.matter.add.circle(100, 100, 100, { isSensor: true });
    radar.onCollideActiveCallback = (e: any) => console.log(e);

  }

  update() {
    this.draw();

    if (this.tc % 50 === 0) {
      this.tick();
    }
    this.tc++;
  }

  draw() {
    this.mech.applyForce(new Phaser.Math.Vector2(this.tc > 10000 ? -10 : 10, 0));
  }

  tick() {}
}
