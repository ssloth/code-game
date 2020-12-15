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
    });
    this.body.onCollideActiveCallback = _.throttle((p) => {
      if (p?.bodyA?.gameObject?.uid === mech.uid) return;
      console.log(p)
    }, 1000);
    mech.on('update', () => (this.body.position = { x: mech.x, y: mech.y }));
    mech.on('destroy', () => 'radar destroys');
    this.information = []
  }
}
