import { Base } from './base';
import { IActionSequence, IChip, IMech, IMechModel, IMechState } from './interfaces/mech';

export abstract class Mech extends Base implements IMech {
  _state: IMechState;
  actionSequence: IActionSequence;

  constructor(sprite: string, public model: IMechModel, public chip: IChip) {
    super(sprite, 0, 0);
    this.setSize(model.SIZE.WIDTH, model.SIZE.HEIGHT);

    this._state = {
      health: this.model.MAX_HEALTH,
      status: [],
    };

    this.actionSequence = {};
  }
}
