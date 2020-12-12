import Phaser from 'phaser';

export default class TestScene extends Phaser.Scene {
  private tc = 0;
  static scene: TestScene;
  private state: any = {};
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
    const mech = this.physics.add.sprite(100, 100, 'bullet');
    this.physics.add.existing(mech);
    mech.body
  }

  update() {
    this.draw();

    if (this.tc % 50 === 0) {
      this.tick();
    }
    this.tc++;
  }

  draw() {}

  tick() {}
}
