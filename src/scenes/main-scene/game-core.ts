import { Faction, Player } from '~src/base/player';
import { IPlayerData } from '~src/open-command/type';
import { doMechCommand } from './do-mech-command';

export class GameCore {
  private players: Map<string, Player>;
  private factions: Map<string, Faction>;

  constructor() {
    this.players = new Map();
    this.factions = new Map();
  }

  tick() {
    const mechs = this.getAllMechs();
    mechs.forEach(mech => doMechCommand(mech))
    
  }

  addPlayer(playerData: IPlayerData) {
    const { name, faction: factionName } = playerData;
    const faction = this.factions.get(factionName);
    if (faction) {
      const player = new Player(name, faction);
      this.players.set(player.name, player);
    } else {
      const faction = new Faction(factionName);
      const player = new Player(name, faction);
      this.players.set(player.name, player);
      this.factions.set(factionName, faction);
    }
  }

  private getAllMechs() {
    return [...this.players.values()].map((player) => player.mechs).flat();
  }
}
