import { GameObjects } from 'phaser';
import { Bullet } from '~src/base/bullet';
import { GameDate } from '~src/base/interfaces/information';
import { Mech } from '~src/base/mech';
import { Faction, Player } from '~src/base/player';
import { IPlayerData } from '~src/game/main/open-command/type';
import MainScene from '.';
import { doMechCommand } from './do-mech-command';
import { doPlayerCommand } from './do-player-command';
import { MechPositionRelation, pretreatment } from './pretreatment';

export interface GameData {
  mechPositionRelation: MechPositionRelation;
  gameDate: GameDate;
}

export class GameCore {
  private players: Map<string, Player>;
  private factions: Map<string, Faction>;
  private bullets: Bullet[];
  private mechs: Mech[];
  private bulletGroup!: GameObjects.Group;
  scene!: MainScene;
  constructor() {
    this.players = new Map();
    this.factions = new Map();
    this.bullets = Bullet.instances;
    this.mechs = Mech.instances;
  }

  init() {
    this.scene = MainScene.scene;
    this.bulletGroup = this.scene.physics.add.group();
  }

  // 帧
  tick(ct: number) { 
    Mech.instances.forEach(item => item.update())
    Bullet.instances.forEach(item => item.update())
  }

  // 每 50 次 动画 一次 tick 约 1000ms
  tick50(gameDate: GameDate) {
    const mechPositionRelation = pretreatment(this.mechs);
    doPlayerCommand([...this.players.values()], { ...mechPositionRelation, gameDate });
    doMechCommand(this.mechs, { ...mechPositionRelation, gameDate });
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
    this.scene.physics.add.overlap(
      mech,
      this.bulletGroup,
      () => {
        mech.destroy();
      },
      undefined,
      this.scene,
    );
  }

  addBullet(bullet: Bullet) {
    this.bulletGroup.add(bullet);
    this.bullets.push(bullet);
  }
}
