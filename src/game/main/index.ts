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
    this.load.image('bullet', 'res/mech/bullet.png');
    this.load.image('destroyer', 'res/mech/destroyer.png');
    this.load.image('oppressor', 'res/mech/oppressor.png');
    this.load.image('plasma', 'res/mech/plasma.png');
  }

  create() {
    this.gameCore = new GameCore();
    this.gameCore.init();
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
