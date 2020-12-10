import { IMech } from './interfaces/mech';
import { IFaction, IPlayer } from './interfaces/player';

export class Player implements IPlayer {
  mechs: IMech[];

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
