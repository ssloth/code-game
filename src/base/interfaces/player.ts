import { IMech } from "./mech";

export interface IFaction {
  name: string;
  players: IPlayer[];
}

export interface IPlayer {
  name: string;
  factory: IFaction;
  mechs: IMech[];
}