import Phaser from 'phaser';
import scenes from './game';

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      gravity: {
        x: 0,
        y: 0,
      },
    },
  },
  scene: scenes,
} as Phaser.Types.Core.GameConfig;
