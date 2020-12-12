import MainScene from '~src/game/main';
import game from '../main';
import createCreator from './creators';
import computer from './normal';

const start = () => {
  const scene = game.scene.scenes[0] as MainScene;
  scene.gameCore.addPlayer(computer);
  scene.gameCore.addPlayer(computer);
  const creator = createCreator(scene);
  console.log(creator.createMech(1));
  creator.createMech(0);
  creator.createMech(2);
};

setTimeout(start, 1000);
