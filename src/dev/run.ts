import MainScene from '~src/game/main';
import game from '../main';
import createCreator from './creators';
import computer from './normal';

const start = () => {
  const scene = game.scene.scenes[0] as MainScene;
  scene.gameCore.addPlayer(computer);
  scene.gameCore.addPlayer(computer);
  const creator = createCreator(scene);
  creator.createMech('M-1', 0);
  creator.createMech('M-2', 1);
  creator.createMech('M-3', 2);
};

setTimeout(start, 1000);
