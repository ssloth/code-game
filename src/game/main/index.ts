import Phaser from 'phaser';
import { GameCore } from './game-core';

export default class MainScene extends Phaser.Scene {
  public gameCore: GameCore;
  private tc = 0;
  private gameDate = 0;
  static scene: MainScene;
  constructor() {
    super('main-scene');
    this.gameCore = new GameCore();
    MainScene.scene = this;
  }

  preload() {
    this.load.setBaseURL('http://localhost:8989');
    this.load.image('bullet', 'res/mech/bullet.png');
    this.load.image('destroyer', 'res/mech/destroyer.png');
    this.load.image('oppressor', 'res/mech/oppressor.png');
    this.load.image('plasma', 'res/mech/plasma.png');
  }

  create() {}

  update() {
    this.tick();
    this.draw();
  }

  draw() {
    this.gameCore.tick(this.tc);
  }

  tick() {
    if (this.tc % 50 === 0) {
      this.gameCore.tick50(this.gameDate++);
    }
    this.tc++;
  }
}
