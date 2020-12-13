import Phaser from 'phaser';
import { GameCore } from './game-core';
import data from '~src/data/data-load';
export default class MainScene extends Phaser.Scene {
  public gameCore!: GameCore;
  private tc = 0;
  private gameDate = 0;
  static scene: MainScene;
  gameDataLoader = data;
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
    this.add.image(0, 0, 'backdrop').setScale(10, 2).setOrigin(0);
    this.add.tileSprite(0, 0, 4000, 2000, 'grid');
    this.cameras.main.setBounds(0, 0, 0, 0);
    this.cameras.main.setZoom(1);
    this.cameras.main.centerOn(0, 0);

    this.matter.world.on('collisionstart', (_: any, a: any, b: any) => {
      if (typeof a.gameObject?.onCollide === 'function') a.gameObject.onCollide(b.gameObject);
      if (typeof b.gameObject?.onCollide === 'function') b.gameObject.onCollide(a.gameObject);
    });
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
