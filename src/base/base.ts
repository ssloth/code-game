import MainScene from '~src/game/main';

export abstract class Base extends Phaser.Physics.Matter.Sprite {
  constructor(sprite: string, x: number, y: number) {
    super(MainScene.scene.matter.world, x, y, sprite);
    MainScene.scene.add.existing(this);
    MainScene.scene.events.on('game-tick', this.gameTick.bind(this));
    MainScene.scene.events.on('update', this.update.bind(this));
  }

  abstract gameTick(date: number): void;
  abstract update(tc: number): void;

  destroy(self: boolean = true) {
    MainScene.scene.events.off('game-tick', this.gameTick.bind(this));
    MainScene.scene.events.off('update', this.update.bind(this));
    this.destroy();
  }
}
