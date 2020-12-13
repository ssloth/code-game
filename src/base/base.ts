import MainScene from '~src/game/main';

export abstract class BaseImage extends Phaser.Physics.Matter.Image {
  constructor(sprite: string, x: number, y: number) {
    super(MainScene.scene.matter.world, x, y, sprite);
    MainScene.scene.add.existing(this);
    MainScene.scene.events.on('game-tick', this.gameTick.bind(this));
    MainScene.scene.events.on('update', this.update.bind(this));
    this.onCreate();
  }

  abstract gameTick(date: number): void;
  abstract update(tc: number): void;
  abstract onCollide(m: any): void;

  onCreate(){};

  destroy(self: boolean = true) {
    MainScene.scene.events.off('game-tick', this.gameTick.bind(this));
    MainScene.scene.events.off('update', this.update.bind(this));
    this.destroy();
  }
}

export abstract class BaseSprite extends Phaser.Physics.Matter.Sprite {
  constructor(sprite: string, x: number, y: number) {
    super(MainScene.scene.matter.world, x, y, sprite);
    MainScene.scene.add.existing(this);
    MainScene.scene.events.on('game-tick', this.gameTick.bind(this));
    MainScene.scene.events.on('update', this.update.bind(this));
    this.onCreate();
  }

  abstract gameTick(date: number): void;
  abstract update(tc: number): void;
  onCreate(){};

  destroy(self: boolean = true) {
    MainScene.scene.events.off('game-tick', this.gameTick.bind(this));
    MainScene.scene.events.off('update', this.update.bind(this));
    this.destroy();
  }
}
