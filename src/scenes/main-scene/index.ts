import Phaser from 'phaser';
import { GameCore } from './game-core';

export default class MainScene extends Phaser.Scene {
  public gameCore: GameCore;
  private tc = 0;
  constructor() {
    super('main-scene');
    this.gameCore = new GameCore();
  }

  preload() {}

  create() {}

  update() {
    this.tick();
  }

  tick() {
    if (this.tc % 50 === 0) {
      this.gameCore.tick();
      this.tc = 1;
    } else {
      this.tc++;
    }
  }
}
