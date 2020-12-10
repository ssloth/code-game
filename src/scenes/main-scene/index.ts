import Phaser from 'phaser';
import { GameCore } from './game-core';

export default class MainScene extends Phaser.Scene {
  public gameCore: GameCore;
  private tc = 0;
  constructor() {
    super('main-scene');
    this.gameCore = new GameCore();
  }

  preload() {
    this.load.setBaseURL('http://labs.phaser.io');
    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
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
      this.gameCore.tick50();
    } else {
      this.tc++;
    }
  }
}
