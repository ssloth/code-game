import MainScene from '~src/scenes/main-scene';
import game from '../main';
import computer from './normal';

const start = () => {
  const scene = game.scene.scenes[0] as MainScene;
  scene.gameCore.addPlayer(computer)
  scene.gameCore.addPlayer(computer)
}

setTimeout(start, 1000);
