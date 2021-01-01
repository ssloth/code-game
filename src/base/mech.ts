import { BlendModes } from 'phaser';
import { BaseSprite } from './base';
import { IChip, IMech, IMechModel, IMechState } from './interfaces/mech';

export abstract class Mech extends BaseSprite implements IMech {
  _state: IMechState;

  constructor(
    config: { sprite: string; x: number; y: number },
    public model: IMechModel,
    public chip: IChip,
  ) {
    super(config.sprite, config.x, config.y);
    this.setDisplaySize(model.SIZE.WIDTH, model.SIZE.HEIGHT);

    this._state = {
      health: this.model.MAX_HEALTH,
      status: [],
    };
    this.setFrictionAir(0);
    this.setMass(model.MASS);
  }
}
