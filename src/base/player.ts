import { IFaction, IPlayer } from './interfaces/player';
import { Mech } from './mech';

export class Player implements IPlayer {
  mechs: Mech[];

  constructor(public name: string, public factory: IFaction) {
    this.mechs = [];
  }
}

export class Faction implements IFaction {
  players: IPlayer[];

  constructor(public name: string) {
    this.players = [];
  }
}
