import MainScene from '~src/game/main';

export abstract class BaseImage extends Phaser.Physics.Matter.Image {
  constructor(sprite: string, x: number, y: number) {
    super(MainScene.scene.matter.world, x, y, sprite);
    MainScene.scene.add.existing(this);
    MainScene.scene.events.on('game-tick', (...args: any) => {
      this.gameTick.bind(this, ...args);
      this.emit('game-tick', ...args);
    });
    MainScene.scene.events.on('update', (...args: any) => {
      this.update.bind(this, ...args);
      this.emit('update', ...args);
    });
    this.onCreate();
  }

  abstract gameTick(date: number): void;
  abstract update(tc: number): void;
  abstract onCollide(m: any): void;

  onCreate() {}

  destroy(self: boolean = true) {
    MainScene.scene.events.off('game-tick', this.gameTick.bind(this));
    MainScene.scene.events.off('update', this.update.bind(this));
    this.emit('destroy');
    this.destroy();
  }
}

export abstract class BaseSprite extends Phaser.Physics.Matter.Sprite {
  constructor(sprite: string, x: number, y: number) {
    super(MainScene.scene.matter.world, x, y, sprite);
    MainScene.scene.add.existing(this);
    MainScene.scene.events.on('game-tick', (...args: any) => {
      this.gameTick.call(this, args);
      this.emit('game-tick', ...args);
    });
    MainScene.scene.events.on('update', (...args: any) => {
      this.update.call(this, args);
      this.emit('update', ...args);
    });
    this.onCreate();
  }

  abstract gameTick(date: number): void;
  abstract update(tc: number): void;
  abstract onCollide(m: any): void;

  onCreate() {}

  destroy(self: boolean = true) {
    MainScene.scene.events.off('game-tick', this.gameTick.bind(this));
    MainScene.scene.events.off('update', this.update.bind(this));
    this.emit('destroy');
    this.destroy();
  }
}
