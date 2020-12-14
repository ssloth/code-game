import MatterJS from 'matter';
import MainScene from '~src/game/main';
import _ from 'lodash';
import { Mech } from './mech';

export class Radar {
  body: MatterJS.BodyType;
  information: any[];

  constructor(public mech: Mech, public range: number) {
    this.body = MainScene.scene.matter.add.circle(mech.x, mech.y, range, {
      isSensor: true,
      collisionFilter: { group: -1, mask: 1 },
    });
    this.body.onCollideActiveCallback = _.throttle((p) => {
      console.log(p);
    }, 1000);
    mech.on('update', () => (this.body.position = { x: mech.x, y: mech.y }));
    mech.on('destroy', () => 'radar destroys');
  }
}
