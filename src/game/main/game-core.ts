import { GameDate } from '~src/base/interfaces/information';
import { Mech } from '~src/base/mech';
import { Faction, Player } from '~src/base/player';
import { IPlayerData } from '~src/open-command/type';
import { doMechCommand } from './do-mech-command';
import { doPlayerCommand } from './do-player-command';
import { flushMechAction } from './flush-mech-action';
import { MechPositionRelation, pretreatment } from './pretreatment';

export interface GameData {
  mechPositionRelation: MechPositionRelation;
  gameDate: GameDate;
}

export class GameCore {
  private players: Map<string, Player>;
  private factions: Map<string, Faction>;

  constructor() {
    this.players = new Map();
    this.factions = new Map();
  }

  // 帧
  tick(ct: number) {
    const mechs = this.getAllMechs();
    mechs.forEach((mech) => flushMechAction(mech));
  }

  // 每 50 次 动画 一次 tick 约 1000ms
  tick50(gameDate: GameDate) {
    const mechs = this.getAllMechs();
    const players = this.getAllPlayer();
    const mechPositionRelation = pretreatment(mechs);
    players.forEach((p) => doPlayerCommand(p, { ...mechPositionRelation, gameDate }));
    mechs.forEach((m) => doMechCommand(m, { ...mechPositionRelation, gameDate }));
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

  addMech(playerName: string, mech: Mech) {
    const players = this.players.get(playerName);
    players?.mechs.push(mech);
  }

  private getAllPlayer() {
    return [...this.players.values()];
  }

  private getAllMechs() {
    return [...this.players.values()].map((player) => player.mechs).flat();
  }
}