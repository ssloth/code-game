import "babel-polyfill";
import Phaser from 'phaser';
import { createConfig } from './config';

export default () => {
  const container = document.getElementById('game-canvas')!;
  
  const config = createConfig({
    parent: container,
    width: container.clientWidth,
    height: container.clientHeight,
  });

  new Phaser.Game(config);
}
