import "babel-polyfill";
import Phaser from 'phaser';
import { createConfig } from './config';
import bootstrap from "./bootstrap";

export default () => {

  bootstrap();

  const container = document.getElementById('game-canvas')!;
  
  const config = createConfig({
    parent: container,
    width: container.clientWidth,
    height: container.clientHeight,
  });

  new Phaser.Game(config);
}
