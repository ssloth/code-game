import Phaser from 'phaser';
import scenes from './game';

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: scenes,
} as Phaser.Types.Core.GameConfig;
