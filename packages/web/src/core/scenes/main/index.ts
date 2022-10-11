import { ofCamerasDrag } from "../../events";
import { mousewheel$ } from "../../events/document";

export default class MainScene extends Phaser.Scene {

  controls?: Phaser.Cameras.Controls.SmoothedKeyControl;

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
    this.add.tileSprite(0, 0, 5000, 3000, 'grid');
    this.cameras.main.setZoom(1);
    this.matter.add.circle(500, 500, 100, { frictionAir: 1 });
    this.matter.add.mouseSpring()

    mousewheel$.subscribe(e => {
      if (e.deltaY < 0) {
        const s = this.cameras.main.zoom + 0.05;
        this.cameras.main.setZoom(s > 2 ? 2 : s);
      } else {
        const s = this.cameras.main.zoom - 0.05;
        this.cameras.main.setZoom(s < 0.5 ? 0.5 : s);
        this.cameras.main
      }
    })

    ofCamerasDrag(this.cameras.main).subscribe(e => {
      this.cameras.main.x = e.x;
      this.cameras.main.y = e.y;
    })
  }

  update(time: number) {

  }
}