export default class MainScene extends Phaser.Scene {
  preload() {
    this.load.setBaseURL('http://localhost:5173');
    this.load.atlas('space', 'res/space/space.png', 'res/space/space.json');
    this.load.image('backdrop', 'res/bg/backdrop.png');
    this.load.image('grid', 'res/bg/grid.png');
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
    this.add.image(0, 0, 'backdrop').setScale(10, 5);
    this.add.tileSprite(0, 0, 3600, 3600, 'grid');
    this.cameras.main.setZoom(1);
  }
}