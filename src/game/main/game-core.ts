import { IGameMap } from '~src/base/interfaces/game-map';
import { GameDate } from '~src/base/interfaces/information';
import { Faction, Player } from '~src/base/player';
import MainScene from '.';

export interface GameData {
  gameDate: GameDate;
}

export class GameCore {
  private players: Map<string, Player>;
  private factions: Map<string, Faction>;
  scene!: MainScene;
  constructor() {
    this.players = new Map();
    this.factions = new Map();
  }

  init() {
    this.scene = MainScene.scene;
  }

  // 帧
  tick(ct: number) {}

  // 每 50 次 动画 一次 tick 约 1000ms
  tick50(gameDate: GameDate) {}

  addPlayer(playerData: any) {
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
}
