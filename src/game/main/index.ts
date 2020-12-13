import Phaser from 'phaser';
import { GameCore } from './game-core';

export default class MainScene extends Phaser.Scene {
  public gameCore!: GameCore;
  private tc = 0;
  private gameDate = 0;
  static scene: MainScene;
  constructor() {
    super('main-scene');
    MainScene.scene = this;
  }

  preload() {
    this.load.setBaseURL('http://localhost:8989');
    this.load.image('backdrop', 'res/bg/backdrop.png');
    this.load.image('grid', 'res/bg/grid.png');
    this.load.image('bullet', 'res/mech/bullet.png');
    this.load.image('destroyer', 'res/mech/destroyer.png');
    this.load.image('oppressor', 'res/mech/oppressor.png');
    this.load.image('plasma', 'res/mech/plasma.png');
  }

  create() {
    this.gameCore = new GameCore();
    this.gameCore.init();
    this.add
      .image(0, 0, 'backdrop')
      .setScale(3, 1.25)
      .setOrigin(0);
    this.add.tileSprite(0, 0, 2000, 1600, 'grid');
    this.matter.world.setBounds();
    this.cameras.main.setBounds(0, 0, 100, 100);
    this.cameras.main.setZoom(1);
    this.cameras.main.centerOn(0, 0);
  }

  update() {
    this.tick();
    this.tick50();
  }

  tick() {
    this.gameCore.tick(this.tc);
  }

  tick50() {
    if (this.tc % 50 === 0) {
      this.gameCore.tick50(++this.gameDate);
      this.events.emit('game-tick', this.gameDate);
    }
    this.tc++;
  }
}
