import Phaser from 'phaser';
import { GameCore } from './game-core';
import data from '~src/data/data-load';
export default class MainScene extends Phaser.Scene {
  public gameCore!: GameCore;
  private tc = 0;
  private gameDate = 0;
  private camerasXY = {
    cx: 0,
    cy: 0,
    x: 0,
    y: 0,
  };
  static scene: MainScene;
  gameDataLoader = data;
  constructor() {
    super('main-scene');
    MainScene.scene = this;
  }

  preload() {
    this.load.setBaseURL('http://localhost:8989');
    this.load.atlas('space', 'res/space/space.png', 'res/space/space.json');
    this.load.image('backdrop', 'res/bg/backdrop.png');
    this.load.image('grid', 'res/bg/grid.png');
    this.load.image('bullet', 'res/mech/bullet.png');
    this.load.image('destroyer', 'res/mech/destroyer.png');
    this.load.image('oppressor', 'res/mech/oppressor.png');
    this.load.image('plasma', 'res/mech/plasma.png');
    this.load.image('mech-1', 'res/mech/mech-1.svg');
    this.load.image('mech-2', 'res/mech/mech-2.svg');
    this.load.image('mech-3', 'res/mech/mech-3.svg');
    this.load.image('mech-4', 'res/mech/mech-4.svg');
    this.load.image('mech-5', 'res/mech/mech-5.svg');
    this.load.image('mech-6', 'res/mech/mech-6.svg');
    this.load.image('mech-7', 'res/mech/mech-7.svg');
  }

  create() {
    this.gameCore = new GameCore();
    this.gameCore.init();
    this.add.image(0, 0, 'backdrop').setScale(10, 2).setOrigin(0);
    this.add.tileSprite(0, 0, 4000, 2000, 'grid');
    this.cameras.main.setZoom(1);
    this.cameras.main.centerOn(0, 0);

    document.body.addEventListener(
      'mousewheel',
      (e) => {
        if ((e as WheelEvent).deltaY < 0) {
          this.cameras.main.setZoom(this.cameras.main.zoom + 0.05);
        } else {
          this.cameras.main.setZoom(this.cameras.main.zoom - 0.05);
        }
      },
      { passive: true },
    );

    document.getElementById('L')?.addEventListener('mouseenter', () => (this.camerasXY.x += -10));
    document.getElementById('R')?.addEventListener('mouseenter', () => (this.camerasXY.x += 10));
    document.getElementById('T')?.addEventListener('mouseenter', () => (this.camerasXY.y += -10));
    document.getElementById('B')?.addEventListener('mouseenter', () => (this.camerasXY.y += 10));
    document.getElementById('L')?.addEventListener('mouseleave', () => (this.camerasXY.x = 0));
    document.getElementById('R')?.addEventListener('mouseleave', () => (this.camerasXY.x = 0));
    document.getElementById('T')?.addEventListener('mouseleave', () => (this.camerasXY.y = 0));
    document.getElementById('N')?.addEventListener('mouseleave', () => (this.camerasXY.y = 0));

    this.matter.world.on('collisionstart', (_: any, a: any, b: any) => {
      if (typeof a.gameObject?.onCollide === 'function') a.gameObject.onCollide(b.gameObject);
      if (typeof b.gameObject?.onCollide === 'function') b.gameObject.onCollide(a.gameObject);
    });
  }

  update() {
    this.tick();
    this.tick50();
    this.updateCameras();
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

  private updateCameras() {
    this.camerasXY.cx += this.camerasXY.x;
    this.camerasXY.cy += this.camerasXY.y;
    this.camerasTranslate();
  }

  private camerasTranslate() {
    const { centerX, centerY } = this.cameras.main;
    this.cameras.main.transparent = true;
    this.cameras.main.centerOn(centerX + this.camerasXY.cx, centerY + this.camerasXY.cy);
  }
}
