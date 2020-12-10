import Phaser from 'phaser';
import scenes from './scenes';

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: scenes,
} as Phaser.Types.Core.GameConfig;
